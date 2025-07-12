
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Browse from "./pages/Browse";
import ProductDetail from "./pages/ProductDetail";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import AddItem from "./pages/AddItem";
import NotFound from "./pages/NotFound";
import OAuthRedirect from "./pages/OAuthRedirect";
import ChatBot from "./components/ChatBot";

const queryClient = new QueryClient();

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/add-item" element={
              <ProtectedRoute>
                <AddItem />
              </ProtectedRoute>
            } />
            <Route path="/admin" element={
              <ProtectedRoute adminOnly>
                <Admin />
              </ProtectedRoute>
            } />
            <Route path="/oauth-redirect" element={<OAuthRedirect />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ChatBot />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
