# MiraiProcure (未来プロキュア) — Implementation Plan

**Tagline:** From Intent to Invoice — AI-powered procurement with humans in control.

## 1. System Architecture
MiraiProcure is designed as a cloud-native, serverless-ready Procurement ERP built on Next.js App Router, PostgreSQL with Prisma ORM, Auth.js, Zod, and Gemini AI.

```
+-----------------------------------------------------------------------+
|                            NEXT.JS FRONTEND                           |
|  - App Router Pages & Layouts (ERP Shell, Command Center, Twin)       |
|  - Tailwind CSS + shadcn UI components + Lucide Icons + Recharts       |
|  - Mirai AI Overlay (Ctrl+K Command Bar & Global Floating Assistant)   |
+-----------------------------------------------------------------------+
                                   |
                                   v
+-----------------------------------------------------------------------+
|                    NEXT.JS SERVER-SIDE LAYER                          |
|  - Route Handlers & Server Actions with RBAC & Zod Schema Validation   |
|  - Mirai AI Tool Dispatcher (Server-side tool execution, no direct DB)|
|  - Safe Demo AI Fallback Handler (Runs offline/demo if no API key)    |
+-----------------------------------------------------------------------+
                                   |
         +-------------------------+-------------------------+
         |                                                   |
         v                                                   v
+-----------------------------------+               +-------------------+
|     POSTGRESQL & PRISMA ORM       |               | GEMINI 1.5/2.0 API|
|  - 20+ Models (Supplier, RFQ, PO, |               |  - System prompts |
|    Quote, Risk, AuditLog, AIAction|               |  - Tool calling   |
+-----------------------------------+               +-------------------+
```

---

## 2. Project Folder Structure
```
web/
├── docs/
│   ├── ARCHITECTURE.md
│   ├── DATABASE.md
│   ├── AI_AGENT.md
│   ├── DEPLOYMENT.md
│   └── IMPLEMENTATION_PLAN.md
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── public/
│   └── logo.svg
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   └── login/
│   │   ├── (dashboard)/
│   │   │   ├── layout.tsx
│   │   │   ├── dashboard/
│   │   │   ├── command-center/
│   │   │   ├── mirai-ai/
│   │   │   ├── purchase-requests/
│   │   │   ├── rfqs/
│   │   │   ├── quote-intelligence/
│   │   │   ├── suppliers/
│   │   │   │   └── [id]/
│   │   │   ├── purchase-orders/
│   │   │   ├── inventory/
│   │   │   ├── finance/
│   │   │   ├── contracts/
│   │   │   ├── risk-center/
│   │   │   ├── approvals/
│   │   │   ├── analytics/
│   │   │   ├── digital-twin/
│   │   │   ├── audit-trail/
│   │   │   ├── ai-activity/
│   │   │   ├── ai-governance/
│   │   │   └── settings/
│   │   ├── portal/ (Supplier Portal)
│   │   ├── api/
│   │   │   ├── ai/
│   │   │   │   └── chat/
│   │   │   ├── rfqs/
│   │   │   ├── quotes/
│   │   │   ├── purchase-orders/
│   │   │   └── seed/
│   │   ├── page.tsx (Landing Page)
│   │   └── layout.tsx
│   ├── components/
│   │   ├── ui/ (Button, Card, Input, Dialog, Select, Badge, Tabs, etc.)
│   │   ├── shell/ (ERP Sidebar, TopNav, MiraiCommandBar, NotificationCenter)
│   │   ├── ai/ (MiraiFloatingDrawer, ActionConfirmationModal, ToolResultCard)
│   │   ├── quote-intelligence/ (QuoteUploadParser, LandedCostCalculator, VendorScoreTable, WhatIfSimulator)
│   │   ├── risk/ (RiskRadarMap, AnomalyAlertBadge)
│   │   └── digital-twin/ (InteractiveWorkflowDiagram)
│   ├── lib/
│   │   ├── ai/
│   │   │   ├── gemini.ts
│   │   │   ├── tools.ts (Zod tool definitions & handlers)
│   │   │   └── fallback.ts (Offline AI simulation)
│   │   ├── db/
│   │   │   └── prisma.ts
│   │   ├── auth/
│   │   │   └── config.ts
│   │   ├── utils/
│   │   └── seed-data.ts
│   └── types/
└── package.json
```

