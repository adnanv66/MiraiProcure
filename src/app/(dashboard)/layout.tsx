'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Sidebar } from '@/components/shell/Sidebar';
import { TopNav } from '@/components/shell/TopNav';
import { MiraiCommandBar } from '@/components/ai/MiraiCommandBar';
import { AccessDenied } from '@/components/ui/AccessDenied';
import { useProcurement } from '@/lib/store/procurement-store';
import { canAccessRoute } from '@/lib/auth/rbac';
import { Bot } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, setCurrentUser } = useProcurement();
  const [isCommandBarOpen, setIsCommandBarOpen] = useState(false);

  // Restore stored session if exists
  useEffect(() => {
    const saved = localStorage.getItem('miraiprocure_user');
    if (saved) {
      try {
        const u = JSON.parse(saved);
        if (u && u.role && u.id !== currentUser.id) {
          setCurrentUser(u);
        }
      } catch (e) {
        // ignore parse error
      }
    }
  }, [setCurrentUser, currentUser.id]);

  // Supplier Isolation Redirect Guard
  useEffect(() => {
    if (currentUser.role === 'SUPPLIER' && !pathname.startsWith('/portal')) {
      router.push('/portal');
    }
  }, [currentUser.role, pathname, router]);

  // Check if current user role has permission to access route
  const isAuthorized = canAccessRoute(currentUser.role, pathname);

  return (
    <div className="flex h-screen bg-[#F7F8FA] text-slate-900 overflow-hidden font-sans">
      {/* ERP Navigation Sidebar */}
      <Sidebar />

      {/* Main Content Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <TopNav
          currentUser={currentUser}
          onSelectUser={(u) => {
            setCurrentUser(u);
            localStorage.setItem('miraiprocure_user', JSON.stringify(u));
          }}
          onOpenCommandBar={() => setIsCommandBarOpen(true)}
        />

        {/* Dynamic Route Content with Authorization Protection */}
        <main className="flex-1 overflow-y-auto p-6 bg-[#F7F8FA]">
          {isAuthorized ? children : <AccessDenied userRole={currentUser.role} />}
        </main>
      </div>

      {/* Global Mirai AI Floating Assistant Button */}
      <button
        onClick={() => setIsCommandBarOpen(true)}
        className="fixed bottom-6 right-6 z-30 p-3.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold shadow-xl shadow-amber-600/25 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group"
        title="Open Mirai AI Assistant (Ctrl + K)"
      >
        <Bot className="h-6 w-6 stroke-[2.5]" />
        <span className="text-xs font-extrabold pr-1 hidden sm:inline">Ask Mirai AI</span>
      </button>

      {/* Mirai AI Command Bar Modal */}
      <MiraiCommandBar
        isOpen={isCommandBarOpen}
        onClose={() => setIsCommandBarOpen(false)}
        currentUser={currentUser}
      />
    </div>
  );
}
