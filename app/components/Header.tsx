import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface HeaderProps {
  selectedRegion?: string | null;
  onClearSelectedRegion?: () => void;
}

export function Header({ selectedRegion, onClearSelectedRegion }: HeaderProps) {
  const { language, setLanguage, translations } = useLanguage();
  const [isCollapsed, setIsCollapsed] = useState(false);

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
          <h1 className={`font-bold text-blue-600 transition-all duration-300 ${isCollapsed ? 'text-lg' : 'text-2xl'}`}>
            {currentTranslations.header.title}
          </h1>
          <button
            onClick={toggleLanguage}
            className="px-3 py-1 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition-colors text-sm"
          >
            {currentTranslations.header.languageToggle}
          </button>
          {selectedRegion && !isCollapsed && (
            <button
              type="button"
              onClick={onClearSelectedRegion}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm"
            >
              Change region
            </button>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
            title={isCollapsed ? 'Expand header' : 'Collapse header'}
          >
            {isCollapsed ? '↑' : '↓'}
          </button>
        </div>
      </div>
    </header>
  );
}
