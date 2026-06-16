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