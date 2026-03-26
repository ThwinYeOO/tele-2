import 'dotenv/config';
import { prisma } from './prisma.js';
import { hashPassword } from './auth.js';

async function main() {
  // Clear
  await prisma.appointment.deleteMany();
  await prisma.doctorProfile.deleteMany();
  await prisma.patientProfile.deleteMany();
  await prisma.hospital.deleteMany();
  await prisma.user.deleteMany();

  const [hosp1, hosp2] = await Promise.all([
    prisma.hospital.create({ data: { name: 'Yangon General Hospital', address: 'Yangon' } }),
    prisma.hospital.create({ data: { name: 'Asia Royal Hospital', address: 'Yangon' } }),
  ]);

  const superAdmin = await prisma.user.create({
    data: {
      name: 'Super Admin',
      email: 'admin@demo.com',
      phone: '+95 9 111 222 333',
      role: 'super_admin',
      isVerified: true,
      passwordHash: await hashPassword('demo123'),
    },
  });

  const hospitalAdmin = await prisma.user.create({
    data: {
      name: 'Yangon General Hospital',
      email: 'hospital@demo.com',
      phone: '+95 1 123 456',
      role: 'hospital_admin',
      isVerified: true,
      passwordHash: await hashPassword('demo123'),
      hospitalAdminOf: { connect: { id: hosp1.id } },
    },
  });

  await prisma.hospital.update({ where: { id: hosp1.id }, data: { adminId: hospitalAdmin.id } });

  const doctor1 = await prisma.user.create({
    data: {
      name: 'Dr. Khin Mya',
      email: 'doctor@demo.com',
      phone: '+95 9 987 654 321',
      role: 'doctor',
      isVerified: true,
      passwordHash: await hashPassword('demo123'),
      doctorProfile: {
        create: {
          specialty: 'Cardiology',
          experienceYears: 15,
          consultationFee: 25000,
          languages: 'Myanmar,English',
          rating: 4.9,
          reviewCount: 128,
          hospitalId: hosp1.id,
        },
      },
    },
  });

  const doctor2 = await prisma.user.create({
    data: {
      name: 'Dr. Aung Win',
      email: 'doctor2@demo.com',
      role: 'doctor',
      isVerified: true,
      passwordHash: await hashPassword('demo123'),
      doctorProfile: {
        create: {
          specialty: 'Dermatology',
          experienceYears: 12,
          consultationFee: 30000,
          languages: 'Myanmar,English',
          rating: 4.8,
          reviewCount: 96,
          hospitalId: hosp2.id,
        },
      },
    },
  });

  const patient = await prisma.user.create({
    data: {
      name: 'Aung Kyaw',
      email: 'patient@demo.com',
      phone: '+95 9 123 456 789',
      role: 'patient',
      isVerified: true,
      passwordHash: await hashPassword('demo123'),
      patientProfile: { create: {} },
    },
  });

  await prisma.appointment.createMany({
    data: [
      {
        patientId: patient.id,
        doctorId: doctor1.id,
        scheduledAt: new Date(Date.now() + 2 * 60 * 60 * 1000),
        type: 'video',
        status: 'confirmed',
        notes: 'Follow-up for blood pressure monitoring',
      },
      {
        patientId: patient.id,
        doctorId: doctor2.id,
        scheduledAt: new Date(Date.now() + 26 * 60 * 60 * 1000),
        type: 'in_person',
        status: 'pending',
        notes: 'Skin rash consultation',
      },
    ],
  });

  // eslint-disable-next-line no-console
  console.log('Seeded:', { superAdmin: superAdmin.email, hospitalAdmin: hospitalAdmin.email, doctor1: doctor1.email, patient: patient.email });
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  });

