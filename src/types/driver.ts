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