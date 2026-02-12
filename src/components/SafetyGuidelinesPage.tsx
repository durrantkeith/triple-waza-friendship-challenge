import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Shield, Play } from 'lucide-react';

interface ContentSection {
  id: string;
  section_number: number;
  section_title: string;
  video_url: string;
  description: string;
  additional_notes: string;
}

interface PageData {
  title: string;
  description: string;
}

export default function SafetyGuidelinesPage() {
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [sections, setSections] = useState<ContentSection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const { data: pageData, error: pageError } = await supabase
        .from('educational_pages')
        .select('title, description')
        .eq('page_type', 'safety_guidelines')
        .maybeSingle();

      if (pageError) throw pageError;

      const { data: page } = await supabase
        .from('educational_pages')
        .select('id')
        .eq('page_type', 'safety_guidelines')
        .maybeSingle();

      if (page) {
        const { data: sectionsData, error: sectionsError } = await supabase
          .from('educational_content_sections')
          .select('*')
          .eq('page_id', page.id)
          .order('section_number');

        if (sectionsError) throw sectionsError;
        setSections(sectionsData || []);
      }

      setPageData(pageData);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border border-slate-200 border-t-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="p-4 bg-green-100 rounded-full">
              <Shield className="text-green-700" size={40} strokeWidth={1.5} />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-light text-slate-900 mb-6 tracking-tight">
            {pageData?.title || 'Safety Guidelines'}
          </h1>

          <p className="text-lg text-slate-700 leading-relaxed font-light max-w-2xl mx-auto">
            {pageData?.description || 'Essential safety practices for kata training and demonstration'}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {sections.map((section) => (
            <div key={section.id} className="bg-white border border-slate-200 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
              <div className="aspect-video bg-slate-100 relative overflow-hidden">
                {section.video_url ? (
                  <iframe
                    src={section.video_url}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={section.section_title}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <Play size={48} className="text-slate-300 mx-auto mb-3" strokeWidth={1.5} />
                      <p className="text-slate-400 text-sm font-light">No video available</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-normal text-slate-900 mb-3">
                  {section.section_title}
                </h3>

                {section.description && (
                  <p className="text-slate-700 font-light leading-relaxed mb-4">
                    {section.description}
                  </p>
                )}

                {section.additional_notes && (
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <p className="text-sm text-slate-600 font-light italic">
                      {section.additional_notes}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {sections.length === 0 && (
          <div className="text-center py-16 bg-white border border-slate-200">
            <Shield size={48} className="text-slate-300 mx-auto mb-4" strokeWidth={1.5} />
            <p className="text-slate-600 font-light">Content coming soon</p>
          </div>
        )}
      </div>
    </div>
  );
}
