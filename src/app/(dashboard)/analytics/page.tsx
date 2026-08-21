'use client';

import React from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { BarChart3, TrendingUp, DollarSign, Award, ShieldCheck } from 'lucide-react';
import { formatCurrency } from '@/lib/utils/formatters';

const monthlySpendData = [
  { month: 'Jan', spend: 18000000, savings: 1200000 },
  { month: 'Feb', spend: 22000000, savings: 1800000 },
  { month: 'Mar', spend: 19500000, savings: 1400000 },
  { month: 'Apr', spend: 28000000, savings: 2400000 },
  { month: 'May', spend: 24000000, savings: 2100000 },
  { month: 'Jun', spend: 31000000, savings: 3200000 },
  { month: 'Jul', spend: 27500000, savings: 2600000 },
  { month: 'Aug', spend: 26250000, savings: 3000000 },
];

const categoryData = [
  { name: 'IT Hardware & Laptops', value: 45, color: '#38bdf8' },
  { name: 'Data Center & Racks', value: 25, color: '#06b6d4' },
  { name: 'Networking & Fiber', value: 15, color: '#8b5cf6' },
  { name: 'Office Equipment', value: 15, color: '#10b981' },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase bg-cyan-950 text-cyan-400 border border-cyan-500/40 px-2 py-0.5 rounded">
              ANALYTICS & BI
            </span>
            <span className="text-xs text-slate-400 font-mono">Executive Spend Intelligence</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-100 mt-1">
            Procurement Analytics (Executive BI)
          </h1>
          <p className="text-xs text-slate-400">
            Real-time analytics for spend trends, cost savings, supplier SLAs, category allocations, and AI automation rates.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-1 shadow-lg">
          <span className="text-[10px] font-mono text-slate-400 uppercase">YTD Spend</span>
          <div className="text-lg font-extrabold font-mono text-slate-100">₹19.62 Crores</div>
          <span className="text-[10px] text-emerald-400 font-mono">↑ 12% vs last quarter</span>
        </div>

        <div className="bg-slate-900 border border-cyan-500/30 p-4 rounded-2xl space-y-1 shadow-lg">
          <span className="text-[10px] font-mono text-cyan-400 uppercase">Total Realized Savings</span>
          <div className="text-lg font-extrabold font-mono text-emerald-400">₹1.77 Crores</div>
          <span className="text-[10px] text-cyan-300 font-mono">9.0% average savings rate</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-1 shadow-lg">
          <span className="text-[10px] font-mono text-slate-400 uppercase">Average Cycle Time</span>
          <div className="text-lg font-extrabold font-mono text-slate-100">4.2 Days</div>
          <span className="text-[10px] text-emerald-400 font-mono">⚡ 65% faster via AI</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-1 shadow-lg">
          <span className="text-[10px] font-mono text-slate-400 uppercase">AI Automation Rate</span>
          <div className="text-lg font-extrabold font-mono text-cyan-300">92.4%</div>
          <span className="text-[10px] text-slate-400 font-mono">Governed execution</span>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Spend & Savings Trend Chart */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 shadow-xl">
          <h3 className="text-xs font-extrabold text-slate-200 uppercase tracking-wider font-mono">
            Monthly Spend & Cost Savings Trend (₹)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlySpendData}>
                <defs>
                  <linearGradient id="spendGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="savingsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={10} />
                <YAxis stroke="#64748b" fontSize={10} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '11px' }}
                />
                <Area type="monotone" dataKey="spend" stroke="#38bdf8" fillOpacity={1} fill="url(#spendGradient)" name="Spend" />
                <Area type="monotone" dataKey="savings" stroke="#10b981" fillOpacity={1} fill="url(#savingsGradient)" name="Savings" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Share Donut */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 shadow-xl">
          <h3 className="text-xs font-extrabold text-slate-200 uppercase tracking-wider font-mono">
            Procurement Category Allocation (%)
          </h3>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '11px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
