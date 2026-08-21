# Deployment Guide — MiraiProcure (未来プロキュア)

## 1. Prerequisites
- GitHub account
- Vercel account
- Managed PostgreSQL database (Neon, Supabase, Vercel Postgres, or AWS RDS)

## 2. Environment Variables Configuration
Set the following environment variables in Vercel Project Settings:

```env
DATABASE_URL="postgresql://user:password@ep-host.postgresql.neon.tech/miraiprocure?sslmode=require"
NEXTAUTH_SECRET="your_production_nextauth_secret_key"
NEXTAUTH_URL="https://your-miraiprocure-domain.vercel.app"
GEMINI_API_KEY="your_gemini_api_key_optional"
BLOB_READ_WRITE_TOKEN="vercel_blob_token_optional"
```

## 3. Deployment Steps
1. Push workspace code to GitHub repository.
2. Import project in Vercel dashboard.
3. Configure Environment Variables.
4. Deploy! Build script (`prisma generate && next build`) automatically runs.
