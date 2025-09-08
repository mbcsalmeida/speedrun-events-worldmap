import { type Event } from '../types';
import { SimpleWorldMap } from './SimpleWorldMap';

interface WorldMapProps {
  events: Event[];
  selectedRegion: string | null;
  onRegionClick: (region: string) => void;
}

export function WorldMap(props: WorldMapProps) {
  return <SimpleWorldMap {...props} />;
}