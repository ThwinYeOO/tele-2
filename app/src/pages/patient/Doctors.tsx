import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Star, MapPin, Clock, Video, Stethoscope, Search, Filter, Calendar } from 'lucide-react';
import { api } from '@/lib/api';

const PatientDoctors = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [specialty, setSpecialty] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [doctors, setDoctors] = useState<Array<{
    id: string;
    name: string;
    specialty: string;
    hospital: string;
    experienceYears: number;
    rating: number;
    reviews: number;
    languages: string[];
    consultationFee: number;
    image?: string;
  }>>([]);

  const specialties = [
    'All Specialties',
    'Cardiology',
    'Dermatology',
    'General Physician',
    'Pediatrics',
    'Orthopedics',
    'ENT',
    'Neurology',
    'Gynecology',
  ];

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setIsLoading(true);
        setError('');
        const res = await api.get<{ doctors: typeof doctors }>('/api/doctors');
        if (!cancelled) setDoctors(res.doctors);
      } catch (e: any) {
        if (!cancelled) setError(e?.message || 'Failed to load doctors');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredDoctors = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return doctors.filter((doc) => {
      const matchesSearch =
        doc.name.toLowerCase().includes(q) ||
        doc.specialty.toLowerCase().includes(q) ||
        doc.hospital.toLowerCase().includes(q);
      const matchesSpecialty =
        specialty === 'all' || doc.specialty.toLowerCase().includes(specialty.toLowerCase());
      return matchesSearch && matchesSpecialty;
    });
  }, [doctors, searchQuery, specialty]);

  const bookNow = async (doctorId: string) => {
    try {
      // Demo: book a slot 2 hours from now
      const scheduledAt = new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString();
      await api.post('/api/appointments', { doctorId, scheduledAt, type: 'video' });
      navigate('/patient/appointments');
    } catch (e: any) {
      setError(e?.message || 'Booking failed');
    }
  };

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Find Doctors</h1>
        <p className="text-slate-500 mt-1">Book appointments with top healthcare professionals</p>
      </div>

      {/* Search & Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                placeholder="Search by doctor name, specialty, or hospital..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={specialty} onValueChange={setSpecialty}>
              <SelectTrigger className="w-full lg:w-56">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Select Specialty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specialties</SelectItem>
                {specialties.slice(1).map((s) => (
                  <SelectItem key={s} value={s.toLowerCase()}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-slate-500">
          Showing <span className="font-medium text-slate-900">{filteredDoctors.length}</span> doctors
        </p>
        <Select defaultValue="recommended">
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recommended">Recommended</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4 text-sm text-red-700">
            {error}
          </CardContent>
        </Card>
      )}

      {/* Doctors Grid */}
      <div className="grid lg:grid-cols-2 gap-4">
        {isLoading ? (
          <Card>
            <CardContent className="p-6 text-slate-600">Loading doctors…</CardContent>
          </Card>
        ) : (
          filteredDoctors.map((doctor) => (
          <Card key={doctor.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-5">
              <div className="flex gap-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={doctor.image} />
                  <AvatarFallback className="bg-teal-100 text-teal-700 text-xl">
                    {doctor.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-slate-900">{doctor.name}</h3>
                      <p className="text-sm text-teal-600">{doctor.specialty}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span className="text-sm font-medium text-amber-700">{doctor.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3" /> {doctor.hospital}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="secondary" className="text-xs">
                      {doctor.experienceYears} years
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {doctor.reviews} reviews
                    </Badge>
                    {doctor.languages.map((lang) => (
                      <Badge key={lang} variant="outline" className="text-xs">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500">Consultation Fee</p>
                  <p className="font-semibold text-slate-900">{doctor.consultationFee.toLocaleString()} MMK</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500">Next Available</p>
                  <p className="text-sm font-medium text-green-600">
                    <Clock className="w-3 h-3 inline mr-1" />
                    Today
                  </p>
                </div>
              </div>

              <div className="mt-4 flex gap-3">
                <Button variant="outline" className="flex-1 gap-2">
                  <Video className="w-4 h-4" />
                  Video
                </Button>
                <Button
                  className="flex-1 bg-teal-600 hover:bg-teal-700 gap-2"
                  onClick={() => bookNow(doctor.id)}
                >
                  <Calendar className="w-4 h-4" />
                  Book Now
                </Button>
              </div>
            </CardContent>
          </Card>
          ))
        )}
      </div>

      {filteredDoctors.length === 0 && (
        <div className="text-center py-12">
          <Stethoscope className="w-16 h-16 mx-auto text-slate-300 mb-4" />
          <h3 className="text-lg font-medium text-slate-900">No doctors found</h3>
          <p className="text-slate-500">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default PatientDoctors;