---

## 3. Database Schema Design (Prisma)
Models to include:
- `Organization` & `User` (Roles: ADMIN, PROCUREMENT_MANAGER, PROCUREMENT_OFFICER, FINANCE_MANAGER, INVENTORY_MANAGER, APPROVER, SUPPLIER)
- `Supplier` & `SupplierDocument` & `SupplierRisk`
- `Product` & `Category`
- `PurchaseRequest` & `PurchaseRequestItem`
- `RFQ` & `RFQItem` & `RFQSupplier`
- `Quotation` & `QuotationItem` & `QuoteAnalysis` & `VendorScore`
- `Approval`
- `PurchaseOrder` & `PurchaseOrderItem`
- `Inventory` & `InventoryTransaction`
- `Invoice` & `InvoiceItem`
- `Contract`
- `Notification`
- `AuditLog`
- `AIConversation`, `AIMessage`, `AIAction`, `AIRecommendation`

---

## 4. Route Map
- `/` - Public Landing Page (Hero, Value Prop, How It Works, Features, Interactive Demo Entry)
- `/login` - Role-based Login Switcher & Demo Account Quick Login
- `/dashboard` - Executive Procurement Dashboard (KPIs, Spend, Savings, Alerts)
- `/command-center` - Hackathon Command Center (Centralized live operational hub)
- `/mirai-ai` - Dedicated Mirai AI Assistant Workbench & Command Log
- `/purchase-requests` - PR Management & AI Request Creator
- `/rfqs` - RFQ Creation & Response Tracking
- `/quote-intelligence` - AI Quote Extraction, Landed Cost, Comparison & Simulator
- `/suppliers` & `/suppliers/[id]` - Supplier 360 & AI Document Onboarding
- `/portal` - Isolated Supplier Portal for RFQ Submission & Invoice View
- `/purchase-orders` - PO Management & PDF Generation Drafts
- `/inventory` - Stock Tracking & Reorder Predictive Procurement
- `/finance` - Spend Analytics, Invoices & 3-Way Matching Engine
- `/contracts` - Contract Intelligence & Expiry Radar
- `/risk-center` - AI Risk Radar & Anomaly Detection
- `/approvals` - Configurable Multi-tier Approval Engine
- `/analytics` - Spend, Savings, SLA, Supplier Performance Charts
- `/digital-twin` - Interactive Procurement Process Twin
- `/audit-trail` - Immutable Log of User & AI Actions
- `/ai-activity` - Execution History of Mirai AI Tools
- `/ai-governance` - Autonomy Controls & Policy Configuration
- `/settings` - Organization Preferences & Benchmark Settings

---

## 5. Mirai AI Architecture & Security
- **Tool-based Execution**: AI receives Zod schema tools (`createRFQ`, `recommendVendor`, `generatePO`, `calculateReorder`, etc.).
- **Strict Role-Based Control**: Every tool execution checks current session user permissions.
- **Human-in-the-Loop Confirmation**: High-value/sensitive actions (e.g. PO creation, Supplier Activation, Payment Release) trigger an interactive action confirmation modal before executing.
- **Explainability Engine**: Vendor recommendations break down weighted scores (Price 35%, Delivery 20%, Quality 15%, Warranty 10%, Risk 10%, Past Perf 5%, Sustainability 5%) and list explicit trade-offs.

---

## 6. Implementation Phases
- **Phase 1**: Project Initialization, UI Design System, Prisma Setup, Demo Database Seeding.
- **Phase 2**: Core ERP Pages & Application Shell (Sidebar, TopNav, Command Bar).
- **Phase 3**: Purchase Requests, RFQs, Supplier 360, Supplier Portal & PO Engine.
- **Phase 4**: Quote Intelligence Center (Landed Cost Engine, Vendor Scoring, What-If Simulator, Negotiation Assistant).
- **Phase 5**: Risk Center, Anomaly Radar, Three-Way Matching, Predictive Inventory & Contracts.
- **Phase 6**: Mirai AI Integration (Server-side tool calling dispatcher + safe Fallback Mode + Action Confirmation UI).
- **Phase 7**: Command Center, Digital Twin, Analytics, Governance, Audit Logs & Landing Page.
- **Phase 8**: Verification, Testing, Build Check & Deployment Documentation.
