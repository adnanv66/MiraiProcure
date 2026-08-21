'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Bot, Sparkles, Send, X, Shield, RefreshCw } from 'lucide-react';
import { UserSession } from '@/types';
import { askMiraiAI } from '@/lib/ai/gemini';
import { MiraiChatResponse } from '@/lib/ai/fallback';
import { ActionConfirmationModal } from './ActionConfirmationModal';
import { useProcurement } from '@/lib/store/procurement-store';

interface MiraiCommandBarProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserSession;
  contextPage?: string;
}

interface ChatMessage {
  id: string;
  sender: 'USER' | 'MIRAI';
  content: string;
  timestamp: string;
  isFallback?: boolean;
  toolCalls?: any[];
}

export const MiraiCommandBar: React.FC<MiraiCommandBarProps> = ({
  isOpen,
  onClose,
  currentUser,
  contextPage = 'global',
}) => {
  const {
    createPurchaseRequest,
    createRFQ,
    createPurchaseOrderDraft,
    approvePurchaseOrder,
    addAIActivity,
  } = useProcurement();

  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'MIRAI',
      content: `Hello ${currentUser.name}! I am **Mirai AI**, your autonomous Procurement Operating System agent. Authenticated as **${currentUser.role.replace('_', ' ')}**.\n\nHow can I assist your procurement workflow today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [pendingApprovalPayload, setPendingApprovalPayload] = useState<any>(null);
  const [showApprovalModal, setShowApprovalModal] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const queryText = textToSend || inputPrompt;
    if (!queryText.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'USER',
      content: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setIsLoading(true);

    try {
      const lower = queryText.toLowerCase();

      if (lower.includes('500 laptop') || lower.includes('laptop') || lower.includes('45,000') || lower.includes('45000')) {
        const pr = createPurchaseRequest({
          title: '500 High-Performance Business Laptops',
          category: 'IT Hardware',
          quantity: 500,
          estimatedUnit: 45000,
          justification: 'Quarterly dev team expansion with mandatory 15-day delivery SLA.',
        });

        const rfq = createRFQ({
          prId: pr.id,
          title: 'RFQ for 500 High-Performance Business Laptops (15-Day SLA)',
          category: 'IT Hardware',
          targetBudget: 22500000,
          deliveryDays: 15,
          requirements: '500 Units: Core i7 13th Gen, 16GB RAM, 512GB SSD, 3-Yr Warranty.',
        });

        addAIActivity('createPurchaseRequest', queryText, `Created ${pr.prNumber} & ${rfq.rfqNumber}`, false);
      }

      if (lower.includes('po') || lower.includes('purchase order') || lower.includes('prepare po') || lower.includes('generate po')) {
        const po = createPurchaseOrderDraft({
          supplierId: 'sup-102',
          supplierName: 'ABC Technologies',
          totalAmount: 22500000,
          landedCost: 26250000,
          deliveryDate: '2026-08-30',
          paymentTerms: 'Net 45',
          generatedByAI: true,
        });

        addAIActivity('createPurchaseOrderDraft', queryText, `Drafted PO ${po.poNumber}`, true);
      }

      const response: MiraiChatResponse = await askMiraiAI(queryText, currentUser, contextPage);

      const miraiMsg: ChatMessage = {
        id: `mirai-${Date.now()}`,
        sender: 'MIRAI',
        content: response.content,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isFallback: response.isFallback,
        toolCalls: response.toolCallsExecuted,
      };

      setMessages((prev) => [...prev, miraiMsg]);

      // Check for human approval prompt
      const approvalTool = response.toolCallsExecuted?.find((t) => t.requiresApproval);
      if (approvalTool && approvalTool.approvalPayload) {
        setPendingApprovalPayload(approvalTool.approvalPayload);
        setShowApprovalModal(true);
      }
    } catch (err) {
      console.error('Error invoking Mirai AI:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmAction = () => {
    setShowApprovalModal(false);
    if (pendingApprovalPayload?.entityId) {
      approvePurchaseOrder(pendingApprovalPayload.entityId);
    }
    setMessages((prev) => [
      ...prev,
      {
        id: `confirm-${Date.now()}`,
        sender: 'MIRAI',
        content: `✓ **HUMAN APPROVAL CONFIRMED BY ${currentUser.name}**\n\nPurchase Order \`${pendingApprovalPayload?.entityId || 'PO-2026-9001'}\` has been approved, recorded to the global audit trail, and dispatched to **${pendingApprovalPayload?.entityName || 'ABC Technologies'}**.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setPendingApprovalPayload(null);
  };

  const quickPrompts = [
    'I need 500 laptops under ₹45,000 each, delivery within 15 days.',
    'Analyze quotes for RFQ-2026-0500',
    'Prepare the PO for the recommended supplier',
    'Find our worst-performing suppliers',
    'Which products need to be reordered next month?',
  ];

  return (
    <>
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 flex items-center justify-center p-4 animate-fade-in">
        <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-3xl h-[640px] flex flex-col shadow-2xl overflow-hidden relative">
          {/* Header Bar */}
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-600 text-white shadow-xs">
                <Bot className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-sm font-sans">Mirai AI Assistant</span>
                  <span className="text-[10px] font-mono font-bold bg-amber-100 text-amber-800 border border-amber-300 px-1.5 py-0.5 rounded">
                    {currentUser.role.replace('_', ' ')}
                  </span>
                </div>
                <span className="text-[11px] text-slate-500">Context: <span className="text-amber-700 capitalize font-medium">{contextPage} workbench</span></span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-white border border-slate-200 text-slate-500 px-2 py-1 rounded font-mono">
                ESC to close
              </span>
              <button
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-200 rounded-lg transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans text-xs bg-[#F7F8FA]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'USER' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'MIRAI' && (
                  <div className="h-7 w-7 rounded-lg bg-amber-100 border border-amber-300 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="h-4 w-4 text-amber-600" />
                  </div>
                )}

                <div className={`max-w-xl rounded-2xl p-3.5 space-y-2 ${
                  msg.sender === 'USER'
                    ? 'bg-amber-600 text-white font-medium ml-12 shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-800 shadow-xs'
                }`}>
                  {msg.isFallback && (
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded w-fit">
                      <Shield className="h-3 w-3" />
                      <span>Demo AI Fallback Mode</span>
                    </div>
                  )}

                  <div className="whitespace-pre-wrap leading-relaxed font-sans text-xs">
                    {msg.content}
                  </div>

                  {msg.toolCalls && msg.toolCalls.length > 0 && (
                    <div className="pt-2 border-t border-slate-100 space-y-1.5">
                      <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Executed Tools</div>
                      {msg.toolCalls.map((t, idx) => (
                        <div key={idx} className="bg-slate-50 border border-slate-200 p-2 rounded-lg text-[11px] font-mono text-amber-900 flex items-center justify-between">
                          <span>⚡ {t.toolName}</span>
                          <span className="text-[10px] text-slate-500">{t.message}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className={`text-[9px] ${msg.sender === 'USER' ? 'text-white/80 text-right' : 'text-slate-400'}`}>
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-3 text-amber-700 text-xs font-mono">
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Mirai AI is evaluating role permissions &amp; running tools...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Intent Chips */}
          <div className="px-4 py-2 bg-slate-50 border-t border-slate-200 flex items-center gap-2 overflow-x-auto">
            <span className="text-[10px] font-mono text-slate-500 uppercase shrink-0">Quick Intent:</span>
            {quickPrompts.map((promptText, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(promptText)}
                className="whitespace-nowrap bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-[11px] px-2.5 py-1 rounded-full transition-all shrink-0"
              >
                {promptText}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={`Ask Mirai AI (e.g. "I need 500 laptops under ₹45,000 within 15 days")...`}
              className="flex-1 bg-slate-50 border border-slate-200 focus:border-amber-500 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={isLoading || !inputPrompt.trim()}
              className="p-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-bold transition-all"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <ActionConfirmationModal
        isOpen={showApprovalModal}
        onClose={() => setShowApprovalModal(false)}
        onConfirm={handleConfirmAction}
        payload={pendingApprovalPayload}
      />
    </>
  );
};
