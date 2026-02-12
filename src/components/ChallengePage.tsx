import { Target, Users, Gift, CheckCircle, Upload, Trophy, Calendar, Clock, Video, BookOpen } from 'lucide-react';
import { DemoVideos } from './DemoVideos';
import { FAQ } from './FAQ';

interface ChallengePageProps {
  onNavigate: (page: string) => void;
}

export default function ChallengePage({ onNavigate }: ChallengePageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Golden Frame Section */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-5xl mx-auto relative">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 via-yellow-300/10 to-transparent rounded-lg blur-xl"></div>
            <div className="relative bg-gradient-to-br from-slate-800/95 via-slate-900/98 to-black/95 backdrop-blur-xl rounded-lg p-1 shadow-[0_0_60px_rgba(251,191,36,0.15),inset_0_1px_1px_rgba(255,255,255,0.1)]">
              <div className="bg-gradient-to-br from-slate-900/98 via-slate-800/95 to-slate-900/98 rounded-lg p-12 md:p-16 border-4 border-double border-amber-400/40 shadow-[inset_0_2px_20px_rgba(0,0,0,0.5)]">
                <div className="text-center mb-8">
                  <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-3 leading-snug font-semibold">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 drop-shadow-[0_2px_8px_rgba(251,191,36,0.3)]">
                      Make a video on your phone of your dojo performing<br />the first 3 techniques of the Nage no Kata as a group.
                    </span>
                  </p>
                  <p className="text-xl md:text-2xl font-bold max-w-3xl mx-auto mb-2 leading-relaxed text-white">
                    Uki-otoshi, Seoi-nage, Kata-guruma
                  </p>
                  <p className="text-base md:text-lg max-w-3xl mx-auto mb-4 leading-snug font-bold">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 drop-shadow-[0_2px_8px_rgba(251,191,36,0.3)]">
                      3 techniques. Left and right & submit your video!
                    </span>
                  </p>
                </div>

                <div className="max-w-3xl mx-auto border-t border-b border-amber-400/20 py-8 mb-8">
                  <p className="text-lg md:text-xl text-white leading-relaxed font-light text-center">
                    This simple challenge strengthens traditional Judo education for all ages and ranks by turning shared learning into fun, achievable goals that build confidence and participation.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
                  <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm rounded-xl p-6 border-2 border-amber-400/30 hover:shadow-lg hover:shadow-amber-400/20 transition-all duration-300 hover:scale-105">
                    <Target className="text-amber-400 mx-auto mb-3" size={28} />
                    <h4 className="font-bold text-xl mb-2 text-center">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300">
                        Achievable
                      </span>
                    </h4>
                    <p className="text-slate-300 text-sm leading-relaxed text-center">Three techniques, two repetitions each - a format designed for success</p>
                  </div>
                  <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm rounded-xl p-6 border-2 border-amber-400/30 hover:shadow-lg hover:shadow-amber-400/20 transition-all duration-300 hover:scale-105">
                    <Users className="text-amber-400 mx-auto mb-3" size={28} />
                    <h4 className="font-bold text-xl mb-2 text-center">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300">
                        Friendship
                      </span>
                    </h4>
                    <p className="text-slate-300 text-sm leading-relaxed text-center">Connect with dojos worldwide and challenge your friends to participate</p>
                  </div>
                  <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm rounded-xl p-6 border-2 border-amber-400/30 hover:shadow-lg hover:shadow-amber-400/20 transition-all duration-300 hover:scale-105">
                    <Gift className="text-amber-400 mx-auto mb-3" size={28} />
                    <h4 className="font-bold text-xl mb-2 text-center">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300">
                        Fun
                      </span>
                    </h4>
                    <p className="text-slate-300 text-sm leading-relaxed text-center">Enjoy the journey of learning and earn recognition for your dedication</p>
                  </div>
                </div>

                <div className="text-center">
                  <button
                    onClick={() => onNavigate('submit-video')}
                    className="bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-900 font-bold text-xl px-12 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
                  >
                    Submit Your Video Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Three simple steps to join the global judo community
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="bg-osp-blue text-white w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4 shadow-lg">
              1
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Record Your Kata
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Practice the first 3 techniques of Nage no Kata with your dojo and record it on your phone
            </p>
          </div>

          <div className="text-center">
            <div className="bg-osp-light-blue text-white w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4 shadow-lg">
              2
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Upload to YouTube
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Make your video public or unlisted on YouTube and copy the link
            </p>
          </div>

          <div className="text-center">
            <div className="bg-osp-red text-white w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4 shadow-lg">
              3
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Submit & Connect
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Share your link through our form and join dojos worldwide
            </p>
          </div>
        </div>
      </div>

      <DemoVideos />

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Challenge Details
            </h2>
            <p className="text-lg text-slate-600">
              Everything you need to know about participating
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Calendar className="text-blue-600" size={24} />
                </div>
                <h3 className="font-bold text-slate-900 text-lg">Event Date</h3>
              </div>
              <p className="text-slate-700 leading-relaxed">
                The official event launches on April 28, 2026. Start practicing now and submit your video when ready.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <Clock className="text-green-600" size={24} />
                </div>
                <h3 className="font-bold text-slate-900 text-lg">Duration</h3>
              </div>
              <p className="text-slate-700 leading-relaxed">
                Your video should show all three techniques performed to the left and right. Typically 3-5 minutes.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <Video className="text-yellow-600" size={24} />
                </div>
                <h3 className="font-bold text-slate-900 text-lg">Video Format</h3>
              </div>
              <p className="text-slate-700 leading-relaxed">
                Upload to YouTube as public or unlisted. Film horizontally for best viewing. No editing required.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-red-100 p-3 rounded-full">
                  <Trophy className="text-red-600" size={24} />
                </div>
                <h3 className="font-bold text-slate-900 text-lg">Recognition</h3>
              </div>
              <p className="text-slate-700 leading-relaxed">
                Your dojo will be featured in the Hall of Fame and on our global map of participating schools.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-osp-blue to-osp-navy rounded-xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-osp-white/90 mb-6 max-w-2xl mx-auto">
              Join hundreds of dojos worldwide in this historic celebration of kata and global friendship.
            </p>
            <button
              onClick={() => onNavigate('submit-video')}
              className="btn-secondary inline-flex items-center space-x-2"
            >
              <Upload size={24} />
              <span>Submit Your Video</span>
            </button>
          </div>
        </div>
      </div>

      <FAQ />

      <div className="page-section">
        <div className="bg-gradient-to-r from-osp-red to-red-700 rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Make Judo History?
          </h2>
          <p className="text-xl mb-8 text-red-100 max-w-2xl mx-auto">
            Your dojo's journey starts with one simple step.<br />Join the global community today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('submit-video')}
              className="btn-secondary inline-flex items-center justify-center space-x-3 text-xl px-12 py-6"
            >
              <Upload size={28} />
              <span>Submit Your Video</span>
            </button>
            <button
              onClick={() => onNavigate('hall-of-fame')}
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-10 py-6 rounded-xl font-bold text-xl transition-all duration-300 border-2 border-white/30 hover:border-white/50 inline-flex items-center justify-center space-x-2 hover:scale-105 transform shadow-lg"
            >
              <Trophy size={28} />
              <span>View Hall of Fame</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
