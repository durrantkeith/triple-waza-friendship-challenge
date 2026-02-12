import { Play, Users, Trophy, GraduationCap } from 'lucide-react';

interface VideoExamplesProps {
  onNavigate: (page: string) => void;
}

export default function VideoExamples({ onNavigate }: VideoExamplesProps) {
  const examples = [
    {
      title: "Beginner Dojo Example",
      description: "Perfect form for dojos just starting their kata journey",
      icon: <GraduationCap className="text-blue-600" size={32} />,
      embedId: "dQw4w9WgXcQ",
      level: "Beginner Friendly",
      color: "blue"
    },
    {
      title: "Youth Group Example",
      description: "Young judoka demonstrating the three techniques together",
      icon: <Users className="text-green-600" size={32} />,
      embedId: "dQw4w9WgXcQ",
      level: "Youth Focus",
      color: "green"
    },
    {
      title: "Advanced Club Example",
      description: "Experienced practitioners showing refined technique",
      icon: <Trophy className="text-yellow-600" size={32} />,
      embedId: "dQw4w9WgXcQ",
      level: "Advanced",
      color: "yellow"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-slate-50 to-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-bold text-sm uppercase tracking-wider mb-4">
            See It In Action
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Watch Example Submissions
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            You can do this too! See how dojos of all levels participate in the Triple Waza Challenge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {examples.map((example, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-slate-200 hover:border-blue-400 hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Video Thumbnail */}
              <div className="relative aspect-video bg-slate-900 overflow-hidden">
                <img
                  src={`https://img.youtube.com/vi/${example.embedId}/maxresdefault.jpg`}
                  alt={example.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 group-hover:scale-110 transition-transform duration-300">
                    <Play className="text-blue-600" size={40} fill="currentColor" />
                  </div>
                </div>
                <div className={`absolute top-4 right-4 bg-${example.color}-600 text-white px-3 py-1 rounded-full text-xs font-bold`}>
                  {example.level}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-3">
                  {example.icon}
                  <h3 className="text-xl font-bold text-slate-900">
                    {example.title}
                  </h3>
                </div>
                <p className="text-slate-600 leading-relaxed mb-4">
                  {example.description}
                </p>
                <button
                  onClick={() => window.open(`https://www.youtube.com/watch?v=${example.embedId}`, '_blank')}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 inline-flex items-center justify-center space-x-2"
                >
                  <Play size={20} />
                  <span>Watch Video</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 md:p-12 text-white text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Submit Your Dojo's Video?
          </h3>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Join dojos worldwide in this friendly, non-competitive challenge. No judgment, just friendship!
          </p>
          <button
            onClick={() => onNavigate('submit-video')}
            className="bg-white text-blue-700 hover:bg-blue-50 px-12 py-5 rounded-xl font-bold text-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 inline-flex items-center justify-center space-x-2"
          >
            <Play size={24} />
            <span>Submit Your Video</span>
          </button>
        </div>
      </div>
    </div>
  );
}
