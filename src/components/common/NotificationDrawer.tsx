import React, { useState } from 'react';
import { X, Bell, AlertOctagon, AlertTriangle, Info, CheckCircle2, ArrowUpRight, Check, Trash2 } from 'lucide-react';
import { PatientAlert, AlertType } from '../../types';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  alerts: PatientAlert[];
  onSelectPatient: (patientId: string) => void;
  onDismissAlert: (alertId: string) => void;
  onMarkAllRead: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  alerts,
  onSelectPatient,
  onDismissAlert,
  onMarkAllRead,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'All' | AlertType>('All');

  if (!isOpen) return null;

  const filteredAlerts = alerts.filter((a) => {
    if (selectedFilter === 'All') return true;
    return a.type === selectedFilter;
  });

  const unreadCount = alerts.filter((a) => !a.read).length;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-4 sm:pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl border-l border-slate-200 flex flex-col">
          {/* Header */}
          <div className="px-4 sm:px-5 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
                  Hospital Alert Center
                  {unreadCount > 0 && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-rose-500 text-white font-bold">
                      {unreadCount} Unread
                    </span>
                  )}
                </h2>
                <p className="text-xs text-slate-400">Live clinical & operational telemetry</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Action / Filter Bar */}
          <div className="px-3 sm:px-5 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-2 overflow-x-auto">
            <div className="flex space-x-1 shrink-0">
              {(['All', 'Critical', 'Warning', 'System', 'Research'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedFilter(tab)}
                  className={`text-xs px-2.5 py-1 rounded-md font-medium transition-colors ${
                    selectedFilter === tab
                      ? 'bg-slate-900 text-white shadow-2xs'
                      : 'text-slate-600 hover:bg-slate-200/70'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {unreadCount > 0 && (
              <button
                onClick={onMarkAllRead}
                className="text-[11px] text-teal-700 hover:text-teal-900 font-medium flex items-center gap-1"
              >
                <Check className="w-3 h-3" />
                Mark all read
              </button>
            )}
          </div>

          {/* Alert List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 p-3 space-y-2">
            {filteredAlerts.length === 0 ? (
              <div className="text-center py-16 text-slate-400">
                <CheckCircle2 className="w-10 h-10 mx-auto mb-2 text-emerald-500/60" />
                <p className="text-sm font-medium text-slate-600">No active alerts in this category</p>
                <p className="text-xs text-slate-400 mt-1">All telemetry thresholds currently stable</p>
              </div>
            ) : (
              filteredAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-3.5 rounded-lg border transition-all ${
                    alert.type === 'Critical'
                      ? 'bg-rose-50/50 border-rose-200'
                      : alert.type === 'Warning'
                      ? 'bg-amber-50/40 border-amber-200'
                      : alert.type === 'Research'
                      ? 'bg-purple-50/40 border-purple-200'
                      : 'bg-slate-50 border-slate-200'
                  } ${!alert.read ? 'ring-1 ring-slate-400/30' : 'opacity-85'}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center space-x-2">
                      {alert.type === 'Critical' ? (
                        <AlertOctagon className="w-4 h-4 text-rose-600 shrink-0" />
                      ) : alert.type === 'Warning' ? (
                        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                      ) : (
                        <Info className="w-4 h-4 text-teal-600 shrink-0" />
                      )}
                      <span className="text-xs font-bold text-slate-900">{alert.title}</span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 shrink-0">{alert.timestamp}</span>
                  </div>

                  <p className="text-xs text-slate-700 mt-1.5 leading-relaxed">{alert.message}</p>

                  <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-slate-200/60 text-xs">
                    <div className="flex items-center space-x-1.5 text-slate-500 font-medium">
                      <span className="text-slate-800 font-semibold">{alert.patientName}</span>
                      <span>•</span>
                      <span className="font-mono text-slate-600">{alert.bed}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      {alert.patientId !== 'PT-SYS' && alert.patientId !== 'PT-RES' && (
                        <button
                          onClick={() => {
                            onSelectPatient(alert.patientId);
                            onClose();
                          }}
                          className="px-2 py-1 bg-white hover:bg-slate-100 text-teal-700 font-semibold rounded border border-slate-200 flex items-center gap-1 shadow-2xs transition-colors"
                        >
                          Triage 360°
                          <ArrowUpRight className="w-3 h-3" />
                        </button>
                      )}
                      <button
                        onClick={() => onDismissAlert(alert.id)}
                        className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
                        title="Dismiss"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-3 bg-slate-50 border-t border-slate-200 text-center text-xs text-slate-400">
            MedBrain OS High-Reliability Alert Subsystem • Real-time HL7 Stream
          </div>
        </div>
      </div>
    </div>
  );
};
