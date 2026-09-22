import React from 'react';
import {
  Users,
  Activity,
  AlertOctagon,
  AlertTriangle,
  TrendingUp,
  ArrowUpRight,
  Bed,
  HeartPulse,
  Clock,
  ChevronRight,
  ShieldAlert,
  BarChart3,
  Stethoscope,
  Info,
} from 'lucide-react';
import { Patient, PatientAlert, RiskLevel } from '../../types';

interface HospitalDashboardProps {
  patients: Patient[];
  alerts: PatientAlert[];
  onSelectPatient: (patientId: string) => void;
  onNavigateView: (viewId: string) => void;
}

export const HospitalDashboard: React.FC<HospitalDashboardProps> = ({
  patients,
  alerts,
  onSelectPatient,
  onNavigateView,
}) => {
  const criticalPatients = patients.filter((p) => p.overallRisk === 'Critical');
  const highRiskPatients = patients.filter((p) => p.overallRisk === 'High');
  const activeAlerts = alerts.filter((a) => !a.read);

  // High-Risk Patients sorted for the priority table
  const priorityPatients = [...patients].sort((a, b) => {
    const score = (r: RiskLevel) => (r === 'Critical' ? 4 : r === 'High' ? 3 : r === 'Medium' ? 2 : 1);
    return score(b.overallRisk) - score(a.overallRisk);
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">Hospital Overview</h1>
            <span className="px-2 py-0.5 text-xs font-semibold rounded bg-teal-100 text-teal-800 border border-teal-200">
              Live Intelligence
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time hospital intelligence and patient risk overview
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onNavigateView('monitoring')}
            className="px-3 sm:px-3.5 py-2 text-xs font-semibold bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg shadow-2xs flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer"
          >
            <Activity className="w-4 h-4 text-teal-600" />
            <span>Live ICU Telemetry</span>
          </button>
          <button
            onClick={() => onNavigateView('command')}
            className="px-3 sm:px-3.5 py-2 text-xs font-semibold bg-teal-700 hover:bg-teal-800 text-white rounded-lg shadow-2xs flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer"
          >
            <BarChart3 className="w-4 h-4 text-teal-200" />
            <span>Command Center</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Patients */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Inpatients</span>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-700">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">482</span>
              <span className="text-xs text-slate-500 font-medium">/ 520 Capacity</span>
            </div>
            <div className="mt-2 flex items-center text-xs text-emerald-700 font-medium">
              <TrendingUp className="w-3.5 h-3.5 mr-1" />
              <span>92.6% Census • 14 Admissions in 24h</span>
            </div>
          </div>
        </div>

        {/* ICU Patients */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">ICU Patients</span>
            <div className="p-2 rounded-lg bg-teal-50 text-teal-700">
              <Bed className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">64</span>
              <span className="text-xs text-slate-500 font-medium">/ 70 Beds (91.4%)</span>
            </div>
            <div className="mt-2 flex items-center text-xs text-amber-700 font-medium">
              <AlertTriangle className="w-3.5 h-3.5 mr-1" />
              <span>6 Step-Down candidates pending</span>
            </div>
          </div>
        </div>

        {/* Critical Patients */}
        <div className="bg-white p-5 rounded-xl border border-rose-200 bg-rose-50/20 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-800">Critical Patients</span>
            <div className="p-2 rounded-lg bg-rose-100 text-rose-700">
              <AlertOctagon className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-rose-900">14</span>
              <span className="text-xs text-rose-700 font-medium">Immediate Attending Triage</span>
            </div>
            <div className="mt-2 flex items-center text-xs text-rose-800 font-medium">
              <HeartPulse className="w-3.5 h-3.5 mr-1 text-rose-600" />
              <span>3 Refractory Shock • 2 ARDS</span>
            </div>
          </div>
        </div>

        {/* Active Alerts */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Active Alerts</span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-700">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{alerts.length}</span>
              <span className="text-xs text-amber-700 font-medium font-mono">{activeAlerts.length} Unacknowledged</span>
            </div>
            <div className="mt-2 flex items-center text-xs text-slate-600 font-medium">
              <Clock className="w-3.5 h-3.5 mr-1 text-slate-400" />
              <span>Avg. response time 2.4 mins</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: High-Risk Patient Table & Hospital Intelligence */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: High-Risk Patient Table */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden flex flex-col">
          <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
            <div>
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                High-Risk & Critical Patients
                <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-rose-100 text-rose-800">
                  Priority Action
                </span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Real-time risk scoring generated by MedBrain AI</p>
            </div>
            <button
              onClick={() => onNavigateView('patients')}
              className="text-xs font-semibold text-teal-700 hover:text-teal-900 flex items-center gap-1"
            >
              View all 482 patients
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[620px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-3 px-4">Patient</th>
                  <th className="py-3 px-3">Age / Sex</th>
                  <th className="py-3 px-3">Department</th>
                  <th className="py-3 px-3">AI Risk</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Latest Alert</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-medium">
                {priorityPatients.slice(0, 5).map((p) => (
                  <tr
                    key={p.id}
                    className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                    onClick={() => onSelectPatient(p.id)}
                  >
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                        {p.name}
                      </div>
                      <div className="text-[11px] font-mono text-slate-500">
                        {p.mrn} • {p.roomBed}
                      </div>
                    </td>
                    <td className="py-3.5 px-3 text-slate-700 font-mono">
                      {p.age}y / {p.gender}
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="px-2 py-0.5 rounded text-[11px] bg-slate-100 text-slate-800 font-medium">
                        {p.department}
                      </span>
                    </td>
                    <td className="py-3.5 px-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold ${
                          p.overallRisk === 'Critical'
                            ? 'bg-rose-100 text-rose-800 border border-rose-200'
                            : p.overallRisk === 'High'
                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                            : 'bg-teal-50 text-teal-800 border border-teal-200'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                            p.overallRisk === 'Critical'
                              ? 'bg-rose-600'
                              : p.overallRisk === 'High'
                              ? 'bg-amber-600'
                              : 'bg-teal-600'
                          }`}
                        />
                        {p.overallRisk}
                      </span>
                    </td>
                    <td className="py-3.5 px-3">
                      <span
                        className={`text-[11px] font-semibold ${
                          p.currentStatus === 'Critical' ? 'text-rose-700' : 'text-slate-700'
                        }`}
                      >
                        {p.currentStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 max-w-[200px]">
                      <div className="truncate text-slate-600 text-[11px]" title={p.latestAlert}>
                        {p.latestAlert || 'Vitals stable on current infusion'}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectPatient(p.id);
                        }}
                        className="px-2.5 py-1 text-xs font-semibold bg-teal-50 text-teal-700 hover:bg-teal-100 rounded border border-teal-200 inline-flex items-center gap-1 transition-colors"
                      >
                        <span>Open 360°</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 1 Col: Hospital Intelligence & Deterioration Trends */}
        <div className="space-y-6">
          {/* Patient Risk Distribution */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center justify-between">
              <span>Patient Risk Stratification</span>
              <span className="text-[11px] font-normal text-slate-400">482 Census</span>
            </h3>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-rose-700 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-rose-600" />
                    Critical Risk (14 patients)
                  </span>
                  <span className="font-mono text-slate-700">2.9%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-rose-600 h-2 rounded-full" style={{ width: '8%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-amber-700 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    High Risk (48 patients)
                  </span>
                  <span className="font-mono text-slate-700">10.0%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: '22%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-teal-700 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-teal-500" />
                    Medium Risk (124 patients)
                  </span>
                  <span className="font-mono text-slate-700">25.7%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-teal-500 h-2 rounded-full" style={{ width: '42%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-600 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-slate-400" />
                    Low Risk / Stable (296 patients)
                  </span>
                  <span className="font-mono text-slate-700">61.4%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-slate-400 h-2 rounded-full" style={{ width: '61%' }} />
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Model: Sepsis & Decompensation v4</span>
              <span className="font-semibold text-teal-700">Recalculated every 60s</span>
            </div>
          </div>

          {/* ICU Occupancy by Department */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center justify-between">
              <span>ICU Unit Capacity</span>
              <span className="text-[11px] font-mono text-slate-500">64 / 70 Beds</span>
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-2 rounded bg-slate-50">
                <span className="font-medium text-slate-800">Medical ICU (MICU)</span>
                <span className="font-mono font-bold text-rose-700">23 / 24 (95.8%)</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-50">
                <span className="font-medium text-slate-800">Cardiac ICU (CICU)</span>
                <span className="font-mono font-bold text-amber-700">15 / 16 (93.7%)</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-50">
                <span className="font-medium text-slate-800">Surgical Trauma ICU (STICU)</span>
                <span className="font-mono font-bold text-slate-800">16 / 18 (88.9%)</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-50">
                <span className="font-medium text-slate-800">Neuro ICU (NICU)</span>
                <span className="font-mono font-bold text-slate-800">10 / 12 (83.3%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Active Triage Alert Feed */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              Critical & Warning Hospital Alerts (Live Stream)
            </h3>
            <p className="text-xs text-slate-500">Real-time clinical triggers and operational notifications</p>
          </div>
          <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
            Updated just now
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {alerts.slice(0, 3).map((alert) => (
            <div
              key={alert.id}
              className={`p-3.5 rounded-lg border flex flex-col justify-between ${
                alert.type === 'Critical'
                  ? 'bg-rose-50/40 border-rose-200'
                  : alert.type === 'Warning'
                  ? 'bg-amber-50/40 border-amber-200'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div>
                <div className="flex items-start justify-between">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      alert.type === 'Critical'
                        ? 'bg-rose-600 text-white'
                        : 'bg-amber-500 text-white'
                    }`}
                  >
                    {alert.type} Alert
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">{alert.timestamp}</span>
                </div>
                <div className="text-xs font-bold text-slate-900 mt-2">{alert.title}</div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{alert.message}</p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                <div className="font-mono text-slate-600 text-[11px]">
                  {alert.patientName} • {alert.bed}
                </div>
                {alert.patientId.startsWith('PT-') && !alert.patientId.includes('SYS') && (
                  <button
                    onClick={() => onSelectPatient(alert.patientId)}
                    className="text-teal-700 font-bold hover:text-teal-900 text-xs flex items-center gap-0.5"
                  >
                    Triage <ArrowUpRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
