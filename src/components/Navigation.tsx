import { Menu, X, ChevronDown, Search, Trophy, Users, UserPlus, Settings, BookOpen } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  dropdown?: Array<{ id: string; label: string; description?: string }>;
}

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setIsAdmin(!!user);
  };

  const navItems: NavItem[] = [
    {
      id: 'our-concept',
      label: 'Welcome',
      icon: <Trophy size={16} />,
      dropdown: [
        { id: 'challenge', label: 'The Challenge', description: 'Join the global challenge' },
        { id: 'founding-sensei', label: 'TWFC Ambassadors', description: 'TWFC Ambassadors' },
      ],
    },
    { id: 'challenge-friend', label: 'Challenge other Dojos!', icon: <UserPlus size={16} /> },
    {
      id: 'education',
      label: 'Education',
      icon: <BookOpen size={16} />,
      dropdown: [
        { id: 'judo-techniques', label: 'Judo Techniques', description: 'Master fundamental techniques' },
        { id: 'training-tips', label: 'Training Tips', description: 'Expert guidance and methods' },
        { id: 'safety-guidelines', label: 'Safety Guidelines', description: 'Essential safety practices' },
      ],
    },
    {
      id: 'hall-of-fame',
      label: 'Hall of Fame',
      dropdown: [
        { id: 'hall-of-fame', label: 'Hall of Fame', description: 'View achievements' },
        { id: 'kata-collections', label: 'Triple Waza Levels', description: 'Explore the levels' },
      ],
    },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <nav className="bg-osp-dark text-white shadow-lg sticky top-0 z-50 backdrop-blur-sm border-b border-osp-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button
            onClick={() => handleNavClick('our-concept')}
            className="flex items-center space-x-3 hover:opacity-80 transition-all duration-200 group"
            aria-label="Triple Waza Challenge - Go to main page"
          >
            <img
              src="/osp-logo-white-150x150.png"
              alt="Odd Squad Productions Logo"
              className="h-10 w-auto group-hover:scale-105 transition-transform duration-200"
            />
            <div className="flex flex-col">
              <span className="font-bold text-lg text-osp-white">Triple Waza Challenge</span>
              <span className="text-xs text-osp-gray">Global Judo Initiative</span>
            </div>
          </button>

          <div className="hidden md:flex items-center space-x-1">
            {isAdmin && (
              <button
                onClick={() => handleNavClick('admin')}
                className={`px-3 py-2 rounded-md transition-all duration-200 font-medium flex items-center space-x-1 ${
                  currentPage === 'admin'
                    ? 'bg-osp-navy text-osp-white'
                    : 'text-osp-gray hover:bg-osp-navy hover:text-osp-white'
                }`}
                title="Admin Dashboard"
              >
                <Settings size={16} />
              </button>
            )}
            {navItems.map((item) => (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.id)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.dropdown ? (
                  <>
                    <button
                      onClick={() => handleNavClick(item.id)}
                      className={`px-4 py-2 rounded-md transition-all duration-200 font-medium flex items-center space-x-1 ${
                        activeDropdown === item.id || (item.dropdown.some(d => d.id === currentPage))
                          ? 'bg-osp-navy text-osp-white'
                          : 'text-osp-gray hover:bg-osp-navy hover:text-osp-white'
                      }`}
                    >
                      {item.icon && <span>{item.icon}</span>}
                      <span>{item.label}</span>
                      <ChevronDown size={16} className={`transition-transform duration-200 ${activeDropdown === item.id ? 'rotate-180' : ''}`} />
                    </button>
                    {activeDropdown === item.id && (
                      <div className="absolute top-full left-0 pt-2 w-64">
                        <div className="bg-osp-navy rounded-lg shadow-xl overflow-hidden border border-osp-blue animate-fade-in-up">
                          {item.dropdown.map((dropdownItem) => (
                            <button
                              key={dropdownItem.id}
                              onClick={() => handleNavClick(dropdownItem.id)}
                              className={`block w-full text-left px-4 py-3 transition-colors duration-200 ${
                                currentPage === dropdownItem.id
                                  ? 'bg-osp-blue border-l-4 border-osp-light-blue'
                                  : 'hover:bg-osp-blue'
                              }`}
                            >
                              <div className="font-semibold text-osp-white">{dropdownItem.label}</div>
                              {dropdownItem.description && (
                                <div className="text-sm text-osp-gray mt-1">{dropdownItem.description}</div>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={`px-4 py-2 rounded-md transition-all duration-200 font-medium flex items-center space-x-1 ${
                      currentPage === item.id
                        ? 'bg-osp-navy text-osp-white'
                        : 'text-osp-gray hover:bg-osp-navy hover:text-osp-white'
                    } ${item.id === 'challenge' ? 'drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]' : ''}`}
                  >
                    {item.icon && <span>{item.icon}</span>}
                    <span className={item.id === 'challenge' ? 'text-amber-300' : ''}>
                      {item.label.split('\n').map((line, i) => (
                        <span key={i}>
                          {line}
                          {i < item.label.split('\n').length - 1 && <br />}
                        </span>
                      ))}
                    </span>
                  </button>
                )}
              </div>
            ))}
            {/* Submit Video CTA Button */}
            <button
              onClick={() => handleNavClick('submit-video')}
              className="ml-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold px-6 py-2 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Submit Video
            </button>
          </div>

          <button
            className="md:hidden hover:bg-osp-navy p-2 rounded-md transition-colors duration-200 text-osp-gray hover:text-osp-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {searchOpen && (
          <div className="hidden md:block pb-4 animate-fade-in-up">
            <div className="relative">
              <input
                type="text"
                placeholder="Search dojos, videos, or content..."
                className="w-full px-4 py-2 pl-10 rounded-md bg-osp-navy border border-osp-blue text-osp-white placeholder-osp-gray focus:outline-none focus:border-osp-light-blue transition-colors duration-200"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-osp-gray" size={18} />
            </div>
          </div>
        )}

        {mobileMenuOpen && (
          <div className="md:hidden pb-4 animate-fade-in-up">
            {navItems.map((item) => (
              <div key={item.id}>
                {item.dropdown ? (
                  <>
                    <button
                      onClick={() => {
                        if (activeDropdown === item.id) {
                          setActiveDropdown(null);
                        } else {
                          setActiveDropdown(item.id);
                        }
                        handleNavClick(item.id);
                      }}
                      className="flex items-center justify-between w-full text-left py-3 px-4 my-1 rounded-md transition-all duration-200 font-medium text-osp-gray hover:bg-osp-navy hover:text-osp-white min-h-[44px]"
                      aria-expanded={activeDropdown === item.id}
                    >
                      <span className="flex items-center space-x-2">
                        {item.icon && <span>{item.icon}</span>}
                        <span>{item.label}</span>
                      </span>
                      <ChevronDown size={16} className={`transition-transform duration-200 ${activeDropdown === item.id ? 'rotate-180' : ''}`} />
                    </button>
                    {activeDropdown === item.id && (
                      <div className="ml-4 space-y-1 animate-fade-in-up">
                        {item.dropdown.map((dropdownItem) => (
                          <button
                            key={dropdownItem.id}
                            onClick={() => handleNavClick(dropdownItem.id)}
                            className={`block w-full text-left py-3 px-4 rounded-md transition-all duration-200 min-h-[44px] ${
                              currentPage === dropdownItem.id
                                ? 'bg-osp-navy text-osp-white'
                                : 'text-osp-gray hover:bg-osp-navy hover:text-osp-white'
                            }`}
                          >
                            {dropdownItem.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={`block w-full text-left py-3 px-4 my-1 rounded-md transition-all duration-200 font-medium min-h-[44px] ${
                      currentPage === item.id
                        ? 'bg-osp-navy text-osp-white'
                        : 'text-osp-gray hover:bg-osp-navy hover:text-osp-white'
                    } ${item.id === 'challenge' ? 'drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]' : ''}`}
                  >
                    <span className={item.id === 'challenge' ? 'text-amber-300' : ''}>
                      {item.label.split('\n').map((line, i) => (
                        <span key={i}>
                          {line}
                          {i < item.label.split('\n').length - 1 && <br />}
                        </span>
                      ))}
                    </span>
                  </button>
                )}
              </div>
            ))}
            {isAdmin && (
              <button
                onClick={() => handleNavClick('admin')}
                className={`block w-full text-left py-3 px-4 my-1 rounded-md transition-all duration-200 font-medium min-h-[44px] ${
                  currentPage === 'admin'
                    ? 'bg-osp-navy text-osp-white'
                    : 'text-osp-gray hover:bg-osp-navy hover:text-osp-white'
                }`}
              >
                <span className="flex items-center space-x-2">
                  <Settings size={16} />
                  <span>Admin</span>
                </span>
              </button>
            )}
            {/* Submit Video CTA for Mobile */}
            <button
              onClick={() => handleNavClick('submit-video')}
              className="w-full mt-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold px-6 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Submit Video
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
