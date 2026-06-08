import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import {
  LayoutDashboard,
  Package,
  Boxes,
  RefreshCw,
  ShoppingBag,
  ClipboardList,
  FileBarChart,
  Users,
  Truck,
  UserRound,
  Settings,
  LogOut,
  DollarSign,
  Leaf,
  AlertCircle
} from 'lucide-react';

const API = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');

// Map label keywords to Lucide icons
const getIconByLabel = (label) => {
  const key = label.toLowerCase();
  
  if (key.includes('dashboard')) return LayoutDashboard;
  if (key.includes('inventory') && key.includes('management')) return Package;
  if (key.includes('inventory') && key.includes('stock') && !key.includes('restock')) return Boxes;
  if (key.includes('restock')) return RefreshCw;
  if (key.includes('product')) return ShoppingBag;
  if (key.includes('overview')) return FileBarChart;
  if (key.includes('order')) return ClipboardList;
  if (key.includes('report')) return FileBarChart;
  if (key.includes('employee')) return Users;
  if (key.includes('supplier')) return Truck;
  if (key.includes('customer')) return UserRound;
  if (key.includes('settings')) return Settings;
  if (key.includes('logout')) return LogOut;
  if (key.includes('salary')) return DollarSign;
  if (key.includes('cultivation') || key.includes('plot') || key.includes('crop')) return Leaf;
  
  return AlertCircle;
};

export default function DashboardShell({ children, menu, title = 'Dashboard', subtitle = 'Overview of your store performance' }) {
  const { user, logout } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [openNotifications, setOpenNotifications] = useState(false);
  const socketRef = React.useRef(null);
  const nav = useNavigate();
  const loc = useLocation();

  useEffect(() => {
    const socket = io(API, {
      transports: ['websocket', 'polling'],
      withCredentials: true,
    });
    socketRef.current = socket;

    socket.on('payment:completed', (p) => {
      setNotifications((prev) => [{ type: 'payment', ...p, at: new Date().toISOString() }, ...prev.slice(0, 9)]);
    });
    socket.on('collection:new', (p) => {
      setNotifications((prev) => [{ type: 'collection', ...p, at: new Date().toISOString() }, ...prev.slice(0, 9)]);
    });

    return () => socket.disconnect();
  }, []);

  const toggleNotifications = useCallback(() => setOpenNotifications((prev) => !prev), []);

  const initials = useMemo(
    () => (user?.name ? user.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() : '?'),
    [user],
  );

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-800">
      <aside className="hidden md:flex md:w-64 lg:w-72 flex-col border-r border-slate-200 bg-white/80 backdrop-blur fixed inset-y-0 left-0 z-30">
        <div className="flex items-center justify-center px-6 py-6 border-b border-slate-200">
          <div className="flex items-center justify-center">
            <img 
              src="/images/logof.png" 
              alt="ZenTea Logo" 
              className="h-14 w-auto object-contain"
            />
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {menu.map((item) => {
            const active = loc.pathname === item.to;
            const IconComponent = getIconByLabel(item.label);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  active ? 'bg-emerald-100 text-emerald-700' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                    active ? 'bg-white text-emerald-600 shadow-sm' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  <IconComponent className="h-5 w-5" />
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto px-6 py-5 border-t border-slate-200">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-emerald-200 to-emerald-400 text-white flex items-center justify-center text-base font-semibold">
              {initials}
            </div>
            <div className="text-sm">
              <button
                type="button"
                onClick={() => {
                  const userRole = user?.role?.toString().toLowerCase();
                  if (userRole === 'collector') {
                    nav('/collector/profile');
                  } else if (userRole === 'supplier') {
                    nav('/supplier/profile');
                  } else {
                    nav('/employee/profile');
                  }
                }}
                className="font-semibold text-slate-800 hover:text-emerald-600 transition-colors text-left"
              >
                {user?.name}
              </button>
              <p className="text-slate-500 text-xs">
                {user?.uniqueId} · {user?.role}
              </p>
              <button
                type="button"
                onClick={() => {
                  logout();
                  nav('/');
                }}
                className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-emerald-600 hover:text-emerald-700 transition"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Spacer to prevent main content overlay */}
      <div className="hidden md:block md:w-64 lg:w-72 shrink-0" />

      <main className="flex-1 min-w-0">
        <header className="sticky top-0 z-20 backdrop-blur bg-white/90 border-b border-slate-200">
          <div className="flex items-center justify-between px-6 py-5">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
              <p className="text-sm text-slate-500">{subtitle}</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={toggleNotifications}
                className="relative rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
              >
                Notifications
                {notifications.length > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-xs font-semibold text-white">
                    {notifications.length}
                  </span>
                )}
              </button>
            </div>
          </div>
          {openNotifications && (
            <div className="px-6 pb-4">
              <div className="max-h-72 overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-lg">
                {notifications.length === 0 ? (
                  <p className="py-6 text-center text-sm text-slate-500">No notifications yet</p>
                ) : (
                  notifications.map((n, idx) => (
                    <div key={idx} className="flex items-center justify-between border-b border-slate-200 px-4 py-3 text-sm last:border-none">
                      <div>
                        <p className="font-medium text-slate-800 capitalize">{n.type}</p>
                        <p className="text-slate-500 text-xs">TXN {n.transactionId} · {new Date(n.at).toLocaleString()}</p>
                      </div>
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-600">
                        {n.supplierId || n.collectorId || '—'}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </header>

        <section className="px-6 py-8">{children}</section>
      </main>
    </div>
  );
}
