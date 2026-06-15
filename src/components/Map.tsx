import React from 'react';
import 'ol/ol.css';
import OlMap from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import {Circle as CircleGeom, Polygon as PolygonGeom} from 'ol/geom';
import {Fill, Stroke, Style} from 'ol/style';
import {fromLonLat} from 'ol/proj';
import Overlay from 'ol/Overlay';
import {Geofence, Vehicle} from '@/types';
import {Bike, Car, Truck} from 'lucide-react';
import {renderToStaticMarkup} from 'react-dom/server';

interface MapProps {
  vehicles?: Vehicle[];
  geofences?: Geofence[];
  center?: [number, number]; // [lat, lng]
  zoom?: number;
  onVehicleClick?: (vehicle: Vehicle) => void;
}

export function Map({ 
  vehicles = [], 
  geofences = [], 
  center = [51.505, -0.09], 
  zoom = 13,
  onVehicleClick 
}: MapProps) {
  const mapElement = React.useRef<HTMLDivElement>(null);
  const mapRef = React.useRef<OlMap | null>(null);
  const vectorSourceRef = React.useRef<VectorSource>(new VectorSource());
  const overlaysRef = React.useRef<Record<string, Overlay>>({});

  // Initialize Map
  React.useEffect(() => {
    if (!mapElement.current) return;

    const vectorLayer = new VectorLayer({
      source: vectorSourceRef.current,
    });

    const initialMap = new OlMap({
      target: mapElement.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer,
      ],
      view: new View({
        center: fromLonLat([center[1], center[0]]),
        zoom: zoom,
      }),
    });

    mapRef.current = initialMap;

    return () => initialMap.setTarget(undefined);
  }, []);

  // Sync View
  React.useEffect(() => {
    if (!mapRef.current) return;
    const view = mapRef.current.getView();
    view.animate({
      center: fromLonLat([center[1], center[0]]),
      zoom: zoom,
      duration: 500
    });
  }, [center, zoom]);

  // Sync Geofences
  React.useEffect(() => {
    if (!mapRef.current) return;
    
    vectorSourceRef.current.clear();

    geofences.forEach((gf) => {
      if (!gf.active) return;

      let feature: Feature | null = null;

      if (gf.coordinates) {
        if (gf.type === 'circle') {
          const centerCoords = fromLonLat([gf.coordinates[1], gf.coordinates[0]]);
          feature = new Feature(new CircleGeom(centerCoords, gf.radius || 500));
        } else if (gf.type === 'polygon') {
          const coords = gf.coordinates.map((c: [number, number]) => fromLonLat([c[1], c[0]]));
          feature = new Feature(new PolygonGeom([coords]));
        }
      }

      if (feature) {
        feature.setStyle(
          new Style({
            stroke: new Stroke({
              color: gf.color,
              width: 2,
            }),
            fill: new Fill({
              color: gf.color.replace('rgb', 'rgba').replace(')', ', 0.1)'),
            }),
          })
        );
        vectorSourceRef.current.addFeature(feature);
      }
    });
  }, [geofences]);

  // Sync Vehicle Overlays
  React.useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;
    const currentVehicleIds = new Set(vehicles.map(v => v.id));

    // Remove old overlays
    Object.keys(overlaysRef.current).forEach(id => {
      if (!currentVehicleIds.has(id)) {
        const overlay = overlaysRef.current[id];
        map.removeOverlay(overlay);
        delete overlaysRef.current[id];
      }
    });

    // Add or update overlays
    vehicles.forEach(v => {
      const color = v.status === 'moving' ? '#10b981' : v.status === 'idle' ? '#f59e0b' : v.status === 'offline' ? '#6b7280' : '#3b82f6';
      
      let overlay = overlaysRef.current[v.id];
      let element: HTMLDivElement;

      if (!overlay) {
        element = document.createElement('div');
        element.className = 'custom-vehicle-marker';
        element.onclick = (e) => {
          e.stopPropagation();
          onVehicleClick?.(v);
        };
        
        overlay = new Overlay({
          id: v.id,
          element: element,
          positioning: 'center-center',
          stopEvent: true,
        });
        
        map.addOverlay(overlay);
        overlaysRef.current[v.id] = overlay;
      } else {
        element = overlay.getElement() as HTMLDivElement;
      }

      // Update element content (React icons rendered to static markup)
      element.innerHTML = renderToStaticMarkup(
          <div className="relative pointer-events-auto cursor-pointer">
            <div
                className="w-10 h-10 rounded-full bg-white shadow-lg border-2 flex items-center justify-center transform transition-transform"
                style={{borderColor: color}}
            >
              {v.type === 'truck' && <Truck className="w-6 h-6" style={{color}}/>}
              {v.type === 'car' && <Car className="w-6 h-6" style={{color}}/>}
              {v.type === 'motorcycle' && <Bike className="w-6 h-6" style={{color}}/>}
              {v.type === 'van' && <Truck className="w-5 h-5" style={{color}}/>}
            </div>
            {v.speed > 0 && (
                <div className="absolute -bottom-1 -right-1 bg-green-500 text-white text-[8px] font-bold px-1 rounded">
                  {v.speed}
                </div>
            )}
          </div>
      );

      // Update position
      overlay.setPosition(fromLonLat([v.location[1], v.location[0]]));
    });

  }, [vehicles, onVehicleClick]);

  return (
    <div className="w-full h-full relative">
      <div ref={mapElement} className="w-full h-full" />
      
      <div className="absolute bottom-1 right-1 bg-white/80 px-2 py-0.5 text-[10px] text-muted-foreground rounded z-10 pointer-events-none">
        &copy; OpenStreetMap contributors
      </div>
    </div>
  );
}