import React from 'react';
import { Event } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface EventPopupProps {
  event: Event;
}

export function EventPopup({ event }: EventPopupProps) {
  const { translations, language } = useLanguage();
  const currentTranslations = translations[language];

  if (!currentTranslations) {
    return null;
  }

  return (
    <div className="p-4 min-w-[250px] max-w-[300px]">
      <h3 className="font-bold text-lg text-gray-800 mb-2">{event.title}</h3>
      <p className="text-sm text-gray-600 mb-2">{event.description}</p>
      <p className="text-sm text-gray-500 mb-3">📍 {event.location}</p>
      <div className="flex space-x-2">
        <a
          href={event.link}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
        >
          {currentTranslations.eventPopup.visitWebsite}
        </a>
      </div>
    </div>
  );
}
