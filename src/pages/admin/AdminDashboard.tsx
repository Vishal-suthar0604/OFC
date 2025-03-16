import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { LayoutDashboard, Package, Users, ShoppingBag, Settings } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-md min-h-screen p-4">
          <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
          <nav className="space-y-2">
            <Link
              to="/admin"
              className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md"
            >
              <LayoutDashboard className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/admin/products"
              className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md"
            >
              <Package className="h-5 w-5" />
              <span>Products</span>
            </Link>
            <Link
              to="/admin/orders"
              className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md"
            >
              <ShoppingBag className="h-5 w-5" />
              <span>Orders</span>
            </Link>
            <Link
              to="/admin/customers"
              className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md"
            >
              <Users className="h-5 w-5" />
              <span>Customers</span>
            </Link>
            <Link
              to="/admin/settings"
              className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md"
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </Link>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <Routes>
            <Route index element={<AdminOverview />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="customers" element={<AdminCustomers />} />
            <Route path="settings" element={<AdminSettings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

const AdminOverview: React.FC = () => (
  <div>
    <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
    {/* Dashboard content would go here */}
  </div>
);

const AdminProducts: React.FC = () => (
  <div>
    <h1 className="text-2xl font-bold mb-6">Products</h1>
    {/* Products management content would go here */}
  </div>
);

const AdminOrders: React.FC = () => (
  <div>
    <h1 className="text-2xl font-bold mb-6">Orders</h1>
    {/* Orders management content would go here */}
  </div>
);

const AdminCustomers: React.FC = () => (
  <div>
    <h1 className="text-2xl font-bold mb-6">Customers</h1>
    {/* Customers management content would go here */}
  </div>
);

const AdminSettings: React.FC = () => (
  <div>
    <h1 className="text-2xl font-bold mb-6">Settings</h1>
    {/* Settings content would go here */}
  </div>
);

export default AdminDashboard;