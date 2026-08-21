'use client';

import React, { useState } from 'react';
import { Bot, Sparkles, Send, Shield, RefreshCw } from 'lucide-react';
import { DEMO_USERS } from '@/lib/seed-data';
import { askMiraiAI } from '@/lib/ai/gemini';
import { ActionConfirmationModal } from '@/components/ai/ActionConfirmationModal';

export default function MiraiAIPage() {
  const currentUser = DEMO_USERS[0];
  const [promptInput, setPromptInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatLog, setChatLog] = useState([
    {
      id: 'welcome',
      sender: 'MIRAI',
      content: `Welcome to the dedicated **Mirai AI Workbench (未来プロキュア)**.\n\nI can execute authorized server tools, analyze quote documents, perform 3-way matching, predict stock depletion, and enforce human-in-the-loop governance. Try typing:\n\n*"I need 500 laptops under ₹45,000 each, delivery within 15 days."*`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [pendingApprovalPayload, setPendingApprovalPayload] = useState<any>(null);
  const [showApprovalModal, setShowApprovalModal] = useState(false);

  const handleSend = async (customPrompt?: string) => {
    const q = customPrompt || promptInput;
    if (!q.trim() || isLoading) return;

    setChatLog((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        sender: 'USER',
        content: q,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setPromptInput('');
    setIsLoading(true);

    try {
      const res = await askMiraiAI(q, currentUser, 'global');
      setChatLog((prev) => [
        ...prev,
        {
          id: `mirai-${Date.now()}`,
          sender: 'MIRAI',
          content: res.content,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);

      const approvalTool = res.toolCallsExecuted?.find((t) => t.requiresApproval);
      if (approvalTool && approvalTool.approvalPayload) {
        setPendingApprovalPayload(approvalTool.approvalPayload);
        setShowApprovalModal(true);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase bg-cyan-950 text-cyan-400 border border-cyan-500/40 px-2 py-0.5 rounded">
              AI PROCUREMENT OPERATING SYSTEM
            </span>
            <span className="text-xs text-slate-400 font-mono">Full-Page Agent Workbench</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-100 mt-1 flex items-center gap-2">
            <span>Mirai AI Workbench</span>
            <span className="text-xs font-mono font-normal text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded">
              Agent Workbench
            </span>
          </h1>
        </div>
      </div>

      {/* Main Workbench Window */}
      <div className="bg-slate-900 border border-cyan-500/30 rounded-2xl h-[600px] flex flex-col shadow-2xl overflow-hidden">
        <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs font-sans">
          {chatLog.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.sender === 'USER' ? 'justify-end' : 'justify-start'}`}>
              {msg.sender === 'MIRAI' && (
                <div className="h-7 w-7 rounded-lg bg-cyan-950 border border-cyan-500/40 text-cyan-400 flex items-center justify-center shrink-0">
                  <Sparkles className="h-4 w-4" />
                </div>
              )}
              <div
                className={`max-w-xl rounded-2xl p-4 space-y-2 ${
                  msg.sender === 'USER'
                    ? 'bg-gradient-to-r from-cyan-600 to-sky-600 text-slate-950 font-semibold shadow-md'
                    : 'bg-slate-950 border border-slate-800 text-slate-200 shadow-inner'
                }`}
              >
                <div className="whitespace-pre-wrap leading-relaxed">{msg.content}</div>
                <div className={`text-[9px] ${msg.sender === 'USER' ? 'text-slate-900/80 text-right' : 'text-slate-500'}`}>
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono">
              <RefreshCw className="h-4 w-4 animate-spin" />
              <span>Mirai AI executing server-side tool chain...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
          <input
            type="text"
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your procurement request..."
            className="flex-1 bg-slate-900 border border-slate-800 focus:border-cyan-500/50 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none"
          />
          <button
            onClick={() => handleSend()}
            disabled={isLoading || !promptInput.trim()}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 text-slate-950 font-extrabold text-xs shadow-md transition-all flex items-center gap-2"
          >
            <Send className="h-4 w-4" />
            <span>Execute</span>
          </button>
        </div>
      </div>

      <ActionConfirmationModal
        isOpen={showApprovalModal}
        onClose={() => setShowApprovalModal(false)}
        onConfirm={() => {
          setShowApprovalModal(false);
          setChatLog((prev) => [
            ...prev,
            {
              id: `confirm-${Date.now()}`,
              sender: 'MIRAI',
              content: `✓ **ACTION CONFIRMED**: Generated Purchase Order \`${pendingApprovalPayload?.entityId}\` for **${pendingApprovalPayload?.entityName}** (Total: ₹${pendingApprovalPayload?.totalAmount?.toLocaleString()}). Audit record written to ledger.`,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            },
          ]);
        }}
        payload={pendingApprovalPayload}
      />
    </div>
  );
}
