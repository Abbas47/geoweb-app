import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { GeoJsonLayer } from '@deck.gl/layers';
import setMapboxAccessToken from 'react-map-gl';

// Set the Mapbox token globally
setMapboxAccessToken('pk.eyJ1IjoiYWJiYXMyNSIsImEiOiJjbTNrYmg4dmkwYTF5MnFxemJpcDF0YnEzIn0.kIKSBa34JbIn-EjydGonBA'); // Replace with your valid token

const DeckGL = dynamic(() => import('@deck.gl/react'), { ssr: false });
const Map = dynamic(() => import('react-map-gl').then((mod) => mod.Map), { ssr: false });

interface GeoJsonFeatureCollection {
  type: 'FeatureCollection';
  features: Array<any>;
}

interface ViewState {
  longitude: number;
  latitude: number;
  zoom: number;
  pitch?: number;
  bearing?: number;
}

export default function Home() {
  const [geoData, setGeoData] = useState<{
    points: GeoJsonFeatureCollection | null;
    polygons: GeoJsonFeatureCollection | null;
  }>({ points: null, polygons: null });

  const [viewState, setViewState] = useState<ViewState>({
    longitude: 12.5,
    latitude: 41.5,
    zoom: 5,
    pitch: 0,
    bearing: 0,
  });

  useEffect(() => {
    const fetchGeoData = async () => {
      try {
        const pointsResponse = await fetch('/data/point.geojson');
        const points = await pointsResponse.json();
        const polygonsResponse = await fetch('/data/polygon.geojson');
        const polygons = await polygonsResponse.json();
        setGeoData({ points, polygons });
      } catch (error) {
        console.error('Error fetching GeoJSON data:', error);
      }
    };

    fetchGeoData();
  }, []);

  const layers: any[] = [];
  if (geoData.points) {
    layers.push(
      new GeoJsonLayer({
        id: 'points-layer',
        data: geoData.points,
        pickable: true,
        pointRadiusMinPixels: 5,
        getFillColor: [255, 0, 0],
      })
    );
  }
  if (geoData.polygons) {
    layers.push(
      new GeoJsonLayer({
        id: 'polygon-layer',
        data: geoData.polygons,
        stroked: true,
        filled: false,
        lineWidthMinPixels: 2,
        getLineColor: [0, 0, 255],
      })
    );
  }

  return (
    <div>
      <h1>Geospatial AI Application</h1>
      <div style={{ height: '100vh' }}>
        <DeckGL
          initialViewState={viewState}
          controller={true}
          layers={layers}
          onViewStateChange={(params: { viewState: ViewState }) => {
            setViewState(params.viewState);
          }}
        />
        <Map
          initialViewState={viewState}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          style={{ width: '100%', height: '100%' }}
          onMove={(evt: { viewState: ViewState }) => {
            setViewState(evt.viewState);
          }}
        />
      </div>
    </div>
  );
}
