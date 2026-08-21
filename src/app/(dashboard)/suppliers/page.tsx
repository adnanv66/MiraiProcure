'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Building2,
  Search,
  Plus,
  ShieldCheck,
  ShieldAlert,
  MapPin,
  CheckCircle2,
  FileCheck2,
  Upload,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { DEMO_SUPPLIERS } from '@/lib/seed-data';
import { Supplier } from '@/types';

export default function SuppliersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('ALL');

  const filteredSuppliers = DEMO_SUPPLIERS.filter((supplier) => {
    const matchSearch =
      supplier.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase bg-cyan-950 text-cyan-400 border border-cyan-500/40 px-2 py-0.5 rounded">
              SUPPLIER MANAGEMENT
            </span>
            <span className="text-xs text-slate-400 font-mono">10 Active Vendors</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-100 mt-1">
            Supplier 360 Directory (Vendor Intelligence)
          </h1>
          <p className="text-xs text-slate-400">
            Comprehensive vendor performance, AI document onboarding, tax/GST compliance, and risk profiling.
          </p>
        </div>

        <button className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 text-slate-950 font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-cyan-500/20 transition-all shrink-0">
          <Upload className="h-4 w-4" />
          <span>AI Supplier Onboard Document</span>
        </button>
      </div>

      {/* Filter & Search Controls */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="h-4 w-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search suppliers by name, code, location, or GST number..."
            className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-500/50 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Supplier Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSuppliers.map((supplier) => (
          <div
            key={supplier.id}
            className="bg-slate-900 border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-5 space-y-4 shadow-xl transition-all glass-card-hover flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 font-bold bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                    {supplier.code}
                  </span>
                  <h3 className="text-base font-extrabold text-slate-100 mt-1">{supplier.companyName}</h3>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                    <MapPin className="h-3 w-3 text-slate-500" />
                    <span>{supplier.location}</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-mono font-bold text-slate-300">Risk Score</div>
                  <div
                    className={`text-sm font-extrabold font-mono ${
                      supplier.riskScore > 50 ? 'text-rose-400' : 'text-emerald-400'
                    }`}
                  >
                    {supplier.riskScore} / 100
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-800 text-xs font-mono">
                <div className="flex justify-between text-slate-400">
                  <span>Industry:</span>
                  <span className="text-slate-200">{supplier.industry}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>GST / Tax ID:</span>
                  <span className="text-slate-300">{supplier.taxId}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Payment Terms:</span>
                  <span className="text-cyan-400 font-bold">{supplier.paymentTerms}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center pt-2 font-mono text-[10px]">
                <div className="p-1.5 bg-slate-950 rounded border border-slate-800">
                  <span className="text-slate-400 block">Delivery</span>
                  <span className="text-emerald-400 font-bold">{supplier.deliveryScore}%</span>
                </div>
                <div className="p-1.5 bg-slate-950 rounded border border-slate-800">
                  <span className="text-slate-400 block">Quality</span>
                  <span className="text-cyan-300 font-bold">{supplier.qualityScore}%</span>
                </div>
                <div className="p-1.5 bg-slate-950 rounded border border-slate-800">
                  <span className="text-slate-400 block">ESG</span>
                  <span className="text-indigo-400 font-bold">{supplier.sustainabilityScore}%</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" /> VERIFIED VENDOR
              </span>
              <Link
                href={`/suppliers/${supplier.id}`}
                className="text-xs font-semibold text-cyan-400 hover:underline flex items-center gap-1"
              >
                <span>Supplier 360</span>
                <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
