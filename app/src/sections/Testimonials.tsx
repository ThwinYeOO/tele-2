import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  location: string;
  avatar: string;
  rating: number;
  text: string;
  type: 'patient' | 'doctor';
}

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
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

  const testimonials: Testimonial[] = [
    {
      name: 'Daw Khin Lay',
      role: 'Patient',
      location: 'Yangon',
      avatar: 'KL',
      rating: 5,
      text: 'I was able to consult with a specialist doctor without leaving my home. The video quality was excellent even on my 3G connection. The doctor was very professional and prescribed the right medication. Highly recommended!',
      type: 'patient',
    },
    {
      name: 'Dr. Min Thu',
      role: 'General Physician',
      location: 'Mandalay',
      avatar: 'MT',
      rating: 5,
      text: 'As a doctor, this platform has helped me reach patients in remote areas who otherwise wouldn\'t have access to healthcare. The interface is easy to use, and the payment system is reliable.',
      type: 'doctor',
    },
    {
      name: 'U Aung Kyaw',
      role: 'Patient',
      location: 'Naypyidaw',
      avatar: 'AK',
      rating: 5,
      text: 'The SOS emergency feature saved my father\'s life. When he had chest pain, I pressed the button and an ambulance arrived within 10 minutes. The app also notified our family members automatically.',
      type: 'patient',
    },
    {
      name: 'Dr. Hla Hla Win',
      role: 'Pediatrician',
      location: 'Yangon',
      avatar: 'HH',
      rating: 5,
      text: 'I can manage my schedule flexibly and see more patients than in a traditional clinic. The digital prescription feature saves time and reduces errors. Great platform for doctors!',
      type: 'doctor',
    },
    {
      name: 'Ma Thida',
      role: 'Patient',
      location: 'Bago',
      avatar: 'TD',
      rating: 5,
      text: 'I love that the app works in Myanmar language. My grandmother can use it easily. We subscribed to the Family plan and now everyone in our household has access to healthcare.',
      type: 'patient',
    },
  ];

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section 
      ref={sectionRef}
      className="py-20 lg:py-32 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-radial from-teal-100/30 via-transparent to-transparent rounded-full transform translate-x-1/3" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Badge 
            variant="secondary" 
            className="bg-teal-100 text-teal-700 px-4 py-1.5 text-sm font-medium mb-6"
          >
            Testimonials
          </Badge>
          <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6">
            What Our Users{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600">
              Say About Us
            </span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Join thousands of satisfied patients and doctors who trust MyanmarCare 
            for their healthcare needs.
          </p>
        </div>

        {/* Featured Testimonial */}
        <div className={`mb-12 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Card className="p-8 lg:p-12 bg-gradient-to-br from-teal-600 to-cyan-700 text-white border-0 relative overflow-hidden">
            <Quote className="absolute top-8 right-8 w-24 h-24 text-white/10" />
            
            <div className="relative grid lg:grid-cols-3 gap-8 items-center">
              {/* Avatar & Info */}
              <div className="lg:col-span-1 text-center lg:text-left">
                <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center mx-auto lg:mx-0 mb-4 text-3xl font-bold">
                  {testimonials[activeIndex].avatar}
                </div>
                <h4 className="text-xl font-bold">{testimonials[activeIndex].name}</h4>
                <p className="text-teal-100">{testimonials[activeIndex].role}</p>
                <p className="text-teal-200 text-sm">{testimonials[activeIndex].location}</p>
                <div className="flex items-center justify-center lg:justify-start gap-1 mt-3">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>

              {/* Quote */}
              <div className="lg:col-span-2">
                <p className="text-xl lg:text-2xl leading-relaxed text-teal-50">
                  "{testimonials[activeIndex].text}"
                </p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center lg:justify-end gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      i === activeIndex ? 'bg-white w-8' : 'bg-white/40'
                    }`}
                  />
                ))}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </Card>
        </div>

        {/* Testimonial Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.filter((_, i) => i !== activeIndex).slice(0, 3).map((testimonial, index) => (
            <Card
              key={index}
              className={`p-6 bg-white border-slate-100 hover:border-teal-200 hover:shadow-lg transition-all duration-500 cursor-pointer ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
              onClick={() => setActiveIndex(testimonials.indexOf(testimonial))}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-white font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">{testimonial.name}</h4>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-slate-600 text-sm line-clamp-3">"{testimonial.text}"</p>
              <div className="flex items-center gap-1 mt-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
