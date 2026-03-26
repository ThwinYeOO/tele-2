import { Card, CardContent } from '@/components/ui/card';
import { Video } from 'lucide-react';

const DoctorConsultations = () => {
  return (
    <div className="p-4 lg:p-8 space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Consultations</h1>
        <p className="text-slate-500 mt-1">Manage your video consultations</p>
      </div>

      <Card>
        <CardContent className="p-12 text-center">
          <Video className="w-16 h-16 mx-auto text-slate-300 mb-4" />
          <h3 className="text-lg font-medium text-slate-900">Consultation Management</h3>
          <p className="text-slate-500">Consultation interface coming soon</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorConsultations;
