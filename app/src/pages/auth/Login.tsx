import { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuthStore } from '@/stores/authStore';
import { 
  HeartPulse, 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  Phone,
  User,
  Stethoscope,
  Building2,
  Shield,
  ArrowLeft,
  AlertCircle
} from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const defaultRole = searchParams.get('role') || 'patient';
  
  const [activeTab, setActiveTab] = useState(defaultRole);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { login } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await login(formData.email, formData.password, activeTab);
    
    setIsLoading(false);
    
    if (result.success) {
      navigate(`/${activeTab}/dashboard`);
    } else {
      setError(result.error || 'Login failed');
    }
  };

  const roleConfig = {
    patient: {
      icon: User,
      label: 'Patient',
      color: 'teal',
      demoEmail: 'patient@demo.com',
    },
    doctor: {
      icon: Stethoscope,
      label: 'Doctor',
      color: 'amber',
      demoEmail: 'doctor@demo.com',
    },
    hospital_admin: {
      icon: Building2,
      label: 'Hospital',
      color: 'violet',
      demoEmail: 'hospital@demo.com',
    },
    super_admin: {
      icon: Shield,
      label: 'Admin',
      color: 'slate',
      demoEmail: 'admin@demo.com',
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-cyan-50/30 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #0f766e 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden lg:block space-y-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
              <HeartPulse className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">MyanmarCare</h1>
              <p className="text-sm text-slate-500">Telemedicine Platform</p>
            </div>
          </Link>

          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-slate-900 leading-tight">
              Welcome Back to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600">
                Better Healthcare
              </span>
            </h2>
            <p className="text-lg text-slate-600">
              Access your personalized healthcare dashboard. Connect with doctors, 
              manage appointments, and track your health journey.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Phone, text: 'Video Consultations' },
              { icon: Shield, text: 'Secure & Private' },
              { icon: Mail, text: '24/7 Support' },
              { icon: HeartPulse, text: 'Expert Doctors' },
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-white/60 backdrop-blur rounded-xl">
                <feature.icon className="w-5 h-5 text-teal-600" />
                <span className="text-sm font-medium text-slate-700">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* Demo Credentials */}
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-semibold text-amber-800">Demo Credentials</span>
            </div>
            <p className="text-xs text-amber-700">
              Use these emails with password "demo123" to test different portals:
            </p>
            <div className="mt-2 space-y-1 text-xs text-amber-700">
              <div>patient@demo.com (Patient Portal)</div>
              <div>doctor@demo.com (Doctor Portal)</div>
              <div>hospital@demo.com (Hospital Portal)</div>
              <div>admin@demo.com (Admin Portal)</div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between">
              <Link to="/" className="lg:hidden flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
                  <HeartPulse className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-slate-900">MyanmarCare</span>
              </Link>
            </div>
            <CardTitle className="text-2xl font-bold text-slate-900">Sign In</CardTitle>
            <CardDescription>
              Choose your account type and enter your credentials
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 mb-6">
                {(Object.keys(roleConfig) as Array<keyof typeof roleConfig>).map((role) => {
                  const config = roleConfig[role];
                  return (
                    <TabsTrigger 
                      key={role} 
                      value={role}
                      className="flex flex-col items-center gap-1 py-2 data-[state=active]:bg-teal-50 data-[state=active]:text-teal-700"
                    >
                      <config.icon className="w-4 h-4" />
                      <span className="text-xs">{config.label}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              {(Object.keys(roleConfig) as Array<keyof typeof roleConfig>).map((role) => (
                <TabsContent key={role} value={role}>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-sm text-red-600">
                        <AlertCircle className="w-4 h-4" />
                        {error}
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <Input
                          id="email"
                          type="email"
                          placeholder={roleConfig[role].demoEmail}
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <Input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter your password"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          className="pl-10 pr-10"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 text-sm text-slate-600">
                        <input type="checkbox" className="rounded border-slate-300" />
                        Remember me
                      </label>
                      <Link to="/forgot-password" className="text-sm text-teal-600 hover:underline">
                        Forgot password?
                      </Link>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-teal-600 hover:bg-teal-700"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Signing in...' : 'Sign In'}
                    </Button>

                    <p className="text-center text-sm text-slate-600">
                      Don't have an account?{' '}
                      <Link to="/register" className="text-teal-600 hover:underline font-medium">
                        Create account
                      </Link>
                    </p>
                  </form>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Back to Home */}
      <Link 
        to="/" 
        className="fixed top-4 left-4 flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm font-medium">Back to Home</span>
      </Link>
    </div>
  );
};

export default Login;
