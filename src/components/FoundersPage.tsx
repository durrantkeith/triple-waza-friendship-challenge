import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Users, Globe, Award, Heart } from 'lucide-react';

interface Founder {
  id: string;
  name: string;
  title: string;
  country: string;
  province_state: string;
  city: string;
  photo_url: string;
  bio: string;
  contribution_type: string;
  order_index: number;
}

export default function FoundersPage() {
  const [founders, setFounders] = useState<Founder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFounders();
  }, []);

  async function loadFounders() {
    try {
      const { data, error } = await supabase
        .from('founders')
        .select('*')
        .order('name');

      if (error) throw error;
      setFounders(data || []);
    } catch (error) {
      console.error('Error loading founders:', error);
    } finally {
      setLoading(false);
    }
  }

  const getContributionIcon = (type: string) => {
    if (type.toLowerCase().includes('international') || type.toLowerCase().includes('ambassador')) {
      return <Globe className="w-5 h-5" />;
    }
    if (type.toLowerCase().includes('early') || type.toLowerCase().includes('pioneer')) {
      return <Award className="w-5 h-5" />;
    }
    return <Heart className="w-5 h-5" />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-slate-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-osp-dark to-osp-navy text-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <Users className="w-16 h-16 text-slate-300" />
          </div>
          <h1 className="text-5xl font-bold text-center mb-6">The Founders</h1>
          <p className="text-xl text-slate-300 text-left max-w-3xl mx-auto leading-relaxed italic">
            Celebrating the teachers and leaders who embraced the vision of improving Judo education globally through fun, attainable group goals that unite our Judo communities!
          </p>
        </div>
      </div>

      {/* Principles Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Award className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-slate-800">Early Action</h3>
            <p className="text-slate-600 leading-relaxed">
              Took action before it was popular, believing in the mission when others hesitated.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Globe className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-slate-800">International Reach</h3>
            <p className="text-slate-600 leading-relaxed">
              Helped spread the vision across borders, building a truly global community.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-slate-800">Dedicated Support</h3>
            <p className="text-slate-600 leading-relaxed">
              Gave time, effort, credibility, or resources to bring this idea into reality.
            </p>
          </div>
        </div>

        {/* Founders List */}
        {founders.length === 0 ? (
          <div className="text-center py-16">
            <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600 text-lg">
              Founder profiles will be added soon. Check back later to see the amazing teachers
              who helped bring this vision to life.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {founders.map((founder) => (
              <div
                key={founder.id}
                className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300 p-6"
              >
                <div className="flex gap-6 items-start">
                  <div className="flex-shrink-0">
                    {founder.photo_url && (
                      <div className="w-24 h-24 bg-gradient-to-br from-slate-200 to-slate-300 relative overflow-hidden rounded-full">
                        <img
                          src={founder.photo_url}
                          alt={founder.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    {!founder.photo_url && (
                      <div className="w-24 h-24 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center rounded-full">
                        <Users className="w-12 h-12 text-slate-400" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-800 mb-1">
                      {founder.name}
                    </h3>
                    {founder.title && (
                      <p className="text-slate-600 font-medium mb-2">{founder.title}</p>
                    )}

                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
                      {founder.city && founder.province_state && founder.country && (
                        <span>{founder.city}, {founder.province_state}, {founder.country}</span>
                      )}
                      {!founder.city && founder.province_state && founder.country && (
                        <span>{founder.province_state}, {founder.country}</span>
                      )}
                      {!founder.city && !founder.province_state && founder.country && (
                        <span>{founder.country}</span>
                      )}
                    </div>

                    {founder.contribution_type && (
                      <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-medium mb-3">
                        {getContributionIcon(founder.contribution_type)}
                        <span>{founder.contribution_type}</span>
                      </div>
                    )}

                    {founder.bio && (
                      <p className="text-slate-600 leading-relaxed mt-3">
                        {founder.bio}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Join the Movement</h2>
          <p className="text-slate-300 max-w-2xl mx-auto leading-relaxed">
            While these founders laid the foundation, the movement continues to grow with every
            teacher and student who participates. Your commitment and action today shapes
            tomorrow's legacy.
          </p>
        </div>
      </div>
    </div>
  );
}
