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
