import React from 'react';
import { 
  // FileText,
  Download, 
  Layers, 
  Settings2, 
  BarChart4, 
  Map as MapIcon,
  ShieldCheck,
  Zap,
  LayoutTemplate
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../features/tracking/components/ui/card';
import { Button } from '../features/tracking/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/features/tracking/components/ui/tabs.tsx';

export default function Documentation() {
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-12 py-12">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Project Proposal & Specifications</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Detailed overview of the V-Track Pro fleet management system architecture and capabilities.
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <Button size="lg">
            <Download className="mr-2 w-4 h-4" />
            Download PDF
          </Button>
          <Button size="lg" variant="outline">
            Contact Sales
          </Button>
        </div>
      </section>

      <Tabs defaultValue="proposal" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="proposal">Executive Proposal</TabsTrigger>
          <TabsTrigger value="functional">Functional Spec</TabsTrigger>
          <TabsTrigger value="design">Design Document</TabsTrigger>
        </TabsList>

        <TabsContent value="proposal" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Executive Summary</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate dark:prose-invert max-w-none">
              <p>
                <strong>V-Track Pro</strong> is a next-generation telematics and fleet management platform designed to provide
                unprecedented visibility into mobile assets. Inspired by industry leaders like Advento and Teltonika, 
                our solution bridges the gap between hardware sensor data and actionable business intelligence.
              </p>
              <h3 className="text-lg font-bold mt-6 mb-2">Key Value Propositions</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none pl-0">
                <li className="bg-muted p-4 rounded-lg">
                  <strong className="text-primary block mb-1">Operational Efficiency</strong>
                  Reduce fuel waste and idle time by up to 15% through optimized routing and driver behavior monitoring.
                </li>
                <li className="bg-muted p-4 rounded-lg">
                  <strong className="text-primary block mb-1">Safety & Compliance</strong>
                  Automated ELD logging and real-time accident reconstruction to minimize liability and improve driver safety.
                </li>
                <li className="bg-muted p-4 rounded-lg">
                  <strong className="text-primary block mb-1">Predictive Maintenance</strong>
                  Leverage engine diagnostics (CAN-bus) to predict failures before they happen, reducing downtime.
                </li>
                <li className="bg-muted p-4 rounded-lg">
                  <strong className="text-primary block mb-1">Scalable Infrastructure</strong>
                  Built on cloud-native technology capable of handling 100,000+ simultaneous device connections.
                </li>
              </ul>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="pt-6 text-center">
                <h4 className="text-3xl font-bold">25%</h4>
                <p className="text-sm opacity-90">Reduction in Fuel Costs</p>
              </CardContent>
            </Card>
            <Card className="bg-blue-600 text-white">
              <CardContent className="pt-6 text-center">
                <h4 className="text-3xl font-bold">40%</h4>
                <p className="text-sm opacity-90">Improvement in Route Efficiency</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-900 text-white">
              <CardContent className="pt-6 text-center">
                <h4 className="text-3xl font-bold">12mo</h4>
                <p className="text-sm opacity-90">Average ROI Period</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="functional" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapIcon className="w-5 h-5 text-primary" />
                  Real-time Tracking
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <ul className="list-disc pl-5 space-y-2">
                  <li>High-frequency GPS polling (up to 1s intervals)</li>
                  <li>Live map visualization with traffic overlays</li>
                  <li>Historical trip playback with sensor data synchronization</li>
                  <li>Multi-vehicle group tracking and clustering</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  Geofencing & Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Circular and polygonal geofence drawing tools</li>
                  <li>Entry/Exit alerts via Push, SMS, and Email</li>
                  <li>Speeding and harsh braking detection</li>
                  <li>Tamper alerts for hardware disconnection</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart4 className="w-5 h-5 text-primary" />
                  Advanced Analytics
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Customizable dashboard with drag-and-drop widgets</li>
                  <li>Automated weekly and monthly fleet performance reports</li>
                  <li>Fuel theft detection and consumption heatmaps</li>
                  <li>Driver leaderboard and safety scoring</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  Integration Engine
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <ul className="list-disc pl-5 space-y-2">
                  <li>RESTful API for ERP and CRM integration</li>
                  <li>Webhooks for real-time data streaming</li>
                  <li>Support for 500+ tracking protocols (Teltonika, Queclink, etc.)</li>
                  <li>LDAP/SSO support for enterprise security</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="design" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Architecture Stack</CardTitle>
              <CardDescription>Modern technologies for high performance and reliability</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded bg-primary/10 text-primary">
                    <LayoutTemplate className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="font-bold">Frontend (Web & Mobile)</h5>
                    <p className="text-sm text-muted-foreground">
                      React 19 with Vite for lightning-fast delivery. Tailwind CSS for responsive design, 
                      Framer Motion for fluid animations, and Leaflet.js for performant mapping.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 rounded bg-primary/10 text-primary">
                    <Layers className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="font-bold">Backend Infrastructure</h5>
                    <p className="text-sm text-muted-foreground">
                      Distributed microservices architecture using Node.js/Go. Redis for high-speed cache
                      and TimescaleDB (PostgreSQL) for optimized time-series tracking data storage.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 rounded bg-primary/10 text-primary">
                    <Settings2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="font-bold">Design Language</h5>
                    <p className="text-sm text-muted-foreground">
                      Clean, professional UI with a focus on data density and legibility. Dark-mode 
                      support by default, high-contrast alerts, and accessibility (WCAG 2.1) compliance.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <section className="bg-muted rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold">Ready to modernize your fleet?</h2>
          <p className="text-muted-foreground">Schedule a live demo with one of our telematics experts today.</p>
        </div>
        <Button size="lg" className="px-8">Request a Demo</Button>
      </section>
    </div>
  );
}