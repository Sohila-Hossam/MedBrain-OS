import React, { useState } from 'react';
import {
  Settings,
  ShieldCheck,
  BrainCircuit,
  Sliders,
  Database,
  Lock,
  BellRing,
  CheckCircle2,
  RefreshCw,
  Server,
} from 'lucide-react';

export const SettingsGovernance: React.FC = () => {
  const [sepsisThreshold, setSepsisThreshold] = useState(70);
  const [explainabilityRequired, setExplainabilityRequired] = useState(true);
  const [epicConnected, setEpicConnected] = useState(true);
  const [pacsConnected, setPacsConnected] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState('15');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Settings & Clinical AI Governance
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-bold rounded bg-teal-100 text-teal-800 border border-teal-200">
              Institutional Admin
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Clinical AI threshold calibration, HL7 FHIR interoperability, RBAC controls, and model safety parameters
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-4 py-2 text-xs font-bold bg-teal-700 hover:bg-teal-800 text-white rounded-lg shadow-2xs flex items-center gap-1.5 transition-colors"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Save Governance Policies</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs rounded-xl font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Governance configurations updated and synchronized across all hospital clinical workstations.</span>
        </div>
      )}

      {/* Grid of Settings Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Module 1: AI Model Governance & Safety */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2.5">
              <BrainCircuit className="w-5 h-5 text-teal-600" />
              <div>
                <h3 className="text-sm font-bold text-slate-900">AI Model Governance & Ethics</h3>
                <p className="text-xs text-slate-500">Confidence thresholds and explainability mandates</p>
              </div>
            </div>
            <span className="text-[10px] font-mono bg-teal-50 text-teal-800 font-bold px-2 py-0.5 rounded">
              Model v4.8 Active
            </span>
          </div>

          <div className="space-y-4 text-xs">
            {/* Threshold Slider */}
            <div>
              <div className="flex justify-between font-bold text-slate-700 mb-1">
                <span>Critical Sepsis Early-Warning Trigger Level</span>
                <span className="font-mono text-teal-700 font-bold">{sepsisThreshold}% Risk</span>
              </div>
              <input
                type="range"
                min="50"
                max="90"
                value={sepsisThreshold}
                onChange={(e) => setSepsisThreshold(Number(e.target.value))}
                className="w-full accent-teal-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>50% (High Sensitivity)</span>
                <span>90% (Low False Alarms)</span>
              </div>
            </div>

            {/* Explainability Toggle */}
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900">Mandatory Explainability ("Why?" Trigger)</div>
                <div className="text-[11px] text-slate-500">
                  Requires SHAP physiological factor attribution on every high-acuity recommendation.
                </div>
              </div>
              <input
                type="checkbox"
                checked={explainabilityRequired}
                onChange={(e) => setExplainabilityRequired(e.target.checked)}
                className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
              />
            </div>

            {/* Model Benchmarking Specs */}
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1 font-mono text-[11px] text-slate-600">
              <div className="flex justify-between">
                <span>Active Model Architecture:</span>
                <strong className="text-slate-800">Bi-directional Transformer + ODE Twin</strong>
              </div>
              <div className="flex justify-between">
                <span>Validation AUROC:</span>
                <strong className="text-emerald-700">0.948 (MIMIC-IV & MMC Validated)</strong>
              </div>
              <div className="flex justify-between">
                <span>Last IRB Safety Review:</span>
                <strong className="text-slate-800">September 02, 2026</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Module 2: EHR & Hospital System Interoperability */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5 space-y-4">
          <div className="flex items-center space-x-2.5 border-b border-slate-100 pb-3">
            <Database className="w-5 h-5 text-blue-600" />
            <div>
              <h3 className="text-sm font-bold text-slate-900">EHR & Diagnostic Interoperability</h3>
              <p className="text-xs text-slate-500">Live HL7 FHIR v4.0.1 and DICOM connectors</p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            {/* Epic Systems Connector */}
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <span>Epic Systems EHR (FHIR API)</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <div className="text-[11px] text-slate-500">Bi-directional patient vitals & orders sync</div>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                Connected
              </span>
            </div>

            {/* DICOM PACS */}
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <span>Radiology PACS (DICOM Connector)</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <div className="text-[11px] text-slate-500">Automated chest X-ray & CT inference ingestion</div>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                Connected
              </span>
            </div>

            {/* Bedside Monitors */}
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <span>Philips / GE Bedside Telemetry Gateway</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <div className="text-[11px] text-slate-500">High-frequency waveform stream (100 Hz)</div>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                Active Stream
              </span>
            </div>
          </div>
        </div>

        {/* Module 3: Security & Session Management */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5 space-y-4">
          <div className="flex items-center space-x-2.5 border-b border-slate-100 pb-3">
            <Lock className="w-5 h-5 text-emerald-600" />
            <div>
              <h3 className="text-sm font-bold text-slate-900">Security & Authentication</h3>
              <p className="text-xs text-slate-500">HIPAA session controls and identity verification</p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-700 font-bold mb-1">
                Inactivity Workstation Auto-Lock Timeout:
              </label>
              <select
                value={sessionTimeout}
                onChange={(e) => setSessionTimeout(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-teal-600"
              >
                <option value="5">5 Minutes (Ultra-secure ICU workstation)</option>
                <option value="15">15 Minutes (Standard Clinical Station)</option>
                <option value="30">30 Minutes (Office workstation)</option>
              </select>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-slate-600">
              <div className="font-bold text-slate-800 mb-0.5">Role-Based Access Control (RBAC)</div>
              <div className="text-[11px] leading-relaxed">
                Doctor, Nurse, Researcher, Hospital Administrator, and System Administrator privileges enforced through SAML 2.0 / Active Directory tokens.
              </div>
            </div>
          </div>
        </div>

        {/* Module 4: Alert Dispatch & Paging Channels */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5 space-y-4">
          <div className="flex items-center space-x-2.5 border-b border-slate-100 pb-3">
            <BellRing className="w-5 h-5 text-amber-500" />
            <div>
              <h3 className="text-sm font-bold text-slate-900">Alert Dispatch & Paging Channels</h3>
              <p className="text-xs text-slate-500">Physical badges, Vocera, and mobile clinical push</p>
            </div>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <span className="font-semibold text-slate-800">Vocera Smart Badges (ICU Staff)</span>
              <span className="text-[11px] font-bold text-emerald-700">Online (42 active)</span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <span className="font-semibold text-slate-800">Hospital On-Call Pager Gateway</span>
              <span className="text-[11px] font-bold text-emerald-700">Online</span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <span className="font-semibold text-slate-800">Command Center Overhead Chimes</span>
              <span className="text-[11px] font-bold text-emerald-700">Enabled (Critical only)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
