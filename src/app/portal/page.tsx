'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { Building2, FileCheck2, ShoppingCart, CheckCircle2, ArrowRight, LogOut, Package, Send, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SupplierPortalPage() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [quotePrice, setQuotePrice] = useState('45000');
  const [quoteSla, setQuoteSla] = useState('10');

  const handleSignOut = () => {
    localStorage.removeItem('miraiprocure_user');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] text-slate-900 font-sans p-6 space-y-6">
      {/* Top Supplier Portal Navbar */}
      <nav className="bg-white border border-slate-200 p-4 rounded-2xl flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <Logo size="sm" lightMode showTagline={false} />
          <span className="text-xs font-mono font-bold bg-amber-100 text-amber-800 border border-amber-300 px-2.5 py-0.5 rounded">
            ISOLATED SUPPLIER PORTAL
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-amber-600" />
            <span className="text-slate-600">Supplier: <strong className="text-slate-900 font-bold">ABC Technologies (SUP-002)</strong></span>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-1 text-slate-500 hover:text-rose-600 font-semibold transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </nav>

      {/* Security Isolation Notice */}
      <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs flex items-center gap-2">
        <ShieldCheck className="h-4 w-4 text-emerald-600 flex-shrink-0" />
        <span>
          <strong>Isolated Partner Session:</strong> Access strictly restricted to assigned RFQs, submitted quotes, and active Purchase Orders. Internal ERP data, competitor rankings, and risk scores are protected.
        </span>
      </div>

      {/* Main Portal Workspace Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Active RFQs Inviting Proposal */}
        <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <FileCheck2 className="h-4 w-4 text-amber-600" />
              <span>Assigned RFQs</span>
            </div>
            <span className="text-[10px] font-mono font-bold bg-amber-100 text-amber-800 border border-amber-200 px-2 py-0.5 rounded">
              1 Open RFQ
            </span>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 text-xs">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-mono font-bold text-amber-700">RFQ-2026-0500</span>
                <h3 className="font-bold text-slate-900 text-sm">RFQ for 500 High-Performance Business Laptops</h3>
              </div>
              <span className="text-emerald-700 font-mono font-bold bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded">
                15-Day SLA
              </span>
            </div>

            <p className="text-slate-600 leading-relaxed text-[11px]">
              500 Units: Intel Core i7 13th Gen, 16GB RAM, 512GB NVMe SSD, 14-inch FHD. On-site 3-year warranty preferred.
            </p>

            {submitted ? (
              <div className="p-3 bg-emerald-100 border border-emerald-300 rounded-xl text-emerald-900 text-xs font-mono flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-700" />
                <span>Quotation QTE-2026-8802 Submitted &amp; Verified!</span>
              </div>
            ) : (
              <div className="space-y-3 pt-3 border-t border-slate-200">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-600 block mb-1">Unit Price Quote (₹)</label>
                    <input
                      type="number"
                      value={quotePrice}
                      onChange={(e) => setQuotePrice(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs font-mono text-slate-900 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-600 block mb-1">Promised SLA (Days)</label>
                    <input
                      type="number"
                      value={quoteSla}
                      onChange={(e) => setQuoteSla(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs font-mono text-slate-900 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <button
                  onClick={() => setSubmitted(true)}
                  className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Submit Official Proposal &amp; Quotation</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Assigned Purchase Orders */}
        <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <ShoppingCart className="h-4 w-4 text-amber-600" />
              <span>Assigned Purchase Orders</span>
            </div>
            <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5 rounded">
              1 Active PO
            </span>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs font-mono">
            <div className="flex justify-between items-center">
              <span className="font-bold text-amber-800">PO-2026-9001</span>
              <span className="text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200">
                APPROVED
              </span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Total PO Amount:</span>
              <span className="text-slate-900 font-bold">₹2,25,00,000</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Fulfillment SLA:</span>
              <span className="text-amber-700 font-bold">10-Day Express SLA</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Delivery Status:</span>
              <span className="text-emerald-700 font-bold">In Transit to Hub</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
