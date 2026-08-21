'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Supplier,
  PurchaseRequest,
  RFQ,
  Quotation,
  PurchaseOrder,
  InventoryItem,
  Invoice,
  RiskSignal,
  AuditLog,
  UserSession
} from '@/types';
import {
  DEMO_USERS,
  DEMO_SUPPLIERS,
  DEMO_PURCHASE_REQUESTS,
  DEMO_RFQS,
  DEMO_QUOTATIONS,
  DEMO_PURCHASE_ORDERS,
  DEMO_INVENTORY,
  DEMO_INVOICES,
  DEMO_RISK_SIGNALS,
  DEMO_AUDIT_LOGS
} from '@/lib/seed-data';
import { calculateVendorScore, calculateTotalLandedCost, ScoreWeights, DEFAULT_SCORE_WEIGHTS } from '@/lib/utils/formatters';

interface ProcurementContextType {
  currentUser: UserSession;
  setCurrentUser: (user: UserSession) => void;
  suppliers: Supplier[];
  purchaseRequests: PurchaseRequest[];
  rfqs: RFQ[];
  quotations: Quotation[];
  purchaseOrders: PurchaseOrder[];
  inventory: InventoryItem[];
  invoices: Invoice[];
  riskSignals: RiskSignal[];
  auditLogs: AuditLog[];
  aiActivityLogs: any[];
  scoringWeights: ScoreWeights;
  setScoringWeights: (weights: ScoreWeights) => void;
  // Dynamic Actions
  createPurchaseRequest: (data: { title: string; category: string; quantity: number; estimatedUnit: number; justification: string; requiredBy?: string }) => PurchaseRequest;
  createRFQ: (data: { title: string; category: string; targetBudget: number; deliveryDays: number; requirements: string; prId?: string }) => RFQ;
  submitQuotation: (data: { rfqId: string; supplierId: string; supplierName: string; unitPrice: number; quantity: number; shippingCost?: number; taxCost?: number; discountAmount?: number; deliveryDays: number; warrantyMonths: number; paymentTerms?: string }) => Quotation;
  createPurchaseOrderDraft: (data: { rfqId?: string; supplierId: string; supplierName: string; totalAmount: number; landedCost: number; deliveryDate: string; paymentTerms?: string; generatedByAI?: boolean }) => PurchaseOrder;
  approvePurchaseOrder: (poId: string) => void;
  rejectPurchaseOrder: (poId: string) => void;
  resolveInvoiceMismatch: (invoiceId: string) => void;
  addAuditLog: (action: string, entity: string, entityId: string, details: string, aiActionId?: string) => void;
  addAIActivity: (toolName: string, prompt: string, result: string, requiresApproval: boolean) => void;
}

const ProcurementContext = createContext<ProcurementContextType | undefined>(undefined);

