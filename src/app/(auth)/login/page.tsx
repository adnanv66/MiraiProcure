'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DEMO_USERS } from '@/lib/seed-data';
import { useProcurement } from '@/lib/store/procurement-store';
import { getDefaultRoleRoute } from '@/lib/auth/rbac';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, Building2, CheckCircle2, KeyRound, UserCheck, Sparkles, X, Eye, EyeOff, UserPlus, LogIn } from 'lucide-react';
import { UserSession, Role } from '@/types';

export default function LoginPage() {
  const router = useRouter();
  const { setCurrentUser } = useProcurement();

  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [orgName, setOrgName] = useState('');
  const [selectedRole, setSelectedRole] = useState<Role>('PROCUREMENT_MANAGER');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [selectedDemoUserId, setSelectedDemoUserId] = useState<string>('usr-2'); // Default Procurement Manager
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Modals for Forgot Password
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  const [showRoleSelector, setShowRoleSelector] = useState(true);

  // Form submit handler for Sign In / Sign Up
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!email.trim()) {
      setErrorMessage('Please enter your work email.');
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!password) {
      setErrorMessage('Password is required.');
      return;
    }

    if (mode === 'signup') {
      if (!orgName.trim()) {
        setErrorMessage('Organization name is required.');
        return;
      }
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setSuccessMessage(`Account created for ${orgName}! Role assigned: ${selectedRole.replace('_', ' ')}. Redirecting...`);
        // Find matching or fallback user role session
        const demoMatch = DEMO_USERS.find((u) => u.role === selectedRole) || DEMO_USERS[1];
        setCurrentUser(demoMatch);
        localStorage.setItem('miraiprocure_user', JSON.stringify(demoMatch));
        setTimeout(() => {
          router.push(getDefaultRoleRoute(selectedRole));
        }, 800);
      }, 700);
      return;
    }

    // Sign In mode
    setIsLoading(true);
    setTimeout(() => {
      const matchedUser = DEMO_USERS.find((u) => u.email.toLowerCase() === email.trim().toLowerCase()) ||
        DEMO_USERS.find((u) => u.role === selectedRole);

      if (matchedUser) {
        setCurrentUser(matchedUser);
        localStorage.setItem('miraiprocure_user', JSON.stringify(matchedUser));
        const redirectPath = getDefaultRoleRoute(matchedUser.role);
        router.push(redirectPath);
      } else {
        setIsLoading(false);
        setErrorMessage('Invalid credentials. Select a role below to sign in.');
      }
    }, 600);
  };

  // Role select handler (No personal names mentioned)
  const handleSelectRole = (user: UserSession) => {
    setEmail(user.email);
    setPassword('miraiprocure2026');
    setSelectedRole(user.role);
    setSelectedDemoUserId(user.id);
    setErrorMessage(null);
  };

  const handleQuickRoleSignIn = (user: UserSession) => {
    setIsLoading(true);
    setCurrentUser(user);
    localStorage.setItem('miraiprocure_user', JSON.stringify(user));
    setTimeout(() => {
      const redirectPath = getDefaultRoleRoute(user.role);
      router.push(redirectPath);
    }, 500);
  };

  const activeDemoUser = DEMO_USERS.find((u) => u.id === selectedDemoUserId) || DEMO_USERS[1];

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 sm:p-6 lg:p-8 font-['Manrope'] selection:bg-amber-500 selection:text-white overflow-x-hidden">
      
      {/* Background Scenic Landscape Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none transition-all duration-700 scale-105"
        style={{ backgroundImage: `url('/login-bg.jpg')` }}
      />
      
      {/* Dark Twilight Gradient Overlay for Rich Contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-purple-950/40 to-slate-950/80 pointer-events-none" />

      {/* Main Glassmorphism Floating Card */}
      <div className="relative z-10 w-full max-w-md bg-slate-950/45 backdrop-blur-2xl border border-white/15 rounded-[2.5rem] p-7 sm:p-9 shadow-[0_20px_50px_rgba(0,0,0,0.5)] text-white space-y-5 animate-fade-in font-['Manrope']">
        
        {/* Top Floating Orbit Icon Header */}
        <div className="text-center space-y-3">
          <div className="mx-auto w-12 h-12 min-w-[48px] min-h-[48px] max-w-[48px] max-h-[48px] flex-shrink-0 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-md shadow-inner text-amber-300 overflow-hidden">
            <svg viewBox="0 0 100 100" width="28" height="28" style={{ width: '28px', height: '28px', minWidth: '28px', minHeight: '28px', maxWidth: '28px', maxHeight: '28px' }} className="w-7 h-7 text-white fill-none stroke-current stroke-[6] flex-shrink-0 block">
              <circle cx="50" cy="50" r="18" />
              <circle cx="50" cy="18" r="4" fill="currentColor" />
              <circle cx="50" cy="82" r="4" fill="currentColor" />
              <circle cx="18" cy="50" r="4" fill="currentColor" />
              <circle cx="82" cy="50" r="4" fill="currentColor" />
              <circle cx="27" cy="27" r="4" fill="currentColor" />
              <circle cx="73" cy="73" r="4" fill="currentColor" />
              <circle cx="27" cy="73" r="4" fill="currentColor" />
              <circle cx="73" cy="27" r="4" fill="currentColor" />
            </svg>
          </div>

          <h1 className="text-3xl font-light tracking-tight text-white font-['Manrope']">
            {mode === 'signin' ? 'Welcome back!' : 'Create Account'}
          </h1>
          <p className="text-xs text-white/70 max-w-xs mx-auto leading-relaxed">
            {mode === 'signin' 
              ? 'Sign in to access your procurement workspace and AI governance cockpit.'
              : 'Register your organization and select an enterprise role to get started.'}
          </p>

          {/* Mode Switcher Tabs */}
          <div className="inline-flex p-1 bg-white/10 border border-white/15 rounded-full text-xs font-semibold">
            <button
              type="button"
              onClick={() => {
                setMode('signin');
                setErrorMessage(null);
              }}
              className={`px-4 py-1 rounded-full transition-all flex items-center gap-1.5 ${
                mode === 'signin' ? 'bg-white text-slate-950 shadow' : 'text-white/70 hover:text-white'
              }`}
            >
              <LogIn className="h-3.5 w-3.5" />
              <span>Sign In</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('signup');
                setErrorMessage(null);
              }}
              className={`px-4 py-1 rounded-full transition-all flex items-center gap-1.5 ${
                mode === 'signup' ? 'bg-white text-slate-950 shadow' : 'text-white/70 hover:text-white'
              }`}
            >
              <UserPlus className="h-3.5 w-3.5" />
              <span>Sign Up</span>
            </button>
          </div>
        </div>

        {/* Error / Success Notifications */}
        {errorMessage && (
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-200 text-xs font-medium backdrop-blur-md">
            <AlertCircle className="h-4 w-4 text-rose-400 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}
        {successMessage && (
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 text-xs font-medium backdrop-blur-md">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleAuthSubmit} className="space-y-3.5">
          {mode === 'signup' && (
            <div className="space-y-1 text-left">
              <label className="text-xs font-medium text-white/80 block pl-1">Organization Name</label>
              <input
                type="text"
                required
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                placeholder="Enter organization name"
                className="w-full bg-white/5 border border-white/15 focus:border-white/40 focus:bg-white/10 rounded-2xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none transition-all"
              />
            </div>
          )}

          <div className="space-y-1 text-left">
            <label className="text-xs font-medium text-white/80 block pl-1">Work Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your work email"
              className="w-full bg-white/5 border border-white/15 focus:border-white/40 focus:bg-white/10 rounded-2xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none transition-all"
            />
          </div>

          {/* Role Selection Mention */}
          <div className="space-y-1 text-left">
            <label className="text-xs font-medium text-white/80 block pl-1 flex items-center justify-between">
              <span>Selected Role</span>
              <span className="text-[10px] text-amber-300 font-mono">Role-Based Access</span>
            </label>
            <select
              value={selectedRole}
              onChange={(e) => {
                const r = e.target.value as Role;
                setSelectedRole(r);
                const matchedUser = DEMO_USERS.find((u) => u.role === r);
                if (matchedUser) {
                  setEmail(matchedUser.email);
                  setSelectedDemoUserId(matchedUser.id);
                }
              }}
              className="w-full bg-slate-900 border border-white/20 focus:border-white/40 rounded-2xl px-3.5 py-2.5 text-xs text-white focus:outline-none cursor-pointer"
            >
              <option value="PROCUREMENT_MANAGER">Procurement Manager (Full Procurement Access)</option>
              <option value="PROCUREMENT_OFFICER">Procurement Officer (Operational PRs &amp; RFQs)</option>
              <option value="FINANCE_MANAGER">Finance Manager (Invoices &amp; 3-Way Match)</option>
              <option value="INVENTORY_MANAGER">Inventory Manager (Stock &amp; Reorder Radar)</option>
              <option value="APPROVER">Executive Approver (PO &amp; Financial Approvals)</option>
              <option value="ADMIN">System Administrator (Full System Governance)</option>
              <option value="SUPPLIER">Supplier Partner (Isolated Vendor Portal)</option>
            </select>
          </div>

          <div className="space-y-1 text-left">
            <label className="text-xs font-medium text-white/80 block pl-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full bg-white/5 border border-white/15 focus:border-white/40 focus:bg-white/10 rounded-2xl px-4 py-2.5 pr-11 text-sm text-white placeholder:text-white/30 focus:outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-white/50 hover:text-white/90 transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {mode === 'signin' && (
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-white/80 select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-white/30 bg-white/10 text-amber-500 focus:ring-0 cursor-pointer"
                />
                <span>Remember me</span>
              </label>

              <button
                type="button"
                onClick={() => setShowForgotModal(true)}
                className="text-white/80 hover:text-white hover:underline transition-colors font-medium"
              >
                Forgot password?
              </button>
            </div>
          )}

          {/* Primary Action Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-full bg-white hover:bg-slate-100 active:scale-[0.99] text-slate-950 font-bold text-sm shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 mt-2"
          >
            {isLoading ? (
              <>
                <div className="h-4 w-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <span>{mode === 'signin' ? `Sign In as ${selectedRole.replace('_', ' ')}` : 'Create Account'}</span>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-2">
          <div className="h-px flex-1 bg-white/15" />
          <span className="text-xs text-white/40 font-medium">Or</span>
          <div className="h-px flex-1 bg-white/15" />
        </div>

        {/* Google Sign In Button */}
        <button
          type="button"
          onClick={() => handleQuickRoleSignIn(activeDemoUser)}
          className="w-full py-3 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-medium text-xs flex items-center justify-center gap-2.5 transition-all active:scale-[0.99] backdrop-blur-md"
        >
          <svg width="18" height="18" style={{ width: '18px', height: '18px', minWidth: '18px', minHeight: '18px' }} className="w-4 h-4 flex-shrink-0 block" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Sign In with Google</span>
        </button>

        {/* Quick Role Selection Panel (No Personal Names) */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => setShowRoleSelector(!showRoleSelector)}
            className="w-full text-center text-xs text-white/70 hover:text-white flex items-center justify-center gap-1.5 transition-colors py-1 font-medium"
          >
            <UserCheck className="h-3.5 w-3.5 text-amber-300" />
            <span>Role Sign In Quick Switcher</span>
            <span className="text-[10px] font-mono text-amber-300 bg-amber-500/20 px-1.5 py-0.2 rounded border border-amber-500/30">
              7 Roles
            </span>
          </button>

          {showRoleSelector && (
            <div className="mt-3 p-3 rounded-2xl bg-black/40 border border-white/15 space-y-2 animate-fade-in text-left">
              <span className="text-[10px] font-mono text-white/50 uppercase tracking-wider block">
                Select Role Persona (No Personal Names)
              </span>
              <div className="grid grid-cols-1 gap-1.5 max-h-44 overflow-y-auto pr-1">
                {DEMO_USERS.map((user) => (
                  <button
                    key={user.id}
                    type="button"
                    onClick={() => {
                      handleSelectRole(user);
                      handleQuickRoleSignIn(user);
                    }}
                    className={`p-2.5 rounded-xl text-xs border text-left transition-all flex items-center justify-between ${
                      selectedRole === user.role
                        ? 'bg-white/20 border-white/40 text-white font-bold'
                        : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'
                    }`}
                  >
                    <div>
                      {/* Displaying ONLY Role Title and Department - NO Personal Names */}
                      <span className="font-bold text-slate-100 block">{user.role.replace('_', ' ')}</span>
                      <span className="text-[10px] text-white/60 font-mono">{user.department}</span>
                    </div>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-amber-500/20 border border-amber-400/40 text-amber-200 font-bold">
                      Sign In
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Mode Switcher */}
        <div className="text-xs text-white/70 pt-2">
          {mode === 'signin' ? (
            <>
              Don&apos;t have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('signup')}
                className="font-bold text-white hover:underline transition-colors"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('signin')}
                className="font-bold text-white hover:underline transition-colors"
              >
                Sign In
              </button>
            </>
          )}
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/20 rounded-3xl p-6 max-w-md w-full text-white space-y-4 shadow-2xl relative font-['Manrope']">
            <button
              onClick={() => {
                setShowForgotModal(false);
                setResetSuccess(false);
              }}
              className="absolute top-4 right-4 text-white/50 hover:text-white p-1"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-amber-500/20 border border-amber-500/40 text-amber-300 rounded-2xl flex items-center justify-center">
                <KeyRound className="h-5 w-5" />
              </div>
              <div className="text-left">
                <h3 className="text-base font-bold text-white">Reset Your Password</h3>
                <p className="text-xs text-white/60">MiraiProcure Password Recovery</p>
              </div>
            </div>

            {resetSuccess ? (
              <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 text-xs space-y-2 text-left">
                <div className="font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>Instructions Sent</span>
                </div>
                <p>If an account exists for {resetEmail}, instructions have been sent to reset your password.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (resetEmail) setResetSuccess(true);
                }}
                className="space-y-3 text-left"
              >
                <p className="text-xs text-white/70">
                  Enter your registered work email. We will send a secure password reset link to your inbox.
                </p>
                <div>
                  <label className="text-xs font-medium text-white/80 block mb-1">Work Email</label>
                  <input
                    type="email"
                    required
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-white/5 border border-white/15 focus:border-white/40 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-white text-slate-950 font-bold text-xs shadow transition-all"
                >
                  Send Reset Link
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
