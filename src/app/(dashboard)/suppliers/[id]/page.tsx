'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  Building2,
  MapPin,
  Mail,
  Phone,
  ShieldCheck,
  ShieldAlert,
  FileText,
  Award,
  CheckCircle2,
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import { DEMO_SUPPLIERS } from '@/lib/seed-data';

export default function SupplierDetailPage() {
  const params = useParams();
  const supplierId = params?.id as string;
  const supplier = DEMO_SUPPLIERS.find((s) => s.id === supplierId) || DEMO_SUPPLIERS[1]; // ABC Technologies fallback

  return (
    <div className="space-y-6">
      {/* Back Button & Header */}
      <div className="flex items-center gap-3">
        <Link
          href="/suppliers"
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <span className="text-[10px] font-mono uppercase text-cyan-400">Supplier 360 Profile</span>
          <h1 className="text-2xl font-extrabold text-slate-100">{supplier.companyName}</h1>
        </div>
      </div>

      {/* Main Profile Info Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Company Summary */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-mono text-cyan-400 font-bold">{supplier.code}</span>
            <span className="bg-emerald-950 text-emerald-400 border border-emerald-500/40 text-[10px] font-mono px-2 py-0.5 rounded font-bold">
              {supplier.status}
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <Building2 className="h-4 w-4 text-slate-500" />
              <span>{supplier.industry}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <MapPin className="h-4 w-4 text-slate-500" />
              <span>{supplier.location}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Mail className="h-4 w-4 text-slate-500" />
              <span>{supplier.email}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Phone className="h-4 w-4 text-slate-500" />
              <span>{supplier.phone}</span>
            </div>
          </div>
        </div>

        {/* Scoring & Compliance Breakdown */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 shadow-xl">
          <h3 className="text-xs font-extrabold text-slate-200 uppercase tracking-wider font-mono">Performance Scores</h3>
          <div className="space-y-3 text-xs font-mono">
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Delivery Performance SLA:</span>
                <span className="text-emerald-400 font-bold">{supplier.deliveryScore}%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-400 h-full" style={{ width: `${supplier.deliveryScore}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Quality Score:</span>
                <span className="text-cyan-400 font-bold">{supplier.qualityScore}%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-cyan-400 h-full" style={{ width: `${supplier.qualityScore}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Sustainability / ESG Rating:</span>
                <span className="text-indigo-400 font-bold">{supplier.sustainabilityScore}%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-indigo-400 h-full" style={{ width: `${supplier.sustainabilityScore}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* AI Compliance Verification Card */}
        <div className="bg-slate-900 border border-cyan-500/30 p-6 rounded-2xl space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
            <Sparkles className="h-4 w-4" />
            <span>Mirai AI Verified Compliance</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
            <div className="flex justify-between border-b border-slate-800 pb-1">
              <span className="text-slate-400">GST Registration:</span>
              <span className="text-emerald-400 font-bold">{supplier.taxId}</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-1">
              <span className="text-slate-400">Certifications:</span>
              <span className="text-slate-200">{supplier.certifications}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Default Terms:</span>
              <span className="text-cyan-300 font-bold">{supplier.paymentTerms}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
