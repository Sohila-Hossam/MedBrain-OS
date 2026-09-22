import React, { useState } from 'react';
import {
  Activity,
  Play,
  RotateCcw,
  Sliders,
  TrendingUp,
  AlertOctagon,
  Users,
  Bed,
  CheckCircle2,
  HelpCircle,
  BarChart2,
} from 'lucide-react';
import { INITIAL_SIMULATION_DISEASES } from '../../data/mockData';
import { SimulationDisease } from '../../types';

export const DiseaseSimulation: React.FC = () => {
  const [selectedDisease, setSelectedDisease] = useState<SimulationDisease>(INITIAL_SIMULATION_DISEASES[0]);
  const [cohortSize, setCohortSize] = useState(120);
  const [severityMultiplier, setSeverityMultiplier] = useState(1.4);
  const [interventionEarly, setInterventionEarly] = useState(true);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simRun, setSimRun] = useState(true);

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setSimRun(false);
    setTimeout(() => {
      setIsSimulating(false);
      setSimRun(true);
    }, 1000);
  };

  // Compute live outcomes based on sliders
  const estimatedIcuAdmissions = Math.round(
    cohortSize * (selectedDisease.icuAdmissionRate / 100) * (interventionEarly ? 0.65 : 1.1) * (severityMultiplier / 1.2)
  );
  const estimatedMortality = Math.round(
    (selectedDisease.mortalityRate) * (interventionEarly ? 0.58 : 1.25) * (severityMultiplier / 1.2)
  );
  const estimatedRecovery = 100 - estimatedMortality;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Disease Simulation
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-bold rounded bg-teal-100 text-teal-800 border border-teal-200">
              Epidemiological & Mechanistic Engine
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Population cohort disease progression modeling, ICU capacity forecasting, and intervention sensitivity
          </p>
        </div>
      </div>

      {/* Disease Selection Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {INITIAL_SIMULATION_DISEASES.map((d) => {
          const isSelected = selectedDisease.id === d.id;
          return (
            <button
              key={d.id}
              onClick={() => setSelectedDisease(d)}
              className={`p-3 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'border-teal-600 bg-teal-50/50 ring-2 ring-teal-600'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="text-xs font-bold text-slate-900">{d.name}</div>
              <div className="text-[11px] text-slate-500 mt-1">{d.progressionSpeed} Progression</div>
              <div className="text-[10px] font-mono text-teal-700 font-bold mt-1">
                Baseline ICU: {d.icuAdmissionRate}%
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Simulation Workspace: Parameters & Forecast Output */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Parameter Controls */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5 space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-teal-600" />
              Cohort & Clinical Parameters
            </h3>
            <p className="text-xs text-slate-500">Fine-tune hospital population variables</p>
          </div>

          {/* Cohort Size */}
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
              <span>Cohort Population Size</span>
              <span className="font-mono text-teal-700">{cohortSize} Inpatients</span>
            </div>
            <input
              type="range"
              min="20"
              max="500"
              step="10"
              value={cohortSize}
              onChange={(e) => setCohortSize(Number(e.target.value))}
              className="w-full accent-teal-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>20</span>
              <span>500</span>
            </div>
          </div>

          {/* Severity Multiplier */}
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
              <span>Pathogen / Acuity Virulence</span>
              <span className="font-mono text-teal-700">{severityMultiplier.toFixed(1)}x Baseline</span>
            </div>
            <input
              type="range"
              min="0.8"
              max="2.5"
              step="0.1"
              value={severityMultiplier}
              onChange={(e) => setSeverityMultiplier(Number(e.target.value))}
              className="w-full accent-teal-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>0.8x (Mild)</span>
              <span>2.5x (Severe Epidemic)</span>
            </div>
          </div>

          {/* Early Intervention Toggle */}
          <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={interventionEarly}
                onChange={(e) => setInterventionEarly(e.target.checked)}
                className="mt-0.5 w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
              />
              <div>
                <span className="text-xs font-bold text-slate-900 block">
                  Mandatory Early Sepsis / Decompensation Protocol
                </span>
                <span className="text-[11px] text-slate-600 leading-tight block mt-0.5">
                  AI automated order-set triggering within 1 hour of risk elevation (prevents multi-organ failure).
                </span>
              </div>
            </label>
          </div>

          <button
            onClick={handleRunSimulation}
            disabled={isSimulating}
            className="w-full py-3 bg-teal-700 hover:bg-teal-800 active:bg-teal-900 disabled:bg-teal-400 text-white font-bold text-xs rounded-lg shadow-md transition-colors flex items-center justify-center space-x-2"
          >
            {isSimulating ? (
              <>
                <RotateCcw className="w-4 h-4 animate-spin" />
                <span>Simulating Population Dynamics...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span>Run Cohort Simulation</span>
              </>
            )}
          </button>
        </div>

        {/* Right 2 Columns: Simulation Results & Progression Curves */}
        <div className="lg:col-span-2 space-y-6">
          {/* Outcome Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* ICU Surge */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase">
                <span>ICU Bed Surge</span>
                <Bed className="w-4 h-4 text-teal-600" />
              </div>
              <div className="mt-2 flex items-baseline space-x-2">
                <span className="text-3xl font-extrabold font-mono text-slate-900">{estimatedIcuAdmissions}</span>
                <span className="text-xs text-slate-500">Beds Required</span>
              </div>
              <div className="mt-1 text-[11px] text-teal-700 font-semibold">
                {interventionEarly ? '▼ 35% reduction with early AI protocol' : '▲ High bed-strain risk'}
              </div>
            </div>

            {/* Projected Survival */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase">
                <span>Cohort Survival Rate</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="mt-2 flex items-baseline space-x-2">
                <span className="text-3xl font-extrabold font-mono text-emerald-700">{estimatedRecovery}%</span>
              </div>
              <div className="mt-1 text-[11px] text-emerald-700 font-semibold">
                Survival probability modeled over 14 days
              </div>
            </div>

            {/* Deterioration Risk */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase">
                <span>Predicted Mortality</span>
                <AlertOctagon className="w-4 h-4 text-rose-600" />
              </div>
              <div className="mt-2 flex items-baseline space-x-2">
                <span className="text-3xl font-extrabold font-mono text-rose-700">{estimatedMortality}%</span>
              </div>
              <div className="mt-1 text-[11px] text-rose-700 font-semibold">
                Standard benchmark: {selectedDisease.mortalityRate}%
              </div>
            </div>
          </div>

          {/* Disease Progression Curve (SVG) */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Epidemiological Progression Curve: {selectedDisease.name}
                </h3>
                <p className="text-xs text-slate-500">
                  Cohort patient deterioration trajectory over a 7-day disease horizon
                </p>
              </div>
              <div className="flex items-center space-x-3 text-xs">
                <span className="flex items-center gap-1 font-semibold text-rose-700">
                  <span className="w-2.5 h-1 bg-rose-500 rounded" /> Uncontrolled Progression
                </span>
                <span className="flex items-center gap-1 font-semibold text-teal-700">
                  <span className="w-2.5 h-1 bg-teal-600 rounded" /> With Early AI Protocol
                </span>
              </div>
            </div>

            <div className="w-full h-52 bg-slate-950 rounded-xl p-4 relative overflow-hidden border border-slate-800">
              <svg className="w-full h-full" viewBox="0 0 500 160" preserveAspectRatio="none">
                {/* Horizontal Grid */}
                <line x1="30" y1="20" x2="480" y2="20" stroke="#334155" strokeWidth="0.5" strokeDasharray="3 3" />
                <line x1="30" y1="60" x2="480" y2="60" stroke="#334155" strokeWidth="0.5" strokeDasharray="3 3" />
                <line x1="30" y1="100" x2="480" y2="100" stroke="#334155" strokeWidth="0.5" strokeDasharray="3 3" />
                <line x1="30" y1="140" x2="480" y2="140" stroke="#475569" strokeWidth="1" />

                <text x="5" y="24" fill="#94a3b8" fontSize="9" fontFamily="monospace">Critical</text>
                <text x="5" y="80" fill="#94a3b8" fontSize="9" fontFamily="monospace">Severe</text>
                <text x="5" y="140" fill="#94a3b8" fontSize="9" fontFamily="monospace">Stable</text>

                {/* Day labels */}
                <text x="30" y="155" fill="#94a3b8" fontSize="9" fontFamily="monospace">Day 1</text>
                <text x="140" y="155" fill="#94a3b8" fontSize="9" fontFamily="monospace">Day 3</text>
                <text x="250" y="155" fill="#94a3b8" fontSize="9" fontFamily="monospace">Day 5</text>
                <text x="370" y="155" fill="#94a3b8" fontSize="9" fontFamily="monospace">Day 7</text>

                {/* Uncontrolled red line */}
                <path
                  d="M 30 130 C 120 120, 200 40, 470 25"
                  fill="none"
                  stroke="#f43f5e"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Controlled teal line */}
                <path
                  d="M 30 130 C 120 100, 200 110, 470 135"
                  fill="none"
                  stroke="#0d9488"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
