'use client';

import React, { useState } from 'react';
import { ShieldCheck, Lock, CheckCircle2, Sliders, AlertTriangle } from 'lucide-react';

export default function AIGovernancePage() {
  const [autonomyLevel, setAutonomyLevel] = useState<'LEVEL_1' | 'LEVEL_2' | 'LEVEL_3'>('LEVEL_2');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase bg-cyan-950 text-cyan-400 border border-cyan-500/40 px-2 py-0.5 rounded">
              AI SAFETY & AUTONOMY
            </span>
            <span className="text-xs text-slate-400 font-mono">Organization Policy Framework</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-100 mt-1">
            AI Governance & Autonomy Control (Policy Controls)
          </h1>
          <p className="text-xs text-slate-400">
            Configure permission boundaries, human-in-the-loop triggers, and enterprise AI autonomy levels.
          </p>
        </div>
      </div>

      {/* Autonomy Selector Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Level 1 */}
        <div
          onClick={() => setAutonomyLevel('LEVEL_1')}
          className={`p-6 rounded-2xl border cursor-pointer transition-all space-y-3 ${
            autonomyLevel === 'LEVEL_1'
              ? 'bg-slate-900 border-cyan-400 shadow-xl shadow-cyan-500/20'
              : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex justify-between items-center">
            <span className="text-xs font-mono font-bold text-slate-300">Level 1</span>
            {autonomyLevel === 'LEVEL_1' && <CheckCircle2 className="h-4 w-4 text-cyan-400" />}
          </div>
          <h3 className="text-sm font-extrabold text-slate-100">Assist Mode</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Mirai AI provides recommendations and answers questions only. All actions must be performed manually by humans.
          </p>
        </div>

        {/* Level 2 - Default */}
        <div
          onClick={() => setAutonomyLevel('LEVEL_2')}
          className={`p-6 rounded-2xl border cursor-pointer transition-all space-y-3 relative overflow-hidden ${
            autonomyLevel === 'LEVEL_2'
              ? 'bg-cyan-950/40 border-cyan-400 shadow-xl shadow-cyan-500/20'
              : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="absolute top-0 right-0 bg-cyan-500 text-slate-950 font-bold text-[9px] font-mono px-2 py-0.5 rounded-bl">
            RECOMMENDED
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs font-mono font-bold text-cyan-400">Level 2</span>
            {autonomyLevel === 'LEVEL_2' && <CheckCircle2 className="h-4 w-4 text-cyan-400" />}
          </div>
          <h3 className="text-sm font-extrabold text-cyan-300">Semi-Autonomous</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Mirai AI creates PRs, drafts RFQs, and parses quotes automatically. Sensitive high-value actions require human approval.
          </p>
        </div>

        {/* Level 3 */}
        <div
          onClick={() => setAutonomyLevel('LEVEL_3')}
          className={`p-6 rounded-2xl border cursor-pointer transition-all space-y-3 ${
            autonomyLevel === 'LEVEL_3'
              ? 'bg-slate-900 border-cyan-400 shadow-xl shadow-cyan-500/20'
              : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex justify-between items-center">
            <span className="text-xs font-mono font-bold text-slate-300">Level 3</span>
            {autonomyLevel === 'LEVEL_3' && <CheckCircle2 className="h-4 w-4 text-cyan-400" />}
          </div>
          <h3 className="text-sm font-extrabold text-slate-100">Governed Autonomous</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            AI automatically executes low-risk approved workflows within policy limits. Human approval required for payments & contracts.
          </p>
        </div>
      </div>
    </div>
  );
}
