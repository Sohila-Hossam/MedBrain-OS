import React from 'react';
import { X, ShieldCheck, Activity, Cpu, AlertTriangle, ArrowRight, Brain, Stethoscope } from 'lucide-react';

interface WhyExplainerModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  factors: { factor: string; impact: 'High' | 'Medium' | 'Low'; weight: number }[];
  clinicalRationale: string;
  modelConfidence?: number;
  sourceModel?: string;
}

export const WhyExplainerModal: React.FC<WhyExplainerModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle = 'Clinical Explainability & Physiological Feature Attribution (SHAP Analysis)',
  factors,
  clinicalRationale,
  modelConfidence = 94.2,
  sourceModel = 'MedBrain Foundation Clinical Transformer v4.1 (MIMIC-IV & MMC Validated)',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 bg-slate-900 text-white border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/30 shrink-0">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-teal-400">Clinical Explainability</span>
                <span className="text-xs px-2 py-0.5 rounded bg-teal-900/60 text-teal-200 border border-teal-700/50">SHAP Attributions</span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white leading-tight">{title}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer shrink-0 ml-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 max-h-[80vh] overflow-y-auto space-y-4 sm:space-y-6">
          {/* Model Trust & Confidence Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 sm:p-3.5 bg-slate-50 rounded-lg border border-slate-200 text-sm">
            <div className="flex items-center space-x-2 text-slate-700">
              <Cpu className="w-4 h-4 text-slate-500 shrink-0" />
              <span className="text-xs text-slate-500">Inference Engine:</span>
              <span className="text-xs font-mono font-medium text-slate-800 truncate max-w-[220px] sm:max-w-none">{sourceModel}</span>
            </div>
            <div className="flex items-center space-x-2 shrink-0">
              <span className="text-xs text-slate-500">Confidence:</span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {modelConfidence}%
              </span>
            </div>
          </div>

          {/* Clinical Rationale */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
              <Stethoscope className="w-4 h-4 text-teal-600" />
              Pathophysiological Rationale
            </h4>
            <div className="p-4 bg-teal-50/60 border border-teal-100 rounded-lg text-sm text-slate-800 leading-relaxed">
              {clinicalRationale}
            </div>
          </div>

          {/* Contributing Factors with Feature Weights */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-blue-600" />
                Primary Contributing Physiological Biomarkers
              </h4>
              <span className="text-[11px] text-slate-400">Relative Weight (%)</span>
            </div>

            <div className="space-y-2.5">
              {factors.map((f, idx) => (
                <div key={idx} className="p-3 bg-white border border-slate-200 rounded-lg shadow-2xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-semibold text-slate-800">{f.factor}</span>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          f.impact === 'High'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : f.impact === 'Medium'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {f.impact} Impact
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-700 w-12 text-right">
                        {(f.weight * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>

                  {/* Progress bar representing weight */}
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        f.impact === 'High' ? 'bg-rose-500' : f.impact === 'Medium' ? 'bg-amber-500' : 'bg-teal-500'
                      }`}
                      style={{ width: `${Math.min(100, Math.max(10, f.weight * 100))}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Physician Governance Disclaimer */}
          <div className="flex items-start space-x-3 p-3.5 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 leading-relaxed">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Physician Autonomy Mandate:</span> MedBrain OS machine learning models calculate statistical probabilities based on clinical telemetry, laboratory indices, and retrospective cohort patterns. All diagnostic assessments and therapeutic orders require independent medical evaluation and authorization by the licensed attending physician.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-slate-50 border-t border-slate-200">
          <div className="flex items-center text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600 mr-1.5" />
            HIPAA Audit ID: EXP-882-9411
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors"
          >
            Close Explanation
          </button>
        </div>
      </div>
    </div>
  );
};
