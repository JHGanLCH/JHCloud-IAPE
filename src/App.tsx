/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Settings, 
  Search, 
  ChevronRight, 
  Box, 
  Layers, 
  Cpu, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  ArrowLeft,
  Filter,
  MoreVertical,
  Calendar,
  ChevronDown,
  ChevronUp,
  User,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  ShieldAlert,
  Zap,
  ClipboardCheck,
  FileCheck,
  History,
  ShieldCheck,
  AlertTriangle,
  FileText,
  Lightbulb,
  TrendingDown,
  Minus,
  DollarSign,
  Users,
  Truck,
  Download,
  X,
  List,
  GitBranch,
  ClipboardList,
  Send,
  Sparkles,
  RefreshCw,
  PlusCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  BarChart,
  Bar,
  Cell,
  PieChart as RePieChart,
  Pie
} from 'recharts';
import { 
  MachineTool, 
  ProductionStatus, 
  SubAssembly, 
  Part, 
  Operation, 
  KittingStatus, 
  MissingItem, 
  DashboardStats,
  QualityStatus,
  QualityIssue,
  ProductionRecord,
  Certificate,
  QualityStats,
  QualityDetail,
  PersonnelPerformanceStats,
  ProductionAnalysisStats,
  EquipmentStats,
  MaterialStats,
  ProcurementStats,
  DrillDownData,
  AIInsight
} from './types';
import { mockMachineTools, mockDashboardStats } from './mockData';
import { generateComprehensiveAIInsight } from './services/geminiService';

// --- Components ---

