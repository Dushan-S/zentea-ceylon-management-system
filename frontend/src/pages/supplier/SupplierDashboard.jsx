import React, { useEffect, useState } from 'react';
import DashboardShell from '../../components/common/DashboardShell';
import { supplierPending, confirmPayment, downloadSlip } from '../../api/supplierPaymentApi';
import Swal from 'sweetalert2';
import QrReader from 'react-qr-scanner';

export default function SupplierDashboard() {
  const [pending, setPending] = useState(null);
  const [scan, setScan] = useState(false);
  const [result, setResult] = useState(null);

  const menu = [
    { to: '/supplier', label: 'Overview' },
    { to: '/supplier/history', label: 'Payment History' },
  ];

  const load = async () => {
    const { data } = await supplierPending();
    setPending(data);
  };
  useEffect(() => { load(); }, []);

  const onConfirm = async (transactionId) => {
    try {
      const { data } = await confirmPayment(transactionId);
      Swal.fire({ icon: 'success', title: 'Payment confirmed', toast: true, position: 'top' });
      setResult(data);
      load();
      if (pending?.transactionId) downloadSlip(pending.transactionId);
    } catch (e) {
      Swal.fire({ icon: 'error', title: e.response?.data?.message || 'Failed', toast: true, position: 'top' });
    }
  };

  return (
    <DashboardShell menu={menu}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2 bg-white p-4 sm:p-6 rounded-lg sm:rounded-2xl shadow">
          <h2 className="font-semibold mb-3 text-lg">Pending Payment</h2>
          {pending ? (
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <span className="text-slate-500">Transaction ID:</span>
                  <div className="font-medium break-all">{pending.transactionId}</div>
                </div>
                <div>
                  <span className="text-slate-500">Amount:</span>
                  <div className="font-semibold text-emerald-600">LKR {pending.total}</div>
                </div>
                <div>
                  <span className="text-slate-500">Status:</span>
                  <div className="font-medium capitalize">{pending.status}</div>
                </div>
              </div>
              <button 
                onClick={() => setScan(true)} 
                className="w-full sm:w-auto px-4 py-3 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition"
              >
                Scan QR & Get Paid
              </button>
            </div>
          ) : (
            <div className="text-sm text-gray-500 p-4 bg-slate-50 rounded-lg text-center">
              No pending payments
            </div>
          )}
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-lg sm:rounded-2xl shadow">
          <h2 className="font-semibold mb-3 text-lg">PDF Slip</h2>
          {result?.pdfPath ? (
            <a 
              href={result.pdfPath} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-emerald-700 underline hover:text-emerald-800 text-sm break-all"
            >
              Open latest slip
            </a>
          ) : (
            <div className="text-sm text-gray-500 p-4 bg-slate-50 rounded-lg text-center">
              No slip yet
            </div>
          )}
        </div>
        {scan && (
          <div className="lg:col-span-3 bg-white p-4 sm:p-6 rounded-lg sm:rounded-2xl shadow">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-lg">Scan QR Code</h2>
              <button
                onClick={() => setScan(false)}
                className="text-slate-500 hover:text-slate-700 p-2"
                aria-label="Close scanner"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="max-w-md mx-auto">
              <QrReader
                delay={300}
                constraints={{ facingMode: "environment" }}
                onError={(err) => console.error(err)}
                onScan={(res) => {
                  if (res) {
                    setScan(false);
                    onConfirm(res.text);
                  }
                }}
                style={{ width: '100%' }}
              />
            </div>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
