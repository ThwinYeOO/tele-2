import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import {
  FileText,
  Download,
  Share2,
  Calendar,
  Stethoscope,
  Building2,
  Search,
  Filter,
  Image as ImageIcon,
  FileBarChart,
  Activity,
} from 'lucide-react';

const PatientRecords = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const records = {
    all: [
      {
        id: 1,
        title: 'Annual Health Checkup',
        doctor: 'Dr. Than Htut',
        hospital: 'Yangon General Hospital',
        date: '2024-03-15',
        type: 'checkup',
        category: 'General',
        files: 3,
      },
      {
        id: 2,
        title: 'Blood Test Results',
        doctor: 'Dr. Khin Mya',
        hospital: 'Asia Royal Hospital',
        date: '2024-03-10',
        type: 'lab',
        category: 'Laboratory',
        files: 2,
      },
      {
        id: 3,
        title: 'Chest X-Ray',
        doctor: 'Dr. Aung Win',
        hospital: 'Pun Hlaing Hospital',
        date: '2024-02-28',
        type: 'imaging',
        category: 'Radiology',
        files: 1,
      },
      {
        id: 4,
        title: 'ECG Report',
        doctor: 'Dr. Khin Mya',
        hospital: 'Yangon General Hospital',
        date: '2024-02-15',
        type: 'lab',
        category: 'Cardiology',
        files: 1,
      },
      {
        id: 5,
        title: 'Prescription - Amoxicillin',
        doctor: 'Dr. Su Su',
        hospital: 'Bahosi Hospital',
        date: '2024-02-10',
        type: 'prescription',
        category: 'Medication',
        files: 1,
      },
    ],
    lab: [
      {
        id: 2,
        title: 'Blood Test Results',
        doctor: 'Dr. Khin Mya',
        hospital: 'Asia Royal Hospital',
        date: '2024-03-10',
        type: 'lab',
        category: 'Laboratory',
        files: 2,
      },
      {
        id: 4,
        title: 'ECG Report',
        doctor: 'Dr. Khin Mya',
        hospital: 'Yangon General Hospital',
        date: '2024-02-15',
        type: 'lab',
        category: 'Cardiology',
        files: 1,
      },
    ],
    imaging: [
      {
        id: 3,
        title: 'Chest X-Ray',
        doctor: 'Dr. Aung Win',
        hospital: 'Pun Hlaing Hospital',
        date: '2024-02-28',
        type: 'imaging',
        category: 'Radiology',
        files: 1,
      },
    ],
    prescriptions: [
      {
        id: 5,
        title: 'Prescription - Amoxicillin',
        doctor: 'Dr. Su Su',
        hospital: 'Bahosi Hospital',
        date: '2024-02-10',
        type: 'prescription',
        category: 'Medication',
        files: 1,
      },
    ],
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lab':
        return <FileBarChart className="w-5 h-5 text-blue-600" />;
      case 'imaging':
        return <ImageIcon className="w-5 h-5 text-purple-600" />;
      case 'prescription':
        return <Activity className="w-5 h-5 text-green-600" />;
      default:
        return <FileText className="w-5 h-5 text-teal-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'lab':
        return 'bg-blue-50 text-blue-700';
      case 'imaging':
        return 'bg-purple-50 text-purple-700';
      case 'prescription':
        return 'bg-green-50 text-green-700';
      default:
        return 'bg-teal-50 text-teal-700';
    }
  };

  const renderRecordCard = (record: any) => (
    <Card key={record.id} className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-xl ${getTypeColor(record.type)} flex items-center justify-center`}>
            {getTypeIcon(record.type)}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-semibold text-slate-900">{record.title}</h4>
                <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-slate-500">
                  <span className="flex items-center gap-1">
                    <Stethoscope className="w-3 h-3" /> {record.doctor}
                  </span>
                  <span className="flex items-center gap-1">
                    <Building2 className="w-3 h-3" /> {record.hospital}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <Badge variant="outline" className="text-xs">{record.category}</Badge>
                  <span className="flex items-center gap-1 text-xs text-slate-500">
                    <Calendar className="w-3 h-3" /> {record.date}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Medical Records</h1>
          <p className="text-slate-500 mt-1">Access and manage your health records</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Download All
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                placeholder="Search records by title, doctor, or hospital..."
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

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center">
                <FileText className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">12</p>
                <p className="text-xs text-slate-500">Total Records</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <FileBarChart className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">5</p>
                <p className="text-xs text-slate-500">Lab Reports</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <ImageIcon className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">3</p>
                <p className="text-xs text-slate-500">Imaging</p>
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
                <p className="text-2xl font-bold text-slate-900">8</p>
                <p className="text-xs text-slate-500">Prescriptions</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Records</TabsTrigger>
          <TabsTrigger value="lab">Lab Reports</TabsTrigger>
          <TabsTrigger value="imaging">Imaging</TabsTrigger>
          <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-6">
          {records.all.map(renderRecordCard)}
        </TabsContent>

        <TabsContent value="lab" className="space-y-4 mt-6">
          {records.lab.map(renderRecordCard)}
        </TabsContent>

        <TabsContent value="imaging" className="space-y-4 mt-6">
          {records.imaging.map(renderRecordCard)}
        </TabsContent>

        <TabsContent value="prescriptions" className="space-y-4 mt-6">
          {records.prescriptions.map(renderRecordCard)}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientRecords;
