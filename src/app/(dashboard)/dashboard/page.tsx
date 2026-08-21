'use client';

import React from 'react';
import Link from 'next/link';
import { useProcurement } from '@/lib/store/procurement-store';
import {
  LayoutDashboard,
  Radio,
  BrainCircuit,
  Network,
  ArrowRight,
  ShieldAlert,
  Boxes,
  Landmark,
  FileCheck2,
  CheckCircle2,
  Building2,
  TrendingUp,
  FileText,
  DollarSign,
  AlertTriangle,
  Clock,
  Sparkles
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils/formatters';

export default function DashboardPage() {
  const { currentUser, purchaseRequests, rfqs, quotations, purchaseOrders, inventory, invoices, riskSignals } = useProcurement();

  const role = currentUser.role;

  return (
    <div className="space-y-6">
      {/* Role-Specific Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold uppercase bg-amber-100 text-amber-800 border border-amber-300 px-2.5 py-0.5 rounded">
              {role.replace('_', ' ')} WORKSPACE
            </span>
            <span className="text-xs text-slate-500 font-mono">Live Role View</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">
            Procurement Cockpit — Welcome, {currentUser.name}
          </h1>
          <p className="text-xs text-slate-600">
            {role === 'ADMIN' && 'Organization-wide system administration, RBAC controls, and full procurement audit trail.'}
            {role === 'PROCUREMENT_MANAGER' && 'Strategic procurement overview, vendor scoring benchmarks, savings, and risk monitoring.'}
            {role === 'PROCUREMENT_OFFICER' && 'Operational workspace for purchase requests, RFQ drafting, and supplier response evaluation.'}
            {role === 'FINANCE_MANAGER' && 'Financial governance, invoice 3-way matching engine, and payment authorization.'}
            {role === 'INVENTORY_MANAGER' && 'Warehouse stock replenishment radar and predictive automated reorder signals.'}
            {role === 'APPROVER' && 'Executive approval board for high-value purchase orders and sensitive AI actions.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/command-center"
            className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm transition-all shrink-0"
          >
            <Radio className="h-4 w-4" />
            <span>Launch Command Center</span>
          </Link>
        </div>
      </div>

      {/* Quick Access Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          href="/command-center"
          className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 shadow-xs transition-all glass-card-hover space-y-2"
        >
          <div className="flex justify-between items-center text-amber-600">
            <Radio className="h-5 w-5" />
            <ArrowRight className="h-4 w-4" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Procurement Command Center</h3>
          <p className="text-xs text-slate-500">Live operation hub for 500 Business Laptops procurement flow.</p>
        </Link>

        <Link
          href="/quote-intelligence"
          className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 shadow-xs transition-all glass-card-hover space-y-2"
        >
          <div className="flex justify-between items-center text-amber-600">
            <BrainCircuit className="h-5 w-5" />
            <ArrowRight className="h-4 w-4" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Quote Intelligence Center</h3>
          <p className="text-xs text-slate-500">Landed cost engine, multi-factor scoring &amp; anomaly detection.</p>
        </Link>

        <Link
          href="/digital-twin"
          className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 shadow-xs transition-all glass-card-hover space-y-2"
        >
          <div className="flex justify-between items-center text-amber-600">
            <Network className="h-5 w-5" />
            <ArrowRight className="h-4 w-4" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Digital Procurement Twin</h3>
          <p className="text-xs text-slate-500">Interactive procurement process graph and state twin.</p>
        </Link>
      </div>

      {/* ROLE-AWARE METRIC PANELS */}

      {/* 1. ADMIN & PROCUREMENT MANAGER DASHBOARD VIEW */}
      {(role === 'ADMIN' || role === 'PROCUREMENT_MANAGER') && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-1 shadow-xs">
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">Monthly Spend</span>
              <div className="text-xl font-bold font-mono text-slate-900">₹2.62 Crores</div>
              <span className="text-[10px] text-emerald-600 font-semibold">100% Budget SLA Compliant</span>
            </div>

            <div className="bg-white border border-amber-300 p-5 rounded-2xl space-y-1 shadow-xs bg-amber-50/30">
              <span className="text-[10px] font-mono font-bold text-amber-800 uppercase">Optimized Savings</span>
              <div className="text-xl font-bold font-mono text-amber-700">₹3,00,000</div>
              <span className="text-[10px] text-slate-600">Via Landed Cost Engine</span>
            </div>

            <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-1 shadow-xs">
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">Active RFQs</span>
              <div className="text-xl font-bold font-mono text-slate-900">{rfqs.length} Published</div>
              <span className="text-[10px] text-slate-500">RFQ-2026-0500 Active</span>
            </div>

            <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-1 shadow-xs">
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">Supplier Health</span>
              <div className="text-xl font-bold font-mono text-emerald-600">95.2 / 100</div>
              <span className="text-[10px] text-emerald-600 font-semibold">ABC Technologies Top Rank</span>
            </div>
          </div>
        </div>
      )}

      {/* 2. PROCUREMENT OFFICER DASHBOARD VIEW */}
      {role === 'PROCUREMENT_OFFICER' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-1 shadow-xs">
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">Purchase Requests</span>
              <div className="text-xl font-bold font-mono text-slate-900">{purchaseRequests.length} Active</div>
              <span className="text-[10px] text-amber-700 font-semibold">PR-2026-1024 Urgent</span>
            </div>

            <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-1 shadow-xs">
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">Active RFQs</span>
              <div className="text-xl font-bold font-mono text-slate-900">{rfqs.length} Open</div>
              <span className="text-[10px] text-slate-500">3 Supplier Responses</span>
            </div>

            <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-1 shadow-xs">
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">Quotations Evaluated</span>
              <div className="text-xl font-bold font-mono text-slate-900">{quotations.length} Received</div>
              <span className="text-[10px] text-amber-700 font-semibold">Top Score: 95.2</span>
            </div>

            <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-1 shadow-xs">
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">PO Drafts</span>
              <div className="text-xl font-bold font-mono text-slate-900">{purchaseOrders.length} Drafted</div>
              <span className="text-[10px] text-slate-500">Awaiting Approval</span>
            </div>
          </div>
        </div>
      )}

      {/* 3. FINANCE MANAGER DASHBOARD VIEW */}
      {role === 'FINANCE_MANAGER' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-1 shadow-xs">
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">Total Invoiced Amount</span>
              <div className="text-xl font-bold font-mono text-slate-900">₹2.62 Crores</div>
              <span className="text-[10px] text-slate-500">PO-2026-9001</span>
            </div>

            <div className="bg-white border border-rose-300 p-5 rounded-2xl space-y-1 shadow-xs bg-rose-50/40">
              <span className="text-[10px] font-mono font-bold text-rose-700 uppercase">3-Way Match Mismatch</span>
              <div className="text-xl font-bold font-mono text-rose-700">1 Discrepancy</div>
              <span className="text-[10px] text-rose-600 font-semibold">520 invoiced vs 500 received</span>
            </div>

            <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-1 shadow-xs">
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">Payments Held</span>
              <div className="text-xl font-bold font-mono text-amber-700">₹2,62,50,000</div>
              <span className="text-[10px] text-amber-700 font-semibold">Held for Mismatch Resolution</span>
            </div>

            <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-1 shadow-xs">
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">Payment SLA</span>
              <div className="text-xl font-bold font-mono text-slate-900">Net 45</div>
              <span className="text-[10px] text-slate-500">Due in 45 days</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Landmark className="h-4 w-4 text-amber-600" />
              <span>Financial Governance &amp; Three-Way Match Engine</span>
            </h3>
            <p className="text-xs text-slate-600">
              Finance Managers can verify PO numbers against Goods Receipt Notes (GRN) and Supplier Invoices.
            </p>
            <Link
              href="/finance"
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2 rounded-xl"
            >
              <span>Open Finance &amp; 3-Way Match Workspace</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* 4. INVENTORY MANAGER DASHBOARD VIEW */}
      {role === 'INVENTORY_MANAGER' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-1 shadow-xs">
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">Tracked SKUs</span>
              <div className="text-xl font-bold font-mono text-slate-900">{inventory.length} Products</div>
              <span className="text-[10px] text-slate-500">Global Hub Warehouses</span>
            </div>

            <div className="bg-white border border-amber-300 p-5 rounded-2xl space-y-1 shadow-xs bg-amber-50/40">
              <span className="text-[10px] font-mono font-bold text-amber-800 uppercase">Available Stock</span>
              <div className="text-xl font-bold font-mono text-amber-700">7 Units</div>
              <span className="text-[10px] text-amber-800 font-semibold">Reorder Alert Active</span>
            </div>

            <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-1 shadow-xs">
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">Stockout Prediction</span>
              <div className="text-xl font-bold font-mono text-rose-600">11 Days</div>
              <span className="text-[10px] text-rose-600 font-semibold">Replenishment Required</span>
            </div>

            <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-1 shadow-xs">
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">Incoming Replenishment</span>
              <div className="text-xl font-bold font-mono text-emerald-600">+500 Units</div>
              <span className="text-[10px] text-slate-500">PO-2026-9001 Approved</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Boxes className="h-4 w-4 text-amber-600" />
              <span>Predictive Inventory Reorder Engine</span>
            </h3>
            <p className="text-xs text-slate-600">
              Mirai AI monitors warehouse stock levels and burn velocity to automatically generate replenishment requests before stockouts occur.
            </p>
            <Link
              href="/inventory"
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2 rounded-xl"
            >
              <span>Open Predictive Inventory Workspace</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* 5. APPROVER DASHBOARD VIEW */}
      {role === 'APPROVER' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white border border-amber-300 p-5 rounded-2xl space-y-1 shadow-xs bg-amber-50/40">
              <span className="text-[10px] font-mono font-bold text-amber-800 uppercase">Pending Approvals</span>
              <div className="text-xl font-bold font-mono text-amber-800">1 PO Draft</div>
              <span className="text-[10px] text-amber-800 font-semibold">PO-2026-9001 (₹2.25 Cr)</span>
            </div>

            <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-1 shadow-xs">
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">Approval Authority</span>
              <div className="text-xl font-bold font-mono text-slate-900">₹5.00 Crores</div>
              <span className="text-[10px] text-slate-500">Tier-1 Board Limit</span>
            </div>

            <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-1 shadow-xs">
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">AI Recommendation</span>
              <div className="text-xl font-bold font-mono text-emerald-600">95.2 Score</div>
              <span className="text-[10px] text-emerald-600 font-semibold">ABC Technologies (Vendor B)</span>
            </div>

            <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-1 shadow-xs">
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">Risk Level</span>
              <div className="text-xl font-bold font-mono text-emerald-600">Low (8.0/100)</div>
              <span className="text-[10px] text-slate-500">ESG &amp; ISO Certified</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-amber-600" />
              <span>Human-in-the-Loop Executive Approvals</span>
            </h3>
            <p className="text-xs text-slate-600">
              Review explainable AI vendor scores and trade-off breakdowns before releasing high-value Purchase Orders to suppliers.
            </p>
            <Link
              href="/approvals"
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2 rounded-xl"
            >
              <span>Review Pending Approvals</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
