import { useState, useEffect, FormEvent } from 'react';
import { supabase } from '../lib/supabase';
import { AlertCircle, CheckCircle, Youtube, MapPin, Mail, Building2, Sparkles, Trophy, Clock, Award, CheckSquare, Upload, Video } from 'lucide-react';
import LiveRegion from './LiveRegion';

interface Kata {
  id: string;
  name: string;
}

interface KataSet {
  id: string;
  kata_id: string;
  set_number: number;
  name: string;
  techniques: string[];
}

interface VideoSubmissionPageProps {
  onNavigate: (page: string) => void;
}

export default function VideoSubmissionPage({ onNavigate }: VideoSubmissionPageProps) {
  const [formData, setFormData] = useState({
    country: '',
    city: '',
    dojoName: '',
    email: '',
    joinMailingList: false,
    youtubeUrl: '',
    level: '1',
    kataId: '',
    kataSetId: '',
    dojoNameOptional: '',
    message: '',
  });

  const [katas, setKatas] = useState<Kata[]>([]);
  const [kataSets, setKataSets] = useState<KataSet[]>([]);
  const [filteredKataSets, setFilteredKataSets] = useState<KataSet[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchKatas();
  }, []);

  useEffect(() => {
    if (formData.kataId) {
      const filtered = kataSets.filter(set => set.kata_id === formData.kataId);
      setFilteredKataSets(filtered);
      if (filtered.length > 0 && !formData.kataSetId) {
        setFormData(prev => ({ ...prev, kataSetId: filtered[0].id }));
      }
    }
  }, [formData.kataId, kataSets]);

  const fetchKatas = async () => {
    const [katasData, kataSetsData] = await Promise.all([
      supabase.from('katas').select('id, name').order('order_index'),
      supabase.from('kata_sets').select('*').order('set_number')
    ]);

    if (katasData.data) {
      setKatas(katasData.data);
      if (katasData.data.length > 0) {
        setFormData(prev => ({ ...prev, kataId: katasData.data[0].id }));
      }
    }
    if (kataSetsData.data) setKataSets(kataSetsData.data);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const extractYouTubeId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
      /youtube\.com\/embed\/([^&\n?#]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      if (!extractYouTubeId(formData.youtubeUrl)) {
        throw new Error('Please enter a valid YouTube URL');
      }

      let dojoId: string;

      const { data: existingDojo } = await supabase
        .from('dojos')
        .select('id')
        .eq('name', formData.dojoName.trim())
        .eq('country', formData.country.trim())
        .eq('city', formData.city.trim())
        .maybeSingle();

      if (existingDojo) {
        dojoId = existingDojo.id;
      } else {
        const { data: newDojo, error: dojoError } = await supabase
          .from('dojos')
          .insert({
            name: formData.dojoName.trim(),
            country: formData.country.trim(),
            city: formData.city.trim(),
            email: formData.email.trim(),
            instructor_name: '',
            mailing_list: formData.joinMailingList,
          })
          .select('id')
          .single();

        if (dojoError) {
          console.error('Dojo creation error:', dojoError);
          throw new Error(`Failed to create dojo: ${dojoError.message}`);
        }
        dojoId = newDojo.id;
      }

      const { error: submissionError } = await supabase.from('submissions').insert({
        dojo_id: dojoId,
        country: formData.country.trim(),
        email: formData.email.trim(),
        youtube_url: formData.youtubeUrl.trim(),
        video_file_path: null,
        level: parseInt(formData.level),
        kata_id: formData.kataId || null,
        kata_set_id: formData.kataSetId || null,
        participant_names: formData.dojoNameOptional.trim() || null,
        message: formData.message.trim() || null,
        status: 'pending',
      });

      if (submissionError) {
        console.error('Submission error:', submissionError);
        throw new Error(`Failed to submit video: ${submissionError.message}`);
      }

      onNavigate('video-thankyou');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <LiveRegion message={success ? 'Video submitted successfully!' : error || ''} />

      <div className="page-hero">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
              Submit Your YouTube Video
            </h1>
            <p className="text-xl text-white font-medium leading-relaxed drop-shadow-md">
              Share your kata performance with the global judo community
            </p>
          </div>

          {success && (
            <div className="mb-6 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-2xl p-6 flex items-start space-x-4 shadow-xl animate-scale-in border-2 border-emerald-400" role="alert">
              <CheckCircle className="flex-shrink-0 mt-1" size={28} />
              <div>
                <h3 className="font-bold text-lg mb-1.5">Amazing! You're In!</h3>
                <p className="text-emerald-50 text-sm">
                  Your video has been submitted! We'll review it and add it to the Hall of Fame soon. Thank you for being part of the global Judo community!
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-6 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-2xl p-6 flex items-start space-x-4 shadow-xl animate-scale-in border-2 border-red-400" role="alert">
              <AlertCircle className="flex-shrink-0 mt-1" size={28} />
              <div>
                <h3 className="font-bold text-lg mb-1.5">Oops! Something went wrong</h3>
                <p className="text-red-50 text-sm">{error}</p>
              </div>
            </div>
          )}

          <div className="card-elevated border-2 border-osp-light-blue/30 mb-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                Join the Triple Waza Challenge
              </h2>
              <p className="text-base text-slate-700 mb-2">
                Share your practice with the world
              </p>
              <p className="text-sm text-slate-500">
                Quick and easy - just a few details needed!
              </p>
            </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative">
          <div className="relative">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-800 mb-3">
              <Youtube className="text-red-500" size={20} />
              <span>YouTube Video Link *</span>
            </label>
            <input
              type="url"
              name="youtubeUrl"
              value={formData.youtubeUrl}
              onChange={handleChange}
              required
              placeholder="https://youtube.com/watch?v=..."
              className="w-full px-4 py-3.5 text-base border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-osp-blue focus:border-osp-blue transition-all duration-200 hover:border-slate-300 bg-slate-50 focus:bg-white"
            />
            <div className="mt-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <p className="text-sm font-semibold text-slate-800 mb-2">How to share your video:</p>
              <ol className="text-sm text-slate-700 space-y-1.5 list-decimal list-inside">
                <li>Upload your video to YouTube (it can be public or unlisted)</li>
                <li>Click the "Share" button under your video</li>
                <li>Copy the YouTube link</li>
                <li>Paste it in the field above</li>
              </ol>
              <p className="mt-2 text-xs text-slate-600 flex items-center gap-1">
                <Sparkles size={12} className="text-amber-400" />
                Tip: Set your video to "Unlisted" if you want only people with the link to view it
              </p>
            </div>
          </div>

          <div className="relative">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-800 mb-3">
              <Building2 className="text-blue-500" size={20} />
              <span>Dojo Name *</span>
            </label>
            <input
              type="text"
              name="dojoName"
              value={formData.dojoName}
              onChange={handleChange}
              required
              placeholder="Your dojo's name"
              className="w-full px-4 py-3.5 text-base border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-osp-blue focus:border-osp-blue transition-all duration-200 hover:border-slate-300 bg-slate-50 focus:bg-white"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="relative">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-800 mb-3">
                <MapPin className="text-emerald-500" size={20} />
                <span>City *</span>
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                placeholder="Tokyo"
                className="w-full px-4 py-3.5 text-base border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-osp-blue focus:border-osp-blue transition-all duration-200 hover:border-slate-300 bg-slate-50 focus:bg-white"
              />
            </div>

            <div className="relative">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-800 mb-3">
                <MapPin className="text-cyan-500" size={20} />
                <span>Country *</span>
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                placeholder="Japan"
                className="w-full px-4 py-3.5 text-base border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-osp-blue focus:border-osp-blue transition-all duration-200 hover:border-slate-300 bg-slate-50 focus:bg-white"
              />
            </div>
          </div>

          <div className="relative">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-800 mb-3">
              <Mail className="text-violet-500" size={20} />
              <span>Email *</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="sensei@dojo.com"
              className="w-full px-4 py-3.5 text-base border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-osp-blue focus:border-osp-blue transition-all duration-200 hover:border-slate-300 bg-slate-50 focus:bg-white"
            />
            <p className="mt-2 text-xs text-slate-500 flex items-center gap-1">
              <Sparkles size={12} className="text-amber-400" />
              We'll notify you when your video goes live!
            </p>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-5 border-2 border-amber-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-amber-200 rounded-full blur-2xl opacity-30"></div>
            <details className="cursor-pointer relative">
              <summary className="text-sm font-bold text-slate-800 select-none hover:text-blue-600 transition-colors flex items-center gap-2">
                <Sparkles className="text-amber-500" size={18} />
                Want to add more? (Optional)
              </summary>
              <div className="mt-5 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Message to the Judo World 💬
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Share your thoughts, greetings, or inspiration with dojos around the world..."
                    className="w-full px-4 py-3 text-sm border-2 border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-200 bg-white hover:border-amber-300"
                  />
                </div>

                <div className="flex items-start space-x-3 bg-white rounded-lg p-3 border border-amber-200">
                  <input
                    type="checkbox"
                    id="joinMailingList"
                    name="joinMailingList"
                    checked={formData.joinMailingList}
                    onChange={handleChange}
                    className="mt-0.5 h-5 w-5 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                  />
                  <label htmlFor="joinMailingList" className="text-sm text-slate-700 leading-snug font-medium">
                    Keep me updated on future challenges and events 📬
                  </label>
                </div>
              </div>
            </details>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-3"
            aria-live="polite"
          >
            <Upload size={24} />
            <span>{loading ? 'Submitting Your Video...' : 'Submit My Video'}</span>
          </button>

          <p className="text-center text-xs text-slate-500 leading-relaxed bg-slate-50 rounded-lg p-3">
            By submitting, you agree to have your video featured in our Hall of Fame and shared with the global Judo community
          </p>
        </form>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Submission Guidelines
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Follow these simple tips for the best submission
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-2 border-blue-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-blue-600 p-3 rounded-full">
                <Video className="text-white" size={24} />
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Video Quality</h3>
            </div>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start space-x-2">
                <CheckSquare className="text-blue-600 flex-shrink-0 mt-1" size={18} />
                <span>Film horizontally for better viewing</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckSquare className="text-blue-600 flex-shrink-0 mt-1" size={18} />
                <span>Ensure good lighting and clear visibility</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckSquare className="text-blue-600 flex-shrink-0 mt-1" size={18} />
                <span>Record from a stable position or tripod</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border-2 border-green-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-green-600 p-3 rounded-full">
                <Clock className="text-white" size={24} />
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Technique Coverage</h3>
            </div>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start space-x-2">
                <CheckSquare className="text-green-600 flex-shrink-0 mt-1" size={18} />
                <span>Show all three techniques clearly</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckSquare className="text-green-600 flex-shrink-0 mt-1" size={18} />
                <span>Perform each technique left and right</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckSquare className="text-green-600 flex-shrink-0 mt-1" size={18} />
                <span>No editing required - just practice!</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 border-2 border-yellow-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-yellow-600 p-3 rounded-full">
                <Youtube className="text-white" size={24} />
              </div>
              <h3 className="font-bold text-slate-900 text-lg">YouTube Upload</h3>
            </div>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start space-x-2">
                <CheckSquare className="text-yellow-600 flex-shrink-0 mt-1" size={18} />
                <span>Upload as public or unlisted</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckSquare className="text-yellow-600 flex-shrink-0 mt-1" size={18} />
                <span>Copy the full video URL</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckSquare className="text-yellow-600 flex-shrink-0 mt-1" size={18} />
                <span>Paste it in the submission form above</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 border-2 border-red-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-red-600 p-3 rounded-full">
                <Award className="text-white" size={24} />
              </div>
              <h3 className="font-bold text-slate-900 text-lg">What to Expect</h3>
            </div>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start space-x-2">
                <CheckSquare className="text-red-600 flex-shrink-0 mt-1" size={18} />
                <span>Review within 24-48 hours</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckSquare className="text-red-600 flex-shrink-0 mt-1" size={18} />
                <span>Email confirmation when approved</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckSquare className="text-red-600 flex-shrink-0 mt-1" size={18} />
                <span>Featured in Hall of Fame</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-slate-50 to-slate-100 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              After You Submit
            </h2>
            <p className="text-lg text-slate-600">
              Here's what happens next on your journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <CheckCircle className="text-white" size={40} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 text-center">
                Review Process
              </h3>
              <p className="text-slate-600 leading-relaxed text-left">
                Our team reviews your submission to ensure it meets the challenge requirements. Most videos are approved within 24-48 hours.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="bg-gradient-to-br from-green-500 to-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Trophy className="text-white" size={40} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 text-center">
                Hall of Fame
              </h3>
              <p className="text-slate-600 leading-relaxed text-left">
                Once approved, your dojo is featured in our Hall of Fame alongside hundreds of schools from around the world.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="bg-gradient-to-br from-red-500 to-red-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Award className="text-white" size={40} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 text-center">
                Global Recognition
              </h3>
              <p className="text-slate-600 leading-relaxed text-left">
                Your dojo appears on our interactive global map, connecting you with the worldwide judo community.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="page-section">
        <div className="bg-gradient-to-r from-osp-blue to-osp-navy rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Questions About Submitting?
          </h2>
          <p className="text-xl mb-8 text-osp-white/90 max-w-2xl mx-auto">
            Check out our FAQ page or contact us directly. We're here to help make your submission process smooth and easy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="btn-secondary inline-flex items-center justify-center space-x-2"
            >
              <Upload size={24} />
              <span>Submit Your Video</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
