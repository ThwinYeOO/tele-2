import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
  Users,
  UserPlus,
  Calendar,
  FlaskConical,
  DollarSign,
  ChevronRight,
  Bed,
  Stethoscope,
} from 'lucide-react';

const HospitalDashboard = () => {
  const stats = {
    totalDoctors: 48,
    totalPatients: 1256,
    todayAppointments: 89,
    monthlyRevenue: 12500000,
    bedOccupancy: 78,
    labPending: 23,
  };

  const recentPatients = [
    { id: 1, name: 'Aung Kyaw', doctor: 'Dr. Khin Mya', department: 'Cardiology', status: 'admitted', time: '2 hours ago' },
    { id: 2, name: 'Mya Mya', doctor: 'Dr. Su Su', department: 'Pediatrics', status: 'discharged', time: '4 hours ago' },
    { id: 3, name: 'Than Htut', doctor: 'Dr. Aung Win', department: 'Orthopedics', status: 'in-treatment', time: '5 hours ago' },
    { id: 4, name: 'Hla Hla', doctor: 'Dr. Myo Min', department: 'General', status: 'admitted', time: '6 hours ago' },
  ];

  const departmentStats = [
    { name: 'Cardiology', patients: 45, doctors: 8, occupancy: 85 },
    { name: 'Pediatrics', patients: 67, doctors: 12, occupancy: 72 },
    { name: 'Orthopedics', patients: 34, doctors: 6, occupancy: 60 },
    { name: 'General', patients: 89, doctors: 15, occupancy: 90 },
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      admitted: 'bg-green-100 text-green-700',
      discharged: 'bg-blue-100 text-blue-700',
      'in-treatment': 'bg-amber-100 text-amber-700',
    };
    return colors[status] || 'bg-slate-100 text-slate-700';
  };

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Hospital Dashboard</h1>
          <p className="text-slate-500 mt-1">Yangon General Hospital - Overview</p>
        </div>
        <div className="flex gap-3">
          <Link to="/hospital/doctors">
            <Button variant="outline" className="gap-2">
              <UserPlus className="w-4 h-4" />
              Add Doctor
            </Button>
          </Link>
          <Link to="/hospital/appointments">
            <Button className="bg-violet-600 hover:bg-violet-700 gap-2">
              <Calendar className="w-4 h-4" />
              View Schedule
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-violet-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{stats.totalDoctors}</p>
                <p className="text-xs text-slate-500">Doctors</p>
              </div>
            </div>
          </CardContent>
        </Card>
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
                <p className="text-2xl font-bold text-slate-900">{(stats.monthlyRevenue / 1000000).toFixed(1)}M</p>
                <p className="text-xs text-slate-500">Monthly Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <Bed className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{stats.bedOccupancy}%</p>
                <p className="text-xs text-slate-500">Bed Occupancy</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                <FlaskConical className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{stats.labPending}</p>
                <p className="text-xs text-slate-500">Pending Lab</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Patients */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Recent Patients</CardTitle>
              <Link to="/hospital/patients">
                <Button variant="ghost" size="sm" className="gap-1">
                  View All <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentPatients.map((patient) => (
                <div key={patient.id} className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-violet-100 text-violet-700">
                      {patient.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-medium text-slate-900">{patient.name}</h4>
                    <p className="text-xs text-slate-500">
                      {patient.doctor} • {patient.department}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusColor(patient.status)}>{patient.status}</Badge>
                    <p className="text-xs text-slate-400 mt-1">{patient.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Department Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Department Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {departmentStats.map((dept) => (
                <div key={dept.name}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-slate-900">{dept.name}</span>
                      <span className="text-xs text-slate-500">
                        {dept.patients} patients • {dept.doctors} doctors
                      </span>
                    </div>
                    <span className="text-sm font-medium text-slate-900">{dept.occupancy}%</span>
                  </div>
                  <Progress value={dept.occupancy} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="bg-gradient-to-br from-violet-500 to-purple-600 text-white">
            <CardContent className="p-4">
              <h4 className="font-medium mb-3">Quick Actions</h4>
              <div className="space-y-2">
                <Button variant="secondary" size="sm" className="w-full justify-start gap-2">
                  <UserPlus className="w-4 h-4" /> Register Patient
                </Button>
                <Button variant="secondary" size="sm" className="w-full justify-start gap-2">
                  <FlaskConical className="w-4 h-4" /> Add Lab Result
                </Button>
                <Button variant="secondary" size="sm" className="w-full justify-start gap-2">
                  <Bed className="w-4 h-4" /> Manage Beds
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Today's Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Today's Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-600">Admissions</span>
                <span className="font-bold text-slate-900">12</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-600">Discharges</span>
                <span className="font-bold text-slate-900">8</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-600">Surgeries</span>
                <span className="font-bold text-slate-900">3</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-600">Emergency</span>
                <span className="font-bold text-slate-900">5</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HospitalDashboard;
