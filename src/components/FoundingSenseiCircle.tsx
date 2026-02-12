import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Award } from 'lucide-react';

interface Founder {
  id: string;
  name: string;
  title: string;
  dojo_name: string;
  city: string;
  country: string;
  years_teaching: number;
  photo_url: string;
  quote: string;
  is_founding_member: boolean;
  order_index: number;
}

interface FoundingSenseiCircleProps {
  onNavigate: (page: string) => void;
}

export default function FoundingSenseiCircle({ onNavigate }: FoundingSenseiCircleProps) {
  const [founders, setFounders] = useState<Founder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFounders();
  }, []);

  const fetchFounders = async () => {
    try {
      const { data, error } = await supabase
        .from('founders')
        .select('*')
        .eq('is_founding_member', true)
        .order('order_index');

      if (error) throw error;
      setFounders(data || []);
    } catch (error) {
      console.error('Error fetching founders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <section className="w-full bg-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
            Founding Sensei Circle
          </h2>
          <p className="text-sm text-slate-600 max-w-2xl mx-auto">
            Honoring the pioneer instructors who launched this global judo education movement
          </p>
        </div>

        {/* Founders Grid */}
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-slate-300 border-t-slate-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {founders.map((founder) => (
              <div
                key={founder.id}
                className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-slate-200 relative group"
              >
                {/* Founding Member Badge */}
                <div className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1.5 shadow-md z-10">
                  <Award size={14} />
                </div>

                {/* Profile Photo */}
                <div className="flex justify-center mb-3">
                  <div className="w-20 h-20 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden border-2 border-slate-300">
                    {founder.photo_url && founder.photo_url !== '/placeholder-sensei-1.jpg' && founder.photo_url !== '/placeholder-sensei-2.jpg' && founder.photo_url !== '/placeholder-sensei-3.jpg' && founder.photo_url !== '/placeholder-sensei-4.jpg' ? (
                      <img
                        src={founder.photo_url}
                        alt={founder.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-xl font-semibold text-slate-500">
                        {getInitials(founder.name)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Sensei Info */}
                <div className="text-center">
                  <h3 className="text-base font-bold text-slate-800 mb-0.5">
                    {founder.name}
                  </h3>
                  <p className="text-xs text-red-600 font-medium mb-2">{founder.title}</p>

                  <div className="space-y-1 text-xs text-slate-600">
                    <div className="font-medium">{founder.dojo_name}</div>
                    <div>{founder.city}, {founder.country}</div>
                    {founder.years_teaching > 0 && (
                      <div className="text-slate-500">{founder.years_teaching} years teaching</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
