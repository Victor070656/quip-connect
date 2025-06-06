
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { TranslationProvider } from "@/hooks/useTranslation";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import Navigation from "@/components/Layout/Navigation";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Services from "./pages/Services";
import ProviderDashboard from "@/pages/provider/ProviderDashboard";
import ProviderOperations from "@/pages/provider/ProviderOperations";
import ProviderGrowth from "@/pages/provider/ProviderGrowth";
import NotFound from "./pages/NotFound";
import EnhancedBookService from "./pages/EnhancedBookService";
import EnhancedAddService from "./pages/provider/EnhancedAddService";
import EnhancedCustomerDashboard from "./pages/customer/EnhancedCustomerDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import BusinessGrowth from "./pages/admin/BusinessGrowth";

// Create QueryClient outside of component to avoid recreation on every render
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const AppRoutes = () => (
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
      <Route path="/provider/growth" element={<ProviderGrowth />} />
      <Route path="/provider/services/add" element={<EnhancedAddService />} />
      <Route path="/customer/dashboard" element={<EnhancedCustomerDashboard />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/business-growth" element={<BusinessGrowth />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </div>
);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="quip-ui-theme">
        <TooltipProvider>
          <TranslationProvider>
            <AuthProvider>
              <BrowserRouter>
                <AppRoutes />
                <Toaster />
                <Sonner />
              </BrowserRouter>
            </AuthProvider>
          </TranslationProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
