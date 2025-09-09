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
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        >
          {currentTranslations.eventPopup.visitWebsite}
        </a>
      </div>
    </div>
  );
}
