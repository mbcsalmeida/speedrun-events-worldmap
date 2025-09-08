import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Language, Translations } from '../types';

const LanguageContext = createContext<{
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: Translations;
} | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [translations, setTranslations] = useState<Translations>({});

  useEffect(() => {
    // Load translations
    import('../data/translations.json').then((data) => {
      setTranslations(data);
    });
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
