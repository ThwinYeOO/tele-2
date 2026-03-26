import { useEffect, useMemo, useState } from 'react';
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
import { api } from '@/lib/api';

const PatientAppointments = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [appointments, setAppointments] = useState<Array<{
    id: string;
    doctor: { id: string; name: string };
    patient: { id: string; name: string };
    scheduledAt: string;
    type: 'video' | 'in_person';
    status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
    notes?: string | null;
  }>>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setIsLoading(true);
        setError('');
        const res = await api.get<{ appointments: any[] }>('/api/appointments');
        if (cancelled) return;
        setAppointments(
          res.appointments.map((a) => ({
            id: a.id,
            doctor: a.doctor,
            patient: a.patient,
            scheduledAt: a.scheduledAt,
            type: a.type,
            status: a.status,
            notes: a.notes,
          }))
        );
      } catch (e: any) {
        if (!cancelled) setError(e?.message || 'Failed to load appointments');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const grouped = useMemo(() => {
    const now = Date.now();
    const upcoming = [] as typeof appointments;
    const past = [] as typeof appointments;
    const cancelled = [] as typeof appointments;

    for (const a of appointments) {
      if (a.status === 'cancelled') cancelled.push(a);
      else if (new Date(a.scheduledAt).getTime() < now) past.push(a);
      else upcoming.push(a);
    }
    return { upcoming, past, cancelled };
  }, [appointments]);

  const cancelAppointment = async (id: string) => {
    try {
      await api.post(`/api/appointments/${id}/cancel`);
      setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status: 'cancelled' } : a)));
    } catch (e: any) {
      setError(e?.message || 'Cancel failed');
    }
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

  const renderAppointmentCard = (apt: any) => {
    const d = new Date(apt.scheduledAt);
    const date = d.toISOString().slice(0, 10);
    const time = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return (
    <Card key={apt.id} className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Doctor Info */}
          <div className="flex items-center gap-4 flex-1">
            <Avatar className="w-14 h-14">
              <AvatarFallback className="bg-teal-100 text-teal-700 text-lg">
                {apt.doctor.name.split(' ').map((n: string) => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-semibold text-slate-900">{apt.doctor.name}</h4>
            </div>
          </div>

          {/* Date & Time */}
          <div className="flex items-center gap-6 lg:justify-center">
            <div className="text-center">
              <p className="text-xs text-slate-500">Date</p>
              <p className="font-medium text-slate-900">{date}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-slate-500">Time</p>
              <p className="font-medium text-slate-900">{time}</p>
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
                    <DropdownMenuItem className="text-red-600" onClick={() => cancelAppointment(apt.id)}>
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
  };

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
            Upcoming ({grouped.upcoming.length})
          </TabsTrigger>
          <TabsTrigger value="past">
            Past ({grouped.past.length})
          </TabsTrigger>
          <TabsTrigger value="cancelled">
            Cancelled ({grouped.cancelled.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4 mt-6">
          {error && <div className="text-sm text-red-600">{error}</div>}
          {isLoading ? <div className="text-slate-600">Loading…</div> : grouped.upcoming.map(renderAppointmentCard)}
        </TabsContent>

        <TabsContent value="past" className="space-y-4 mt-6">
          {error && <div className="text-sm text-red-600">{error}</div>}
          {isLoading ? <div className="text-slate-600">Loading…</div> : grouped.past.map(renderAppointmentCard)}
        </TabsContent>

        <TabsContent value="cancelled" className="space-y-4 mt-6">
          {error && <div className="text-sm text-red-600">{error}</div>}
          {isLoading ? <div className="text-slate-600">Loading…</div> : grouped.cancelled.map(renderAppointmentCard)}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientAppointments;
