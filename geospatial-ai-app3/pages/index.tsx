import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { GeoJsonLayer } from '@deck.gl/layers';
import { Map } from 'react-map-gl';
import { DeckGL } from '@deck.gl/react';
import Chat from '@/components/Chat';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
type GeoJsonFeatureCollection = {
  type: 'FeatureCollection';
  features: Array<any>;
}

type ViewState = {
  longitude: number;
  latitude: number;
  zoom: number;
  pitch?: number;
  bearing?: number;
}

type ViewStateChangeEvent = {
  viewState: ViewState;
};

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
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <div style={{ flex: '0 0 auto', height: '20vh', borderBottom: '1px solid #ddd', zIndex: 10, backgroundColor: '#fff', overflowY: 'auto' }}>
        <Chat />
      </div>
      <div style={{ flex: '1 1 auto', height: '80vh', position: 'relative' }}>
        <DeckGL
          initialViewState={viewState}
          controller={true}
          layers={layers}
          onViewStateChange={(params: ViewStateChangeEvent) => {
            setViewState(params.viewState);
          }}
        >
          <Map
            initialViewState={viewState}
            mapboxAccessToken={MAPBOX_TOKEN}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            onMove={(evt: { viewState: ViewState }) => {
              setViewState(evt.viewState);
            }}
          />
        </DeckGL>
      </div>
    </div>

  );
}