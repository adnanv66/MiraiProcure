'use client';

import React from 'react';
import { FileText, Calendar, ShieldCheck, AlertCircle } from 'lucide-react';

export default function ContractsPage() {
  const demoContracts = [
    {
      id: 'cnt-1',
      contractNumber: 'CNT-2026-001',
      supplierName: 'ABC Technologies',
      title: 'Global IT Hardware Master Services Agreement (MSA)',
      contractValue: 45000000,
      startDate: '2025-01-01',
      endDate: '2027-12-31',
      renewalDate: '2027-11-30',
      slaGuarantee: '99.9% Uptime & 10-day Hardware SLA',
      status: 'ACTIVE',
    },
    {
      id: 'cnt-2',
      contractNumber: 'CNT-2026-002',
      supplierName: 'TechWorld Solutions',
      title: 'Secondary Hardware Supply Agreement',
      contractValue: 15000000,
      startDate: '2025-06-01',
      endDate: '2026-10-31',
      renewalDate: '2026-09-30',
      slaGuarantee: '20-day Standard SLA',
      status: 'EXPIRING_SOON',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase bg-cyan-950 text-cyan-400 border border-cyan-500/40 px-2 py-0.5 rounded">
              CONTRACT INTELLIGENCE
            </span>
            <span className="text-xs text-slate-400 font-mono">Master Agreements & SLAs</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-100 mt-1">
            Contracts Intelligence (Master SLAs)
          </h1>
          <p className="text-xs text-slate-400">
            Autonomous contract extraction, expiration radar, penalty clauses, and SLA enforcement.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {demoContracts.map((c) => (
          <div key={c.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
            <div className="flex justify-between items-start border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950 px-2.5 py-1 rounded border border-cyan-800">
                  {c.contractNumber}
                </span>
                <h3 className="text-base font-extrabold text-slate-100 mt-1">{c.title}</h3>
                <span className="text-xs text-slate-400">{c.supplierName}</span>
              </div>
              <span className={`text-xs font-mono px-2.5 py-1 rounded-lg font-bold ${
                c.status === 'EXPIRING_SOON' ? 'bg-amber-950 text-amber-300 border border-amber-500/40' : 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
              }`}>
                {c.status}
              </span>
            </div>

            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex justify-between text-slate-400">
                <span>Contract Value:</span>
                <span className="text-emerald-400 font-bold">₹{c.contractValue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Validity Period:</span>
                <span className="text-slate-200">{c.startDate} to {c.endDate}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>SLA Guarantee:</span>
                <span className="text-cyan-300">{c.slaGuarantee}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
