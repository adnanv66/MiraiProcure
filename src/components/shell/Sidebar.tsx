'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/ui/Logo';
import { useProcurement } from '@/lib/store/procurement-store';
import { canAccessRoute } from '@/lib/auth/rbac';
import {
  LayoutDashboard,
  Bot,
  FileSpreadsheet,
  FileCheck2,
  BrainCircuit,
  Building2,
  ShoppingCart,
  Boxes,
  Landmark,
  FileText,
  ShieldAlert,
  CheckCircle2,
  BarChart3,
  Network,
  Activity,
  Cpu,
  ShieldCheck,
  Settings,
  Globe,
  Radio,
  Sparkles
} from 'lucide-react';

const navigationItems = [
  { name: 'Executive Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Command Center', href: '/command-center', icon: Radio, highlight: true },
  { name: 'Digital Twin', href: '/digital-twin', icon: Network, highlight: true },
  { name: 'Mirai AI Assistant', href: '/mirai-ai', icon: Bot, badge: 'AI OS' },
  { name: 'Purchase Requests', href: '/purchase-requests', icon: FileSpreadsheet },
  { name: 'RFQ Management', href: '/rfqs', icon: FileCheck2 },
  { name: 'Quote Intelligence', href: '/quote-intelligence', icon: BrainCircuit, badge: 'Score 95%' },
  { name: 'Supplier 360', href: '/suppliers', icon: Building2 },
  { name: 'Supplier Portal', href: '/portal', icon: Globe },
  { name: 'Purchase Orders', href: '/purchase-orders', icon: ShoppingCart },
  { name: 'Predictive Inventory', href: '/inventory', icon: Boxes },
  { name: 'Finance & 3-Way Match', href: '/finance', icon: Landmark },
  { name: 'Contracts', href: '/contracts', icon: FileText },
  { name: 'Risk Center', href: '/risk-center', icon: ShieldAlert, badge: 'Anomaly' },
  { name: 'Approvals Engine', href: '/approvals', icon: CheckCircle2 },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Audit Trail', href: '/audit-trail', icon: Activity },
  { name: 'AI Activity Log', href: '/ai-activity', icon: Cpu },
  { name: 'AI Governance', href: '/ai-governance', icon: ShieldCheck },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { currentUser } = useProcurement();

  // Filter navigation items by logged-in user role
  const visibleNavItems = navigationItems.filter((item) =>
    canAccessRoute(currentUser.role, item.href)
  );

  return (
    <aside className="w-64 bg-white border-r border-slate-200/80 flex flex-col h-screen sticky top-0 z-30 select-none shadow-sm">
      {/* Top Brand Header */}
      <div className="p-4 border-b border-slate-200/80 flex items-center justify-between">
        <Logo size="sm" lightMode showTagline={false} />
      </div>

      {/* Role Badge Indicator */}
      <div className="px-4 py-2 bg-slate-50 border-b border-slate-200/60 flex items-center justify-between">
        <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-500">
          ACTIVE ROLE
        </span>
        <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded">
          {currentUser.role.replace('_', ' ')}
        </span>
      </div>

      {/* Main Navigation Link Items */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <div className="px-3 pb-2 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
          Procurement Modules
        </div>

        {visibleNavItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 ${
                isActive
                  ? 'bg-amber-50 text-amber-900 border border-amber-200 shadow-sm'
                  : item.highlight
                  ? 'text-amber-700 hover:bg-slate-50 hover:text-amber-800'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`h-4 w-4 ${isActive ? 'text-amber-600' : 'text-slate-400'}`} />
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold ${
                  item.badge.includes('Anomaly')
                    ? 'bg-rose-100 text-rose-700 border border-rose-200'
                    : 'bg-amber-100 text-amber-800 border border-amber-200'
                }`}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Bottom Autonomy Mode Status */}
      <div className="p-3 m-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-amber-500 animate-pulse" />
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-slate-800 flex items-center gap-1">
              Mirai AI OS <Sparkles className="h-3 w-3 text-amber-500" />
            </span>
            <span className="text-[9px] text-slate-500 font-mono">Semi-Autonomous</span>
          </div>
        </div>
        {canAccessRoute(currentUser.role, '/ai-governance') && (
          <Link href="/ai-governance" className="text-[10px] font-bold text-amber-700 hover:underline">
            Policy
          </Link>
        )}
      </div>
    </aside>
  );
};
