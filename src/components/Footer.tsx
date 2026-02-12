import { Facebook, Instagram, Youtube, Mail, MapPin, Phone, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { id: 'challenge', label: 'The Challenge' },
    { id: 'our-concept', label: 'Our Concept' },
    { id: 'kata-collections', label: 'Kata Collections' },
    { id: 'hall-of-fame', label: 'Hall of Fame' },
    { id: 'submit-video', label: 'Submit Video' },
    { id: 'education', label: 'How-To Guide' },
    { id: 'challenge-friend', label: 'Challenge a Friend' },
  ];

  const resources = [
    { label: 'Judo Techniques', external: true },
    { label: 'Training Tips', external: true },
    { label: 'Safety Guidelines', external: true },
    { label: 'Kata Standards', external: true },
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Newsletter & CTA Section */}
      <div className="bg-gradient-to-r from-red-600 to-blue-600 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-3xl font-bold text-white mb-3">
                Start Your Triple Waza Tradition
              </h3>
              <p className="text-lg text-white/90">
                Join dojos worldwide in the Triple Waza Challenge
              </p>
            </div>
            <button
              onClick={() => onNavigate('submit-video')}
              className="bg-white text-red-700 hover:bg-slate-100 px-10 py-5 rounded-xl font-bold text-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 whitespace-nowrap focus:outline-none focus:ring-4 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-red-600"
            >
              Submit Your Video
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="/osp-logo-white-150x150.png"
                alt="Odd Squad Productions Logo"
                className="h-16 w-auto"
              />
              <div>
                <h3 className="font-bold text-xl text-white">Triple Waza</h3>
                <p className="text-sm text-slate-400">Friendship Challenge</p>
              </div>
            </div>
            <p className="text-slate-300 text-sm mb-4 leading-relaxed">
              A global community initiative connecting dojos worldwide through the practice and celebration of traditional Judo techniques.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/triplewazachallenge/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-blue-600 p-3 rounded-full transition-all duration-300 hover:scale-125 shadow-lg hover:shadow-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label="Visit our Facebook page"
              >
                <Facebook size={22} />
              </a>
              <a
                href="https://www.instagram.com/triplewazafriendshipchallenge/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-pink-600 p-3 rounded-full transition-all duration-300 hover:scale-125 shadow-lg hover:shadow-pink-500/50 focus:outline-none focus:ring-2 focus:ring-pink-400"
                aria-label="Visit our Instagram page"
              >
                <Instagram size={22} />
              </a>
              <a
                href="https://www.youtube.com/channel/UCKnpdbrekqe0g_TiTkouOOA"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-red-600 p-3 rounded-full transition-all duration-300 hover:scale-125 shadow-lg hover:shadow-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-400"
                aria-label="Visit our YouTube channel"
              >
                <Youtube size={22} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-xl mb-6 text-white border-b-2 border-red-600 pb-3 inline-block">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="text-slate-300 hover:text-red-400 hover:translate-x-1 transition-all duration-200 text-base flex items-center space-x-2 focus:outline-none focus:text-red-400"
                  >
                    <span className="text-lg">›</span>
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xl mb-6 text-white border-b-2 border-blue-600 pb-3 inline-block">
              Resources
            </h4>
            <ul className="space-y-3">
              {resources.map((resource, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-slate-300 hover:text-blue-400 hover:translate-x-1 transition-all duration-200 text-base flex items-center space-x-2 focus:outline-none focus:text-blue-400"
                  >
                    <span className="text-lg">›</span>
                    <span>{resource.label}</span>
                    {resource.external && <ExternalLink size={14} />}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xl mb-6 text-white border-b-2 border-yellow-500 pb-3 inline-block">
              Contact
            </h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 text-base text-slate-300">
                <Mail className="text-red-400 flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-semibold text-white mb-1">Email</p>
                  <a href="mailto:info@triplewaza.org" className="hover:text-red-400 transition-colors duration-200 focus:outline-none focus:text-red-400">
                    info@triplewaza.org
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-base text-slate-300">
                <MapPin className="text-blue-400 flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-semibold text-white mb-1">Location</p>
                  <p>Global Initiative</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-red-600/20 to-blue-600/20 border border-white/10 rounded-xl p-4 mt-6">
                <p className="text-sm text-slate-300 leading-relaxed">
                  <strong className="text-white">Launch Date:</strong>
                  <br />
                  April 28, 2026
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
              <p className="text-sm text-slate-300 leading-relaxed">
                <strong className="text-yellow-400">Unofficial Initiative:</strong> This challenge is not affiliated with, endorsed by, or officially recognized by the International Judo Federation (IJF) or any national judo federation.
              </p>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <p className="text-sm text-slate-300 leading-relaxed">
                <strong className="text-red-400">Practice Safely:</strong> All participants practice at their own risk. Please train under qualified instruction and follow your dojo's safety guidelines.
              </p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-slate-400 text-sm mb-2">
              © {currentYear} Triple Waza Friendship Challenge. All rights reserved.
            </p>
            <p className="text-slate-500 text-xs mb-3">
              A grassroots community initiative to promote friendship, learning, and the preservation of traditional Judo kata.
            </p>
            <button
              onClick={() => onNavigate('admin')}
              className="text-slate-600 hover:text-slate-400 text-xs transition-colors duration-200 focus:outline-none focus:text-slate-400"
              aria-label="Admin access"
            >
              Admin
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
