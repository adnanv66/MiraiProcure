'use client';

import React, { useState } from 'react';
import { Search, Command, Bell, Check, ChevronDown, Sparkles, ExternalLink, LogOut, User, Settings as SettingsIcon, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { DEMO_USERS } from '@/lib/seed-data';
import { UserSession } from '@/types';
import { getDefaultRoleRoute } from '@/lib/auth/rbac';

interface TopNavProps {
  currentUser: UserSession;
  onSelectUser: (user: UserSession) => void;
  onOpenCommandBar: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({ currentUser, onSelectUser, onOpenCommandBar }) => {
  const router = useRouter();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notificationsList = [
    { title: 'New Quote Analysis Ready', desc: 'ABC Technologies score calculated at 95.2/100.', time: '2m ago', unread: true },
    { title: '3-Way Match Mismatch Alert', desc: 'INV-2026-4401 invoiced 520 units vs PO 500 units.', time: '15m ago', unread: true },
    { title: 'Predictive Inventory Alert', desc: 'MiraiBook Pro stock projected to reach reorder level in 11 days.', time: '1h ago', unread: false },
  ];

  const handleSignOut = () => {
    localStorage.removeItem('miraiprocure_user');
    router.push('/login');
  };

  const handleSwitchRoleAccount = (user: UserSession) => {
    onSelectUser(user);
    localStorage.setItem('miraiprocure_user', JSON.stringify(user));
    setShowProfileMenu(false);
    const route = getDefaultRoleRoute(user.role);
    router.push(route);
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 px-6 flex items-center justify-between sticky top-0 z-20 shadow-xs">
      {/* Left: Global Search Bar & Command Bar Shortcut */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <button
          onClick={onOpenCommandBar}
          className="w-full flex items-center justify-between bg-slate-50 border border-slate-200 hover:border-amber-400 px-3.5 py-2 rounded-xl text-slate-500 text-xs transition-all shadow-xs group"
        >
          <div className="flex items-center gap-2.5">
            <Search className="h-4 w-4 text-slate-400 group-hover:text-amber-600 transition-colors" />
            <span className="group-hover:text-slate-800">Ask Mirai AI or search POs, RFQs, Suppliers...</span>
          </div>
          <div className="flex items-center gap-1 bg-white border border-slate-200 px-2 py-0.5 rounded text-[10px] font-mono text-amber-700 font-bold">
            <Command className="h-3 w-3" />
            <span>K</span>
          </div>
        </button>
      </div>

      {/* Right Actions: Quick AI Launch, Notifications, User Profile */}
      <div className="flex items-center gap-3">
        {/* Quick Launch Mirai AI Button */}
        <button
          onClick={onOpenCommandBar}
          className="flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-sm transition-all active:scale-95"
        >
          <Sparkles className="h-3.5 w-3.5 fill-white" />
          <span>Ask Mirai AI</span>
        </button>

        {/* Notifications Button & Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 relative transition-all"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-amber-500 animate-ping" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-amber-500" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl p-3 z-50 animate-slide-up text-left">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                <span className="text-xs font-bold text-slate-900">Notifications</span>
                <span className="text-[10px] bg-amber-100 text-amber-800 border border-amber-200 px-1.5 py-0.5 rounded font-mono font-bold">2 Unread</span>
              </div>
              <div className="space-y-2">
                {notificationsList.map((n, i) => (
                  <div key={i} className={`p-2.5 rounded-xl text-xs border ${n.unread ? 'bg-amber-50/60 border-amber-200' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="font-semibold text-slate-900 flex items-center justify-between">
                      {n.title}
                      <span className="text-[9px] text-slate-400">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1">{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Landing Page Link */}
        <Link
          href="/"
          target="_blank"
          className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:text-amber-700 transition-all flex items-center gap-1 text-xs"
          title="View Landing Page"
        >
          <ExternalLink className="h-4 w-4" />
        </Link>

        {/* User Profile Dropdown Menu */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-xl transition-all"
          >
            <div className="h-7 w-7 rounded-lg bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800 font-bold text-xs">
              {currentUser.name.charAt(0)}
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-slate-900 line-clamp-1">{currentUser.name}</span>
              <span className="text-[10px] text-amber-700 font-mono font-semibold">{currentUser.role.replace('_', ' ')}</span>
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl p-3 z-50 animate-slide-up text-left space-y-3">
              {/* Profile Card Header */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <div className="font-bold text-sm text-slate-900">{currentUser.name}</div>
                <div className="text-xs text-slate-500 font-mono">{currentUser.email}</div>
                <div className="pt-1 flex items-center justify-between text-[10px] text-slate-600 border-t border-slate-200 mt-2">
                  <span>Org: <strong className="text-slate-800">MiraiProcure Global</strong></span>
                  <span className="font-mono bg-amber-100 text-amber-800 border border-amber-200 px-1.5 py-0.5 rounded font-bold">
                    {currentUser.role}
                  </span>
                </div>
              </div>

              {/* Persona Switcher Submenu */}
              <div className="space-y-1">
                <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-bold px-1 flex items-center justify-between">
                  <span>Switch Role (Demo)</span>
                  <ShieldCheck className="h-3 w-3 text-amber-600" />
                </div>
                <div className="space-y-1 max-h-44 overflow-y-auto pr-1">
                  {DEMO_USERS.map((user) => (
                    <button
                      key={user.id}
                      onClick={() => handleSwitchRoleAccount(user)}
                      className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-all text-xs ${
                        user.id === currentUser.id
                          ? 'bg-amber-50 border border-amber-300 text-amber-950 font-bold'
                          : 'hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-900">{user.role.replace('_', ' ')}</span>
                        <span className="text-[10px] text-slate-500">{user.department}</span>
                      </div>
                      {user.id === currentUser.id && <Check className="h-4 w-4 text-amber-600" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions Divider */}
              <div className="pt-2 border-t border-slate-100 space-y-1">
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2 p-2 rounded-xl text-rose-600 hover:bg-rose-50 font-semibold text-xs transition-all"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
