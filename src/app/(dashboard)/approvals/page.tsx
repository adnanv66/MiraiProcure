'use client';

import React from 'react';
import { CheckCircle2, ShieldCheck, Clock, Check, X } from 'lucide-react';
import { formatCurrency } from '@/lib/utils/formatters';

export default function ApprovalsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase bg-cyan-950 text-cyan-400 border border-cyan-500/40 px-2 py-0.5 rounded">
              APPROVAL ENGINE
            </span>
            <span className="text-xs text-slate-400 font-mono">Policy Threshold Rules</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-100 mt-1">
            Multi-Tier Approvals (Policy Rules)
          </h1>
          <p className="text-xs text-slate-400">
            Rule-based threshold approvals for purchase requests, RFQs, POs, and supplier activations.
          </p>
        </div>
      </div>

      {/* Threshold Rules Config Card */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 shadow-xl">
        <h2 className="text-sm font-extrabold text-slate-100 font-mono">Active Policy Threshold Configuration</h2>
        <div className="grid md:grid-cols-3 gap-4 text-xs font-mono">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="text-cyan-400 font-bold block">Below ₹25,000</span>
            <p className="text-slate-300">Auto-Approval by Mirai AI if policy parameters are satisfied.</p>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="text-amber-400 font-bold block">₹25,000 – ₹1,00,000</span>
            <p className="text-slate-300">Requires Procurement Manager sign-off.</p>
          </div>
          <div className="p-3 bg-cyan-950/60 border border-cyan-500/40 rounded-xl space-y-1">
            <span className="text-emerald-400 font-bold block">Above ₹1,00,000</span>
            <p className="text-slate-200">Mandatory Joint Procurement + Corporate Finance approval.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
