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

export interface Driver {
  id: string;
  name: string;
  phone: string;
  email: string;
  licenseNumber: string;
  status: 'active' | 'on-leave' | 'suspended';
  rating: number;
  vehicleId?: string;
}

export interface Device {
  id: string;
  imei: string;
  model: string;
  status: 'active' | 'inactive';
  installedAt: string;
  vehicleId?: string;
}

export interface Alert {
  id: string;
  vehicleId: string;
  vehicleName: string;
  type: 'speeding' | 'geofence' | 'battery' | 'maintenance' | 'impact';
  severity: 'low' | 'medium' | 'high';
  message: string;
  timestamp: string;
  read: boolean;
}

export interface Geofence {
  id: string;
  name: string;
  type: 'circle' | 'polygon';
  coordinates: any; // Leaflet coordinates
  radius?: number; // for circle
  color: string;
  active: boolean;
}
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
  odometer: number;
}