import { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Shield,
  Lock,
  Eye,
  FileCheck,
  Server,
  Key,
  Fingerprint,
  CheckCircle2,
  Award,
} from 'lucide-react';

const Security = () => {
  const [isVisible, setIsVisible] = useState(false);
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

  const securityFeatures = [
    {
      icon: Lock,
      title: 'End-to-End Encryption',
      description: 'All video calls and messages are encrypted with AES-256, ensuring only you and your doctor can access them.',
    },
    {
      icon: Eye,
      title: 'Privacy First',
      description: 'Your health data is never sold or shared with third parties. You control who sees your information.',
    },
    {
      icon: Server,
      title: 'Data Localization',
      description: 'All patient data is stored within Myanmar, complying with local data protection regulations.',
    },
    {
      icon: Key,
      title: 'Secure Authentication',
      description: 'Multi-factor authentication with OTP verification keeps your account protected.',
    },
    {
      icon: Fingerprint,
      title: 'Biometric Login',
      description: 'Optional fingerprint or face recognition login for added security on supported devices.',
    },
    {
      icon: FileCheck,
      title: 'Audit Logging',
      description: 'Every access to your medical records is logged and can be reviewed by you.',
    },
  ];

  const certifications = [
    { name: 'HIPAA Compliant', icon: Shield },
    { name: 'ISO 27001', icon: Award },
    { name: 'PDPA Compliant', icon: FileCheck },
    { name: 'SSL Secured', icon: Lock },
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-20 lg:py-32 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-radial from-teal-100/30 via-transparent to-transparent rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-radial from-cyan-100/30 via-transparent to-transparent rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Badge 
            variant="secondary" 
            className="bg-teal-100 text-teal-700 px-4 py-1.5 text-sm font-medium mb-6"
          >
            <Shield className="w-4 h-4 mr-1.5" />
            Security & Privacy
          </Badge>
          <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6">
            Your Health Data is{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600">
              Safe With Us
            </span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            We use bank-level security measures to protect your personal and medical information. 
            Your privacy is our top priority.
          </p>
        </div>

        {/* Certifications Bar */}
        <div className={`flex flex-wrap justify-center gap-4 mb-16 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {certifications.map((cert, index) => (
            <div 
              key={index}
              className="flex items-center gap-2 px-5 py-3 bg-white rounded-full shadow-sm border border-slate-100"
            >
              <cert.icon className="w-5 h-5 text-teal-600" />
              <span className="font-semibold text-slate-700">{cert.name}</span>
            </div>
          ))}
        </div>

        {/* Security Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {securityFeatures.map((feature, index) => (
            <Card
              key={index}
              className={`group p-6 lg:p-8 bg-white border-slate-100 hover:border-teal-200 hover:shadow-lg transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${150 + index * 50}ms` }}
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-50 to-cyan-50 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <feature.icon className="w-7 h-7 text-teal-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>

        {/* Trust Banner */}
        <div className={`mt-16 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Card className="p-8 bg-gradient-to-r from-slate-900 to-slate-800 text-white border-0 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl" />
            <div className="relative grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Your Data, Your Control</h3>
                <ul className="space-y-3">
                  {[
                    'Request a copy of all your data anytime',
                    'Delete your account and data permanently',
                    'Choose what information to share with doctors',
                    'Opt-out of non-essential data collection',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-teal-400 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-48 h-48 rounded-full border-4 border-teal-500/20 flex items-center justify-center">
                    <div className="w-36 h-36 rounded-full border-4 border-teal-500/40 flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
                        <Shield className="w-12 h-12 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Security;
