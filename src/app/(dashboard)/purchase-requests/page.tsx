'use client';

import React, { useState } from 'react';
import { FileSpreadsheet, Plus, Sparkles } from 'lucide-react';
import { formatCurrency } from '@/lib/utils/formatters';
import { useProcurement } from '@/lib/store/procurement-store';

export default function PurchaseRequestsPage() {
  const { purchaseRequests, createPurchaseRequest } = useProcurement();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [title, setTitle] = useState('');
  const [quantity, setQuantity] = useState(500);
  const [estimatedUnit, setEstimatedUnit] = useState(45000);
  const [justification, setJustification] = useState('Quarterly expansion requirement with 15-day delivery SLA.');

  const handleCreatePr = (e: React.FormEvent) => {
    e.preventDefault();
    createPurchaseRequest({
      title: title || '500 High-Performance Business Laptops',
      category: 'IT Hardware',
      quantity: Number(quantity),
      estimatedUnit: Number(estimatedUnit),
      justification,
    });
    setShowCreateModal(false);
    setTitle('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase bg-cyan-950 text-cyan-400 border border-cyan-500/40 px-2 py-0.5 rounded">
              PROCUREMENT LIFECYCLE STEP 1
            </span>
            <span className="text-xs text-slate-400 font-mono">Purchase Requisitions ({purchaseRequests.length} Total)</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-100 mt-1">
            Purchase Requests (Requisitions)
          </h1>
          <p className="text-xs text-slate-400">
            Submit, track, and process procurement intents. Mirai AI can generate PRs from natural language commands.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 text-slate-950 font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-cyan-500/20 transition-all shrink-0"
        >
          <Plus className="h-4 w-4 stroke-[3]" />
          <span>New Purchase Request</span>
        </button>
      </div>

      {/* PR Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px] uppercase">
                <th className="py-3 px-3">PR Number</th>
                <th className="py-3 px-3">Title & Item</th>
                <th className="py-3 px-3">Requester</th>
                <th className="py-3 px-3">Quantity</th>
                <th className="py-3 px-3">Estimated Budget</th>
                <th className="py-3 px-3">Priority</th>
                <th className="py-3 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {purchaseRequests.map((pr) => (
                <tr key={pr.id} className="hover:bg-slate-850/50 transition-colors">
                  <td className="py-3.5 px-3 font-mono font-bold text-cyan-400">
                    {pr.prNumber}
                  </td>
                  <td className="py-3.5 px-3">
                    <div className="font-bold text-slate-200">{pr.title}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{pr.category}</div>
                  </td>
                  <td className="py-3.5 px-3">
                    <div className="font-medium text-slate-300">{pr.requesterName}</div>
                    <div className="text-[10px] text-slate-500">{pr.department}</div>
                  </td>
                  <td className="py-3.5 px-3 font-mono font-semibold text-slate-200">
                    {pr.quantity} units
                  </td>
                  <td className="py-3.5 px-3 font-mono font-bold text-emerald-400">
                    {formatCurrency(pr.totalBudget)}
                  </td>
                  <td className="py-3.5 px-3 font-mono">
                    <span className="bg-rose-950 text-rose-300 border border-rose-800/50 text-[10px] px-2 py-0.5 rounded font-bold">
                      {pr.priority}
                    </span>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="bg-cyan-950 text-cyan-300 border border-cyan-500/40 text-[10px] font-mono px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 w-fit">
                      <Sparkles className="h-3 w-3" /> {pr.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for manual PR creation */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-slate-100">Create New Purchase Request</h3>
            <form onSubmit={handleCreatePr} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 font-mono">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="500 High-Performance Business Laptops"
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-100"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-mono">Quantity</label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-100"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-mono">Target Price (₹)</label>
                  <input
                    type="number"
                    value={estimatedUnit}
                    onChange={(e) => setEstimatedUnit(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-100"
                  />
                </div>
              </div>
              <div>
                <label className="text-slate-300 font-mono">Justification</label>
                <textarea
                  value={justification}
                  onChange={(e) => setJustification(e.target.value)}
                  rows={2}
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-100"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-3 py-1.5 rounded bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-cyan-500 text-slate-950 font-bold"
                >
                  Create PR & Store
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
