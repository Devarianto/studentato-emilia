import React, { useState, useEffect } from 'react';
import { Language, DesktopVersion, Room, SearchFilterState, Review } from './types';
import { TopUtilityBar } from './components/TopUtilityBar';
import { Header } from './components/Header';
import { HeroV1 } from './components/HeroV1';
import { HeroV2 } from './components/HeroV2';
import { AboutUsSection } from './components/AboutUsSection';
import { RoomCatalogSection } from './components/RoomCatalogSection';
import { SpecialOffersSection } from './components/SpecialOffersSection';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';
import { ReviewSection } from './components/ReviewSection';
import { FAQSection } from './components/FAQSection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { RoomDetailModal } from './components/RoomDetailModal';
import { WriteReviewModal } from './components/WriteReviewModal';
import { VideoModal } from './components/VideoModal';
import { CMSProvider, useCMS } from './context/CMSContext';
import { CMSAdminPanel } from './components/CMSAdminPanel';
import { LayoutDashboard, LogOut } from 'lucide-react';

function MainAppContent() {
  const {
    cmsData,
    updateCMSData,
    activeRoute,
    navigateTo,
    isAuthenticated,
    currentUser,
    currentRole,
    logout,
  } = useCMS();

  const [language, setLanguage] = useState<Language>('EN');
  const [desktopVersion, setDesktopVersion] = useState<DesktopVersion>('v1');
  const [searchFilter, setSearchFilter] = useState<SearchFilterState>({
    city: 'All',
    roomType: 'All',
    maxBudget: 800,
    moveInDate: 'Sept 2025',
  });

  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  useEffect(() => {
    if (cmsData.theme.defaultLanguage) {
      setLanguage(cmsData.theme.defaultLanguage);
    }
  }, [cmsData.theme.defaultLanguage]);

  useEffect(() => {
    if (cmsData.theme.defaultDesktopVersion) {
      setDesktopVersion(cmsData.theme.defaultDesktopVersion);
    }
  }, [cmsData.theme.defaultDesktopVersion]);

  // If user is on /admin (or /wp-admin), render the standalone CMS Portal (Login or Dashboard)
  if (activeRoute === 'admin') {
    return <CMSAdminPanel />;
  }

  const handleSearch = (filters: SearchFilterState) => {
    setSearchFilter(filters);
  };

  const handleOpenBookingModal = () => {
    setSelectedRoom(cmsData.rooms[0] || null);
  };

  const handleAddReview = (newReview: Partial<Review>) => {
    const created: Review = {
      id: `rev-${Date.now()}`,
      studentName: newReview.studentName || 'Student Resident',
      university: newReview.university || 'Politecnico di Torino',
      city: newReview.city || 'Torino',
      roomType: newReview.roomType || 'Deluxe Single Suite',
      rating: newReview.rating || 5,
      date: newReview.date || 'Today',
      avatar:
        newReview.avatar ||
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      comment: newReview.comment || { EN: '', IT: '' },
      verified: true,
    };
    updateCMSData((prev) => ({
      ...prev,
      reviews: [created, ...prev.reviews],
    }));
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] text-zinc-900 font-sans selection:bg-[#FFC83B] selection:text-zinc-950">
      {/* WordPress-style Top Admin Bar — ONLY visible if an admin is currently logged in */}
      {isAuthenticated && (
        <div className="bg-[#1D2327] text-white text-xs px-4 py-1.5 flex items-center justify-between border-b border-zinc-700">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('admin')}
              className="inline-flex items-center gap-1.5 font-extrabold text-[#FFC83B] hover:underline"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Buka Dashboard CMS (/admin)</span>
            </button>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-zinc-300 hidden sm:inline">
              Login sebagai: <strong>{currentUser.name}</strong> ({currentRole.name})
            </span>
            <button
              onClick={logout}
              className="inline-flex items-center gap-1 text-red-400 hover:text-red-300 font-bold"
            >
              <LogOut className="w-3 h-3" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}

      {/* Utility Top Bar */}
      <TopUtilityBar
        language={language}
        setLanguage={setLanguage}
        desktopVersion={desktopVersion}
        setDesktopVersion={setDesktopVersion}
      />

      {/* Sticky Main Header */}
      <Header language={language} onOpenBookingModal={handleOpenBookingModal} />

      {/* Main Public Website Content */}
      <main>
        {desktopVersion === 'v1' ? (
          <HeroV1
            language={language}
            onSearch={handleSearch}
            onOpenVideoModal={() => setIsVideoModalOpen(true)}
            onOpenBookingModal={handleOpenBookingModal}
          />
        ) : (
          <HeroV2
            language={language}
            onSearch={handleSearch}
            onOpenBookingModal={handleOpenBookingModal}
          />
        )}

        <AboutUsSection language={language} />

        <RoomCatalogSection
          language={language}
          searchFilter={searchFilter}
          onSelectRoom={(room) => setSelectedRoom(room)}
        />

        <SpecialOffersSection language={language} />

        <WhyChooseUsSection
          language={language}
          onOpenVideoModal={() => setIsVideoModalOpen(true)}
        />

        <ReviewSection
          language={language}
          onOpenWriteReviewModal={() => setIsWriteReviewOpen(true)}
        />

        <FAQSection language={language} />

        <LocationSection language={language} />
      </main>

      {/* Footer (Includes discrete Admin Login link at the very bottom) */}
      <Footer language={language} />

      {/* Interactive Modals */}
      <RoomDetailModal
        room={selectedRoom}
        language={language}
        onClose={() => setSelectedRoom(null)}
      />

      {isWriteReviewOpen && (
        <WriteReviewModal
          language={language}
          onClose={() => setIsWriteReviewOpen(false)}
          onSubmitReview={handleAddReview}
        />
      )}

      <VideoModal isOpen={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <CMSProvider>
      <MainAppContent />
    </CMSProvider>
  );
}
