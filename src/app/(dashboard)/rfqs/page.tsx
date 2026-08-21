'use client';

import React from 'react';
import Link from 'next/link';
import { FileCheck2, Plus, Users, Calendar, ArrowRight, BrainCircuit } from 'lucide-react';
import { DEMO_RFQS } from '@/lib/seed-data';
import { formatCurrency } from '@/lib/utils/formatters';

export default function RFQsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase bg-cyan-950 text-cyan-400 border border-cyan-500/40 px-2 py-0.5 rounded">
              PROCUREMENT LIFECYCLE STEP 2
            </span>
            <span className="text-xs text-slate-400 font-mono">Request For Quotation</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-100 mt-1">
            RFQ Management (Vendor Sourcing)
          </h1>
          <p className="text-xs text-slate-400">
            Publish RFQs, invite qualified suppliers, collect quotations, and trigger AI Quote Intelligence analysis.
          </p>
        </div>

        <Link
          href="/quote-intelligence"
          className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 text-slate-950 font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-cyan-500/20 transition-all shrink-0"
        >
          <BrainCircuit className="h-4 w-4" />
          <span>Analyze Quotations in Quote Intelligence</span>
        </Link>
      </div>

      {/* RFQ List Cards */}
      <div className="space-y-4">
        {DEMO_RFQS.map((rfq) => (
          <div
            key={rfq.id}
            className="bg-slate-900 border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-6 space-y-4 shadow-xl transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950 px-2.5 py-1 rounded border border-cyan-800">
                  {rfq.rfqNumber}
                </span>
                <h3 className="text-base font-extrabold text-slate-100">{rfq.title}</h3>
              </div>
              <span className="bg-emerald-950 text-emerald-400 border border-emerald-500/40 text-xs font-mono px-3 py-1 rounded-lg font-bold w-fit">
                {rfq.status}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-sans bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              {rfq.requirements}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-500 text-[10px] block">Target Budget</span>
                <span className="text-emerald-400 font-bold">{formatCurrency(rfq.targetBudget)}</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-500 text-[10px] block">Mandatory SLA</span>
                <span className="text-cyan-300 font-bold">{rfq.deliveryDays} Days</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-500 text-[10px] block">Response Deadline</span>
                <span className="text-slate-200">{rfq.deadline}</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-500 text-[10px] block">Invited Vendors</span>
                <span className="text-cyan-400 font-bold">{rfq.invitedSuppliers.length} Suppliers</span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Link
                href="/quote-intelligence"
                className="text-xs font-bold text-cyan-400 hover:underline flex items-center gap-1"
              >
                <span>View Received Quotations & AI Scores</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
