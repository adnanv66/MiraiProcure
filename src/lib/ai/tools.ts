// Mirai AI Secure Tool Framework
// Strictly validates inputs with Zod, enforces RBAC, records Audit Logs, and requires human confirmation for sensitive actions.

import { z } from 'zod';
import {
  DEMO_SUPPLIERS,
  DEMO_PURCHASE_REQUESTS,
  DEMO_RFQS,
  DEMO_QUOTATIONS,
  DEMO_PURCHASE_ORDERS,
  DEMO_INVENTORY,
  DEMO_INVOICES,
  DEMO_RISK_SIGNALS,
  DEMO_AUDIT_LOGS,
  MARKET_BENCHMARK_LAPTOPS
} from '@/lib/seed-data';
import { UserSession } from '@/types';
import { calculateVendorScore, calculateTotalLandedCost } from '@/lib/utils/formatters';
import { authorizeRequest, Permission } from '@/lib/auth/rbac';

export interface ToolExecutionResult {
  success: boolean;
  toolName: string;
  data?: any;
  message: string;
  requiresApproval?: boolean;
  approvalPayload?: {
    actionType: string;
    entityName: string;
    entityId: string;
    totalAmount?: number;
    details: string;
  };
}

// Sandbox state simulation
let liveSuppliers = [...DEMO_SUPPLIERS];
let livePRs = [...DEMO_PURCHASE_REQUESTS];
let liveRFQs = [...DEMO_RFQS];
let liveQuotes = [...DEMO_QUOTATIONS];
let livePOs = [...DEMO_PURCHASE_ORDERS];
let liveAuditLogs = [...DEMO_AUDIT_LOGS];

// 1. Zod Schemas for AI Tools
export const ToolSchemas = {
  searchSuppliers: z.object({
    query: z.string().optional(),
    category: z.string().optional(),
    maxRiskScore: z.number().optional(),
  }),
  createPurchaseRequest: z.object({
    title: z.string(),
    category: z.string(),
    quantity: z.number().positive(),
    estimatedUnitPrice: z.number().positive(),
    justification: z.string(),
    requiredDays: z.number().default(15),
  }),
  createRFQ: z.object({
    purchaseRequestId: z.string().optional(),
    title: z.string(),
    category: z.string(),
    targetBudget: z.number().positive(),
    deliveryDays: z.number().positive(),
    requirements: z.string(),
  }),
  analyzeQuotation: z.object({
    rfqId: z.string(),
  }),
  recommendVendor: z.object({
    rfqId: z.string(),
    priceWeight: z.number().default(0.35),
    deliveryWeight: z.number().default(0.20),
    qualityWeight: z.number().default(0.15),
  }),
  createPurchaseOrderDraft: z.object({
    rfqId: z.string(),
    supplierId: z.string(),
    supplierName: z.string(),
    quantity: z.number(),
    unitPrice: z.number(),
    totalAmount: z.number(),
    deliveryDays: z.number(),
  }),
  approvePurchaseOrder: z.object({
    poId: z.string(),
  }),
  performThreeWayMatch: z.object({
    poNumber: z.string(),
  }),
  calculateReorderRecommendation: z.object({
    category: z.string().optional(),
  }),
};

// RBAC Guard helper
function enforceRBAC(user: UserSession, permission: Permission, toolName: string): ToolExecutionResult | null {
  const check = authorizeRequest(user, permission);
  if (!check.authorized) {
    return {
      success: false,
      toolName,
      message: `🚫 Access Refused by Mirai Governance Guard: Role '${user.role}' is not authorized to execute '${toolName}'. ${check.reason}`,
    };
  }
  return null;
}

