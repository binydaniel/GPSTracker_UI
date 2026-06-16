export interface Geofence {
    id: string;
    name: string;
    type: 'circle' | 'polygon';
    coordinates: any;
    radius?: number;
    color: string;
    active: boolean;
}
