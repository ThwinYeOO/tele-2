import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DollarSign, 
  TrendingUp, 
  Download, 
  Calendar,
  Video,
  Users,
  Wallet,
  ArrowDownLeft,
  ArrowUpLeft,
} from 'lucide-react';

const DoctorEarnings = () => {
  const earnings = {
    total: 1250000,
    thisMonth: 450000,
    lastMonth: 380000,
    pending: 75000,
    withdrawn: 1175000,
  };

  const transactions = [
    { id: 1, type: 'credit', amount: 25000, description: 'Consultation - Aung Kyaw', date: '2024-03-26', status: 'completed' },
    { id: 2, type: 'credit', amount: 30000, description: 'Consultation - Mya Mya', date: '2024-03-26', status: 'completed' },
    { id: 3, type: 'withdrawal', amount: 200000, description: 'Withdrawal to KBZ Bank', date: '2024-03-25', status: 'completed' },
    { id: 4, type: 'credit', amount: 25000, description: 'Consultation - Than Htut', date: '2024-03-24', status: 'completed' },
    { id: 5, type: 'credit', amount: 35000, description: 'Consultation - Hla Hla', date: '2024-03-23', status: 'pending' },
  ];

  const monthlyData = [
    { month: 'Jan', earnings: 320000 },
    { month: 'Feb', earnings: 380000 },
    { month: 'Mar', earnings: 450000 },
  ];

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">My Earnings</h1>
          <p className="text-slate-500 mt-1">Track your income and manage withdrawals</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Download Report
        </Button>
      </div>

      {/* Balance Card */}
      <Card className="bg-gradient-to-br from-amber-500 to-orange-600 text-white">
        <CardContent className="p-6">
          <div className="grid lg:grid-cols-4 gap-6">
            <div>
              <p className="text-white/80 text-sm">Total Earnings</p>
              <p className="text-3xl font-bold mt-1">{earnings.total.toLocaleString()} MMK</p>
            </div>
            <div>
              <p className="text-white/80 text-sm">This Month</p>
              <p className="text-2xl font-bold mt-1">{earnings.thisMonth.toLocaleString()} MMK</p>
              <p className="text-xs text-white/60 flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" />
                +18% from last month
              </p>
            </div>
            <div>
              <p className="text-white/80 text-sm">Pending</p>
              <p className="text-2xl font-bold mt-1">{earnings.pending.toLocaleString()} MMK</p>
            </div>
            <div className="flex items-end">
              <Button variant="secondary" className="w-full gap-2">
                <Wallet className="w-4 h-4" />
                Withdraw
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <Video className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">45</p>
                <p className="text-xs text-slate-500">Consultations</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">38</p>
                <p className="text-xs text-slate-500">Unique Patients</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">10K</p>
                <p className="text-xs text-slate-500">Avg per Consult</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">12</p>
                <p className="text-xs text-slate-500">Days Active</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Transactions */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Recent Transactions</CardTitle>
              <Tabs defaultValue="all">
                <TabsList className="h-8">
                  <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
                  <TabsTrigger value="earnings" className="text-xs">Earnings</TabsTrigger>
                  <TabsTrigger value="withdrawals" className="text-xs">Withdrawals</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent className="space-y-3">
              {transactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      tx.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {tx.type === 'credit' ? (
                        <ArrowDownLeft className="w-5 h-5 text-green-600" />
                      ) : (
                        <ArrowUpLeft className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{tx.description}</p>
                      <p className="text-xs text-slate-500">{tx.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${tx.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                      {tx.type === 'credit' ? '+' : '-'}{tx.amount.toLocaleString()} MMK
                    </p>
                    <Badge variant="outline" className="text-xs">{tx.status}</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Monthly Overview */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Monthly Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {monthlyData.map((data) => (
                <div key={data.month} className="flex items-center justify-between">
                  <span className="text-slate-600">{data.month} 2024</span>
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-amber-500 rounded-full"
                        style={{ width: `${(data.earnings / 500000) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium w-20 text-right">
                      {(data.earnings / 1000).toFixed(0)}K
                    </span>
                  </div>
                </div>
              ))}

              <div className="pt-4 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Projected (Mar)</span>
                  <span className="font-bold text-amber-600">520K</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DoctorEarnings;