export const ProcurementProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserSession>(DEMO_USERS[0]);
  const [suppliers, setSuppliers] = useState<Supplier[]>(DEMO_SUPPLIERS);
  const [purchaseRequests, setPurchaseRequests] = useState<PurchaseRequest[]>(DEMO_PURCHASE_REQUESTS);
  const [rfqs, setRfqs] = useState<RFQ[]>(DEMO_RFQS);
  const [quotations, setQuotations] = useState<Quotation[]>(DEMO_QUOTATIONS);
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>(DEMO_PURCHASE_ORDERS);
  const [inventory, setInventory] = useState<InventoryItem[]>(DEMO_INVENTORY);
  const [invoices, setInvoices] = useState<Invoice[]>(DEMO_INVOICES);
  const [riskSignals, setRiskSignals] = useState<RiskSignal[]>(DEMO_RISK_SIGNALS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(DEMO_AUDIT_LOGS);
  const [aiActivityLogs, setAiActivityLogs] = useState<any[]>([
    { id: 'aia-101', toolName: 'createPurchaseRequest', prompt: 'I need 500 laptops under ₹45,000 each, delivery within 15 days.', result: 'Created PR-2026-1024', timestamp: '10:15 AM' },
    { id: 'aia-102', toolName: 'analyzeQuotation', prompt: 'Analyze quotes for RFQ-2026-0500', result: 'Scored 3 quotes. Recommended ABC Technologies (95.2/100)', timestamp: '10:35 AM' },
  ]);
  const [scoringWeights, setScoringWeights] = useState<ScoreWeights>(DEFAULT_SCORE_WEIGHTS);

  // Audit Log Recorder Helper
  const addAuditLog = (action: string, entity: string, entityId: string, details: string, aiActionId?: string) => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      userName: currentUser.name,
      action,
      entity,
      entityId,
      details,
      timestamp: new Date().toISOString(),
      aiActionId,
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  // AI Activity Logger
  const addAIActivity = (toolName: string, prompt: string, result: string, requiresApproval: boolean) => {
    const newActivity = {
      id: `aia-${Date.now()}`,
      toolName,
      prompt,
      result,
      requiresApproval,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setAiActivityLogs((prev) => [newActivity, ...prev]);
  };

  // Action: Create Purchase Request
  const createPurchaseRequest = (data: {
    title: string;
    category: string;
    quantity: number;
    estimatedUnit: number;
    justification: string;
    requiredBy?: string;
  }): PurchaseRequest => {
    const prNumber = `PR-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const totalBudget = data.quantity * data.estimatedUnit;
    const newPr: PurchaseRequest = {
      id: `pr-${Date.now()}`,
      prNumber,
      title: data.title,
      requesterName: currentUser.name,
      department: currentUser.department || 'Procurement',
      category: data.category,
      quantity: data.quantity,
      estimatedUnit: data.estimatedUnit,
      totalBudget,
      priority: data.quantity >= 500 ? 'URGENT' : 'MEDIUM',
      status: 'AI_PROCESSING',
      justification: data.justification,
      requiredBy: data.requiredBy || new Date(Date.now() + 15 * 86400000).toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
    };

    setPurchaseRequests((prev) => [newPr, ...prev]);
    addAuditLog('CREATE_PURCHASE_REQUEST', 'PurchaseRequest', prNumber, `Created PR for ${data.quantity} units of ${data.title}. Budget: ₹${totalBudget.toLocaleString()}`);
    return newPr;
  };

  // Action: Create RFQ
  const createRFQ = (data: {
    title: string;
    category: string;
    targetBudget: number;
    deliveryDays: number;
    requirements: string;
    prId?: string;
  }): RFQ => {
    const rfqNumber = `RFQ-2026-${Math.floor(500 + Math.random() * 500)}`;
    const newRfq: RFQ = {
      id: `rfq-${Date.now()}`,
      rfqNumber,
      title: data.title,
      category: data.category,
      deadline: new Date(Date.now() + 5 * 86400000).toISOString().split('T')[0],
      targetBudget: data.targetBudget,
      deliveryDays: data.deliveryDays,
      requirements: data.requirements,
      status: 'RESPONSES_RECEIVED',
      createdAt: new Date().toISOString(),
      invitedSuppliers: ['SUP-001', 'SUP-002', 'SUP-003'],
    };

    setRfqs((prev) => [newRfq, ...prev]);
    if (data.prId) {
      setPurchaseRequests((prev) =>
        prev.map((p) => (p.id === data.prId ? { ...p, status: 'RFQ_CREATED' } : p))
      );
    }
    addAuditLog('CREATE_RFQ', 'RFQ', rfqNumber, `Published RFQ ${rfqNumber} with target budget ₹${data.targetBudget.toLocaleString()}`);
    return newRfq;
  };

  // Action: Submit Quotation from Supplier Portal
  const submitQuotation = (data: {
    rfqId: string;
    supplierId: string;
    supplierName: string;
    unitPrice: number;
    quantity: number;
    shippingCost?: number;
    taxCost?: number;
    discountAmount?: number;
    deliveryDays: number;
    warrantyMonths: number;
    paymentTerms?: string;
  }): Quotation => {
    const quoteNumber = `QTE-2026-${Math.floor(8000 + Math.random() * 1000)}`;
    const landed = calculateTotalLandedCost({
      unitPrice: data.unitPrice,
      quantity: data.quantity,
      shippingCost: data.shippingCost,
      taxCost: data.taxCost,
      discountAmount: data.discountAmount,
    });

    const newQuote: Quotation = {
      id: `q-${Date.now()}`,
      quoteNumber,
      rfqId: data.rfqId,
      supplierId: data.supplierId,
      supplierName: data.supplierName,
      unitPrice: data.unitPrice,
      quantity: data.quantity,
      shippingCost: data.shippingCost || 0,
      taxCost: data.taxCost || landed.taxCost,
      discountAmount: data.discountAmount || 0,
      totalLandedCost: landed.totalLandedCost,
      deliveryDays: data.deliveryDays,
      warrantyMonths: data.warrantyMonths,
      paymentTerms: data.paymentTerms || 'Net 30',
      status: 'RECEIVED',
    };

    setQuotations((prev) => [newQuote, ...prev]);
    addAuditLog('SUBMIT_QUOTATION', 'Quotation', quoteNumber, `Supplier ${data.supplierName} submitted quotation ${quoteNumber} for ₹${landed.totalLandedCost.toLocaleString()}`);
    return newQuote;
  };

  // Action: Create PO Draft
  const createPurchaseOrderDraft = (data: {
    rfqId?: string;
    supplierId: string;
    supplierName: string;
    totalAmount: number;
    landedCost: number;
    deliveryDate: string;
    paymentTerms?: string;
    generatedByAI?: boolean;
  }): PurchaseOrder => {
    const poNumber = `PO-2026-${Math.floor(9000 + Math.random() * 999)}`;
    const newPo: PurchaseOrder = {
      id: `po-${Date.now()}`,
      poNumber,
      supplierName: data.supplierName,
      totalAmount: data.totalAmount,
      landedCost: data.landedCost,
      deliveryDate: data.deliveryDate,
      paymentTerms: data.paymentTerms || 'Net 45',
      status: 'PENDING_APPROVAL',
      approvalStatus: 'PENDING',
      generatedByAI: data.generatedByAI ?? true,
      createdAt: new Date().toISOString(),
    };

    setPurchaseOrders((prev) => [newPo, ...prev]);
    addAuditLog('CREATE_PO_DRAFT', 'PurchaseOrder', poNumber, `Created PO draft ${poNumber} for ${data.supplierName}. Total: ₹${data.landedCost.toLocaleString()}`);
    return newPo;
  };

  // Action: Approve Purchase Order
  const approvePurchaseOrder = (poId: string) => {
    const po = purchaseOrders.find((p) => p.id === poId || p.poNumber === poId);
    if (!po) return;

    setPurchaseOrders((prev) =>
      prev.map((p) =>
        p.id === poId || p.poNumber === poId
          ? { ...p, status: 'APPROVED', approvalStatus: 'APPROVED' }
          : p
      )
    );

    // Update inventory incoming replenishment
    setInventory((prev) =>
      prev.map((item) =>
        item.sku.includes('LAP')
          ? { ...item, reservedStock: item.reservedStock + 500, status: 'OPTIMAL' }
          : item
      )
    );

    addAuditLog(
      'APPROVE_PURCHASE_ORDER',
      'PurchaseOrder',
      po.poNumber,
      `Human Approver (${currentUser.name}) approved Purchase Order ${po.poNumber} for ${po.supplierName} (₹${po.landedCost.toLocaleString()}). Released to supplier.`
    );
  };

  // Action: Reject Purchase Order
  const rejectPurchaseOrder = (poId: string) => {
    setPurchaseOrders((prev) =>
      prev.map((p) =>
        p.id === poId || p.poNumber === poId
          ? { ...p, status: 'CLOSED', approvalStatus: 'REJECTED' }
          : p
      )
    );
    addAuditLog('REJECT_PURCHASE_ORDER', 'PurchaseOrder', poId, `Rejected Purchase Order ${poId}.`);
  };

  // Action: Resolve Invoice Mismatch
  const resolveInvoiceMismatch = (invoiceId: string) => {
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === invoiceId || inv.invoiceNumber === invoiceId
          ? { ...inv, threeWayMatchStatus: 'MATCHED', paymentStatus: 'RELEASED', discrepancyReason: 'Resolved by Finance Manager. Vendor credited 20 unit adjustment.' }
          : inv
      )
    );
    addAuditLog('RESOLVE_3WAY_MATCH', 'Invoice', invoiceId, `Finance Manager resolved 3-Way Match discrepancy on ${invoiceId}. Released payment.`);
  };

  return (
    <ProcurementContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        suppliers,
        purchaseRequests,
        rfqs,
        quotations,
        purchaseOrders,
        inventory,
        invoices,
        riskSignals,
        auditLogs,
        aiActivityLogs,
        scoringWeights,
        setScoringWeights,
        createPurchaseRequest,
        createRFQ,
        submitQuotation,
        createPurchaseOrderDraft,
        approvePurchaseOrder,
        rejectPurchaseOrder,
        resolveInvoiceMismatch,
        addAuditLog,
        addAIActivity,
      }}
    >
      {children}
    </ProcurementContext.Provider>
  );
};

export const useProcurement = () => {
  const context = useContext(ProcurementContext);
  if (!context) {
    throw new Error('useProcurement must be used within a ProcurementProvider');
  }
  return context;
};