// 2. AI Tool Implementations with RBAC Enforcement
export const AIToolHandlers = {
  // Search Suppliers
  searchSuppliers: async (user: UserSession, args: z.infer<typeof ToolSchemas.searchSuppliers>): Promise<ToolExecutionResult> => {
    const denied = enforceRBAC(user, 'VIEW_SUPPLIERS', 'searchSuppliers');
    if (denied) return denied;

    const q = (args.query || '').toLowerCase();
    const results = liveSuppliers.filter((s) => {
      const matchQuery = !q || s.companyName.toLowerCase().includes(q) || s.categories.toLowerCase().includes(q);
      const matchRisk = args.maxRiskScore === undefined || s.riskScore <= args.maxRiskScore;
      return matchQuery && matchRisk;
    });

    return {
      success: true,
      toolName: 'searchSuppliers',
      data: results,
      message: `Found ${results.length} suppliers matching criteria.`,
    };
  },

  // Create Purchase Request
  createPurchaseRequest: async (user: UserSession, args: z.infer<typeof ToolSchemas.createPurchaseRequest>): Promise<ToolExecutionResult> => {
    const denied = enforceRBAC(user, 'CREATE_PURCHASE_REQUEST', 'createPurchaseRequest');
    if (denied) return denied;

    const totalBudget = args.quantity * args.estimatedUnitPrice;
    const newPrId = `pr-${Date.now().toString().slice(-4)}`;
    const prNumber = `PR-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newPR = {
      id: newPrId,
      prNumber,
      title: args.title,
      requesterName: user.name,
      department: user.department || 'Procurement Operations',
      category: args.category,
      quantity: args.quantity,
      estimatedUnit: args.estimatedUnitPrice,
      totalBudget,
      priority: (args.quantity >= 500 ? 'URGENT' : 'MEDIUM') as 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT',
      status: 'AI_PROCESSING' as const,
      justification: args.justification,
      requiredBy: new Date(Date.now() + args.requiredDays * 86400000).toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
    };

    livePRs.unshift(newPR);
    recordAuditLog(user.name, 'CREATE_PR_VIA_AI', 'PurchaseRequest', prNumber, `Created PR for ${args.quantity} units of ${args.title}. Total budget: ₹${totalBudget.toLocaleString()}`);

    return {
      success: true,
      toolName: 'createPurchaseRequest',
      data: newPR,
      message: `Successfully created Purchase Request ${prNumber} for ${args.quantity} ${args.title} (Budget: ₹${totalBudget.toLocaleString()}).`,
    };
  },

  // Create RFQ
  createRFQ: async (user: UserSession, args: z.infer<typeof ToolSchemas.createRFQ>): Promise<ToolExecutionResult> => {
    const denied = enforceRBAC(user, 'CREATE_RFQ', 'createRFQ');
    if (denied) return denied;

    const rfqNumber = `RFQ-2026-${Math.floor(500 + Math.random() * 500)}`;
    const newRFQ = {
      id: `rfq-${Date.now().toString().slice(-4)}`,
      rfqNumber,
      title: args.title,
      category: args.category,
      deadline: new Date(Date.now() + 5 * 86400000).toISOString().split('T')[0],
      targetBudget: args.targetBudget,
      deliveryDays: args.deliveryDays,
      requirements: args.requirements,
      status: 'RESPONSES_RECEIVED' as const,
      createdAt: new Date().toISOString(),
      invitedSuppliers: ['SUP-001', 'SUP-002', 'SUP-003'],
    };

    liveRFQs.unshift(newRFQ);
    recordAuditLog(user.name, 'CREATE_RFQ_VIA_AI', 'RFQ', rfqNumber, `Generated RFQ for ${args.title} with deadline ${newRFQ.deadline}`);

    return {
      success: true,
      toolName: 'createRFQ',
      data: newRFQ,
      message: `RFQ ${rfqNumber} generated and dispatched to eligible suppliers (TechWorld Solutions, ABC Technologies, CyberDistributors Ltd).`,
    };
  },

  // Analyze Quotations
  analyzeQuotation: async (user: UserSession, args: z.infer<typeof ToolSchemas.analyzeQuotation>): Promise<ToolExecutionResult> => {
    const denied = enforceRBAC(user, 'ANALYZE_QUOTES', 'analyzeQuotation');
    if (denied) return denied;

    const quotes = liveQuotes.filter((q) => q.rfqId === args.rfqId || args.rfqId.includes('500'));
    
    const scoredQuotes = quotes.map((q) => {
      const supplier = liveSuppliers.find((s) => s.id === q.supplierId) || liveSuppliers[0];
      const scores = calculateVendorScore(
        { unitPrice: q.unitPrice, deliveryDays: q.deliveryDays, warrantyMonths: q.warrantyMonths, totalLandedCost: q.totalLandedCost },
        { qualityScore: supplier.qualityScore, riskScore: supplier.riskScore, deliveryScore: supplier.deliveryScore, sustainabilityScore: supplier.sustainabilityScore },
        { targetUnitPrice: 45000, requiredDeliveryDays: 15, requiredWarrantyMonths: 36 }
      );
      return { ...q, scores };
    }).sort((a, b) => (b.scores?.compositeScore || 0) - (a.scores?.compositeScore || 0));

    return {
      success: true,
      toolName: 'analyzeQuotation',
      data: {
        rfqId: args.rfqId,
        quotationsCount: quotes.length,
        marketBenchmark: MARKET_BENCHMARK_LAPTOPS,
        scoredQuotations: scoredQuotes,
        topVendor: scoredQuotes[0],
      },
      message: `Extracted and analyzed ${quotes.length} supplier quotations against market benchmark. Top recommendation: ${scoredQuotes[0]?.supplierName} (Composite Score: ${scoredQuotes[0]?.scores?.compositeScore}/100).`,
    };
  },

  // Recommend Vendor
  recommendVendor: async (user: UserSession, args: z.infer<typeof ToolSchemas.recommendVendor>): Promise<ToolExecutionResult> => {
    const denied = enforceRBAC(user, 'ANALYZE_QUOTES', 'recommendVendor');
    if (denied) return denied;

    const winner = liveQuotes.find((q) => q.supplierId === 'sup-102') || liveQuotes[1];
    
    return {
      success: true,
      toolName: 'recommendVendor',
      data: {
        recommendedSupplier: winner.supplierName,
        supplierId: winner.supplierId,
        compositeScore: 95.2,
        confidence: 0.96,
        reasons: [
          'Guarantees 10-day SLA delivery (well within 15-day requirement).',
          'Includes 3-year on-site hardware warranty (vs 1-year from competitors).',
          'Ultra-low vendor risk score of 8.0/100 (Tier-1 ESG & ISO certified).',
          'Net 45 favorable enterprise payment terms.',
        ],
        tradeoffs: 'Unit price is ₹45,000 (₹500 higher than Vendor A), but offset by 3-year warranty and zero shipping fees.',
        anomalyWarning: 'Vendor C (CyberDistributors) quoted ₹38,000 but was rejected due to 30-day delivery delay and 19% below-market price anomaly flag.',
      },
      message: `Recommended ${winner.supplierName} with 95.2/100 composite score based on 10-day delivery SLA, 3-year warranty, and low risk rating.`,
    };
  },

  // Create PO Draft
  createPurchaseOrderDraft: async (user: UserSession, args: z.infer<typeof ToolSchemas.createPurchaseOrderDraft>): Promise<ToolExecutionResult> => {
    const denied = enforceRBAC(user, 'CREATE_PO_DRAFT', 'createPurchaseOrderDraft');
    if (denied) return denied;

    const poNumber = `PO-2026-${Math.floor(9000 + Math.random() * 999)}`;
    const isHighValue = args.totalAmount > 100000;

    return {
      success: true,
      toolName: 'createPurchaseOrderDraft',
      requiresApproval: isHighValue,
      approvalPayload: {
        actionType: 'CREATE_PURCHASE_ORDER',
        entityName: args.supplierName,
        entityId: poNumber,
        totalAmount: args.totalAmount,
        details: `Create PO ${poNumber} for ${args.quantity} units @ ₹${args.unitPrice.toLocaleString()}/unit. Total: ₹${args.totalAmount.toLocaleString()} (${args.deliveryDays}-day SLA).`,
      },
      data: {
        poNumber,
        supplierName: args.supplierName,
        quantity: args.quantity,
        totalAmount: args.totalAmount,
        status: 'PENDING_HUMAN_APPROVAL',
      },
      message: `Generated Purchase Order Draft ${poNumber} for ${args.supplierName} (Total: ₹${args.totalAmount.toLocaleString()}). Sensitive action requires human confirmation.`,
    };
  },

  // Approve Purchase Order
  approvePurchaseOrder: async (user: UserSession, args: z.infer<typeof ToolSchemas.approvePurchaseOrder>): Promise<ToolExecutionResult> => {
    const denied = enforceRBAC(user, 'APPROVE_PURCHASE_ORDER', 'approvePurchaseOrder');
    if (denied) return denied;

    return {
      success: true,
      toolName: 'approvePurchaseOrder',
      message: `Human Approver (${user.name}) approved Purchase Order ${args.poId}. Order released to supplier.`,
    };
  },

  // Perform Three-Way Match
  performThreeWayMatch: async (user: UserSession, args: z.infer<typeof ToolSchemas.performThreeWayMatch>): Promise<ToolExecutionResult> => {
    const denied = enforceRBAC(user, 'VIEW_FINANCE', 'performThreeWayMatch');
    if (denied) return denied;

    const invoice = DEMO_INVOICES[0];
    return {
      success: true,
      toolName: 'performThreeWayMatch',
      data: invoice,
      message: `Executed 3-Way Match for ${invoice.poNumber}. Alert: ${invoice.discrepancyReason}`,
    };
  },

  // Calculate Predictive Reorder
  calculateReorderRecommendation: async (user: UserSession, args: z.infer<typeof ToolSchemas.calculateReorderRecommendation>): Promise<ToolExecutionResult> => {
    const denied = enforceRBAC(user, 'VIEW_INVENTORY', 'calculateReorderRecommendation');
    if (denied) return denied;

    const item = DEMO_INVENTORY[0];
    return {
      success: true,
      toolName: 'calculateReorderRecommendation',
      data: {
        product: item.productName,
        currentStock: item.totalQuantity,
        reorderPoint: item.reorderPoint,
        projectedStockoutDays: 11,
        recommendedReorderQuantity: 500,
      },
      message: `Predictive AI Signal: Stock for ${item.productName} is projected to reach reorder threshold in 11 days. Recommended replenishment order: 500 units.`,
    };
  },
};

function recordAuditLog(user: string, action: string, entity: string, entityId: string, details: string) {
  liveAuditLogs.unshift({
    id: `log-${Date.now()}`,
    userName: user,
    action,
    entity,
    entityId,
    details,
    timestamp: new Date().toISOString(),
    aiActionId: `aia-${Math.floor(1000 + Math.random() * 9000)}`,
  });
}
