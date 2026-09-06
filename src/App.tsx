import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ListingCard } from './components/ListingCard';
import { ListingDetailModal } from './components/ListingDetailModal';
import { SellListingModal } from './components/SellListingModal';
import { EditListingModal } from './components/EditListingModal';
import { AdminModal } from './components/AdminModal';
import { DownloadAppModal } from './components/DownloadAppModal';
import { Footer } from './components/Footer';
import { Listing, FilterState, ViewMode, Language, ListingStatus } from './types';
import { getStoredListings, saveListingsToStorage } from './data/mockListings';
import { TRANSLATIONS } from './translations';
import { Building2, CheckCircle, Download } from 'lucide-react';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>(() => {
    return (localStorage.getItem('charte_lang') as Language) || 'en';
  });

  const [activeMode, setActiveMode] = useState<ViewMode>('buy');
  const [listings, setListings] = useState<Listing[]>(() => getStoredListings());
  const [filters, setFilters] = useState<FilterState>({
    city: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    searchQuery: '',
  });

  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isSellOpen, setIsSellOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingListing, setEditingListing] = useState<Listing | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isDownloadAppOpen, setIsDownloadAppOpen] = useState(false);
  const [adminEmail, setAdminEmail] = useState<string | null>(() => {
    return localStorage.getItem('charte_admin_email');
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync lang to document
  useEffect(() => {
    document.documentElement.lang = currentLang;
    localStorage.setItem('charte_lang', currentLang);
  }, [currentLang]);

  // Check URL hash for admin door (#admin) or download door (#app)
  useEffect(() => {
    if (window.location.hash === '#admin') {
      setIsAdminOpen(true);
    } else if (window.location.hash === '#app' || window.location.hash === '#download') {
      setIsDownloadAppOpen(true);
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleSetLang = (lang: Language) => {
    setCurrentLang(lang);
  };

  const handleFilterChange = (patch: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...patch }));
  };

  const handleClearFilters = () => {
    setFilters({
      city: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      searchQuery: '',
    });
  };

  const handleSelectListing = (listing: Listing) => {
    setSelectedListing(listing);
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    setSelectedListing(null);
  };

  const handleListingCreated = (newListing: Listing, scrubbed: boolean) => {
    const updated = [newListing, ...listings];
    setListings(updated);
    saveListingsToStorage(updated);
    const t = TRANSLATIONS[currentLang];
    showToast(scrubbed ? t.toast_listing_published : t.toast_live);
  };

  const handleUpdateStatus = (id: string, status: ListingStatus) => {
    const updated = listings.map((l) => (l.id === id ? { ...l, status } : l));
    setListings(updated);
    saveListingsToStorage(updated);
    if (selectedListing && selectedListing.id === id) {
      setSelectedListing({ ...selectedListing, status });
    }
    const t = TRANSLATIONS[currentLang];
    showToast(status ? `${t.marked_as_prefix} ${status.toUpperCase()}` : t.toast_status_cleared);
  };

  const handleOpenEdit = (listing: Listing) => {
    setEditingListing(listing);
    setIsEditOpen(true);
  };

  const handleSaveEdit = (updatedListing: Listing) => {
    const updated = listings.map((l) => (l.id === updatedListing.id ? updatedListing : l));
    setListings(updated);
    saveListingsToStorage(updated);
    if (selectedListing && selectedListing.id === updatedListing.id) {
      setSelectedListing(updatedListing);
    }
    const t = TRANSLATIONS[currentLang];
    showToast(t.toast_listing_updated);
  };

  const handleAdminLogin = (email: string) => {
    setAdminEmail(email);
    localStorage.setItem('charte_admin_email', email);
    const t = TRANSLATIONS[currentLang];
    showToast(t.toast_signed_in);
  };

  const handleAdminLogout = () => {
    setAdminEmail(null);
    localStorage.removeItem('charte_admin_email');
    showToast('Admin logged out.');
  };

  // Filter listings based on current mode and search inputs
  const filteredListings = useMemo(() => {
    return listings.filter((l) => {
      // Mode filter: buy = sale properties, rent = rent properties
      if (activeMode === 'rent' && l.type !== 'rent') return false;
      if (activeMode === 'buy' && l.type !== 'sale') return false;

      // City filter
      if (filters.city && l.city.toLowerCase() !== filters.city.toLowerCase()) {
        return false;
      }

      // Min price
      if (filters.minPrice && l.price < Number(filters.minPrice)) {
        return false;
      }

      // Max price
      if (filters.maxPrice && l.price > Number(filters.maxPrice)) {
        return false;
      }

      // Bedrooms
      if (filters.bedrooms && l.bedrooms < Number(filters.bedrooms)) {
        return false;
      }

      return true;
    });
  }, [listings, activeMode, filters]);

  const t = TRANSLATIONS[currentLang];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] font-sans antialiased selection:bg-[#1E40AF] selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#0A2244] text-white px-6 py-3 rounded-full shadow-2xl border border-blue-400/40 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-sm font-semibold tracking-wide">{toastMessage}</span>
        </div>
      )}

      {/* Navbar */}
      <Navbar
        currentLang={currentLang}
        onSetLang={handleSetLang}
        activeMode={activeMode}
        onSetMode={setActiveMode}
        onOpenSell={() => setIsSellOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        adminEmail={adminEmail}
        onAdminLogout={handleAdminLogout}
        onNavigateHome={() => {
          handleClearFilters();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenDownloadApp={() => setIsDownloadAppOpen(true)}
      />

      {/* Hero Section with Filter Bar */}
      <Hero
        currentLang={currentLang}
        activeMode={activeMode}
        onSetMode={setActiveMode}
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        onOpenDownloadApp={() => setIsDownloadAppOpen(true)}
      />

      {/* Main Listings Grid */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-8 pb-4 border-b border-blue-100">
          <div>
            <h2
              className="text-2xl sm:text-3xl font-bold text-[#0A2244] font-serif"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              {activeMode === 'rent' ? t.section_for_rent : t.section_for_sale}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Verified properties across Ethiopia by Charte Homes with clear ownership records
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsDownloadAppOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[#1E40AF] bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t.download_app}</span>
            </button>
            <div className="text-xs font-semibold text-[#1E40AF] bg-blue-50 px-4 py-1.5 rounded-full border border-blue-200 shadow-xs">
              <span>{filteredListings.length}</span>{' '}
              <span>{filteredListings.length === 1 ? t.count_house_singular : t.count_house_plural}</span>
            </div>
          </div>
        </div>

        {/* Listings Grid */}
        {filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredListings.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                currentLang={currentLang}
                onSelect={handleSelectListing}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-3xl p-12 text-center border border-blue-100 shadow-sm max-w-xl mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-blue-50 text-[#1E40AF] flex items-center justify-center mx-auto">
              <Building2 className="w-8 h-8" />
            </div>
            <h3
              className="text-xl font-bold text-[#0A2244] font-serif"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              {t.empty_title}
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              {t.empty_desc}
            </p>
            <button
              onClick={handleClearFilters}
              className="px-6 py-3 bg-[#1E40AF] hover:bg-[#1D4ED8] text-white text-xs font-bold uppercase tracking-widest rounded-full shadow-sm transition-all"
            >
              {t.btn_clear}
            </button>
          </div>
        )}
      </main>

      {/* Listing Detail Modal */}
      <ListingDetailModal
        listing={selectedListing}
        isOpen={isDetailOpen}
        onClose={handleCloseDetail}
        currentLang={currentLang}
        isAdmin={!!adminEmail}
        onUpdateStatus={handleUpdateStatus}
        onOpenEdit={handleOpenEdit}
      />

      {/* Sell / List House Modal */}
      <SellListingModal
        isOpen={isSellOpen}
        onClose={() => setIsSellOpen(false)}
        currentLang={currentLang}
        onListingCreated={handleListingCreated}
      />

      {/* Edit Listing Modal */}
      <EditListingModal
        listing={editingListing}
        isOpen={isEditOpen}
        onClose={() => {
          setIsEditOpen(false);
          setEditingListing(null);
        }}
        currentLang={currentLang}
        onSave={handleSaveEdit}
      />

      {/* Admin Auth Modal */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => {
          setIsAdminOpen(false);
          if (window.location.hash === '#admin') {
            window.history.replaceState(null, '', window.location.pathname);
          }
        }}
        currentLang={currentLang}
        onAdminLogin={handleAdminLogin}
      />

      {/* Download App Modal */}
      <DownloadAppModal
        isOpen={isDownloadAppOpen}
        onClose={() => {
          setIsDownloadAppOpen(false);
          if (window.location.hash === '#app' || window.location.hash === '#download') {
            window.history.replaceState(null, '', window.location.pathname);
          }
        }}
        currentLang={currentLang}
      />

      {/* Footer */}
      <Footer
        currentLang={currentLang}
        onSetMode={setActiveMode}
        onOpenSell={() => setIsSellOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onNavigateHome={() => {
          handleClearFilters();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenDownloadApp={() => setIsDownloadAppOpen(true)}
        isAdmin={!!adminEmail}
      />
    </div>
  );
}
