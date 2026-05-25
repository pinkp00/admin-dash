import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import Index from "./pages/Index";
import Bookings from "./pages/Bookings";
import Spaces from "./pages/Spaces";
import CalendarPage from "./pages/CalendarPage";
import Users from "./pages/Users";
import Services from "./pages/Services";
import Payments from "./pages/Payments";
import Reports from "./pages/Reports";
import Reviews from "./pages/Reviews";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <NotificationProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner position="top-right" richColors />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/classrooms" element={<Bookings />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/spaces" element={<Spaces />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/users" element={<Users />} />
              <Route path="/services" element={<Services />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/analytics" element={<Reports />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </NotificationProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
