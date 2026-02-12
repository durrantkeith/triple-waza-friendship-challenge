import { Video, Upload, Award, Camera, Youtube, Users } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      number: '1',
      icon: Camera,
      title: 'Record Your Kata',
      description: 'Gather your dojo and film the first three Nage-no-kata techniques together using any camera or phone.',
      color: 'from-blue-600 to-blue-700',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      hoverBorder: 'hover:border-blue-400'
    },
    {
      number: '2',
      icon: Youtube,
      title: 'Upload to YouTube',
      description: 'Upload your video to YouTube (public or unlisted). Copy the link and submit it through our simple form.',
      color: 'from-red-600 to-red-700',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      hoverBorder: 'hover:border-red-400'
    },
    {
      number: '3',
      icon: Users,
      title: 'Join the Global Community',
      description: 'Get featured in our Hall of Fame and inspire other dojos worldwide to participate in this friendship challenge.',
      color: 'from-green-600 to-green-700',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      hoverBorder: 'hover:border-green-400'
    }
  ];

  return (
    <div id="how-it-works" className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-bold text-sm uppercase tracking-wider mb-4">
            Simple Process
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6">
            How It Works
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Join the global judo community in three easy steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative group"
              >
                <div className={`${step.bgColor} ${step.borderColor} ${step.hoverBorder} border-2 rounded-3xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 h-full`}>
                  {/* Step number badge */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${step.color} text-white text-2xl font-black shadow-xl`}>
                      {step.number}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="flex justify-center mt-8 mb-6">
                    <div className={`bg-gradient-to-br ${step.color} rounded-2xl p-5 shadow-lg`}>
                      <Icon className="w-12 h-12 text-white" strokeWidth={2.5} />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">
                    {step.title}
                  </h3>

                  <p className="text-slate-700 leading-relaxed text-lg">
                    {step.description}
                  </p>
                </div>

                {/* Connector arrow */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 lg:-right-6 transform -translate-y-1/2 z-10">
                    <div className="text-slate-300">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Encouragement section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-2xl p-8 md:p-10 shadow-xl">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <Award className="w-12 h-12 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 mb-3">
                  No Perfect Videos Required!
                </p>
                <p className="text-lg text-slate-700 leading-relaxed">
                  This is about participation and friendship, not perfection. Your students don't need to be flawless. The challenge is about showing up, learning together, and being part of a global judo community!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}