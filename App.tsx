
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import CasinoDetail from "./pages/CasinoDetail";
import CasinoResults from "./pages/CasinoResults";
import CasinoReviewTemplate from "./pages/CasinoReviewTemplate";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/Admin/Login";
import AdminDashboard from "./pages/Admin/Dashboard";
import AdminCasinos from "./pages/Admin/Casinos";
import AdminDepositOptions from "./pages/Admin/DepositOptions";
import AdminSlots from "./pages/Admin/Slots";
import AdminSetup from "./components/admin/AdminSetup";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/casino/:id" element={<CasinoDetail />} />
          <Route path="/casino-results" element={<CasinoResults />} />
          <Route path="/casino-review-template" element={<CasinoReviewTemplate />} />
          
          {/* Admin Routes */}
          <Route path="/admin/setup" element={<AdminSetup />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/casinos" element={<AdminCasinos />} />
          <Route path="/admin/deposit-options" element={<AdminDepositOptions />} />
          <Route path="/admin/slots" element={<AdminSlots />} />
          
          {/* Add default redirection to Index */}
          <Route path="/index" element={<Navigate replace to="/" />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
