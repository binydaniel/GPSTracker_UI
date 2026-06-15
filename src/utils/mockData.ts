import { Vehicle, Driver, Device, Alert, Geofence } from '@/types';

export const mockUser = {
  name: 'Wubshet',
  role: 'Administrator',
  email: 'wubshet@koyyeegps.com',
  avatar: 'W'
};

export const mockVehicles: Vehicle[] = [
  {
    id: 'v1',
    name: 'Heavy Duty Unit 01',
    plate: 'ABC-1234',
    type: 'truck',
    status: 'moving',
    lastPing: new Date().toISOString(),
    location: [51.505, -0.09],
    speed: 65,
    battery: 85,
    fuel: 70,
    driverId: 'd1',
    deviceId: 'dev1'
  },
  {
    id: 'v2',
    name: 'Express Delivery 05',
    plate: 'XYZ-5678',
    type: 'van',
    status: 'idle',
    lastPing: new Date().toISOString(),
    location: [51.51, -0.1],
    speed: 0,
    battery: 92,
    fuel: 45,
    driverId: 'd2',
    deviceId: 'dev2'
  },
  {
    id: 'v3',
    name: 'Executive Sedan',
    plate: 'LUX-001',
    type: 'car',
    status: 'online',
    lastPing: new Date().toISOString(),
    location: [51.49, -0.12],
    speed: 12,
    battery: 98,
    fuel: 88,
    driverId: 'd3',
    deviceId: 'dev3'
  },
  {
    id: 'v4',
    name: 'Courier Bike 12',
    plate: 'MOTO-99',
    type: 'motorcycle',
    status: 'offline',
    lastPing: new Date(Date.now() - 3600000).toISOString(),
    location: [51.52, -0.08],
    speed: 0,
    battery: 15,
    fuel: 30,
    deviceId: 'dev4'
  }
];

export const mockDrivers: Driver[] = [
  {
    id: 'd1',
    name: 'John Doe',
    phone: '+1 555-0101',
    email: 'john@vtrack.com',
    licenseNumber: 'CDL-98765',
    status: 'active',
    rating: 4.8,
    vehicleId: 'v1'
  },
  {
    id: 'd2',
    name: 'Sarah Smith',
    phone: '+1 555-0102',
    email: 'sarah@vtrack.com',
    licenseNumber: 'REG-12345',
    status: 'active',
    rating: 4.9,
    vehicleId: 'v2'
  },
  {
    id: 'd3',
    name: 'Michael Chen',
    phone: '+1 555-0103',
    email: 'michael@vtrack.com',
    licenseNumber: 'REG-44556',
    status: 'active',
    rating: 4.5,
    vehicleId: 'v3'
  }
];

export const mockDevices: Device[] = [
  { id: 'dev1', imei: '862345001234567', model: 'Teltonika FMB920', status: 'active', installedAt: '2023-01-15', vehicleId: 'v1' },
  { id: 'dev2', imei: '862345001234568', model: 'Teltonika FMB120', status: 'active', installedAt: '2023-02-20', vehicleId: 'v2' },
  { id: 'dev3', imei: '862345001234569', model: 'Teltonika FMT100', status: 'active', installedAt: '2023-03-10', vehicleId: 'v3' },
  { id: 'dev4', imei: '862345001234570', model: 'Queclink GV300', status: 'active', installedAt: '2023-05-05', vehicleId: 'v4' }
];

export const mockAlerts: Alert[] = [
  {
    id: 'a1',
    vehicleId: 'v1',
    vehicleName: 'Heavy Duty Unit 01',
    type: 'speeding',
    severity: 'high',
    message: 'Vehicle exceeded speed limit (85 km/h)',
    timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
    read: false
  },
  {
    id: 'a2',
    vehicleId: 'v2',
    vehicleName: 'Express Delivery 05',
    type: 'geofence',
    severity: 'medium',
    message: 'Vehicle exited Downtown Zone',
    timestamp: new Date(Date.now() - 45 * 60000).toISOString(),
    read: true
  },
  {
    id: 'a3',
    vehicleId: 'v4',
    vehicleName: 'Courier Bike 12',
    type: 'battery',
    severity: 'high',
    message: 'Device battery critically low (5%)',
    timestamp: new Date(Date.now() - 2 * 3600000).toISOString(),
    read: false
  }
];

export const mockGeofences: Geofence[] = [
  {
    id: 'g1',
    name: 'Main Warehouse',
    type: 'circle',
    coordinates: [51.505, -0.09],
    radius: 500,
    color: '#3b82f6',
    active: true
  },
  {
    id: 'g2',
    name: 'Downtown Zone',
    type: 'polygon',
    coordinates: [
      [51.51, -0.1],
      [51.52, -0.1],
      [51.52, -0.12],
      [51.51, -0.12]
    ],
    color: '#ef4444',
    active: true
  }
];