import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
  Calendar,
  Clock,
  Video,
  Pill,
  FileText,
  ChevronRight,
  TrendingUp,
  Activity,
  Heart,
  Droplets,
  Phone,
  AlertCircle,
  Stethoscope,
  Wallet
} from 'lucide-react';

const PatientDashboard = () => {
  const [upcomingAppointments] = useState([
    {
      id: 1,
      doctor: 'Dr. Khin Mya',
      specialty: 'Cardiologist',
      date: 'Today',
      time: '2:30 PM',
      type: 'video',
      status: 'confirmed',
    },
    {
      id: 2,
      doctor: 'Dr. Than Htut',
      specialty: 'General Physician',
      date: 'Tomorrow',
      time: '10:00 AM',
      type: 'in-person',
      status: 'pending',
    },
  ]);

  const [recentDoctors] = useState([
    { id: 1, name: 'Dr. Khin Mya', specialty: 'Cardiologist', rating: 4.9, consultations: 5 },
    { id: 2, name: 'Dr. Aung Win', specialty: 'Dermatologist', rating: 4.8, consultations: 3 },
    { id: 3, name: 'Dr. Su Su', specialty: 'Pediatrician', rating: 4.7, consultations: 2 },
  ]);

  const [healthStats] = useState({
    bmi: 22.5,
    weight: 68,
    bloodPressure: '120/80',
    heartRate: 72,
  });

  const [medications] = useState([
    { id: 1, name: 'Amoxicillin', dosage: '500mg', frequency: '3 times daily', remaining: 5 },
    { id: 2, name: 'Paracetamol', dosage: '500mg', frequency: 'As needed', remaining: 12 },
  ]);

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Welcome back, Aung! 👋</h1>
          <p className="text-slate-500 mt-1">Here's your health overview for today</p>
        </div>
        <div className="flex gap-3">
          <Link to="/patient/emergency">
            <Button variant="destructive" className="gap-2">
              <Phone className="w-4 h-4" />
              Emergency SOS
            </Button>
          </Link>
          <Link to="/patient/doctors">
            <Button className="bg-teal-600 hover:bg-teal-700 gap-2">
              <Stethoscope className="w-4 h-4" />
              Book Appointment
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">2</p>
                <p className="text-xs text-slate-500">Upcoming</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Video className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">12</p>
                <p className="text-xs text-slate-500">Consultations</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                <Pill className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">4</p>
                <p className="text-xs text-slate-500">Active Meds</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <Wallet className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">45K</p>
                <p className="text-xs text-slate-500">MMK Wallet</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Upcoming Appointments */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Upcoming Appointments</CardTitle>
              <Link to="/patient/appointments">
                <Button variant="ghost" size="sm" className="gap-1">
                  View All <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingAppointments.map((apt) => (
                <div key={apt.id} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-teal-100 text-teal-700">
                      {apt.doctor.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-medium text-slate-900">{apt.doctor}</h4>
                    <p className="text-sm text-slate-500">{apt.specialty}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="flex items-center gap-1 text-xs text-slate-500">
                        <Calendar className="w-3 h-3" /> {apt.date}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-slate-500">
                        <Clock className="w-3 h-3" /> {apt.time}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge variant={apt.status === 'confirmed' ? 'default' : 'secondary'} className={apt.status === 'confirmed' ? 'bg-green-100 text-green-700 hover:bg-green-100' : ''}>
                      {apt.status}
                    </Badge>
                    {apt.type === 'video' ? (
                      <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                        <Video className="w-4 h-4 mr-1" /> Join
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline">Details</Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Health Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Health Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-slate-50 rounded-xl">
                  <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-red-100 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-red-600" />
                  </div>
                  <p className="text-2xl font-bold text-slate-900">{healthStats.heartRate}</p>
                  <p className="text-xs text-slate-500">BPM</p>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-xl">
                  <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-blue-600" />
                  </div>
                  <p className="text-2xl font-bold text-slate-900">{healthStats.bloodPressure}</p>
                  <p className="text-xs text-slate-500">mmHg</p>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-xl">
                  <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-amber-100 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-amber-600" />
                  </div>
                  <p className="text-2xl font-bold text-slate-900">{healthStats.bmi}</p>
                  <p className="text-xs text-slate-500">BMI</p>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-xl">
                  <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-cyan-100 flex items-center justify-center">
                    <Droplets className="w-5 h-5 text-cyan-600" />
                  </div>
                  <p className="text-2xl font-bold text-slate-900">{healthStats.weight}</p>
                  <p className="text-xs text-slate-500">kg</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Recent Doctors */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Recent Doctors</CardTitle>
              <Link to="/patient/doctors">
                <Button variant="ghost" size="sm">See All</Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentDoctors.map((doc) => (
                <div key={doc.id} className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-teal-100 text-teal-700 text-sm">
                      {doc.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-900 text-sm truncate">{doc.name}</p>
                    <p className="text-xs text-slate-500">{doc.specialty}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-amber-500">
                      <span className="text-xs font-medium">{doc.rating}</span>
                      <span className="text-xs">⭐</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Active Medications */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Active Medications</CardTitle>
              <Link to="/patient/prescriptions">
                <Button variant="ghost" size="sm">
                  <FileText className="w-4 h-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {medications.map((med) => (
                <div key={med.id} className="p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-slate-900">{med.name}</h4>
                    <Badge variant="outline" className="text-xs">{med.dosage}</Badge>
                  </div>
                  <p className="text-xs text-slate-500">{med.frequency}</p>
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-slate-500">Remaining</span>
                      <span className="font-medium">{med.remaining} days</span>
                    </div>
                    <Progress value={(med.remaining / 14) * 100} className="h-1.5" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-gradient-to-br from-teal-500 to-cyan-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium">Need Help?</h4>
                  <p className="text-xs text-white/80">24/7 Support Available</p>
                </div>
              </div>
              <Button variant="secondary" className="w-full" size="sm">
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
