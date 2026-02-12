import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'Do I need professional video equipment?',
    answer: 'No! Any smartphone, tablet, or basic camera works perfectly. We want authentic moments, not Hollywood productions. Just make sure the lighting is decent and you can see the students performing the techniques.'
  },
  {
    question: 'What if my students aren\'t perfect at the techniques?',
    answer: 'That\'s completely fine! This movement is about participation, effort, and fun - not perfection. We want to see real students, real dojos, and real judo. Imperfection is part of the journey!'
  },
  {
    question: 'How long should the video be?',
    answer: 'Keep it short and sweet! 1-3 minutes is perfect. Show your students performing the three techniques (O Soto Gari, Tai Otoshi, Ko Uchi Gari). You can show multiple students or just focus on a few - whatever works for your dojo.'
  },
  {
    question: 'What happens after we submit our video?',
    answer: 'You get featured in our Hall of Fame, earn achievement badges, and have the chance to connect with a global judo community. Most importantly, you bring fresh energy and excitement to your classes. Your students bond as a group and will enjoy seeing themselves online as part of something bigger, now and into the future.'
  },
  {
    question: 'Is there a cost to participate?',
    answer: 'Absolutely FREE! This is a grassroots movement to bring the judo community together. No hidden fees, no subscriptions - just pure judo fun.'
  },
  {
    question: 'Can beginners participate?',
    answer: 'YES! All skill levels are welcome. Whether your students are learning breakfalls or competing internationally, they can participate. This is about showing up, not showing off.'
  },
  {
    question: 'Do we get points towards a promotion for doing this?',
    answer: 'Absolutely not! This is about doing something fun, with your entire dojo as a group.'
  },
  {
    question: 'How often can we submit videos?',
    answer: 'We ask that you submit video as often as you like. Submit a junior class demo, a senior class demo and a demo with everyone. Once vetted, your video will go into our TWFC archive Hall of Fame.'
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggleQuestion(index: number) {
    setOpenIndex(openIndex === index ? null : index);
  }

  return (
    <div className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mb-6 shadow-lg">
            <HelpCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Got questions? We've got answers!
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-200"
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
                aria-expanded={openIndex === index}
              >
                <span className="font-bold text-lg text-gray-900 pr-4">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="w-6 h-6 text-red-600 flex-shrink-0 transition-transform duration-200" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-400 flex-shrink-0 transition-transform duration-200" />
                )}
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6">
                  <p className="text-gray-700 leading-relaxed text-base">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-10 border-2 border-green-200 shadow-xl hover:shadow-2xl transition-all duration-300">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Still Have Questions?
          </h3>
          <p className="text-gray-700 text-lg leading-relaxed">
            No experience is required.
            <br />
            We only ask that everyone participate.
            <br />
            This is about having some fun.
            <br /><br />
            Submit your video and let this shared exercise become a lasting tradition in your dojo. We encourage you to update every six months, build a dojo video history, introduce other dojos and be part of the Triple Waza global Judo community.
          </p>
        </div>
      </div>
    </div>
  );
}