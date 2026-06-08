import React, { useEffect } from 'react';
import { RefreshCcw, ClipboardPlus } from 'lucide-react';
import DashboardShell from '../../components/common/DashboardShell';
import Restock from '../../components/inventory/Restock';

const menu = [
  { to: '/admin', label: 'Dashboard' },
  { to: '/admin/inventory', label: 'Inventory Management' },
  { to: '/admin/inventory/stock', label: 'Stock' },
  { to: '/admin/inventory/restock', label: 'Restock' },
];

const fontHref = 'https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&display=swap';

export default function InventoryRestock() {
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

  return (
    <DashboardShell
      menu={menu}
      title="Restock Inventory"
      subtitle="Capture batch-level replenishments with full traceability"
    >
      <div className="space-y-6">
        <section
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900 via-violet-800 to-indigo-800 shadow-md border border-purple-700"
          style={{ fontFamily: '"Poppins", ui-sans-serif, system-ui' }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[url('/images/Tea-leaf-teal-background.png')] bg-cover bg-center opacity-5" aria-hidden="true" />
          <div className="absolute inset-0">
            <div className="absolute top-4 right-4 w-48 h-48 bg-gradient-to-bl from-violet-400/15 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-4 left-4 w-48 h-48 bg-gradient-to-tr from-purple-400/15 to-transparent rounded-full blur-3xl" />
          </div>
          
          <div className="relative z-10 p-5 lg:py-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="space-y-3 lg:max-w-[55%]">
                {/* Badge */}
                <div className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-purple-500 to-violet-500 px-3 py-1 text-xs font-bold text-white shadow">
                  <RefreshCcw className="h-3.5 w-3.5" />
                  RESTOCK OPERATIONS HUB
                </div>
                
                {/* Main Heading */}
                <h1 className="text-2xl lg:text-3xl font-black leading-tight text-white">
                  Streamlined{' '}
                  <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                    Stock Replenishment
                  </span>
                </h1>
                
                {/* Description */}
                <p className="text-xs text-purple-100 leading-relaxed font-medium">
                  Efficient batch-level inventory management with complete traceability. 
                  <span className="text-white font-semibold"> Record deliveries instantly.</span>
                </p>
                
                {/* Process Steps */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 mt-2">
                  <div className="flex items-center gap-1.5 text-purple-100 text-[11px] font-medium">
                    <div className="w-5 h-5 shrink-0 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold">1</div>
                    <span>Select product</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-purple-100 text-[11px] font-medium">
                    <div className="w-5 h-5 shrink-0 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold">2</div>
                    <span>Enter batch & qty</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-purple-100 text-[11px] font-medium">
                    <div className="w-5 h-5 shrink-0 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold">3</div>
                    <span>Auto-update</span>
                  </div>
                </div>
              </div>
              
              {/* Feature Panel */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:flex-1 lg:max-w-[45%]">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10 flex items-start gap-2.5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-500">
                    <ClipboardPlus className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-xs">Batch-First Design</p>
                    <p className="text-purple-200 text-[10px] mt-0.5 leading-normal">Captures quantity, batch, and notes for audit trails.</p>
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10 flex items-start gap-2.5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500">
                    <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-bold text-xs">Smart Adjustments</p>
                    <p className="text-purple-200 text-[10px] mt-0.5 leading-normal">Allows negative/positive entry for perfect audit counts.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Restock />
      </div>
    </DashboardShell>
  );
}
