import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashboardShell from '../../components/common/DashboardShell';
import StockAlerts from '../../components/inventory/StockAlerts';
import ProductForm from '../../components/inventory/ProductForm';
import Reports from '../../components/inventory/Reports';
import { InventoryAPI } from '../../api/inventoryApi';

const fontHref = 'https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&display=swap';

export default function InventoryManagement() {
  const location = useLocation();
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const existing = Array.from(document.head.querySelectorAll('link[href^="https://fonts.googleapis.com/css2?family=Poppins"]'));
    if (existing.length === 0) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = fontHref;
      document.head.appendChild(link);
      return () => {
        document.head.removeChild(link);
      };
    }
    return undefined;
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const productId = params.get('productId');
    if (!productId) {
      setSelectedProduct(null);
      return;
    }
    (async () => {
      try {
        const data = await InventoryAPI.listProducts();
        const match = Array.isArray(data) ? data.find((item) => item._id === productId) : null;
        if (match) setSelectedProduct(match);
      } catch (e) {
        console.warn('Unable to preload product for editing:', e);
      }
    })();
  }, [location.search]);

  const menu = useMemo(() => ([
    { to: '/admin', label: 'Dashboard' },
    { to: '/admin/inventory', label: 'Inventory Management' },
    { to: '/admin/inventory/stock', label: 'Stock' },
    { to: '/admin/inventory/restock', label: 'Restock' },
  ]), []);

  return (
    <DashboardShell
      menu={menu}
      title="Inventory Management"
      subtitle="Monitor alerts, capture catalogue changes, and keep reports current"
    >
      <div className="space-y-4 lg:space-y-5 xl:space-y-6">
        <section
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-md border border-slate-700"
          style={{ fontFamily: '"Poppins", ui-sans-serif, system-ui' }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[url('/images/Tea-leaf-teal-background.png')] bg-cover bg-center opacity-5" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-cyan-500/10" />
          
          {/* Geometric decorations */}
          <div className="absolute top-2 right-2 w-24 h-24 bg-gradient-to-br from-emerald-400/15 to-cyan-400/15 rounded-full blur-2xl" />
          <div className="absolute bottom-2 left-2 w-20 h-20 bg-gradient-to-br from-cyan-400/15 to-emerald-400/15 rounded-full blur-xl" />
          
          <div className="relative z-10 p-5 lg:py-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="space-y-2 lg:max-w-[55%]">
                {/* Badge */}
                <div className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-3 py-1 text-xs font-bold tracking-wide text-white shadow">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  REAL-TIME INVENTORY ORCHESTRATION
                </div>
                
                {/* Main Heading */}
                <h1 className="text-2xl lg:text-3xl font-black leading-tight text-white">
                  Master Your{' '}
                  <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                    Inventory Flow
                  </span>
                </h1>
                
                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed max-w-xl font-medium">
                  Centralized command center for batch tracking, stock alerts, and catalog management. 
                  <span className="text-white font-semibold"> Real-time synchronization</span> across all operations.
                </p>
              </div>
              
              {/* Feature highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:flex-1 lg:max-w-[45%]">
                <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                  <div className="w-8 h-8 shrink-0 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-5a2 2 0 10-4 0v5h-5l5 5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-xs">Live Alerts</p>
                    <p className="text-slate-400 text-[10px]">Instant alerts</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                  <div className="w-8 h-8 shrink-0 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-xs">Batch Tracking</p>
                    <p className="text-slate-400 text-[10px]">Full traceability</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                  <div className="w-8 h-8 shrink-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-xs">PDF Reports</p>
                    <p className="text-slate-400 text-[10px]">Export summaries</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-4 lg:gap-5 xl:gap-6 lg:grid-cols-10">
          <div className="lg:col-span-7">
            <ProductForm selected={selectedProduct} onSaved={() => setSelectedProduct(null)} />
          </div>
          <div className="lg:col-span-3">
            <StockAlerts />
          </div>
        </div>

        <div className="w-full">
          <Reports />
        </div>
      </div>
    </DashboardShell>
  );
}
