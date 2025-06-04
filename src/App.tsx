
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import Navigation from "@/components/Layout/Navigation";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Services from "./pages/Services";
import ProviderDashboard from "@/pages/provider/ProviderDashboard";
import ProviderOperations from "@/pages/provider/ProviderOperations";
import NotFound from "./pages/NotFound";
import EnhancedBookService from "./pages/EnhancedBookService";
import EnhancedAddService from "./pages/provider/EnhancedAddService";
import EnhancedCustomerDashboard from "./pages/customer/EnhancedCustomerDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="quip-ui-theme">
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen">
              <Navigation />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/services" element={<Services />} />
                <Route path="/book/:serviceId" element={<EnhancedBookService />} />
                <Route path="/provider/dashboard" element={<ProviderDashboard />} />
                <Route path="/provider/operations" element={<ProviderOperations />} />
                <Route path="/provider/services/add" element={<EnhancedAddService />} />
                <Route path="/customer/dashboard" element={<EnhancedCustomerDashboard />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
