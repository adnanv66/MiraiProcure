'use client';

import React from 'react';
import { ShoppingCart, CheckCircle2, Download, Sparkles, Check, X } from 'lucide-react';
import { formatCurrency } from '@/lib/utils/formatters';
import { useProcurement } from '@/lib/store/procurement-store';

export default function PurchaseOrdersPage() {
  const { purchaseOrders, approvePurchaseOrder, rejectPurchaseOrder } = useProcurement();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase bg-cyan-950 text-cyan-400 border border-cyan-500/40 px-2 py-0.5 rounded">
              PROCUREMENT LIFECYCLE STEP 3
            </span>
            <span className="text-xs text-slate-400 font-mono">Purchase Orders ({purchaseOrders.length} Total)</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-100 mt-1">
            Purchase Orders (Binding Orders)
          </h1>
          <p className="text-xs text-slate-400">
            Formal legally-binding purchase orders generated autonomously by Mirai AI or authorized by human approvers.
          </p>
        </div>
      </div>

      {/* PO Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {purchaseOrders.map((po) => (
          <div
            key={po.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                <div>
                  <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950 px-2.5 py-1 rounded border border-cyan-800">
                    {po.poNumber}
                  </span>
                  <h3 className="text-base font-extrabold text-slate-100 mt-1">{po.supplierName}</h3>
                </div>
                <span className={`text-xs font-mono px-2.5 py-1 rounded-lg font-bold ${
                  po.status === 'APPROVED'
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                    : 'bg-amber-950 text-amber-300 border border-amber-500/40'
                }`}>
                  {po.status}
                </span>
              </div>

              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-slate-400">
                  <span>Order Total Amount:</span>
                  <span className="text-slate-200">{formatCurrency(po.totalAmount)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Total Landed Cost:</span>
                  <span className="text-emerald-400 font-bold">{formatCurrency(po.landedCost)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Promised Delivery Date:</span>
                  <span className="text-cyan-300">{po.deliveryDate}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Payment Terms:</span>
                  <span className="text-slate-300">{po.paymentTerms}</span>
                </div>
              </div>

              {po.generatedByAI && (
                <div className="p-2.5 bg-cyan-950/60 border border-cyan-500/30 rounded-xl text-[11px] text-cyan-300 flex items-center gap-2 font-mono">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Drafted by Mirai AI from Quote Analysis</span>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
              {po.status === 'PENDING_APPROVAL' ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => approvePurchaseOrder(po.id)}
                    className="flex items-center gap-1 text-xs bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                    <span>Approve PO</span>
                  </button>
                  <button
                    onClick={() => rejectPurchaseOrder(po.id)}
                    className="flex items-center gap-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <X className="h-3.5 w-3.5" />
                    <span>Reject</span>
                  </button>
                </div>
              ) : (
                <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Approved & Dispatched</span>
                </span>
              )}

              <button className="flex items-center gap-1 text-xs bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 px-3 py-1.5 rounded-lg transition-colors">
                <Download className="h-3.5 w-3.5" />
                <span>Export PDF</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
