import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Award } from 'lucide-react';

interface Founder {
  id: string;
  name: string;
  title: string;
  dojo_name: string;
  city: string;
  province_state: string;
  country: string;
  years_teaching: number;
  photo_url: string;
  quote: string;
  is_founding_member: boolean;
  order_index: number;
}

export default function FoundingSenseiCirclePage() {
  const [founders, setFounders] = useState<Founder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFounders();
  }, []);

  const fetchFounders = async () => {
    try {
      const { data, error } = await supabase
        .from('founders')
        .select('*');

      if (error) throw error;

      const sortedData = (data || []).sort((a, b) => {
        const lastNameA = a.name.split(' ').pop() || '';
        const lastNameB = b.name.split(' ').pop() || '';
        return lastNameA.localeCompare(lastNameB);
      });

      setFounders(sortedData);
    } catch (error) {
      console.error('Error fetching founders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDanRankStyle = (title: string) => {
    if (title.includes('8th')) return 'text-amber-700';
    if (title.includes('7th')) return 'text-red-700';
    if (title.includes('6th')) return 'text-slate-700';
    return 'text-neutral-700';
  };

  return (
    <div className="w-full min-h-screen bg-neutral-50">
      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-light text-slate-900 mb-6 tracking-tight">
            Triple Waza FC Ambassadors
          </h1>

          <div className="max-w-2xl mx-auto space-y-4">
            <p className="text-lg text-slate-700 leading-relaxed font-light">
              This archive honors the original contributors to the Triple Waza Friendship Challenge.
            </p>
            <p className="text-base text-slate-600 leading-relaxed font-light">
              Your commitment to traditional judo kata strengthens our movement. We salute you!
            </p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-32">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border border-slate-200 border-t-red-600"></div>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="text-center mb-8">
              <p className="text-xs text-slate-500 font-light">
                In alphabetical order.
              </p>
            </div>

            {/* Rolodex-style Table */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-slate-200">
              {/* Table Header */}
              <div className="bg-slate-50 border-b border-slate-200 sticky top-0 z-10">
                <div className="grid grid-cols-[2fr,1fr,1fr,1.5fr] gap-6 px-8 py-3">
                  <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Name</div>
                  <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Prov./State</div>
                  <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Country</div>
                  <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Dojo</div>
                </div>
              </div>

              {/* Scrollable Table Body */}
              <div className="max-h-96 overflow-y-auto">
                {founders.map((founder, index) => {
                  const rankColor = getDanRankStyle(founder.title);
                  return (
                    <div
                      key={founder.id}
                      className="grid grid-cols-[2fr,1fr,1fr,1.5fr] gap-6 px-8 py-3 border-b border-slate-100 transition-colors duration-150 hover:bg-slate-50"
                    >
                      <div className="flex items-center">
                        <span className="text-sm text-slate-800 font-normal">{founder.name}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-slate-600 font-light">{founder.province_state || '—'}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-slate-600 font-light">{founder.country}</span>
                      </div>
                      <div className="flex items-center">
                        <span className={`text-sm font-normal ${rankColor}`}>
                          {founder.title}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer Note */}
            <div className="text-center mt-12">
              <p className="text-sm text-slate-500 font-light italic">
                Triple Waza Friendship Challenge — A grassroots judo education initiative
              </p>
            </div>
          </>
        )}

        {!loading && founders.length === 0 && (
          <div className="text-center py-32 bg-white border border-slate-200">
            <Award size={48} className="text-slate-300 mx-auto mb-6" strokeWidth={1.5} />
            <p className="text-slate-600 font-light">No founding members yet. Be the first to join this prestigious circle!</p>
          </div>
        )}
      </div>
    </div>
  );
}
