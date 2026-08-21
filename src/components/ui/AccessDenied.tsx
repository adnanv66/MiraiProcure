'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { getDefaultRoleRoute } from '@/lib/auth/rbac';
import { Role } from '@/types';

interface AccessDeniedProps {
  userRole?: Role;
}

export const AccessDenied: React.FC<AccessDeniedProps> = ({ userRole = 'PROCUREMENT_OFFICER' }) => {
  const homeRoute = getDefaultRoleRoute(userRole);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center bg-slate-50/50 rounded-2xl border border-slate-200 m-4">
      <div className="h-16 w-16 bg-amber-100 border border-amber-300 text-amber-600 rounded-full flex items-center justify-center mb-4 shadow-sm">
        <ShieldAlert className="h-8 w-8" />
      </div>
      <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">403 — Access Restricted</h2>
      <p className="text-sm text-slate-600 max-w-md mb-6 leading-relaxed">
        You don&apos;t have permission to access this workspace. Your role (<span className="font-semibold text-slate-800">{userRole}</span>) is restricted from viewing or modifying this section.
      </p>
      <Link
        href={homeRoute}
        className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-5 py-2.5 rounded-xl shadow-sm transition-all"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Return to Dashboard</span>
      </Link>
    </div>
  );
};
