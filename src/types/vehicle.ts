export interface Vehicle {
    id: string;
    name: string;
    plate: string;
    type: 'truck' | 'car' | 'van' | 'motorcycle';
    status: 'online' | 'offline' | 'moving' | 'idle';
    lastPing: string;
    location: [number, number];
    speed: number;
    battery: number;
    fuel: number;
    driverId?: string;
    deviceId: string;
    currentHistoryIndex?: number;
}
