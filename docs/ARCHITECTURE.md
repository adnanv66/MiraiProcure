# System Architecture — MiraiProcure (未来プロキュア)

MiraiProcure is designed as a cloud-native, serverless-ready Procurement ERP built on Next.js App Router, PostgreSQL with Prisma ORM, Auth.js, Zod, and Gemini AI.

## Layers
1. **Frontend Presentation:** Next.js App Router with Server Components, Tailwind CSS, Lucide Icons, Recharts.
2. **AI Dispatcher & Tooling:** Server-side Zod tool handlers enforcing RBAC permissions and audit logging.
3. **Database Layer:** Prisma ORM schema supporting PostgreSQL.
4. **Governance:** Human-in-the-loop confirmation modal for high-value financial transactions.
