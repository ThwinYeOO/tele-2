import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Video, Phone, MessageSquare, FileText, Download, Clock, Calendar } from 'lucide-react';

const PatientConsultations = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const consultations = {
    upcoming: [
      {
        id: 1,
        doctor: 'Dr. Khin Mya',
        specialty: 'Cardiologist',
        date: 'Today, 2:30 PM',
        type: 'video',
        status: 'scheduled',
        duration: '30 min',
        notes: 'Follow-up consultation for blood pressure',
      },
    ],
    past: [
      {
        id: 2,
        doctor: 'Dr. Aung Win',
        specialty: 'Dermatologist',
        date: 'Mar 15, 2024',
        type: 'video',
        status: 'completed',
        duration: '25 min',
        prescription: true,
        report: true,
        notes: 'Skin rash examination and treatment prescribed',
      },
      {
        id: 3,
        doctor: 'Dr. Khin Mya',
        specialty: 'Cardiologist',
        date: 'Mar 10, 2024',
        type: 'video',
        status: 'completed',
        duration: '30 min',
        prescription: true,
        report: true,
        notes: 'Initial cardiac consultation',
      },
      {
        id: 4,
        doctor: 'Dr. Su Su',
        specialty: 'Pediatrician',
        date: 'Feb 28, 2024',
        type: 'audio',
        status: 'completed',
        duration: '20 min',
        prescription: true,
        report: false,
        notes: 'Child fever consultation',
      },
    ],
  };

  const renderConsultationCard = (consultation: any) => (
    <Card key={consultation.id} className="hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <Avatar className="w-16 h-16">
            <AvatarFallback className="bg-teal-100 text-teal-700 text-lg">
              {consultation.doctor.split(' ').map((n: string) => n[0]).join('')}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-slate-900">{consultation.doctor}</h4>
              <Badge variant="outline" className="text-xs">{consultation.specialty}</Badge>
            </div>
            <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-slate-500">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" /> {consultation.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" /> {consultation.duration}
              </span>
              <span className="flex items-center gap-1">
                {consultation.type === 'video' ? (
                  <Video className="w-4 h-4" />
                ) : (
                  <Phone className="w-4 h-4" />
                )}
                {consultation.type}
              </span>
            </div>
            {consultation.notes && (
              <p className="text-sm text-slate-500 mt-2">{consultation.notes}</p>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {consultation.status === 'scheduled' ? (
              <Button className="bg-teal-600 hover:bg-teal-700 gap-2">
                <Video className="w-4 h-4" />
                Join Call
              </Button>
            ) : (
              <>
                {consultation.prescription && (
                  <Button variant="outline" size="sm" className="gap-2">
                    <FileText className="w-4 h-4" />
                    Prescription
                  </Button>
                )}
                {consultation.report && (
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="w-4 h-4" />
                    Report
                  </Button>
                )}
                <Button variant="ghost" size="sm">
                  <MessageSquare className="w-4 h-4 mr-1" />
                  Chat
                </Button>
              </>
            )}
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
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">My Consultations</h1>
          <p className="text-slate-500 mt-1">View and manage your video consultations</p>
        </div>
        <Button className="bg-teal-600 hover:bg-teal-700 gap-2">
          <Video className="w-4 h-4" />
          New Consultation
        </Button>
      </div>

      {/* How It Works */}
      <Card className="bg-gradient-to-r from-teal-50 to-cyan-50 border-teal-100">
        <CardContent className="p-5">
          <h3 className="font-semibold text-slate-900 mb-4">How Online Consultation Works</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { step: 1, title: 'Book', desc: 'Choose doctor & time' },
              { step: 2, title: 'Pay', desc: 'Secure payment' },
              { step: 3, title: 'Connect', desc: 'Join video call' },
              { step: 4, title: 'Follow-up', desc: 'Get prescription' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold">
                  {item.step}
                </div>
                <p className="font-medium text-slate-900">{item.title}</p>
                <p className="text-xs text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 lg:w-auto">
          <TabsTrigger value="upcoming">
            Upcoming ({consultations.upcoming.length})
          </TabsTrigger>
          <TabsTrigger value="past">
            Past ({consultations.past.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4 mt-6">
          {consultations.upcoming.length > 0 ? (
            consultations.upcoming.map(renderConsultationCard)
          ) : (
            <div className="text-center py-12">
              <Video className="w-16 h-16 mx-auto text-slate-300 mb-4" />
              <h3 className="text-lg font-medium text-slate-900">No upcoming consultations</h3>
              <p className="text-slate-500">Book a consultation with a doctor</p>
              <Button className="mt-4 bg-teal-600 hover:bg-teal-700">Book Now</Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-4 mt-6">
          {consultations.past.map(renderConsultationCard)}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientConsultations;
