import { Card, CardContent } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';

const AdminAnalytics = () => {
  return (
    <div className="p-4 lg:p-8 space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Analytics</h1>
        <p className="text-slate-500 mt-1">Platform analytics and insights</p>
      </div>

      <Card>
        <CardContent className="p-12 text-center">
          <BarChart3 className="w-16 h-16 mx-auto text-slate-300 mb-4" />
          <h3 className="text-lg font-medium text-slate-900">Analytics Dashboard</h3>
          <p className="text-slate-500">Detailed analytics coming soon</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAnalytics;
