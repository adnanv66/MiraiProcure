## 🌐 MiraiProcure (未来プロキュア)

> **Live Deployed App:** [https://miraiprocure.onrender.com](https://miraiprocure.onrender.com)  
> **Tagline:** From Intent to Invoice — AI-powered procurement with humans in control.  
> **Primary Concept:** Next-Generation AI Procurement Operating System (AI Procurement ERP)

---

## 🚀 Live Public Deployment
- **Public Application URL:** [https://miraiprocure.onrender.com](https://miraiprocure.onrender.com)
- **Login / Sign In Page:** [https://miraiprocure.onrender.com/login](https://miraiprocure.onrender.com/login)
- **GitHub Repository:** [https://github.com/adnanv66/MiraiProcure](https://github.com/adnanv66/MiraiProcure)

## 🌟 Overview & Key Features

MiraiProcure automates the entire procurement lifecycle while enforcing strict human-in-the-loop governance:
**Requirement → Purchase Request → RFQ → Supplier Response → Quote Processing → Quote Analysis → Vendor Selection → Approval → Purchase Order → Inventory → Finance → Analytics**

### Key Differentiators:
1. **Mirai AI Agent (未来プロキュア)**
   - Natural language intent parsing: *"I need 500 laptops under ₹45,000 each, delivery within 15 days."*
   - Secure server-side tools (Zod validated, RBAC checked, audit logged).
   - Sensitive action confirmation modal for high-value purchase orders.
   - Dual-mode operation: Gemini 1.5/2.0 API with automatic safe offline **Demo AI Fallback Mode**.

2. **Quote Intelligence Center**
   - Autonomous document extraction (PDF, CSV, XLSX).
   - **Total Landed Cost Engine:** Unit Price + Freight + Taxes - Bulk Discounts.
   - **Multi-Factor Vendor Scoring:** Price (35%), Delivery (20%), Quality (15%), Warranty (10%), Risk (10%), Past Performance (5%), Sustainability (5%).
   - **What-If Simulator:** Real-time scenario recalculation with watermark protection.
   - **Explainable AI Recommendations:** Lists explicit reasons, trade-offs, and savings.

3. **Risk Radar & Anomaly Detection**
   - Market benchmark price anomaly alert (19% below benchmark flag for Vendor C).
   - Delivery SLA breach warning signals.

4. **Finance & 3-Way Matching Engine**
   - Purchase Order vs Goods Receipt vs Invoice validation.
   - Discrepancy detection & automated payment hold (e.g. 520 units invoiced vs 500 PO units).

5. **Hackathon Command Center & Digital Procurement Twin**
   - Central operational hub showcasing the 500 Business Laptops demo scenario.
   - Clickable visual workflow graph mapping physical intent to financial settlement.

---

## 🚀 Tech Stack

- **Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS, Lucide Icons, Recharts.
- **Backend:** Next.js Route Handlers, Server Components, Zod Validation.
- **Database & ORM:** PostgreSQL & Prisma ORM.
- **AI Engine:** Gemini API with secure server-side tool calling + Safe Demo Fallback.
- **Deployment:** Vercel deployment-ready architecture (no local-only filesystem dependencies, deployment-safe Prisma schema).

---

## 💻 How to Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Generate Prisma Client
npm run db:generate

# 3. Start Development Server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Pre-Configured Demo Persona Accounts

| Name | Role | Email |
| :--- | :--- | :--- |
| Alexander Vance | Admin | `admin@miraiprocure.io` |
| Kenji Sato (佐藤 健二) | Procurement Manager | `pm@miraiprocure.io` |
| Sophia Martinez | Procurement Officer | `officer@miraiprocure.io` |
| David Chen | Finance Manager | `finance@miraiprocure.io` |
| Priya Sharma | Inventory Manager | `inventory@miraiprocure.io` |
| Eleanor Vance | Approver | `approver@miraiprocure.io` |
| Hiroshi Tanaka | Supplier | `supplier@techworld.io` |

---

## 🚢 Deploying to Vercel & GitHub

```bash
# Push to GitHub
git init
git add .
git commit -m "feat: MiraiProcure AI Procurement ERP"
git remote add origin https://github.com/YOUR_USERNAME/miraiprocure.git
git push -u origin main
```

Connect your GitHub repository to **Vercel** and set environment variables:
- `DATABASE_URL` (PostgreSQL / Supabase / Neon / Vercel Postgres)
- `NEXTAUTH_SECRET`
- `GEMINI_API_KEY` (Optional)
