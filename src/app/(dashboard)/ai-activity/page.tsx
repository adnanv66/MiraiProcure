'use client';

import React from 'react';
import { Cpu, Bot } from 'lucide-react';
import { useProcurement } from '@/lib/store/procurement-store';

export default function AIActivityPage() {
  const { aiActivityLogs } = useProcurement();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase bg-cyan-950 text-cyan-400 border border-cyan-500/40 px-2 py-0.5 rounded">
              AI EXECUTION ENGINE
            </span>
            <span className="text-xs text-slate-400 font-mono">Tool Call History ({aiActivityLogs.length} Events)</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-100 mt-1">
            AI Activity Log (Server Tool Logs)
          </h1>
          <p className="text-xs text-slate-400">
            Complete execution log of secure server-side tools called by Mirai AI.
          </p>
        </div>
      </div>

      <div className="space-y-4 font-mono text-xs">
        {aiActivityLogs.map((act) => (
          <div key={act.id} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2 shadow-xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <span className="text-cyan-400 font-bold flex items-center gap-2">
                <Cpu className="h-4 w-4" /> ⚡ {act.toolName}
              </span>
              <span className="text-slate-500 text-[10px]">{act.timestamp}</span>
            </div>
            <div className="text-slate-300 font-sans">
              <span className="text-slate-500 font-mono text-[10px]">USER INTENT: </span>"{act.prompt}"
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-cyan-300">
              <span className="text-slate-400 text-[10px]">TOOL OUTPUT RESULT: </span>{act.result}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
