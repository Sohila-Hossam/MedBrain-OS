import React, { useState } from 'react';
import {
  ShieldAlert,
  Activity,
  Bed,
  PhoneCall,
  Flame,
  Zap,
  Wind,
  Users,
  Radio,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Building,
} from 'lucide-react';

export const CommandCenter: React.FC = () => {
  const [dispatchConfirmed, setDispatchConfirmed] = useState<string | null>(null);

  const handleDispatch = (team: string) => {
    setDispatchConfirmed(team);
    setTimeout(() => setDispatchConfirmed(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Hospital Command Center
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-extrabold rounded bg-slate-900 text-white flex items-center gap-1.5">
              <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
              TACTICAL OPERATIONS ACTIVE
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time hospital operations, rapid response dispatch, surge bed management, and facility status
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono text-slate-500">
          <span>Command Watch Officer: Dr. Marcus Sterling, CMO</span>
        </div>
      </div>

      {dispatchConfirmed && (
        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-900 text-xs rounded-xl font-bold flex items-center justify-between">
          <span>
            🚨 Active Dispatch Broadcasted: {dispatchConfirmed} alerted via Hospital Paging & Digital Badges.
          </span>
          <span className="font-mono text-[11px] text-rose-700">ETA: &lt; 2 minutes</span>
        </div>
      )}

      {/* Rapid Response & Code Status Bar */}
      <div className="bg-slate-900 text-white rounded-xl p-5 shadow-lg border border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-teal-400">
              Immediate Tactical Clinical Response Teams
            </div>
            <div className="text-sm font-semibold text-slate-300 mt-0.5">
              Available 24/7 dedicated hospital resuscitation and early-intervention units
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => handleDispatch('Code Sepsis Team (MICU)')}
              className="px-3.5 py-2 text-xs font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-lg shadow-2xs flex items-center gap-1.5 transition-colors"
            >
              <ShieldAlert className="w-4 h-4 text-slate-950" />
              <span>Dispatch Code Sepsis</span>
            </button>

            <button
              onClick={() => handleDispatch('Rapid Response Medical Emergency Team (MET)')}
              className="px-3.5 py-2 text-xs font-bold bg-teal-600 hover:bg-teal-500 text-white rounded-lg shadow-2xs flex items-center gap-1.5 transition-colors"
            >
              <Activity className="w-4 h-4 text-white" />
              <span>Dispatch MET Team</span>
            </button>

            <button
              onClick={() => handleDispatch('Code Blue Resuscitation Team')}
              className="px-3.5 py-2 text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white rounded-lg shadow-2xs flex items-center gap-1.5 transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-white" />
              <span>Broadcast Code Blue</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid: Transfer Queue & Facility Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Emergency to ICU Transfer Queue */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-2xs p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Emergency Department &rarr; ICU Bed Transition Queue
              </h2>
              <p className="text-xs text-slate-500">Patients awaiting ICU placement or step-down transfer</p>
            </div>
            <span className="text-xs font-mono font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded border border-teal-200">
              4 Pending Transfers
            </span>
          </div>

          <div className="space-y-3">
            {[
              {
                patient: 'David K. (MRN-91204)',
                acuity: 'Critical',
                from: 'ED Bay 04',
                target: 'MICU Bed 08',
                delay: '14 mins',
                reason: 'Septic Shock; fluid refractory; vasopressor initiated',
              },
              {
                patient: 'Elena R. (MRN-77312)',
                acuity: 'High',
                from: 'STICU Bed 02',
                target: 'Step-Down Ward 4B',
                delay: '35 mins',
                reason: 'Extubated successfully; transfer to step-down unit pending bed turnaround',
              },
              {
                patient: 'Samuel T. (MRN-44829)',
                acuity: 'Critical',
                from: 'Cardiac Cath Lab',
                target: 'CICU Bed 11',
                delay: '8 mins',
                reason: 'Post-STEMI stenting with IABP support',
              },
              {
                patient: 'Miriam P. (MRN-55102)',
                acuity: 'High',
                from: 'PACU recovery',
                target: 'STICU Bed 14',
                delay: '22 mins',
                reason: 'Major open abdominal aortic repair',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-900">{item.patient}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.2 rounded ${
                        item.acuity === 'Critical' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {item.acuity}
                    </span>
                    <span className="text-slate-400 font-mono text-[11px]">Wait: {item.delay}</span>
                  </div>
                  <div className="text-slate-600 mt-1">
                    Routing: <strong className="text-slate-800">{item.from}</strong> &rarr;{' '}
                    <strong className="text-teal-700">{item.target}</strong>
                  </div>
                  <div className="text-slate-500 text-[11px] mt-0.5">{item.reason}</div>
                </div>

                <button
                  onClick={() => alert(`Bed turnaround prioritized for ${item.target}`)}
                  className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-semibold rounded-lg shrink-0 transition-colors text-xs"
                >
                  Expedite Bed Clean
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Critical Facility & Life-Support Systems */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5 space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900">Hospital Facility & Life-Support</h3>
            <p className="text-xs text-slate-500">Critical operational infrastructure monitoring</p>
          </div>

          <div className="space-y-3 text-xs">
            {/* O2 Supply */}
            <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <Wind className="w-4 h-4 text-cyan-600" />
                <div>
                  <div className="font-bold text-slate-800">Bulk Liquid Oxygen Tank</div>
                  <div className="text-[11px] text-slate-500">Line Pressure: 54 PSI (Normal)</div>
                </div>
              </div>
              <span className="font-mono font-bold text-emerald-700 text-xs">94% Full</span>
            </div>

            {/* Emergency Generators */}
            <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <Zap className="w-4 h-4 text-amber-500" />
                <div>
                  <div className="font-bold text-slate-800">Emergency Diesel Turbines</div>
                  <div className="text-[11px] text-slate-500">Dual Grid + 3 Generators on standby</div>
                </div>
              </div>
              <span className="font-mono font-bold text-emerald-700 text-xs">100% Ready</span>
            </div>

            {/* Negative Pressure Rooms */}
            <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <ShieldAlert className="w-4 h-4 text-teal-600" />
                <div>
                  <div className="font-bold text-slate-800">Airborne Isolation Beds</div>
                  <div className="text-[11px] text-slate-500">Negative pressure certified</div>
                </div>
              </div>
              <span className="font-mono font-bold text-teal-800 text-xs">8 / 12 In Use</span>
            </div>

            {/* Blood Bank Reserves */}
            <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <Flame className="w-4 h-4 text-rose-500" />
                <div>
                  <div className="font-bold text-slate-800">Blood Bank O-Negative Reserve</div>
                  <div className="text-[11px] text-slate-500">Massive transfusion protocol active</div>
                </div>
              </div>
              <span className="font-mono font-bold text-emerald-700 text-xs">38 Units (Safe)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
