// Safe Offline Demo AI Fallback Handler for MiraiProcure (未来プロキュア)
// Provides realistic AI responses and tool executions with strict RBAC enforcement.

import { UserSession } from '@/types';
import { AIToolHandlers } from './tools';
import { hasPermission } from '../auth/rbac';

export interface MiraiChatResponse {
  isFallback: boolean;
  content: string;
  toolCallsExecuted: Array<{
    toolName: string;
    message: string;
    data?: any;
    requiresApproval?: boolean;
    approvalPayload?: any;
  }>;
  contextPage?: string;
  mode: 'ASK' | 'EXECUTE' | 'ANALYZE' | 'PREDICT' | 'MONITOR' | 'GENERATE' | 'RECOMMEND';
}

export async function processFallbackMiraiIntent(
  userPrompt: string,
  user: UserSession,
  contextPage: string = 'global'
): Promise<MiraiChatResponse> {
  const query = userPrompt.toLowerCase();

  // 0. Supplier Role Strict Isolation Guard
  if (user.role === 'SUPPLIER') {
    if (query.includes('vendor b') || query.includes('competitor') || query.includes('other quote') || query.includes('ranking') || query.includes('risk score') || query.includes('audit')) {
      return {
        isFallback: true,
        mode: 'ASK',
        content: `🚫 **Access Refused by Mirai Governance Engine:** As an authenticated **Supplier Partner** (${user.name}), you do not have permission to view internal competitor quotations, vendor rankings, risk scores, or internal organization audit logs.`,
        toolCallsExecuted: [],
      };
    }
  }

  // 0b. Approval / Payment Release RBAC Guard
  if (query.includes('approve') && query.includes('po') && user.role === 'PROCUREMENT_OFFICER') {
    return {
      isFallback: true,
      mode: 'ASK',
      content: `🚫 **Authority Refused by Mirai Governance Engine:** Role **PROCUREMENT_OFFICER** does not have high-value Purchase Order approval authority. Please forward this request to an **APPROVER** or **PROCUREMENT_MANAGER**.`,
      toolCallsExecuted: [],
    };
  }

  if (query.includes('release') && query.includes('payment') && user.role !== 'FINANCE_MANAGER' && user.role !== 'ADMIN') {
    return {
      isFallback: true,
      mode: 'ASK',
      content: `🚫 **Authority Refused by Mirai Governance Engine:** Role **${user.role}** cannot authorize financial payment releases. Payment release requires **FINANCE_MANAGER** or **ADMIN** authority.`,
      toolCallsExecuted: [],
    };
  }

  // Scenario 1: Natural Language Purchase Intent for 500 Laptops
  if (query.includes('500 laptop') || query.includes('laptop') || query.includes('45,000') || query.includes('45000')) {
    const prResult = await AIToolHandlers.createPurchaseRequest(user, {
      title: '500 High-Performance Business Laptops',
      category: 'IT Hardware',
      quantity: 500,
      estimatedUnitPrice: 45000,
      justification: 'Quarterly technology onboarding & dev team expansion with 15-day delivery SLA.',
      requiredDays: 15,
    });

    if (!prResult.success) {
      return {
        isFallback: true,
        mode: 'ASK',
        content: prResult.message,
        toolCallsExecuted: [],
      };
    }

    const rfqResult = await AIToolHandlers.createRFQ(user, {
      purchaseRequestId: prResult.data.id,
      title: 'RFQ for 500 High-Performance Business Laptops (15-Day SLA)',
      category: 'IT Hardware',
      targetBudget: 22500000,
      deliveryDays: 15,
      requirements: '500 Units: Intel Core i7 13th Gen, 16GB LPDDR5 RAM, 512GB NVMe SSD, 3-Year Onsite Warranty.',
    });

    return {
      isFallback: true,
      mode: 'EXECUTE',
      content: `I have processed your intent for **500 Business Laptops** under **${user.name}** (${user.role}).\n\n1. **Purchase Request Generated:** Created \`${prResult.data.prNumber}\` for ₹2,25,00,000 budget.\n2. **RFQ Dispatched:** Published \`${rfqResult.data.rfqNumber}\` to Tier-1 hardware suppliers.\n3. **Supplier Quotations Received:** Quotations available from **TechWorld Solutions (Vendor A)**, **ABC Technologies (Vendor B)**, and **CyberDistributors (Vendor C)**.\n\nWould you like me to run Multi-Factor Vendor Scoring?`,
      toolCallsExecuted: [
        { toolName: 'createPurchaseRequest', message: prResult.message, data: prResult.data },
        { toolName: 'createRFQ', message: rfqResult.message, data: rfqResult.data },
      ],
    };
  }

  // Scenario 2: Analyze Quotes / RFQ Quote Intelligence
  if (query.includes('analyze') || query.includes('quote') || query.includes('rfq') || query.includes('compare')) {
    const analysis = await AIToolHandlers.analyzeQuotation(user, { rfqId: 'rfq-500' });
    if (!analysis.success) {
      return { isFallback: true, mode: 'ASK', content: analysis.message, toolCallsExecuted: [] };
    }

    const rec = await AIToolHandlers.recommendVendor(user, { rfqId: 'rfq-500', priceWeight: 0.35, deliveryWeight: 0.20, qualityWeight: 0.15 });

    return {
      isFallback: true,
      mode: 'ANALYZE',
      content: `### Quote Intelligence Analysis complete for RFQ-2026-0500\n\n- **Recommended Vendor:** **${rec.data.recommendedSupplier}** (Composite Score: **${rec.data.compositeScore}/100**)\n- **Confidence:** 96%\n- **Total Landed Cost:** ₹2,62,50,000 (includes 18% GST + Free Corporate Shipping - ₹3,00,000 bulk discount)\n- **Key Reasons:**\n  ${rec.data.reasons.map((r: string) => `  ✓ ${r}`).join('\n')}\n- **Tradeoff:** ${rec.data.tradeoffs}\n\n⚠️ **Risk Anomaly Flagged:** ${rec.data.anomalyWarning}`,
      toolCallsExecuted: [
        { toolName: 'analyzeQuotation', message: analysis.message, data: analysis.data },
        { toolName: 'recommendVendor', message: rec.message, data: rec.data },
      ],
    };
  }

  // Scenario 3: Create PO / Prepare PO
  if (query.includes('po') || query.includes('purchase order') || query.includes('prepare po') || query.includes('generate po')) {
    const poResult = await AIToolHandlers.createPurchaseOrderDraft(user, {
      rfqId: 'rfq-500',
      supplierId: 'sup-102',
      supplierName: 'ABC Technologies',
      quantity: 500,
      unitPrice: 45000,
      totalAmount: 22500000,
      deliveryDays: 10,
    });

    if (!poResult.success) {
      return { isFallback: true, mode: 'ASK', content: poResult.message, toolCallsExecuted: [] };
    }

    return {
      isFallback: true,
      mode: 'GENERATE',
      content: `I have prepared the Purchase Order draft for **ABC Technologies (Vendor B)**.\n\nBecause this is a high-value purchase order (₹2,25,00,000), **human approval is required** before releasing the PO to the supplier. Please review the action prompt below.`,
      toolCallsExecuted: [
        {
          toolName: 'createPurchaseOrderDraft',
          message: poResult.message,
          data: poResult.data,
          requiresApproval: true,
          approvalPayload: poResult.approvalPayload,
        },
      ],
    };
  }

  // Scenario 4: Risk / Monitor
  if (query.includes('risk') || query.includes('supplier') || query.includes('anomaly') || query.includes('worst')) {
    const searchRes = await AIToolHandlers.searchSuppliers(user, { maxRiskScore: 100 });
    if (!searchRes.success) {
      return { isFallback: true, mode: 'ASK', content: searchRes.message, toolCallsExecuted: [] };
    }

    return {
      isFallback: true,
      mode: 'MONITOR',
      content: `### Risk Radar & Anomaly Report\n\n1. **CyberDistributors Ltd (Vendor C)** — **High Risk (78.0/100)**: Quoted 19% below market average (₹38,000 vs ₹45,000 benchmark) demanding 100% advance payment.\n2. **TechWorld Solutions (Vendor A)** — **Medium Risk (22.0/100)**: 20-day delivery timeline exceeds mandatory 15-day SLA requirement.\n3. **ABC Technologies (Vendor B)** — **Low Risk (8.0/100)**: Exceptional performance score with Tier-1 ESG certifications.`,
      toolCallsExecuted: [{ toolName: 'searchSuppliers', message: searchRes.message, data: searchRes.data }],
    };
  }

  // Scenario 5: Inventory / Reorder Predict
  if (query.includes('inventory') || query.includes('reorder') || query.includes('stock')) {
    const reorderRes = await AIToolHandlers.calculateReorderRecommendation(user, {});
    if (!reorderRes.success) {
      return { isFallback: true, mode: 'ASK', content: reorderRes.message, toolCallsExecuted: [] };
    }

    return {
      isFallback: true,
      mode: 'PREDICT',
      content: `### Predictive Inventory Insights\n\n- **Product:** MiraiBook Pro 14 (Business Laptop)\n- **Current Available Stock:** 7 units (Reserved: 35 units)\n- **Projected Stockout:** In 11 days based on current burn rate\n- **Recommended Procurement Action:** Issue RFQ for 500 units immediately to maintain stock buffer.`,
      toolCallsExecuted: [{ toolName: 'calculateReorderRecommendation', message: reorderRes.message, data: reorderRes.data }],
    };
  }

  // Default Ask Response
  return {
    isFallback: true,
    mode: 'ASK',
    content: `I am **Mirai AI**, your autonomous Procurement Operating System agent. Authenticated as **${user.name}** (${user.role}).\n\nI can assist you with:\n- **Intent to Procurement:** *"I need 500 laptops under ₹45,000 each within 15 days."*\n- **Quote Intelligence:** *"Analyze quotes for RFQ-2026-0500 and recommend the best supplier."*\n- **PO Generation:** *"Prepare the purchase order for ABC Technologies."*\n- **Risk Radar:** *"Show suppliers with delivery risks or pricing anomalies."*`,
    toolCallsExecuted: [],
  };
}
