import { Card, CardContent } from '@/components/ui/card';
import { FlaskConical } from 'lucide-react';

const HospitalLabResults = () => {
  return (
    <div className="p-4 lg:p-8 space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Lab Results</h1>
        <p className="text-slate-500 mt-1">Manage laboratory results</p>
      </div>

      <Card>
        <CardContent className="p-12 text-center">
          <FlaskConical className="w-16 h-16 mx-auto text-slate-300 mb-4" />
          <h3 className="text-lg font-medium text-slate-900">Lab Results Management</h3>
          <p className="text-slate-500">Lab results interface coming soon</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default HospitalLabResults;
