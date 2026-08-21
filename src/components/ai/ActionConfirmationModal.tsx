'use client';

import React from 'react';
import { AlertTriangle, ShieldCheck, Check, X } from 'lucide-react';
import { formatCurrency } from '@/lib/utils/formatters';

interface ActionConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  payload: {
    actionType: string;
    entityName: string;
    entityId: string;
    totalAmount?: number;
    details: string;
  } | null;
}

export const ActionConfirmationModal: React.FC<ActionConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  payload,
}) => {
  if (!isOpen || !payload) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-slate-900 border border-cyan-500/30 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 relative overflow-hidden">
        {/* Glowing Ambient Top Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-sky-400 to-indigo-600" />

        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 bg-cyan-950 border border-cyan-500/40 rounded-xl text-cyan-400">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">Human-in-the-Loop Governance</span>
            <h3 className="text-lg font-extrabold text-slate-100">Mirai AI Action Confirmation</h3>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs space-y-2 font-mono">
            <div className="flex justify-between border-b border-slate-800 pb-1.5">
              <span className="text-slate-400">Action:</span>
              <span className="font-bold text-cyan-300">{payload.actionType}</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-1.5">
              <span className="text-slate-400">Target Supplier:</span>
              <span className="font-semibold text-slate-200">{payload.entityName}</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-1.5">
              <span className="text-slate-400">Reference ID:</span>
              <span className="text-slate-300">{payload.entityId}</span>
            </div>
            {payload.totalAmount !== undefined && (
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">Total Landed Amount:</span>
                <span className="font-bold text-emerald-400 text-sm">{formatCurrency(payload.totalAmount)}</span>
              </div>
            )}
            <div className="pt-1 text-slate-300 font-sans leading-relaxed">
              <span className="text-slate-400 font-mono">Reasoning: </span>
              {payload.details}
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-300 text-xs">
            <AlertTriangle className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
            <p>
              Organization policy requires explicit human confirmation for high-value financial commitments. Executing this step will generate the formal Purchase Order.
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all"
          >
            <X className="h-4 w-4" />
            <span>Cancel</span>
          </button>
          <button
            onClick={onConfirm}
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 text-slate-950 text-xs font-extrabold shadow-lg shadow-cyan-500/25 transition-all"
          >
            <Check className="h-4 w-4 stroke-[3]" />
            <span>Confirm & Execute PO</span>
          </button>
        </div>
      </div>
    </div>
  );
};
