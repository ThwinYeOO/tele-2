import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { z } from 'zod';
import { prisma } from './prisma.js';
import { authRequired, requireRole, type AuthedRequest } from './middleware.js';
import { hashPassword, loginSchema, registerSchema, signToken, verifyPassword } from './auth.js';

const app = express();

app.use(cors({ origin: ['http://localhost:5173'], credentials: false }));
app.use(express.json());

app.get('/health', (_req, res) => res.json({ ok: true }));

// Auth
app.post('/api/auth/register', async (req, res) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const { name, email, phone, password, role } = parsed.data;
  const existing = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
  if (existing) return res.status(409).json({ error: 'Email already registered' });

  const user = await prisma.user.create({
    data: {
      name,
      email: email.toLowerCase(),
      phone,
      role,
      passwordHash: await hashPassword(password),
      doctorProfile: role === 'doctor'
        ? { create: { specialty: 'General Physician', experienceYears: 5, consultationFee: 20000, languages: 'Myanmar,English' } }
        : undefined,
      patientProfile: role === 'patient' ? { create: {} } : undefined,
    },
    select: { id: true, name: true, email: true, phone: true, role: true, isVerified: true },
  });

  const token = signToken(user);
  return res.json({ token, user });
});

app.post('/api/auth/login', async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const { email, password, role } = parsed.data;
  const userWithHash = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
  if (!userWithHash) return res.status(401).json({ error: 'Invalid email or password' });

  const ok = await verifyPassword(password, userWithHash.passwordHash);
  if (!ok) return res.status(401).json({ error: 'Invalid email or password' });

  if (role && userWithHash.role !== role) {
    return res.status(403).json({ error: `This account is not registered as ${role}` });
  }

  const user = await prisma.user.findUnique({
    where: { id: userWithHash.id },
    select: { id: true, name: true, email: true, phone: true, role: true, isVerified: true },
  });

  const token = signToken(user!);
  return res.json({ token, user });
});

app.get('/api/me', authRequired, async (req: AuthedRequest, res) => {
  const me = await prisma.user.findUnique({
    where: { id: req.auth!.userId },
    select: { id: true, name: true, email: true, phone: true, role: true, isVerified: true },
  });
  res.json({ user: me });
});

// Doctors directory (patient-facing)
app.get('/api/doctors', authRequired, async (req: AuthedRequest, res) => {
  // allow any authenticated user to view directory
  const q = z.string().optional().parse(req.query.q);
  const specialty = z.string().optional().parse(req.query.specialty);

  const doctors = await prisma.doctorProfile.findMany({
    where: {
      AND: [
        specialty && specialty !== 'all'
          ? { specialty: { contains: specialty, mode: 'insensitive' } }
          : {},
        q
          ? {
              OR: [
                { user: { name: { contains: q, mode: 'insensitive' } } },
                { specialty: { contains: q, mode: 'insensitive' } },
                { hospital: { name: { contains: q, mode: 'insensitive' } } },
              ],
            }
          : {},
      ],
    },
    select: {
      id: true,
      specialty: true,
      experienceYears: true,
      consultationFee: true,
      languages: true,
      rating: true,
      reviewCount: true,
      user: { select: { id: true, name: true } },
      hospital: { select: { id: true, name: true } },
    },
    orderBy: [{ rating: 'desc' }, { reviewCount: 'desc' }],
  });

  res.json({
    doctors: doctors.map((d) => ({
      id: d.user.id,
      name: d.user.name,
      specialty: d.specialty,
      hospital: d.hospital?.name ?? 'Independent',
      experienceYears: d.experienceYears,
      rating: d.rating,
      reviews: d.reviewCount,
      languages: d.languages.split(',').map((s) => s.trim()).filter(Boolean),
      consultationFee: d.consultationFee,
    })),
  });
});

// Appointments
app.get('/api/appointments', authRequired, async (req: AuthedRequest, res) => {
  const mine = await prisma.appointment.findMany({
    where:
      req.auth!.role === 'patient'
        ? { patientId: req.auth!.userId }
        : req.auth!.role === 'doctor'
        ? { doctorId: req.auth!.userId }
        : {},
    orderBy: { scheduledAt: 'asc' },
    select: {
      id: true,
      scheduledAt: true,
      type: true,
      status: true,
      notes: true,
      doctor: { select: { id: true, name: true } },
      patient: { select: { id: true, name: true } },
      doctorId: true,
      patientId: true,
    },
  });
  res.json({ appointments: mine });
});

app.post('/api/appointments', authRequired, requireRole(['patient']), async (req: AuthedRequest, res) => {
  const schema = z.object({
    doctorId: z.string().min(1),
    scheduledAt: z.string().datetime(),
    type: z.enum(['video', 'in_person']),
    notes: z.string().optional(),
  });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const { doctorId, scheduledAt, type, notes } = parsed.data;
  const doctor = await prisma.user.findUnique({ where: { id: doctorId } });
  if (!doctor || doctor.role !== 'doctor') return res.status(404).json({ error: 'Doctor not found' });

  const appt = await prisma.appointment.create({
    data: {
      patientId: req.auth!.userId,
      doctorId,
      scheduledAt: new Date(scheduledAt),
      type,
      status: 'confirmed',
      notes,
    },
    select: {
      id: true,
      scheduledAt: true,
      type: true,
      status: true,
      notes: true,
      doctor: { select: { id: true, name: true } },
      patient: { select: { id: true, name: true } },
    },
  });
  res.json({ appointment: appt });
});

app.post('/api/appointments/:id/cancel', authRequired, async (req: AuthedRequest, res) => {
  const id = z.string().parse(req.params.id);
  const appt = await prisma.appointment.findUnique({ where: { id } });
  if (!appt) return res.status(404).json({ error: 'Appointment not found' });

  const canCancel =
    (req.auth!.role === 'patient' && appt.patientId === req.auth!.userId) ||
    (req.auth!.role === 'doctor' && appt.doctorId === req.auth!.userId) ||
    req.auth!.role === 'super_admin';
  if (!canCancel) return res.status(403).json({ error: 'Forbidden' });

  const updated = await prisma.appointment.update({
    where: { id },
    data: { status: 'cancelled' },
    select: { id: true, status: true },
  });
  res.json({ appointment: updated });
});

const port = Number(process.env.PORT || 3001);
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`API listening on http://localhost:${port}`);
});

