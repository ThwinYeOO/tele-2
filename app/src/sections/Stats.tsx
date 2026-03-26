import { useEffect, useRef, useState } from 'react';
import { Users, Stethoscope, CalendarCheck, Clock } from 'lucide-react';

interface StatItemProps {
  icon: React.ElementType;
  value: string;
  label: string;
  suffix?: string;
  delay: number;
}

const StatItem = ({ icon: Icon, value, label, suffix = '', delay }: StatItemProps) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const numericValue = parseInt(value.replace(/,/g, ''));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      const duration = 2000;
      const steps = 60;
      const increment = numericValue / steps;
      let current = 0;

      const interval = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          setCount(numericValue);
          clearInterval(interval);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [isVisible, numericValue, delay]);

  return (
    <div
      ref={ref}
      className={`flex flex-col items-center text-center p-6 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-50 to-cyan-50 flex items-center justify-center mb-4">
        <Icon className="w-7 h-7 text-teal-600" />
      </div>
      <div className="text-4xl lg:text-5xl font-bold text-slate-900 mb-2">
        {count.toLocaleString()}{suffix}
      </div>
      <p className="text-slate-500 font-medium">{label}</p>
    </div>
  );
};

const Stats = () => {
  const stats = [
    { icon: Users, value: '50000', label: 'Registered Patients', suffix: '+' },
    { icon: Stethoscope, value: '1200', label: 'Certified Doctors', suffix: '+' },
    { icon: CalendarCheck, value: '150000', label: 'Consultations', suffix: '+' },
    { icon: Clock, value: '5', label: 'Avg. Wait Time', suffix: ' min' },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-teal-50/30 to-white" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Trusted by Thousands Across Myanmar
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Connecting patients with quality healthcare professionals through our secure telemedicine platform
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
              delay={index * 150}
            />
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-8 opacity-60">
          <div className="flex items-center gap-2 text-slate-400">
            <div className="w-8 h-8 rounded bg-slate-200" />
            <span className="text-sm font-medium">Ministry of Health</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <div className="w-8 h-8 rounded bg-slate-200" />
            <span className="text-sm font-medium">Myanmar Medical Association</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <div className="w-8 h-8 rounded bg-slate-200" />
            <span className="text-sm font-medium">ISO 27001 Certified</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
