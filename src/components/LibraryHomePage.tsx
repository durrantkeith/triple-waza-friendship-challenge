import { useState, useEffect } from 'react';
import { Trophy, Globe, BookOpen } from 'lucide-react';

interface LibraryHomePageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export default function LibraryHomePage({ onNavigate }: LibraryHomePageProps) {
  const [bounceOnMount, setBounceOnMount] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBounceOnMount(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-16">

        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="max-w-5xl mx-auto mb-8 relative">
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
                    Submit your video and join the TWFC living global archive, celebrating Judo, friendship and shared practice. Yearly submissions of the same three techniques create a lifetime record of your dojo that can be viewed again and again well into the future.{' '}
                    <button
                      onClick={() => onNavigate('challenge')}
                      className="text-amber-400 hover:text-amber-300 underline underline-offset-4 transition-colors duration-200"
                    >
                      Go to the Challenge!
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <p className="text-xl md:text-2xl font-semibold mb-12 text-yellow-300/90 leading-relaxed tracking-wide">
            Traditional Judo. Smaller steps. Deeper understanding. Attainable goals for all.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <Trophy className="text-amber-400 mx-auto mb-3" size={40} />
              <h3 className="font-bold text-xl mb-2">Recognition</h3>
              <p className="text-slate-300 text-sm">Every dojo's practice is permanently preserved and honored</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <BookOpen className="text-blue-400 mx-auto mb-3" size={40} />
              <h3 className="font-bold text-xl mb-2">Education</h3>
              <p className="text-slate-300 text-sm">Learn from dojos worldwide and improve your understanding</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <Globe className="text-emerald-400 mx-auto mb-3" size={40} />
              <h3 className="font-bold text-xl mb-2">Connection</h3>
              <p className="text-slate-300 text-sm">Join a global community dedicated to kata preservation</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
