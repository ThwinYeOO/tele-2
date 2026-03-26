import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import { Input } from '@/components/ui/input';
import {
  Plus,
  ArrowDownLeft,
  ArrowUpRight,
  History,
  Calendar,
  ChevronRight,
} from 'lucide-react';

const PatientWallet = () => {
  const [showAddMoney, setShowAddMoney] = useState(false);

  const balance = 45000;

  const transactions = [
    { id: 1, type: 'debit', amount: 25000, description: 'Consultation - Dr. Khin Mya', date: '2024-03-26', status: 'completed' },
    { id: 2, type: 'credit', amount: 50000, description: 'Added via KBZ Pay', date: '2024-03-25', status: 'completed' },
    { id: 3, type: 'debit', amount: 15000, description: 'Medicine Purchase', date: '2024-03-20', status: 'completed' },
    { id: 4, type: 'credit', amount: 30000, description: 'Added via Wave Pay', date: '2024-03-18', status: 'completed' },
    { id: 5, type: 'debit', amount: 20000, description: 'Lab Test Payment', date: '2024-03-15', status: 'completed' },
  ];

  const paymentMethods = [
    { id: 1, type: 'kbz', name: 'KBZ Pay', last4: '****1234', icon: '💳' },
    { id: 2, type: 'wave', name: 'Wave Pay', last4: '****5678', icon: '📱' },
    { id: 3, type: 'card', name: 'Visa Card', last4: '****9012', icon: '💳' },
  ];

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">My Wallet</h1>
        <p className="text-slate-500 mt-1">Manage your payments and transactions</p>
      </div>

      {/* Balance Card */}
      <Card className="bg-gradient-to-br from-teal-500 to-cyan-600 text-white">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <p className="text-white/80 text-sm">Available Balance</p>
              <p className="text-4xl font-bold mt-1">{balance.toLocaleString()} MMK</p>
              <p className="text-white/60 text-sm mt-2">Last updated: Just now</p>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="secondary" 
                className="gap-2"
                onClick={() => setShowAddMoney(!showAddMoney)}
              >
                <Plus className="w-4 h-4" />
                Add Money
              </Button>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 gap-2">
                <History className="w-4 h-4" />
                History
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Money Section */}
      {showAddMoney && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Add Money to Wallet</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700">Enter Amount (MMK)</label>
              <div className="flex gap-2 mt-2">
                {[10000, 25000, 50000, 100000].map((amount) => (
                  <Button key={amount} variant="outline" className="flex-1">
                    {amount.toLocaleString()}
                  </Button>
                ))}
              </div>
              <Input 
                type="number" 
                placeholder="Or enter custom amount" 
                className="mt-3"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">Select Payment Method</label>
              <div className="grid grid-cols-3 gap-3 mt-2">
                <Button variant="outline" className="flex-col h-auto py-4 gap-2">
                  <span className="text-2xl">💳</span>
                  <span className="text-xs">KBZ Pay</span>
                </Button>
                <Button variant="outline" className="flex-col h-auto py-4 gap-2">
                  <span className="text-2xl">📱</span>
                  <span className="text-xs">Wave Pay</span>
                </Button>
                <Button variant="outline" className="flex-col h-auto py-4 gap-2">
                  <span className="text-2xl">🏦</span>
                  <span className="text-xs">Bank Card</span>
                </Button>
              </div>
            </div>

            <Button className="w-full bg-teal-600 hover:bg-teal-700">
              Proceed to Payment
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Transactions */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Recent Transactions</CardTitle>
              <Button variant="ghost" size="sm" className="gap-1">
                View All <ChevronRight className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {transactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      tx.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {tx.type === 'credit' ? (
                        <ArrowDownLeft className="w-5 h-5 text-green-600" />
                      ) : (
                        <ArrowUpRight className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{tx.description}</p>
                      <p className="text-xs text-slate-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {tx.date}
                      </p>
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

        {/* Payment Methods */}
        <div>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Payment Methods</CardTitle>
              <Button variant="ghost" size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center gap-3 p-3 border rounded-xl hover:border-teal-300 transition-colors cursor-pointer">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-xl">
                    {method.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">{method.name}</p>
                    <p className="text-xs text-slate-500">{method.last4}</p>
                  </div>
                  <div className="w-4 h-4 rounded-full border-2 border-teal-600 bg-teal-600" />
                </div>
              ))}

              <Button variant="outline" className="w-full gap-2 mt-4">
                <Plus className="w-4 h-4" />
                Add New Method
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PatientWallet;
