import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthProvider from './context/AuthContext.jsx';
import CartProvider from './context/CartContext.jsx';
import ProtectedRoute from './components/common/ProtectedRoute.jsx';

// Loading component
const LoadingFallback = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh',
    fontSize: '1.5rem'
  }}>
    Loading...
  </div>
);

// Lazy load components for better performance
// Public pages - load immediately
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/auth/LoginPage.jsx';
import SignupPage from './pages/auth/SignupPage.jsx';

// Other pages - lazy load
const ViewCart = lazy(() => import('./pages/ViewCart.jsx'));
const Checkout = lazy(() => import('./pages/Checkout.jsx'));
const AccountDetails = lazy(() => import('./pages/AccountDetails.jsx'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard.jsx'));
const CollectorDashboard = lazy(() => import('./pages/collector/CollectorDashboard.jsx'));
const CollectorProfile = lazy(() => import('./pages/collector/CollectorProfile.jsx'));
const EditCollectorProfile = lazy(() => import('./pages/collector/EditCollectorProfile.jsx'));
const SupplierDashboard = lazy(() => import('./pages/supplier/SupplierDashboard.jsx'));
const SupplierProfile = lazy(() => import('./pages/supplier/SupplierProfile.jsx'));
const EditSupplierProfile = lazy(() => import('./pages/supplier/EditSupplierProfile.jsx'));
const EmployeeDashboard = lazy(() => import('./pages/employee/EmployeeDashboard.jsx'));
const EmployeeProfile = lazy(() => import('./pages/employee/EmployeeProfile.jsx'));
const EditProfile = lazy(() => import('./pages/employee/EditProfile.jsx'));
const SalaryManagement = lazy(() => import('./pages/admin/SalaryManagement.jsx'));
const OrderManagement = lazy(() => import('./pages/admin/OrderManagement.jsx'));
const InventoryManagement = lazy(() => import('./pages/admin/InventoryManagement.jsx'));
const InventoryRestock = lazy(() => import('./pages/admin/InventoryRestock.jsx'));
const InventoryStock = lazy(() => import('./pages/admin/InventoryStock.jsx'));
const CusOrderManagement = lazy(() => import('./pages/admin/CusOrderManagement.jsx'));
const Orders = lazy(() => import('./pages/admin/Orders.jsx'));
const AdminPanelDashboard = lazy(() => import('./pages/admin/AdminPanelDashboard.jsx'));
const CropsManagement = lazy(() => import('./pages/admin/CropsManagement.jsx'));
const PlotsManagement = lazy(() => import('./pages/admin/PlotsManagement.jsx'));
const ContactUs = lazy(() => import('./pages/contactUS/ContactUs.jsx'));
const Ourstory = lazy(() => import('./pages/OurStory/Ourstory.jsx'));
const Shop = lazy(() => import('./pages/Shop.jsx'));
const MyOrders = lazy(() => import('./pages/MyOrders.jsx'));
const Blog = lazy(() => import('./pages/blog/blog.jsx'));
const CustomerProfile = lazy(() => import('./pages/customer/CustomerProfile.jsx'));

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Public */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/Ourstory" element={<Ourstory />} />
            <Route path="/shop" element={<Shop/>} />
            <Route path="/cart" element={<ViewCart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/account" element={<AccountDetails />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/my-orders" element={<MyOrders />} />

            {/* Customer */}
            <Route element={<ProtectedRoute allow={['Customer']} />}>
              <Route path="/customer/profile" element={<CustomerProfile />} />
            </Route>

            {/* Admin */}
            <Route element={<ProtectedRoute allow={['Admin']} />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/salary" element={<SalaryManagement />} />
              <Route path="/admin/inventory" element={<InventoryManagement />} />
              <Route path="/admin/inventory/stock" element={<InventoryStock />} />
              <Route path="/admin/inventory/restock" element={<InventoryRestock />} />
              <Route path="/admin/order" element={<OrderManagement />} />
              <Route path="/admin/order-overview" element={<CusOrderManagement />} />
              <Route path="/admin/orders" element={<Orders />} />
              <Route path="/admin/panel" element={<AdminPanelDashboard />} />
              <Route path="/admin/panel/crops" element={<CropsManagement />} />
              <Route path="/admin/panel/plots" element={<PlotsManagement />} />
            </Route>

            {/* Collector */}
            <Route element={<ProtectedRoute allow={['Collector']} />}>
              <Route path="/collector" element={<CollectorDashboard />} />
              <Route path="/collector/profile" element={<CollectorProfile />} />
              <Route path="/collector/profile/edit" element={<EditCollectorProfile />} />
            </Route>

            {/* Supplier */}
            <Route element={<ProtectedRoute allow={['Supplier']} />}>
              <Route path="/supplier" element={<SupplierDashboard />} />
              <Route path="/supplier/profile" element={<SupplierProfile />} />
              <Route path="/supplier/profile/edit" element={<EditSupplierProfile />} />
            </Route>

            {/* Employee */}
            <Route element={<ProtectedRoute allow={['Employee']} />}>
              <Route path="/employee" element={<EmployeeDashboard />} />
              <Route path="/employee/profile" element={<EmployeeProfile />} />
              <Route path="/employee/profile/edit" element={<EditProfile />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </CartProvider>
    </AuthProvider>
  );
}
