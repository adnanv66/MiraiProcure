'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Bot,
  BrainCircuit,
  ShieldAlert,
  Boxes,
  CheckCircle2,
  ArrowRight,
  Award,
  Radio,
  FileCheck2
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils/formatters';
import { useProcurement } from '@/lib/store/procurement-store';

export default function CommandCenterPage() {
  const { purchaseOrders, approvePurchaseOrder } = useProcurement();

  const activePo = purchaseOrders.find((p) => p.supplierName.includes('ABC')) || purchaseOrders[0];
  const isApproved = activePo?.status === 'APPROVED';

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden shadow-xs">
        <div className="space-y-1 z-10">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold uppercase bg-amber-100 text-amber-800 border border-amber-300 px-2.5 py-0.5 rounded">
              MAIN OPERATIONAL HUB
            </span>
            <span className="text-xs text-slate-500 font-mono">Real-time Autonomous Workflow</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span>Procurement Command Center</span>
            <span className="text-xs font-mono font-bold text-amber-800 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded">
              Mirai AI OS
            </span>
          </h1>
          <p className="text-xs text-slate-600">
            Central operational hub orchestrating intent, quote intelligence, risk radar, inventory forecasts, and human-in-the-loop approvals.
          </p>
        </div>

        <div className="flex items-center gap-3 z-10">
          <Link
            href="/digital-twin"
            className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold px-4 py-2.5 rounded-xl transition-all"
          >
            <span>View Digital Twin</span>
            <ArrowRight className="h-3.5 w-3.5 text-amber-600" />
          </Link>
          <Link
            href="/mirai-ai"
            className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-all"
          >
            <Sparkles className="h-4 w-4 fill-white" />
            <span>Mirai AI Workbench</span>
          </Link>
        </div>
      </div>

      {/* Main Hackathon Active Scenario Box: 500 Business Laptops */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-100 border border-amber-300 rounded-xl text-amber-900 font-bold font-mono">
              PR-1024
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                500 Business Laptops (Target ≤ ₹45,000 / 15-Day Delivery SLA)
              </h2>
              <span className="text-xs text-slate-600">
                Department: Engineering Operations • Total Budget: <span className="text-slate-900 font-bold">₹2,25,00,000</span>
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold bg-amber-100 text-amber-800 border border-amber-300 px-2.5 py-1 rounded-xl">
              RFQ-2026-0500 Active
            </span>
          </div>
        </div>

        {/* 3 Quotation Comparison Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          {/* Vendor A */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">Vendor A</span>
                <h3 className="text-xs font-bold text-slate-900">TechWorld Solutions</h3>
              </div>
              <span className="text-xs font-mono font-bold text-slate-700">76.1 / 100</span>
            </div>
            <div className="space-y-1 text-[11px] font-mono">
              <div className="flex justify-between text-slate-600">
                <span>Unit Price:</span>
                <span className="text-slate-900 font-semibold">₹44,500</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Delivery Days:</span>
                <span className="text-amber-700 font-semibold">20 days (Exceeds SLA)</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Warranty:</span>
                <span className="text-slate-800">12 Months</span>
              </div>
            </div>
          </div>

          {/* Vendor B - WINNER */}
          <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-300 shadow-sm space-y-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-amber-600 text-white font-bold text-[9px] font-mono px-2 py-0.5 rounded-bl">
              RECOMMENDED WINNER
            </div>
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-mono font-bold text-amber-800 uppercase">Vendor B (Tier-1)</span>
                <h3 className="text-xs font-bold text-slate-900">ABC Technologies</h3>
              </div>
              <span className="text-sm font-mono font-bold text-emerald-700">95.2 / 100</span>
            </div>
            <div className="space-y-1 text-[11px] font-mono">
              <div className="flex justify-between text-slate-700">
                <span>Unit Price:</span>
                <span className="text-slate-900 font-bold">₹45,000</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Delivery Days:</span>
                <span className="text-emerald-700 font-bold">10 Days (Within SLA!)</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Warranty:</span>
                <span className="text-emerald-700 font-bold">36 Months Onsite</span>
              </div>
            </div>
          </div>

          {/* Vendor C - ANOMALY */}
          <div className="bg-rose-50/50 p-4 rounded-xl border border-rose-200 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-mono font-bold text-rose-700 uppercase">Vendor C (Anomaly)</span>
                <h3 className="text-xs font-bold text-slate-900">CyberDistributors</h3>
              </div>
              <span className="text-xs font-mono font-bold text-rose-700">60.3 / 100</span>
            </div>
            <div className="space-y-1 text-[11px] font-mono">
              <div className="flex justify-between text-slate-600">
                <span>Unit Price:</span>
                <span className="text-rose-700 font-bold">₹38,000 (19% Below Market)</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Delivery Days:</span>
                <span className="text-rose-700 font-semibold">30 days (Fails SLA)</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Terms:</span>
                <span className="text-rose-700">100% Advance Payment</span>
              </div>
            </div>
          </div>
        </div>

        {/* Explainable AI Decision Banner & Human Approval Trigger */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-800">
            <BrainCircuit className="h-4 w-4" />
            <span>Mirai Explainable Recommendation for PO Generation</span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            &ldquo;Recommending <strong className="text-slate-900">ABC Technologies</strong> because they guarantee 10-day fulfillment, include 3-year onsite hardware warranty, and hold a Tier-1 risk safety score (8.0/100). Vendor C quoted ₹38,000 but was disqualified due to SLA failure and price anomaly flag.&rdquo;
          </p>
          <div className="flex items-center justify-between pt-2 border-t border-slate-200">
            <div className="text-[11px] font-mono text-slate-600">
              Total Landed Cost: <span className="text-emerald-700 font-bold">₹2,62,50,000</span> (includes 18% GST - ₹3,00,000 bulk discount)
            </div>
            {isApproved ? (
              <span className="flex items-center gap-1.5 bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs px-3 py-1.5 rounded-xl font-bold font-mono">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>{activePo.poNumber} Approved &amp; Sent to Supplier</span>
              </span>
            ) : (
              <button
                onClick={() => approvePurchaseOrder(activePo.id)}
                className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs transition-all"
              >
                <span>Human Approve &amp; Generate PO</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
