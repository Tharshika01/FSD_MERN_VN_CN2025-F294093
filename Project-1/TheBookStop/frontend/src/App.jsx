import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import BookDetails from "./pages/BookDetails";

import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import Payment from "./pages/Payment";

import AdminDashboard from "./pages/AdminDashboard";
import SellerDashboard from "./pages/SellerDashboard";

function App() {
  return (
    <Routes>

      {/* ---------- AUTH PAGES ---------- */}
      <Route
        path="/login"
        element={
          <AuthLayout>
            <Login />
          </AuthLayout>
        }
      />

      <Route
        path="/register"
        element={
          <AuthLayout>
            <Register />
          </AuthLayout>
        }
      />

      {/* ---------- PUBLIC PAGES ---------- */}
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />

      <Route
        path="/book/:id"
        element={
          <MainLayout>
            <BookDetails />
          </MainLayout>
        }
      />

      {/* ---------- USER PROTECTED ---------- */}
      <Route
        path="/cart"
        element={
          <ProtectedRoute roles={["user"]}>
            <MainLayout>
              <Cart />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/wishlist"
        element={
          <ProtectedRoute roles={["user"]}>
            <MainLayout>
              <Wishlist />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/orders"
        element={
          <ProtectedRoute roles={["user"]}>
            <MainLayout>
              <Orders />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute roles={["user", "seller", "admin"]}>
            <MainLayout>
              <Profile />
            </MainLayout>
          </ProtectedRoute>
        }
      />


      <Route
        path="/payment"
        element={
          <ProtectedRoute roles={["user"]}>
            <MainLayout>
              <Payment />
            </MainLayout>
          </ProtectedRoute>
        }
      />


      {/* ---------- ADMIN PROTECTED ---------- */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute roles={["admin"]}>
            <MainLayout>
              <AdminDashboard />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* ---------- SELLER PROTECTED ---------- */}
      <Route
        path="/seller/dashboard"
        element={
          <ProtectedRoute roles={["seller"]}>
            <MainLayout>
              <SellerDashboard />
            </MainLayout>
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;
