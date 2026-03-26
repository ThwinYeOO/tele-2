import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
  Check,
  X,
  Sparkles,
  Zap,
  Building2,
  ChevronRight,
  HelpCircle,
} from 'lucide-react';

interface PricingPlan {
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  icon: React.ElementType;
  badge?: string;
  features: { text: string; included: boolean }[];
  cta: string;
  popular?: boolean;
}

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const plans: PricingPlan[] = [
    {
      name: 'Free',
      description: 'For occasional healthcare needs',
      monthlyPrice: 0,
      yearlyPrice: 0,
      icon: Sparkles,
      features: [
        { text: '3 consultations per month', included: true },
        { text: 'Text chat with doctors', included: true },
        { text: 'Basic health records', included: true },
        { text: 'Emergency SOS access', included: true },
        { text: 'Video consultations', included: false },
        { text: 'Priority booking', included: false },
        { text: 'Family accounts', included: false },
      ],
      cta: 'Get Started Free',
    },
    {
      name: 'Premium',
      description: 'For regular healthcare needs',
      monthlyPrice: 15000,
      yearlyPrice: 144000,
      icon: Zap,
      badge: 'Most Popular',
      popular: true,
      features: [
        { text: 'Unlimited consultations', included: true },
        { text: 'Video & audio calls', included: true },
        { text: 'Priority appointment booking', included: true },
        { text: 'Full medical records', included: true },
        { text: 'Digital prescriptions', included: true },
        { text: '24/7 chat support', included: true },
        { text: 'Family accounts (up to 4)', included: false },
      ],
      cta: 'Start Premium Trial',
    },
    {
      name: 'Family',
      description: 'For families and groups',
      monthlyPrice: 35000,
      yearlyPrice: 336000,
      icon: Building2,
      features: [
        { text: 'Everything in Premium', included: true },
        { text: 'Family accounts (up to 6)', included: true },
        { text: 'Shared health records', included: true },
        { text: 'Dedicated support line', included: true },
        { text: 'Home visit requests', included: true },
        { text: 'Health analytics', included: true },
        { text: 'Annual health reports', included: true },
      ],
      cta: 'Choose Family Plan',
    },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US').format(price);
  };

  return (
    <section 
      id="pricing" 
      ref={sectionRef}
      className="py-20 lg:py-32 bg-white relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-teal-100/20 via-transparent to-transparent rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Badge 
            variant="secondary" 
            className="bg-teal-100 text-teal-700 px-4 py-1.5 text-sm font-medium mb-6"
          >
            Pricing
          </Badge>
          <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6">
            Simple, Transparent{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600">
              Pricing
            </span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
            Choose the plan that works best for you. All plans include access to our 
            network of certified doctors across Myanmar.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm font-medium ${!isYearly ? 'text-slate-900' : 'text-slate-500'}`}>
              Monthly
            </span>
            <Switch
              checked={isYearly}
              onCheckedChange={setIsYearly}
              className="data-[state=checked]:bg-teal-600"
            />
            <span className={`text-sm font-medium ${isYearly ? 'text-slate-900' : 'text-slate-500'}`}>
              Yearly
            </span>
            {isYearly && (
              <Badge className="bg-green-100 text-green-700 text-xs">
                Save 20%
              </Badge>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-6">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative p-6 lg:p-8 transition-all duration-700 ${
                plan.popular 
                  ? 'bg-gradient-to-b from-teal-600 to-cyan-700 text-white border-0 shadow-xl shadow-teal-600/20 scale-105 z-10' 
                  : 'bg-white border-slate-200 hover:border-teal-200 hover:shadow-lg'
              } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              {/* Popular Badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-amber-400 text-amber-900 font-semibold px-4 py-1">
                    {plan.badge}
                  </Badge>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                  plan.popular ? 'bg-white/20' : 'bg-teal-100'
                }`}>
                  <plan.icon className={`w-7 h-7 ${plan.popular ? 'text-white' : 'text-teal-600'}`} />
                </div>
                <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-slate-900'}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm ${plan.popular ? 'text-teal-100' : 'text-slate-500'}`}>
                  {plan.description}
                </p>
              </div>

              {/* Price */}
              <div className="text-center mb-8">
                <div className="flex items-baseline justify-center gap-1">
                  <span className={`text-lg ${plan.popular ? 'text-teal-100' : 'text-slate-500'}`}>MMK</span>
                  <span className={`text-5xl font-bold ${plan.popular ? 'text-white' : 'text-slate-900'}`}>
                    {formatPrice(isYearly ? plan.yearlyPrice : plan.monthlyPrice)}
                  </span>
                </div>
                <span className={`text-sm ${plan.popular ? 'text-teal-100' : 'text-slate-500'}`}>
                  {plan.monthlyPrice === 0 ? 'Free forever' : `per ${isYearly ? 'year' : 'month'}`}
                </span>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    {feature.included ? (
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        plan.popular ? 'bg-white/20' : 'bg-teal-100'
                      }`}>
                        <Check className={`w-3 h-3 ${plan.popular ? 'text-white' : 'text-teal-600'}`} />
                      </div>
                    ) : (
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        plan.popular ? 'bg-white/10' : 'bg-slate-100'
                      }`}>
                        <X className={`w-3 h-3 ${plan.popular ? 'text-teal-200' : 'text-slate-400'}`} />
                      </div>
                    )}
                    <span className={`text-sm ${
                      feature.included 
                        ? (plan.popular ? 'text-white' : 'text-slate-700')
                        : (plan.popular ? 'text-teal-200' : 'text-slate-400')
                    }`}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button 
                className={`w-full py-6 font-semibold ${
                  plan.popular 
                    ? 'bg-white text-teal-700 hover:bg-teal-50' 
                    : 'bg-teal-600 text-white hover:bg-teal-700'
                }`}
              >
                {plan.cta}
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className={`mt-12 text-center transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-slate-500 text-sm flex items-center justify-center gap-2">
            <HelpCircle className="w-4 h-4" />
            All prices are in Myanmar Kyat (MMK). Need a custom plan for your organization?
            <a href="#" className="text-teal-600 font-medium hover:underline">Contact us</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
