import { CheckCircle, Heart, Trophy, ArrowRight, Home, Video, Clock } from 'lucide-react';

interface VideoSubmissionThankYouPageProps {
  onNavigate: (page: string) => void;
}

export default function VideoSubmissionThankYouPage({ onNavigate }: VideoSubmissionThankYouPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-3xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-12 text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full mb-6 animate-scale-in">
              <CheckCircle className="text-green-600" size={56} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Thank You for Your Submission!
            </h1>
            <p className="text-xl text-green-100">
              Your video has been received successfully
            </p>
          </div>

          <div className="p-8 md:p-12">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center space-x-2 text-slate-700 mb-6">
                <Heart className="text-red-500" size={28} />
                <span className="text-2xl font-semibold">Welcome to the Challenge!</span>
              </div>
              <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
                You're now part of a global movement connecting dojos around the world. Your submission helps preserve and share the art of Judo with practitioners everywhere.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-2xl p-8 mb-8 border border-blue-100">
              <div className="flex items-start space-x-4 mb-6">
                <Clock className="text-osp-blue flex-shrink-0 mt-1" size={32} />
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">What Happens Next?</h3>
                  <p className="text-slate-700 leading-relaxed">
                    Our team will review your submission to ensure it meets the challenge requirements. Most videos are reviewed within 24-48 hours.
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-slate-700">
                <div className="flex items-start">
                  <div className="bg-green-500 rounded-full w-2 h-2 mt-2 mr-3 flex-shrink-0"></div>
                  <p>You'll receive an email confirmation when your video is reviewed</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-500 rounded-full w-2 h-2 mt-2 mr-3 flex-shrink-0"></div>
                  <p>Once approved, your dojo will be featured in our Hall of Fame</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-500 rounded-full w-2 h-2 mt-2 mr-3 flex-shrink-0"></div>
                  <p>Your dojo will appear on our interactive global map</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 mb-8 border border-amber-200">
              <div className="flex items-start space-x-3">
                <Trophy className="text-amber-600 flex-shrink-0 mt-1" size={28} />
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Keep the Momentum Going!</h3>
                  <p className="text-slate-700 leading-relaxed">
                    Challenge other dojos to join you! Invite friends and fellow practitioners to participate in this global celebration of Judo.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <button
                onClick={() => onNavigate('challenge-friend')}
                className="bg-osp-blue hover:bg-osp-navy text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 group"
              >
                <span>Challenge Other Dojos</span>
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </button>

              <button
                onClick={() => onNavigate('hall-of-fame')}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <Trophy size={20} />
                <span>View Hall of Fame</span>
              </button>
            </div>

            <button
              onClick={() => onNavigate('our-concept')}
              className="w-full bg-white hover:bg-slate-50 text-slate-700 font-semibold py-4 px-6 rounded-xl transition-all duration-300 border-2 border-slate-300 flex items-center justify-center space-x-2"
            >
              <Home size={20} />
              <span>Return Home</span>
            </button>

            <div className="text-center pt-6 border-t border-slate-200 mt-6">
              <p className="text-slate-600 mb-3">
                Want to submit another video?
              </p>
              <button
                onClick={() => onNavigate('submit-video')}
                className="text-osp-blue hover:text-osp-navy font-semibold text-lg underline inline-flex items-center space-x-2"
              >
                <Video size={20} />
                <span>Submit Another Video</span>
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-slate-600 text-sm">
            Together, we strengthen Judo for generations to come
          </p>
        </div>
      </div>
    </div>
  );
}
