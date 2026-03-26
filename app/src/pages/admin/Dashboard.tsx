import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
  Users,
  Stethoscope,
  Building2,
  Video,
  DollarSign,
  TrendingUp,
  Activity,
  Shield,
  ChevronRight,
  AlertTriangle,
  CheckCircle,
  Clock,
  Globe,
} from 'lucide-react';

const AdminDashboard = () => {
  const stats = {
    totalUsers: 12580,
    totalDoctors: 486,
    totalHospitals: 48,
    totalConsultations: 15234,
    monthlyRevenue: 48500000,
    activeNow: 1245,
  };

  const recentSignups = [
    { id: 1, name: 'Dr. Khin Mya', type: 'doctor', date: '2 hours ago', status: 'pending' },
    { id: 2, name: 'Asia Royal Hospital', type: 'hospital', date: '3 hours ago', status: 'verified' },
    { id: 3, name: 'Aung Kyaw', type: 'patient', date: '4 hours ago', status: 'active' },
    { id: 4, name: 'Dr. Than Htut', type: 'doctor', date: '5 hours ago', status: 'pending' },
  ];

  const topHospitals = [
    { name: 'Yangon General Hospital', patients: 1256, revenue: 5200000, rating: 4.8 },
    { name: 'Asia Royal Hospital', patients: 892, revenue: 3800000, rating: 4.7 },
    { name: 'Pun Hlaing Hospital', patients: 756, revenue: 2900000, rating: 4.6 },
  ];

  const systemHealth = {
    uptime: '99.9%',
    responseTime: '245ms',
    errors: 2,
    serverLoad: 45,
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-amber-500" />;
      default:
        return <Activity className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="text-slate-500 mt-1">Platform-wide overview and management</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Globe className="w-4 h-4" />
            System Status
          </Button>
          <Link to="/admin/users">
            <Button className="bg-slate-800 hover:bg-slate-900 gap-2">
              <Users className="w-4 h-4" />
              Manage Users
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{(stats.totalUsers / 1000).toFixed(1)}K</p>
                <p className="text-xs text-slate-500">Total Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-amber-600" />
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
              <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-violet-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{stats.totalHospitals}</p>
                <p className="text-xs text-slate-500">Hospitals</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center">
                <Video className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{(stats.totalConsultations / 1000).toFixed(1)}K</p>
                <p className="text-xs text-slate-500">Consultations</p>
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
                <Activity className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{stats.activeNow}</p>
                <p className="text-xs text-slate-500">Active Now</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Signups */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Recent Signups</CardTitle>
              <Link to="/admin/users">
                <Button variant="ghost" size="sm" className="gap-1">
                  View All <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentSignups.map((user) => (
                <div key={user.id} className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className={`${
                      user.type === 'doctor' ? 'bg-amber-100 text-amber-700' :
                      user.type === 'hospital' ? 'bg-violet-100 text-violet-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-medium text-slate-900">{user.name}</h4>
                    <p className="text-xs text-slate-500 capitalize">{user.type} • {user.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(user.status)}
                    <Badge variant="outline" className="text-xs capitalize">{user.status}</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Top Hospitals */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Top Performing Hospitals</CardTitle>
              <Link to="/admin/hospitals">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
              {topHospitals.map((hospital, index) => (
                <div key={hospital.name} className="flex items-center gap-4">
                  <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-sm font-medium text-slate-600">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <h4 className="font-medium text-slate-900">{hospital.name}</h4>
                    <p className="text-xs text-slate-500">{hospital.patients} patients</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-slate-900">{(hospital.revenue / 1000000).toFixed(1)}M MMK</p>
                    <div className="flex items-center gap-1 justify-end">
                      <span className="text-amber-500">⭐</span>
                      <span className="text-xs text-slate-500">{hospital.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* System Health */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-500" />
                System Health
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">Uptime</span>
                  <span className="text-sm font-medium text-green-600">{systemHealth.uptime}</span>
                </div>
                <Progress value={99.9} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">Response Time</span>
                  <span className="text-sm font-medium text-slate-900">{systemHealth.responseTime}</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">Server Load</span>
                  <span className="text-sm font-medium text-slate-900">{systemHealth.serverLoad}%</span>
                </div>
                <Progress value={systemHealth.serverLoad} className="h-2" />
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-sm text-slate-600">Active Errors</span>
                <Badge className={systemHealth.errors === 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                  {systemHealth.errors}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Pending Verifications */}
          <Card className="bg-amber-50 border-amber-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-amber-800">Pending Verifications</h4>
                  <p className="text-sm text-amber-700 mt-1">
                    8 doctors and 2 hospitals are awaiting verification.
                  </p>
                  <Link to="/admin/verifications">
                    <Button size="sm" className="mt-3 bg-amber-600 hover:bg-amber-700">
                      Review Now
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Platform Growth</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-600">New Users (Today)</span>
                <span className="font-bold text-green-600 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" /> +45
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-600">Consultations (Today)</span>
                <span className="font-bold text-slate-900">128</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-600">Revenue (Today)</span>
                <span className="font-bold text-slate-900">1.8M MMK</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
