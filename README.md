# Speedrun Events World Map

An interactive world map web application built with React that displays speedrunning events around the globe. Users can explore different regions, search for events near specific cities, and view event details in multiple languages.

## Features

- **Interactive World Map**: Hover over regions to highlight them, click to zoom in
- **Regional Zoom**: Click on any region (North America, South America, Europe, Russia, Africa, Middle East, Southeast Asia, Australia, Japan) to zoom in
- **Event Pins**: Events are displayed as pins on the map with detailed information
- **Search Functionality**: Search for events near any city worldwide
- **Multi-language Support**: Toggle between English and Japanese
- **Responsive Design**: Works on desktop and mobile devices
- **Event Details**: Click on pins to view event information and visit websites

## Technology Stack

- React 19 with TypeScript
- React Router v7
- Leaflet & React-Leaflet for map functionality
- Tailwind CSS for styling
- OpenStreetMap tiles

## Development

To start the development server:

```bash
npm run dev
```

## Building for Production

To build the app for production:

```bash
npm run build
```

## Data Structure

Events are stored in `app/data/events.json` with the following format:

```json
{
  "id": number,
  "title": string,
  "link": string,
  "location": string,
  "coordinates": [number, number],
  "region": string,
  "description": string
}
```

## Adding New Events

To add new events, simply edit the `app/data/events.json` file with new event objects following the same structure.

## Customization

- **Regions**: Modify region bounds in `app/components/WorldMap.tsx`
- **Translations**: Update `app/data/translations.json` for new languages
- **Styling**: Customize styles in `app/app.css` and component files
- **Search Cities**: Add new cities to the search database in `app/utils/search.ts`

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t speedrun-events-worldmap .

# Run the container
docker run -p 3000:3000 speedrun-events-worldmap
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

---

Built with ❤️ using React Router and Leaflet.