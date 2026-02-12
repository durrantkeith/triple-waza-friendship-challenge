import { useState, useEffect } from 'react';
import { Calendar, Globe, Heart, Award, Users, Lightbulb, Target, TrendingUp, CheckCircle, BookOpen, ArrowRight, Upload, Trophy, Clock, MapPin, Video, Settings } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { ParticipationStats } from './ParticipationStats';
import { HowItWorks } from './HowItWorks';
import { RecentActivity } from './RecentActivity';
import { Testimonials } from './Testimonials';
import { GlobalMap } from './GlobalMap';
import { NewsletterSignup } from './NewsletterSignup';
import { FAQ } from './FAQ';
import { FoundersShowcase } from './FoundersShowcase';
import { DemoVideos } from './DemoVideos';
import { GlobalParticipation } from './GlobalParticipation';
import { SocialShare } from './SocialShare';
import { EventTimeline } from './EventTimeline';
import HeroAnimation from './HeroAnimation';
import FeaturedContent from './FeaturedContent';
import UpcomingEvents from './UpcomingEvents';
import VideoExamples from './VideoExamples';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const [dojoCount, setDojoCount] = useState<number>(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const fetchDojoCount = async () => {
      const { data, error } = await supabase
        .from('dojos')
        .select('id', { count: 'exact', head: true });

      if (!error && data !== null) {
        setDojoCount(data);
      }
    };

    const checkAdminStatus = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setIsAdmin(!!user);
    };

    fetchDojoCount();
    checkAdminStatus();
  }, []);

  useEffect(() => {
    const eventDate = new Date('2026-04-28T00:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = eventDate - now;

      if (distance > 0) {
        setTimeRemaining({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const sections = [
    { id: 'hero', label: 'Start' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'video-examples', label: 'Examples' },
    { id: 'why-matters', label: 'Why' },
    { id: 'countdown', label: 'Event' },
    { id: 'stats', label: 'Stats' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'demo-videos', label: 'Demo Videos' },
    { id: 'core-values', label: 'Core Values' },
    { id: 'featured', label: 'Featured' },
    { id: 'global', label: 'Global' },
    { id: 'map', label: 'Map' },
    { id: 'activity', label: 'Activity' },
    { id: 'founders', label: 'Founders' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'kata-browse', label: 'Kata' },
    { id: 'faq', label: 'FAQ' },
    { id: 'social', label: 'Social' },
    { id: 'newsletter', label: 'Newsletter' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Section Navigation Sidebar */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
        <div className="bg-white/90 backdrop-blur-sm rounded-full shadow-lg border-2 border-slate-200 py-3 px-2">
          {sections.map((section) => (
            <div key={section.id} className="relative group">
              <button
                onClick={() => scrollToSection(section.id)}
                className="block w-3 h-3 my-2 mx-auto rounded-full bg-slate-400 hover:bg-blue-600 hover:scale-150 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label={`Go to ${section.label} section`}
              />
              <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-slate-900 text-white px-3 py-1 rounded-md text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                {section.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div id="hero" className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 min-h-[85vh] flex items-center overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-16 relative z-10 w-full">
          <div className="text-center mb-12">
            <div className="mb-8">
              <div className="inline-block bg-yellow-400 text-red-900 px-8 py-3 rounded-full font-bold text-base uppercase tracking-wider mb-8 shadow-xl animate-bounce">
                Join {dojoCount}+ Dojos Worldwide
              </div>
            </div>

            {/* Primary and Secondary CTAs */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-10">
              <button
                onClick={() => onNavigate('submit-video')}
                className="group relative bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-black text-xl md:text-2xl px-12 py-6 rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 inline-flex items-center justify-center space-x-3 focus:outline-none focus:ring-4 focus:ring-red-300 focus:ring-offset-2"
              >
                <Upload size={32} />
                <span>Join the Challenge</span>
                <div className="absolute -top-2 -right-2 bg-yellow-400 text-red-900 text-xs font-bold px-3 py-1 rounded-full">
                  FREE
                </div>
              </button>
              <button
                onClick={() => scrollToSection('demo-videos')}
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-bold text-xl md:text-2xl px-12 py-6 rounded-2xl transition-all duration-300 border-2 border-white/30 hover:border-white/50 inline-flex items-center justify-center space-x-2 focus:outline-none focus:ring-4 focus:ring-white/30 focus:ring-offset-2"
              >
                <Video size={28} />
                <span>Watch Examples</span>
              </button>
            </div>

            {/* Micro-copy under CTAs */}
            <p className="text-base md:text-lg text-blue-100 mb-12 font-medium">
              Takes 5 minutes • No cost • All levels welcome • Be among the first 100 dojos
            </p>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/30 text-center hover:bg-white/20 hover:scale-105 transition-all duration-300">
              <div className="text-5xl font-black text-yellow-400 mb-3">{dojoCount}+</div>
              <div className="text-white font-semibold text-lg">Dojos Joined</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/30 text-center hover:bg-white/20 hover:scale-105 transition-all duration-300">
              <div className="text-5xl font-black text-yellow-400 mb-3">100%</div>
              <div className="text-white font-semibold text-lg">Free Forever</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/30 text-center hover:bg-white/20 hover:scale-105 transition-all duration-300">
              <div className="text-5xl font-black text-yellow-400 mb-3">3</div>
              <div className="text-white font-semibold text-lg">Techniques to Master</div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Message Frame */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-5xl mx-auto relative">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 via-yellow-300/10 to-transparent rounded-lg blur-xl"></div>
            <div className="relative bg-gradient-to-br from-slate-800/95 via-slate-900/98 to-black/95 backdrop-blur-xl rounded-lg p-1 shadow-[0_0_60px_rgba(251,191,36,0.15),inset_0_1px_1px_rgba(255,255,255,0.1)]">
              <div className="bg-gradient-to-br from-slate-900/98 via-slate-800/95 to-slate-900/98 rounded-lg p-12 md:p-16 border-4 border-double border-amber-400/40 shadow-[inset_0_2px_20px_rgba(0,0,0,0.5)]">
                <h3 className="text-3xl md:text-4xl font-semibold mb-10 text-center tracking-normal">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 drop-shadow-[0_2px_8px_rgba(251,191,36,0.3)]">
                    Welcome to the<br />Triple Waza Friendship Challenge!
                  </span>
                </h3>
                <div className="max-w-3xl mx-auto space-y-6 border-t border-b border-amber-400/20 py-8">
                  <p className="text-lg md:text-xl leading-relaxed font-light text-left">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 drop-shadow-[0_2px_8px_rgba(251,191,36,0.3)] font-semibold">
                      The goal is to have fun together as a dojo.
                    </span>
                    <br /><br />
                    <span className="text-white">
                      We ask that you practice, learn from one another, and submit a video of your performance. * This exercise is never judged beyond participation. Do it well or not so well, but do it together while learning and refining traditional techniques.
                    </span>
                  </p>
                  <p className="text-lg md:text-xl text-white leading-relaxed font-light text-left">
                    Submit your video and join the TWFC living global archive, celebrating Judo, friendship and shared practice. Yearly submissions of the same three techniques create a lifetime record of your dojo that can be viewed again and again well into the future.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="how-it-works" className="min-h-screen flex items-center">
        <div className="w-full">
          <HowItWorks />
        </div>
      </div>

      <div id="video-examples" className="min-h-screen flex items-center">
        <div className="w-full">
          <VideoExamples onNavigate={onNavigate} />
        </div>
      </div>

      <div id="why-matters" className="min-h-screen flex items-center py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4 w-full">
        <div className="bg-white rounded-3xl p-10 md:p-16 shadow-2xl border-2 border-gray-100">
          <div className="flex items-center justify-center space-x-4 mb-10">
            <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 p-4 rounded-full shadow-lg">
              <Lightbulb className="text-white" size={48} />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 text-center">
              Why This Matters
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-blue-200">
              <div className="flex flex-col items-center mb-4">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-full mb-4 shadow-lg">
                  <Target className="text-white" size={32} />
                </div>
                <h3 className="font-bold text-xl text-slate-900">Small Steps</h3>
              </div>
              <p className="text-slate-700 text-base leading-relaxed text-center">
                We retain knowledge better when learned in small, purposeful steps. Three techniques at a time makes kata accessible to everyone.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-green-200">
              <div className="flex flex-col items-center mb-4">
                <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-full mb-4 shadow-lg">
                  <Users className="text-white" size={32} />
                </div>
                <h3 className="font-bold text-xl text-slate-900">Together</h3>
              </div>
              <p className="text-slate-700 text-base leading-relaxed text-center">
                It's not about being the best—it's about achieving something together as a dojo. Everyone improves in their own way.
              </p>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-amber-200">
              <div className="flex flex-col items-center mb-4">
                <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-4 rounded-full mb-4 shadow-lg">
                  <TrendingUp className="text-white" size={32} />
                </div>
                <h3 className="font-bold text-xl text-slate-900">Global Growth</h3>
              </div>
              <p className="text-slate-700 text-base leading-relaxed text-center">
                Let's improve and sustain traditional Judo education worldwide together!
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-10 md:p-12 text-white text-center shadow-2xl hover:shadow-3xl transition-all duration-300">
            <div className="mb-8">
              <p className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontStyle: 'italic', textShadow: '0 0 20px rgba(255, 215, 0, 0.5), 0 0 30px rgba(255, 215, 0, 0.3)' }}>
                Stand up together for kata
              </p>
              <p className="text-lg md:text-xl text-blue-100 mb-4 leading-relaxed max-w-3xl mx-auto">
                To honor the effort of participating dojos, each submission will be preserved in a shared living record so this work is not lost.
              </p>
              <p className="text-base md:text-lg text-amber-300 font-semibold mb-8">
                First practice cycle: Uki Otoshi • Seoi Nage • Kata Guruma
              </p>
              <button
                onClick={() => onNavigate('submit-video')}
                className="bg-white text-blue-700 hover:bg-blue-50 font-bold text-xl px-12 py-5 rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 inline-flex items-center space-x-3 focus:outline-none focus:ring-4 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-blue-600"
              >
                <Upload size={28} />
                <span>Submit Your Video</span>
              </button>
            </div>
          </div>
        </div>
        </div>
      </div>

      <div id="countdown" className="relative min-h-screen bg-gradient-to-br from-osp-dark via-osp-navy to-osp-dark text-white flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-osp-blue/30 to-osp-navy/30"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-red-600 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-blue-600 to-transparent"></div>
        </div>
        <HeroAnimation />

        <div className="max-w-7xl mx-auto px-4 py-8 text-center relative z-10">
          <div className="bg-yellow-400 text-red-900 inline-block px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wider mb-4 shadow-xl animate-bounce">
            Official Event Launch • April 28, 2026
          </div>

          <p className="text-xl md:text-2xl text-white font-semibold mb-6 drop-shadow-lg">
            The Inaugural Global Judo Practice Event
          </p>

          <div className="bg-white/95 backdrop-blur-sm text-slate-900 rounded-3xl p-6 md:p-8 max-w-5xl mx-auto mb-8 shadow-2xl border-4 border-yellow-400">
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-black text-red-700 mb-3 flex items-center justify-center gap-3">
                <Clock size={32} className="text-blue-600" />
                Event Starts In
              </h2>
              <div className="grid grid-cols-4 gap-2 md:gap-4 max-w-3xl mx-auto">
                <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl p-3 md:p-4 shadow-xl">
                  <div className="text-3xl md:text-4xl font-black text-white mb-1">{timeRemaining.days}</div>
                  <div className="text-xs font-bold text-red-100 uppercase tracking-wider">Days</div>
                </div>
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-3 md:p-4 shadow-xl">
                  <div className="text-3xl md:text-4xl font-black text-white mb-1">{timeRemaining.hours}</div>
                  <div className="text-xs font-bold text-blue-100 uppercase tracking-wider">Hours</div>
                </div>
                <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl p-3 md:p-4 shadow-xl">
                  <div className="text-3xl md:text-4xl font-black text-white mb-1">{timeRemaining.minutes}</div>
                  <div className="text-xs font-bold text-yellow-100 uppercase tracking-wider">Minutes</div>
                </div>
                <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-3 md:p-4 shadow-xl">
                  <div className="text-3xl md:text-4xl font-black text-white mb-1">{timeRemaining.seconds}</div>
                  <div className="text-xs font-bold text-green-100 uppercase tracking-wider">Seconds</div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-slate-50 rounded-xl p-4 border-2 border-slate-200">
                <Calendar className="text-red-600 mx-auto mb-2" size={32} />
                <h3 className="font-black text-base mb-1 text-slate-900">Event Date</h3>
                <p className="text-slate-700 text-sm font-semibold">April 28, 2026</p>
                <p className="text-xs text-slate-600">Practice cycle begins</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 border-2 border-slate-200">
                <MapPin className="text-blue-600 mx-auto mb-2" size={32} />
                <h3 className="font-black text-base mb-1 text-slate-900">Location</h3>
                <p className="text-slate-700 text-sm font-semibold">Worldwide Virtual</p>
                <p className="text-xs text-slate-600">Your dojo, anywhere</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 border-2 border-slate-200">
                <Video className="text-green-600 mx-auto mb-2" size={32} />
                <h3 className="font-black text-base mb-1 text-slate-900">Format</h3>
                <p className="text-slate-700 text-sm font-semibold">Video Submission</p>
                <p className="text-xs text-slate-600">Film and share</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-4 mb-4 border-2 border-yellow-300">
              <h3 className="text-xl font-black text-red-700 mb-2">First Practice Cycle</h3>
              <p className="text-base font-bold text-slate-800 mb-2">Nage no Kata - First Three Techniques</p>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="bg-white px-3 py-1 rounded-full text-sm font-semibold text-slate-800 shadow-md">Uki Otoshi</span>
                <span className="bg-white px-3 py-1 rounded-full text-sm font-semibold text-slate-800 shadow-md">Seoi Nage</span>
                <span className="bg-white px-3 py-1 rounded-full text-sm font-semibold text-slate-800 shadow-md">Kata Guruma</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => onNavigate('submit-video')}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-black text-base md:text-lg px-8 py-4 rounded-xl transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 inline-flex items-center justify-center space-x-2 focus:outline-none focus:ring-4 focus:ring-red-300 focus:ring-offset-2"
              >
                <Upload size={24} />
                <span>Submit Your Video</span>
              </button>
              <button
                onClick={() => onNavigate('hall-of-fame')}
                className="bg-white hover:bg-slate-50 text-slate-900 font-bold text-base md:text-lg px-8 py-4 rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 inline-flex items-center justify-center space-x-2 border-2 border-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-offset-2"
              >
                <Trophy size={24} />
                <span>View {dojoCount} Dojos</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-5xl mx-auto mb-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border-2 border-white/30 hover:bg-white/20 transition-all duration-300">
              <Heart className="text-yellow-400 mx-auto mb-2" size={28} />
              <h3 className="font-bold text-white text-base mb-1">100% Free</h3>
              <p className="text-slate-200 text-xs">No fees, no costs. Community-driven friendship event.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border-2 border-white/30 hover:bg-white/20 transition-all duration-300">
              <Globe className="text-blue-400 mx-auto mb-2" size={28} />
              <h3 className="font-bold text-white text-base mb-1">Global Connection</h3>
              <p className="text-slate-200 text-xs">Connect your dojo to the worldwide judo community.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border-2 border-white/30 hover:bg-white/20 transition-all duration-300">
              <Users className="text-green-400 mx-auto mb-2" size={28} />
              <h3 className="font-bold text-white text-base mb-1">Everyone Welcome</h3>
              <p className="text-slate-200 text-xs">All ages, all ranks. Practice together as one dojo.</p>
            </div>
          </div>

          <div className="max-w-3xl mx-auto bg-blue-900/40 backdrop-blur-sm border-2 border-blue-400/50 rounded-xl p-4">
            <p className="text-yellow-300 font-bold text-base mb-1 flex items-center justify-center gap-2">
              <Award size={20} />
              Unofficial Community Initiative
            </p>
            <p className="text-blue-100 text-xs">
              Strengthening Judo education through<br />
              fun, friendship, and achievable goals for everyone.
            </p>
          </div>
        </div>
      </div>

      <div id="stats" className="min-h-screen flex items-center">
        <div className="w-full">
          <ParticipationStats />
        </div>
      </div>

      <div id="testimonials" className="min-h-screen flex items-center">
        <div className="w-full">
          <Testimonials />
        </div>
      </div>

      <div id="demo-videos" className="min-h-screen flex items-center">
        <div className="w-full">
          <DemoVideos />
        </div>
      </div>

      <div id="core-values" className="min-h-screen flex items-center py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 w-full">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 text-center">
            Our Core Values
          </h2>
          <p className="text-xl text-slate-600 mb-16 text-center max-w-3xl mx-auto leading-relaxed">
            Three principles that make this challenge special
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-10 shadow-xl border-2 border-blue-200 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transition-all duration-300">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                <Heart className="text-white" size={48} />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-6 text-center">
                Friendship First
              </h3>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="text-blue-600 flex-shrink-0 mt-1" size={22} />
                  <span className="text-base">No winners or losers</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="text-blue-600 flex-shrink-0 mt-1" size={22} />
                  <span className="text-base">No judges or competition</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="text-blue-600 flex-shrink-0 mt-1" size={22} />
                  <span className="text-base">Only global connection</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-10 shadow-xl border-2 border-green-200 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transition-all duration-300">
              <div className="bg-gradient-to-br from-green-500 to-green-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                <Users className="text-white" size={48} />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-6 text-center">
                Everyone Participates
              </h3>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={22} />
                  <span className="text-base">All ages welcome</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={22} />
                  <span className="text-base">All ranks included</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={22} />
                  <span className="text-base">Achieve goals together</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-10 shadow-xl border-2 border-amber-200 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transition-all duration-300">
              <div className="bg-gradient-to-br from-amber-500 to-amber-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                <Target className="text-white" size={48} />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-6 text-center">
                Five Levels
              </h3>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="text-amber-600 flex-shrink-0 mt-1" size={22} />
                  <span className="text-base">3 techniques at a time</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="text-amber-600 flex-shrink-0 mt-1" size={22} />
                  <span className="text-base">Fun and achievable</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="text-amber-600 flex-shrink-0 mt-1" size={22} />
                  <span className="text-base">No pressure to perform</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        </div>
      </div>

      <div id="featured" className="min-h-screen flex items-center">
        <div className="w-full">
          <FeaturedContent />
        </div>
      </div>

      <div id="global" className="min-h-screen flex items-center">
        <div className="w-full">
          <GlobalParticipation />
        </div>
      </div>

      <div id="map" className="min-h-screen flex items-center">
        <div className="w-full">
          <GlobalMap />
        </div>
      </div>

      <div id="activity" className="min-h-screen flex items-center">
        <div className="w-full">
          <RecentActivity />
        </div>
      </div>

      <div id="founders" className="min-h-screen flex items-center">
        <div className="w-full">
          <FoundersShowcase onNavigate={onNavigate} />
        </div>
      </div>

      <div id="timeline" className="min-h-screen flex items-center">
        <div className="w-full">
          <EventTimeline />
        </div>
      </div>

      <div id="upcoming" className="min-h-screen flex items-center">
        <div className="w-full">
          <UpcomingEvents />
        </div>
      </div>

      <div id="kata-browse" className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center">
        <div className="max-w-7xl mx-auto px-4 py-8 w-full">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Browse by Kata
            </h2>
            <p className="text-xl text-slate-600">
              Explore the traditional forms of Judo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-slate-200 hover:border-red-400 hover:scale-105">
              <div className="mb-6">
                <div className="bg-gradient-to-br from-red-600 to-red-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <BookOpen className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 text-center mb-2">
                  Nage no Kata
                </h3>
                <p className="text-center text-sm text-red-600 font-semibold mb-4">
                  Forms of Throwing
                </p>
              </div>
              <p className="text-slate-700 leading-relaxed mb-6">
                The forms of throwing. Nage-no-kata consists of 15 techniques divided into three sets of five techniques each. This kata demonstrates the fundamental throwing techniques of judo and their principles.
              </p>
              <button
                onClick={() => onNavigate('kata-library')}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 inline-flex items-center justify-center space-x-2 focus:outline-none focus:ring-4 focus:ring-red-300 focus:ring-offset-2"
              >
                <span>Learn More</span>
                <ArrowRight size={20} />
              </button>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-slate-200 hover:border-blue-400 hover:scale-105 opacity-60">
              <div className="mb-6">
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <BookOpen className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 text-center mb-2">
                  Katame no Kata
                </h3>
                <p className="text-center text-sm text-blue-600 font-semibold mb-4">
                  Forms of Grappling
                </p>
              </div>
              <p className="text-slate-700 leading-relaxed mb-6">
                The forms of grappling. Katame-no-kata consists of 15 techniques demonstrating the principles of holds, strangles, and joint locks in groundwork.
              </p>
              <button
                disabled
                className="w-full bg-slate-300 text-slate-500 font-bold py-3 px-6 rounded-xl cursor-not-allowed inline-flex items-center justify-center space-x-2"
              >
                <span>Coming Soon</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-slate-200 hover:border-green-400 hover:scale-105 opacity-60">
              <div className="mb-6">
                <div className="bg-gradient-to-br from-green-600 to-green-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <BookOpen className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 text-center mb-2">
                  Kime no Kata
                </h3>
                <p className="text-center text-sm text-green-600 font-semibold mb-4">
                  Forms of Decision
                </p>
              </div>
              <p className="text-slate-700 leading-relaxed mb-6">
                The forms of decision. Kime-no-kata consists of 20 techniques demonstrating defense and counterattack in both kneeling and standing positions.
              </p>
              <button
                disabled
                className="w-full bg-slate-300 text-slate-500 font-bold py-3 px-6 rounded-xl cursor-not-allowed inline-flex items-center justify-center space-x-2"
              >
                <span>Coming Soon</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div id="faq" className="min-h-screen flex items-center">
        <div className="w-full">
          <FAQ />
        </div>
      </div>

      <div id="social" className="min-h-screen flex items-center">
        <div className="w-full">
          <SocialShare />
        </div>
      </div>

      <div id="newsletter" className="min-h-screen flex items-center">
        <div className="w-full">
          <NewsletterSignup />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Join?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Be part of a worldwide community initiative to preserve and promote traditional judo education
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={() => onNavigate('submit-video')}
              className="bg-red-600 hover:bg-red-700 text-white px-12 py-6 rounded-xl font-bold text-xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 inline-flex items-center justify-center space-x-2 focus:outline-none focus:ring-4 focus:ring-red-300 focus:ring-offset-2"
            >
              <Upload size={24} />
              <span>Submit Your Video</span>
            </button>
            <button
              onClick={() => onNavigate('hall-of-fame')}
              className="bg-white text-blue-700 px-10 py-5 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-offset-2"
            >
              View Hall of Fame
            </button>
          </div>
        </div>

        <div className="mt-16 bg-slate-100 border-2 border-slate-300 rounded-xl p-8">
          <h3 className="text-xl font-bold text-slate-900 mb-4 text-center">Important Notice</h3>
          <div className="max-w-3xl mx-auto space-y-3 text-slate-700 text-sm leading-relaxed">
            <p>
              <strong>This is an unofficial, grassroots, community-driven initiative.</strong> The Triple Waza Friendship Challenge is not affiliated with, endorsed by, or officially recognized by the International Judo Federation (IJF), any national judo federation, or any official judo governing body.
            </p>
            <p>
              This challenge is organized by Judo practitioners who wish to promote friendship, learning, and the preservation of traditional kata through a fun, accessible, and non-competitive community activity. Participation is completely voluntary and free.
            </p>
            <p>
              All participants practice at their own risk. Please ensure you train under qualified instruction and follow your dojo's safety guidelines. This initiative does not replace formal instruction, rank certification, or official kata examination requirements established by recognized judo organizations.
            </p>
          </div>
        </div>

        {isAdmin && (
          <div className="mt-8 text-center">
            <button
              onClick={() => onNavigate('admin')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg transition-all duration-200 text-sm font-medium"
            >
              <Settings size={18} />
              <span>Admin Dashboard</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}