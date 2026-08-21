'use client';

import React from 'react';
import { Landmark, AlertTriangle, CheckCircle2, Lock } from 'lucide-react';
import { formatCurrency } from '@/lib/utils/formatters';
import { useProcurement } from '@/lib/store/procurement-store';

export default function FinancePage() {
  const { invoices, resolveInvoiceMismatch } = useProcurement();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase bg-cyan-950 text-cyan-400 border border-cyan-500/40 px-2 py-0.5 rounded">
              FINANCE & SETTLEMENT
            </span>
            <span className="text-xs text-slate-400 font-mono">Automated Invoice Verification</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-100 mt-1">
            Finance & 3-Way Match Engine (3-Way Verification)
          </h1>
          <p className="text-xs text-slate-400">
            Autonomous verification of Purchase Orders vs Goods Receipts vs Invoices. Prevents rogue billing and payment leakage.
          </p>
        </div>
      </div>

      {/* Invoices List */}
      {invoices.map((inv) => (
        <div
          key={inv.id}
          className={`bg-slate-900 border p-6 rounded-2xl space-y-4 shadow-2xl relative overflow-hidden ${
            inv.threeWayMatchStatus === 'MISMATCH_DETECTED'
              ? 'border-amber-500/40'
              : 'border-emerald-500/40'
          }`}
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-sm font-extrabold">
              {inv.threeWayMatchStatus === 'MISMATCH_DETECTED' ? (
                <span className="text-rose-400 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" /> 3-WAY MATCH MISMATCH DETECTED
                </span>
              ) : (
                <span className="text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" /> 3-WAY MATCH VERIFIED & MATCHED
                </span>
              )}
            </div>
            <span
              className={`text-xs font-mono px-2.5 py-1 rounded-lg font-bold ${
                inv.paymentStatus === 'HELD'
                  ? 'bg-rose-950 text-rose-300 border border-rose-800'
                  : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
              }`}
            >
              PAYMENT {inv.paymentStatus}
            </span>
          </div>

          {/* 3 Columns Comparison */}
          <div className="grid md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-500 text-[10px] uppercase block">Step 1: Purchase Order ({inv.poNumber})</span>
              <div className="text-slate-200 font-bold text-sm">500 Units</div>
              <div className="text-emerald-400 font-semibold">{formatCurrency(inv.poAmount)}</div>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-500 text-[10px] uppercase block">Step 2: Goods Receipt Note (GRN)</span>
              <div className="text-slate-200 font-bold text-sm">{inv.goodsReceivedQuantity} Units Received</div>
              <div className="text-cyan-300 font-semibold">Warehouse Verified ✓</div>
            </div>

            <div
              className={`p-4 rounded-xl border space-y-1 ${
                inv.threeWayMatchStatus === 'MISMATCH_DETECTED'
                  ? 'bg-rose-950/40 border-rose-800/60'
                  : 'bg-slate-950 border-slate-800'
              }`}
            >
              <span className="text-slate-400 text-[10px] uppercase block font-bold">Step 3: Supplier Invoice ({inv.invoiceNumber})</span>
              <div className="text-slate-200 font-extrabold text-sm">{inv.invoicedQuantity} Units Invoiced</div>
              <div className="text-emerald-400 font-bold">{formatCurrency(inv.invoiceAmount)}</div>
            </div>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1 flex justify-between items-center">
            <div>
              <div className="text-amber-400 font-bold font-mono text-[11px]">Audit Discrepancy Note:</div>
              <p className="text-slate-300 font-sans leading-relaxed">{inv.discrepancyReason}</p>
            </div>

            {inv.threeWayMatchStatus === 'MISMATCH_DETECTED' && (
              <button
                onClick={() => resolveInvoiceMismatch(inv.id)}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs px-4 py-2 rounded-xl shadow-md transition-all shrink-0 ml-4"
              >
                Resolve & Release Payment
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
