import React from 'react';
import { DashboardTrackerData } from '../types';
import { Vehicle, ApiDeviceResponse } from '@/types';

export function useLiveData(
    setTrackerData: React.Dispatch<React.SetStateAction<DashboardTrackerData>>,
    setIsLoading: (loading: boolean) => void
) {
    React.useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;

        setIsLoading(true);

        // 1. Fetch devices list first
        fetch(`${import.meta.env.VITE_API_URL}/api/devices`, { signal })
            .then(res => res.ok ? res.json() : Promise.reject('Devices fetch failed'))
            .then(async (devicesData: ApiDeviceResponse[]) => {
                const safeDevices = Array.isArray(devicesData) ? devicesData : [];

                // 2. Map devices to individual location promises
                const locationPromises = safeDevices.map(device =>
                    fetch(`${import.meta.env.VITE_API_URL}/api/devices/${device.imei}/locations?limit=1`, { signal })
                        .then(res => res.ok ? res.json() : Promise.reject(`Location fetch failed for ${device.imei}`))
                        .then(data => {
                            // CRITICAL FIX: Explicitly inject the current device imei into the location object body
                            // because the API payload doesn't return an imei property natively!
                            if (Array.isArray(data) && data.length > 0) {
                                return { ...data[0], trackingImei: device.imei };
                            }
                            return null;
                        })
                        .catch(err => {
                            console.error(err);
                            return null;
                        })
                );

                const allLocationsResults = await Promise.all(locationPromises);
                // Cleanly strip out both explicit nulls and caught fetch rejections
                const safeLocations = allLocationsResults.filter(loc => loc !== null && loc !== undefined);

                let vehicles: Vehicle[] = [];
                let mapConfig = null;

                // 3. Build vehicles list
                vehicles = safeDevices.map((device) => {
                    // Match using our custom injected token property 'trackingImei'
                    const deviceTelemetry = safeLocations.find(loc => loc?.trackingImei === device.imei);

                    const rawMilliVolts = deviceTelemetry?.batteryVoltage || 3600;
                    const batteryPercentage = Math.round(((rawMilliVolts - 3600) / (4200 - 3600)) * 100);

                    // Explicitly force coordinates to be float numbers
                    const lat = deviceTelemetry?.latitude ? parseFloat(deviceTelemetry.latitude) : 0;
                    const lng = deviceTelemetry?.longitude ? parseFloat(deviceTelemetry.longitude) : 0;

                    const hasValidLocation = lat !== 0 && lng !== 0 && !isNaN(lat) && !isNaN(lng);

                    return {
                        id: device.imei,
                        deviceId: device.imei,
                        type: "car",
                        name: device.name || `Device (${device.imei.slice(-4)})`,
                        plate: "C-02-10001",
                        fuel: 0,
                        status: deviceTelemetry && hasValidLocation
                            ? (deviceTelemetry.movement ? 'moving' : 'idle')
                            : 'offline',
                        location: [lat, lng],
                        speed: deviceTelemetry ? Math.round(deviceTelemetry.speed) : 0,
                        battery: batteryPercentage,
                        lastPing: deviceTelemetry ? deviceTelemetry.timestamp : device.lastSeen,
                        currentHistoryIndex: 0
                    };
                });

                // Focus the map on the first vehicle that actually has valid, live GPS data
                const activeVehicles = vehicles.filter(v => v.location[0] !== 0 && v.location[1] !== 0);
                if (activeVehicles.length > 0) {
                    mapConfig = {
                        center: [activeVehicles[0].location[0], activeVehicles[0].location[1]] as [number, number],
                        zoom: 12
                    };
                }

                setTrackerData((prev) => ({
                    vehicles,
                    devices: safeDevices.map(d => ({
                        deviceId: d.imei,
                        name: d.name || "Unnamed",
                        firstSeen: d.firstSeen,
                        lastSeen: d.lastSeen
                    })),
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

