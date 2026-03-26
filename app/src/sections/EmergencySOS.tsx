import { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Phone,
  MapPin,
  Ambulance,
  Clock,
  Users,
  AlertCircle,
  Navigation,
  Heart,
  Shield,
} from 'lucide-react';

const EmergencySOS = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [pulseActive, setPulseActive] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseActive(true);
      setTimeout(() => setPulseActive(false), 2000);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: MapPin,
      title: 'GPS Location',
      description: 'Automatically shares your exact location with responders',
    },
    {
      icon: Clock,
      title: 'Under 5 Minutes',
      description: 'Average response time for emergency requests',
    },
    {
      icon: Users,
      title: 'Family Notified',
      description: 'Emergency contacts receive instant alerts',
    },
    {
      icon: Navigation,
      title: 'Nearest Help',
      description: 'Finds closest doctors, hospitals, and ambulances',
    },
  ];

  return (
    <section 
      id="emergency" 
      ref={sectionRef}
      className="py-20 lg:py-32 bg-gradient-to-b from-white to-red-50/30 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-red-100/40 via-transparent to-transparent rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className={`space-y-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div>
              <Badge 
                variant="secondary" 
                className="bg-red-100 text-red-700 px-4 py-1.5 text-sm font-medium mb-6"
              >
                <AlertCircle className="w-4 h-4 mr-1.5" />
                Emergency Services
              </Badge>
              <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6">
                One Tap{' '}
                <span className="text-red-600">Emergency SOS</span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                When every second counts, our emergency response system connects you with 
                the nearest medical help instantly. Just press the SOS button and help is on the way.
              </p>
            </div>

            {/* SOS Button Demo */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative">
                {/* Pulse Rings */}
                <div className={`absolute inset-0 rounded-full bg-red-500 ${pulseActive ? 'animate-ping' : ''}`} style={{ animationDuration: '2s' }} />
                <div className={`absolute inset-2 rounded-full bg-red-400 ${pulseActive ? 'animate-ping' : ''}`} style={{ animationDuration: '2s', animationDelay: '0.3s' }} />
                
                {/* Main Button */}
                <button className="relative w-32 h-32 rounded-full bg-gradient-to-br from-red-500 to-red-700 shadow-2xl shadow-red-500/40 flex flex-col items-center justify-center text-white hover:scale-105 transition-transform active:scale-95">
                  <Phone className="w-10 h-10 mb-1" />
                  <span className="text-lg font-bold">SOS</span>
                </button>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm border border-slate-100"
                >
                  <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm">{feature.title}</h4>
                    <p className="text-slate-500 text-xs mt-1">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Emergency Flow Card */}
          <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <Card className="p-6 lg:p-8 bg-white border-slate-200 shadow-xl">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Ambulance className="w-6 h-6 text-red-600" />
                How Emergency Response Works
              </h3>

              <div className="space-y-6">
                {/* Step 1 */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="w-0.5 h-full bg-red-100 mt-2" />
                  </div>
                  <div className="pb-6">
                    <h4 className="font-semibold text-slate-900">Press SOS Button</h4>
                    <p className="text-slate-600 text-sm mt-1">
                      Hold the SOS button for 3 seconds to trigger emergency mode
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-amber-600" />
                    </div>
                    <div className="w-0.5 h-full bg-amber-100 mt-2" />
                  </div>
                  <div className="pb-6">
                    <h4 className="font-semibold text-slate-900">Location Captured</h4>
                    <p className="text-slate-600 text-sm mt-1">
                      Your GPS coordinates are automatically shared with emergency responders
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                      <Navigation className="w-5 h-5 text-teal-600" />
                    </div>
                    <div className="w-0.5 h-full bg-teal-100 mt-2" />
                  </div>
                  <div className="pb-6">
                    <h4 className="font-semibold text-slate-900">Nearest Help Found</h4>
                    <p className="text-slate-600 text-sm mt-1">
                      System identifies and dispatches nearest available doctor or ambulance
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <Heart className="w-5 h-5 text-green-600" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Help Arrives</h4>
                    <p className="text-slate-600 text-sm mt-1">
                      Track responder location in real-time until help arrives
                    </p>
                  </div>
                </div>
              </div>

              {/* Emergency Contacts */}
              <div className="mt-8 pt-6 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-teal-600" />
                    <span className="text-sm font-medium text-slate-700">Your emergency contacts will be notified</span>
                  </div>
                  <Button variant="outline" size="sm" className="text-xs">
                    Manage Contacts
                  </Button>
                </div>
              </div>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="text-center p-4 bg-red-50 rounded-xl">
                <div className="text-2xl font-bold text-red-600">&lt; 5 min</div>
                <div className="text-xs text-slate-600">Avg Response</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-xl">
                <div className="text-2xl font-bold text-red-600">24/7</div>
                <div className="text-xs text-slate-600">Available</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-xl">
                <div className="text-2xl font-bold text-red-600">500+</div>
                <div className="text-xs text-slate-600">Responders</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmergencySOS;
