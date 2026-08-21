'use client';

import React, { useState } from 'react';
import {
  BrainCircuit,
  Sliders,
  UploadCloud,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  Award,
  DollarSign,
  TrendingDown,
  Sparkles,
  RefreshCw,
  Scale
} from 'lucide-react';
import { formatCurrency, calculateVendorScore, ScoreWeights, DEFAULT_SCORE_WEIGHTS } from '@/lib/utils/formatters';
import { DEMO_QUOTATIONS, DEMO_SUPPLIERS, MARKET_BENCHMARK_LAPTOPS } from '@/lib/seed-data';

export default function QuoteIntelligencePage() {
  const [weights, setWeights] = useState<ScoreWeights>(DEFAULT_SCORE_WEIGHTS);
  const [simulatorSlaDays, setSimulatorSlaDays] = useState(15);
  const [isSimulating, setIsSimulating] = useState(false);

  // Recalculate Vendor Scores based on custom weight sliders
  const scoredQuotes = DEMO_QUOTATIONS.map((quote) => {
    const supplier = DEMO_SUPPLIERS.find((s) => s.id === quote.supplierId) || DEMO_SUPPLIERS[0];
    const scores = calculateVendorScore(
      { unitPrice: quote.unitPrice, deliveryDays: quote.deliveryDays, warrantyMonths: quote.warrantyMonths, totalLandedCost: quote.totalLandedCost },
      { qualityScore: supplier.qualityScore, riskScore: supplier.riskScore, deliveryScore: supplier.deliveryScore, sustainabilityScore: supplier.sustainabilityScore },
      { targetUnitPrice: 45000, requiredDeliveryDays: simulatorSlaDays, requiredWarrantyMonths: 36 },
      weights
    );
    return { ...quote, supplier, scores };
  }).sort((a, b) => b.scores.compositeScore - a.scores.compositeScore);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase bg-cyan-950 text-cyan-400 border border-cyan-500/40 px-2 py-0.5 rounded">
              CORE ERP INTELLIGENCE
            </span>
            <span className="text-xs text-slate-400 font-mono font-bold">Total Landed Cost Engine</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-100 mt-1">
            Quote Intelligence Center (Multi-Factor Analysis)
          </h1>
          <p className="text-xs text-slate-400">
            Autonomous PDF/CSV quote parser, Total Landed Cost normalizer, multi-factor scoring, and What-If simulator.
          </p>
        </div>
      </div>

      {/* Upload Parser Banner */}
      <div className="bg-slate-900 border border-dashed border-cyan-500/40 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left bg-slate-950/60">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-cyan-950 border border-cyan-500/40 rounded-2xl text-cyan-400 shrink-0">
            <UploadCloud className="h-8 w-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-extrabold text-slate-100">Upload New Supplier Quotation (PDF, CSV, XLSX)</h3>
            <p className="text-xs text-slate-400">
              Drag & drop supplier quote files. Mirai AI automatically extracts items, unit costs, freight charges, tax terms, and warranty SLAs.
            </p>
          </div>
        </div>

        <button className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 text-slate-950 font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all shrink-0">
          <FileSpreadsheet className="h-4 w-4" />
          <span>Upload Quote Document</span>
        </button>
      </div>

      {/* Main Quote Comparison Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-base font-extrabold text-slate-100 flex items-center gap-2">
            <span>Multi-Factor Vendor Scoring Matrix</span>
            <span className="text-xs font-mono text-cyan-400 bg-cyan-950 border border-cyan-800 px-2 py-0.5 rounded">
              RFQ-2026-0500
            </span>
          </h2>
          <span className="text-xs text-slate-400 font-mono">3 Quotes Extracted</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px] uppercase">
                <th className="py-3 px-3">Rank</th>
                <th className="py-3 px-3">Supplier Name</th>
                <th className="py-3 px-3">Unit Price</th>
                <th className="py-3 px-3">Total Landed Cost</th>
                <th className="py-3 px-3">Delivery SLA</th>
                <th className="py-3 px-3">Warranty</th>
                <th className="py-3 px-3">Composite Score</th>
                <th className="py-3 px-3">AI Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {scoredQuotes.map((q, idx) => (
                <tr key={q.id} className={idx === 0 ? 'bg-cyan-950/20' : ''}>
                  <td className="py-3 px-3 font-mono font-bold">
                    {idx === 0 ? (
                      <span className="text-emerald-400 flex items-center gap-1">
                        <Award className="h-4 w-4" /> #1
                      </span>
                    ) : (
                      `#${idx + 1}`
                    )}
                  </td>
                  <td className="py-3 px-3">
                    <div className="font-bold text-slate-200">{q.supplierName}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{q.paymentTerms}</div>
                  </td>
                  <td className="py-3 px-3 font-mono font-semibold text-slate-200">
                    {formatCurrency(q.unitPrice)}
                  </td>
                  <td className="py-3 px-3 font-mono font-bold text-cyan-300">
                    {formatCurrency(q.totalLandedCost)}
                  </td>
                  <td className="py-3 px-3 font-mono">
                    <span className={q.deliveryDays <= simulatorSlaDays ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                      {q.deliveryDays} Days
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-300">
                    {q.warrantyMonths} Months
                  </td>
                  <td className="py-3 px-3 font-mono">
                    <div className="text-sm font-extrabold text-slate-100">{q.scores.compositeScore} / 100</div>
                    <div className="w-24 bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1">
                      <div
                        className={`h-full ${idx === 0 ? 'bg-emerald-400' : idx === 1 ? 'bg-cyan-400' : 'bg-rose-400'}`}
                        style={{ width: `${q.scores.compositeScore}%` }}
                      />
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    {q.status === 'RECOMMENDED' ? (
                      <span className="bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-[10px] font-mono px-2 py-0.5 rounded font-bold">
                        RECOMMENDED WINNER
                      </span>
                    ) : q.isAnomaly ? (
                      <span className="bg-rose-950 text-rose-300 border border-rose-800/50 text-[10px] font-mono px-2 py-0.5 rounded font-bold">
                        ANOMALY FLAG
                      </span>
                    ) : (
                      <span className="bg-slate-950 text-slate-400 border border-slate-800 text-[10px] font-mono px-2 py-0.5 rounded">
                        EVALUATED
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* What-If Simulator & Weight Customizer */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* What-If Simulator */}
        <div className="bg-slate-900 border border-cyan-500/30 p-6 rounded-2xl space-y-4 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 font-extrabold text-[9px] font-mono px-3 py-1 rounded-bl">
            SIMULATION — NO REAL PROCUREMENT ACTION
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 border-b border-slate-800 pb-3">
            <Sliders className="h-4 w-4" />
            <span>Procurement What-If Simulator</span>
          </div>

          <div className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <div className="flex justify-between font-mono">
                <span className="text-slate-300">Required Delivery Deadline SLA:</span>
                <span className="text-cyan-400 font-bold">{simulatorSlaDays} Days</span>
              </div>
              <input
                type="range"
                min="5"
                max="35"
                value={simulatorSlaDays}
                onChange={(e) => setSimulatorSlaDays(Number(e.target.value))}
                className="w-full accent-cyan-400 bg-slate-950 h-2 rounded-lg cursor-pointer"
              />
            </div>

            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
              <span className="text-slate-400 font-mono text-[10px] uppercase">Simulation Output Impact</span>
              <p className="text-slate-200">
                At <span className="text-cyan-400 font-bold">{simulatorSlaDays} days</span> SLA requirement,{' '}
                <strong className="text-emerald-400">{scoredQuotes[0]?.supplierName}</strong> remains Rank #1 with a score of{' '}
                <span className="text-emerald-400 font-bold font-mono">{scoredQuotes[0]?.scores.compositeScore}/100</span>.
              </p>
            </div>
          </div>
        </div>

        {/* AI Negotiation Assistant */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 border-b border-slate-800 pb-3">
            <BrainCircuit className="h-4 w-4" />
            <span>AI Negotiation Assistant</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 bg-cyan-950/40 border border-cyan-500/30 rounded-xl space-y-2">
              <div className="flex justify-between items-center font-mono">
                <span className="text-slate-300">Target Negotiation Price:</span>
                <span className="text-emerald-400 font-bold">₹43,500 / unit</span>
              </div>
              <p className="text-slate-300 text-[11px]">
                Estimated negotiation savings potential: <strong className="text-emerald-400">3% – 5% (₹7.5 Lakhs total)</strong>.
              </p>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs font-mono space-y-1">
              <div className="text-slate-400 text-[10px] uppercase">Recommended Counter-Offer Term Sheet</div>
              <div className="text-slate-200">1. Unit price reduction to ₹44,000 for 500 unit volume commitment.</div>
              <div className="text-slate-200">2. Request white-glove deployment included at zero extra charge.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
