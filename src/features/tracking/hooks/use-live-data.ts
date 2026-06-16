import React from 'react';
import { ApiLocationData, DashboardTrackerData } from '../types';
import { Vehicle, Device, ApiDeviceResponse } from '@/types';

export function useLiveData(
    setTrackerData: React.Dispatch<React.SetStateAction<DashboardTrackerData>>,
    setIsLoading: (loading: boolean) => void
) {
    React.useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;

        setIsLoading(true);

        const fetchLocations = fetch('http://localhost:8099/api/devices/354017113649335/locations?limit=1', { signal })
            .then(res => res.ok ? res.json() : Promise.reject('Location fetch failed'));

        const fetchDevices = fetch('http://localhost:8099/api/devices', { signal })
            .then(res => res.ok ? res.json() : Promise.reject('Devices fetch failed'));

        Promise.all([fetchLocations, fetchDevices])
            .then(([locationData, devicesData]: [ApiLocationData[], ApiDeviceResponse[]]) => {
                let vehicles: Vehicle[] = [];
                let mapConfig = null;

                const rawMilliVolts = locationData[0].batteryVoltage || 3600;
                const batteryPercentage = Math.round(((rawMilliVolts - 3600) / (4200 - 3600)) * 100);

                if (locationData && locationData.length > 0) {
                    vehicles = [{
                        id: "354017113649335",
                        deviceId: "354017113649335",
                        type: "car",
                        name: "Wube",
                        plate: "AA-C1000",
                        fuel: 0,
                        status: locationData[0].movement ? 'moving' : 'idle',
                        location: [locationData[0].latitude, locationData[0].longitude],
                        speed: Math.round(locationData[0].speed),
                        battery: batteryPercentage,
                        lastPing: locationData[0].timestamp,
                        currentHistoryIndex: 0
                    }];

                    mapConfig = {
                        center: [locationData[0].latitude, locationData[0].longitude] as [number, number],
                        zoom: 15
                    };
                }

                const mappedDevices: Device[] = Array.isArray(devicesData)
                    ? devicesData.map((device) => ({
                        deviceId: device.imei,
                        name: device.name ,
                        firstSeen: device.firstseen,
                        lastSeen: device.lastseen,
                    }))
                    : [];

                setTrackerData((prev) => ({
                    vehicles,
                    devices: mappedDevices,
                    mapConfig: mapConfig ? mapConfig : prev.mapConfig
                }));
            })
            .catch((err) => {
                if (err.name === 'AbortError') return;
                console.error('Failed to aggregate tracking data:', err);
            })
            .finally(() => {
                if (!signal.aborted) {
                    setIsLoading(false);
                }
            });

        return () => controller.abort();
    }, [setTrackerData, setIsLoading]);
}