'use client';

import React from 'react';
import Link from 'next/link';
import { Boxes, AlertTriangle, RefreshCw, ArrowRight, Sparkles } from 'lucide-react';
import { DEMO_INVENTORY } from '@/lib/seed-data';

export default function PredictiveInventoryPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase bg-cyan-950 text-cyan-400 border border-cyan-500/40 px-2 py-0.5 rounded">
              PREDICTIVE PROCUREMENT
            </span>
            <span className="text-xs text-slate-400 font-mono">Stockout Forecasting Engine</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-100 mt-1">
            Predictive Inventory (Stock Forecasting)
          </h1>
          <p className="text-xs text-slate-400">
            Real-time stock monitoring, burn rate forecasting, and automatic RFQ triggers before stockouts occur.
          </p>
        </div>
      </div>

      {/* Inventory Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {DEMO_INVENTORY.map((item) => (
          <div
            key={item.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                <div>
                  <span className="text-xs font-mono text-cyan-400 font-bold">{item.sku}</span>
                  <h3 className="text-base font-extrabold text-slate-100 mt-1">{item.productName}</h3>
                  <span className="text-[10px] text-slate-500 font-mono">{item.warehouse}</span>
                </div>
                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                    item.status === 'REORDER_RECOMMENDED'
                      ? 'bg-amber-950 text-amber-300 border-amber-500/40'
                      : 'bg-emerald-950 text-emerald-400 border-emerald-500/40'
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono text-center">
                <div className="p-2 bg-slate-950 rounded border border-slate-800">
                  <span className="text-slate-500 text-[10px] block">Total Stock</span>
                  <span className="text-slate-200 font-bold">{item.totalQuantity} units</span>
                </div>
                <div className="p-2 bg-slate-950 rounded border border-slate-800">
                  <span className="text-slate-500 text-[10px] block">Available</span>
                  <span className="text-cyan-400 font-bold">{item.availableStock} units</span>
                </div>
              </div>

              {item.status === 'REORDER_RECOMMENDED' && (
                <div className="p-3 bg-amber-950/40 border border-amber-500/30 rounded-xl space-y-2 text-xs">
                  <div className="flex items-center gap-1.5 text-amber-300 font-bold font-mono text-[11px]">
                    <AlertTriangle className="h-4 w-4 text-amber-400" />
                    <span>Predictive Alert: Stockout in 11 Days</span>
                  </div>
                  <p className="text-slate-300 text-[11px] font-sans">
                    Current consumption rate indicates stock will hit critical zero on Sept 1, 2026.
                  </p>
                  <Link
                    href="/purchase-requests"
                    className="inline-flex items-center gap-1 text-xs font-bold text-cyan-400 hover:underline pt-1"
                  >
                    <span>Auto-Create Replenishment PR</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
