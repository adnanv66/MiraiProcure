// TypeScript Types for MiraiProcure (未来プロキュア)

export type Role =
  | 'ADMIN'
  | 'PROCUREMENT_MANAGER'
  | 'PROCUREMENT_OFFICER'
  | 'FINANCE_MANAGER'
  | 'INVENTORY_MANAGER'
  | 'APPROVER'
  | 'SUPPLIER';

export type GovernanceLevel =
  | 'LEVEL_1_ASSIST'
  | 'LEVEL_2_SEMI_AUTONOMOUS'
  | 'LEVEL_3_GOVERNED_AUTONOMOUS';

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: Role;
  department: string;
  avatarUrl?: string;
}

export interface Supplier {
  id: string;
  code: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  location: string;
  industry: string;
  taxId: string;
  certifications: string;
  categories: string;
  paymentTerms: string;
  deliveryScore: number;
  qualityScore: number;
  riskScore: number;
  sustainabilityScore: number;
  status: 'ACTIVE' | 'ONBOARDING' | 'SUSPENDED';
}

export interface PurchaseRequest {
  id: string;
  prNumber: string;
  title: string;
  requesterName: string;
  department: string;
  category: string;
  quantity: number;
  estimatedUnit: number;
  totalBudget: number;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  status: 'DRAFT' | 'SUBMITTED' | 'AI_PROCESSING' | 'RFQ_CREATED' | 'AWAITING_APPROVAL' | 'APPROVED' | 'REJECTED' | 'COMPLETED';
  justification: string;
  requiredBy: string;
  createdAt: string;
}

export interface RFQ {
  id: string;
  rfqNumber: string;
  title: string;
  category: string;
  deadline: string;
  targetBudget: number;
  deliveryDays: number;
  requirements: string;
  status: 'DRAFT' | 'PUBLISHED' | 'RESPONSES_RECEIVED' | 'EVALUATION' | 'RECOMMENDATION' | 'AWARDED' | 'CLOSED';
  createdAt: string;
  invitedSuppliers: string[];
}

export interface Quotation {
  id: string;
  quoteNumber: string;
  rfqId: string;
  supplierId: string;
  supplierName: string;
  unitPrice: number;
  quantity: number;
  shippingCost: number;
  taxCost: number;
  discountAmount: number;
  totalLandedCost: number;
  deliveryDays: number;
  warrantyMonths: number;
  paymentTerms: string;
  status: 'RECEIVED' | 'UNDER_REVIEW' | 'ANALYZED' | 'RECOMMENDED' | 'ACCEPTED' | 'REJECTED';
  isAnomaly?: boolean;
  anomalyReason?: string;
  scores?: VendorScore;
}

export interface VendorScore {
  priceScore: number; // max 35
  deliveryScore: number; // max 20
  qualityScore: number; // max 15
  warrantyScore: number; // max 10
  riskScore: number; // max 10
  pastPerformanceScore: number; // max 5
  sustainabilityScore: number; // max 5
  compositeScore: number; // out of 100
  rank: number;
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  supplierName: string;
  totalAmount: number;
  landedCost: number;
  deliveryDate: string;
  paymentTerms: string;
  status: 'DRAFT' | 'PENDING_APPROVAL' | 'APPROVED' | 'SENT' | 'ACKNOWLEDGED' | 'PARTIALLY_RECEIVED' | 'RECEIVED' | 'CLOSED';
  approvalStatus: 'PENDING' | 'APPROVED' | 'REJECTED';
  generatedByAI: boolean;
  createdAt: string;
}

export interface InventoryItem {
  id: string;
  productName: string;
  sku: string;
  category: string;
  warehouse: string;
  totalQuantity: number;
  reservedStock: number;
  availableStock: number;
  reorderPoint: number;
  status: 'OPTIMAL' | 'LOW_STOCK' | 'CRITICAL' | 'REORDER_RECOMMENDED';
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  poNumber: string;
  supplierName: string;
  invoiceAmount: number;
  poAmount: number;
  goodsReceivedQuantity: number;
  invoicedQuantity: number;
  threeWayMatchStatus: 'MATCHED' | 'MISMATCH_DETECTED' | 'PENDING_RECEIPT';
  discrepancyReason?: string;
  paymentStatus: 'PENDING' | 'RELEASED' | 'HELD';
  dueDate: string;
}

export interface RiskSignal {
  id: string;
  supplierName: string;
  riskType: 'Supplier' | 'Financial' | 'Delivery' | 'Quality' | 'Compliance' | 'Anomaly';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  score: number;
  title: string;
  description: string;
  aiSignal: string;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  userName: string;
  action: string;
  entity: string;
  entityId: string;
  details: string;
  timestamp: string;
  aiActionId?: string;
}

export interface AIActionToolCall {
  toolName: string;
  args: Record<string, any>;
  requiresApproval: boolean;
  result?: any;
}
