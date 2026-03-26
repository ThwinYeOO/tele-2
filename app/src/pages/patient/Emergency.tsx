import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Phone,
  MapPin,
  AlertTriangle,
  Ambulance,
  Flame,
  Shield,
  User,
  ChevronRight,
  Navigation,
  HeartPulse,
  Plus,
} from 'lucide-react';

const PatientEmergency = () => {
  const [sosActive, setSosActive] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const handleSOS = () => {
    setSosActive(true);
    let count = 5;
    const interval = setInterval(() => {
      count--;
      setCountdown(count);
      if (count === 0) {
        clearInterval(interval);
        // In real app, this would trigger emergency services
        alert('Emergency services have been notified!');
        setSosActive(false);
        setCountdown(5);
      }
    }, 1000);
  };

  const cancelSOS = () => {
    setSosActive(false);
    setCountdown(5);
  };

  const emergencyNumbers = [
    { number: '192', name: 'Ambulance', icon: Ambulance, color: 'bg-red-500', description: '24/7 Emergency Medical Services' },
    { number: '199', name: 'Fire Service', icon: Flame, color: 'bg-orange-500', description: 'Fire and Rescue Services' },
    { number: '197', name: 'Police', icon: Shield, color: 'bg-blue-500', description: 'Police Emergency Hotline' },
  ];

  const nearbyHospitals = [
    { name: 'Yangon General Hospital', distance: '1.2 km', address: 'Lanmadaw Township', phone: '01-256112', emergency: true },
    { name: 'Asia Royal Hospital', distance: '2.5 km', address: 'Bahan Township', phone: '01-538055', emergency: true },
    { name: 'Pun Hlaing Hospital', distance: '4.1 km', address: 'Hlaing Township', phone: '01-684771', emergency: true },
  ];

  const emergencyContacts = [
    { name: 'Family Contact', relation: 'Father', phone: '+95 9 123 456 789' },
    { name: 'Emergency Contact', relation: 'Spouse', phone: '+95 9 987 654 321' },
  ];

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Emergency SOS</h1>
        <p className="text-slate-500 mt-1">Quick access to emergency services and contacts</p>
      </div>

      {/* SOS Button */}
      <Card className={`${sosActive ? 'bg-red-50 border-red-300' : 'bg-red-50 border-red-200'}`}>
        <CardContent className="p-8 text-center">
          {!sosActive ? (
            <>
              <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-red-500 hover:bg-red-600 cursor-pointer shadow-lg shadow-red-200 flex items-center justify-center transition-all active:scale-95"
                onClick={handleSOS}>
                <AlertTriangle className="w-16 h-16 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-red-600 mb-2">EMERGENCY SOS</h2>
              <p className="text-slate-600">Tap the button above to alert emergency services</p>
              <p className="text-sm text-slate-500 mt-2">Your location will be shared automatically</p>
            </>
          ) : (
            <>
              <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-red-500 animate-pulse flex items-center justify-center">
                <span className="text-4xl font-bold text-white">{countdown}</span>
              </div>
              <h2 className="text-2xl font-bold text-red-600 mb-2">ALERTING EMERGENCY SERVICES</h2>
              <p className="text-slate-600">Tap cancel if this was a mistake</p>
              <Button 
                variant="outline" 
                className="mt-4 border-red-300 text-red-600 hover:bg-red-100"
                onClick={cancelSOS}
              >
                Cancel Alert
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      {/* Emergency Numbers */}
      <div className="grid lg:grid-cols-3 gap-4">
        {emergencyNumbers.map((service) => (
          <a key={service.number} href={`tel:${service.number}`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-xl ${service.color} flex items-center justify-center`}>
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900">{service.name}</h3>
                    <p className="text-2xl font-bold text-slate-900 mt-1">{service.number}</p>
                    <p className="text-xs text-slate-500 mt-1">{service.description}</p>
                  </div>
                  <Phone className="w-5 h-5 text-slate-400" />
                </div>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Nearby Emergency Hospitals */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <MapPin className="w-5 h-5 text-red-500" />
              Nearby Emergency Hospitals
            </CardTitle>
            <Button variant="ghost" size="sm" className="gap-1">
              <Navigation className="w-4 h-4" />
              View Map
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {nearbyHospitals.map((hospital, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-slate-900">{hospital.name}</h4>
                    {hospital.emergency && (
                      <Badge className="bg-red-100 text-red-700 text-xs">24/7</Badge>
                    )}
                  </div>
                  <p className="text-sm text-slate-500">{hospital.address}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Navigation className="w-3 h-3" /> {hospital.distance}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Phone className="w-3 h-3" /> {hospital.phone}
                    </span>
                  </div>
                </div>
                <a href={`tel:${hospital.phone}`}>
                  <Button size="sm" variant="outline" className="gap-1">
                    <Phone className="w-4 h-4" />
                    Call
                  </Button>
                </a>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Emergency Contacts */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="w-5 h-5 text-teal-500" />
              My Emergency Contacts
            </CardTitle>
            <Button variant="ghost" size="sm">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                    <User className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900">{contact.name}</h4>
                    <p className="text-sm text-slate-500">{contact.relation}</p>
                    <p className="text-xs text-slate-400">{contact.phone}</p>
                  </div>
                </div>
                <a href={`tel:${contact.phone}`}>
                  <Button size="sm" className="bg-teal-600 hover:bg-teal-700 gap-1">
                    <Phone className="w-4 h-4" />
                    Call
                  </Button>
                </a>
              </div>
            ))}

            <Button variant="outline" className="w-full gap-2">
              <Plus className="w-4 h-4" />
              Add Emergency Contact
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* First Aid Tips */}
      <Card className="bg-amber-50 border-amber-200">
        <CardContent className="p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
              <HeartPulse className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h4 className="font-semibold text-amber-800">First Aid Tips</h4>
              <p className="text-sm text-amber-700 mt-1">
                While waiting for emergency services, check our first aid guide for immediate assistance.
              </p>
              <Button variant="outline" size="sm" className="mt-3 border-amber-300 text-amber-700 hover:bg-amber-100">
                View First Aid Guide
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientEmergency;
