import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HeartPulse, User, Stethoscope, Building2, Shield, ArrowLeft } from 'lucide-react';

const portals = [
  {
    role: 'patient',
    title: 'Patient',
    description: 'Book appointments, consult doctors, view records.',
    icon: User,
    href: '/login?role=patient',
    accent: 'from-teal-500 to-cyan-600',
  },
  {
    role: 'doctor',
    title: 'Doctor',
    description: 'Manage schedule, consultations, and patients.',
    icon: Stethoscope,
    href: '/login?role=doctor',
    accent: 'from-amber-500 to-orange-600',
  },
  {
    role: 'hospital_admin',
    title: 'Hospital',
    description: 'Manage doctors, patients, lab results, billing.',
    icon: Building2,
    href: '/login?role=hospital_admin',
    accent: 'from-violet-500 to-purple-600',
  },
  {
    role: 'super_admin',
    title: 'Admin',
    description: 'System-wide oversight, users, payments, analytics.',
    icon: Shield,
    href: '/login?role=super_admin',
    accent: 'from-slate-600 to-slate-700',
  },
] as const;

export default function ChoosePortal() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-cyan-50/30 flex items-center justify-center p-4">
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #0f766e 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="w-full max-w-5xl space-y-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
              <HeartPulse className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">MyanmarCare</h1>
              <p className="text-sm text-slate-500">Choose your portal</p>
            </div>
          </Link>

          <Button asChild variant="ghost" className="text-slate-600">
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>

        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-900">Sign in</CardTitle>
            <CardDescription>Select which portal you want to access.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {portals.map((p) => (
                <Link
                  key={p.role}
                  to={p.href}
                  className="group rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
                >
                  <div className="h-full rounded-xl border bg-white hover:shadow-lg transition-all p-4">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${p.accent} flex items-center justify-center mb-3`}>
                      <p.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="space-y-1">
                      <div className="font-semibold text-slate-900 group-hover:text-teal-700 transition-colors">
                        {p.title}
                      </div>
                      <div className="text-xs text-slate-500 leading-relaxed">
                        {p.description}
                      </div>
                    </div>
                    <div className="mt-4 text-xs font-medium text-slate-600 group-hover:text-slate-900 transition-colors">
                      Continue →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

