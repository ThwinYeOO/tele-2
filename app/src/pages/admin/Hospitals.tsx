import { Card, CardContent } from '@/components/ui/card';
import { Building2 } from 'lucide-react';

const AdminHospitals = () => {
  return (
    <div className="p-4 lg:p-8 space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Hospitals</h1>
        <p className="text-slate-500 mt-1">Manage all registered hospitals</p>
      </div>

      <Card>
        <CardContent className="p-12 text-center">
          <Building2 className="w-16 h-16 mx-auto text-slate-300 mb-4" />
          <h3 className="text-lg font-medium text-slate-900">Hospital Management</h3>
          <p className="text-slate-500">Hospital management interface coming soon</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminHospitals;
