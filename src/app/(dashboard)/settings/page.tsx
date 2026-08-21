'use client';

import React from 'react';
import { Settings, Building2, Sliders, Key } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase bg-cyan-950 text-cyan-400 border border-cyan-500/40 px-2 py-0.5 rounded">
              ORGANIZATION PREFERENCES
            </span>
            <span className="text-xs text-slate-400 font-mono">System Parameters</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-100 mt-1">
            System Settings (System Parameters)
          </h1>
          <p className="text-xs text-slate-400">
            Configure market price benchmarks, scoring weights, database connections, and AI integrations.
          </p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl text-xs font-mono">
        <h3 className="text-sm font-extrabold text-slate-100 font-sans">Market Price Benchmark Data</h3>
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
          <div className="flex justify-between">
            <span className="text-slate-400">Benchmark Target:</span>
            <span className="text-cyan-400 font-bold">Business Laptops (Core i7 / 16GB / 512GB)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Market Range:</span>
            <span className="text-slate-200">₹42,000 – ₹48,000</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Average Price:</span>
            <span className="text-emerald-400 font-bold">₹45,000 / unit</span>
          </div>
        </div>
      </div>
    </div>
  );
}
