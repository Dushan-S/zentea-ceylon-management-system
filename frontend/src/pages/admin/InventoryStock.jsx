import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardList, ArrowRightCircle } from 'lucide-react';
import DashboardShell from '../../components/common/DashboardShell';
import ProductTable from '../../components/inventory/ProductTable';

const fontHref = 'https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&display=swap';

export default function InventoryStock() {
  const navigate = useNavigate();

  useEffect(() => {
    const existing = Array.from(
      document.head.querySelectorAll('link[href^="https://fonts.googleapis.com/css2?family=Poppins"]')
    );
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

  const menu = useMemo(() => ([
    { to: '/admin', label: 'Dashboard' },
    { to: '/admin/inventory', label: 'Inventory Management' },
    { to: '/admin/inventory/stock', label: 'Stock' },
    { to: '/admin/inventory/restock', label: 'Restock' },
  ]), []);

  return (
    <DashboardShell
      menu={menu}
      title="Inventory Stock"
      subtitle="Search, filter, and export current stock positions"
    >
      <div className="space-y-6">
        <section
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-900 via-blue-800 to-cyan-800 shadow-md border border-blue-700"
          style={{ fontFamily: '"Poppins", ui-sans-serif, system-ui' }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[url('/images/Tea-leaf-teal-background.png')] bg-cover bg-center opacity-5" aria-hidden="true" />
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-cyan-400/15 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-400/15 to-transparent rounded-full blur-3xl" />
          </div>
          
          <div className="relative z-10 p-5 lg:py-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="space-y-3 lg:max-w-[60%]">
                {/* Badge */}
                <div className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-3 py-1 text-xs font-bold text-white shadow">
                  <ClipboardList className="h-3.5 w-3.5" />
                  STOCK MONITORING CENTER
                </div>
                
                {/* Main Heading */}
                <h1 className="text-2xl lg:text-3xl font-black leading-tight text-white">
                  Comprehensive{' '}
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    Stock Overview
                  </span>
                </h1>
                
                {/* Description */}
                <p className="text-xs text-blue-100 leading-relaxed font-medium">
                  Advanced filtering and real-time status monitoring for all inventory items. 
                  <span className="text-white font-semibold"> Track batches, expiry dates, and stock levels.</span>
                </p>
                
                {/* Stats Row */}
                <div className="grid grid-cols-4 gap-2.5 max-w-md">
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-2 border border-white/10 text-center">
                    <div className="text-sm font-bold text-white">Live</div>
                    <div className="text-[10px] text-blue-200">Updates</div>
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-2 border border-white/10 text-center">
                    <div className="text-sm font-bold text-white">Smart</div>
                    <div className="text-[10px] text-blue-200">Filters</div>
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-2 border border-white/10 text-center">
                    <div className="text-sm font-bold text-white">Batch</div>
                    <div className="text-[10px] text-blue-200">Tracking</div>
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-2 border border-white/10 text-center">
                    <div className="text-sm font-bold text-white">Export</div>
                    <div className="text-[10px] text-blue-200">Ready</div>
                  </div>
                </div>
              </div>
              
              {/* Action Panel */}
              <div className="lg:max-w-[35%] lg:flex-1">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3.5 border border-white/15">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 shrink-0 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-white font-semibold text-xs">Need to add products?</p>
                        <p className="text-blue-200 text-[10px]">Access the catalog editor</p>
                      </div>
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => navigate('/admin/inventory')}
                      className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2.5 text-xs font-bold text-white transition shadow hover:scale-[1.02]"
                    >
                      <ArrowRightCircle className="h-4 w-4" />
                      Manage Catalogue
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ProductTable
          hideForm={true}
          onSelectProduct={(product) => {
            navigate(`/admin/inventory?productId=${product._id}`);
          }}
        />
      </div>
    </DashboardShell>
  );
}
