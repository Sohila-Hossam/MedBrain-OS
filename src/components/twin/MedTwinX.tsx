import React, { useState } from 'react';
import {
  GitFork,
  Activity,
  Heart,
  Wind,
  Droplets,
  Brain,
  Pill,
  Play,
  RotateCcw,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Patient, OrganStatus } from '../../types';
import { INITIAL_PATIENT_TWIN_ORGANS } from '../../data/mockData';

interface MedTwinXProps {
  patient: Patient;
  patients: Patient[];
  onSelectPatient: (patientId: string) => void;
  onNavigateView: (viewId: string) => void;
}

export const MedTwinX: React.FC<MedTwinXProps> = ({
  patient,
  patients,
  onSelectPatient,
  onNavigateView,
}) => {
  const [selectedIntervention, setSelectedIntervention] = useState<'A' | 'B' | 'none'>('A');
  const [horizon, setHorizon] = useState<'6h' | '12h' | '24h'>('24h');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationComplete, setSimulationComplete] = useState(true);
  const [selectedOrgan, setSelectedOrgan] = useState<OrganStatus>(INITIAL_PATIENT_TWIN_ORGANS[0]);

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setSimulationComplete(false);
    setTimeout(() => {
      setIsSimulating(false);
      setSimulationComplete(true);
    }, 1200);
  };

  // Trajectory points for SVG chart comparison
  // Treatment A: risk goes down from 92 -> 58 (6h) -> 42 (12h) -> 28 (24h)
  // Treatment B: risk goes 92 -> 80 (6h) -> 74 (12h) -> 68 (24h)
  // No Intervention: risk surges 92 -> 95 (6h) -> 98 (12h) -> 99 (24h)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">MedTwin X</h1>
            <span className="px-2.5 py-0.5 text-xs font-bold rounded bg-teal-100 text-teal-800 border border-teal-200 flex items-center gap-1">
              <GitFork className="w-3.5 h-3.5 text-teal-600" />
              Digital Patient Twin
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Biophysiological digital twin modeling multi-organ cross-talk and in silico counterfactual interventions
          </p>
        </div>

        {/* Patient Switcher */}
        <div className="flex items-center space-x-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Twin Subject:</label>
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

      {/* Main Digital Twin Interface: Organ Systems & Interactive Twin Map */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Visual Organ Twin Matrix */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-2xs p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div>
                <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-teal-600" />
                  Multisystem Organ Twin State ({patient.name})
                </h2>
                <p className="text-xs text-slate-500">Real-time biophysical model calibrated with current labs & hemodynamics</p>
              </div>
              <span className="text-[11px] font-mono text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                Model: BioPhysics-X4
              </span>
            </div>

            {/* Organ cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {INITIAL_PATIENT_TWIN_ORGANS.map((organ) => {
                const isSelected = selectedOrgan.name === organ.name;
                const isCritical = organ.status === 'Severe Strain' || organ.status === 'Failure';
                const isWarning = organ.status === 'Moderate Stress';

                return (
                  <button
                    key={organ.name}
                    onClick={() => setSelectedOrgan(organ)}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'ring-2 ring-teal-600 border-teal-500 bg-teal-50/30'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-900">{organ.name}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isCritical
                            ? 'bg-rose-100 text-rose-800'
                            : isWarning
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-teal-100 text-teal-800'
                        }`}
                      >
                        {organ.status}
                      </span>
                    </div>

                    <div className="flex items-baseline space-x-1">
                      <span className="text-2xl font-extrabold font-mono text-slate-800">{organ.score}</span>
                      <span className="text-[10px] text-slate-400">/ 100 Vitality</span>
                    </div>

                    {/* Mini progress */}
                    <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
                      <div
                        className={`h-1.5 rounded-full ${
                          organ.score < 40 ? 'bg-rose-500' : organ.score < 65 ? 'bg-amber-500' : 'bg-teal-500'
                        }`}
                        style={{ width: `${organ.score}%` }}
                      />
                    </div>

                    <div className="mt-2 text-[11px] text-slate-500 truncate">{organ.metrics[0].label}: {organ.metrics[0].value}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Organ Detail Drawer */}
          <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="font-bold text-slate-900 text-sm">{selectedOrgan.name} Physiological Twin Profile</span>
              <span className="font-mono text-teal-700 font-bold">Status: {selectedOrgan.status}</span>
            </div>
            <p className="text-slate-700 leading-relaxed">{selectedOrgan.notes}</p>
            <div className="grid grid-cols-3 gap-2 pt-1">
              {selectedOrgan.metrics.map((m, idx) => (
                <div key={idx} className="p-2 bg-white rounded border border-slate-200">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">{m.label}</div>
                  <div className="text-xs font-bold text-slate-800 mt-0.5">{m.value}</div>
                  <div className="text-[10px] text-slate-500">{m.trend}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Simulation Controls ("What happens if we do X?") */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5 flex flex-col justify-between space-y-4">
          <div>
            <div className="border-b border-slate-100 pb-3 mb-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-teal-600" />
                "What happens if we do X?"
              </h3>
              <p className="text-xs text-slate-500">Configure simulated interventions and horizon</p>
            </div>

            {/* Treatment Selector */}
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                Select Intervention Scenario:
              </label>

              {/* Option A */}
              <label
                className={`flex items-start space-x-3 p-3 rounded-lg border cursor-pointer transition-all ${
                  selectedIntervention === 'A'
                    ? 'border-teal-500 bg-teal-50/40 ring-1 ring-teal-500'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <input
                  type="radio"
                  name="treatment"
                  checked={selectedIntervention === 'A'}
                  onChange={() => setSelectedIntervention('A')}
                  className="mt-1 text-teal-600 focus:ring-teal-500"
                />
                <div>
                  <div className="text-xs font-bold text-slate-900">Treatment A (Recommended)</div>
                  <div className="text-[11px] text-slate-600 mt-0.5">
                    Dual Vasopressor (NE + Vasopressin) + Low-Dose Hydrocortisone
                  </div>
                </div>
              </label>

              {/* Option B */}
              <label
                className={`flex items-start space-x-3 p-3 rounded-lg border cursor-pointer transition-all ${
                  selectedIntervention === 'B'
                    ? 'border-teal-500 bg-teal-50/40 ring-1 ring-teal-500'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <input
                  type="radio"
                  name="treatment"
                  checked={selectedIntervention === 'B'}
                  onChange={() => setSelectedIntervention('B')}
                  className="mt-1 text-teal-600 focus:ring-teal-500"
                />
                <div>
                  <div className="text-xs font-bold text-slate-900">Treatment B</div>
                  <div className="text-[11px] text-slate-600 mt-0.5">
                    High-Dose Norepinephrine Escalation alone (&gt;0.35 mcg/kg/min)
                  </div>
                </div>
              </label>

              {/* Option None */}
              <label
                className={`flex items-start space-x-3 p-3 rounded-lg border cursor-pointer transition-all ${
                  selectedIntervention === 'none'
                    ? 'border-teal-500 bg-teal-50/40 ring-1 ring-teal-500'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <input
                  type="radio"
                  name="treatment"
                  checked={selectedIntervention === 'none'}
                  onChange={() => setSelectedIntervention('none')}
                  className="mt-1 text-teal-600 focus:ring-teal-500"
                />
                <div>
                  <div className="text-xs font-bold text-slate-900">No Intervention / Standard Care</div>
                  <div className="text-[11px] text-slate-600 mt-0.5">Maintain current fixed rate without escalation</div>
                </div>
              </label>
            </div>

            {/* Horizon Selector */}
            <div className="mt-5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Simulation Projection Horizon:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['6h', '12h', '24h'] as const).map((h) => (
                  <button
                    key={h}
                    type="button"
                    onClick={() => setHorizon(h)}
                    className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                      horizon === h
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    +{h}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Run Button */}
          <div>
            <button
              onClick={handleRunSimulation}
              disabled={isSimulating}
              className="w-full py-3 px-4 bg-teal-700 hover:bg-teal-800 active:bg-teal-900 disabled:bg-teal-400 text-white text-xs font-bold rounded-lg shadow-md transition-colors flex items-center justify-center space-x-2"
            >
              {isSimulating ? (
                <>
                  <RotateCcw className="w-4 h-4 animate-spin" />
                  <span>Computing Differential Equations...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>Run Digital Twin Simulation</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Simulation Results & Trajectory Comparison Chart */}
      {simulationComplete && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-teal-600" />
                Simulated 24-Hour Patient Trajectories (Comparative In Silico Trial)
              </h3>
              <p className="text-xs text-slate-500">
                Contrast predicted multiorgan risk evolution across Treatment A vs Treatment B vs No Intervention
              </p>
            </div>
            <div className="flex items-center space-x-4 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-teal-700">
                <span className="w-3 h-1 bg-teal-600 rounded"></span> Treatment A (Dual Agent)
              </span>
              <span className="flex items-center gap-1.5 text-amber-700">
                <span className="w-3 h-1 bg-amber-500 rounded"></span> Treatment B (High NE)
              </span>
              <span className="flex items-center gap-1.5 text-rose-700">
                <span className="w-3 h-1 bg-rose-600 rounded"></span> No Intervention
              </span>
            </div>
          </div>

          {/* Crisp Responsive SVG Trajectory Chart */}
          <div className="relative w-full h-64 bg-slate-950 rounded-xl p-4 overflow-hidden border border-slate-800">
            <svg className="w-full h-full" viewBox="0 0 600 200" preserveAspectRatio="none">
              {/* Grid Lines */}
              <line x1="40" y1="20" x2="580" y2="20" stroke="#334155" strokeWidth="0.5" strokeDasharray="3 3" />
              <line x1="40" y1="60" x2="580" y2="60" stroke="#334155" strokeWidth="0.5" strokeDasharray="3 3" />
              <line x1="40" y1="100" x2="580" y2="100" stroke="#334155" strokeWidth="0.5" strokeDasharray="3 3" />
              <line x1="40" y1="140" x2="580" y2="140" stroke="#334155" strokeWidth="0.5" strokeDasharray="3 3" />
              <line x1="40" y1="180" x2="580" y2="180" stroke="#475569" strokeWidth="1" />

              {/* Y-Axis Labels */}
              <text x="10" y="24" fill="#94a3b8" fontSize="10" fontFamily="monospace">100%</text>
              <text x="15" y="64" fill="#94a3b8" fontSize="10" fontFamily="monospace">75%</text>
              <text x="15" y="104" fill="#94a3b8" fontSize="10" fontFamily="monospace">50%</text>
              <text x="15" y="144" fill="#94a3b8" fontSize="10" fontFamily="monospace">25%</text>
              <text x="20" y="184" fill="#94a3b8" fontSize="10" fontFamily="monospace">0%</text>

              {/* X-Axis Time Markers */}
              <text x="40" y="195" fill="#94a3b8" fontSize="10" fontFamily="monospace">T-0 (Now)</text>
              <text x="175" y="195" fill="#94a3b8" fontSize="10" fontFamily="monospace">+6h</text>
              <text x="310" y="195" fill="#94a3b8" fontSize="10" fontFamily="monospace">+12h</text>
              <text x="445" y="195" fill="#94a3b8" fontSize="10" fontFamily="monospace">+18h</text>
              <text x="540" y="195" fill="#94a3b8" fontSize="10" fontFamily="monospace">+24h</text>

              {/* Curve: No Intervention (Red surges to top) */}
              <path
                d="M 40 35 Q 175 30 310 24 T 570 18"
                fill="none"
                stroke="#f43f5e"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="570" cy="18" r="4" fill="#f43f5e" />

              {/* Curve: Treatment B (Amber stays high around 68%) */}
              <path
                d="M 40 35 Q 175 60 310 75 T 570 85"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="570" cy="85" r="4" fill="#f59e0b" />

              {/* Curve: Treatment A (Teal drops safely to 28%) */}
              <path
                d="M 40 35 Q 175 85 310 120 T 570 152"
                fill="none"
                stroke="#14b8a6"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <circle cx="570" cy="152" r="5" fill="#14b8a6" />
            </svg>
          </div>

          {/* Outcome Summary Comparison */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="p-3 bg-teal-50 border border-teal-200 rounded-lg">
              <div className="font-bold text-teal-900">Treatment A: Stabilized</div>
              <div className="text-teal-700 mt-1">
                Projected 24h risk: <strong className="font-mono text-sm">28%</strong> (-64% drop). Restores MAP &gt; 65, protects renal perfusion.
              </div>
            </div>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="font-bold text-amber-900">Treatment B: Suboptimal</div>
              <div className="text-amber-700 mt-1">
                Projected 24h risk: <strong className="font-mono text-sm">68%</strong>. Tachycardia risk elevated; persistent renal hypoperfusion.
              </div>
            </div>

            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg">
              <div className="font-bold text-rose-900">No Intervention: Decompensation</div>
              <div className="text-rose-700 mt-1">
                Projected 24h risk: <strong className="font-mono text-sm">99%</strong>. Severe lactic surge with imminent cardiac arrest.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
