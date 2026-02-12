import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import LibraryHomePage from './components/LibraryHomePage';
import KataCollectionsPage from './components/KataCollectionsPage';
import KataDetailPage from './components/KataDetailPage';
import EducationPage from './components/EducationPage';
import OurJourneyPage from './components/OurJourneyPage';
import HallOfFame from './components/HallOfFame';
import ChallengePage from './components/ChallengePage';
import VideoSubmissionPage from './components/VideoSubmissionPage';
import AdminDashboard from './components/AdminDashboard';
import ChallengeAFriend from './components/ChallengeAFriend';
import ThankYouPage from './components/ThankYouPage';
import VideoSubmissionThankYouPage from './components/VideoSubmissionThankYouPage';
import FoundingSenseiCirclePage from './components/FoundingSenseiCirclePage';
import JudoTechniquesPage from './components/JudoTechniquesPage';
import TrainingTipsPage from './components/TrainingTipsPage';
import SafetyGuidelinesPage from './components/SafetyGuidelinesPage';
import Footer from './components/Footer';
import SkipLink from './components/SkipLink';

function App() {
  const [currentPage, setCurrentPage] = useState('our-concept');
  const [pageParams, setPageParams] = useState<Record<string, string>>({});

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleNavigate = (page: string, params?: Record<string, string>) => {
    setCurrentPage(page);
    if (params) {
      setPageParams(params);
    } else {
      setPageParams({});
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'challenge':
        return <ChallengePage onNavigate={handleNavigate} />;
      case 'our-concept':
        return <LibraryHomePage onNavigate={handleNavigate} />;
      case 'founding-sensei':
        return <FoundingSenseiCirclePage />;
      case 'kata-collections':
        return <KataCollectionsPage onNavigate={handleNavigate} />;
      case 'kata-detail':
        return <KataDetailPage kataSlug={pageParams.kata || 'nage-no-kata'} onNavigate={handleNavigate} />;
      case 'education':
        return <EducationPage onNavigate={handleNavigate} />;
      case 'our-journey':
        return <OurJourneyPage onNavigate={handleNavigate} />;
      case 'hall-of-fame':
        return <HallOfFame onNavigate={handleNavigate} />;
      case 'submit-video':
        return <VideoSubmissionPage onNavigate={handleNavigate} />;
      case 'challenge-friend':
        return <ChallengeAFriend onNavigate={handleNavigate} />;
      case 'thankyou':
        return <ThankYouPage onNavigate={handleNavigate} />;
      case 'video-thankyou':
        return <VideoSubmissionThankYouPage onNavigate={handleNavigate} />;
      case 'admin':
        return <AdminDashboard />;
      case 'judo-techniques':
        return <JudoTechniquesPage />;
      case 'training-tips':
        return <TrainingTipsPage />;
      case 'safety-guidelines':
        return <SafetyGuidelinesPage />;
      default:
        return <ChallengePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <SkipLink />
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
      <main id="main-content" className="flex-grow">
        {renderPage()}
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
