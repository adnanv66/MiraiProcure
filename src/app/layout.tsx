import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { ClientProviders } from '@/components/providers/ClientProviders';

export const metadata: Metadata = {
  title: 'MiraiProcure (未来プロキュア) — AI-Powered Procurement Operating System',
  description: 'From Intent to Invoice — AI-powered procurement with humans in control.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <body className="antialiased font-sans bg-[#F7F8FA] text-slate-900">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
