import { Route, Routes } from "react-router";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ProtectedLayout from "./components/ProtectedLayout";
import { useAuth } from "./hooks/useAuth.hook";
import { useTheme } from "./hooks/useTheme.hook";
import CategoriesPage from "./pages/CategoriesPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import LoginPage from "./pages/LoginPage";
import OrdersPage from "./pages/OrdersPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ProductsPage from "./pages/ProductsPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import WishListPage from "./pages/WishListPage";

type Props = {};

const App = ({}: Props) => {
  useAuth();
  useTheme();

  return (
    <div>
      <Header />

      <main className="min-h-screen mt-26 px-4">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<ProductsPage />} />
          <Route path="/products" element={<ProductsPage />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          <Route path="/products/:productId" element={<ProductDetailsPage />} />
          <Route path="/categories/:category" element={<CategoriesPage />} />

          {/* Protected routes */}
          <Route element={<ProtectedLayout />}>
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/wish-list" element={<WishListPage />} />
            <Route path="/shopping-cart" element={<ShoppingCartPage />} />
          </Route>
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
