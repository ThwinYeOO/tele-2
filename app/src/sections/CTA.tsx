import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Apple,
  Play,
  Smartphone,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

const CTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
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

  const benefits = [
    'Free registration',
    'No credit card required',
    'Cancel anytime',
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-20 lg:py-32 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-radial from-teal-100/40 via-cyan-100/20 to-transparent rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 lg:p-16 overflow-hidden relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />

          <div className="relative grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div>
                <Badge className="bg-teal-500/20 text-teal-300 mb-6">
                  Get Started Today
                </Badge>
                <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
                  Download the App & Start Your Healthcare Journey
                </h2>
                <p className="text-lg text-slate-300 leading-relaxed">
                  Join over 50,000 users who trust MyanmarCare for their healthcare needs. 
                  Available on iOS and Android devices.
                </p>
              </div>

              {/* Benefits */}
              <ul className="space-y-3">
                {benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-teal-400 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              {/* App Store Buttons */}
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-slate-900 hover:bg-slate-100 px-6"
                >
                  <Apple className="w-6 h-6 mr-3" />
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="text-sm font-bold">App Store</div>
                  </div>
                </Button>
                <Button 
                  size="lg" 
                  className="bg-white text-slate-900 hover:bg-slate-100 px-6"
                >
                  <Play className="w-6 h-6 mr-3 fill-slate-900" />
                  <div className="text-left">
                    <div className="text-xs">Get it on</div>
                    <div className="text-sm font-bold">Google Play</div>
                  </div>
                </Button>
              </div>
            </div>

            {/* Right Content - Phone Mockup */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                {/* Phone Frame */}
                <div className="w-64 h-[500px] bg-slate-900 rounded-[3rem] border-8 border-slate-700 shadow-2xl overflow-hidden">
                  {/* Screen Content */}
                  <div className="h-full bg-gradient-to-b from-teal-500 to-cyan-600 p-6 flex flex-col">
                    {/* Status Bar */}
                    <div className="flex justify-between items-center text-white text-xs mb-8">
                      <span>9:41</span>
                      <div className="flex gap-1">
                        <div className="w-4 h-4 rounded-full bg-white/20" />
                        <div className="w-4 h-4 rounded-full bg-white/20" />
                      </div>
                    </div>

                    {/* App Content */}
                    <div className="flex-1 flex flex-col items-center justify-center text-white text-center">
                      <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center mb-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
                          <Smartphone className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold mb-2">MyanmarCare</h3>
                      <p className="text-teal-100 text-sm mb-6">Healthcare at your fingertips</p>
                      
                      <div className="space-y-3 w-full">
                        <div className="bg-white/20 backdrop-blur rounded-xl p-4 text-left">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white/30" />
                            <div>
                              <div className="text-sm font-medium">Dr. Khin Mya</div>
                              <div className="text-xs text-teal-100">General Physician</div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white/20 backdrop-blur rounded-xl p-4 text-left">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white/30" />
                            <div>
                              <div className="text-sm font-medium">Upcoming</div>
                              <div className="text-xs text-teal-100">Today, 2:00 PM</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Home Indicator */}
                    <div className="flex justify-center pb-2">
                      <div className="w-32 h-1 bg-white/30 rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -left-8 top-20 bg-white rounded-xl shadow-lg p-3 animate-bounce" style={{ animationDuration: '3s' }}>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="text-sm font-medium text-slate-700">Verified Doctor</span>
                  </div>
                </div>

                <div className="absolute -right-4 bottom-32 bg-white rounded-xl shadow-lg p-3" style={{ animation: 'bounce 3s infinite 0.5s' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                      <span className="text-amber-600 font-bold text-sm">4.9</span>
                    </div>
                    <span className="text-sm text-slate-600">Rating</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="mt-16 pt-8 border-t border-white/10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-1">Stay Updated</h4>
                <p className="text-slate-400 text-sm">Get the latest health tips and app updates</p>
              </div>
              <div className="flex gap-3 w-full lg:w-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 w-full lg:w-72"
                />
                <Button className="bg-teal-500 hover:bg-teal-600 text-white whitespace-nowrap">
                  Subscribe
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
