'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  BrainCircuit,
  Bot,
  Layers,
  FileCheck2,
  Boxes,
  Activity,
  CheckCircle2,
  ChevronRight,
  Zap,
  Lock,
  LineChart,
  Network
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F7F8FA] text-slate-900 font-sans selection:bg-amber-500 selection:text-white overflow-x-hidden">
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-xs">
        <Logo size="md" lightMode showTagline />
        
        <div className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-600">
          <a href="#solution" className="hover:text-amber-600 transition-colors">Solution</a>
          <a href="#quote-intelligence" className="hover:text-amber-600 transition-colors">Quote Intelligence</a>
          <a href="#governance" className="hover:text-amber-600 transition-colors">AI Governance</a>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-xs font-bold text-slate-700 hover:text-slate-900 px-3.5 py-2 rounded-xl transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/command-center"
            className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs transition-all"
          >
            <Sparkles className="h-4 w-4 fill-white" />
            <span>Launch Live Demo</span>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-36 pb-20 px-6 max-w-7xl mx-auto text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 px-3.5 py-1.5 rounded-full text-amber-800 text-xs font-mono mb-8 font-semibold">
          <Sparkles className="h-3.5 w-3.5 text-amber-600" />
          <span>Next-Generation AI Procurement Operating System</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight max-w-4xl text-slate-900 leading-tight">
          Procurement that <span className="text-gradient-amber">thinks before you buy.</span>
        </h1>

        <p className="mt-6 text-base md:text-xl text-slate-600 max-w-2xl font-normal leading-relaxed">
          Turn procurement intent into intelligent, explainable and governed execution. Autonomous RFQs, total landed cost intelligence, multi-factor vendor scoring, and human-in-the-loop governance.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/command-center"
            className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm px-7 py-3.5 rounded-2xl shadow-md shadow-amber-600/20 transition-all hover:scale-105"
          >
            <span>Start Live Demo</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/mirai-ai"
            className="flex items-center gap-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 font-semibold text-sm px-6 py-3.5 rounded-2xl transition-all shadow-xs"
          >
            <Bot className="h-4 w-4 text-amber-600" />
            <span>Meet Mirai AI</span>
          </Link>
        </div>

        {/* Hero Interactive Terminal Mockup */}
        <div className="mt-16 w-full max-w-5xl rounded-2xl bg-white border border-slate-200 p-4 shadow-xl relative overflow-hidden text-left font-mono text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-slate-500">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-rose-400" />
              <div className="h-3 w-3 rounded-full bg-amber-400" />
              <div className="h-3 w-3 rounded-full bg-emerald-400" />
              <span className="text-[10px] text-slate-500 ml-2 font-bold">Mirai AI Procurement Engine — Live Execution Terminal</span>
            </div>
            <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded border border-amber-300 font-bold">
              Level 2 Semi-Autonomous
            </span>
          </div>

          <div className="pt-4 space-y-3 font-sans">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3">
              <span className="text-amber-700 font-bold font-mono">User:</span>
              <p className="text-slate-800 font-medium">
                &ldquo;I need 500 laptops under ₹45,000 each, delivery within 15 days.&rdquo;
              </p>
            </div>

            <div className="p-3.5 bg-amber-50/60 border border-amber-200 rounded-xl text-slate-900 space-y-2">
              <div className="flex items-center gap-2 text-amber-800 font-bold font-mono text-xs">
                <Sparkles className="h-4 w-4 text-amber-600" />
                <span>Mirai AI Agent Action Executed</span>
              </div>
              <p className="text-xs text-slate-700">
                Created PR <span className="text-amber-800 font-mono font-bold">PR-2026-1024</span> &amp; published RFQ <span className="text-amber-800 font-mono font-bold">RFQ-2026-0500</span> to 3 eligible suppliers. Analyzed 3 quotations:
              </p>
              <div className="grid grid-cols-3 gap-3 pt-2 font-mono text-[11px]">
                <div className="p-2 bg-white rounded border border-slate-200">
                  <span className="text-slate-500 block">Vendor A (TechWorld)</span>
                  <span className="text-slate-800">Score: 76.1/100 (20d SLA)</span>
                </div>
                <div className="p-2 bg-amber-100 border border-amber-300 rounded">
                  <span className="text-amber-900 font-bold block">Vendor B (ABC Tech) ✓</span>
                  <span className="text-emerald-700 font-bold">Score: 95.2/100 (10d SLA, 3yr)</span>
                </div>
                <div className="p-2 bg-rose-50 border border-rose-200 rounded">
                  <span className="text-rose-700 block">Vendor C (CyberDist) ⚠️</span>
                  <span className="text-rose-600">19% Price Anomaly Flag</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section: Problem vs Solution */}
      <section id="solution" className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-200">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900">
            Why Enterprise Procurement is Broken — And How MiraiProcure Fixes It
          </h2>
          <p className="mt-3 text-slate-600 text-sm">
            Traditional ERPs are passive databases. MiraiProcure is an active AI procurement engine.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Legacy ERP Problem */}
          <div className="bg-white border border-rose-200 p-6 rounded-2xl space-y-4 shadow-xs">
            <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
              <Lock className="h-5 w-5" />
              <span>Legacy Procurement ERPs</span>
            </div>
            <ul className="space-y-3 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">✕</span>
                <span>Manual quotation extraction from unstructured PDFs and emails.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">✕</span>
                <span>Naïve unit price comparisons ignoring shipping, taxes, and warranty costs.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">✕</span>
                <span>Blind supplier selection leading to delivery delays and rogue pricing.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">✕</span>
                <span>Disconnected inventory forecasting leading to sudden stockouts.</span>
              </li>
            </ul>
          </div>

          {/* MiraiProcure Solution */}
          <div className="bg-white border border-amber-300 p-6 rounded-2xl space-y-4 relative overflow-hidden shadow-xs">
            <div className="absolute top-0 right-0 p-3 bg-amber-100 border-bl border-amber-300 text-amber-900 text-[10px] font-mono font-bold">
              MIRAI AI POWERED
            </div>
            <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
              <Zap className="h-5 w-5 text-amber-600" />
              <span>MiraiProcure (未来プロキュア)</span>
            </div>
            <ul className="space-y-3 text-xs text-slate-800">
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">✓</span>
                <span>Instant AI quote extraction &amp; Total Landed Cost calculation.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">✓</span>
                <span>Multi-factor weighted vendor scoring (Price, SLA, Quality, Risk, Sustainability).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">✓</span>
                <span>Real-time Risk Radar &amp; price anomaly detection against market benchmarks.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">✓</span>
                <span>Human-in-the-loop governance for all high-value financial commitments.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Quote Intelligence Feature Highlight */}
      <section id="quote-intelligence" className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-200">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 text-xs px-3 py-1 rounded-full font-mono border border-amber-300 font-bold">
              <BrainCircuit className="h-3.5 w-3.5 text-amber-600" />
              <span>Quote Intelligence Center</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 leading-tight">
              Never compare unit price alone. Evaluate Total Landed Cost.
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              MiraiProcure automatically parses quotation documents, calculates freight, taxes, discounts, warranty value, and computes a multi-factor score out of 100 with clear explainable trade-offs.
            </p>
            <div className="pt-2">
              <Link
                href="/quote-intelligence"
                className="inline-flex items-center gap-2 text-amber-700 font-bold text-xs hover:underline"
              >
                <span>Explore Quote Intelligence Engine</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-slate-900">Vendor Recommendation Matrix</span>
              <span className="text-[10px] font-mono text-amber-700 font-bold">RFQ-2026-0500</span>
            </div>
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">Vendor B: ABC Technologies</div>
                  <div className="text-[10px] text-slate-600 font-sans">10-day SLA • 3-yr Warranty • Low Risk</div>
                </div>
                <div className="text-right">
                  <div className="text-emerald-700 font-extrabold text-sm">95.2 / 100</div>
                  <div className="text-[9px] text-amber-800 font-bold">RECOMMENDED</div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                <div>
                  <div className="font-medium text-slate-800">Vendor A: TechWorld Solutions</div>
                  <div className="text-[10px] text-slate-500 font-sans">20-day SLA • 1-yr Warranty</div>
                </div>
                <div className="text-right">
                  <div className="text-slate-800 font-bold text-sm">76.1 / 100</div>
                  <div className="text-[9px] text-slate-500">Rank #2</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-24 px-6 max-w-7xl mx-auto text-center border-t border-slate-200 relative">
        <div className="bg-white border border-slate-200 p-12 rounded-3xl space-y-6 shadow-sm">
          <h2 className="text-3xl font-bold text-slate-900">
            Ready to experience AI-powered procurement?
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Launch the interactive hackathon command center or explore Mirai AI assistant right now.
          </p>
          <div className="pt-4 flex justify-center gap-4">
            <Link
              href="/command-center"
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm px-8 py-3.5 rounded-2xl shadow-xs transition-all"
            >
              Launch Command Center
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
