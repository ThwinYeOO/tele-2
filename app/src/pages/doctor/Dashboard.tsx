import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
  Users,
  Calendar,
  Video,
  DollarSign,
  Clock,
  ChevronRight,
  Star,
  Activity,
  FileText,
  MessageSquare,
} from 'lucide-react';

const DoctorDashboard = () => {
  const [todayAppointments] = useState([
    { id: 1, patient: 'Aung Kyaw', time: '10:00 AM', type: 'video', status: 'completed' },
    { id: 2, patient: 'Mya Mya', time: '11:30 AM', type: 'in-person', status: 'in-progress' },
    { id: 3, patient: 'Than Htut', time: '2:00 PM', type: 'video', status: 'upcoming' },
    { id: 4, patient: 'Su Su', time: '3:30 PM', type: 'video', status: 'upcoming' },
  ]);

  const [recentPatients] = useState([
    { id: 1, name: 'Aung Kyaw', lastVisit: 'Today', condition: 'Hypertension', status: 'follow-up' },
    { id: 2, name: 'Mya Mya', lastVisit: 'Today', condition: 'Diabetes', status: 'ongoing' },
    { id: 3, name: 'Than Htut', lastVisit: '3 days ago', condition: 'Flu', status: 'recovered' },
    { id: 4, name: 'Hla Hla', lastVisit: '1 week ago', condition: 'Asthma', status: 'ongoing' },
  ]);

  const stats = {
    totalPatients: 156,
    todayAppointments: 8,
    monthlyEarnings: 1250000,
    rating: 4.9,
    completionRate: 95,
  };

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Welcome, Dr. Khin Mya! 👋</h1>
          <p className="text-slate-500 mt-1">Here's your practice overview for today</p>
        </div>
        <div className="flex gap-3">
          <Link to="/doctor/schedule">
            <Button variant="outline" className="gap-2">
              <Calendar className="w-4 h-4" />
              View Schedule
            </Button>
          </Link>
          <Link to="/doctor/consultations">
            <Button className="bg-amber-600 hover:bg-amber-700 gap-2">
              <Video className="w-4 h-4" />
              Start Consultation
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{stats.totalPatients}</p>
                <p className="text-xs text-slate-500">Total Patients</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{stats.todayAppointments}</p>
                <p className="text-xs text-slate-500">Today's Appts</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{(stats.monthlyEarnings / 1000).toFixed(0)}K</p>
                <p className="text-xs text-slate-500">Monthly Earnings</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <Star className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{stats.rating}</p>
                <p className="text-xs text-slate-500">Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Today's Appointments */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Today's Appointments</CardTitle>
              <Link to="/doctor/schedule">
                <Button variant="ghost" size="sm" className="gap-1">
                  View All <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {todayAppointments.map((apt) => (
                <div key={apt.id} className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-blue-100 text-blue-700">
                      {apt.patient.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-medium text-slate-900">{apt.patient}</h4>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {apt.time}
                      {apt.type === 'video' && <Video className="w-3 h-3 ml-2" />}
                    </p>
                  </div>
                  <Badge className={
                    apt.status === 'completed' ? 'bg-green-100 text-green-700' :
                    apt.status === 'in-progress' ? 'bg-amber-100 text-amber-700' :
                    'bg-slate-100 text-slate-700'
                  }>
                    {apt.status}
                  </Badge>
                  {apt.status === 'in-progress' && (
                    <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                      Join
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Performance Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Performance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600">Appointment Completion Rate</span>
                    <span className="text-sm font-medium text-slate-900">{stats.completionRate}%</span>
                  </div>
                  <Progress value={stats.completionRate} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600">Patient Satisfaction</span>
                    <span className="text-sm font-medium text-slate-900">98%</span>
                  </div>
                  <Progress value={98} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600">Response Time</span>
                    <span className="text-sm font-medium text-slate-900">2.5 min avg</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Recent Patients */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Recent Patients</CardTitle>
              <Link to="/doctor/patients">
                <Button variant="ghost" size="sm">See All</Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentPatients.map((patient) => (
                <div key={patient.id} className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-blue-100 text-blue-700 text-sm">
                      {patient.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-900 text-sm">{patient.name}</p>
                    <p className="text-xs text-slate-500">{patient.condition}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">{patient.status}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-gradient-to-br from-amber-500 to-orange-600 text-white">
            <CardContent className="p-4">
              <h4 className="font-medium mb-3">Quick Actions</h4>
              <div className="space-y-2">
                <Button variant="secondary" size="sm" className="w-full justify-start gap-2">
                  <FileText className="w-4 h-4" /> Write Prescription
                </Button>
                <Button variant="secondary" size="sm" className="w-full justify-start gap-2">
                  <Activity className="w-4 h-4" /> Add Medical Notes
                </Button>
                <Button variant="secondary" size="sm" className="w-full justify-start gap-2">
                  <MessageSquare className="w-4 h-4" /> Message Patient
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
