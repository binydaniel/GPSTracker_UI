import React from 'react';
import { 
  Truck, 
  AlertTriangle, 
  // MapPin,
  TrendingUp,
  Activity,
  Fuel,
  // Battery
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  // LineChart,
  // Line,
  AreaChart,
  Area
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { mockVehicles, mockAlerts } from '../../../mockData.ts';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';

const fuelData = [
  { name: 'Mon', usage: 450 },
  { name: 'Tue', usage: 520 },
  { name: 'Wed', usage: 480 },
  { name: 'Thu', usage: 610 },
  { name: 'Fri', usage: 590 },
  { name: 'Sat', usage: 320 },
  { name: 'Sun', usage: 210 },
];

const activityData = [
  { time: '00:00', active: 5 },
  { time: '04:00', active: 3 },
  { time: '08:00', active: 18 },
  { time: '12:00', active: 22 },
  { time: '16:00', active: 20 },
  { time: '20:00', active: 12 },
  { time: '23:59', active: 7 },
];

export default function Dashboard() {
  const stats = [
    { label: 'Total Fleet', value: mockVehicles.length, icon: Truck, color: 'text-blue-500' },
    { label: 'Moving Now', value: mockVehicles.filter(v => v.status === 'moving').length, icon: Activity, color: 'text-green-500' },
    { label: 'Critical Alerts', value: mockAlerts.filter(a => a.severity === 'high').length, icon: AlertTriangle, color: 'text-red-500' },
    { label: 'Avg Efficiency', value: '88%', icon: TrendingUp, color: 'text-purple-500' },
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
              </div>
              <div className={`p-3 rounded-full bg-muted ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Fleet Activity Trends</CardTitle>
            <CardDescription>Number of active vehicles over the last 24 hours</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData}>
                <defs>
                  <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="active" 
                  stroke="var(--primary)" 
                  fillOpacity={1} 
                  fill="url(#colorActive)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Alerts Sidebar */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Alerts</CardTitle>
              <CardDescription>Latest system notifications</CardDescription>
            </div>
            <Badge variant="outline">{mockAlerts.length}</Badge>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-4">
                {mockAlerts.map((alert) => (
                  <div key={alert.id} className="flex gap-3 border-b pb-4 last:border-0">
                    <div className={`mt-1 p-2 rounded-full ${
                      alert.severity === 'high' ? 'bg-red-100 text-red-600' : 
                      alert.severity === 'medium' ? 'bg-orange-100 text-orange-600' : 
                      'bg-blue-100 text-blue-600'
                    }`}>
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{alert.vehicleName}</p>
                      <p className="text-xs text-muted-foreground mb-1">{alert.message}</p>
                      <p className="text-[10px] text-muted-foreground">
                        {new Date(alert.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fuel Consumption */}
        <Card>
          <CardHeader>
            <CardTitle>Fuel Consumption (L)</CardTitle>
            <CardDescription>Daily usage across the entire fleet</CardDescription>
          </CardHeader>
          <CardContent className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={fuelData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="usage" fill="var(--primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Vehicle Status Table */}
        <Card>
          <CardHeader>
            <CardTitle>Fleet Status Overview</CardTitle>
            <CardDescription>Current state of key vehicles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockVehicles.slice(0, 4).map((v) => (
                <div key={v.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded bg-muted`}>
                      <Truck className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{v.name}</p>
                      <p className="text-xs text-muted-foreground">{v.plate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-1 text-xs">
                        <Fuel className="w-3 h-3" />
                        <span>{v.fuel}%</span>
                      </div>
                      <div className="w-16 h-1.5 bg-muted rounded-full mt-1 overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${v.fuel < 20 ? 'bg-red-500' : 'bg-green-500'}`} 
                          style={{ width: `${v.fuel}%` }} 
                        />
                      </div>
                    </div>
                    <Badge variant={v.status === 'moving' ? 'default' : 'secondary'} className="capitalize">
                      {v.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}