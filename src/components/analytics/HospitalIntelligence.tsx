import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Bed,
  Clock,
  ShieldCheck,
  Users,
  Activity,
  Calendar,
  AlertTriangle,
  ArrowUpRight,
  TrendingDown,
} from 'lucide-react';

export const HospitalIntelligence: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Hospital Intelligence
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-bold rounded bg-teal-100 text-teal-800 border border-teal-200">
              Executive & Clinical Operations
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Operational flow, ICU capacity forecasting, readmission trends, and early-warning sensitivity
          </p>
        </div>

        {/* Time Filter */}
        <div className="flex items-center space-x-1.5 p-1 bg-slate-100 rounded-lg border border-slate-200">
          {(['7d', '30d', '90d'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${
                timeRange === range ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {range === '7d' ? 'Last 7 Days' : range === '30d' ? 'Last 30 Days' : 'Last Quarter'}
            </button>
          ))}
        </div>
      </div>

      {/* Operational KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-bold uppercase text-slate-500">
            <span>Average ICU Length of Stay</span>
            <Clock className="w-4 h-4 text-teal-600" />
          </div>
          <div className="mt-3 flex items-baseline space-x-1.5">
            <span className="text-3xl font-extrabold text-slate-900">4.2</span>
            <span className="text-xs text-slate-500 font-medium">Days</span>
          </div>
          <div className="mt-2 text-xs text-emerald-700 font-semibold flex items-center gap-1">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>▼ 0.8 days lower than regional benchmark</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-bold uppercase text-slate-500">
            <span>ED Triage-to-ICU Bed</span>
            <Bed className="w-4 h-4 text-blue-600" />
          </div>
          <div className="mt-3 flex items-baseline space-x-1.5">
            <span className="text-3xl font-extrabold text-slate-900">28</span>
            <span className="text-xs text-slate-500 font-medium">Minutes</span>
          </div>
          <div className="mt-2 text-xs text-emerald-700 font-semibold flex items-center gap-1">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>▼ 14m reduction with automated alerting</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-bold uppercase text-slate-500">
            <span>30-Day Readmission Rate</span>
            <Users className="w-4 h-4 text-teal-600" />
          </div>
          <div className="mt-3 flex items-baseline space-x-1.5">
            <span className="text-3xl font-extrabold text-slate-900">8.4%</span>
            <span className="text-xs text-slate-500 font-medium">Post-Discharge</span>
          </div>
          <div className="mt-2 text-xs text-emerald-700 font-semibold flex items-center gap-1">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>Target: &lt;10.5% (National avg: 13.8%)</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-bold uppercase text-slate-500">
            <span>Early Warning Sensitivity</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-3 flex items-baseline space-x-1.5">
            <span className="text-3xl font-extrabold text-emerald-700">96.2%</span>
            <span className="text-xs text-slate-500 font-medium">Lead Time 4.1h</span>
          </div>
          <div className="mt-2 text-xs text-slate-600 font-semibold">
            False alarm suppression: 84.1%
          </div>
        </div>
      </div>

      {/* Analytics Rows: Capacity Forecast & Workload Heatmap */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ICU Bed Capacity 7-Day Forecast */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">ICU Bed Demand Forecast (Next 7 Days)</h3>
              <p className="text-xs text-slate-500">Predictive census modeled from ED arrival trends & surgery schedules</p>
            </div>
            <span className="text-xs font-mono text-slate-500 bg-slate-50 px-2 py-0.5 rounded">
              Capacity: 70 Beds
            </span>
          </div>

          <div className="space-y-3 text-xs">
            {[
              { day: 'Friday (Today)', beds: 64, pct: 91, status: 'Tight' },
              { day: 'Saturday', beds: 66, pct: 94, status: 'Near Limit' },
              { day: 'Sunday', beds: 62, pct: 88, status: 'Stable' },
              { day: 'Monday', beds: 68, pct: 97, status: 'Action Required' },
              { day: 'Tuesday', beds: 65, pct: 92, status: 'Tight' },
              { day: 'Wednesday', beds: 60, pct: 85, status: 'Normal' },
              { day: 'Thursday', beds: 59, pct: 84, status: 'Normal' },
            ].map((d, i) => (
              <div key={i} className="flex items-center justify-between gap-4">
                <span className="w-28 font-medium text-slate-700 text-xs shrink-0">{d.day}</span>
                <div className="flex-1 bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className={`h-2.5 rounded-full ${
                      d.pct >= 95 ? 'bg-rose-600' : d.pct >= 90 ? 'bg-amber-500' : 'bg-teal-600'
                    }`}
                    style={{ width: `${d.pct}%` }}
                  />
                </div>
                <div className="w-24 text-right font-mono font-bold text-slate-800 text-xs shrink-0">
                  {d.beds} / 70 ({d.pct}%)
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nursing & Medical Staff Workload Distribution */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Clinical Acuity vs Staffing Ratio</h3>
              <p className="text-xs text-slate-500">Real-time nurse-to-patient acuity balancing</p>
            </div>
            <span className="text-xs font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded">
              Current Shift: Day 07:00-19:00
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900">Medical ICU (MICU)</div>
                <div className="text-[11px] text-slate-500">12 Nurses on duty • 23 Patients</div>
              </div>
              <span className="px-2.5 py-1 rounded bg-rose-100 text-rose-800 font-bold text-xs">
                1:1.9 (High Acuity)
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900">Cardiac ICU (CICU)</div>
                <div className="text-[11px] text-slate-500">8 Nurses on duty • 15 Patients</div>
              </div>
              <span className="px-2.5 py-1 rounded bg-amber-100 text-amber-800 font-bold text-xs">
                1:1.8 (Optimal)
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900">Surgical Trauma ICU (STICU)</div>
                <div className="text-[11px] text-slate-500">9 Nurses on duty • 16 Patients</div>
              </div>
              <span className="px-2.5 py-1 rounded bg-teal-100 text-teal-800 font-bold text-xs">
                1:1.7 (Balanced)
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900">Neuro ICU (NICU)</div>
                <div className="text-[11px] text-slate-500">6 Nurses on duty • 10 Patients</div>
              </div>
              <span className="px-2.5 py-1 rounded bg-teal-100 text-teal-800 font-bold text-xs">
                1:1.6 (Balanced)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
