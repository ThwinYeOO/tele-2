import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, Clock, Video, MapPin, ChevronLeft, ChevronRight, Plus } from 'lucide-react';

const DoctorSchedule = () => {
  const currentWeek = 'Mar 25 - Mar 31, 2024';

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const dates = ['25', '26', '27', '28', '29', '30', '31'];

  const schedule = {
    monday: [
      { time: '09:00 - 10:00', patient: 'Aung Kyaw', type: 'video', status: 'confirmed' },
      { time: '10:30 - 11:30', patient: 'Mya Mya', type: 'in-person', status: 'confirmed' },
      { time: '14:00 - 15:00', patient: 'Available', type: 'slot', status: 'available' },
    ],
    tuesday: [
      { time: '09:00 - 12:00', patient: 'Hospital Duty', type: 'duty', status: 'busy' },
      { time: '14:00 - 16:00', patient: 'Available', type: 'slot', status: 'available' },
    ],
    wednesday: [
      { time: '10:00 - 11:00', patient: 'Than Htut', type: 'video', status: 'confirmed' },
      { time: '11:30 - 12:30', patient: 'Hla Hla', type: 'in-person', status: 'confirmed' },
      { time: '15:00 - 16:00', patient: 'Available', type: 'slot', status: 'available' },
    ],
    thursday: [
      { time: '09:00 - 10:00', patient: 'Available', type: 'slot', status: 'available' },
      { time: '10:30 - 11:30', patient: 'Min Thu', type: 'video', status: 'confirmed' },
    ],
    friday: [
      { time: '09:00 - 12:00', patient: 'Clinic Hours', type: 'duty', status: 'busy' },
    ],
    saturday: [
      { time: '10:00 - 14:00', patient: 'Available', type: 'slot', status: 'available' },
    ],
    sunday: [
      { time: 'All Day', patient: 'Day Off', type: 'off', status: 'off' },
    ],
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      confirmed: 'bg-green-100 text-green-700',
      available: 'bg-blue-100 text-blue-700',
      busy: 'bg-amber-100 text-amber-700',
      off: 'bg-slate-100 text-slate-500',
    };
    return colors[status] || 'bg-slate-100 text-slate-700';
  };

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">My Schedule</h1>
          <p className="text-slate-500 mt-1">Manage your availability and appointments</p>
        </div>
        <Button className="bg-amber-600 hover:bg-amber-700 gap-2">
          <Plus className="w-4 h-4" />
          Set Availability
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
              <CalendarIcon className="w-5 h-5 text-slate-500" />
              <span className="font-medium">{currentWeek}</span>
            </div>
            <Button variant="ghost" size="icon">
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Schedule */}
      <div className="grid lg:grid-cols-7 gap-4">
        {weekDays.map((day, index) => (
          <Card key={day} className={index === 1 ? 'ring-2 ring-amber-500' : ''}>
            <CardHeader className="p-4 pb-2">
              <div className="text-center">
                <p className="text-sm text-slate-500">{day}</p>
                <p className={`text-xl font-bold ${index === 1 ? 'text-amber-600' : 'text-slate-900'}`}>
                  {dates[index]}
                </p>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-2">
              {schedule[day.toLowerCase() as keyof typeof schedule]?.map((slot, i) => (
                <div 
                  key={i} 
                  className={`p-2 rounded-lg text-xs ${
                    slot.status === 'available' 
                      ? 'bg-blue-50 border border-blue-200 border-dashed cursor-pointer hover:bg-blue-100' 
                      : slot.status === 'off'
                      ? 'bg-slate-50 text-slate-400'
                      : 'bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-1 text-slate-500 mb-1">
                    <Clock className="w-3 h-3" />
                    {slot.time}
                  </div>
                  <p className={`font-medium ${slot.status === 'off' ? 'text-slate-400' : 'text-slate-700'}`}>
                    {slot.patient}
                  </p>
                  {slot.type !== 'slot' && slot.type !== 'off' && (
                    <div className="flex items-center gap-1 mt-1">
                      {slot.type === 'video' && <Video className="w-3 h-3 text-blue-500" />}
                      {slot.type === 'in-person' && <MapPin className="w-3 h-3 text-green-500" />}
                      <Badge className={`text-[10px] ${getStatusColor(slot.status)}`}>
                        {slot.status}
                      </Badge>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-slate-900">32</p>
            <p className="text-xs text-slate-500">Hours This Week</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-slate-900">18</p>
            <p className="text-xs text-slate-500">Appointments</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-slate-900">6</p>
            <p className="text-xs text-slate-500">Available Slots</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-slate-900">2</p>
            <p className="text-xs text-slate-500">Days Off</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DoctorSchedule;
