import React from 'react';
import { Navigation, Clock, Battery, XCircle } from 'lucide-react';
import { Vehicle } from '@/types';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

interface VehicleDetailsCardProps {
    selectedVehicle: Vehicle;
    setSelectedVehicle: (vehicle: Vehicle | null) => void;
}

export function VehicleDetailsCard({ selectedVehicle, setSelectedVehicle }: VehicleDetailsCardProps) {
    return (
        <div className="absolute bottom-6 left-6 right-6 lg:left-auto lg:right-6 lg:w-96 z-[1000]">
            <Card className="shadow-2xl border-primary/20 bg-card/95 backdrop-blur">
                <CardContent className="p-0">
                    <div className="p-4 border-b flex justify-between items-center bg-primary/5">
                        <div>
                            <h3 className="font-bold text-lg">{selectedVehicle.name}</h3>
                            <p className="text-xs text-muted-foreground">{selectedVehicle.plate}</p>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => setSelectedVehicle(null)}>
                            <XCircle className="w-5 h-5" />
                        </Button>
                    </div>

                    <div className="p-4 grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 rounded bg-muted"><Navigation className="w-4 h-4 text-blue-500" /></div>
                                <div>
                                    <p className="text-[10px] text-muted-foreground uppercase font-bold">Current Speed</p>
                                    <p className="text-sm font-semibold">{selectedVehicle.speed} km/h</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 rounded bg-muted"><Clock className="w-4 h-4 text-purple-500" /></div>
                                <div>
                                    <p className="text-[10px] text-muted-foreground uppercase font-bold">Last Ping</p>
                                    <p className="text-sm font-semibold">
                                        {selectedVehicle?.lastPing && new Date(selectedVehicle.lastPing).toLocaleTimeString()}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 rounded bg-muted"><Battery className="w-4 h-4 text-green-500" /></div>
                                <div>
                                    <p className="text-[10px] text-muted-foreground uppercase font-bold">Battery</p>
                                    <p className="text-sm font-semibold">{selectedVehicle.battery}%</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 border-t bg-muted/20 flex gap-2">
                        <Button variant="default" className="flex-1">View History</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}