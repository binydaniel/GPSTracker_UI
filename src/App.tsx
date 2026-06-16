import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Layout } from './features/components/Layout';
import {Layout } from './features/tracking/components/Layout'
// import LiveTracking from './pages/LiveTracking';
import LiveTracking from './features/tracking/index';
import { Toaster } from 'sonner';

// Placeholder pages for other routes
// const Placeholder = ({ title }: { title: string }) => (
//   <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-12">
//     <div className="text-4xl font-bold mb-4">{title}</div>
//     <p>This module is under development as per the implementation plan.</p>
//   </div>
// );

function App() {
  useEffect(() => {
    document.title = 'Koyyee GPS';
  }, []);

  return (
    <Router>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route element={<Layout />}>
          {/*<Route path="/" element={<Dashboard />} />*/}
          <Route path="/" element={<LiveTracking />} />
          {/*<Route path="/fleet" element={<FleetManagement />} />*/}
          {/*<Route path="/drivers" element={<Placeholder title="Driver Management" />} />*/}
          {/*<Route path="/devices" element={<Placeholder title="Device Inventory" />} />*/}
          {/*<Route path="/alerts" element={<Placeholder title="Alert Log" />} />*/}
          {/*<Route path="/reports" element={<Placeholder title="Reports & Analytics" />} />*/}
          {/*<Route path="/docs" element={<Documentation />} />*/}
          {/*<Route path="/settings" element={<Placeholder title="System Settings" />} />*/}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;