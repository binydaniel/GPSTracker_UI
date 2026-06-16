import { Vehicle, Device } from '@/types';

export interface ApiLocationData {
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
    batteryVoltage: number;
    odometer: number;
}

export interface DashboardTrackerData {
    vehicles: Vehicle[];
    devices: Device[];
    mapConfig: {
        center: [number, number];
        zoom: number;
    };
}