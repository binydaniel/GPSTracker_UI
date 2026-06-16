import React from 'react';
import { Loader2, TrendingUp, ArrowRight } from 'lucide-react';
import { Vehicle } from '@/types';

// UI Modules & Custom Subcomponents

import { Map } from '../tracking/components/Map';
import { Button } from '../tracking/components/ui/button';
import { mockGeofences } from '../mockData.ts';
import { LiveTrackingSidebar } from './components/live-tracking-sidebar';
import { VehicleDetailsCard } from './components/vehicle-details-card';

// Feature-Specific State Hooks & Types
import { DashboardTrackerData } from './types';
import { useLiveData } from './hooks/use-live-data';
import { useSignalRStream } from './hooks/use-signalr-stream';

export default function LiveTracking() {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [selectedVehicle, setSelectedVehicle] = React.useState<Vehicle | null>(null);

    const [trackerData, setTrackerData] = React.useState<DashboardTrackerData>({
        vehicles: [],
        devices: [],
        mapConfig: {
            center: [9.01377, 38.7101783],
            zoom: 13,
        },
    });

    // Execute Core Pipeline Integration Hooks
    useLiveData(setTrackerData, setIsLoading);
    useSignalRStream(setTrackerData);

    // Sync selected vehicle details when wire updates arrives
    React.useEffect(() => {

        // console.log("device",JSON.stringify(trackerData.devices, null, 2))
        // console.log("vehicle",JSON.stringify(trackerData.vehicles, null, 2))

        if (selectedVehicle) {
            const updated = trackerData.vehicles.find(v => v.id === selectedVehicle.id);
            if (updated) setSelectedVehicle(updated);
        }
    }, [trackerData.vehicles, selectedVehicle]);

    // Handle Action Triggers
    const filteredVehicles = trackerData.vehicles.filter(v =>
        v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.plate.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleVehicleSelect = (v: Vehicle) => {
        setSelectedVehicle(v);
        setTrackerData(prev => ({
            ...prev,
            mapConfig: { center: v.location, zoom: 16 }
        }));
    };
    return (
        <div className="flex h-[calc(100vh-4rem)]">
            <LiveTrackingSidebar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                filteredVehicles={filteredVehicles}
                selectedVehicle={selectedVehicle}
                handleVehicleSelect={handleVehicleSelect}
                totalVehicles={trackerData.vehicles.length}
                isLoading={isLoading}
            />

            <div className="flex-1 relative">
                <Map
                    vehicles={trackerData.vehicles}
                    geofences={mockGeofences}
                    center={trackerData.mapConfig.center}
                    zoom={trackerData.mapConfig.zoom}
                    onVehicleClick={handleVehicleSelect}
                />

                {isLoading && (
                    <div className="absolute inset-0 z-[2000] flex flex-col items-center justify-center bg-background/40 backdrop-blur-sm">
                        <div className="flex flex-col items-center gap-2 p-4 bg-background/90 rounded-xl shadow-lg border border-border">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            <span className="text-xs font-medium text-muted-foreground">Locating vehicles...</span>
                        </div>
                    </div>
                )}

                {selectedVehicle && (
                    <VehicleDetailsCard
                        selectedVehicle={selectedVehicle}
                        setSelectedVehicle={setSelectedVehicle}
                    />
                )}

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