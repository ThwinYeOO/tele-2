import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Search,
  Filter,
  FileText,
  Calendar,
  MessageSquare,
  Phone,
  Users,
  TrendingUp,
  Activity,
} from 'lucide-react';

const DoctorPatients = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const patients = [
    {
      id: 1,
      name: 'Aung Kyaw',
      age: 45,
      gender: 'Male',
      phone: '+95 9 123 456 789',
      lastVisit: 'Today',
      condition: 'Hypertension',
      status: 'active',
      visits: 12,
    },
    {
      id: 2,
      name: 'Mya Mya',
      age: 52,
      gender: 'Female',
      phone: '+95 9 234 567 890',
      lastVisit: 'Today',
      condition: 'Diabetes Type 2',
      status: 'active',
      visits: 8,
    },
    {
      id: 3,
      name: 'Than Htut',
      age: 35,
      gender: 'Male',
      phone: '+95 9 345 678 901',
      lastVisit: '3 days ago',
      condition: 'Common Cold',
      status: 'recovered',
      visits: 3,
    },
    {
      id: 4,
      name: 'Hla Hla',
      age: 28,
      gender: 'Female',
      phone: '+95 9 456 789 012',
      lastVisit: '1 week ago',
      condition: 'Asthma',
      status: 'active',
      visits: 15,
    },
    {
      id: 5,
      name: 'Min Thu',
      age: 60,
      gender: 'Male',
      phone: '+95 9 567 890 123',
      lastVisit: '2 weeks ago',
      condition: 'Heart Disease',
      status: 'critical',
      visits: 25,
    },
  ];

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.condition.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      active: 'bg-green-100 text-green-700',
      recovered: 'bg-blue-100 text-blue-700',
      critical: 'bg-red-100 text-red-700',
    };
    return colors[status] || 'bg-slate-100 text-slate-700';
  };

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">My Patients</h1>
          <p className="text-slate-500 mt-1">Manage your patient records and history</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <TrendingUp className="w-4 h-4" />
            Analytics
          </Button>
          <Button className="bg-amber-600 hover:bg-amber-700 gap-2">
            <Users className="w-4 h-4" />
            Add Patient
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">156</p>
                <p className="text-xs text-slate-500">Total Patients</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <Activity className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">89</p>
                <p className="text-xs text-slate-500">Active</p>
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
                <p className="text-2xl font-bold text-slate-900">12</p>
                <p className="text-xs text-slate-500">New This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">5</p>
                <p className="text-xs text-slate-500">Critical</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                placeholder="Search patients by name or condition..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Patients List */}
      <div className="space-y-3">
        {filteredPatients.map((patient) => (
          <Card key={patient.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <Avatar className="w-14 h-14">
                  <AvatarFallback className="bg-blue-100 text-blue-700">
                    {patient.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-slate-900">{patient.name}</h4>
                    <Badge className={getStatusColor(patient.status)}>{patient.status}</Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 mt-1 text-sm text-slate-500">
                    <span>{patient.age} years • {patient.gender}</span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3" /> {patient.phone}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> Last visit: {patient.lastVisit}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">
                    <span className="font-medium">Condition:</span> {patient.condition}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <FileText className="w-4 h-4" />
                    Records
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <MessageSquare className="w-4 h-4" />
                    Message
                  </Button>
                  <Button size="sm" className="bg-amber-600 hover:bg-amber-700 gap-1">
                    <Calendar className="w-4 h-4" />
                    Book
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DoctorPatients;
