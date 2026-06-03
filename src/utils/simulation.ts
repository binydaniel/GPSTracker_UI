import { Vehicle } from '../types';

export const simulateMovement = (vehicles: Vehicle[]): Vehicle[] => {
  return vehicles.map(vehicle => {
    if (vehicle.status === 'offline') return vehicle;

    // Small random movement
    const latChange = (Math.random() - 0.5) * 0.001;
    const lngChange = (Math.random() - 0.5) * 0.001;
    
    const newLocation: [number, number] = [
      vehicle.location[0] + latChange,
      vehicle.location[1] + lngChange
    ];

    // Random speed change
    let newSpeed = vehicle.speed;
    if (vehicle.status === 'moving') {
      newSpeed = Math.max(10, Math.min(110, vehicle.speed + (Math.random() - 0.5) * 5));
    } else if (vehicle.status === 'idle') {
      newSpeed = 0;
      if (Math.random() > 0.95) vehicle.status = 'moving';
    }

    // Small fuel/battery consumption
    const newFuel = Math.max(0, vehicle.fuel - (newSpeed > 0 ? 0.01 : 0.001));
    const newBattery = Math.max(0, vehicle.battery - 0.005);

    return {
      ...vehicle,
      location: newLocation,
      speed: Math.round(newSpeed),
      fuel: Math.round(newFuel * 100) / 100,
      battery: Math.round(newBattery * 100) / 100,
      lastPing: new Date().toISOString()
    };
  });
};