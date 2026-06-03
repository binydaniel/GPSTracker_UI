import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../components/ui/table';
import { mockVehicles } from '../utils/mockData';
import { Truck, Search, Plus, MoreVertical, Filter, Download } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

export default function FleetManagement() {
  const [search, setSearch] = React.useState('');

  const filtered = mockVehicles.filter(v => 
    v.name.toLowerCase().includes(search.toLowerCase()) || 
    v.plate.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Fleet Management</h1>
          <p className="text-muted-foreground">Manage your vehicles, assign drivers and monitor status.</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Vehicle
          </Button>
        </div>
      </div>

      <div className="bg-card rounded-xl border shadow-sm">
        <div className="p-4 border-b flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search by name or plate..." 
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Button variant="outline" size="sm">
              <Filter className="w-3.5 h-3.5 mr-2" />
              All Types
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="w-3.5 h-3.5 mr-2" />
              All Status
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table className="w-full text-sm text-left">
            <TableHeader className="text-xs text-muted-foreground uppercase bg-muted/50">
              <TableRow>
                <TableHead className="px-6 py-3 font-medium">Vehicle</TableHead>
                <TableHead className="px-6 py-3 font-medium">Type</TableHead>
                <TableHead className="px-6 py-3 font-medium">Status</TableHead>
                <TableHead className="px-6 py-3 font-medium">Driver</TableHead>
                <TableHead className="px-6 py-3 font-medium">Fuel</TableHead>
                <TableHead className="px-6 py-3 font-medium">Last Update</TableHead>
                <TableHead className="px-6 py-3 font-medium text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y">
              {filtered.map((v) => (
                <TableRow key={v.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded bg-muted/50">
                        <Truck className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold">{v.name}</div>
                        <div className="text-xs text-muted-foreground uppercase">{v.plate}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4 capitalize">{v.type}</TableCell>
                  <TableCell className="px-6 py-4">
                    <Badge variant={
                      v.status === 'moving' ? 'default' : 
                      v.status === 'idle' ? 'secondary' : 
                      'outline'
                    } className="capitalize">
                      {v.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-6 py-4">{v.driverId ? 'John Doe' : 'Unassigned'}</TableCell>
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${v.fuel < 20 ? 'bg-red-500' : 'bg-green-500'}`} 
                          style={{ width: `${v.fuel}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium">{v.fuel}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-muted-foreground">
                    {new Date(v.lastPing).toLocaleTimeString()}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-right">
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="p-4 border-t flex items-center justify-between text-xs text-muted-foreground">
          <p>Showing {filtered.length} of {mockVehicles.length} vehicles</p>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" disabled>Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
}