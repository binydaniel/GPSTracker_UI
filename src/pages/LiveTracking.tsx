import React from 'react';
import { Map } from '../components/Map';
import { mockVehicles, mockGeofences } from '../utils/mockData';
import { simulateMovement } from '../utils/simulation';
import { Vehicle } from '../types';
import {
  Search,
  Filter,
  Info,
  Navigation,
  Activity,
  Fuel,
  Battery,
  Clock,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ScrollArea } from '../components/ui/scroll-area';
import { Card, CardContent } from '../components/ui/card';

// Define the type local to the file if it's not exported from types
interface ApiLocationData {
  id: number;
  timestamp: string;
  latitude: number;
  longitude: number;
  altitude: number;
  angle: number;
  speed: number;
  satellites: number;
  ignition: boolean;
  movement: boolean;
  externalVoltage: number;
  odometer: number;
}

export default function LiveTracking() {
  const [vehicles, setVehicles] = React.useState<Vehicle[]>(mockVehicles);
  const [apiLocations, setApiLocations] = React.useState<ApiLocationData[]>([]);
  const [selectedVehicle, setSelectedVehicle] = React.useState<Vehicle | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');

  // Note: Updated initial center to match the coordinates returned by your API
  const [mapConfig, setMapConfig] = React.useState<{ center: [number, number]; zoom: number }>({
    center: [9.01377, 38.7101783],
    zoom: 13
  });

  // Fetch real location playback history from the API on mount
  React.useEffect(() => {
    fetch('http://148.66.154.176:8099/api/devices/354017113649335/locations?limit=500')
        .then((res) => {
          if (!res.ok) throw new Error('Network response was not ok');
          return res.json();
        })
        .then((data: ApiLocationData[]) => {
          setApiLocations(data);

          // Optional: Override initial mockup locations with the first track coordinate
          if (data.length > 0) {
            setVehicles(prevVehicles =>
                prevVehicles.map(v => ({
                  ...v,
                  location: [data[0].latitude, data[0].longitude]
                }))
            );
          }
        })
        .catch((err) => console.error('Failed to fetch tracking history:', err));
  }, []);

  // Updated Simulation Loop using API data playback
  React.useEffect(() => {
    // Hold simulation if API data hasn't finished loading yet
    if (apiLocations.length === 0) return;

    const interval = setInterval(() => {
      setVehicles(prev => simulateMovement(prev, apiLocations));
    }, 3000);

    return () => clearInterval(interval);
  }, [apiLocations]);

  // Update selected vehicle data if simulation moves it
  React.useEffect(() => {
    if (selectedVehicle) {
      const updated = vehicles.find(v => v.id === selectedVehicle.id);
      if (updated) setSelectedVehicle(updated);
    }
  }, [vehicles]);

  const filteredVehicles = vehicles.filter(v =>
      v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.plate.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleVehicleSelect = (v: Vehicle) => {
    setSelectedVehicle(v);
    setMapConfig({ center: v.location, zoom: 16 });
  };

  return (
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar List */}
        <div className="w-80 border-r bg-card flex flex-col hidden lg:flex">
          <div className="p-4 border-b space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                  placeholder="Search vehicles..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Filter className="w-3.5 h-3.5 mr-2" />
                Filter
              </Button>
              <Badge variant="secondary" className="px-3">
                {vehicles.length} Total
              </Badge>
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="divide-y">
              {filteredVehicles.map((v) => (
                  <button
                      key={v.id}
                      onClick={() => handleVehicleSelect(v)}
                      className={`w-full text-left p-4 transition-colors hover:bg-muted/50 ${
                          selectedVehicle?.id === v.id ? 'bg-primary/5 border-l-4 border-primary' : ''
                      }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-semibold">{v.name}</div>
                      <Badge variant={v.status === 'moving' ? 'default' : 'secondary'} className="text-[10px] uppercase h-5">
                        {v.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{v.plate}</span>
                      <div className="flex items-center gap-1">
                        <Activity className="w-3 h-3 text-green-500" />
                        <span>{v.speed} km/h</span>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="flex items-center gap-1 text-[10px]">
                        <Fuel className="w-3 h-3" />
                        <span>{v.fuel}%</span>
                      </div>
                      <div className="flex items-center gap-1 text-[10px]">
                        <Battery className="w-3 h-3" />
                        <span>{v.battery}%</span>
                      </div>
                    </div>
                  </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Map Area */}
        <div className="flex-1 relative">
          <Map
              vehicles={vehicles}
              geofences={mockGeofences}
              center={mapConfig.center}
              zoom={mapConfig.zoom}
              onVehicleClick={handleVehicleSelect}
          />

          {/* Floating Details Overlay */}
          {selectedVehicle && (
              <div className="absolute bottom-6 left-6 right-6 lg:left-auto lg:right-6 lg:w-96 z-[1000]">
                <Card className="shadow-2xl border-primary/20 bg-card/95 backdrop-blur">
                  <CardContent className="p-0">
                    <div className="p-4 border-b flex justify-between items-center bg-primary/5">
                      <div>
                        <h3 className="font-bold text-lg">{selectedVehicle.name}</h3>
                        <p className="text-xs text-muted-foreground">{selectedVehicle.plate}</p>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => setSelectedVehicle(null)}>
                        <Info className="w-5 h-5" />
                      </Button>
                    </div>
                    <div className="p-4 grid grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 rounded bg-muted"><Navigation className="w-4 h-4 text-blue-500" /></div>
                          <div>
                            <p className="text-[10px] text-muted-foreground uppercase font-bold">Current Speed</p>
                            <p className="text-sm font-semibold">{selectedVehicle.speed} km/h</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 rounded bg-muted"><Fuel className="w-4 h-4 text-orange-500" /></div>
                          <div>
                            <p className="text-[10px] text-muted-foreground uppercase font-bold">Fuel Level</p>
                            <p className="text-sm font-semibold">{selectedVehicle.fuel}%</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 rounded bg-muted"><Clock className="w-4 h-4 text-purple-500" /></div>
                          <div>
                            <p className="text-[10px] text-muted-foreground uppercase font-bold">Last Ping</p>
                            <p className="text-sm font-semibold">
                              {/* Handles converting ISO timestamp string safely to local clock string */}
                              {new Date(selectedVehicle.lastPing).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 rounded bg-muted"><Battery className="w-4 h-4 text-green-500" /></div>
                          <div>
                            <p className="text-[10px] text-muted-foreground uppercase font-bold">Battery</p>
                            <p className="text-sm font-semibold">{selectedVehicle.battery}%</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border-t bg-muted/20 flex gap-2">
                      <Button variant="default" className="flex-1">Send Command</Button>
                      <Button variant="outline" className="flex-1">View History</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
          )}

          {/* Map Tools */}
          <div className="absolute top-6 right-6 flex flex-col gap-2 z-[1000]">
            <Button variant="secondary" size="icon" className="shadow-md bg-card">
              <TrendingUp className="w-5 h-5" />
            </Button>
            <Button variant="secondary" size="icon" className="shadow-md bg-card">
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
  );
}



// import React from 'react';
// import { Map } from '../components/Map';
// import { mockVehicles, mockGeofences } from '../utils/mockData';
// import { simulateMovement } from '../utils/simulation';
// import { Vehicle } from '../types';
// import {
//   Search,
//   Filter,
//   Info,
//   Navigation,
//   Activity,
//   Fuel,
//   Battery,
//   Clock,
//   ArrowRight,
//   TrendingUp
// } from 'lucide-react';
// import { Input } from '../components/ui/input';
// import { Button } from '../components/ui/button';
// import { Badge } from '../components/ui/badge';
// import { ScrollArea } from '../components/ui/scroll-area';
// import { Card, CardContent } from '../components/ui/card';
//
// export default function LiveTracking() {
//   const [vehicles, setVehicles] = React.useState(mockVehicles);
//   const [selectedVehicle, setSelectedVehicle] = React.useState<Vehicle | null>(null);
//   const [searchQuery, setSearchQuery] = React.useState('');
//   const [mapConfig, setMapConfig] = React.useState<{ center: [number, number]; zoom: number }>({
//     center: [51.505, -0.09],
//     zoom: 13
//   });
//
//   // Simulation loop
//   React.useEffect(() => {
//     const interval = setInterval(() => {
//       setVehicles(prev => simulateMovement(prev));
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);
//
//   // Update selected vehicle data if simulation moves it
//   React.useEffect(() => {
//     if (selectedVehicle) {
//       const updated = vehicles.find(v => v.id === selectedVehicle.id);
//       if (updated) setSelectedVehicle(updated);
//     }
//   }, [vehicles]);
//
//   const filteredVehicles = vehicles.filter(v =>
//     v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     v.plate.toLowerCase().includes(searchQuery.toLowerCase())
//   );
//
//   const handleVehicleSelect = (v: Vehicle) => {
//     setSelectedVehicle(v);
//     setMapConfig({ center: v.location, zoom: 16 });
//   };
//
//   return (
//     <div className="flex h-[calc(100vh-4rem)]">
//       {/* Sidebar List */}
//       <div className="w-80 border-r bg-card flex flex-col hidden lg:flex">
//         <div className="p-4 border-b space-y-4">
//           <div className="relative">
//             <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
//             <Input
//               placeholder="Search vehicles..."
//               className="pl-9"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//           <div className="flex gap-2">
//             <Button variant="outline" size="sm" className="flex-1">
//               <Filter className="w-3.5 h-3.5 mr-2" />
//               Filter
//             </Button>
//             <Badge variant="secondary" className="px-3">
//               {vehicles.length} Total
//             </Badge>
//           </div>
//         </div>
//
//         <ScrollArea className="flex-1">
//           <div className="divide-y">
//             {filteredVehicles.map((v) => (
//               <button
//                 key={v.id}
//                 onClick={() => handleVehicleSelect(v)}
//                 className={`w-full text-left p-4 transition-colors hover:bg-muted/50 ${
//                   selectedVehicle?.id === v.id ? 'bg-primary/5 border-l-4 border-primary' : ''
//                 }`}
//               >
//                 <div className="flex justify-between items-start mb-2">
//                   <div className="font-semibold">{v.name}</div>
//                   <Badge variant={v.status === 'moving' ? 'default' : 'secondary'} className="text-[10px] uppercase h-5">
//                     {v.status}
//                   </Badge>
//                 </div>
//                 <div className="flex items-center justify-between text-xs text-muted-foreground">
//                   <span>{v.plate}</span>
//                   <div className="flex items-center gap-1">
//                     <Activity className="w-3 h-3 text-green-500" />
//                     <span>{v.speed} km/h</span>
//                   </div>
//                 </div>
//                 <div className="mt-2 flex items-center gap-3">
//                    <div className="flex items-center gap-1 text-[10px]">
//                     <Fuel className="w-3 h-3" />
//                     <span>{v.fuel}%</span>
//                   </div>
//                   <div className="flex items-center gap-1 text-[10px]">
//                     <Battery className="w-3 h-3" />
//                     <span>{v.battery}%</span>
//                   </div>
//                 </div>
//               </button>
//             ))}
//           </div>
//         </ScrollArea>
//       </div>
//
//       {/* Map Area */}
//       <div className="flex-1 relative">
//         <Map
//           vehicles={vehicles}
//           geofences={mockGeofences}
//           center={mapConfig.center}
//           zoom={mapConfig.zoom}
//           onVehicleClick={handleVehicleSelect}
//         />
//
//         {/* Floating Details Overlay */}
//         {selectedVehicle && (
//           <div className="absolute bottom-6 left-6 right-6 lg:left-auto lg:right-6 lg:w-96 z-[1000]">
//             <Card className="shadow-2xl border-primary/20 bg-card/95 backdrop-blur">
//               <CardContent className="p-0">
//                 <div className="p-4 border-b flex justify-between items-center bg-primary/5">
//                   <div>
//                     <h3 className="font-bold text-lg">{selectedVehicle.name}</h3>
//                     <p className="text-xs text-muted-foreground">{selectedVehicle.plate}</p>
//                   </div>
//                   <Button variant="ghost" size="icon" onClick={() => setSelectedVehicle(null)}>
//                     <Info className="w-5 h-5" />
//                   </Button>
//                 </div>
//                 <div className="p-4 grid grid-cols-2 gap-4">
//                   <div className="space-y-3">
//                     <div className="flex items-center gap-2">
//                       <div className="p-1.5 rounded bg-muted"><Navigation className="w-4 h-4 text-blue-500" /></div>
//                       <div>
//                         <p className="text-[10px] text-muted-foreground uppercase font-bold">Current Speed</p>
//                         <p className="text-sm font-semibold">{selectedVehicle.speed} km/h</p>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <div className="p-1.5 rounded bg-muted"><Fuel className="w-4 h-4 text-orange-500" /></div>
//                       <div>
//                         <p className="text-[10px] text-muted-foreground uppercase font-bold">Fuel Level</p>
//                         <p className="text-sm font-semibold">{selectedVehicle.fuel}%</p>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="space-y-3">
//                     <div className="flex items-center gap-2">
//                       <div className="p-1.5 rounded bg-muted"><Clock className="w-4 h-4 text-purple-500" /></div>
//                       <div>
//                         <p className="text-[10px] text-muted-foreground uppercase font-bold">Last Ping</p>
//                         <p className="text-sm font-semibold">{new Date(selectedVehicle.lastPing).toLocaleTimeString()}</p>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <div className="p-1.5 rounded bg-muted"><Battery className="w-4 h-4 text-green-500" /></div>
//                       <div>
//                         <p className="text-[10px] text-muted-foreground uppercase font-bold">Battery</p>
//                         <p className="text-sm font-semibold">{selectedVehicle.battery}%</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="p-4 border-t bg-muted/20 flex gap-2">
//                   <Button variant="default" className="flex-1">Send Command</Button>
//                   <Button variant="outline" className="flex-1">View History</Button>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         )}
//
//         {/* Map Tools */}
//         <div className="absolute top-6 right-6 flex flex-col gap-2 z-[1000]">
//           <Button variant="secondary" size="icon" className="shadow-md bg-card">
//             <TrendingUp className="w-5 h-5" />
//           </Button>
//           <Button variant="secondary" size="icon" className="shadow-md bg-card">
//             <ArrowRight className="w-5 h-5" />
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }