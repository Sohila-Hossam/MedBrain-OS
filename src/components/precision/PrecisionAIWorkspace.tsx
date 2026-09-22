import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Stethoscope,
  TrendingUp,
  Activity,
  ShieldCheck,
  ArrowRight,
  Pill,
  GitFork,
  Flame,
} from 'lucide-react';
import { Patient, TreatmentScenario } from '../../types';
import { PRECISION_SCENARIOS } from '../../data/mockData';
import { WhyExplainerModal } from '../common/WhyExplainerModal';

interface PrecisionAIWorkspaceProps {
  patient: Patient;
  patients: Patient[];
  onSelectPatient: (patientId: string) => void;
  onNavigateView: (viewId: string) => void;
}

export const PrecisionAIWorkspace: React.FC<PrecisionAIWorkspaceProps> = ({
  patient,
  patients,
  onSelectPatient,
  onNavigateView,
}) => {
  const [selectedScenario, setSelectedScenario] = useState<TreatmentScenario>(
    PRECISION_SCENARIOS.find((s) => s.recommended) || PRECISION_SCENARIOS[0]
  );
  const [showWhyModal, setShowWhyModal] = useState(false);
  const [actionAcknowledged, setActionAcknowledged] = useState(false);

  const recommendedScenario = PRECISION_SCENARIOS.find((s) => s.recommended) || PRECISION_SCENARIOS[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">PrecisionAI</h1>
            <span className="px-2 py-0.5 text-xs font-bold rounded bg-teal-100 text-teal-800 border border-teal-200 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              Treatment Optimization Engine
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Personalized treatment analysis, counterfactual pharmacodynamics, and outcome forecasting
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
                {p.name} ({p.roomBed}) — {p.overallRisk} Risk
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Patient Clinical Context Banner */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-3">
              <h2 className="text-base font-extrabold text-slate-900">{patient.name}</h2>
              <span className="font-mono text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                {patient.mrn} • {patient.roomBed}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-rose-100 text-rose-800">
                {patient.overallRisk} Sepsis Risk ({patient.aiRisks.sepsis.score}%)
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-1.5">
              <strong>Clinical Presentation:</strong> {patient.primaryDiagnosis}
            </p>
          </div>

          {/* Quick clinical factors pill */}
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium">
              Age: <strong>{patient.age}y</strong>
            </span>
            <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium">
              Lactate: <strong className="text-rose-600">4.8 mmol/L</strong>
            </span>
            <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium">
              MAP: <strong className="text-rose-600">59 mmHg</strong>
            </span>
            <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium">
              Current NE: <strong>0.18 mcg/kg/min</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Recommended Scenario Callout */}
      <div className="bg-gradient-to-r from-teal-900 to-slate-900 text-white p-6 rounded-xl shadow-lg border border-teal-800/60 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider rounded-full bg-teal-500 text-slate-950">
                ★ Recommended Scenario
              </span>
              <span className="text-xs font-mono text-teal-300">Model Confidence: {recommendedScenario.confidence}%</span>
            </div>
            <button
              onClick={() => setShowWhyModal(true)}
              className="inline-flex items-center space-x-1 text-xs font-semibold text-teal-300 hover:text-white underline"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Why this scenario? (SHAP Analysis)</span>
            </button>
          </div>

          <h3 className="text-lg sm:text-xl font-extrabold text-white mt-2 tracking-tight">
            {recommendedScenario.name}
          </h3>
          <p className="text-xs sm:text-sm text-slate-200 mt-2 leading-relaxed max-w-4xl">
            {recommendedScenario.rationale}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 pt-4 border-t border-teal-800/80 text-xs">
            <div>
              <span className="text-teal-400 font-bold uppercase text-[10px]">Expected Clinical Outcome</span>
              <div className="text-sm font-bold text-white mt-0.5">{recommendedScenario.survivalDelta} Survival Stability</div>
            </div>
            <div>
              <span className="text-teal-400 font-bold uppercase text-[10px]">Projected Risk Score</span>
              <div className="text-sm font-bold text-white mt-0.5">Reduces from 92% &rarr; {recommendedScenario.projectedRiskScore}%</div>
            </div>
            <div>
              <span className="text-teal-400 font-bold uppercase text-[10px]">Potential Benefit</span>
              <div className="text-slate-200 mt-0.5 leading-tight">{recommendedScenario.potentialBenefit}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Treatment Scenarios Comparison Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">
            Compare Pharmacodynamic Treatment Scenarios
          </h3>
          <span className="text-xs text-slate-400">Click a scenario to evaluate specific considerations</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {PRECISION_SCENARIOS.map((scen) => {
            const isSelected = selectedScenario.id === scen.id;
            return (
              <div
                key={scen.id}
                onClick={() => setSelectedScenario(scen)}
                className={`bg-white rounded-xl border p-5 transition-all cursor-pointer flex flex-col justify-between shadow-2xs ${
                  isSelected
                    ? 'ring-2 ring-teal-600 border-teal-500'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        scen.recommended ? 'bg-teal-100 text-teal-800' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {scen.recommended ? '★ Recommended' : 'Alternative Scenario'}
                    </span>
                    <span className="font-mono text-xs font-bold text-slate-700">
                      Confidence: {scen.confidence}%
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 mt-3 leading-snug">{scen.name}</h4>
                  <div className="text-[11px] text-teal-700 font-semibold mt-0.5">{scen.category}</div>

                  <div className="mt-4 space-y-2.5 text-xs text-slate-700">
                    <div>
                      <strong className="text-slate-900 block text-[11px] uppercase font-bold text-slate-400">
                        Expected Response:
                      </strong>
                      <p className="mt-0.5 leading-relaxed">{scen.expectedResponse}</p>
                    </div>

                    <div>
                      <strong className="text-slate-900 block text-[11px] uppercase font-bold text-slate-400">
                        Potential Benefit:
                      </strong>
                      <p className="mt-0.5 leading-relaxed text-emerald-800 font-medium">{scen.potentialBenefit}</p>
                    </div>

                    <div>
                      <strong className="text-slate-900 block text-[11px] uppercase font-bold text-slate-400">
                        Side-Effect Risk:
                      </strong>
                      <p className="mt-0.5 leading-relaxed text-rose-800">{scen.sideEffectRisk}</p>
                    </div>

                    <div>
                      <strong className="text-slate-900 block text-[11px] uppercase font-bold text-slate-400">
                        Patient Considerations:
                      </strong>
                      <p className="mt-0.5 leading-relaxed text-slate-600">{scen.patientSpecificConsiderations}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-400 text-[10px] block font-mono">Projected Risk</span>
                    <span
                      className={`font-mono font-extrabold ${
                        scen.projectedRiskScore < 40 ? 'text-emerald-700' : 'text-rose-700'
                      }`}
                    >
                      {scen.projectedRiskScore}% ({scen.survivalDelta})
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedScenario(scen);
                      setShowWhyModal(true);
                    }}
                    className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1"
                  >
                    <span>Why?</span>
                    <HelpCircle className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Action & Physician Governance Callout */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start space-x-3">
            <ShieldCheck className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Physician Clinical Governance Mandate
              </h4>
              <p className="text-xs text-slate-600 mt-0.5 max-w-3xl leading-relaxed">
                The AI provides recommendations, pharmacokinetic simulations, and risk projections. The licensed attending physician remains strictly responsible for the final medical decision, order authorization, and clinical validation.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={() => onNavigateView('twin')}
              className="px-3.5 py-2 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <GitFork className="w-4 h-4 text-teal-600" />
              <span>Simulate in MedTwin X</span>
            </button>
            <button
              onClick={() => setActionAcknowledged(true)}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors shadow-2xs flex items-center gap-1.5 ${
                actionAcknowledged
                  ? 'bg-emerald-700 text-white'
                  : 'bg-teal-700 hover:bg-teal-800 text-white'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{actionAcknowledged ? 'Order Pathway Staged' : 'Accept & Stage Clinical Order'}</span>
            </button>
          </div>
        </div>

        {actionAcknowledged && (
          <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-900 font-medium flex items-center justify-between">
            <span>
              ✓ Vasopressin 0.03 units/min + Hydrocortisone 50mg IV staged for Dr. Sarah Vance, MD signature in CPOE.
            </span>
            <button
              onClick={() => onNavigateView('cds')}
              className="underline text-emerald-800 font-bold hover:text-emerald-950"
            >
              Go to Clinical Decision Support &raquo;
            </button>
          </div>
        )}
      </div>

      {/* Why Modal */}
      <WhyExplainerModal
        isOpen={showWhyModal}
        onClose={() => setShowWhyModal(false)}
        title={`Why is "${selectedScenario.name}" recommended for ${patient.name}?`}
        clinicalRationale={selectedScenario.rationale}
        factors={selectedScenario.contributingFactors}
        modelConfidence={selectedScenario.confidence}
      />
    </div>
  );
};
