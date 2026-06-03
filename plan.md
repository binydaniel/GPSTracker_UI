# V-Track Pro: Vehicle Tracking Management System

## 1. Project Definition
**V-Track Pro** is a comprehensive telematics and fleet management platform designed to provide real-time visibility, operational efficiency, and advanced analytics for commercial vehicle fleets. Inspired by industry-leading solutions like Advento and Teltonika, the system bridges the gap between raw GPS data and actionable business intelligence.

The platform serves as a centralized hub for fleet managers to monitor vehicle locations, analyze driver behavior, manage hardware inventory (tracking devices), and ensure safety through automated alerting systems.

## 2. Project Scope
The project encompasses the following core functional areas:

### 2.1 Live Tracking & Geospatial Services
- **Real-time Map Visualization**: High-performance map interface using Leaflet/OpenStreetMap.
- **Vehicle Status Monitoring**: Real-time updates on speed, ignition status, fuel levels, and battery health.
- **Geofencing**: Tools to define polygonal or circular geographic boundaries with automated entry/exit alerts.
- **Trip History Playback**: Visual reconstruction of historical routes with synchronized sensor data.

### 2.2 Fleet & Resource Management
- **Vehicle Inventory**: Comprehensive database for vehicle specifications, maintenance schedules, and assignments.
- **Driver Profiles**: Management of driver licenses, contact info, and performance scoring.
- **Device Management**: Tracking of hardware assets (IMEI, model types) and their association with vehicles.

### 2.3 Analytics & Intelligence
- **Dashboard Overviews**: High-level visualizations of fleet utilization, fuel consumption, and alert distributions.
- **Automated Reporting**: Generation of reports for mileage, idling time, and speeding violations.
- **Driver Behavior Scoring**: Metrics based on harsh braking, rapid acceleration, and speeding.

### 2.4 System Administration
- **Alert Configuration**: Customizable notification rules for various system events.
- **User Management**: Role-based access control (RBAC) for different administrative levels.
- **Settings**: Global configuration for units (metric/imperial), time zones, and interface preferences.

---

## 3. Technical Design

### 3.1 Tech Stack
- **Frontend**: React 19.1.2 (Strict Mode), Vite (Build Tool), TypeScript (Type Safety).
- **Styling**: Tailwind CSS (Utility-first framework), Lucide React (Iconography), Framer Motion (Animations).
- **Mapping**: Leaflet.js with React-Leaflet integration for performant geospatial rendering.
- **Data Visualization**: Recharts for responsive and interactive fleet analytics.
- **State Management**: React Context/Hooks for local state; simulated real-time data layer.
- **UI Components**: Shadcn/UI (standardized accessible components).

### 3.2 Architecture
- **Component-Driven Design**: Highly modular structure for easy maintenance and scalability.
- **Data Simulation Layer**: A specialized utility (`simulation.ts`) that mimics real-time GPS movement and sensor telemetry for demonstration purposes.
- **Service Layer**: Decoupled data fetching logic to allow for easy transition from mock data to real API integration.
- **Responsive Shell**: Mobile-first navigation system with collapsible sidebars and adaptive layouts.

### 3.3 Data Flow
1. **Simulation Engine**: Generates telemetry packets at 3-second intervals.
2. **State Sync**: Updates the global vehicle state, triggering map marker movements and dashboard metric refreshes.
3. **Event Processor**: Checks updated coordinates against geofence boundaries and speed thresholds to trigger alerts.
4. **Persistence**: Uses Browser `localStorage` to persist user configurations and mock database state.

---

## 4. Implementation Phases

### Phase 1: Foundation & Data Modeling
- [x] Set up project structure and routing.
- [x] Define TypeScript interfaces.
- [x] Create mock data and simulation logic.

### Phase 2: Live Tracking & Map Integration
- [x] Integrate Leaflet map.
- [x] Implement vehicle markers and info windows.
- [x] Create Live View sidebar with filtering.

### Phase 3: Management Modules
- [x] Vehicle Management CRUD.
- [ ] Driver & Device assignment workflows.

### Phase 4: Geofencing & Alerts
- [x] Display geofences on map.
- [ ] Implement drawing tools for new geofences.
- [x] Basic alert notification system.

### Phase 5: Analytics & Reporting
- [x] Fleet activity trends area chart.
- [x] Fuel consumption bar charts.
- [ ] Trip history playback controls.

### Phase 6: Refinement & UI/UX
- [x] Dark mode support.
- [x] Responsive design for mobile/tablet.
- [x] Project Documentation/Proposal page.
