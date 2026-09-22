import React, { useState, useEffect } from 'react';
import { Search, X, User, Activity, FileText, Database, ShieldAlert, Sparkles, ArrowRight } from 'lucide-react';
import { Patient } from '../../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  patients: Patient[];
  onSelectPatient: (patientId: string) => void;
  onNavigateView: (viewId: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  patients,
  onSelectPatient,
  onNavigateView,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredPatients = query.trim()
    ? patients.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.mrn.toLowerCase().includes(query.toLowerCase()) ||
          p.roomBed.toLowerCase().includes(query.toLowerCase()) ||
          p.primaryDiagnosis.toLowerCase().includes(query.toLowerCase()) ||
          p.department.toLowerCase().includes(query.toLowerCase())
      )
    : patients.slice(0, 4);

  const quickNavItems = [
    { name: 'Live ICU Monitoring', view: 'monitoring', icon: Activity, desc: 'Real-time telemetry and continuous ICU beds' },
    { name: 'PrecisionAI Treatment Workspace', view: 'precision', icon: Sparkles, desc: 'Personalized treatment analysis & simulation' },
    { name: 'MedTwin X Digital Patient Twin', view: 'twin', icon: Sparkles, desc: 'Interactive organ status & 24h trajectory comparison' },
    { name: 'Hospital Resource Intelligence', view: 'resources', icon: Database, desc: 'ICU occupancy, staffing, and surge forecasting' },
    { name: 'Clinical Decision Support', view: 'cds', icon: ShieldAlert, desc: 'Evidence aggregation & physician recommendation review' },
    { name: 'Centralized Reports', view: 'reports', icon: FileText, desc: 'Exportable dossiers and clinical summaries' },
  ].filter(
    (item) =>
      !query.trim() ||
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.desc.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-4 sm:pt-16 px-2 sm:px-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-100">
      <div
        className="w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden my-auto sm:my-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Box */}
        <div className="relative flex items-center px-3 sm:px-4 py-3 sm:py-3.5 border-b border-slate-200 bg-white">
          <Search className="w-5 h-5 text-slate-400 mr-2 sm:mr-3 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search patients, MRN, beds, diagnoses, drugs, or modules..."
            className="w-full text-sm sm:text-base bg-transparent border-none outline-hidden text-slate-900 placeholder:text-slate-400 font-medium"
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-slate-400 hover:text-slate-600 mr-2">
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="hidden sm:inline-block text-[11px] font-mono text-slate-400 px-1.5 py-0.5 rounded border border-slate-200 bg-slate-50">
            ESC
          </span>
        </div>

        {/* Search Results */}
        <div className="max-h-[75vh] sm:max-h-[60vh] overflow-y-auto p-3 sm:p-4 space-y-4">
          {/* Patients Section */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
              <span>Matching Patients</span>
              <span className="text-[11px] font-mono font-normal text-slate-400">{filteredPatients.length} found</span>
            </div>

            <div className="space-y-1.5">
              {filteredPatients.length > 0 ? (
                filteredPatients.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      onSelectPatient(p.id);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:border-teal-300 hover:bg-teal-50/40 text-left transition-all group"
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-bold text-xs shrink-0 group-hover:bg-teal-100 group-hover:text-teal-800">
                        {p.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-bold text-slate-900 truncate">{p.name}</span>
                          <span className="text-xs font-mono text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded">
                            {p.roomBed}
                          </span>
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.2 rounded-full ${
                              p.overallRisk === 'Critical'
                                ? 'bg-rose-100 text-rose-800'
                                : p.overallRisk === 'High'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {p.overallRisk}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 truncate mt-0.5">{p.primaryDiagnosis}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-teal-600 transition-colors shrink-0 ml-2" />
                  </button>
                ))
              ) : (
                <div className="text-xs text-slate-400 py-2">No patients matching "{query}"</div>
              )}
            </div>
          </div>

          {/* Quick Navigation Modules */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              System Modules & Fast Navigation
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {quickNavItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.view}
                    onClick={() => {
                      onNavigateView(item.view);
                      onClose();
                    }}
                    className="flex items-start space-x-3 p-2.5 rounded-lg border border-slate-100 hover:border-slate-300 hover:bg-slate-50 text-left transition-all"
                  >
                    <div className="p-2 rounded-md bg-teal-50 text-teal-700 shrink-0 mt-0.5">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800">{item.name}</div>
                      <div className="text-[11px] text-slate-500 leading-tight mt-0.5">{item.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 border-t border-slate-200 text-xs text-slate-500">
          <div className="flex items-center space-x-3">
            <span>
              <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded font-mono text-[10px]">↑</kbd>{' '}
              <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded font-mono text-[10px]">↓</kbd> to
              navigate
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded font-mono text-[10px]">↵</kbd> to
              select
            </span>
          </div>
          <span className="text-[11px] text-teal-700 font-medium">MedBrain OS Global Unified Index</span>
        </div>
      </div>
    </div>
  );
};
