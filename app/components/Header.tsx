import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface HeaderProps {
  selectedRegion?: string | null;
  onClearSelectedRegion?: () => void;
}

export function Header({ selectedRegion, onClearSelectedRegion }: HeaderProps) {
  const { language, setLanguage, translations } = useLanguage();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ja' : 'en');
  };

  const currentTranslations = translations[language];

  if (!currentTranslations) {
    return null;
  }

  return (
    <header className={`bg-white shadow-lg transition-all duration-300 ${isCollapsed ? 'h-16' : 'h-24'}`}>
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className={`font-bold transition-all duration-300 ${isCollapsed ? 'text-lg' : 'text-2xl'}`} style={{color: "#278178"}}>
            {currentTranslations.header.title}
          </h1>
          <button
            onClick={toggleLanguage}
          className="bg-transparent hover:bg-blue-500 text-black hover:text-white font-semibold py-1 px-2 border border-gray-400 rounded shadow"
          >
            {currentTranslations.header.languageToggle}
          </button>
          {selectedRegion && !isCollapsed && (
            <button
              type="button"
              onClick={onClearSelectedRegion}
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-2  border border-gray-400 rounded shadow"
            >
              Change region
            </button>
          )}
          {!isCollapsed && (
            <button
              type="button"
              onClick={() => setIsInfoOpen(true)}
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2  border border-gray-400 rounded shadow"
              aria-haspopup="dialog"
              aria-expanded={isInfoOpen}
            >
              Info
            </button>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
            title={isCollapsed ? 'Expand header' : 'Collapse header'}
          >
            {isCollapsed ? '↓' : '↑'}
          </button>
        </div>
      </div>
      {isInfoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setIsInfoOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="About this site"
        >
          <div
            className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">About this website</h2>
              <button
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close"
                onClick={() => setIsInfoOpen(false)}
              >
                ×
              </button>
            </div>
            <div className="space-y-3 text-sm text-gray-700">
              <p>
                Upon noticing that there is no singular hub for all on-site events around the world, I was compelled to make this little page so that speedrunner and speedrun enthusiats could find out about events near them or in different corners of the world.
              </p>
              <p>
                Data compiled from public sources; some locations are approximate.
              </p>
              <p>
                Map from freeworldmaps.com
              </p>
              <p>
                Feedback or contributions are welcome! If your event is missing or you find any wrong information, please contact <a href='https://sioneus.me'>sioneus</a> on discord.
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
