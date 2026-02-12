import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Save, X, BookOpen, Lightbulb, Shield, Award } from 'lucide-react';

interface ContentSection {
  id: string;
  page_id: string;
  section_number: number;
  section_title: string;
  video_url: string;
  description: string;
  additional_notes: string;
}

interface PageType {
  id: string;
  page_type: string;
  title: string;
  description: string;
}

const pageIcons: Record<string, any> = {
  judo_techniques: BookOpen,
  training_tips: Lightbulb,
  safety_guidelines: Shield,
  kata_standards: Award,
};

const pageColors: Record<string, string> = {
  judo_techniques: 'blue',
  training_tips: 'amber',
  safety_guidelines: 'green',
  kata_standards: 'red',
};

export default function EducationalContentManager() {
  const [pages, setPages] = useState<PageType[]>([]);
  const [selectedPage, setSelectedPage] = useState<string>('');
  const [sections, setSections] = useState<ContentSection[]>([]);
  const [editingSection, setEditingSection] = useState<ContentSection | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchPages();
  }, []);

  useEffect(() => {
    if (selectedPage) {
      fetchSections(selectedPage);
    }
  }, [selectedPage]);

  const fetchPages = async () => {
    try {
      const { data, error } = await supabase
        .from('educational_pages')
        .select('*')
        .order('page_type');

      if (error) throw error;
      setPages(data || []);
      if (data && data.length > 0) {
        setSelectedPage(data[0].page_type);
      }
    } catch (error) {
      console.error('Error fetching pages:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSections = async (pageType: string) => {
    try {
      const { data: page } = await supabase
        .from('educational_pages')
        .select('id')
        .eq('page_type', pageType)
        .maybeSingle();

      if (page) {
        const { data, error } = await supabase
          .from('educational_content_sections')
          .select('*')
          .eq('page_id', page.id)
          .order('section_number');

        if (error) throw error;
        setSections(data || []);
      }
    } catch (error) {
      console.error('Error fetching sections:', error);
    }
  };

  const handleSaveSection = async () => {
    if (!editingSection) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('educational_content_sections')
        .update({
          section_title: editingSection.section_title,
          video_url: editingSection.video_url,
          description: editingSection.description,
          additional_notes: editingSection.additional_notes,
          updated_at: new Date().toISOString(),
        })
        .eq('id', editingSection.id);

      if (error) throw error;

      await fetchSections(selectedPage);
      setEditingSection(null);
      alert('Section saved successfully!');
    } catch (error) {
      console.error('Error saving section:', error);
      alert('Failed to save section');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border border-slate-200 border-t-red-600"></div>
      </div>
    );
  }

  const currentPage = pages.find(p => p.page_type === selectedPage);
  const Icon = currentPage ? pageIcons[currentPage.page_type] : BookOpen;
  const color = currentPage ? pageColors[currentPage.page_type] : 'blue';

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-normal text-slate-900 mb-4">Educational Content Manager</h2>
        <p className="text-slate-600 font-light">Manage videos and content for educational pages</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {pages.map((page) => {
          const PageIcon = pageIcons[page.page_type];
          const bgColor = selectedPage === page.page_type
            ? `bg-${pageColors[page.page_type]}-100 border-${pageColors[page.page_type]}-300 text-${pageColors[page.page_type]}-800`
            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50';

          return (
            <button
              key={page.page_type}
              onClick={() => setSelectedPage(page.page_type)}
              className={`flex items-center gap-2 px-4 py-2 border transition-colors ${bgColor}`}
            >
              <PageIcon size={18} strokeWidth={1.5} />
              <span className="font-light">{page.title}</span>
            </button>
          );
        })}
      </div>

      {currentPage && (
        <div className="bg-white border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-3 bg-${color}-100 rounded`}>
              <Icon className={`text-${color}-700`} size={24} strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-xl font-normal text-slate-900">{currentPage.title}</h3>
              <p className="text-sm text-slate-600 font-light">{currentPage.description}</p>
            </div>
          </div>

          <div className="space-y-6">
            {sections.map((section) => (
              <div key={section.id} className="border border-slate-200 p-6">
                {editingSection?.id === section.id ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Section Title
                      </label>
                      <input
                        type="text"
                        value={editingSection.section_title}
                        onChange={(e) => setEditingSection({ ...editingSection, section_title: e.target.value })}
                        className="w-full px-4 py-2 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Video URL (YouTube embed, Vimeo, etc.)
                      </label>
                      <input
                        type="text"
                        value={editingSection.video_url}
                        onChange={(e) => setEditingSection({ ...editingSection, video_url: e.target.value })}
                        placeholder="https://www.youtube.com/embed/..."
                        className="w-full px-4 py-2 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Description
                      </label>
                      <textarea
                        value={editingSection.description}
                        onChange={(e) => setEditingSection({ ...editingSection, description: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-2 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Additional Notes
                      </label>
                      <textarea
                        value={editingSection.additional_notes}
                        onChange={(e) => setEditingSection({ ...editingSection, additional_notes: e.target.value })}
                        rows={2}
                        className="w-full px-4 py-2 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={handleSaveSection}
                        disabled={saving}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white hover:bg-green-700 transition-colors disabled:opacity-50"
                      >
                        <Save size={18} />
                        {saving ? 'Saving...' : 'Save Changes'}
                      </button>
                      <button
                        onClick={() => setEditingSection(null)}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-700 hover:bg-slate-300 transition-colors"
                      >
                        <X size={18} />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-normal text-slate-900">
                        Section {section.section_number}: {section.section_title}
                      </h4>
                      <button
                        onClick={() => setEditingSection(section)}
                        className="px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors text-sm"
                      >
                        Edit
                      </button>
                    </div>

                    {section.video_url && (
                      <div className="mb-3">
                        <p className="text-sm text-slate-600 font-light">Video: {section.video_url}</p>
                      </div>
                    )}

                    {section.description && (
                      <p className="text-slate-700 font-light mb-2">{section.description}</p>
                    )}

                    {section.additional_notes && (
                      <p className="text-sm text-slate-600 font-light italic">{section.additional_notes}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