const AIInsightsDashboard = ({ insights, isGenerating }: { insights: AIInsight[], isGenerating?: boolean }) => {
  const [period, setPeriod] = useState<AIInsight['period']>('DAILY');

  // Find the most recent insight for the selected period
  const insight = [...insights].reverse().find(i => i.period === period);

  if (isGenerating && !insight) {
    return (
      <div className="flex flex-col items-center justify-center py-32 bg-white rounded-3xl border border-dashed border-indigo-200 shadow-sm">
        <div className="relative w-24 h-24 mb-8">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-4 border-indigo-100 border-t-indigo-600"
          />
          <div className="absolute inset-0 flex items-center justify-center text-indigo-600">
            <Zap size={32} className="animate-pulse" />
          </div>
        </div>
        <h3 className="text-2xl font-black text-gray-900 mb-3 tracking-tight">AI 正在深度分析全链路数据...</h3>
        <p className="text-gray-500 max-w-md text-center leading-relaxed">
          我们正在整合计划、生产、采购、质量、物料、设备及人员的全量实时数据，为您生成全景经营洞察报告。
        </p>
        <div className="mt-8 flex gap-2">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              className="w-2 h-2 bg-indigo-600 rounded-full"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12 relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-200">
            <Zap size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">全景生产洞察</h2>
            <p className="text-sm text-indigo-600 font-bold flex items-center gap-2">
              <Sparkles size={14} />
              AI 驱动的全链路生产经营深度分析
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 bg-gray-100 p-1.5 rounded-2xl border border-gray-200">
          {(['DAILY', 'WEEKLY', 'MONTHLY', 'QUARTERLY', 'YEARLY'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-6 py-2 rounded-xl text-sm font-black transition-all duration-300 ${
                period === p 
                  ? 'bg-white text-indigo-600 shadow-lg scale-105' 
                  : 'text-gray-500 hover:text-indigo-600 hover:bg-white/50'
              }`}
            >
              {p === 'DAILY' ? '每日洞察' : p === 'WEEKLY' ? '每周洞察' : p === 'MONTHLY' ? '月度洞察' : p === 'QUARTERLY' ? '季度洞察' : '年度洞察'}
            </button>
          ))}
        </div>
      </div>

      {/* Panoramic Content */}
      <div className="space-y-10">
        {insight ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
          >
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Main Insight Card */}
              <div className="lg:col-span-3 bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 via-blue-500 to-emerald-500" />
                <div className="p-8 flex-1 space-y-8">
                  {/* Summary */}
                  <div className="bg-indigo-50/30 p-6 rounded-2xl border border-indigo-100">
                    <div className="flex items-center gap-2 mb-3 text-indigo-600">
                      <FileText size={18} />
                      <span className="text-sm font-bold uppercase tracking-wider">
                        {period === 'DAILY' ? '当日生产情况' : 
                         period === 'WEEKLY' ? '本周任务和完成情况' : 
                         '关键经营指标、交付与重点任务报告'}
                      </span>
                    </div>
                    <p className="text-base text-gray-800 leading-relaxed font-medium">
                      {insight.summary}
                    </p>
                  </div>

                  {/* Metrics Grid */}
                  <div>
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Activity size={14} />
                      关键经营指标
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {insight.metrics.map((m, idx) => (
                        <div key={idx} className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all group hover:-translate-y-1">
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 group-hover:text-indigo-500 transition-colors">{m.label}</p>
                          <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-black text-gray-900">{m.value}</span>
                            <div className={`flex items-center gap-0.5 text-xs font-bold ${
                              m.trend === 'UP' ? 'text-emerald-600' : m.trend === 'DOWN' ? 'text-rose-600' : 'text-amber-600'
                            }`}>
                              {m.trend === 'UP' ? <TrendingUp size={16} /> : m.trend === 'DOWN' ? <TrendingDown size={16} /> : <Minus size={16} />}
                            </div>
                          </div>
                          {m.description && <p className="text-xs text-gray-500 mt-3 leading-relaxed">{m.description}</p>}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Suggestions */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-amber-600">
                      <Lightbulb size={20} />
                      <span className="text-sm font-bold uppercase tracking-wider">
                        {period === 'DAILY' || period === 'WEEKLY' ? '预警与建议' : '进一步预警与建议'}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {insight.suggestions.map((s, idx) => (
                        <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-amber-50/30 border border-amber-100/50 text-sm text-gray-700 hover:bg-amber-50 transition-colors">
                          <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shrink-0 mt-0.5 shadow-sm">
                            <span className="text-xs font-bold">{idx + 1}</span>
                          </div>
                          <p className="leading-relaxed font-medium">{s}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Alerts & Risks */}
              <div className="space-y-6">
                <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm h-full flex flex-col">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2 text-rose-600">
                      <AlertTriangle size={24} />
                      <h4 className="font-bold text-gray-900 text-lg">
                        {period === 'DAILY' || period === 'WEEKLY' ? '生产相关异常发生和处理情况' : '重大质量问题与资源配套协调'}
                      </h4>
                    </div>
                  </div>
                  
                  <div className="space-y-4 flex-1">
                    {insight.alerts.map((a, idx) => (
                      <div key={idx} className={`p-5 rounded-2xl text-sm leading-relaxed relative overflow-hidden border ${
                        a.type === 'CRITICAL' ? 'bg-rose-50 text-rose-700 border-rose-100' :
                        a.type === 'WARNING' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                        'bg-blue-50 text-blue-700 border-blue-100'
                      }`}>
                        <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                          a.type === 'CRITICAL' ? 'bg-rose-500' : a.type === 'WARNING' ? 'bg-amber-500' : 'bg-blue-500'
                        }`} />
                        <p className="font-bold mb-1">{a.type === 'CRITICAL' ? '严重预警' : a.type === 'WARNING' ? '风险提示' : '运营提示'}</p>
                        {a.message}
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-8 border-t border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">AI 综合风险指数</span>
                      <span className="text-2xl font-black text-rose-600">78</span>
                    </div>
                    <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500 w-[78%]" />
                    </div>
                    <p className="text-[10px] text-gray-400 mt-3 text-center">基于全量生产数据深度分析</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-dashed border-gray-300">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-6">
              <Zap size={40} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">暂无全景洞察数据</h3>
            <p className="text-gray-500">AI 正在分析全链路生产经营数据...</p>
          </div>
        )}
      </div>
    </div>
  );
};

const DrillDownModal = ({ 
  isOpen, 
  onClose, 
  stack,
  onBack,
  onRowClick,
  onJumpToTab
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  stack: DrillDownData[];
  onBack: () => void;
  onRowClick: (row: any) => void;
  onJumpToTab: (index: number) => void;
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Reset search when current level changes
  useEffect(() => {
    setSearchQuery('');
  }, [stack.length]);

  if (!isOpen) return null;

  const current = stack[stack.length - 1];
  
  // If no current data, show a loading or empty state instead of returning null
  if (!current) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center gap-3 text-gray-500">
            <Clock className="animate-spin" size={24} />
            <p className="font-bold">正在加载明细数据...</p>
          </div>
        </div>
      </div>
    );
  }

  const filteredData = useMemo(() => {
    if (!current.data) return [];
    if (!searchQuery) return current.data;
    const query = searchQuery.toLowerCase();
    return current.data.filter(row => 
      Object.values(row).some(val => 
        String(val).toLowerCase().includes(query)
      )
    );
  }, [current.data, searchQuery]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Modal Header */}
        <div className="px-6 pt-6 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 text-white rounded-xl">
                <List size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{current.title || '指标明细分析'}</h3>
                <p className="text-xs text-gray-500 mt-0.5">多维数据钻取与实时查询</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>

          {/* Tab Navigation for Stack */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            {stack.map((item, idx) => (
              <button
                key={idx}
                onClick={() => onJumpToTab(idx)}
                className={`px-4 py-2 text-sm font-bold whitespace-nowrap transition-all border-b-2 flex items-center gap-2 ${
                  idx === stack.length - 1 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent text-gray-400 hover:text-gray-600'
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                  idx === stack.length - 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {idx + 1}
                </span>
                {item.title}
              </button>
            ))}
          </div>
        </div>
        
        {/* Search and Filters Bar */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-4 bg-white">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="输入关键词进行实时查询..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={14} />
              </button>
            )}
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all">
            <Filter size={16} />
            高级筛选
          </button>
        </div>

        <div className="flex-1 overflow-auto p-6 bg-gray-50/30">
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50">
                  {current.columns.map((col) => (
                    <th key={col.key} className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                      {col.label}
                    </th>
                  ))}
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 text-right">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredData.length > 0 ? (
                  filteredData.map((row, i) => (
                    <tr 
                      key={i} 
                      className="hover:bg-blue-50/30 transition-colors cursor-pointer group"
                      onClick={() => onRowClick(row)}
                    >
                      {current.columns.map((col) => (
                        <td key={col.key} className="px-6 py-4 text-sm text-gray-700">
                          {row[col.key]}
                        </td>
                      ))}
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                          <ChevronRight size={16} className="text-blue-600" />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={current.columns.length + 1} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center text-gray-400">
                        <Search size={40} className="mb-2 opacity-20" />
                        <p className="text-sm">未找到匹配 "{searchQuery}" 的数据</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="p-6 border-t border-gray-100 bg-white flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-500 font-medium">
              显示 {filteredData.length} 条记录 (共 {current.data.length} 条)
            </span>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={onClose}
              className="px-8 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition-all shadow-lg shadow-gray-200"
            >
              关闭明细
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ManagementDashboard = ({ stats, onDrillDown }: { stats: DashboardStats, onDrillDown: (type: string, title: string) => void }) => {
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

  return (
    <div className="space-y-6">
      {/* Executive Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div 
          className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm cursor-pointer hover:border-emerald-500 transition-all"
          onClick={() => onDrillDown('ORDERS_COMPLETED', '按期交付明细')}
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <TrendingUp size={64} />
          </div>
          <p className="text-sm text-gray-500 font-medium">按期交付率</p>
          <h3 className="text-3xl font-bold mt-1 text-emerald-600">{stats.onTimeDeliveryRate}%</h3>
          <div className="mt-2 flex items-center gap-1 text-[10px] text-emerald-600 font-bold">
            <TrendingUp size={12} />
            <span>较上月提升 2.4%</span>
          </div>
        </div>
        <div 
          className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden cursor-pointer hover:border-blue-500 transition-all"
          onClick={() => onDrillDown('EQUIPMENT_OPERATION', '产能利用率明细')}
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Activity size={64} />
          </div>
          <p className="text-sm text-gray-500 font-medium">产能利用率</p>
          <h3 className="text-3xl font-bold mt-1 text-blue-600">{stats.capacityUtilization}%</h3>
          <div className="mt-2 flex items-center gap-1 text-[10px] text-blue-600 font-bold">
            <Zap size={12} />
            <span>高负荷运行中</span>
          </div>
        </div>
        <div 
          className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden cursor-pointer hover:border-rose-500 transition-all"
          onClick={() => onDrillDown('ORDERS_DELAYED', '风险订单明细')}
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <ShieldAlert size={64} />
          </div>
          <p className="text-sm text-gray-500 font-medium">风险订单</p>
          <h3 className="text-3xl font-bold mt-1 text-rose-600">{stats.delayedOrders}</h3>
          <div className="mt-2 flex items-center gap-1 text-[10px] text-rose-600 font-bold">
            <AlertCircle size={12} />
            <span>需要介入调度</span>
          </div>
        </div>
        <div 
          className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden cursor-pointer hover:border-indigo-500 transition-all"
          onClick={() => onDrillDown('MATERIAL_TOTAL', '成本绩效明细')}
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <DollarSign size={64} />
          </div>
          <p className="text-sm text-gray-500 font-medium">成本绩效 (CPI)</p>
          <h3 className="text-3xl font-bold mt-1 text-indigo-600">0.94</h3>
          <div className="mt-2 flex items-center gap-1 text-[10px] text-rose-600 font-bold">
            <AlertTriangle size={12} />
            <span>成本超支预警</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Production Trend */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h4 className="font-bold text-gray-800 flex items-center gap-2">
              <TrendingUp size={18} className="text-blue-600" />
              月度产出趋势 (计划 vs 实际)
            </h4>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.trend}>
                <defs>
                  <linearGradient id="colorPlanned" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9CA3AF'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9CA3AF'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="planned" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#colorPlanned)" name="计划产出" />
                <Area type="monotone" dataKey="actual" stroke="#10B981" strokeWidth={2} fillOpacity={0} name="实际产出" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottleneck Analysis */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h4 className="font-bold text-gray-800 flex items-center gap-2">
              <ShieldAlert size={18} className="text-rose-600" />
              生产瓶颈分析 (延期频次)
            </h4>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.bottlenecks} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F3F4F6" />
                <XAxis type="number" hide />
                <YAxis dataKey="category" type="category" axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#4B5563'}} width={100} />
                <Tooltip 
                  cursor={{fill: '#F9FAFB'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="delayCount" radius={[0, 4, 4, 0]} name="延期次数">
                  {stats.bottlenecks.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.delayCount > 4 ? '#EF4444' : '#F59E0B'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Production Cycle Analysis Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cycle Comparison Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h4 className="font-bold text-gray-800 flex items-center gap-2">
              <Clock size={18} className="text-indigo-600" />
              生产周期对比 (计划 vs 实际)
            </h4>
            <div className="flex gap-4 text-[10px] font-bold">
              <div className="flex items-center gap-1"><div className="w-2 h-2 bg-indigo-500 rounded-full"></div> 计划周期</div>
              <div className="flex items-center gap-1"><div className="w-2 h-2 bg-rose-400 rounded-full"></div> 实际周期</div>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.cycleAnalysis} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="machineType" axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#6B7280'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#6B7280'}} label={{ value: '天数', angle: -90, position: 'insideLeft', fontSize: 10 }} />
                <Tooltip 
                  cursor={{fill: '#F9FAFB'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="plannedCycle" fill="#6366F1" radius={[4, 4, 0, 0]} name="计划周期" barSize={20} />
                <Bar dataKey="actualCycle" fill="#FB7185" radius={[4, 4, 0, 0]} name="实际周期" barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Influencing Factors */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-6">
            <PieChart size={18} className="text-amber-600" />
            周期影响因素洞察
          </h4>
          <div className="space-y-5">
            {stats.factorInsights.map((insight, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-gray-700">{insight.factor}</span>
                  <span className="text-[10px] font-mono font-bold text-amber-600">{insight.impactScore}% 影响度</span>
                </div>
                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${insight.impactScore}%` }}
                    className="h-full bg-amber-500"
                  />
                </div>
                <p className="text-[10px] text-gray-400 leading-relaxed">{insight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Risk Warning Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 bg-rose-50/30">
          <h4 className="font-bold text-rose-800 flex items-center gap-2">
            <AlertCircle size={18} />
            高风险待调度项目 (进度滞后于时间)
          </h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">项目号</th>
                <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">产品型号</th>
                <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">当前进度</th>
                <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">剩余天数</th>
                <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">核心瓶颈</th>
                <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockMachineTools.filter(t => t.status === ProductionStatus.DELAYED).map(tool => (
                <tr key={tool.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs font-bold text-blue-600">{tool.projectNumber}</td>
                  <td className="px-6 py-4 text-sm font-medium">{tool.model}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24">
                        <ProgressBar progress={tool.overallProgress} />
                      </div>
                      <span className="text-xs font-bold text-rose-600">{tool.overallProgress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">12天</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-rose-100 text-rose-700 rounded text-[10px] font-bold">数控系统缺件</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-blue-600 text-xs font-bold hover:underline">立即调度</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const QualityDashboard = ({ quality, onDrillDown }: { quality: QualityStats, onDrillDown: (type: string, title: string) => void }) => {
  const COLORS = ['#10B981', '#F59E0B', '#EF4444', '#3B82F6', '#8B5CF6'];
  const [activeSubTab, setActiveSubTab] = useState<'OVERVIEW' | 'PROCESS' | 'PERSONNEL' | 'CAUSES' | 'TRENDS' | 'SUPPLIERS' | 'COST'>('OVERVIEW');

  return (
    <div className="space-y-6">
      {/* Quality Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div 
          className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm cursor-pointer hover:border-emerald-500 transition-all"
          onClick={() => onDrillDown('QUALITY_PASS_RATE', '综合合格率明细')}
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <ShieldCheck size={64} />
          </div>
          <p className="text-sm text-gray-500 font-medium">综合合格率</p>
          <h3 className="text-3xl font-bold mt-1 text-emerald-600">{quality.passRate}%</h3>
          <div className="mt-2 flex items-center gap-1 text-[10px] text-emerald-600 font-bold">
            <TrendingUp size={12} />
            <span>优于行业平均水平</span>
          </div>
        </div>
        <div 
          className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm cursor-pointer hover:border-rose-500 transition-all"
          onClick={() => onDrillDown('QUALITY_UNQUALIFIED', '不合格项明细')}
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <AlertTriangle size={64} />
          </div>
          <p className="text-sm text-gray-500 font-medium">当前不合格项</p>
          <h3 className="text-3xl font-bold mt-1 text-rose-600">{quality.unqualifiedCount}</h3>
          <div className="mt-2 flex items-center gap-1 text-[10px] text-rose-600 font-bold">
            <AlertCircle size={12} />
            <span>需紧急处理 3 项</span>
          </div>
        </div>
        <div 
          className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm cursor-pointer hover:border-amber-500 transition-all"
          onClick={() => onDrillDown('QUALITY_REWORK', '待返修明细')}
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <History size={64} />
          </div>
          <p className="text-sm text-gray-500 font-medium">待返修/返工</p>
          <h3 className="text-3xl font-bold mt-1 text-amber-600">{quality.reworkCount}</h3>
          <div className="mt-2 flex items-center gap-1 text-[10px] text-amber-600 font-bold">
            <Clock size={12} />
            <span>平均返修周期 1.5天</span>
          </div>
        </div>
        <div 
          className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm cursor-pointer hover:border-blue-500 transition-all"
          onClick={() => onDrillDown('QUALITY_TASKS', '检验任务明细')}
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <ClipboardCheck size={64} />
          </div>
          <p className="text-sm text-gray-500 font-medium">检验任务完成率</p>
          <h3 className="text-3xl font-bold mt-1 text-blue-600">
            {Math.round((quality.inspectionTaskStats.completed / quality.inspectionTaskStats.total) * 100)}%
          </h3>
          <div className="mt-2 flex items-center gap-1 text-[10px] text-blue-600 font-bold">
            <CheckCircle2 size={12} />
            <span>已完成 {quality.inspectionTaskStats.completed}/{quality.inspectionTaskStats.total}</span>
          </div>
        </div>
      </div>

      {/* Sub-navigation for Quality Analysis */}
      <div className="flex items-center gap-2 p-1 bg-gray-100/50 rounded-xl w-fit">
        {[
          { id: 'OVERVIEW', label: '质量概览', icon: PieChart },
          { id: 'PROCESS', label: '过程质量', icon: Activity },
          { id: 'PERSONNEL', label: '人员表现', icon: Users },
          { id: 'CAUSES', label: '原因分析', icon: AlertTriangle },
          { id: 'TRENDS', label: '趋势分析', icon: TrendingUp },
          { id: 'SUPPLIERS', label: '供应商质量', icon: Truck },
          { id: 'COST', label: '质量成本', icon: DollarSign },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeSubTab === tab.id 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <tab.icon size={14} />
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeSubTab === 'OVERVIEW' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Defect Distribution */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-6">
                  <PieChart size={18} className="text-blue-600" />
                  质量缺陷分布
                </h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RePieChart>
                      <Pie
                        data={quality.defectDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="count"
                        nameKey="category"
                      >
                        {quality.defectDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      />
                    </RePieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {quality.defectDistribution.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                      <span className="text-xs text-gray-600">{item.category}</span>
                      <span className="text-xs font-bold text-gray-800 ml-auto">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Quality Issues */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-6">
                  <AlertCircle size={18} className="text-rose-600" />
                  最新质量预警
                </h4>
                <div className="space-y-4">
                  {quality.recentIssues.map((issue) => (
                    <div key={issue.id} className="p-4 rounded-xl border border-gray-100 hover:border-rose-200 transition-colors bg-gray-50/30">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="text-sm font-bold text-gray-800">{issue.title}</h5>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          issue.severity === 'CRITICAL' ? 'bg-rose-100 text-rose-700' :
                          issue.severity === 'HIGH' ? 'bg-orange-100 text-orange-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {issue.severity}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mb-3 line-clamp-2">{issue.description}</p>
                      <div className="flex justify-between items-center text-[10px] text-gray-400 font-medium">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1"><User size={10} /> {issue.reporter}</span>
                          <span className="flex items-center gap-1"><Calendar size={10} /> {issue.date}</span>
                        </div>
                        <span className={`font-bold ${
                          issue.status === 'OPEN' ? 'text-rose-500' :
                          issue.status === 'IN_PROGRESS' ? 'text-amber-500' :
                          'text-emerald-500'
                        }`}>
                          {issue.status === 'OPEN' ? '待处理' : issue.status === 'IN_PROGRESS' ? '处理中' : '已解决'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quality Details - Product & Component Pass Rate Details */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-6">
                <ClipboardCheck size={18} className="text-emerald-600" />
                产品与零部件质量明细
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-gray-100">
                      <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-wider">名称/类型</th>
                      <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-wider">合格率</th>
                      <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-wider">检验总数</th>
                      <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-wider">合格/不合格/返修</th>
                      <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {quality.qualityDetails.map((detail) => (
                      <QualityDetailRow key={detail.id} detail={detail} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {activeSubTab === 'PROCESS' && (
          <motion.div
            key="process"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Inspection Task Completion */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-6">
                  <ClipboardCheck size={18} className="text-blue-600" />
                  工序检验任务完成情况
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-blue-50 rounded-xl">
                    <div>
                      <p className="text-xs text-gray-500 font-medium">总检验任务</p>
                      <p className="text-2xl font-bold text-blue-600">{quality.inspectionTaskStats.total}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 font-medium">逾期任务</p>
                      <p className="text-2xl font-bold text-rose-600">{quality.inspectionTaskStats.overdue}</p>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="text-left text-gray-400 border-b border-gray-50">
                          <th className="pb-2 font-bold">检验员</th>
                          <th className="pb-2 font-bold">已完成</th>
                          <th className="pb-2 font-bold">逾期</th>
                          <th className="pb-2 font-bold text-right">完成率</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {quality.inspectionTaskStats.inspectors.map((inspector, i) => (
                          <tr key={i} className="hover:bg-gray-50/50">
                            <td className="py-3 font-medium text-gray-800">{inspector.name}</td>
                            <td className="py-3 text-emerald-600 font-bold">{inspector.completed}</td>
                            <td className="py-3 text-rose-600 font-bold">{inspector.overdue}</td>
                            <td className="py-3 text-right font-mono font-bold">
                              {Math.round((inspector.completed / (inspector.completed + inspector.overdue)) * 100)}%
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Inspection Time Analysis */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-6">
                  <Clock size={18} className="text-indigo-600" />
                  检验用时分析 (分钟)
                </h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={quality.inspectionTimeAnalysis} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F3F4F6" />
                      <XAxis type="number" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                      <YAxis dataKey="taskName" type="category" axisLine={false} tickLine={false} tick={{fontSize: 10}} width={100} />
                      <Tooltip 
                        cursor={{fill: '#F9FAFB'}}
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      />
                      <Bar dataKey="avgTime" fill="#6366F1" radius={[0, 4, 4, 0]} name="平均用时" barSize={12} />
                      <Bar dataKey="plannedTime" fill="#E0E7FF" radius={[0, 4, 4, 0]} name="计划用时" barSize={12} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Process Pass Rate Analysis */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-6">
                <Activity size={18} className="text-emerald-600" />
                关键工序合格率分析
              </h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={quality.processPassRate}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                    <XAxis dataKey="processName" axisLine={false} tickLine={false} tick={{fontSize: 11}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 11}} domain={[80, 100]} />
                    <Tooltip 
                      cursor={{fill: '#F9FAFB'}}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    />
                    <Bar dataKey="passRate" radius={[4, 4, 0, 0]} name="合格率 (%)">
                      {quality.processPassRate.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.passRate < 95 ? '#EF4444' : '#10B981'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        )}

        {activeSubTab === 'PERSONNEL' && (
          <motion.div
            key="personnel"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Team Pass Rate */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-6">
                  <Users size={18} className="text-blue-600" />
                  班组交检合格率分析
                </h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={quality.teamPassRate} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F3F4F6" />
                      <XAxis type="number" domain={[80, 100]} axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                      <YAxis dataKey="teamName" type="category" axisLine={false} tickLine={false} tick={{fontSize: 10}} width={80} />
                      <Tooltip 
                        cursor={{fill: '#F9FAFB'}}
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      />
                      <Bar dataKey="passRate" fill="#3B82F6" radius={[0, 4, 4, 0]} name="合格率 (%)" barSize={20} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Worker Pass Rate */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-6">
                  <User size={18} className="text-emerald-600" />
                  工人交检合格率分析 (Top/Bottom)
                </h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={quality.workerPassRate} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F3F4F6" />
                      <XAxis type="number" domain={[80, 100]} axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                      <YAxis dataKey="workerName" type="category" axisLine={false} tickLine={false} tick={{fontSize: 10}} width={80} />
                      <Tooltip 
                        cursor={{fill: '#F9FAFB'}}
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      />
                      <Bar dataKey="passRate" radius={[0, 4, 4, 0]} name="合格率 (%)" barSize={20}>
                        {quality.workerPassRate.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.passRate < 95 ? '#F59E0B' : '#10B981'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeSubTab === 'CAUSES' && (
          <motion.div
            key="causes"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Defect Cause Analysis Chart */}
              <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-6">
                  <AlertTriangle size={18} className="text-rose-600" />
                  不合格原因根因分析
                </h4>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={quality.defectCauseAnalysis} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                      <XAxis dataKey="cause" axisLine={false} tickLine={false} tick={{fontSize: 11}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fontSize: 11}} />
                      <Tooltip 
                        cursor={{fill: '#F9FAFB'}}
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      />
                      <Bar dataKey="count" fill="#EF4444" radius={[4, 4, 0, 0]} name="出现频次" barSize={40} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Cause Breakdown List */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-6">
                  <PieChart size={18} className="text-amber-600" />
                  原因占比洞察
                </h4>
                <div className="space-y-6">
                  {quality.defectCauseAnalysis.map((item, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-gray-700">{item.cause}</span>
                        <span className="text-[10px] font-mono font-bold text-rose-600">{item.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${item.percentage}%` }}
                          className="h-full bg-rose-500"
                        />
                      </div>
                      <p className="text-[10px] text-gray-400">共计 {item.count} 次记录，主要影响精加工阶段。</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeSubTab === 'TRENDS' && (
          <motion.div
            key="trends"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Pass Rate Trend */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-6">
                  <TrendingUp size={18} className="text-emerald-600" />
                  综合合格率月度趋势 (%)
                </h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={quality.qualityTrend}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 11}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fontSize: 11}} domain={[95, 100]} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      />
                      <Line type="monotone" dataKey="passRate" stroke="#10B981" strokeWidth={3} dot={{ r: 4, fill: '#10B981' }} name="合格率" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Defect Count Trend */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-6">
                  <BarChart3 size={18} className="text-rose-600" />
                  缺陷发现数量月度趋势
                </h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={quality.qualityTrend}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 11}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fontSize: 11}} />
                      <Tooltip 
                        cursor={{fill: '#F9FAFB'}}
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      />
                      <Bar dataKey="defectCount" fill="#EF4444" radius={[4, 4, 0, 0]} name="缺陷数量" barSize={30} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeSubTab === 'SUPPLIERS' && (
          <motion.div
            key="suppliers"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-6">
                <Truck size={18} className="text-blue-600" />
                关键供应商质量表现排名
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {quality.supplierQuality.map((supplier, idx) => (
                  <div key={idx} className="p-5 rounded-2xl border border-gray-100 bg-gray-50/30 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-bold text-gray-800">{supplier.supplierName}</h5>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          supplier.riskLevel === 'LOW' ? 'bg-emerald-100 text-emerald-700' :
                          supplier.riskLevel === 'MEDIUM' ? 'bg-amber-100 text-amber-700' :
                          'bg-rose-100 text-rose-700'
                        }`}>
                          {supplier.riskLevel} RISK
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-gray-400 font-bold uppercase">合格率</p>
                        <p className={`text-xl font-bold ${supplier.passRate >= 98 ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {supplier.passRate}%
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-[10px] text-gray-500 font-bold uppercase">主要缺陷类型</p>
                      <div className="flex flex-wrap gap-2">
                        {supplier.defectTypes.map((dt, i) => (
                          <span key={i} className="px-2 py-1 bg-white border border-gray-200 rounded text-[10px] text-gray-600">
                            {dt.type}: <span className="font-bold text-gray-800">{dt.count}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-gray-100">
                      <button className="w-full py-2 text-xs font-bold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        查看供应商质量报告
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeSubTab === 'COST' && (
          <motion.div
            key="cost"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Quality Cost Breakdown */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-6">
                  <DollarSign size={18} className="text-indigo-600" />
                  质量成本构成分析
                </h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RePieChart>
                      <Pie
                        data={quality.qualityCost}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="amount"
                        nameKey="category"
                      >
                        {quality.qualityCost.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={['#6366F1', '#3B82F6', '#F59E0B', '#EF4444'][index % 4]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: number) => `¥${value.toLocaleString()}`}
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      />
                    </RePieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {quality.qualityCost.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: ['#6366F1', '#3B82F6', '#F59E0B', '#EF4444'][index % 4] }}></div>
                      <span className="text-xs text-gray-600">{item.category}</span>
                      <span className="text-xs font-bold text-gray-800 ml-auto">¥{(item.amount / 10000).toFixed(1)}w</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cost Trends & Insights */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-6">
                  <Activity size={18} className="text-emerald-600" />
                  质量成本变动趋势
                </h4>
                <div className="space-y-5">
                  {quality.qualityCost.map((item, index) => (
                    <div key={index} className="p-4 rounded-xl border border-gray-100 bg-gray-50/30">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-bold text-gray-700">{item.category}</span>
                        <div className={`flex items-center gap-1 text-xs font-bold ${item.trend < 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {item.trend < 0 ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
                          {Math.abs(item.trend)}%
                        </div>
                      </div>
                      <div className="flex justify-between items-end">
                        <p className="text-xl font-bold text-gray-900">¥{item.amount.toLocaleString()}</p>
                        <p className="text-[10px] text-gray-400 font-medium">较上月变动</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface QualityDetailRowProps {
  detail: QualityDetail;
}

const QualityDetailRow: React.FC<QualityDetailRowProps> = ({ detail }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <tr className="group hover:bg-gray-50/50 transition-colors">
        <td className="py-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${
              detail.type === 'PRODUCT' ? 'bg-blue-50 text-blue-600' :
              detail.type === 'SUB_ASSEMBLY' ? 'bg-purple-50 text-purple-600' :
              'bg-amber-50 text-amber-600'
            }`}>
              {detail.type === 'PRODUCT' ? <Box size={16} /> : <Layers size={16} />}
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800">{detail.name}</p>
              <p className="text-[10px] text-gray-400 font-medium">
                {detail.type === 'PRODUCT' ? '整机产品' : detail.type === 'SUB_ASSEMBLY' ? '子系统/部装' : '零件'}
              </p>
            </div>
          </div>
        </td>
        <td className="py-4">
          <div className="flex items-center gap-2">
            <span className={`text-sm font-bold ${
              detail.passRate >= 98 ? 'text-emerald-600' :
              detail.passRate >= 95 ? 'text-amber-600' :
              'text-rose-600'
            }`}>
              {detail.passRate}%
            </span>
            <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${
                  detail.passRate >= 98 ? 'bg-emerald-500' :
                  detail.passRate >= 95 ? 'bg-amber-500' :
                  'bg-rose-500'
                }`}
                style={{ width: `${detail.passRate}%` }}
              />
            </div>
          </div>
        </td>
        <td className="py-4">
          <span className="text-sm font-mono text-gray-600">{detail.totalChecks}</span>
        </td>
        <td className="py-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-600">{detail.qualifiedCount}</span>
            <span className="text-gray-300">/</span>
            <span className="text-xs font-bold text-rose-600">{detail.unqualifiedCount}</span>
            <span className="text-gray-300">/</span>
            <span className="text-xs font-bold text-amber-600">{detail.reworkCount}</span>
          </div>
        </td>
        <td className="py-4 text-right">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
          >
            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </td>
      </tr>
      <AnimatePresence>
        {isExpanded && (
          <motion.tr
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gray-50/30"
          >
            <td colSpan={5} className="px-6 py-4">
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <History size={14} /> 生产履历明细
                </h5>
                <ProductionHistory history={detail.history} />
              </div>
            </td>
          </motion.tr>
        )}
      </AnimatePresence>
    </>
  );
};

const QualityBadge = ({ status }: { status?: QualityStatus }) => {
  if (!status) return null;
  const styles = {
    [QualityStatus.QUALIFIED]: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    [QualityStatus.UNQUALIFIED]: 'bg-rose-50 text-rose-700 border-rose-200',
    [QualityStatus.REWORK]: 'bg-amber-50 text-amber-700 border-amber-200',
    [QualityStatus.PENDING]: 'bg-blue-50 text-blue-700 border-blue-200',
  };

  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${styles[status]}`}>
      {status}
    </span>
  );
};

const ProductionHistory = ({ history }: { history?: ProductionRecord[] }) => {
  if (!history || history.length === 0) return (
    <div className="p-8 text-center text-gray-400">
      <History size={32} className="mx-auto mb-2 opacity-20" />
      <p className="text-xs">暂无生产履历数据</p>
    </div>
  );

  return (
    <div className="relative pl-8 space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
      {history.map((record, index) => (
        <div key={record.id} className="relative">
          <div className={`absolute -left-[25px] top-1 w-4 h-4 rounded-full border-2 border-white shadow-sm ${
            record.result === QualityStatus.QUALIFIED ? 'bg-emerald-500' :
            record.result === QualityStatus.UNQUALIFIED ? 'bg-rose-500' :
            'bg-amber-500'
          }`} />
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <h5 className="text-sm font-bold text-gray-800">{record.stepName}</h5>
              <QualityBadge status={record.result} />
            </div>
            <div className="grid grid-cols-2 gap-4 text-[10px] text-gray-500 mb-2">
              <div className="flex items-center gap-1"><User size={10} /> 操作人: {record.operator}</div>
              <div className="flex items-center gap-1"><Clock size={10} /> 时间: {record.startTime} {record.endTime ? `~ ${record.endTime}` : ''}</div>
            </div>
            {record.notes && (
              <p className="text-[10px] bg-gray-50 p-2 rounded text-gray-600 italic mb-3">备注: {record.notes}</p>
            )}

            {/* Inspection Details */}
            {record.inspections && record.inspections.length > 0 && (
              <div className="mt-3 border-t border-gray-50 pt-3">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-1">
                  <ClipboardCheck size={12} /> 检查要求与数据
                </p>
                <div className="space-y-2">
                  {record.inspections.map(ins => (
                    <div key={ins.id} className="flex flex-col gap-1 p-2 bg-gray-50/50 rounded-lg border border-gray-100">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-gray-700">{ins.name}</span>
                        <QualityBadge status={ins.result} />
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[10px]">
                        <div className="text-gray-500">要求: <span className="text-gray-700 font-mono">{ins.requirement}</span></div>
                        <div className="text-gray-500">实测: <span className={`font-mono font-bold ${ins.result === QualityStatus.UNQUALIFIED ? 'text-rose-600' : 'text-emerald-600'}`}>{ins.actualValue || '-'}</span></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Non-Conformance Report (NCR) */}
            {record.result === QualityStatus.UNQUALIFIED && record.ncr && (
              <div className="mt-3 border-t border-rose-100 pt-3">
                <div className="bg-rose-50 p-3 rounded-xl border border-rose-100">
                  <div className="flex items-center gap-2 mb-2 text-rose-700">
                    <AlertTriangle size={14} />
                    <span className="text-xs font-bold uppercase tracking-wider">不合格处理单 (NCR)</span>
                    <span className="text-[10px] font-mono ml-auto">编号: {record.ncr.id}</span>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <p className="text-[10px] font-bold text-rose-600">问题描述:</p>
                      <p className="text-xs text-gray-700">{record.ncr.issueDescription}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-rose-600">原因分析:</p>
                      <p className="text-xs text-gray-700">{record.ncr.causeAnalysis}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-2 border-t border-rose-100">
                      <div>
                        <p className="text-[10px] font-bold text-rose-600">处置方式:</p>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          record.ncr.disposition === 'REWORK' ? 'bg-amber-100 text-amber-700' :
                          record.ncr.disposition === 'SCRAP' ? 'bg-rose-100 text-rose-700' :
                          'bg-emerald-100 text-emerald-700'
                        }`}>
                          {record.ncr.disposition === 'REWORK' ? '返工/返修' :
                           record.ncr.disposition === 'SCRAP' ? '报废' : '让步接收'}
                        </span>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-rose-600">处理人:</p>
                        <p className="text-xs text-gray-700">{record.ncr.handler}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-rose-600">处置意见:</p>
                      <p className="text-xs text-gray-700 italic">{record.ncr.dispositionNotes}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

const CertificateView = ({ certificates }: { certificates?: Certificate[] }) => {
  if (!certificates || certificates.length === 0) return (
    <div className="p-8 text-center text-gray-400">
      <FileCheck size={32} className="mx-auto mb-2 opacity-20" />
      <p className="text-xs">暂无合格证数据</p>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {certificates.map(cert => (
        <div key={cert.id} className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
            <FileText size={24} />
          </div>
          <div className="flex-1 min-w-0">
            <h5 className="text-sm font-bold text-gray-800 truncate">{cert.name}</h5>
            <p className="text-[10px] text-gray-500">供应商: {cert.vendor}</p>
            <p className="text-[10px] text-gray-400">发证日期: {cert.issueDate}</p>
          </div>
          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
            <ChevronRight size={20} />
          </button>
        </div>
      ))}
    </div>
  );
};

const KittingBadge = ({ status }: { status?: KittingStatus }) => {
  if (!status) return null;
  const styles = {
    [KittingStatus.KITTED]: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    [KittingStatus.PARTIAL]: 'bg-amber-50 text-amber-700 border-amber-200',
    [KittingStatus.NOT_KITTED]: 'bg-rose-50 text-rose-700 border-rose-200',
  };

  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${styles[status]}`}>
      {status}
    </span>
  );
};

const MissingItemsList = ({ items }: { items?: MissingItem[] }) => {
  if (!items || items.length === 0) return null;
  return (
    <div className="mt-2 p-3 bg-rose-50/50 rounded-xl border border-rose-100">
      <p className="text-[10px] font-bold text-rose-600 uppercase tracking-wider mb-2 flex items-center gap-1">
        <AlertCircle size={12} /> 缺件清单
      </p>
      <div className="space-y-1">
        {items.map(item => (
          <div key={item.id} className="flex justify-between items-center text-xs">
            <span className="text-gray-600">{item.name}</span>
            <span className="font-mono text-rose-600 font-bold">
              缺 {item.requiredQuantity - item.availableQuantity} (需{item.requiredQuantity}/现{item.availableQuantity})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const StatusBadge = ({ status }: { status: ProductionStatus }) => {
  const styles = {
    [ProductionStatus.PENDING]: 'bg-gray-100 text-gray-600 border-gray-200',
    [ProductionStatus.IN_PROGRESS]: 'bg-blue-50 text-blue-600 border-blue-100',
    [ProductionStatus.COMPLETED]: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    [ProductionStatus.DELAYED]: 'bg-rose-50 text-rose-600 border-rose-100',
  };

  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${styles[status]}`}>
      {status}
    </span>
  );
};

const ProgressBar = ({ progress, height = 6, showLabel = false }: { progress: number, height?: number, showLabel?: boolean }) => {
  const color = progress === 100 ? 'bg-emerald-500' : progress > 80 ? 'bg-blue-500' : progress > 30 ? 'bg-amber-500' : 'bg-rose-500';
  
  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-[10px] text-gray-500 font-mono">{progress}%</span>
        </div>
      )}
      <div className="w-full bg-gray-100 rounded-full overflow-hidden" style={{ height }}>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full ${color}`}
        />
      </div>
    </div>
  );
};

const SubAssemblyRow: React.FC<{ sa: SubAssembly, level?: number }> = ({ sa, level = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(level === 0);
  const hasChildren = (sa.subAssemblies && sa.subAssemblies.length > 0) || (sa.parts && sa.parts.length > 0);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-4">
      <div 
        className={`p-5 flex flex-wrap items-center justify-between gap-4 transition-colors ${hasChildren ? 'cursor-pointer hover:bg-gray-50/80' : 'bg-gray-50/50'}`}
        onClick={() => hasChildren && setIsExpanded(!isExpanded)}
        style={{ paddingLeft: `${1.25 + level * 1.5}rem` }}
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-gray-400 shadow-sm">
            {level === 0 ? <Layers size={20} className="text-blue-600" /> : <Box size={18} />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h5 className="font-bold text-gray-900">{sa.name}</h5>
              {hasChildren && (
                <span className="text-gray-400">
                  {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </span>
              )}
            </div>
            <p className="text-[10px] text-gray-400 font-mono uppercase tracking-widest">ID: {sa.id} | 截止: {sa.dueDate}</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end gap-1">
            <QualityBadge status={sa.qualityStatus} />
            <KittingBadge status={sa.kittingStatus} />
            {sa.missingItems && sa.missingItems.length > 0 && (
              <span className="text-[10px] text-rose-500 font-bold">缺件: {sa.missingItems.length}项</span>
            )}
          </div>
          <div className="w-48">
            <div className="flex justify-between text-[10px] font-bold text-gray-400 mb-1">
              <span>进度</span>
              <span>{sa.progress}%</span>
            </div>
            <ProgressBar progress={sa.progress} />
          </div>
          <StatusBadge status={sa.status} />
        </div>
      </div>
      
      <AnimatePresence>
        {isExpanded && hasChildren && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-gray-100"
          >
            {/* Render Nested Sub-Assemblies */}
            {sa.subAssemblies && sa.subAssemblies.length > 0 && (
              <div className="p-4 bg-gray-50/20">
                {sa.subAssemblies.map(subSa => (
                  <SubAssemblyRow key={subSa.id} sa={subSa} level={level + 1} />
                ))}
              </div>
            )}

            {/* Render Parts */}
            {sa.parts && sa.parts.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50/30">
                      <th className="pr-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider" style={{ paddingLeft: `${4 + level * 1.5}rem` }}>零件名称</th>
                      <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">数量</th>
                      <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">生产状态</th>
                      <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">质量状态</th>
                      <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">零件进度</th>
                      <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-right">截止日期</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {sa.parts.map((part) => (
                      <PartRow key={part.id} part={part} level={level} />
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Sub-Assembly History */}
            {sa.productionHistory && sa.productionHistory.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-gray-50/10">
                <h6 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">部装生产履历</h6>
                <ProductionHistory history={sa.productionHistory} />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const PartRow: React.FC<{ part: Part, level?: number }> = ({ part, level = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasOperations = part.operations && part.operations.length > 0;
  const hasMissingItems = part.missingItems && part.missingItems.length > 0;
  const canExpand = hasOperations || hasMissingItems;

  return (
    <>
      <tr 
        className={`hover:bg-gray-50/50 transition-colors ${canExpand ? 'cursor-pointer' : ''}`}
        onClick={() => canExpand && setIsExpanded(!isExpanded)}
      >
        <td className="pr-6 py-4" style={{ paddingLeft: `${4 + level * 1.5}rem` }}>
          <div className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full ${part.status === ProductionStatus.COMPLETED ? 'bg-emerald-400' : 'bg-blue-400'}`} />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">{part.name}</span>
                <KittingBadge status={part.kittingStatus} />
              </div>
              {canExpand && (
                <span className="text-[10px] text-blue-500 flex items-center gap-1">
                  {isExpanded ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
                  {isExpanded ? '收起详情' : '查看工序/缺件'}
                </span>
              )}
            </div>
          </div>
        </td>
        <td className="px-6 py-4">
          <span className="text-xs font-mono text-gray-500">{part.completedQuantity} / {part.quantity}</span>
        </td>
        <td className="px-6 py-4">
          <StatusBadge status={part.status} />
        </td>
        <td className="px-6 py-4">
          <QualityBadge status={part.qualityStatus} />
        </td>
        <td className="px-6 py-4 w-48">
          <ProgressBar progress={part.progress} height={4} />
        </td>
        <td className="px-6 py-4 text-right">
          <span className="text-xs text-gray-400 font-mono">{part.dueDate}</span>
        </td>
      </tr>
      <AnimatePresence>
        {isExpanded && (
          <motion.tr
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <td colSpan={6} className="bg-gray-50/30 py-4 border-l-4 border-blue-500" style={{ paddingLeft: `${4 + level * 1.5}rem` }}>
              <div className="space-y-6">
                {hasMissingItems && <MissingItemsList items={part.missingItems} />}
                
                {hasOperations && (
                  <div>
                    <h6 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">工序进度</h6>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {part.operations?.map((op, idx) => (
                        <div key={op.id} className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-2">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <span className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center text-[10px] font-bold text-gray-400">
                                {idx + 1}
                              </span>
                              <span className="text-xs font-bold text-gray-700">{op.name}</span>
                            </div>
                            <StatusBadge status={op.status} />
                          </div>
                          <ProgressBar progress={op.progress} height={3} />
                          <div className="flex justify-between items-center mt-1">
                            <div className="flex items-center gap-1 text-[10px] text-gray-400">
                              <User size={10} />
                              {op.operator || '未指派'}
                            </div>
                            <span className="text-[10px] font-mono text-gray-400">{op.progress}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {part.productionHistory && part.productionHistory.length > 0 && (
                  <div>
                    <h6 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">生产履历</h6>
                    <ProductionHistory history={part.productionHistory} />
                  </div>
                )}

                {part.certificates && part.certificates.length > 0 && (
                  <div>
                    <h6 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">外购外协合格证</h6>
                    <CertificateView certificates={part.certificates} />
                  </div>
                )}
              </div>
            </td>
          </motion.tr>
        )}
      </AnimatePresence>
    </>
  );
};

// --- Main Views ---

const StrategicDashboard = ({ onDrillDown }: { onDrillDown: (type: string, title: string) => void }) => {
  const stats = mockDashboardStats.strategicStats;
  if (!stats) return null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div 
          className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm cursor-pointer hover:border-rose-500 transition-all"
          onClick={() => onDrillDown('QUALITY_UNQUALIFIED', '风险总值 (VaR) 明细')}
        >
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">风险总值 (VaR)</p>
          <p className="text-2xl font-black text-rose-600">¥{(stats.totalValueAtRisk / 10000).toFixed(0)}万</p>
          <div className="mt-2 flex items-center gap-1 text-[10px] text-rose-500 font-bold">
            <TrendingUp size={12} />
            <span>较上 week 上升 5.2%</span>
          </div>
        </div>
        <div 
          className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm cursor-pointer hover:border-blue-500 transition-all"
          onClick={() => onDrillDown('PERSONNEL_EFFICIENCY', '综合资源效率明细')}
        >
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">综合资源效率</p>
          <p className="text-2xl font-black text-blue-600">{stats.resourceEfficiency}%</p>
          <div className="mt-2 flex items-center gap-1 text-[10px] text-emerald-500 font-bold">
            <TrendingUp size={12} />
            <span>较上月提升 2.1%</span>
          </div>
        </div>
        <div 
          className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm cursor-pointer hover:border-amber-500 transition-all"
          onClick={() => onDrillDown('MATERIAL_STOCKOUT', '供应商风险指数明细')}
        >
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">供应商风险指数</p>
          <p className="text-2xl font-black text-amber-500">{stats.supplierRiskIndex}</p>
          <p className="text-[10px] text-gray-400 mt-2">基于交付与质量综合评分</p>
        </div>
        <div 
          className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm cursor-pointer hover:border-indigo-500 transition-all"
          onClick={() => onDrillDown('MATERIAL_TOTAL', '成本绩效指数 (CPI) 明细')}
        >
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">成本绩效指数 (CPI)</p>
          <p className="text-2xl font-black text-indigo-600">{stats.costPerformanceIndex}</p>
          <p className="text-[10px] text-gray-400 mt-2">数值 &lt; 1 表示实际成本超支</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cost Analysis */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h4 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
            <DollarSign size={18} className="text-blue-600" />
            生产成本预算执行分析
          </h4>
          <div className="space-y-6">
            {stats.costs.map((cost, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-xs mb-2">
                  <span className="font-bold text-gray-600">{cost.category}</span>
                  <span className="font-mono text-gray-400">
                    <span className="text-gray-900 font-bold">¥{(cost.actual / 10000).toFixed(0)}万</span> / ¥{(cost.budget / 10000).toFixed(0)}万
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${cost.actual > cost.budget ? 'bg-rose-500' : 'bg-blue-500'}`}
                    style={{ width: `${Math.min(100, (cost.actual / cost.budget) * 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resource Load */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h4 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Users size={18} className="text-blue-600" />
            核心部门产能负荷监控
          </h4>
          <div className="grid grid-cols-2 gap-4">
            {stats.loads.map((load, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-2">{load.department}</p>
                <div className="flex justify-between items-end mb-2">
                  <p className="text-lg font-black text-gray-800">{(load.load / load.capacity * 100).toFixed(0)}%</p>
                  <p className="text-[10px] font-bold text-emerald-600">效率: {load.efficiency}%</p>
                </div>
                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${load.load / load.capacity > 0.9 ? 'bg-rose-500' : 'bg-blue-500'}`}
                    style={{ width: `${Math.min(100, (load.load / load.capacity) * 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Supplier Risk */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <h4 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Truck size={18} className="text-blue-600" />
          关键供应商绩效与风险评估
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-100">
                <th className="pb-4 font-bold uppercase tracking-wider text-[10px]">供应商名称</th>
                <th className="pb-4 font-bold uppercase tracking-wider text-[10px]">按时交付率</th>
                <th className="pb-4 font-bold uppercase tracking-wider text-[10px]">质量合格率</th>
                <th className="pb-4 font-bold uppercase tracking-wider text-[10px]">风险等级</th>
                <th className="pb-4 font-bold uppercase tracking-wider text-[10px]">状态</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {stats.suppliers.map((supplier, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 font-bold text-gray-800">{supplier.name}</td>
                  <td className="py-4 font-mono">{supplier.onTimeRate}%</td>
                  <td className="py-4 font-mono">{supplier.qualityRate}%</td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                      supplier.riskLevel === 'LOW' ? 'bg-emerald-100 text-emerald-700' :
                      supplier.riskLevel === 'MEDIUM' ? 'bg-amber-100 text-amber-700' :
                      'bg-rose-100 text-rose-700'
                    }`}>
                      {supplier.riskLevel}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className={`w-2 h-2 rounded-full ${
                      supplier.riskLevel === 'LOW' ? 'bg-emerald-500' :
                      supplier.riskLevel === 'MEDIUM' ? 'bg-amber-500' :
                      'bg-rose-500'
                    } animate-pulse`}></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const DecisionSupport = () => {
  const stats = mockDashboardStats.strategicStats;
  if (!stats) return null;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-2xl font-black mb-2 flex items-center gap-3">
            <Zap size={28} className="text-amber-300" />
            决策建议中心
          </h3>
          <p className="text-blue-100 max-w-2xl">
            基于实时生产数据、质量趋势及供应链风险模型，系统为您生成以下管理决策建议。
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {stats.recommendations.map((rec) => (
          <motion.div 
            key={rec.id}
            whileHover={{ scale: 1.01 }}
            className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex gap-6 items-start"
          >
            <div className={`p-4 rounded-2xl shrink-0 ${
              rec.impact === 'HIGH' ? 'bg-rose-50 text-rose-600' :
              rec.impact === 'MEDIUM' ? 'bg-amber-50 text-amber-600' :
              'bg-blue-50 text-blue-600'
            }`}>
              {rec.category === 'SUPPLY' ? <Truck size={24} /> :
               rec.category === 'RESOURCE' ? <Users size={24} /> :
               rec.category === 'PRODUCTION' ? <Settings size={24} /> :
               <ShieldAlert size={24} />}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-lg font-bold text-gray-800">{rec.title}</h4>
                <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                  rec.impact === 'HIGH' ? 'bg-rose-100 text-rose-700' :
                  rec.impact === 'MEDIUM' ? 'bg-amber-100 text-amber-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {rec.impact} IMPACT
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">{rec.description}</p>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">建议行动</p>
                <p className="text-sm font-bold text-blue-700">{rec.action}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors">
                执行决策
              </button>
              <button className="px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-xl text-xs font-bold hover:bg-gray-50 transition-colors">
                忽略
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Decision Simulation */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <h4 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Activity size={18} className="text-blue-600" />
          决策模拟与影响预测
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-blue-50/50 rounded-2xl border border-blue-100">
            <p className="text-xs font-bold text-blue-800 mb-4">模拟场景: 增加质检班次</p>
            <div className="space-y-3">
              <div className="flex justify-between text-[11px]">
                <span className="text-blue-600">预计交付提前</span>
                <span className="font-bold text-emerald-600">3.5 天</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-blue-600">成本增加</span>
                <span className="font-bold text-rose-600">¥12,000</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-blue-600">资源负荷降至</span>
                <span className="font-bold text-blue-600">92%</span>
              </div>
            </div>
            <button className="mt-6 w-full py-2 bg-blue-600 text-white rounded-xl text-[10px] font-bold">
              应用模拟结果
            </button>
          </div>
          <div className="md:col-span-2 flex items-center justify-center border-2 border-dashed border-gray-100 rounded-2xl">
            <div className="text-center">
              <Activity size={48} className="text-gray-200 mx-auto mb-2" />
              <p className="text-xs text-gray-400">选择更多决策建议进行多维度模拟分析</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ScheduleItem = ({ item, level, isLast, parentEndPos }: any) => {
  const schedule = item.schedule;
  if (!schedule) return null;

  const plannedStart = new Date(schedule.plannedStart);
  const plannedEnd = new Date(schedule.plannedEnd);
  const actualStart = schedule.actualStart ? new Date(schedule.actualStart) : null;
  const actualEnd = schedule.actualEnd ? new Date(schedule.actualEnd) : null;
  
  let estimatedEnd = actualEnd;
  const now = new Date();
  if (!actualEnd && actualStart) {
    const remainingHours = schedule.remainingHours || 0;
    estimatedEnd = new Date(now.getTime() + remainingHours * 60 * 60 * 1000);
  }

  const timelineStart = new Date('2024-02-01');
  const totalDays = 90;
  
  const getPos = (date: Date) => {
    const diff = date.getTime() - timelineStart.getTime();
    return Math.max(0, Math.min(100, (diff / (totalDays * 24 * 60 * 60 * 1000)) * 100));
  };

  const plannedLeft = getPos(plannedStart);
  const plannedRight = getPos(plannedEnd);
  const plannedWidth = plannedRight - plannedLeft;
  
  const actualLeft = actualStart ? getPos(actualStart) : 0;
  const actualRight = estimatedEnd ? getPos(estimatedEnd) : 0;
  const actualWidth = actualStart ? (actualRight - actualLeft) : 0;
  
  const isDelayed = estimatedEnd && estimatedEnd > plannedEnd;
  const name = item.name || item.model;
  const progress = item.progress !== undefined ? item.progress : item.overallProgress;

  return (
    <div className="relative">
      {/* Vertical Hierarchy Line */}
      {level > 0 && (
        <div 
          className="absolute left-0 top-0 w-px bg-gray-200" 
          style={{ 
            left: `${(level - 1) * 20 + 10}px`, 
            height: isLast ? '20px' : '100%',
            top: '-10px'
          }}
        ></div>
      )}

      <div className="space-y-2 py-2">
        <div className="flex justify-between items-center px-2">
          <div className="flex items-center gap-2" style={{ paddingLeft: `${level * 20}px` }}>
            {level > 0 && (
              <div className="absolute w-3 h-px bg-gray-200" style={{ left: `${(level - 1) * 20 + 10}px`, top: '22px' }}></div>
            )}
            <span className={`text-xs font-bold ${level === 0 ? 'text-gray-900' : 'text-gray-600'}`}>
              {name}
            </span>
            <span className={`text-[8px] px-1.5 py-0.5 rounded font-bold uppercase ${
              item.status === '已完成' ? 'bg-emerald-50 text-emerald-600' :
              item.status === '生产中' ? 'bg-blue-50 text-blue-600' :
              'bg-gray-100 text-gray-400'
            }`}>
              {item.status}
            </span>
          </div>
          <div className="flex items-center gap-4">
            {isDelayed && (
              <div className="flex items-center gap-1 text-rose-500 text-[10px] font-bold animate-pulse">
                <AlertTriangle size={12} />
                预计延期 {Math.ceil((estimatedEnd!.getTime() - plannedEnd.getTime()) / (24 * 60 * 60 * 1000))} 天
              </div>
            )}
            <span className="text-[10px] font-mono font-bold text-blue-600">{progress}%</span>
          </div>
        </div>
        
        <div className="relative h-12 bg-gray-50/20 rounded-xl overflow-hidden border border-gray-100 group">
          {/* Timeline Grid */}
          <div className="absolute inset-0 flex">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="flex-1 border-r border-gray-100/50 last:border-0"></div>
            ))}
          </div>

          {/* Dependency Link from Child to Parent (Visual only) */}
          {parentEndPos !== undefined && (
            <div 
              className="absolute h-px border-t border-dashed border-blue-300 z-0"
              style={{ 
                left: `${plannedRight}%`, 
                width: `${Math.abs(parentEndPos - plannedRight)}%`,
                top: '50%',
                opacity: 0.6
              }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-blue-300 rounded-full"></div>
            </div>
          )}

          {/* Planned Bar */}
          <div 
            className="absolute h-3 bg-blue-100/60 border border-blue-200/50 rounded-full top-2 transition-all group-hover:bg-blue-200/60"
            style={{ left: `${plannedLeft}%`, width: `${plannedWidth}%` }}
            title={`计划: ${schedule.plannedStart} 至 ${schedule.plannedEnd}`}
          >
             <div className="absolute -top-4 left-0 text-[8px] text-blue-400 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
               {schedule.plannedStart}
             </div>
          </div>
          
          {/* Actual/Estimated Bar */}
          {actualStart && (
            <div 
              className={`absolute h-3 rounded-full top-6.5 shadow-sm transition-all z-10 ${isDelayed ? 'bg-gradient-to-r from-amber-400 to-orange-400' : 'bg-gradient-to-r from-emerald-400 to-teal-500'}`}
              style={{ left: `${actualLeft}%`, width: `${actualWidth}%` }}
            >
              {/* Progress indicator */}
              <div className="absolute inset-0 bg-black/10 rounded-full" style={{ width: `${progress}%` }}></div>
              
              {/* Pulse effect for in-progress */}
              {item.status === '生产中' && (
                <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/40 animate-pulse"></div>
              )}
            </div>
          )}
          
          {/* Today Line */}
          <div className="absolute top-0 bottom-0 w-px bg-rose-400/60 z-20" style={{ left: `${getPos(now)}%` }}>
             <div className="absolute top-0 -translate-x-1/2 -translate-y-full bg-rose-400 text-white text-[7px] px-1.5 py-0.5 rounded-full font-bold shadow-sm">
               今日
             </div>
          </div>
        </div>

        {/* Sub-items recursion */}
        <div className="ml-4 border-l border-gray-100">
          {item.subAssemblies?.map((sa: any, idx: number) => (
            <ScheduleItem 
              key={sa.id} 
              item={sa} 
              level={level + 1} 
              isLast={idx === (item.subAssemblies.length - 1) && (!item.parts || item.parts.length === 0)}
              parentEndPos={plannedLeft} // Connect child end to parent start
            />
          ))}
          {item.parts?.map((p: any, idx: number) => (
            <ScheduleItem 
              key={p.id} 
              item={p} 
              level={level + 1} 
              isLast={idx === (item.parts.length - 1)}
              parentEndPos={plannedLeft}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const PlanningDashboard = () => {
  const [selectedChangeType, setSelectedChangeType] = useState<string | null>(null);
  const stats = mockDashboardStats.planningStats;
  if (!stats) return null;

  return (
    <div className="space-y-6">
      {/* BOM & Process Preparation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h4 className="font-bold text-gray-800 flex items-center gap-2">
              <FileText size={18} className="text-blue-600" />
              BOM准备完成情况
            </h4>
            <span className="text-2xl font-bold text-blue-600">{stats.bomPreparation.completionRate}%</span>
          </div>
          <div className="space-y-4">
            {stats.bomPreparation.details.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-gray-600">{item.product}</span>
                  <span className={item.status === 'COMPLETED' ? 'text-emerald-600' : 'text-amber-600'}>
                    {item.status === 'COMPLETED' ? '已完成' : item.status === 'IN_PROGRESS' ? '进行中' : '待开始'}
                  </span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${item.progress}%` }}
                    className={`h-full rounded-full ${item.status === 'COMPLETED' ? 'bg-emerald-500' : 'bg-blue-500'}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h4 className="font-bold text-gray-800 flex items-center gap-2">
              <Settings size={18} className="text-indigo-600" />
              工艺准备完成情况
            </h4>
            <span className="text-2xl font-bold text-indigo-600">{stats.processPreparation.completionRate}%</span>
          </div>
          <div className="space-y-4">
            {stats.processPreparation.details.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-gray-600">{item.product}</span>
                  <span className={item.status === 'COMPLETED' ? 'text-emerald-600' : 'text-amber-600'}>
                    {item.status === 'COMPLETED' ? '已完成' : item.status === 'IN_PROGRESS' ? '进行中' : '待开始'}
                  </span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${item.progress}%` }}
                    className={`h-full rounded-full ${item.status === 'COMPLETED' ? 'bg-emerald-500' : 'bg-indigo-500'}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Plan Decomposition & Compilation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-6">
            <GitBranch size={18} className="text-emerald-600" />
            生产计划分解情况
          </h4>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100">
              <p className="text-[10px] font-bold text-emerald-600 uppercase mb-1">总计划数</p>
              <p className="text-xl font-bold text-emerald-700">{stats.planDecomposition.totalPlans}</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">
              <p className="text-[10px] font-bold text-blue-600 uppercase mb-1">已分解</p>
              <p className="text-xl font-bold text-blue-700">{stats.planDecomposition.decomposedCount}</p>
            </div>
            <div className="bg-amber-50 p-3 rounded-xl border border-amber-100">
              <p className="text-[10px] font-bold text-amber-600 uppercase mb-1">待分解</p>
              <p className="text-xl font-bold text-amber-700">{stats.planDecomposition.pendingDecomposition}</p>
            </div>
          </div>
          <div className="space-y-3">
            {stats.planDecomposition.details.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                <div>
                  <p className="text-sm font-bold text-gray-800">{item.productName}</p>
                  <p className="text-[10px] text-gray-400">{item.planId}</p>
                </div>
                <div className="text-right">
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${item.status === 'DECOMPOSED' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                    {item.status === 'DECOMPOSED' ? '已分解' : '待分解'}
                  </span>
                  <p className="text-[10px] text-gray-400 mt-1">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-6">
            <ClipboardList size={18} className="text-purple-600" />
            生产计划编制情况
          </h4>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-purple-50 p-3 rounded-xl border border-purple-100">
              <p className="text-[10px] font-bold text-purple-600 uppercase mb-1">总计划数</p>
              <p className="text-xl font-bold text-purple-700">{stats.planCompilation.totalPlans}</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">
              <p className="text-[10px] font-bold text-blue-600 uppercase mb-1">已编制</p>
              <p className="text-xl font-bold text-blue-700">{stats.planCompilation.compiledCount}</p>
            </div>
            <div className="bg-amber-50 p-3 rounded-xl border border-amber-100">
              <p className="text-[10px] font-bold text-amber-600 uppercase mb-1">待编制</p>
              <p className="text-xl font-bold text-amber-700">{stats.planCompilation.pendingCompilation}</p>
            </div>
          </div>
          <div className="space-y-3">
            {stats.planCompilation.details.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                <div>
                  <p className="text-sm font-bold text-gray-800">{item.productName}</p>
                  <p className="text-[10px] text-gray-400">{item.planId}</p>
                </div>
                <div className="text-right">
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${item.status === 'COMPILED' ? 'bg-purple-100 text-purple-600' : 'bg-amber-100 text-amber-600'}`}>
                    {item.status === 'COMPILED' ? '已编制' : '待编制'}
                  </span>
                  <p className="text-[10px] text-gray-400 mt-1">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Issuance & Execution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-6">
            <Send size={18} className="text-blue-600" />
            计划下发情况
          </h4>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">
              <p className="text-[10px] font-bold text-blue-600 uppercase mb-1">总计划数</p>
              <p className="text-xl font-bold text-blue-700">{stats.planIssuance.totalPlans}</p>
            </div>
            <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100">
              <p className="text-[10px] font-bold text-emerald-600 uppercase mb-1">已下发</p>
              <p className="text-xl font-bold text-emerald-700">{stats.planIssuance.issuedCount}</p>
            </div>
            <div className="bg-amber-50 p-3 rounded-xl border border-amber-100">
              <p className="text-[10px] font-bold text-amber-600 uppercase mb-1">待下发</p>
              <p className="text-xl font-bold text-amber-700">{stats.planIssuance.pendingIssuance}</p>
            </div>
          </div>
          <div className="space-y-3">
            {stats.planIssuance.details.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                <div>
                  <p className="text-sm font-bold text-gray-800">{item.productName}</p>
                  <p className="text-[10px] text-gray-400">{item.planId}</p>
                </div>
                <div className="text-right">
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${item.status === 'ISSUED' ? 'bg-blue-100 text-blue-600' : 'bg-amber-100 text-amber-600'}`}>
                    {item.status === 'ISSUED' ? '已下发' : '待下发'}
                  </span>
                  <p className="text-[10px] text-gray-400 mt-1">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-6">
            <Activity size={18} className="text-rose-600" />
            计划执行情况
          </h4>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-rose-50 p-3 rounded-xl border border-rose-100">
              <p className="text-[10px] font-bold text-rose-600 uppercase mb-1">总任务数</p>
              <p className="text-xl font-bold text-rose-700">{stats.planExecution.totalTasks}</p>
            </div>
            <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100">
              <p className="text-[10px] font-bold text-emerald-600 uppercase mb-1">已完成</p>
              <p className="text-xl font-bold text-emerald-700">{stats.planExecution.completedTasks}</p>
            </div>
            <div className="bg-amber-50 p-3 rounded-xl border border-amber-100">
              <p className="text-[10px] font-bold text-amber-600 uppercase mb-1">执行率</p>
              <p className="text-xl font-bold text-amber-700">{stats.planExecution.executionRate}%</p>
            </div>
          </div>
          <div className="space-y-4">
            {stats.planExecution.details.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <div>
                    <span className="text-gray-800 font-bold">{item.productName}</span>
                    <span className="text-[10px] text-gray-400 ml-2">{item.taskId}</span>
                  </div>
                  <span className={item.status === ProductionStatus.COMPLETED ? 'text-emerald-600' : 'text-blue-600'}>
                    {item.status} {item.progress}%
                  </span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${item.progress}%` }}
                    className={`h-full rounded-full ${item.status === ProductionStatus.COMPLETED ? 'bg-emerald-500' : 'bg-blue-500'}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Plan Changes & Adjustments */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h4 className="font-bold text-gray-800 flex items-center gap-2">
            <RefreshCw size={18} className="text-rose-600" />
            计划变更与调整
          </h4>
          <div className="flex gap-4">
            <button 
              onClick={() => setSelectedChangeType(null)}
              className={`text-center px-3 py-1 rounded-xl transition-all ${!selectedChangeType ? 'bg-gray-100 ring-2 ring-gray-200' : 'hover:bg-gray-50'}`}
            >
              <p className="text-[10px] font-bold text-gray-400 uppercase">总变更</p>
              <p className="text-lg font-bold text-gray-800">{stats.planChanges.total}</p>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <button 
            onClick={() => setSelectedChangeType(selectedChangeType === 'BOM_CHANGE' ? null : 'BOM_CHANGE')}
            className={`bg-blue-50 p-3 rounded-xl border transition-all text-left ${selectedChangeType === 'BOM_CHANGE' ? 'border-blue-500 ring-2 ring-blue-200' : 'border-blue-100 hover:border-blue-300'}`}
          >
            <p className="text-[10px] font-bold text-blue-600 uppercase mb-1">BOM变更</p>
            <p className="text-xl font-bold text-blue-700">{stats.planChanges.bomChanges}</p>
          </button>
          <button 
            onClick={() => setSelectedChangeType(selectedChangeType === 'PROCESS_CHANGE' ? null : 'PROCESS_CHANGE')}
            className={`bg-indigo-50 p-3 rounded-xl border transition-all text-left ${selectedChangeType === 'PROCESS_CHANGE' ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-indigo-100 hover:border-indigo-300'}`}
          >
            <p className="text-[10px] font-bold text-indigo-600 uppercase mb-1">工艺变更</p>
            <p className="text-xl font-bold text-indigo-700">{stats.planChanges.processChanges}</p>
          </button>
          <button 
            onClick={() => setSelectedChangeType(selectedChangeType === 'PLAN_INSERTION' ? null : 'PLAN_INSERTION')}
            className={`bg-rose-50 p-3 rounded-xl border transition-all text-left ${selectedChangeType === 'PLAN_INSERTION' ? 'border-rose-500 ring-2 ring-rose-200' : 'border-rose-100 hover:border-rose-300'}`}
          >
            <p className="text-[10px] font-bold text-rose-600 uppercase mb-1">计划插单</p>
            <p className="text-xl font-bold text-rose-700">{stats.planChanges.planInsertions}</p>
          </button>
          <button 
            onClick={() => setSelectedChangeType(selectedChangeType === 'PLAN_ADDITION' ? null : 'PLAN_ADDITION')}
            className={`bg-emerald-50 p-3 rounded-xl border transition-all text-left ${selectedChangeType === 'PLAN_ADDITION' ? 'border-emerald-500 ring-2 ring-emerald-200' : 'border-emerald-100 hover:border-emerald-300'}`}
          >
            <p className="text-[10px] font-bold text-emerald-600 uppercase mb-1">计划新增</p>
            <p className="text-xl font-bold text-emerald-700">{stats.planChanges.planAdditions}</p>
          </button>
          <button 
            onClick={() => setSelectedChangeType(selectedChangeType === 'PLAN_CHANGE' ? null : 'PLAN_CHANGE')}
            className={`bg-amber-50 p-3 rounded-xl border transition-all text-left ${selectedChangeType === 'PLAN_CHANGE' ? 'border-amber-500 ring-2 ring-amber-200' : 'border-amber-100 hover:border-amber-300'}`}
          >
            <p className="text-[10px] font-bold text-amber-600 uppercase mb-1">计划变更</p>
            <p className="text-xl font-bold text-amber-700">{stats.planChanges.planChanges}</p>
          </button>
        </div>

        <div className="space-y-3">
          {stats.planChanges.details
            .filter(item => !selectedChangeType || item.type === selectedChangeType)
            .map((item, idx) => (
            <motion.div 
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={item.id} 
              className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100"
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  item.type === 'BOM_CHANGE' ? 'bg-blue-100 text-blue-600' :
                  item.type === 'PROCESS_CHANGE' ? 'bg-indigo-100 text-indigo-600' :
                  item.type === 'PLAN_INSERTION' ? 'bg-rose-100 text-rose-600' :
                  item.type === 'PLAN_ADDITION' ? 'bg-emerald-100 text-emerald-600' :
                  'bg-amber-100 text-amber-600'
                }`}>
                  {item.type === 'BOM_CHANGE' ? <FileText size={16} /> :
                   item.type === 'PROCESS_CHANGE' ? <Settings size={16} /> :
                   item.type === 'PLAN_INSERTION' ? <PlusCircle size={16} /> :
                   item.type === 'PLAN_ADDITION' ? <Sparkles size={16} /> :
                   <RefreshCw size={16} />}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">{item.title}</p>
                  <p className="text-[10px] text-gray-400">{item.product} | {item.id}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                  item.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-600' :
                  item.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-600' :
                  'bg-amber-100 text-amber-600'
                }`}>
                  {item.status === 'COMPLETED' ? '已完成' : item.status === 'IN_PROGRESS' ? '进行中' : '待处理'}
                </span>
                <p className="text-[10px] text-gray-400 mt-1">{item.date}</p>
              </div>
            </motion.div>
          ))}
          {stats.planChanges.details.filter(item => !selectedChangeType || item.type === selectedChangeType).length === 0 && (
            <div className="text-center py-8 text-gray-400 text-sm">
              暂无此类变更记录
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ProductionHistoryPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<{ name: string; history: ProductionRecord[] } | null>(null);

  // Flatten all items that have production history
  const allItemsWithHistory = useMemo(() => {
    const items: { id: string; name: string; type: string; history: ProductionRecord[] }[] = [];

    mockMachineTools.forEach(mt => {
      if (mt.productionHistory && mt.productionHistory.length > 0) {
        items.push({ id: mt.id, name: `${mt.model} (${mt.serialNumber})`, type: '整机', history: mt.productionHistory });
      }
      mt.subAssemblies.forEach(sa => {
        if (sa.productionHistory && sa.productionHistory.length > 0) {
          items.push({ id: sa.id, name: sa.name, type: '部装', history: sa.productionHistory });
        }
        sa.parts.forEach(p => {
          if (p.productionHistory && p.productionHistory.length > 0) {
            items.push({ id: p.id, name: p.name, type: '零件', history: p.productionHistory });
          }
        });
      });
    });

    // Also check quality details for history
    mockDashboardStats.qualityStats.qualityDetails.forEach(qd => {
      if (qd.history && qd.history.length > 0 && !items.find(i => i.id === qd.id)) {
        items.push({ 
          id: qd.id, 
          name: qd.name, 
          type: qd.type === 'PRODUCT' ? '整机' : qd.type === 'SUB_ASSEMBLY' ? '部装' : '零件', 
          history: qd.history 
        });
      }
    });

    return items;
  }, []);

  const filteredItems = useMemo(() => {
    if (!searchQuery) return [];
    return allItemsWithHistory.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, allItemsWithHistory]);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <History className="text-blue-600" size={20} />
          生产履历查询
        </h3>
        <div className="relative max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="输入产品型号、序列号或零部件名称进行查询..."
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (selectedItem) setSelectedItem(null);
            }}
          />
          
          {searchQuery && !selectedItem && filteredItems.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-30 max-h-64 overflow-y-auto">
              {filteredItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    setSelectedItem(item);
                    setSearchQuery(item.name);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors border-b border-gray-50 last:border-0"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-800">{item.name}</span>
                    <span className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-500 rounded font-bold uppercase">{item.type}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedItem ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-100">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
              <History size={24} />
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-800">{selectedItem.name}</h4>
              <p className="text-sm text-gray-400">完整生产制造与质量检验履历</p>
            </div>
          </div>
          <ProductionHistory history={selectedItem.history} />
        </motion.div>
      ) : (
        <div className="bg-white p-12 rounded-2xl border border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400">
          <div className="p-4 bg-gray-50 rounded-full mb-4">
            <Search size={48} className="opacity-20" />
          </div>
          <p className="text-sm font-medium">请在上方搜索框输入名称以查看生产履历</p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl">
            {allItemsWithHistory.slice(0, 3).map(item => (
              <button 
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all text-left group"
              >
                <p className="text-[10px] text-gray-400 font-bold uppercase mb-1 group-hover:text-blue-400">{item.type}</p>
                <p className="text-xs font-bold text-gray-600 group-hover:text-blue-600 line-clamp-1">{item.name}</p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const PersonnelPerformanceDashboard = ({ stats, onDrillDown }: { stats: PersonnelPerformanceStats, onDrillDown: (type: string, title: string) => void }) => {
  const [activeSubTab, setActiveSubTab] = useState<'DETAIL' | 'COMPARISON' | 'RANKING' | 'TREND'>('DETAIL');
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div 
          className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm cursor-pointer hover:border-blue-500 transition-all"
          onClick={() => onDrillDown('PERSONNEL_HOURS', '总投入工时明细')}
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Clock size={64} />
          </div>
          <p className="text-sm text-gray-500 font-medium">总投入工时</p>
          <h3 className="text-3xl font-bold mt-1 text-blue-600">{stats.totalHours.toLocaleString()}h</h3>
          <div className="mt-2 flex items-center gap-1 text-[10px] text-blue-600 font-bold">
            <TrendingUp size={12} />
            <span>较上月增加 5.2%</span>
          </div>
        </div>
        <div 
          className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm cursor-pointer hover:border-emerald-500 transition-all"
          onClick={() => onDrillDown('PERSONNEL_EFFICIENCY', '平均生产效率明细')}
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Zap size={64} />
          </div>
          <p className="text-sm text-gray-500 font-medium">平均生产效率</p>
          <h3 className="text-3xl font-bold mt-1 text-emerald-600">{stats.avgEfficiency}%</h3>
          <div className="mt-2 flex items-center gap-1 text-[10px] text-emerald-600 font-bold">
            <CheckCircle2 size={12} />
            <span>处于高效区间</span>
          </div>
        </div>
        <div 
          className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm cursor-pointer hover:border-indigo-500 transition-all"
          onClick={() => onDrillDown('PERSONNEL_ACTIVE', '在岗工人明细')}
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Users size={64} />
          </div>
          <p className="text-sm text-gray-500 font-medium">在岗工人数</p>
          <h3 className="text-3xl font-bold mt-1 text-indigo-600">128</h3>
          <div className="mt-2 flex items-center gap-1 text-[10px] text-indigo-600 font-bold">
            <User size={12} />
            <span>全员满负荷</span>
          </div>
        </div>
        <div 
          className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm cursor-pointer hover:border-amber-500 transition-all"
          onClick={() => onDrillDown('PERSONNEL_PASS_RATE', '人均合格率明细')}
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <ShieldCheck size={64} />
          </div>
          <p className="text-sm text-gray-500 font-medium">人均合格率</p>
          <h3 className="text-3xl font-bold mt-1 text-amber-600">98.2%</h3>
          <div className="mt-2 flex items-center gap-1 text-[10px] text-amber-600 font-bold">
            <ShieldCheck size={12} />
            <span>质量表现稳定</span>
          </div>
        </div>
      </div>

      {/* Sub-navigation */}
      <div className="flex items-center gap-2 p-1 bg-gray-100/50 rounded-xl w-fit">
        {[
          { id: 'DETAIL', label: '工时明细', icon: FileText },
          { id: 'COMPARISON', label: '工时对比', icon: BarChart3 },
          { id: 'RANKING', label: '工人排名', icon: TrendingUp },
          { id: 'TREND', label: '变动分析', icon: Activity },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeSubTab === tab.id 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <tab.icon size={14} />
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeSubTab === 'DETAIL' && (
          <motion.div
            key="detail"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
          >
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
              <h4 className="font-bold text-gray-800 flex items-center gap-2">
                <FileText size={18} className="text-blue-600" />
                工人工时明细查询
              </h4>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                  <input type="text" placeholder="搜索工人..." className="pl-8 pr-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                </div>
                <button className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-50">
                  <Filter size={14} /> 筛选
                </button>
                <button className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition-colors">
                  <Download size={14} /> 导出报表
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/50">
                    <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">日期</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">工人</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">车间/班组</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">任务内容</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">状态</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">工时(h)</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">效率</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {stats.laborHourDetails.map((detail) => (
                    <tr key={detail.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-xs font-mono text-gray-500">{detail.date}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-[10px]">
                            {detail.workerName[0]}
                          </div>
                          <span className="text-xs font-bold text-gray-800">{detail.workerName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-xs text-gray-600">{detail.workshop}</p>
                        <p className="text-[10px] text-gray-400">{detail.team}</p>
                      </td>
                      <td className="px-6 py-4 text-xs text-gray-600">{detail.taskName}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded text-[10px] font-bold">已完成</span>
                      </td>
                      <td className="px-6 py-4 text-xs font-bold text-blue-600">{detail.hours}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-12 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500" style={{ width: `${detail.efficiency}%` }}></div>
                          </div>
                          <span className="text-[10px] font-bold text-emerald-600">{detail.efficiency}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {activeSubTab === 'COMPARISON' && (
          <motion.div
            key="comparison"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Workshop Comparison */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-6">
                  <Layers size={18} className="text-blue-600" />
                  车间工时对比分析
                </h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stats.workshopComparison}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 11}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fontSize: 11}} />
                      <Tooltip 
                        cursor={{fill: '#F9FAFB'}}
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      />
                      <Bar dataKey="hours" fill="#3B82F6" radius={[4, 4, 0, 0]} name="总工时 (h)" barSize={40} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Team Comparison */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-6">
                  <Users size={18} className="text-indigo-600" />
                  班组工时对比分析
                </h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stats.teamComparison}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 11}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fontSize: 11}} />
                      <Tooltip 
                        cursor={{fill: '#F9FAFB'}}
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      />
                      <Bar dataKey="hours" fill="#6366F1" radius={[4, 4, 0, 0]} name="总工时 (h)" barSize={30} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeSubTab === 'RANKING' && (
          <motion.div
            key="ranking"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
          >
            <div className="p-5 border-b border-gray-100 bg-emerald-50/30">
              <h4 className="font-bold text-emerald-800 flex items-center gap-2">
                <TrendingUp size={18} />
                工人绩效排名分析 (月度汇总)
              </h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/50">
                    <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">排名</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">工人</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">总工时</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">平均工时</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">综合效率</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">趋势</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {stats.workerRankings.map((rank) => (
                    <tr key={rank.workerName} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                          rank.rank === 1 ? 'bg-amber-100 text-amber-600' :
                          rank.rank === 2 ? 'bg-gray-100 text-gray-600' :
                          rank.rank === 3 ? 'bg-orange-100 text-orange-600' :
                          'text-gray-400'
                        }`}>
                          {rank.rank}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-bold text-gray-800 text-xs">{rank.workerName}</td>
                      <td className="px-6 py-4 text-xs font-mono text-blue-600 font-bold">{rank.totalHours}h</td>
                      <td className="px-6 py-4 text-xs font-mono text-gray-600">{rank.avgHours}h</td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-bold text-emerald-600">{rank.avgEfficiency}%</span>
                      </td>
                      <td className="px-6 py-4">
                        {rank.trend === 'UP' ? <ChevronUp className="text-emerald-500" size={16} /> :
                         rank.trend === 'DOWN' ? <ChevronDown className="text-rose-500" size={16} /> :
                         <div className="w-4 h-0.5 bg-gray-300 rounded-full"></div>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {activeSubTab === 'TREND' && (
          <motion.div
            key="trend"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm"
          >
            <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-6">
              <Activity size={18} className="text-blue-600" />
              工时变动趋势分析
            </h4>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stats.laborHourTrend}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Line type="monotone" dataKey="hours" stroke="#3B82F6" strokeWidth={3} dot={{ r: 4, fill: '#3B82F6' }} name="投入工时" />
                  <Line type="monotone" dataKey="efficiency" stroke="#10B981" strokeWidth={2} dot={{ r: 3, fill: '#10B981' }} name="生产效率 (%)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ProductionAnalysisDashboard = ({ stats, activeSubTab, onDrillDown }: { stats: ProductionAnalysisStats, activeSubTab: 'WORKSHOP' | 'TEAM' | 'WORKER' | 'PROBLEMS', onDrillDown: (type: string, title: string) => void }) => {
  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        {activeSubTab === 'WORKSHOP' && (
          <motion.div
            key="workshop"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {stats.workshopStats.map((workshop, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-gray-800 flex items-center gap-2">
                      <Layers size={18} className="text-blue-600" />
                      {workshop.name} - 计划完成情况
                    </h4>
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      完成率: {workshop.projectCompletion.completionRate}%
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div 
                      className="p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => onDrillDown('ORDERS', `${workshop.name} 总任务明细`)}
                    >
                      <p className="text-[10px] text-gray-400 font-bold uppercase">总任务</p>
                      <p className="text-xl font-bold">{workshop.projectCompletion.total}</p>
                    </div>
                    <div 
                      className="p-3 bg-emerald-50 text-emerald-700 rounded-xl cursor-pointer hover:bg-emerald-100 transition-colors"
                      onClick={() => onDrillDown('ORDERS', `${workshop.name} 已完成任务明细`)}
                    >
                      <p className="text-[10px] opacity-70 font-bold uppercase">已完成</p>
                      <p className="text-xl font-bold">{workshop.projectCompletion.completed}</p>
                    </div>
                    <div 
                      className="p-3 bg-rose-50 text-rose-700 rounded-xl cursor-pointer hover:bg-rose-100 transition-colors"
                      onClick={() => onDrillDown('ORDERS', `${workshop.name} 紧急/关注任务明细`)}
                    >
                      <p className="text-[10px] opacity-70 font-bold uppercase">紧急/关注</p>
                      <p className="text-xl font-bold">{workshop.projectCompletion.urgentCount}/{workshop.projectCompletion.attentionCount}</p>
                    </div>
                  </div>

                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={workshop.monthlyTrend}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} domain={[0, 100]} />
                        <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                        <Line type="monotone" dataKey="completionRate" stroke="#3B82F6" strokeWidth={3} dot={{ r: 4, fill: '#3B82F6' }} name="完成率" />
                        <Line type="monotone" dataKey="targetRate" stroke="#10B981" strokeDasharray="5 5" name="目标率" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div>
                    <h5 className="text-xs font-bold text-gray-400 uppercase mb-3">当月重点任务</h5>
                    <div className="space-y-2">
                      {workshop.currentMonthTasks.map((task) => (
                        <div key={task.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100">
                          <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${task.isUrgent ? 'bg-rose-500 animate-pulse' : 'bg-blue-500'}`}></div>
                            <span className="text-xs font-medium text-gray-700">{task.name}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-500" style={{ width: `${task.progress}%` }}></div>
                            </div>
                            <span className="text-[10px] font-mono font-bold text-gray-500">{task.progress}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeSubTab === 'TEAM' && (
          <motion.div
            key="team"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {stats.teamStats.map((team, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h4 className="font-bold text-gray-800">{team.teamName}</h4>
                    <p className="text-xs text-gray-400">{team.workshopName}</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-center">
                      <p className="text-[10px] text-gray-400 font-bold uppercase">本月完成率</p>
                      <p className="text-lg font-bold text-blue-600">{team.monthlyTrend[team.monthlyTrend.length-1].completionRate}%</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={team.monthlyTrend}>
                        <defs>
                          <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6366F1" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} domain={[0, 100]} />
                        <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                        <Area type="monotone" dataKey="completionRate" stroke="#6366F1" fillOpacity={1} fill="url(#colorRate)" name="完成率" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-4">
                    <h5 className="text-xs font-bold text-gray-400 uppercase">待关注任务</h5>
                    <div className="space-y-2">
                      {team.currentMonthTasks.map(task => (
                        <div key={task.id} className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-xs font-bold text-gray-700">{task.name}</span>
                            {task.isUrgent && <span className="text-[8px] bg-rose-100 text-rose-600 px-1.5 py-0.5 rounded font-bold">紧急</span>}
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                              <div className="h-full bg-indigo-500" style={{ width: `${task.progress}%` }}></div>
                            </div>
                            <span className="text-[10px] font-mono text-gray-500">{task.progress}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {activeSubTab === 'WORKER' && (
          <motion.div
            key="worker"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50/30 flex justify-between items-center">
                <h4 className="font-bold text-gray-800 flex items-center gap-2">
                  <User size={18} className="text-emerald-600" />
                  工人任务完成情况统计表
                </h4>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-50">导出报表</button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50/50">
                      <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">工人姓名</th>
                      <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">所属班组</th>
                      <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">月度趋势</th>
                      <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">当前任务</th>
                      <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">进度</th>
                      <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">状态</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {stats.workerStats.map((worker, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-xs font-bold text-gray-800">{worker.workerName}</td>
                        <td className="px-6 py-4 text-xs text-gray-500">{worker.teamName}</td>
                        <td className="px-6 py-4 w-32">
                          <div className="h-8">
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={worker.monthlyTrend}>
                                <Line type="monotone" dataKey="completionRate" stroke="#10B981" strokeWidth={2} dot={false} />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-xs text-gray-600">{worker.currentMonthTasks[0]?.name || '-'}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-500" style={{ width: `${worker.currentMonthTasks[0]?.progress || 0}%` }}></div>
                            </div>
                            <span className="text-[10px] font-mono text-gray-400">{worker.currentMonthTasks[0]?.progress || 0}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {worker.currentMonthTasks[0]?.isUrgent ? (
                            <span className="px-2 py-0.5 bg-rose-100 text-rose-600 rounded text-[10px] font-bold">紧急关注</span>
                          ) : (
                            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-600 rounded text-[10px] font-bold">正常</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {activeSubTab === 'PROBLEMS' && (
          <motion.div
            key="problems"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-6">
                  <AlertTriangle size={18} className="text-rose-600" />
                  生产问题频次分析
                </h4>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stats.problemAnalysis} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F3F4F6" />
                      <XAxis type="number" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                      <YAxis dataKey="category" type="category" axisLine={false} tickLine={false} tick={{fontSize: 10}} width={80} />
                      <Tooltip cursor={{fill: '#F9FAFB'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                      <Bar dataKey="count" fill="#EF4444" radius={[0, 4, 4, 0]} name="发生次数" barSize={20} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-6">
                  <Clock size={18} className="text-amber-600" />
                  影响工时统计
                </h4>
                <div className="space-y-6">
                  {stats.problemAnalysis.map((problem, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-gray-700">{problem.category}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-rose-600">{problem.impactHours}h</span>
                          {problem.trend === 'UP' ? <ChevronUp size={14} className="text-rose-500" /> : <ChevronDown size={14} className="text-emerald-500" />}
                        </div>
                      </div>
                      <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500" style={{ width: `${(problem.impactHours / 150) * 100}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const EquipmentDashboard = ({ stats, onDrillDown }: { stats: EquipmentStats, onDrillDown: (type: string, title: string) => void }) => {
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">设备主题分析</h2>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-50 flex items-center gap-2">
            <Download size={14} /> 导出报告
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        <div 
          className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm cursor-pointer hover:border-emerald-500 transition-all"
          onClick={() => onDrillDown('EQUIPMENT_ACTIVE', '设备完好率明细')}
        >
          <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">设备完好率</p>
          <h3 className="text-2xl font-bold text-emerald-600">{stats.soundnessRate}%</h3>
          <div className="mt-2 h-1 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500" style={{ width: `${stats.soundnessRate}%` }}></div>
          </div>
        </div>
        <div 
          className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm cursor-pointer hover:border-blue-500 transition-all"
          onClick={() => onDrillDown('EQUIPMENT_OPERATION', '设备运行率明细')}
        >
          <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">设备运行率</p>
          <h3 className="text-2xl font-bold text-blue-600">{stats.operationRate}%</h3>
          <div className="mt-2 h-1 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500" style={{ width: `${stats.operationRate}%` }}></div>
          </div>
        </div>
        <div 
          className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm cursor-pointer hover:border-rose-500 transition-all"
          onClick={() => onDrillDown('EQUIPMENT_FAULT', '待处理故障明细')}
        >
          <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">待处理故障</p>
          <h3 className="text-2xl font-bold text-rose-600">{stats.pendingFaults} <span className="text-xs font-normal text-gray-400">项</span></h3>
          <p className="text-[10px] text-rose-500 mt-1 font-medium">需紧急处理</p>
        </div>
        <div 
          className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm cursor-pointer hover:border-amber-500 transition-all"
          onClick={() => onDrillDown('EQUIPMENT_MAINTENANCE', '维保设备明细')}
        >
          <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">维保设备</p>
          <h3 className="text-2xl font-bold text-amber-600">{stats.maintenanceDevices} <span className="text-xs font-normal text-gray-400">台</span></h3>
          <p className="text-[10px] text-amber-500 mt-1 font-medium">计划维保中</p>
        </div>
        <div 
          className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm cursor-pointer hover:border-indigo-500 transition-all"
          onClick={() => onDrillDown('EQUIPMENT_OEE', '综合OEE明细')}
        >
          <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">综合OEE</p>
          <h3 className="text-2xl font-bold text-indigo-600">{stats.overallOEE}%</h3>
          <p className="text-[10px] text-indigo-400 mt-1 font-medium">全厂平均水平</p>
        </div>
        <div 
          className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm cursor-pointer hover:border-gray-400 transition-all"
          onClick={() => onDrillDown('EQUIPMENT_TOTAL', '总设备明细')}
        >
          <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">总设备数</p>
          <h3 className="text-2xl font-bold text-gray-900">{stats.totalDevices} <span className="text-xs font-normal text-gray-400">台</span></h3>
          <p className="text-[10px] text-emerald-500 mt-1 font-medium">{stats.activeDevices} 台运行中</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
              <TrendingUp size={16} className="text-blue-600" />
              设备OEE趋势分析
            </h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span className="text-[10px] text-gray-500">OEE</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="text-[10px] text-gray-500">可用率</span>
              </div>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.oeeTrend}>
                <defs>
                  <linearGradient id="colorOee" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} domain={[0, 100]} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="oee" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorOee)" name="OEE" />
                <Area type="monotone" dataKey="availability" stroke="#10B981" strokeWidth={2} fill="transparent" name="可用率" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2 mb-6">
            <AlertTriangle size={16} className="text-rose-600" />
            故障类型分布
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie
                  data={stats.faultDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="count"
                  nameKey="category"
                >
                  {stats.faultDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </RePieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {stats.faultDistribution.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></div>
                  <span className="text-gray-600">{item.category}</span>
                </div>
                <span className="font-bold">{item.count} 次</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2 mb-6">
          <ClipboardCheck size={16} className="text-amber-600" />
          近期维保计划
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.maintenancePlans.map((plan) => (
            <div key={plan.id} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-amber-200 transition-colors group">
              <div className="flex justify-between items-start mb-3">
                <div className="p-2 bg-white rounded-xl shadow-sm group-hover:text-amber-600 transition-colors">
                  <Settings size={18} />
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  plan.status === '已完成' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {plan.status}
                </span>
              </div>
              <h4 className="font-bold text-gray-800 text-sm">{plan.deviceName}</h4>
              <p className="text-xs text-gray-500 mt-1">{plan.type}</p>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
                  <Calendar size={12} />
                  {plan.date}
                </div>
                <button className="text-[10px] font-bold text-blue-600 hover:underline">查看详情</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProcurementDashboard = ({ stats, onDrillDown }: { stats: ProcurementStats, onDrillDown: (type: string, title: string) => void }) => {
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">采购主题分析</h2>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-50 flex items-center gap-2">
            <Download size={14} /> 导出报表
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div 
          className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm cursor-pointer hover:border-blue-500 transition-all"
          onClick={() => onDrillDown('PROCUREMENT_ORDERS', '采购订单明细')}
        >
          <p className="text-xs text-gray-400 font-bold uppercase mb-1">采购订单总数</p>
          <h3 className="text-3xl font-bold text-blue-600">{stats.totalPurchaseOrders} <span className="text-sm font-normal text-gray-400">份</span></h3>
          <p className="text-[10px] text-gray-400 mt-1 font-medium">本月新增订单</p>
        </div>
        <div 
          className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm cursor-pointer hover:border-amber-500 transition-all"
          onClick={() => onDrillDown('PROCUREMENT_PENDING', '待到货明细')}
        >
          <p className="text-xs text-gray-400 font-bold uppercase mb-1">待到货订单</p>
          <h3 className="text-3xl font-bold text-amber-600">{stats.pendingOrders} <span className="text-sm font-normal text-gray-400">份</span></h3>
          <p className="text-[10px] text-amber-500 mt-1 font-medium">需重点关注到货进度</p>
        </div>
        <div 
          className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm cursor-pointer hover:border-emerald-500 transition-all"
          onClick={() => onDrillDown('PROCUREMENT_ONTIME', '到货准时率明细')}
        >
          <p className="text-xs text-gray-400 font-bold uppercase mb-1">到货准时率</p>
          <h3 className="text-3xl font-bold text-emerald-600">{stats.onTimeArrivalRate}%</h3>
          <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500" style={{ width: `${stats.onTimeArrivalRate}%` }}></div>
          </div>
        </div>
        <div 
          className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm cursor-pointer hover:border-rose-500 transition-all"
          onClick={() => onDrillDown('PROCUREMENT_COST', '采购成本明细')}
        >
          <p className="text-xs text-gray-400 font-bold uppercase mb-1">采购成本偏差</p>
          <h3 className="text-3xl font-bold text-rose-600">{stats.procurementCost.trend}%</h3>
          <p className="text-[10px] text-rose-500 mt-1 font-medium">较预算节省 ¥50.0万</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2 mb-6">
            <TrendingUp size={16} className="text-blue-600" />
            采购趋势分析 (订单数 & 成本)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.procurementTrend}>
                <defs>
                  <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="cost" stroke="#3B82F6" fillOpacity={1} fill="url(#colorCost)" name="采购成本" />
                <Line type="monotone" dataKey="orderCount" stroke="#10B981" strokeWidth={2} name="订单数" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2 mb-6">
            <Users size={16} className="text-emerald-600" />
            核心供应商表现
          </h3>
          <div className="space-y-4">
            {stats.supplierPerformance.map((supplier, idx) => (
              <div key={idx} className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-gray-800">{supplier.name}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    supplier.riskLevel === 'LOW' ? 'bg-emerald-100 text-emerald-600' : 
                    supplier.riskLevel === 'MEDIUM' ? 'bg-amber-100 text-amber-600' : 'bg-rose-100 text-rose-600'
                  }`}>
                    {supplier.riskLevel === 'LOW' ? '低风险' : supplier.riskLevel === 'MEDIUM' ? '中风险' : '高风险'}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-[10px] text-gray-400">到货率</p>
                    <p className="text-xs font-bold text-blue-600">{supplier.deliveryRate}%</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400">合格率</p>
                    <p className="text-xs font-bold text-emerald-600">{supplier.qualityRate}%</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400">平均提前期</p>
                    <p className="text-xs font-bold text-gray-700">{supplier.leadTime}天</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
            <Truck size={16} className="text-blue-600" />
            关键物料到货监控
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">物料名称</th>
                <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">订单号</th>
                <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">数量</th>
                <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">计划到货</th>
                <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">状态</th>
                <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">生产影响</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {stats.materialArrivalStatus.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-xs font-bold text-gray-800">{item.materialName}</td>
                  <td className="px-6 py-4 text-xs text-gray-500 font-mono">{item.orderId}</td>
                  <td className="px-6 py-4 text-xs font-mono">{item.quantity}</td>
                  <td className="px-6 py-4 text-xs text-gray-500">{item.plannedArrival}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.status === 'RECEIVED' ? 'bg-emerald-100 text-emerald-600' : 
                      item.status === 'DELAYED' ? 'bg-rose-100 text-rose-600' : 
                      item.status === 'IN_TRANSIT' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {item.status === 'RECEIVED' ? '已收货' : item.status === 'DELAYED' ? '已延期' : item.status === 'IN_TRANSIT' ? '运输中' : '待发货'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center gap-1 text-[10px] font-bold ${
                      item.productionImpact === 'HIGH' ? 'text-rose-600' : 
                      item.productionImpact === 'MEDIUM' ? 'text-amber-600' : 'text-emerald-600'
                    }`}>
                      <AlertTriangle size={10} />
                      {item.productionImpact === 'HIGH' ? '高影响' : item.productionImpact === 'MEDIUM' ? '中影响' : '低影响'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const MaterialDashboard = ({ stats, onDrillDown }: { stats: MaterialStats, onDrillDown: (type: string, title: string) => void }) => {
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">物料主题分析</h2>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-50 flex items-center gap-2">
            <Download size={14} /> 导出报表
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div 
          className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm cursor-pointer hover:border-blue-500 transition-all"
          onClick={() => onDrillDown('MATERIAL_TURNOVER', '库存周转明细')}
        >
          <p className="text-xs text-gray-400 font-bold uppercase mb-1">库存周转率</p>
          <h3 className="text-3xl font-bold text-blue-600">{stats.inventoryTurnover} <span className="text-sm font-normal text-gray-400">次/年</span></h3>
          <div className="mt-2 flex items-center gap-1 text-[10px] text-emerald-600 font-bold">
            <TrendingUp size={12} />
            <span>较上月提升 0.3</span>
          </div>
        </div>
        <div 
          className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm cursor-pointer hover:border-rose-500 transition-all"
          onClick={() => onDrillDown('MATERIAL_STOCKOUT', '缺料预警明细')}
        >
          <p className="text-xs text-gray-400 font-bold uppercase mb-1">缺料预警</p>
          <h3 className="text-3xl font-bold text-rose-600">{stats.stockoutAlerts} <span className="text-sm font-normal text-gray-400">项</span></h3>
          <p className="text-[10px] text-rose-500 mt-1 font-medium">需立即采购</p>
        </div>
        <div 
          className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm cursor-pointer hover:border-emerald-500 transition-all"
          onClick={() => onDrillDown('MATERIAL_AVAILABILITY', '物料齐套明细')}
        >
          <p className="text-xs text-gray-400 font-bold uppercase mb-1">物料齐套率</p>
          <h3 className="text-3xl font-bold text-emerald-600">{stats.materialAvailability}%</h3>
          <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500" style={{ width: `${stats.materialAvailability}%` }}></div>
          </div>
        </div>
        <div 
          className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm cursor-pointer hover:border-gray-400 transition-all"
          onClick={() => onDrillDown('MATERIAL_TOTAL', '库存总额明细')}
        >
          <p className="text-xs text-gray-400 font-bold uppercase mb-1">库存总额</p>
          <h3 className="text-3xl font-bold text-gray-900">¥19.0 <span className="text-sm font-normal text-gray-400">M</span></h3>
          <p className="text-[10px] text-gray-400 mt-1 font-medium">包含在制品与原材料</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2 mb-6">
            <PieChart size={16} className="text-blue-600" />
            库存结构分析
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie
                  data={stats.inventoryStructure}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  nameKey="category"
                >
                  {stats.inventoryStructure.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `¥${(value / 10000).toFixed(1)}万`} />
              </RePieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {stats.inventoryStructure.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></div>
                  <span className="text-[10px] text-gray-600">{item.category}</span>
                </div>
                <span className="text-[10px] font-bold">{(item.value / 1000000).toFixed(1)}M</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2 mb-6">
            <TrendingUp size={16} className="text-emerald-600" />
            物料齐套率趋势
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.availabilityTrend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} domain={[80, 100]} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Line type="monotone" dataKey="rate" stroke="#10B981" strokeWidth={3} dot={{ r: 4, fill: '#10B981' }} name="齐套率" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
            <Box size={16} className="text-blue-600" />
            关键物料库存明细
          </h3>
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="搜索物料..." 
              className="text-[10px] px-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">物料名称</th>
                <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">分类</th>
                <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">当前库存</th>
                <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">安全库存</th>
                <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">状态</th>
                <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {stats.inventoryDetails.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-xs font-bold text-gray-800">{item.name}</td>
                  <td className="px-6 py-4 text-xs text-gray-500">{item.category}</td>
                  <td className="px-6 py-4 text-xs font-mono">{item.stock}</td>
                  <td className="px-6 py-4 text-xs font-mono text-gray-400">{item.unit}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.status === '预警' ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-[10px] font-bold text-blue-600 hover:underline">补货申请</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [mainTab, setMainTab] = useState<'SUBJECT' | 'DECISION'>('DECISION');
  const [subjectTab, setSubjectTab] = useState<'PLANNING' | 'PRODUCTION' | 'PROCUREMENT' | 'QUALITY' | 'MATERIAL' | 'EQUIPMENT' | 'PERSONNEL'>('PLANNING');
  const [decisionTab, setDecisionTab] = useState<'AI_INSIGHTS' | 'MANAGEMENT' | 'DECISION'>('MANAGEMENT');
  
  const [dashboardMode, setDashboardMode] = useState<'REALTIME' | 'ANALYSIS'>('REALTIME');
  const [productionSubTab, setProductionSubTab] = useState<'WORKSHOP' | 'TEAM' | 'WORKER' | 'PROBLEMS'>('WORKSHOP');
  const [selectedMachine, setSelectedMachine] = useState<MachineTool | null>(null);
  const [detailTab, setDetailTab] = useState<'PROGRESS' | 'HISTORY'>('PROGRESS');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<ProductionStatus | 'ALL'>('ALL');

  const [isDrillDownOpen, setIsDrillDownOpen] = useState(false);
  const [drillDownStack, setDrillDownStack] = useState<DrillDownData[]>([]);

  const [insights, setInsights] = useState<AIInsight[]>(mockDashboardStats.aiInsights || []);
  const [isGenerating, setIsGenerating] = useState(false);

  const stats = useMemo(() => {
    const total = mockMachineTools.length;
    const completed = mockMachineTools.filter(t => t.status === ProductionStatus.COMPLETED).length;
    const delayed = mockMachineTools.filter(t => t.status === ProductionStatus.DELAYED).length;
    const avgProgress = Math.round(mockMachineTools.reduce((acc, t) => acc + t.overallProgress, 0) / total);
    return { total, completed, delayed, avgProgress };
  }, []);

  const handleDrillDown = (type: string, title: string) => {
    let columns: { key: string; label: string }[] = [];
    let data: any[] = [];

    if (type.startsWith('ORDERS')) {
      columns = [
        { key: 'id', label: '项目号' },
        { key: 'customer', label: '客户名称' },
        { key: 'model', label: '产品型号' },
        { key: 'status', label: '当前状态' },
        { key: 'progress', label: '进度' },
        { key: 'date', label: '交付日期' },
      ];
      let sourceData = mockMachineTools;
      if (type === 'ORDERS_COMPLETED') {
        sourceData = mockMachineTools.filter(t => t.status === ProductionStatus.COMPLETED);
      } else if (type === 'ORDERS_DELAYED') {
        sourceData = mockMachineTools.filter(t => t.status === ProductionStatus.DELAYED);
      }
      data = sourceData.map(t => ({
        id: t.projectNumber,
        customer: t.customer,
        model: t.model,
        status: t.status,
        progress: `${t.overallProgress}%`,
        date: t.targetDate,
        _type: 'ORDER_DETAIL'
      }));
    } else if (type.startsWith('QUALITY')) {
      columns = [
        { key: 'id', label: '单据编号' },
        { key: 'item', label: '检验项/问题描述' },
        { key: 'result', label: '状态/结果' },
        { key: 'inspector', label: '责任人/检验员' },
        { key: 'date', label: '日期' },
      ];
      if (type === 'QUALITY_UNQUALIFIED' || type === 'QUALITY_REWORK') {
        data = mockDashboardStats.qualityStats.recentIssues.map(issue => ({
          id: issue.id,
          item: issue.title,
          result: issue.status,
          inspector: issue.reporter,
          date: issue.date,
          _type: 'QUALITY_DETAIL'
        }));
      } else {
        data = mockDashboardStats.qualityStats.qualityDetails.map(detail => ({
          id: detail.id,
          item: detail.name,
          result: `${detail.passRate}%`,
          inspector: '系统',
          date: '-',
          _type: 'QUALITY_DETAIL'
        }));
      }
    } else if (type.startsWith('PERSONNEL')) {
      columns = [
        { key: 'name', label: '人员/班组' },
        { key: 'id', label: '编号' },
        { key: 'team', label: '所属部门' },
        { key: 'hours', label: '工时/效率' },
        { key: 'efficiency', label: '达成率' },
      ];
      if (type === 'PERSONNEL_EFFICIENCY' || type === 'PERSONNEL_PASS_RATE') {
        data = mockDashboardStats.personnelStats!.workerRankings.map(worker => ({
          name: worker.workerName,
          id: `RANK-${worker.rank}`,
          team: '-',
          hours: `${worker.avgEfficiency}%`,
          efficiency: '99%', // Mock pass rate
          _type: 'PERSONNEL_DETAIL'
        }));
      } else {
        data = mockDashboardStats.personnelStats!.laborHourDetails.map(item => ({
          name: item.workerName,
          id: item.workerId,
          team: item.team,
          hours: `${item.hours}h`,
          efficiency: `${item.efficiency}%`,
          _type: 'PERSONNEL_DETAIL'
        }));
      }
    } else if (type.startsWith('EQUIPMENT')) {
      columns = [
        { key: 'id', label: '设备编号' },
        { key: 'name', label: '设备名称' },
        { key: 'status', label: '运行状态' },
        { key: 'oee', label: '当前OEE' },
        { key: 'lastMaintenance', label: '上次维保' },
      ];
      let sourceData = mockDashboardStats.equipmentStats!.devices;
      if (type === 'EQUIPMENT_FAULT') {
        sourceData = sourceData.filter(d => d.status === '故障' || d.status === '维修中');
      } else if (type === 'EQUIPMENT_MAINTENANCE') {
        sourceData = sourceData.filter(d => d.status === '维保中');
      } else if (type === 'EQUIPMENT_ACTIVE') {
        sourceData = sourceData.filter(d => d.status === '运行中');
      }
      data = sourceData.map(device => ({
        id: device.id,
        name: device.name,
        status: device.status,
        oee: `${device.oee}%`,
        lastMaintenance: device.lastMaintenance,
        _type: 'EQUIPMENT_DETAIL'
      }));
    } else if (type.startsWith('MATERIAL')) {
      columns = [
        { key: 'code', label: '物料编码' },
        { key: 'name', label: '物料名称' },
        { key: 'category', label: '物料类别' },
        { key: 'stock', label: '当前库存' },
        { key: 'status', label: '库存状态' },
      ];
      let sourceData = mockDashboardStats.materialStats!.inventoryDetails;
      if (type === 'MATERIAL_STOCKOUT') {
        sourceData = sourceData.filter(m => m.status === '预警' || m.status === '缺料');
      }
      data = sourceData.map(item => ({
        code: item.id,
        name: item.name,
        category: item.category,
        stock: item.stock,
        status: item.status,
        _type: 'MATERIAL_DETAIL'
      }));
    } else if (type.startsWith('PROCUREMENT')) {
      columns = [
        { key: 'id', label: '单据/供应商' },
        { key: 'name', label: '物料/项目' },
        { key: 'status', label: '状态' },
        { key: 'value', label: '数值/指标' },
        { key: 'date', label: '日期/周期' },
      ];
      if (type === 'PROCUREMENT_SUPPLIER') {
        data = mockDashboardStats.procurementStats!.supplierPerformance.map(s => ({
          id: s.name,
          name: '核心供应商',
          status: s.deliveryRate >= 95 ? '优秀' : '良好',
          value: `交付率: ${s.deliveryRate}%`,
          date: `周期: ${s.leadTime}天`,
          _type: 'PROCUREMENT_DETAIL'
        }));
      } else if (type === 'PROCUREMENT_MATERIAL') {
        data = mockDashboardStats.procurementStats!.materialArrivalStatus.map(m => ({
          id: m.materialName,
          name: m.materialName,
          status: m.status,
          value: `影响: ${m.productionImpact}`,
          date: m.plannedArrival,
          _type: 'PROCUREMENT_DETAIL'
        }));
      } else {
        data = [
          { id: 'PO-2024-001', name: '精密轴承', status: '已发货', value: '¥45,000', date: '2024-03-20', _type: 'PROCUREMENT_DETAIL' },
          { id: 'PO-2024-002', name: '特种钢材', status: '待确认', value: '¥120,000', date: '2024-03-25', _type: 'PROCUREMENT_DETAIL' },
          { id: 'PO-2024-003', name: '控制模块', status: '生产中', value: '¥88,000', date: '2024-03-22', _type: 'PROCUREMENT_DETAIL' },
          { id: 'PO-2024-004', name: '液压系统', status: '已到货', value: '¥210,000', date: '2024-03-15', _type: 'PROCUREMENT_DETAIL' },
        ];
      }
    } else {
      columns = [{ key: 'info', label: '信息' }];
      data = [{ info: '暂无明细数据' }];
    }

    setDrillDownStack([{ title, columns, data }]);
    setIsDrillDownOpen(true);
  };

  const handleRowClick = (row: any) => {
    let nextTitle = '';
    let nextColumns: { key: string; label: string }[] = [];
    let nextData: any[] = [];

    if (row._type === 'ORDER_DETAIL') {
      nextTitle = `${row.model} 部件进度明细`;
      nextColumns = [
        { key: 'partName', label: '部件名称' },
        { key: 'progress', label: '进度' },
        { key: 'status', label: '状态' },
        { key: 'responsible', label: '负责人' },
      ];
      nextData = [
        { partName: '主轴箱', progress: '100%', status: '已完工', responsible: '张工', _type: 'PART_DETAIL' },
        { partName: '床身', progress: '100%', status: '已完工', responsible: '李工', _type: 'PART_DETAIL' },
        { partName: '刀库', progress: '45%', status: '加工中', responsible: '王工', _type: 'PART_DETAIL' },
        { partName: '数控系统', progress: '100%', status: '已到货', responsible: '赵工', _type: 'PART_DETAIL' },
      ];
    } else if (row._type === 'EQUIPMENT_DETAIL') {
      nextTitle = `${row.name} 实时参数`;
      nextColumns = [
        { key: 'param', label: '参数项' },
        { key: 'value', label: '当前值' },
        { key: 'unit', label: '单位' },
        { key: 'status', label: '状态' },
      ];
      nextData = [
        { param: '主轴转速', value: '12000', unit: 'RPM', status: '正常' },
        { param: '主轴负载', value: '45', unit: '%', status: '正常' },
        { param: '切削液压力', value: '2.5', unit: 'MPa', status: '正常' },
        { param: '主轴温度', value: '42', unit: '℃', status: '正常' },
      ];
    } else if (row._type === 'PERSONNEL_DETAIL') {
      nextTitle = `${row.name} 任务清单`;
      nextColumns = [
        { key: 'task', label: '任务名称' },
        { key: 'order', label: '关联订单' },
        { key: 'status', label: '状态' },
        { key: 'deadline', label: '截止日期' },
      ];
      nextData = [
        { task: '主轴箱精加工', order: 'PRJ-2024-001', status: '进行中', deadline: '2024-03-18' },
        { task: '刀库组件装配', order: 'PRJ-2024-002', status: '待开始', deadline: '2024-03-20' },
      ];
    } else if (row._type === 'PART_DETAIL') {
      nextTitle = `${row.partName} 工序流转`;
      nextColumns = [
        { key: 'op', label: '工序' },
        { key: 'station', label: '工位' },
        { key: 'status', label: '状态' },
        { key: 'time', label: '预计工时' },
      ];
      nextData = [
        { op: '粗加工', station: 'A1', status: '已完成', time: '2.5h' },
        { op: '热处理', station: '外协', status: '已完成', time: '24h' },
        { op: '精加工', station: 'B2', status: '进行中', time: '4h' },
      ];
    }

    if (nextTitle) {
      setDrillDownStack(prev => [...prev, { title: nextTitle, columns: nextColumns, data: nextData }]);
    }
  };

  const handleBack = () => {
    setDrillDownStack(prev => {
      const next = prev.slice(0, -1);
      if (next.length === 0) setIsDrillDownOpen(false);
      return next;
    });
  };

  const handleJumpToTab = (index: number) => {
    setDrillDownStack(prev => prev.slice(0, index + 1));
  };

  const filteredTools = useMemo(() => {
    return mockMachineTools.filter(tool => {
      const matchesSearch = tool.model.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           tool.serialNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           tool.projectNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           tool.customer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = filterStatus === 'ALL' || tool.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, filterStatus]);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1A1A1A] font-sans selection:bg-blue-100">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-200 z-20 hidden lg:flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
              <Activity size={24} />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight text-gray-900">生产分析平台</h1>
              <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">Production Analysis</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-8 overflow-y-auto">
          {/* Decision Analysis Section */}
          <div>
            <p className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">管理决策</p>
            <div className="space-y-1">
              {[
                { id: 'MANAGEMENT', label: '管理概览', icon: LayoutDashboard },
                { id: 'AI_INSIGHTS', label: 'AI洞察', icon: Zap },
                { id: 'DECISION', label: '决策建议', icon: TrendingUp },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setMainTab('DECISION');
                    setDecisionTab(item.id as any);
                    setSelectedMachine(null);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                    mainTab === 'DECISION' && decisionTab === item.id 
                      ? 'bg-indigo-50 text-indigo-600 shadow-sm' 
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                  }`}
                >
                  <item.icon size={18} />
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Subject Analysis Section */}
          <div>
            <p className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">主题分析</p>
            <div className="space-y-1">
              {[
                { id: 'PLANNING', label: '计划主题', icon: Calendar },
                { id: 'PRODUCTION', label: '生产主题', icon: Layers },
                { id: 'PROCUREMENT', label: '采购主题', icon: Truck },
                { id: 'QUALITY', label: '质量主题', icon: ShieldCheck },
                { id: 'MATERIAL', label: '物料主题', icon: Box },
                { id: 'EQUIPMENT', label: '设备主题', icon: Cpu },
                { id: 'PERSONNEL', label: '人员主题', icon: Users },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setMainTab('SUBJECT');
                    setSubjectTab(item.id as any);
                    setSelectedMachine(null);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                    mainTab === 'SUBJECT' && subjectTab === item.id 
                      ? 'bg-blue-50 text-blue-600 shadow-sm' 
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                  }`}
                >
                  <item.icon size={18} />
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-2">当前角色</p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
                王
              </div>
              <div>
                <p className="text-sm font-semibold">生产副总</p>
                <p className="text-[10px] text-gray-400">管理决策权限</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            {selectedMachine && (
              <button 
                onClick={() => setSelectedMachine(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500"
              >
                <ArrowLeft size={20} />
              </button>
            )}
            <div className="relative w-full group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="生产问题，问问小禾..."
                className="w-full pl-10 pr-12 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm hover:bg-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    window.location.href = `http://210.12.53.106:116/interaction?q=${encodeURIComponent(searchQuery)}`;
                  }
                }}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 pointer-events-none">
                <Sparkles size={14} className="text-amber-500 animate-pulse" />
                <span className="text-[10px] font-bold text-gray-300 uppercase tracking-tighter">AI</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all relative">
              <Zap size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-gray-200 mx-2"></div>
            <div className="flex items-center gap-3 pl-2">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-gray-800">王经理</p>
                <p className="text-[10px] text-gray-400 font-bold">生产副总</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-sm">
                王
              </div>
            </div>
          </div>
        </header>

        <div className="p-6 flex-1 max-w-7xl w-full mx-auto">
          <AnimatePresence mode="wait">
            {selectedMachine ? (
              <motion.div 
                key="detail"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Detail Header Info */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-bold font-mono">{selectedMachine.projectNumber}</span>
                          <h3 className="text-2xl font-bold">{selectedMachine.model}</h3>
                          <StatusBadge status={selectedMachine.status} />
                          <KittingBadge status={selectedMachine.kittingStatus} />
                        </div>
                        <p className="text-gray-400 text-sm font-mono">序列号: {selectedMachine.serialNumber} | 客户: {selectedMachine.customer}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">总进度</p>
                        <p className="text-3xl font-black text-blue-600">{selectedMachine.overallProgress}%</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                           <span className="font-medium text-gray-600">整机装配进度</span>
                          <span className="font-mono text-blue-600">{selectedMachine.finalAssemblyProgress}%</span>
                        </div>
                        <ProgressBar progress={selectedMachine.finalAssemblyProgress} height={10} />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-50">
                        <div>
                          <p className="text-xs text-gray-400 mb-1">开始日期</p>
                          <p className="text-sm font-semibold">{selectedMachine.startDate}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 mb-1">预计交付</p>
                          <p className="text-sm font-semibold text-blue-600">{selectedMachine.targetDate}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-center items-center text-center">
                    <div className="w-24 h-24 rounded-full border-8 border-blue-50 flex items-center justify-center mb-4 relative">
                      <svg className="w-full h-full -rotate-90">
                        <circle
                          cx="48"
                          cy="48"
                          r="40"
                          fill="transparent"
                          stroke="currentColor"
                          strokeWidth="8"
                          className="text-blue-600"
                          strokeDasharray={251.2}
                          strokeDashoffset={251.2 * (1 - selectedMachine.overallProgress / 100)}
                        />
                      </svg>
                      <span className="absolute text-xl font-bold">{selectedMachine.overallProgress}%</span>
                    </div>
                    <h4 className="font-bold text-gray-800">生产健康度</h4>
                    <p className="text-xs text-gray-400 mt-1 px-4">基于部装和零件生产进度的综合评估</p>
                    
                    {selectedMachine.missingItems && selectedMachine.missingItems.length > 0 && (
                      <div className="w-full mt-4 text-left">
                        <MissingItemsList items={selectedMachine.missingItems} />
                      </div>
                    )}
                    
                    <button className="mt-6 w-full py-2 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors">
                      导出生产报告
                    </button>
                  </div>
                </div>

                {/* Tabs for Detail View */}
                <div className="flex border-b border-gray-200">
                  <button 
                    onClick={() => setDetailTab('PROGRESS')}
                    className={`px-6 py-3 text-sm font-bold transition-all border-b-2 ${
                      detailTab === 'PROGRESS' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    进度详情
                  </button>
                  <button 
                    onClick={() => setDetailTab('HISTORY')}
                    className={`px-6 py-3 text-sm font-bold transition-all border-b-2 ${
                      detailTab === 'HISTORY' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    生产履历
                  </button>
                </div>

                {detailTab === 'PROGRESS' ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-gray-800 flex items-center gap-2">
                        <Layers size={18} className="text-blue-600" />
                        部件部装与零件进度
                      </h4>
                      <div className="flex gap-2">
                        <button className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50">
                          展开全部
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      {selectedMachine.subAssemblies.length > 0 ? (
                        selectedMachine.subAssemblies.map((sa) => (
                          <SubAssemblyRow key={sa.id} sa={sa} />
                        ))
                      ) : (
                        <div className="bg-white p-12 rounded-2xl border border-dashed border-gray-300 text-center">
                          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                            <Layers size={32} />
                          </div>
                          <h5 className="font-bold text-gray-800">暂无部装数据</h5>
                          <p className="text-sm text-gray-400 mt-1">该产品的部装计划尚未初始化或已直接进入总装阶段</p>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-6">
                      <History size={18} className="text-blue-600" />
                      整机生产履历
                    </h4>
                    <ProductionHistory history={selectedMachine.productionHistory} />
                  </div>
                )}
              </motion.div>
            ) : mainTab === 'DECISION' ? (
              <motion.div
                key="decision-group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {decisionTab === 'AI_INSIGHTS' && (
                  <AIInsightsDashboard 
                    insights={insights} 
                    isGenerating={isGenerating} 
                  />
                )}
                {decisionTab === 'MANAGEMENT' && <ManagementDashboard stats={mockDashboardStats} onDrillDown={handleDrillDown} />}
                {decisionTab === 'DECISION' && <DecisionSupport />}
              </motion.div>
            ) : (
              <motion.div
                key="subject-group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {subjectTab === 'PLANNING' && <PlanningDashboard />}
                {subjectTab === 'PRODUCTION' && (
                  <div className="space-y-6">
                    {/* Stats always at top */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {[
                        { label: '总订单数', value: mockDashboardStats.totalOrders, icon: Box, color: 'text-blue-600', bg: 'bg-blue-50', type: 'ORDERS_TOTAL' },
                        { label: '平均进度', value: `${mockDashboardStats.averageProgress}%`, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50', type: 'ORDERS_TOTAL' },
                        { label: '已交付', value: mockDashboardStats.completedOrders, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50', type: 'ORDERS_COMPLETED' },
                        { label: '延期预警', value: mockDashboardStats.delayedOrders, icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50', type: 'ORDERS_DELAYED' },
                      ].map((stat, i) => (
                        <div 
                          key={i} 
                          className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm cursor-pointer hover:border-blue-500 transition-all"
                          onClick={() => handleDrillDown(stat.type, `${stat.label}明细`)}
                        >
                          <div className="flex justify-between items-start mb-4">
                            <div className={`${stat.bg} ${stat.color} p-2.5 rounded-xl`}>
                              <stat.icon size={20} />
                            </div>
                            <MoreVertical size={16} className="text-gray-300 cursor-pointer" />
                          </div>
                          <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                          <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                        </div>
                      ))}
                    </div>

                    {/* Dashboard Header with Mode Toggle and Sub-tabs */}
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        {/* Main Toggle */}
                        <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-xl">
                          <button
                            onClick={() => setDashboardMode('REALTIME')}
                            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                              dashboardMode === 'REALTIME' 
                                ? 'bg-white text-blue-600 shadow-sm' 
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                          >
                            产品进度
                          </button>
                          <button
                            onClick={() => setDashboardMode('ANALYSIS')}
                            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                              dashboardMode === 'ANALYSIS' 
                                ? 'bg-white text-blue-600 shadow-sm' 
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                          >
                            管理决策
                          </button>
                        </div>

                        {/* Sub-tabs for Analysis Mode - Side by Side */}
                        {dashboardMode === 'ANALYSIS' && (
                          <div className="flex items-center gap-2 p-1 bg-gray-100/50 rounded-xl">
                            {[
                              { id: 'WORKSHOP', label: '车间分析', icon: Layers },
                              { id: 'TEAM', label: '班组分析', icon: Users },
                              { id: 'WORKER', label: '工人分析', icon: User },
                              { id: 'PROBLEMS', label: '生产问题', icon: AlertTriangle },
                            ].map((tab) => (
                              <button
                                key={tab.id}
                                onClick={() => setProductionSubTab(tab.id as any)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                                  productionSubTab === tab.id 
                                    ? 'bg-white text-blue-600 shadow-sm' 
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
                              >
                                <tab.icon size={14} />
                                {tab.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                          <input
                            type="text"
                            placeholder="搜索项目、型号..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all w-64"
                          />
                        </div>
                      </div>
                    </div>

                    {dashboardMode === 'REALTIME' ? (
                      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
                          <div className="flex items-center gap-2">
                            <Filter size={16} className="text-gray-400" />
                            <span className="text-sm font-medium text-gray-600">筛选状态:</span>
                            <div className="flex gap-1">
                              {['ALL', ...Object.values(ProductionStatus)].map((status) => (
                                <button
                                  key={status}
                                  onClick={() => setFilterStatus(status as any)}
                                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                                    filterStatus === status 
                                      ? 'bg-blue-600 text-white shadow-md shadow-blue-200' 
                                      : 'text-gray-500 hover:bg-gray-100'
                                  }`}
                                >
                                  {status === 'ALL' ? '全部' : status}
                                </button>
                              ))}
                            </div>
                          </div>
                          <div className="text-xs text-gray-400 font-mono">
                            显示 {filteredTools.length} 条记录
                          </div>
                        </div>

                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="bg-gray-50/50">
                                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">项目号 / 型号</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">齐套状态</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">生产状态</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">总进度</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">交付日期</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-right">操作</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                              {filteredTools.map((tool) => (
                                <tr 
                                  key={tool.id} 
                                  className="hover:bg-blue-50/30 transition-colors cursor-pointer group"
                                  onClick={() => setSelectedMachine(tool)}
                                >
                                  <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                      <span className="text-xs text-blue-600 font-bold font-mono mb-0.5">{tool.projectNumber}</span>
                                      <span className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{tool.model}</span>
                                      <span className="text-[10px] text-gray-400 font-mono">SN: {tool.serialNumber}</span>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4">
                                    <KittingBadge status={tool.kittingStatus} />
                                  </td>
                                  <td className="px-6 py-4">
                                    <StatusBadge status={tool.status} />
                                  </td>
                                  <td className="px-6 py-4 min-w-[160px]">
                                    <div className="flex items-center gap-3">
                                      <div className="flex-1">
                                        <ProgressBar progress={tool.overallProgress} />
                                      </div>
                                      <span className="text-xs font-mono font-bold text-gray-700">{tool.overallProgress}%</span>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                      <Calendar size={14} className="text-gray-400" />
                                      {tool.targetDate}
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 text-right">
                                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                                      <ChevronRight size={18} />
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : (
                      <ProductionAnalysisDashboard stats={mockDashboardStats.productionAnalysis!} activeSubTab={productionSubTab} onDrillDown={handleDrillDown} />
                    )}
                  </div>
                )}
                {subjectTab === 'QUALITY' && <QualityDashboard quality={mockDashboardStats.qualityStats} onDrillDown={handleDrillDown} />}
                {subjectTab === 'PERSONNEL' && <PersonnelPerformanceDashboard stats={mockDashboardStats.personnelStats!} onDrillDown={handleDrillDown} />}
                {subjectTab === 'EQUIPMENT' && <EquipmentDashboard stats={mockDashboardStats.equipmentStats!} onDrillDown={handleDrillDown} />}
                {subjectTab === 'MATERIAL' && <MaterialDashboard stats={mockDashboardStats.materialStats!} onDrillDown={handleDrillDown} />}
                {subjectTab === 'PROCUREMENT' && <ProcurementDashboard stats={mockDashboardStats.procurementStats!} onDrillDown={handleDrillDown} />}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <AnimatePresence>
        {isDrillDownOpen && (
          <DrillDownModal 
            isOpen={isDrillDownOpen} 
            onClose={() => {
              setIsDrillDownOpen(false);
              setDrillDownStack([]);
            }} 
            stack={drillDownStack}
            onBack={handleBack}
            onRowClick={handleRowClick}
            onJumpToTab={handleJumpToTab}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
