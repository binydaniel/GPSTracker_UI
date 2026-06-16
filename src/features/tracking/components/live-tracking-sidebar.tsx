import React from 'react';
import { Search, Filter, Activity, Battery } from 'lucide-react';
import { Vehicle } from '@/types';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ScrollArea } from '../components/ui/scroll-area';

interface LiveTrackingSidebarProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    filteredVehicles: Vehicle[];
    selectedVehicle: Vehicle | null;
    handleVehicleSelect: (vehicle: Vehicle) => void;
    totalVehicles: number;
    isLoading: boolean;
}

export function LiveTrackingSidebar({
                                        searchQuery,
                                        setSearchQuery,
                                        filteredVehicles,
                                        selectedVehicle,
                                        handleVehicleSelect,
                                        totalVehicles,
                                        isLoading,
                                    }: LiveTrackingSidebarProps) {
    return (
        <div className="w-80 border-r bg-card flex flex-col hidden lg:flex">
            <div className="p-4 border-b space-y-4">
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search vehicles..."
                        className="pl-9"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                        <Filter className="w-3.5 h-3.5 mr-2" />
                        Filter
                    </Button>
                    <Badge variant="secondary" className="px-3">
                        {totalVehicles} Active
                    </Badge>
                </div>
            </div>

            <ScrollArea className="flex-1">
                <div className="divide-y">
                    {filteredVehicles.map((v) => (
                        <button
                            key={v.id}
                            onClick={() => handleVehicleSelect(v)}
                            className={`w-full text-left p-4 transition-colors hover:bg-muted/50 ${
                                selectedVehicle?.id === v.id ? 'bg-primary/5 border-l-4 border-primary' : ''
                            }`}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <div className="font-semibold">{v.name}</div>
                                <Badge variant={v.status === 'moving' ? 'default' : 'secondary'} className="text-[10px] uppercase h-5">
                                    {v.status}
                                </Badge>
                            </div>
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <span>{v.plate}</span>
                                <div className="flex items-center gap-1">
                                    <Activity className="w-3 h-3 text-green-500" />
                                    <span>{v.speed} km/h</span>
                                </div>
                            </div>
                            <div className="mt-2 flex items-center gap-3">
                                <div className="flex items-center gap-1 text-[10px]">
                                    <Battery className="w-3 h-3" />
                                    <span>{v.battery}%</span>
                                </div>
                            </div>
                        </button>
                    ))}
                    {!isLoading && totalVehicles === 0 && (
                        <div className="p-4 text-center text-sm text-muted-foreground">
                            No active vehicles found.
                        </div>
                    )}
                </div>
            </ScrollArea>
        </div>
    );
}