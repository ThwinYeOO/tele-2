import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  User,
  Stethoscope,
  Building2,
  Search,
  Calendar,
  Video,
  FileText,
  Star,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';

interface StepProps {
  number: number;
  title: string;
  description: string;
  icon: React.ElementType;
  isLast?: boolean;
}

const Step = ({ number, title, description, icon: Icon, isLast }: StepProps) => {
  return (
    <div className="relative flex gap-6">
      {/* Connector Line */}
      {!isLast && (
        <div className="absolute left-7 top-14 w-0.5 h-full bg-gradient-to-b from-teal-200 to-teal-100" />
      )}
      
      {/* Step Number */}
      <div className="relative z-10 flex-shrink-0">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-teal-500/20">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center text-white text-xs font-bold">
          {number}
        </div>
      </div>

      {/* Content */}
      <div className="pb-10">
        <h4 className="text-lg font-bold text-slate-900 mb-2">{title}</h4>
        <p className="text-slate-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState('patient');
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

  const patientSteps = [
    {
      icon: User,
      title: 'Create Your Account',
      description: 'Sign up with your phone number in less than 2 minutes. Verify with OTP for security.',
    },
    {
      icon: Search,
      title: 'Find a Doctor',
      description: 'Browse doctors by specialty, location, or rating. View profiles and patient reviews.',
    },
    {
      icon: Calendar,
      title: 'Book an Appointment',
      description: 'Choose a convenient time slot. Book instantly or schedule for later.',
    },
    {
      icon: Video,
      title: 'Start Consultation',
      description: 'Join the video call at your scheduled time. Discuss your symptoms with the doctor.',
    },
    {
      icon: FileText,
      title: 'Get Prescription',
      description: 'Receive your digital prescription with QR code. Download or share with pharmacies.',
    },
    {
      icon: Star,
      title: 'Rate Your Experience',
      description: 'Share feedback to help others find the best doctors. Your review matters!',
    },
  ];

  const doctorSteps = [
    {
      icon: CheckCircle2,
      title: 'Apply as a Doctor',
      description: 'Submit your medical license and credentials for verification.',
    },
    {
      icon: Calendar,
      title: 'Set Your Schedule',
      description: 'Define your available hours and consultation fees. Manage your calendar easily.',
    },
    {
      icon: User,
      title: 'Get Verified',
      description: 'Our team verifies your credentials within 24-48 hours.',
    },
    {
      icon: Video,
      title: 'Accept Consultations',
      description: 'Receive patient requests and start video consultations from anywhere.',
    },
    {
      icon: FileText,
      title: 'Issue Prescriptions',
      description: 'Create digital prescriptions with just a few taps. Patients receive them instantly.',
    },
    {
      icon: Star,
      title: 'Build Your Reputation',
      description: 'Earn ratings and reviews. Grow your patient base and increase earnings.',
    },
  ];

  const hospitalSteps = [
    {
      icon: Building2,
      title: 'Register Your Hospital',
      description: 'Sign up your healthcare facility with required documentation.',
    },
    {
      icon: User,
      title: 'Add Your Doctors',
      description: 'Onboard your medical staff and manage their profiles and schedules.',
    },
    {
      icon: FileText,
      title: 'Upload Lab Results',
      description: 'Share patient test results and medical records securely through the platform.',
    },
    {
      icon: CheckCircle2,
      title: 'Manage Operations',
      description: 'View analytics, track consultations, and optimize your healthcare delivery.',
    },
  ];

  return (
    <section 
      id="how-it-works" 
      ref={sectionRef}
      className="py-20 lg:py-32 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-teal-100/30 to-cyan-100/30 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Badge 
            variant="secondary" 
            className="bg-teal-100 text-teal-700 px-4 py-1.5 text-sm font-medium mb-6"
          >
            How It Works
          </Badge>
          <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6">
            Simple Steps to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600">
              Better Health
            </span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Getting healthcare has never been easier. Follow these simple steps to connect 
            with qualified doctors in Myanmar.
          </p>
        </div>

        {/* Tabs */}
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className={`flex justify-center mb-12 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <TabsList className="bg-slate-100 p-1.5 rounded-xl">
              <TabsTrigger 
                value="patient" 
                className="px-6 py-3 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-teal-700 font-medium transition-all"
              >
                <User className="w-4 h-4 mr-2" />
                For Patients
              </TabsTrigger>
              <TabsTrigger 
                value="doctor"
                className="px-6 py-3 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-teal-700 font-medium transition-all"
              >
                <Stethoscope className="w-4 h-4 mr-2" />
                For Doctors
              </TabsTrigger>
              <TabsTrigger 
                value="hospital"
                className="px-6 py-3 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-teal-700 font-medium transition-all"
              >
                <Building2 className="w-4 h-4 mr-2" />
                For Hospitals
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Tab Contents */}
          <TabsContent value="patient" className="mt-0">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
                {patientSteps.map((step, index) => (
                  <Step
                    key={index}
                    number={index + 1}
                    title={step.title}
                    description={step.description}
                    icon={step.icon}
                    isLast={index === patientSteps.length - 1}
                  />
                ))}
              </div>
              <div className={`lg:sticky lg:top-32 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
                <Card className="p-8 bg-gradient-to-br from-teal-600 to-cyan-700 text-white border-0 overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
                  <div className="relative">
                    <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
                    <p className="text-teal-100 mb-6">
                      Join thousands of patients who trust MyanmarCare for their healthcare needs. 
                      Your first consultation is just minutes away.
                    </p>
                    <ul className="space-y-3 mb-8">
                      {['Free registration', 'No hidden fees', 'Cancel anytime'].map((item, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-teal-300" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      size="lg" 
                      className="bg-white text-teal-700 hover:bg-teal-50 font-semibold w-full sm:w-auto"
                    >
                      Register as Patient
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="doctor" className="mt-0">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                {doctorSteps.map((step, index) => (
                  <Step
                    key={index}
                    number={index + 1}
                    title={step.title}
                    description={step.description}
                    icon={step.icon}
                    isLast={index === doctorSteps.length - 1}
                  />
                ))}
              </div>
              <div className="lg:sticky lg:top-32">
                <Card className="p-8 bg-gradient-to-br from-amber-500 to-orange-600 text-white border-0 overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
                  <div className="relative">
                    <h3 className="text-2xl font-bold mb-4">Grow Your Practice</h3>
                    <p className="text-amber-100 mb-6">
                      Reach more patients, manage your schedule flexibly, and increase your 
                      income with our telemedicine platform.
                    </p>
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="bg-white/10 rounded-xl p-4">
                        <div className="text-3xl font-bold">3x</div>
                        <div className="text-sm text-amber-100">More Patients</div>
                      </div>
                      <div className="bg-white/10 rounded-xl p-4">
                        <div className="text-3xl font-bold">80%</div>
                        <div className="text-sm text-amber-100">Doctor Revenue</div>
                      </div>
                    </div>
                    <Button 
                      size="lg" 
                      className="bg-white text-amber-600 hover:bg-amber-50 font-semibold w-full sm:w-auto"
                    >
                      Apply as Doctor
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="hospital" className="mt-0">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                {hospitalSteps.map((step, index) => (
                  <Step
                    key={index}
                    number={index + 1}
                    title={step.title}
                    description={step.description}
                    icon={step.icon}
                    isLast={index === hospitalSteps.length - 1}
                  />
                ))}
              </div>
              <div className="lg:sticky lg:top-32">
                <Card className="p-8 bg-gradient-to-br from-violet-600 to-purple-700 text-white border-0 overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
                  <div className="relative">
                    <h3 className="text-2xl font-bold mb-4">Transform Your Hospital</h3>
                    <p className="text-violet-100 mb-6">
                      Digitize your operations, improve patient experience, and gain valuable 
                      insights with our hospital management features.
                    </p>
                    <ul className="space-y-3 mb-8">
                      {['Patient management system', 'Lab results portal', 'Analytics dashboard'].map((item, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-violet-300" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      size="lg" 
                      className="bg-white text-violet-700 hover:bg-violet-50 font-semibold w-full sm:w-auto"
                    >
                      Register Hospital
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default HowItWorks;
