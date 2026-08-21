'use client';

import React from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle2, ShieldCheck } from 'lucide-react';
import { DEMO_RISK_SIGNALS } from '@/lib/seed-data';

export default function RiskCenterPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase bg-cyan-950 text-cyan-400 border border-cyan-500/40 px-2 py-0.5 rounded">
              AI RISK RADAR
            </span>
            <span className="text-xs text-slate-400 font-mono">Anomaly Detection Active</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-100 mt-1">
            Risk Center & Anomaly Signals (Anomaly Detection)
          </h1>
          <p className="text-xs text-slate-400">
            Real-time supplier risk monitoring, delivery SLA breach signals, and price anomaly detection against market benchmarks.
          </p>
        </div>
      </div>

      {/* Risk Signals List */}
      <div className="space-y-4">
        {DEMO_RISK_SIGNALS.map((risk) => (
          <div
            key={risk.id}
            className={`p-6 rounded-2xl border space-y-3 shadow-xl ${
              risk.severity === 'HIGH' || risk.severity === 'CRITICAL'
                ? 'bg-slate-900 border-rose-800/60'
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <AlertTriangle
                  className={`h-5 w-5 ${risk.severity === 'HIGH' ? 'text-rose-400' : 'text-amber-400'}`}
                />
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase">{risk.supplierName}</span>
                  <h3 className="text-base font-extrabold text-slate-100">{risk.title}</h3>
                </div>
              </div>
              <span
                className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg border ${
                  risk.severity === 'HIGH'
                    ? 'bg-rose-950 text-rose-300 border-rose-800'
                    : 'bg-amber-950 text-amber-300 border-amber-800'
                }`}
              >
                {risk.severity} RISK ({risk.score}/100)
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-sans">{risk.description}</p>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-cyan-300 space-y-1">
              <div className="text-slate-400 text-[10px]">MIRAI AI TELEMETRY SIGNAL</div>
              <p>{risk.aiSignal}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
