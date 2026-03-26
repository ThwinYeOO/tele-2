import { Card, CardContent } from '@/components/ui/card';
import { CreditCard } from 'lucide-react';

const AdminPayments = () => {
  return (
    <div className="p-4 lg:p-8 space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Payments</h1>
        <p className="text-slate-500 mt-1">Manage platform payments and transactions</p>
      </div>

      <Card>
        <CardContent className="p-12 text-center">
          <CreditCard className="w-16 h-16 mx-auto text-slate-300 mb-4" />
          <h3 className="text-lg font-medium text-slate-900">Payment Management</h3>
          <p className="text-slate-500">Payment management interface coming soon</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPayments;
