'use client';

import React from 'react';
import { Activity, ShieldCheck, User } from 'lucide-react';
import { useProcurement } from '@/lib/store/procurement-store';

export default function AuditTrailPage() {
  const { auditLogs } = useProcurement();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase bg-cyan-950 text-cyan-400 border border-cyan-500/40 px-2 py-0.5 rounded">
              IMMUTABLE AUDIT LEDGER
            </span>
            <span className="text-xs text-slate-400 font-mono">Traceability & Compliance ({auditLogs.length} Records)</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-100 mt-1">
            Audit Trail Ledger (System Ledger)
          </h1>
          <p className="text-xs text-slate-400">
            Immutable system audit logs recording every user action, AI tool invocation, and human approval decision.
          </p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="space-y-3 font-mono text-xs">
          {auditLogs.map((log) => (
            <div key={log.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="text-cyan-400 font-bold">{log.action}</span>
                <span className="text-[10px] text-slate-500">{log.timestamp}</span>
              </div>
              <div className="text-slate-300 font-sans">{log.details}</div>
              <div className="flex items-center gap-2 text-[10px] text-slate-400 pt-1 border-t border-slate-800/60">
                <span>User: <strong className="text-slate-200">{log.userName}</strong></span>
                <span>•</span>
                <span>Entity: <strong className="text-cyan-300">{log.entity} ({log.entityId})</strong></span>
                {log.aiActionId && (
                  <>
                    <span>•</span>
                    <span className="text-cyan-400">AI Tool ID: {log.aiActionId}</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
