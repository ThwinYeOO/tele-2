import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Droplets,
  Ruler,
  Weight,
  Camera,
  Lock,
  Bell,
  Shield,
  Smartphone,
} from 'lucide-react';

const PatientProfile = () => {
  const [profile, setProfile] = useState({
    name: 'Aung Kyaw',
    email: 'patient@demo.com',
    phone: '+95 9 123 456 789',
    dob: '1990-05-15',
    gender: 'Male',
    bloodType: 'O+',
    height: '175',
    weight: '68',
    address: '123 Main Street, Yangon',
    emergencyContact: '+95 9 987 654 321',
  });

  const [notifications, setNotifications] = useState({
    appointments: true,
    reminders: true,
    promotions: false,
    email: true,
    sms: true,
    push: true,
  });

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">My Profile</h1>
        <p className="text-slate-500 mt-1">Manage your personal information and preferences</p>
      </div>

      {/* Profile Header Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row items-center gap-6">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarFallback className="bg-teal-100 text-teal-700 text-3xl">AK</AvatarFallback>
              </Avatar>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white hover:bg-teal-700 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div className="text-center lg:text-left flex-1">
              <h2 className="text-2xl font-bold text-slate-900">{profile.name}</h2>
              <p className="text-slate-500">{profile.email}</p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mt-3">
                <Badge variant="secondary" className="gap-1">
                  <Droplets className="w-3 h-3" /> Blood: {profile.bloodType}
                </Badge>
                <Badge variant="secondary" className="gap-1">
                  <Ruler className="w-3 h-3" /> {profile.height} cm
                </Badge>
                <Badge variant="secondary" className="gap-1">
                  <Weight className="w-3 h-3" /> {profile.weight} kg
                </Badge>
              </div>
            </div>
            <Button className="bg-teal-600 hover:bg-teal-700">Edit Profile</Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList>
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="health">Health Details</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* Personal Information */}
        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input 
                      id="name" 
                      value={profile.name} 
                      onChange={(e) => setProfile({...profile, name: e.target.value})}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input 
                      id="email" 
                      type="email"
                      value={profile.email} 
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input 
                      id="phone" 
                      value={profile.phone} 
                      onChange={(e) => setProfile({...profile, phone: e.target.value})}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input 
                      id="dob" 
                      type="date"
                      value={profile.dob} 
                      onChange={(e) => setProfile({...profile, dob: e.target.value})}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2 lg:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input 
                      id="address" 
                      value={profile.address} 
                      onChange={(e) => setProfile({...profile, address: e.target.value})}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
              <Button className="bg-teal-600 hover:bg-teal-700">Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Health Details */}
        <TabsContent value="health">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Health Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bloodType">Blood Type</Label>
                  <Input id="bloodType" value={profile.bloodType} onChange={(e) => setProfile({...profile, bloodType: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input id="height" value={profile.height} onChange={(e) => setProfile({...profile, height: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input id="weight" value={profile.weight} onChange={(e) => setProfile({...profile, weight: e.target.value})} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergency">Emergency Contact</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input 
                    id="emergency" 
                    value={profile.emergencyContact} 
                    onChange={(e) => setProfile({...profile, emergencyContact: e.target.value})}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <p className="text-sm text-amber-800">
                  <strong>Note:</strong> Please keep your health information updated for better medical care.
                </p>
              </div>

              <Button className="bg-teal-600 hover:bg-teal-700">Save Health Info</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium text-slate-900">Notification Types</h4>
                {[
                  { key: 'appointments', label: 'Appointment Reminders', desc: 'Get notified about upcoming appointments' },
                  { key: 'reminders', label: 'Medication Reminders', desc: 'Daily reminders for your medications' },
                  { key: 'promotions', label: 'Promotions & Offers', desc: 'Special offers and health tips' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                    <div>
                      <p className="font-medium text-slate-900">{item.label}</p>
                      <p className="text-xs text-slate-500">{item.desc}</p>
                    </div>
                    <Switch 
                      checked={notifications[item.key as keyof typeof notifications]} 
                      onCheckedChange={(checked) => setNotifications({...notifications, [item.key]: checked})}
                    />
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-slate-900">Notification Channels</h4>
                {[
                  { key: 'email', label: 'Email Notifications', icon: Mail },
                  { key: 'sms', label: 'SMS Notifications', icon: Smartphone },
                  { key: 'push', label: 'Push Notifications', icon: Bell },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 text-slate-500" />
                      <p className="font-medium text-slate-900">{item.label}</p>
                    </div>
                    <Switch 
                      checked={notifications[item.key as keyof typeof notifications]} 
                      onCheckedChange={(checked) => setNotifications({...notifications, [item.key]: checked})}
                    />
                  </div>
                ))}
              </div>

              <Button className="bg-teal-600 hover:bg-teal-700">Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input id="currentPassword" type="password" placeholder="Enter current password" className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input id="newPassword" type="password" placeholder="Enter new password" className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input id="confirmPassword" type="password" placeholder="Confirm new password" className="pl-10" />
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-teal-600" />
                  <div>
                    <p className="font-medium text-slate-900">Two-Factor Authentication</p>
                    <p className="text-sm text-slate-500">Add an extra layer of security to your account</p>
                  </div>
                  <Switch className="ml-auto" />
                </div>
              </div>

              <Button className="bg-teal-600 hover:bg-teal-700">Update Password</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientProfile;
