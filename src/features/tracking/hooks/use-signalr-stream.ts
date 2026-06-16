import React from 'react';
import { HubConnectionBuilder, HubConnectionState, LogLevel } from '@microsoft/signalr';
import { ApiLocationData, DashboardTrackerData } from '../types';

export function useSignalRStream(
    setTrackerData: React.Dispatch<React.SetStateAction<DashboardTrackerData>>
) {
    React.useEffect(() => {
        const targetImei = "354017113649335";
        let isMounted = true;

        const connection = new HubConnectionBuilder()
            .withUrl("http://localhost:8099/hubs/tracking")
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Warning)
            .build();

        connection.on("LocationUpdate", (updatedLocation: ApiLocationData) => {
            if (!isMounted) return;

            setTrackerData((prev) => ({
                ...prev,
                vehicles: prev.vehicles.map((vehicle) => {
                    if (vehicle.id === targetImei) {
                        return {
                            ...vehicle,
                            location: [updatedLocation.latitude, updatedLocation.longitude],
                            speed: Math.round(updatedLocation.speed),
                            status: updatedLocation.speed > 0 ? 'moving' : 'idle',
                            lastPing: updatedLocation.timestamp
                        };
                    }
                    return vehicle;
                })
            }));
        });

        connection.start()
            .then(() => {
                if (!isMounted) {
                    connection.stop();
                    return;
                }
                if (connection.state === HubConnectionState.Connected) {
                    connection.invoke("Subscribe", targetImei)
                        .then(() => console.log(`Subscribed to telemetry updates for device: ${targetImei}`))
                        .catch(err => console.error("Subscription failed:", err));
                }
            })
            .catch(err => {
                if (isMounted) console.error('SignalR Telemetry initialization failure: ', err);
            });

        return () => {
            isMounted = false;
            connection.off("LocationUpdate");
            connection.stop();
        };
    }, [setTrackerData]);
}