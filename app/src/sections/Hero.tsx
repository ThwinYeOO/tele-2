import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Video, 
  Calendar, 
  MessageCircle, 
  Shield, 
  ChevronRight,
  Play,
  Star,
  MapPin,
  Phone
} from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = heroRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const features = [
    { icon: Video, label: 'Video Consultations' },
    { icon: Calendar, label: 'Easy Booking' },
    { icon: MessageCircle, label: '24/7 Chat' },
    { icon: Shield, label: 'Secure & Private' },
  ];

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen pt-20 lg:pt-24 overflow-hidden bg-gradient-to-b from-teal-50/50 via-white to-white"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-gradient-to-br from-teal-100/40 to-cyan-100/40 rounded-full blur-3xl transform translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-blue-100/30 to-teal-100/30 rounded-full blur-3xl transform -translate-x-1/3" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#0f766e 1px, transparent 1px), linear-gradient(90deg, #0f766e 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="reveal opacity-0 translate-y-4 transition-all duration-700">
              <Badge 
                variant="secondary" 
                className="bg-teal-100 text-teal-700 hover:bg-teal-100 px-4 py-1.5 text-sm font-medium"
              >
                <Star className="w-3.5 h-3.5 mr-1.5 fill-teal-700" />
                #1 Telemedicine in Myanmar
              </Badge>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="reveal opacity-0 translate-y-4 transition-all duration-700 delay-100 text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                Healthcare at Your{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600">
                  Fingertips
                </span>
              </h1>
              <p className="reveal opacity-0 translate-y-4 transition-all duration-700 delay-200 text-lg sm:text-xl text-slate-600 max-w-xl leading-relaxed">
                Connect with certified doctors instantly through video consultations. 
                Available in English & Myanmar language, designed for low-bandwidth connections.
              </p>
            </div>

            {/* Feature Pills */}
            <div className="reveal opacity-0 translate-y-4 transition-all duration-700 delay-300 flex flex-wrap gap-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-slate-100"
                >
                  <feature.icon className="w-4 h-4 text-teal-600" />
                  <span className="text-sm font-medium text-slate-700">{feature.label}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="reveal opacity-0 translate-y-4 transition-all duration-700 delay-400 flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-6 text-base font-semibold rounded-xl shadow-lg shadow-teal-600/20 hover:shadow-xl hover:shadow-teal-600/30 transition-all"
              >
                Book Consultation
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-slate-200 text-slate-700 hover:bg-slate-50 px-8 py-6 text-base font-semibold rounded-xl"
              >
                <Play className="w-5 h-5 mr-2 text-teal-600" />
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="reveal opacity-0 translate-y-4 transition-all duration-700 delay-500 flex items-center gap-6 pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-600">
                  <span className="font-semibold text-slate-900">10,000+</span> satisfied patients
                </p>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image/Illustration */}
          <div className="reveal opacity-0 translate-x-8 transition-all duration-1000 delay-300 relative">
            <div className="relative">
              {/* Main Card */}
              <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/50 p-6 border border-slate-100">
                {/* Video Call UI Mock */}
                <div className="aspect-video bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl relative overflow-hidden mb-4">
                  {/* Doctor Video */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 mx-auto mb-3 flex items-center justify-center">
                        <span className="text-3xl text-white font-bold">Dr</span>
                      </div>
                      <p className="text-white font-medium">Dr. Khin Mya</p>
                      <p className="text-slate-400 text-sm">General Physician</p>
                    </div>
                  </div>
                  
                  {/* Patient Video (Small) */}
                  <div className="absolute bottom-4 right-4 w-32 h-24 bg-slate-700 rounded-xl overflow-hidden border-2 border-white/20">
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-slate-600 flex items-center justify-center">
                        <span className="text-white text-sm">You</span>
                      </div>
                    </div>
                  </div>

                  {/* Call Controls */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                      <Video className="w-5 h-5 text-white" />
                    </div>
                    <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="absolute top-4 left-4 px-3 py-1 bg-red-500/80 backdrop-blur rounded-full">
                    <span className="text-white text-xs font-medium">LIVE 12:34</span>
                  </div>
                </div>

                {/* Consultation Info */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-slate-900">Video Consultation</h3>
                      <p className="text-sm text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        Yangon, Myanmar
                      </p>
                    </div>
                    <Badge className="bg-green-100 text-green-700">Connected</Badge>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1 text-xs">
                      View Prescription
                    </Button>
                    <Button size="sm" className="flex-1 bg-teal-600 hover:bg-teal-700 text-xs">
                      End Call
                    </Button>
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-lg p-4 border border-slate-100 animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Data Security</p>
                    <p className="text-sm font-semibold text-slate-900">HIPAA Compliant</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg p-4 border border-slate-100" style={{ animation: 'bounce 3s infinite 0.5s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Next Available</p>
                    <p className="text-sm font-semibold text-slate-900">In 5 minutes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style>{`
        .reveal.animate-in {
          opacity: 1;
          transform: translateY(0) translateX(0);
        }
      `}</style>
    </section>
  );
};

export default Hero;
