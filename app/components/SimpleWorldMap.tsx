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
    north: 60,
    south: 20,
    east: -60,
    west: -130,
    center: [40, -95]
  },
  'South America': {
    north: 10,
    south: -40,
    east: -35,
    west: -82,
    center: [-15, -60]
  },
  'Europe': {
    north: 65,
    south: 40,
    east: 30,
    west: -10,
    center: [52, 10]
  },
  'Russia': {
    north: 60,
    south: 45,
    east: 150,
    west: 120,
    center: [52, 135]
  },
  'Africa': {
    north: 25,
    south: -30,
    east: 50,
    west: -10,
    center: [-2, 20]
  },
  'Middle East': {
    north: 38,
    south: 20,
    east: 60,
    west: 30,
    center: [30, 45]
  },
  'Southeast Asia': {
    north: 20,
    south: -5,
    east: 130,
    west: 95,
    center: [7, 112]
  },
  'Australia': {
    north: -15,
    south: -44,
    east: 154,
    west: 112,
    center: [-25, 134]
  },
  'Japan': {
    north: 46,
    south: 30,
    east: 146,
    west: 128,
    center: [37, 137]
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
              ], { padding: [10, 10], maxZoom: 7 });
            } else {
              map.setView([20, 0], 2);
            }
          }, [selectedRegion, map]);

          return null;
        };

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
              
              {events.map((event) => (
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

