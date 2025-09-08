import React, { useState, useEffect } from 'react';
import { Event, RegionBounds } from '../types';
import { EventPopup } from './EventPopup';

interface SimpleWorldMapProps {
  events: Event[];
  selectedRegion: string | null;
  onRegionClick: (region: string) => void;
}

// Region definitions with bounds for zooming
const REGION_BOUNDS: Record<string, RegionBounds> = {
  'North America': {
    north: 70,
    south: 15,
    east: -50,
    west: -170,
    center: [45, -100]
  },
  'South America': {
    north: 15,
    south: -60,
    east: -30,
    west: -90,
    center: [-15, -60]
  },
  'Europe': {
    north: 70,
    south: 35,
    east: 40,
    west: -10,
    center: [55, 15]
  },
  'Russia': {
    north: 70,
    south: 40,
    east: 180,
    west: 20,
    center: [60, 100]
  },
  'Africa': {
    north: 40,
    south: -35,
    east: 55,
    west: -20,
    center: [0, 20]
  },
  'Middle East': {
    north: 45,
    south: 10,
    east: 70,
    west: 20,
    center: [30, 50]
  },
  'Southeast Asia': {
    north: 25,
    south: -10,
    east: 140,
    west: 90,
    center: [5, 115]
  },
  'Australia': {
    north: -10,
    south: -45,
    east: 155,
    west: 110,
    center: [-25, 135]
  },
  'Japan': {
    north: 45,
    south: 30,
    east: 145,
    west: 125,
    center: [35, 135]
  }
};

export function SimpleWorldMap({ events, selectedRegion, onRegionClick }: SimpleWorldMapProps) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [MapComponent, setMapComponent] = useState<React.ComponentType<any> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Only load on client side
    if (typeof window !== 'undefined') {
      // Load CSS
      import('leaflet/dist/leaflet.css');
      
      // Load Leaflet and react-leaflet
      Promise.all([
        import('leaflet'),
        import('react-leaflet')
      ]).then(([leaflet, reactLeaflet]) => {
        const L = leaflet.default;
        const { MapContainer, TileLayer, Marker, Popup, useMap } = reactLeaflet;
        
        // Fix for default markers
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        });

        // Create the map component
        const LeafletMap = () => {
          const map = useMap();

          useEffect(() => {
            if (selectedRegion && REGION_BOUNDS[selectedRegion]) {
              const bounds = REGION_BOUNDS[selectedRegion];
              map.fitBounds([
                [bounds.south, bounds.west],
                [bounds.north, bounds.east]
              ], { padding: [20, 20] });
            } else {
              map.setView([20, 0], 2);
            }
          }, [selectedRegion, map]);

          return null;
        };

        // Filter events by selected region
        const filteredEvents = selectedRegion 
          ? events.filter(event => event.region === selectedRegion)
          : events;

        const MapComponent = () => (
          <div className="relative w-full h-screen">
            <MapContainer
              center={[20, 0]}
              zoom={2}
              style={{ height: '100%', width: '100%' }}
              className="z-0"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              
              <LeafletMap />
              
              {filteredEvents.map((event) => (
                <Marker key={event.id} position={event.coordinates}>
                  <Popup>
                    <EventPopup event={event} />
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
            
            
          </div>
        );

        setMapComponent(() => MapComponent);
        setIsLoading(false);
      }).catch((error) => {
        console.error('Failed to load map libraries:', error);
        setIsLoading(false);
      });
    }
  }, [events, selectedRegion, onRegionClick]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }

  if (!MapComponent) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-red-600">Failed to load map. Please refresh the page.</p>
        </div>
      </div>
    );
  }

  return <MapComponent />;
}

