import React from 'react';
import {NavLink, Outlet, useLocation} from 'react-router';
import {
  Bell, ChevronRight, Cpu, FileText, Info, MapIcon,
  Menu, Settings, Truck, Users, X,
} from 'lucide-react';
import { Button } from './ui/button';
import { useIsMobile } from '../hooks/use-mobile';
import { toast } from 'sonner';
import { mockUser } from '../../mockData';
import {ScrollArea} from "@radix-ui/react-scroll-area";

const navItems = [
  // { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Live Tracking', path: '/', icon: MapIcon },
  { name: 'Fleet', path: '/fleet', icon: Truck },
  { name: 'Drivers', path: '/drivers', icon: Users },
  { name: 'Devices', path: '/devices', icon: Cpu },
  { name: 'Alerts', path: '/alerts', icon: Bell },
  { name: 'Reports', path: '/reports', icon: FileText },
  { name: 'Documentation', path: '/docs', icon: Info },
];

export function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const isMobile = useIsMobile();
  const location = useLocation();

  React.useEffect(() => {
    if (isMobile) setIsSidebarOpen(false);
  }, [isMobile, location.pathname]);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
       {/*Sidebar*/}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-card border-r transition-transform duration-300 ease-in-out
          lg:relative lg:translate-x-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">
          <div className="h-16 flex items-center px-6 border-b">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Truck className="text-primary-foreground w-5 h-5" />
              </div>
              <span className="font-bold text-xl tracking-tight">Koyyee GPS</span>
            </div>
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                className="ml-auto"
                onClick={() => setIsSidebarOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            )}
          </div>

          <ScrollArea className="flex-1 py-4 px-3">
            <nav className="space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-3 py-2 rounded-md transition-colors
                    ${isActive 
                      ? 'bg-primary text-primary-foreground shadow-sm' 
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'}
                  `}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                  {location.pathname === item.path && (
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  )}
                </NavLink>
              ))}
            </nav>
          </ScrollArea>

          <div className="p-4 border-t mt-auto">
            <NavLink
              to="/settings"
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2 rounded-md transition-colors
                ${isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'}
              `}
            >
              <Settings className="w-5 h-5" />
              <span className="font-medium">Settings</span>
            </NavLink>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 flex items-center justify-between px-6 border-b bg-card">
          <div className="flex items-center gap-4">
            {!isSidebarOpen && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden"
              >
                <Menu className="w-5 h-5" />
              </Button>
            )}
            <h1 className="text-lg font-semibold capitalize">
              {location.pathname === '/' ? 'Overview' : location.pathname.split('/')[1].replace('-', ' ')}
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative" onClick={() => toast.info("No new notifications")}>
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full" />
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium hidden md:block">{mockUser.name}</span>
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center font-medium text-accent-foreground">
                {mockUser.avatar}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-muted/30">
          <Outlet />
        </main>
      </div>
    </div>
  );
}