import React, { useState } from 'react';
import {
  ShieldAlert,
  AlertOctagon,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  HelpCircle,
  Stethoscope,
  XCircle,
  FileCheck,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { Patient, CDSRecommendation } from '../../types';
import { INITIAL_CDS_RECOMMENDATIONS } from '../../data/mockData';
import { WhyExplainerModal } from '../common/WhyExplainerModal';

interface ClinicalDecisionSupportProps {
  patient: Patient;
  patients: Patient[];
  onSelectPatient: (patientId: string) => void;
  onNavigateView: (viewId: string) => void;
}

export const ClinicalDecisionSupport: React.FC<ClinicalDecisionSupportProps> = ({
  patient,
  patients,
  onSelectPatient,
  onNavigateView,
}) => {
  const [recommendations, setRecommendations] = useState<CDSRecommendation[]>(INITIAL_CDS_RECOMMENDATIONS);
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Critical' | 'Warning' | 'Optimization'>('All');
  const [activeRecForWhy, setActiveRecForWhy] = useState<CDSRecommendation | null>(null);
  const [overrideModalRec, setOverrideModalRec] = useState<CDSRecommendation | null>(null);
  const [overrideReason, setOverrideReason] = useState('');

  const filteredRecs = recommendations.filter((r) => {
    if (selectedCategory === 'All') return true;
    return r.urgency === selectedCategory;
  });

  const handleAccept = (id: string) => {
    setRecommendations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'Accepted' } : r))
    );
  };

  const handleOverrideSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (overrideModalRec) {
      setRecommendations((prev) =>
        prev.map((r) =>
          r.id === overrideModalRec.id
            ? { ...r, status: 'Overridden', overrideReason }
            : r
        )
      );
      setOverrideModalRec(null);
      setOverrideReason('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Clinical Decision Support
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-bold rounded bg-teal-100 text-teal-800 border border-teal-200">
              Guideline Rule Engine v4.8
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Evidence-based AI recommendations, clinical practice guidelines, and medication safety checks
          </p>
        </div>

        {/* Patient Switcher */}
        <div className="flex items-center space-x-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Active Patient:</label>
          <select
            value={patient.id}
            onChange={(e) => onSelectPatient(e.target.value)}
            className="text-xs font-semibold px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-800 shadow-2xs focus:ring-1 focus:ring-teal-600"
          >
            {patients.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.roomBed})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Physician Responsibility Banner */}
      <div className="p-4 bg-slate-900 text-white rounded-xl shadow-md border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start space-x-3">
          <Stethoscope className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
          <div className="text-xs">
            <div className="font-bold uppercase tracking-wider text-teal-300">
              Licensed Attending Clinical Governance
            </div>
            <p className="text-slate-300 mt-0.5 leading-relaxed">
              MedBrain CDS recommendations are calculated from real-time EHR telemetry cross-referenced against peer-reviewed international guidelines. Attending physicians maintain final diagnostic and prescriptive authority.
            </p>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-1">
        {(['All', 'Critical', 'Warning', 'Optimization'] as const).map((cat) => {
          const count = recommendations.filter((r) => cat === 'All' || r.urgency === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all flex items-center space-x-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-teal-700 text-white border-teal-700 shadow-2xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span>{cat}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  selectedCategory === cat ? 'bg-teal-800 text-teal-100' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Recommendations Feed */}
      <div className="space-y-4">
        {filteredRecs.map((rec) => {
          const isCritical = rec.urgency === 'Critical';
          const isWarning = rec.urgency === 'Warning';
          const isAccepted = rec.status === 'Accepted';
          const isOverridden = rec.status === 'Overridden';

          return (
            <div
              key={rec.id}
              className={`bg-white rounded-xl border p-5 transition-all shadow-2xs ${
                isCritical
                  ? 'border-rose-200 bg-rose-50/10'
                  : isWarning
                  ? 'border-amber-200 bg-amber-50/10'
                  : 'border-slate-200'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  {/* Badge line */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                        isCritical
                          ? 'bg-rose-100 text-rose-800 border border-rose-200'
                          : isWarning
                          ? 'bg-amber-100 text-amber-800 border border-amber-200'
                          : 'bg-teal-100 text-teal-800 border border-teal-200'
                      }`}
                    >
                      {rec.urgency} Action
                    </span>

                    <span className="text-[11px] font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                      Evidence: {rec.evidenceLevel}
                    </span>

                    <span className="text-[11px] font-semibold text-slate-600 flex items-center gap-1">
                      <BookOpen className="w-3 h-3 text-slate-400" />
                      {rec.guidelineReference}
                    </span>

                    {isAccepted && (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                        ✓ Accepted & Ordered
                      </span>
                    )}

                    {isOverridden && (
                      <span className="text-[10px] font-bold text-slate-700 bg-slate-200 px-2 py-0.5 rounded">
                        Overridden by Attending
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-base font-bold text-slate-900 tracking-tight">{rec.title}</h3>
                  <p className="text-xs text-slate-700 leading-relaxed">{rec.clinicalExplanation}</p>

                  {/* Trigger Data Points */}
                  <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-2 text-[11px]">
                    <span className="font-bold text-slate-500 uppercase text-[10px]">Data Drivers:</span>
                    {rec.patientDataDrivers.map((driver, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-slate-100 rounded text-slate-800 font-mono font-medium"
                      >
                        {driver}
                      </span>
                    ))}
                  </div>

                  {isOverridden && rec.overrideReason && (
                    <div className="mt-2 p-2 rounded bg-slate-100 border border-slate-200 text-xs text-slate-600 font-mono">
                      <strong>Override Justification:</strong> {rec.overrideReason}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex md:flex-col items-center md:items-end justify-end gap-2 shrink-0">
                  <button
                    onClick={() => setActiveRecForWhy(rec)}
                    className="px-3 py-1.5 text-xs font-bold text-teal-700 hover:bg-teal-50 rounded-lg border border-teal-200 flex items-center gap-1 transition-colors"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Why?</span>
                  </button>

                  {!isAccepted && !isOverridden && (
                    <>
                      <button
                        onClick={() => handleAccept(rec.id)}
                        className="px-3.5 py-1.5 text-xs font-bold bg-teal-700 hover:bg-teal-800 text-white rounded-lg shadow-2xs flex items-center gap-1.5 transition-colors"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Accept & Apply</span>
                      </button>

                      <button
                        onClick={() => setOverrideModalRec(rec)}
                        className="px-3 py-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
                      >
                        Override / Dismiss
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Why Modal */}
      {activeRecForWhy && (
        <WhyExplainerModal
          isOpen={!!activeRecForWhy}
          onClose={() => setActiveRecForWhy(null)}
          title={`Clinical Evidence Basis: ${activeRecForWhy.title}`}
          clinicalRationale={activeRecForWhy.clinicalExplanation}
          factors={activeRecForWhy.patientDataDrivers.map((d) => ({
            factor: d,
            impact: 'High',
            weight: 0.35,
          }))}
        />
      )}

      {/* Override Reason Modal */}
      {overrideModalRec && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-md w-full p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              Clinical Override Documentation: {overrideModalRec.title}
            </h3>
            <p className="text-xs text-slate-600">
              Hospital compliance and safety guidelines require documenting a clinical rationale when dismissing Level I / II recommendations.
            </p>
            <form onSubmit={handleOverrideSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Physician Justification / Alternative Treatment Plan:
                </label>
                <textarea
                  required
                  rows={3}
                  value={overrideReason}
                  onChange={(e) => setOverrideReason(e.target.value)}
                  placeholder="e.g., Patient has known paradoxical reaction; following alternative institutional protocol under Attending order..."
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:ring-1 focus:ring-teal-600"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setOverrideModalRec(null)}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 rounded-lg"
                >
                  Confirm Override
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
