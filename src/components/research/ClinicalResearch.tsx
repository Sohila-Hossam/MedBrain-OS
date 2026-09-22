import React, { useState } from 'react';
import {
  FlaskConical,
  Users,
  Search,
  Download,
  Filter,
  TrendingUp,
  BarChart3,
  Calendar,
  ChevronRight,
  Sparkles,
  FileSpreadsheet,
} from 'lucide-react';
import { INITIAL_RESEARCH_STUDIES } from '../../data/mockData';
import { ResearchStudy } from '../../types';

export const ClinicalResearch: React.FC = () => {
  const [studies, setStudies] = useState<ResearchStudy[]>(INITIAL_RESEARCH_STUDIES);
  const [selectedStudy, setSelectedStudy] = useState<ResearchStudy>(INITIAL_RESEARCH_STUDIES[0]);
  const [searchFilter, setSearchFilter] = useState('');
  const [exportNotice, setExportNotice] = useState(false);

  const handleExport = () => {
    setExportNotice(true);
    setTimeout(() => setExportNotice(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">Clinical Research</h1>
            <span className="px-2.5 py-0.5 text-xs font-bold rounded bg-teal-100 text-teal-800 border border-teal-200 flex items-center gap-1">
              <FlaskConical className="w-3.5 h-3.5 text-teal-600" />
              Real-World Evidence Engine
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            De-identified patient cohort discovery, in silico trials, and Kaplan-Meier survival analytics
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleExport}
            className="px-3.5 py-2 text-xs font-bold bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 rounded-lg shadow-2xs flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-4 h-4 text-teal-700" />
            <span>Export FHIR De-identified Dataset</span>
          </button>
        </div>
      </div>

      {exportNotice && (
        <div className="p-3 bg-teal-50 border border-teal-200 text-teal-900 text-xs rounded-lg font-medium flex items-center gap-2">
          <FileSpreadsheet className="w-4 h-4 text-teal-700" />
          <span>
            De-identified cohort data package (HIPAA Safe-Harbor de-identification verified) generated for download.
          </span>
        </div>
      )}

      {/* Studies Grid & Active Study Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Active Institutional Studies */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Active IRB Protocols & Registries
            </h3>
            <span className="text-xs font-mono text-slate-400">{studies.length} Studies</span>
          </div>

          {studies.map((study) => {
            const isSelected = selectedStudy.id === study.id;
            return (
              <div
                key={study.id}
                onClick={() => setSelectedStudy(study)}
                className={`p-4 rounded-xl border transition-all cursor-pointer shadow-2xs ${
                  isSelected
                    ? 'border-teal-600 bg-white ring-2 ring-teal-600'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono">
                    {study.id}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                    {study.status}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-slate-900 mt-2 line-clamp-2">{study.title}</h4>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>
                    Cohort: <strong>{study.cohortSize.toLocaleString()}</strong> patients
                  </span>
                  <span>PI: {study.principalInvestigator.split(',')[0]}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right 2 Columns: Study Detail & Cohort Survival Analysis */}
        <div className="lg:col-span-2 space-y-6">
          {/* Study Overview Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <span className="font-mono text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                  {selectedStudy.id} • {selectedStudy.phase}
                </span>
                <h2 className="text-base font-extrabold text-slate-900 mt-1">{selectedStudy.title}</h2>
              </div>
              <div className="text-right text-xs">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Principal Investigator</span>
                <span className="font-bold text-slate-800">{selectedStudy.principalInvestigator}</span>
              </div>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed">{selectedStudy.hypothesis}</p>

            {/* Inclusion / Exclusion Criteria */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80">
                <div className="font-bold text-slate-800 uppercase text-[10px] mb-1">Inclusion Criteria</div>
                <ul className="space-y-1 text-slate-600 text-[11px]">
                  {selectedStudy.inclusionCriteria.map((c, i) => (
                    <li key={i}>• {c}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80">
                <div className="font-bold text-slate-800 uppercase text-[10px] mb-1">Endpoints Analyzed</div>
                <ul className="space-y-1 text-slate-600 text-[11px]">
                  {selectedStudy.endpoints.map((e, i) => (
                    <li key={i}>• {e}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Kaplan-Meier Survival Analysis Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-teal-600" />
                  Kaplan-Meier 28-Day Survival Probability Curve
                </h3>
                <p className="text-xs text-slate-500">
                  Target Intervention Arm (Dual Vasopressor) vs Retrospective Standard Care Arm
                </p>
              </div>

              {/* Statistical Significance Callouts */}
              <div className="flex items-center space-x-3 text-xs font-mono">
                <span className="px-2 py-1 rounded bg-teal-50 text-teal-800 font-bold border border-teal-200">
                  p &lt; 0.001
                </span>
                <span className="px-2 py-1 rounded bg-slate-100 text-slate-800 font-bold">
                  HR 0.62 [95% CI 0.49-0.78]
                </span>
              </div>
            </div>

            {/* Survival Curve Chart SVG */}
            <div className="w-full h-56 bg-slate-950 rounded-xl p-4 relative overflow-hidden border border-slate-800">
              <svg className="w-full h-full" viewBox="0 0 500 170" preserveAspectRatio="none">
                {/* Horizontal Grid */}
                <line x1="30" y1="20" x2="480" y2="20" stroke="#334155" strokeWidth="0.5" strokeDasharray="3 3" />
                <line x1="30" y1="60" x2="480" y2="60" stroke="#334155" strokeWidth="0.5" strokeDasharray="3 3" />
                <line x1="30" y1="100" x2="480" y2="100" stroke="#334155" strokeWidth="0.5" strokeDasharray="3 3" />
                <line x1="30" y1="140" x2="480" y2="140" stroke="#475569" strokeWidth="1" />

                <text x="5" y="24" fill="#94a3b8" fontSize="9" fontFamily="monospace">1.0</text>
                <text x="5" y="64" fill="#94a3b8" fontSize="9" fontFamily="monospace">0.8</text>
                <text x="5" y="104" fill="#94a3b8" fontSize="9" fontFamily="monospace">0.6</text>
                <text x="5" y="144" fill="#94a3b8" fontSize="9" fontFamily="monospace">0.4</text>

                {/* Day labels */}
                <text x="30" y="160" fill="#94a3b8" fontSize="9" fontFamily="monospace">Day 0</text>
                <text x="140" y="160" fill="#94a3b8" fontSize="9" fontFamily="monospace">Day 7</text>
                <text x="250" y="160" fill="#94a3b8" fontSize="9" fontFamily="monospace">Day 14</text>
                <text x="360" y="160" fill="#94a3b8" fontSize="9" fontFamily="monospace">Day 21</text>
                <text x="450" y="160" fill="#94a3b8" fontSize="9" fontFamily="monospace">Day 28</text>

                {/* Standard Arm (Step downward staircase red) */}
                <path
                  d="M 30 20 H 90 V 45 H 180 V 75 H 290 V 105 H 390 V 120 H 480"
                  fill="none"
                  stroke="#f43f5e"
                  strokeWidth="2.5"
                />

                {/* Intervention Arm (Stepped teal higher survival) */}
                <path
                  d="M 30 20 H 120 V 30 H 220 V 45 H 330 V 55 H 480"
                  fill="none"
                  stroke="#14b8a6"
                  strokeWidth="3"
                />
              </svg>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <div className="flex items-center space-x-4">
                <span className="flex items-center gap-1 text-teal-700 font-bold">
                  <span className="w-3 h-1 bg-teal-500 rounded" /> Intervention Arm (Survival 84.2%)
                </span>
                <span className="flex items-center gap-1 text-rose-700 font-bold">
                  <span className="w-3 h-1 bg-rose-500 rounded" /> Standard Care Arm (Survival 61.8%)
                </span>
              </div>
              <span className="text-slate-400 font-mono text-[11px]">Log-rank test: χ² = 18.42</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
