import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Calendar,
  Video,
  MapPin,
  MoreVertical,
  X,
  RotateCcw,
  FileText,
  Stethoscope,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const PatientAppointments = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const appointments = {
    upcoming: [
      {
        id: 1,
        doctor: 'Dr. Khin Mya',
        specialty: 'Cardiologist',
        hospital: 'Yangon General Hospital',
        date: '2024-03-26',
        time: '2:30 PM',
        type: 'video',
        status: 'confirmed',
        notes: 'Follow-up for blood pressure monitoring',
      },
      {
        id: 2,
        doctor: 'Dr. Than Htut',
        specialty: 'General Physician',
        hospital: 'Asia Royal Hospital',
        date: '2024-03-27',
        time: '10:00 AM',
        type: 'in-person',
        status: 'pending',
        notes: 'Annual health checkup',
      },
      {
        id: 3,
        doctor: 'Dr. Su Su',
        specialty: 'Dermatologist',
        hospital: 'Pun Hlaing Hospital',
        date: '2024-03-29',
        time: '3:00 PM',
        type: 'video',
        status: 'confirmed',
        notes: 'Skin rash consultation',
      },
    ],
    past: [
      {
        id: 4,
        doctor: 'Dr. Aung Win',
        specialty: 'Orthopedic',
        hospital: 'Yangon General Hospital',
        date: '2024-03-15',
        time: '11:00 AM',
        type: 'in-person',
        status: 'completed',
        notes: 'Knee pain assessment',
      },
      {
        id: 5,
        doctor: 'Dr. Khin Mya',
        specialty: 'Cardiologist',
        hospital: 'Yangon General Hospital',
        date: '2024-03-10',
        time: '2:00 PM',
        type: 'video',
        status: 'completed',
        notes: 'Initial consultation',
      },
    ],
    cancelled: [
      {
        id: 6,
        doctor: 'Dr. Myo Min',
        specialty: 'ENT Specialist',
        hospital: 'Bahosi Hospital',
        date: '2024-03-20',
        time: '9:00 AM',
        type: 'in-person',
        status: 'cancelled',
        notes: 'Ear infection check',
      },
    ],
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      confirmed: 'bg-green-100 text-green-700 hover:bg-green-100',
      pending: 'bg-amber-100 text-amber-700 hover:bg-amber-100',
      completed: 'bg-blue-100 text-blue-700 hover:bg-blue-100',
      cancelled: 'bg-red-100 text-red-700 hover:bg-red-100',
    };
    return styles[status] || 'bg-slate-100 text-slate-700';
  };

  const renderAppointmentCard = (apt: any) => (
    <Card key={apt.id} className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Doctor Info */}
          <div className="flex items-center gap-4 flex-1">
            <Avatar className="w-14 h-14">
              <AvatarFallback className="bg-teal-100 text-teal-700 text-lg">
                {apt.doctor.split(' ').map((n: string) => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-semibold text-slate-900">{apt.doctor}</h4>
              <p className="text-sm text-slate-500">{apt.specialty}</p>
              <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3" /> {apt.hospital}
              </p>
            </div>
          </div>

          {/* Date & Time */}
          <div className="flex items-center gap-6 lg:justify-center">
            <div className="text-center">
              <p className="text-xs text-slate-500">Date</p>
              <p className="font-medium text-slate-900">{apt.date}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-slate-500">Time</p>
              <p className="font-medium text-slate-900">{apt.time}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-slate-500">Type</p>
              <div className="flex items-center gap-1">
                {apt.type === 'video' ? (
                  <Video className="w-4 h-4 text-teal-600" />
                ) : (
                  <MapPin className="w-4 h-4 text-blue-600" />
                )}
                <span className="text-sm capitalize">{apt.type}</span>
              </div>
            </div>
          </div>

          {/* Status & Actions */}
          <div className="flex items-center justify-between lg:justify-end gap-4">
            <Badge className={getStatusBadge(apt.status)}>{apt.status}</Badge>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {apt.status === 'confirmed' && (
                  <>
                    {apt.type === 'video' && (
                      <DropdownMenuItem>
                        <Video className="w-4 h-4 mr-2" /> Join Call
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem>
                      <Calendar className="w-4 h-4 mr-2" /> Reschedule
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <X className="w-4 h-4 mr-2" /> Cancel
                    </DropdownMenuItem>
                  </>
                )}
                {apt.status === 'completed' && (
                  <>
                    <DropdownMenuItem>
                      <FileText className="w-4 h-4 mr-2" /> View Report
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <RotateCcw className="w-4 h-4 mr-2" /> Book Again
                    </DropdownMenuItem>
                  </>
                )}
                {apt.status === 'cancelled' && (
                  <DropdownMenuItem>
                    <RotateCcw className="w-4 h-4 mr-2" /> Rebook
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {apt.notes && (
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm text-slate-500">
              <span className="font-medium">Notes:</span> {apt.notes}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">My Appointments</h1>
          <p className="text-slate-500 mt-1">Manage your upcoming and past appointments</p>
        </div>
        <Button className="bg-teal-600 hover:bg-teal-700 gap-2">
          <Stethoscope className="w-4 h-4" />
          Book New Appointment
        </Button>
      </div>

      {/* Calendar Navigation */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-slate-500" />
              <span className="font-medium">March 2024</span>
            </div>
            <Button variant="ghost" size="icon">
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 lg:w-auto">
          <TabsTrigger value="upcoming">
            Upcoming ({appointments.upcoming.length})
          </TabsTrigger>
          <TabsTrigger value="past">
            Past ({appointments.past.length})
          </TabsTrigger>
          <TabsTrigger value="cancelled">
            Cancelled ({appointments.cancelled.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4 mt-6">
          {appointments.upcoming.map(renderAppointmentCard)}
        </TabsContent>

        <TabsContent value="past" className="space-y-4 mt-6">
          {appointments.past.map(renderAppointmentCard)}
        </TabsContent>

        <TabsContent value="cancelled" className="space-y-4 mt-6">
          {appointments.cancelled.map(renderAppointmentCard)}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientAppointments;
