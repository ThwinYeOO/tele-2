import { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Video,
  MessageSquare,
  FileText,
  CreditCard,
  Globe,
  WifiOff,
  Shield,
  Clock,
  Smartphone,
  Bell,
  MapPin,
  Languages,
} from 'lucide-react';

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  badge?: string;
  delay: number;
}

const FeatureCard = ({ icon: Icon, title, description, badge, delay }: FeatureCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Card
      ref={ref}
      className={`group relative p-6 lg:p-8 bg-white border-slate-100 hover:border-teal-200 hover:shadow-xl hover:shadow-teal-500/5 transition-all duration-500 cursor-pointer overflow-hidden ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Hover Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50/0 to-cyan-50/0 group-hover:from-teal-50/50 group-hover:to-cyan-50/30 transition-all duration-500" />
      
      <div className="relative">
        {/* Icon */}
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-7 h-7 text-white" />
        </div>

        {/* Badge */}
        {badge && (
          <Badge className="absolute top-0 right-0 bg-amber-100 text-amber-700 text-xs">
            {badge}
          </Badge>
        )}

        {/* Content */}
        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-teal-700 transition-colors">
          {title}
        </h3>
        <p className="text-slate-600 leading-relaxed">
          {description}
        </p>
      </div>
    </Card>
  );
};

const Features = () => {
  const features = [
    {
      icon: Video,
      title: 'Video Consultations',
      description: 'High-quality video calls with doctors from the comfort of your home. Works even on 3G networks.',
      badge: 'Popular',
    },
    {
      icon: MessageSquare,
      title: 'Secure Messaging',
      description: 'Chat with your doctor anytime. Share photos, reports, and get quick responses.',
    },
    {
      icon: FileText,
      title: 'Digital Prescriptions',
      description: 'Receive prescriptions digitally with QR codes. Easy to share with pharmacies.',
    },
    {
      icon: CreditCard,
      title: 'Easy Payments',
      description: 'Pay with KPay, Wave Pay, or cash. Transparent pricing with no hidden fees.',
    },
    {
      icon: Globe,
      title: 'Bilingual Support',
      description: 'Full support in English and Myanmar (Burmese) languages for better communication.',
    },
    {
      icon: WifiOff,
      title: 'Offline Mode',
      description: 'Access your medical records and prescriptions even without internet connection.',
    },
    {
      icon: Shield,
      title: 'End-to-End Encryption',
      description: 'Your health data is protected with military-grade encryption and HIPAA compliance.',
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Book appointments anytime. Emergency consultations available round the clock.',
    },
    {
      icon: Smartphone,
      title: 'Mobile First',
      description: 'Designed for smartphones with an intuitive interface that anyone can use.',
    },
    {
      icon: Bell,
      title: 'Smart Reminders',
      description: 'Get notifications for appointments, medication schedules, and follow-ups.',
    },
    {
      icon: MapPin,
      title: 'Find Nearby Doctors',
      description: 'Discover doctors and hospitals near you with GPS-based search.',
    },
    {
      icon: Languages,
      title: 'Low Bandwidth Mode',
      description: 'Optimized for slow internet connections common in rural Myanmar areas.',
    },
  ];

  return (
    <section id="features" className="py-20 lg:py-32 bg-white relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #0f766e 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <Badge 
            variant="secondary" 
            className="bg-teal-100 text-teal-700 px-4 py-1.5 text-sm font-medium mb-6"
          >
            Features
          </Badge>
          <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6">
            Everything You Need for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600">
              Better Healthcare
            </span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Our platform is designed specifically for Myanmar, with features that work 
            in low-bandwidth areas and support both English and Burmese languages.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              badge={feature.badge}
              delay={index * 50}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
