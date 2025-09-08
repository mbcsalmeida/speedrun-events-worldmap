import React, { useState, useEffect } from 'react';
import type { Route } from "./+types/home";
import { LanguageProvider } from '../contexts/LanguageContext';
import { Header } from '../components/Header';
import { WorldMap } from '../components/WorldMap';
import { RegionSelectionMap } from '../components/RegionSelectionMap';
import type { Event } from '../types';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Speedrun Events World Map" },
    { name: "description", content: "Interactive world map showing speedrunning events around the globe" },
  ];
}

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  useEffect(() => {
    // Load events data
    import('../data/events.json').then((data) => {
      setEvents(data.events as Event[]);
    });
  }, []);

  const handleRegionClick = (region: string) => {
    setSelectedRegion(selectedRegion === region ? null : region);
  };

  return (
    <LanguageProvider>
      <div className="h-screen flex flex-col">
        <Header />
        <div className="flex-1 relative">
          {/* <WorldMap
            events={events}
            selectedRegion={selectedRegion}
            onRegionClick={handleRegionClick}
          /> */}
          <RegionSelectionMap 
            selectedRegion={selectedRegion}
            onRegionClick={handleRegionClick}
          />
        </div>
      </div>
    </LanguageProvider>
  );
}
