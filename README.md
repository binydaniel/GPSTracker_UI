# React + Vite + shadcn/ui Starter Template

A modern React starter template built with Vite, TypeScript, Tailwind CSS, and shadcn/ui components.

## 🚀 Features

- ⚡️ **Vite** - Fast build tool and development server
- ⚛️ **React 18** - Latest React with hooks support
- 🎯 **TypeScript** - Type safety and better developer experience
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🧩 **shadcn/ui** - Beautifully designed components built with Radix UI
- 📦 **Path Mapping** - Clean imports with `@/` prefix

## 📦 Included shadcn/ui Components

- Button
- Card
- Input
- Label
- Badge
- Dialog
- And more...

## 🛠️ Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start development server**

   ```bash
   npm run dev
   ```

3. **Build for production**

   ```bash
   npm run build
   ```

4. **Preview production build**
   ```bash
   npm run preview
   ```

## 📁 Project Structure

```
my-gps-tracker-fe/
├── public/                 # Static assets like favicon, map marker icons
├── src/
│   ├── assets/             # Global images, logos, global styles (tailwind.css)
│   │
│   ├── components/         # GLOBAL reusable UI components (buttons, inputs, cards)
│   │   ├── ui/             # If using Shadcn, components live here
│   │   │   ├── button.tsx
│   │   │   └── table.tsx
│   │   └── data-table.tsx  # A reusable wrapper for your admin tables
│   │
│   ├── config/             # Global configuration
│   │   └── constants.ts    # API URLs, SignalR Hub endpoints, Mapbox tokens
│   │
│   ├── features/           # The CORE of your app - split by domain/module
│   │   ├── auth/           # Login, JWT handling, Protected Routes
│   │   │   ├── components/login-form.tsx
│   │   │   ├── hooks/use-auth.ts
│   │   │   └── auth-api.ts
│   │   │
│   │   ├── tracking/       # GPS Tracking, Maps, Vehicle Markers
│   │   │   ├── components/vehicle-map.tsx
│   │   │   ├── components/marker-popup.tsx
│   │   │   ├── hooks/use-signalr.ts   <-- Manages real-time WebSockets to .NET
│   │   │   └── tracking-api.ts
│   │   │
│   │   └── admin/          # Vehicle logs, User management, Reporting
│   │       ├── components/vehicle-list.tsx
│   │       ├── components/stats-chart.tsx
│   │       └── admin-api.ts
│   │
│   ├── hooks/              # GLOBAL reusable hooks (e.g., useLocalStorage, useDebounce)
│   │   └── use-local-storage.ts
│   │
│   ├── layouts/            # Layout wrappers (Sidebar, Navbar)
│   │   ├── admin-layout.tsx # Dashboard sidebar & header for authenticated users
│   │   └── auth-layout.tsx  # Centered card layout for login screen
│   │
│   ├── pages/              # Route entry points (keep these lightweight)
│   │   ├── login.tsx       # Imports features/auth/components/login-form
│   │   ├── live-map.tsx    # Imports features/tracking/components/vehicle-map
│   │   └── vehicles.tsx    # Imports features/admin/components/vehicle-list
│   │
│   ├── routes/             # Client-side routing configuration
│   │   └── app-routes.tsx  # React Router setup
│   │
│   ├── services/           # Global API clients
│   │   ├── api-client.ts   # Axios instance with interceptors to attach .NET JWT tokens
│   │   └── signalr-connection.ts # Base SignalR Hub connection setup
│   │
│   ├── App.tsx             # Root component (Providers, Router)
│   └── main.tsx            # App entry point
│
├── .env                    # Environment variables (VITE_API_URL)
├── package.json
└── vite.config.ts
```

## 🎨 Customization

### Adding New shadcn/ui Components

This template is pre-configured with shadcn/ui. You can add more components by creating them in the `src/components/ui/` directory.

### Tailwind Configuration

The Tailwind configuration is set up with shadcn/ui color variables. You can customize colors and other design tokens in:

- `tailwind.config.js` - Tailwind configuration
- `src/index.css` - CSS custom properties for themes

### TypeScript Configuration

Path mapping is configured for clean imports:

```typescript
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
```

## 🌗 Dark Mode

The template includes dark mode support through Tailwind's `dark:` classes and CSS custom properties.

## 📚 Learn More

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

**⚡ Powered by [Dala](https://dala.gebeya.com)** - The AI-powered web development platform that helps you build full-stack applications faster.

---

## 🤖 What is Dala?

**[Gebeya Dala](https://dala.gebeya.com)** is an intelligent web development platform that accelerates your React development workflow. Build, preview, and deploy web applications, and instant development environments.

🔗 **Try Dala:** [dala.gebeya.com](https://dala.gebeya.com)

### Why Use Dala?

- **AI-Powered Development** - Get intelligent code suggestions and automated component generation
- **Instant Preview** - See your changes live in real-time sandbox environments
- **Zero Setup** - No local environment configuration needed
- **Collaborative** - Build and share projects with your team
- **Deployment Ready** - One-click deployment to production

---

Built with ❤️ by the Dala team to help developers build faster and smarter.
