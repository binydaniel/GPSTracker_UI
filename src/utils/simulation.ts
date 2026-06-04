import {ApiLocationData, Vehicle} from '../types';

export const simulateMovement = (
    vehicles: Vehicle[],
    apiLocations: ApiLocationData[]
): Vehicle[] => {
  if(!apiLocations || apiLocations.length ===0) return vehicles;

  return vehicles.map(vehicle => {
    if(vehicle.status === 'offline') return vehicle;

    const currentIndex = vehicle.currentHistoryIndex ?? 0;
    const nextIndex = currentIndex + 1 < apiLocations.length ? currentIndex + 1 : 0;

    const historicalData = apiLocations[nextIndex];

    const newLocation: [number, number] = [
        historicalData.latitude,
        historicalData.longitude
        ];

    const newSpeed = historicalData.speed;
    let currentStatus = vehicle.status;
    if(newSpeed > 0) {
      currentStatus = 'moving';
    } else if(newSpeed === 0 && historicalData.ignition) {
      currentStatus = 'idle';
    }

    const newFuel = Math.max(0, vehicle.fuel - (newSpeed > 0 ? 0.01 : 0.001));
    const newBattery = Math.max(0, vehicle.battery - 0.005);

    return {
      ...vehicle,
      status: currentStatus,
      location: newLocation,
      speed: Math.round(newSpeed),
      fuel: Math.round(newFuel * 100)/100,
      battery: Math.round(newBattery * 100)/100,
      lastPing: historicalData.timestamp,
      currentHistoryIndex:nextIndex
    };

  })
};

// export const simulateMovement = (vehicles: Vehicle[]): Vehicle[] => {
//   return vehicles.map(vehicle => {
//     if (vehicle.status === 'offline') return vehicle;
//
//     // Small random movement
//     const latChange = (Math.random() - 0.5) * 0.001;
//     const lngChange = (Math.random() - 0.5) * 0.001;
//
//     const newLocation: [number, number] = [
//       vehicle.location[0] + latChange,
//       vehicle.location[1] + lngChange
//     ];
//
//     // Random speed change
//     let newSpeed = vehicle.speed;
//     if (vehicle.status === 'moving') {
//       newSpeed = Math.max(10, Math.min(110, vehicle.speed + (Math.random() - 0.5) * 5));
//     } else if (vehicle.status === 'idle') {
//       newSpeed = 0;
//       if (Math.random() > 0.95) vehicle.status = 'moving';
//     }
//
//     // Small fuel/battery consumption
//     const newFuel = Math.max(0, vehicle.fuel - (newSpeed > 0 ? 0.01 : 0.001));
//     const newBattery = Math.max(0, vehicle.battery - 0.005);
//
//     return {
//       ...vehicle,
//       location: newLocation,
//       speed: Math.round(newSpeed),
//       fuel: Math.round(newFuel * 100) / 100,
//       battery: Math.round(newBattery * 100) / 100,
//       lastPing: new Date().toISOString()
//     };
//   });
// };