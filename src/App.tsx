import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { WardrobeMemoryProvider } from "@/context/WardrobeMemoryContext";
import Index from "./pages/Index";
import CollectionsPage from "./pages/CollectionsPage";
import ProductDetail from "./pages/ProductDetail";
import NewArrivals from "./pages/NewArrivals";
import BestSellers from "./pages/BestSellers";
import Wishlist from "./pages/Wishlist";
import Account from "./pages/Account";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import BuildYourLook from "./pages/BuildYourLook";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <WardrobeMemoryProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/collections" element={<CollectionsPage />} />
              <Route path="/collections/:slug" element={<CollectionsPage />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/new-arrivals" element={<NewArrivals />} />
              <Route path="/best-sellers" element={<BestSellers />} />
              <Route path="/build-your-look" element={<BuildYourLook />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/account" element={<Account />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </WardrobeMemoryProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
