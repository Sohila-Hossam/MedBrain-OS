import React, { useState } from 'react';
import {
  ShieldAlert,
  AlertOctagon,
  AlertTriangle,
  Info,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  UserCheck,
  PhoneCall,
  VolumeX,
  Filter,
} from 'lucide-react';
import { PatientAlert } from '../../types';

interface AlertsTriageProps {
  alerts: PatientAlert[];
  onSelectPatient: (patientId: string) => void;
}

export const AlertsTriage: React.FC<AlertsTriageProps> = ({ alerts: initialAlerts, onSelectPatient }) => {
  const [alerts, setAlerts] = useState<PatientAlert[]>(initialAlerts);
  const [filter, setFilter] = useState<'All' | 'Critical' | 'Warning' | 'Unread'>('All');

  const handleAcknowledge = (id: string) => {
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, read: true } : a)));
  };

  const filteredAlerts = alerts.filter((a) => {
    if (filter === 'Critical') return a.type === 'Critical';
    if (filter === 'Warning') return a.type === 'Warning';
    if (filter === 'Unread') return !a.read;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">Alerts & Triage</h1>
            <span className="px-2.5 py-0.5 text-xs font-bold rounded bg-teal-100 text-teal-800 border border-teal-200">
              AI Alarm Fatigue Filter Active
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time multi-tier clinical alert stream with intelligent artifact suppression and automated triage
          </p>
        </div>

        {/* Alarm Fatigue Metric Callout */}
        <div className="flex items-center space-x-3 text-xs bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
          <VolumeX className="w-4 h-4 text-teal-600" />
          <span>
            Telemetry artifact suppression: <strong className="text-slate-900">84.1% noise eliminated</strong>
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-1">
        {(['All', 'Critical', 'Warning', 'Unread'] as const).map((tab) => {
          const count =
            tab === 'All'
              ? alerts.length
              : tab === 'Critical'
              ? alerts.filter((a) => a.type === 'Critical').length
              : tab === 'Warning'
              ? alerts.filter((a) => a.type === 'Warning').length
              : alerts.filter((a) => !a.read).length;

          return (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 sm:px-3.5 py-1.5 text-xs font-bold rounded-lg border transition-all flex items-center space-x-2 whitespace-nowrap shrink-0 cursor-pointer ${
                filter === tab
                  ? 'bg-teal-700 text-white border-teal-700 shadow-2xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span>{tab === 'Unread' ? 'Unacknowledged' : tab}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  filter === tab ? 'bg-teal-800 text-teal-100' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Alerts Feed */}
      <div className="space-y-3">
        {filteredAlerts.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-500 bg-white rounded-xl border border-slate-200">
            No alerts found under the "{filter}" category. All systems operating within normal parameters.
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const isCritical = alert.type === 'Critical';
            const isWarning = alert.type === 'Warning';

            return (
              <div
                key={alert.id}
                className={`p-4 rounded-xl border transition-all bg-white shadow-2xs ${
                  isCritical
                    ? 'border-rose-300 ring-1 ring-rose-200'
                    : isWarning
                    ? 'border-amber-300 ring-1 ring-amber-200'
                    : 'border-slate-200'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                          isCritical
                            ? 'bg-rose-100 text-rose-800 border border-rose-200'
                            : isWarning
                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                            : 'bg-blue-50 text-blue-800 border border-blue-200'
                        }`}
                      >
                        {alert.type}
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-800">
                        {alert.bed} • {alert.patientName}
                      </span>
                      <span className="text-slate-400 text-xs font-mono">• {alert.timestamp}</span>
                      {alert.read && (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          ✓ Acknowledged
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm font-bold text-slate-900">{alert.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{alert.message}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 shrink-0">
                    {!alert.read && (
                      <button
                        onClick={() => handleAcknowledge(alert.id)}
                        className="px-3 py-1.5 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white rounded-lg shadow-2xs flex items-center gap-1.5 transition-colors"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Acknowledge</span>
                      </button>
                    )}

                    {alert.patientId.startsWith('PT-') && (
                      <button
                        onClick={() => onSelectPatient(alert.patientId)}
                        className="px-3 py-1.5 text-xs font-bold bg-teal-50 text-teal-800 hover:bg-teal-100 border border-teal-200 rounded-lg flex items-center gap-1 transition-colors"
                      >
                        <span>Open 360°</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
