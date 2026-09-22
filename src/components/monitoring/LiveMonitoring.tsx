import React, { useState } from 'react';
import {
  Activity,
  Heart,
  Droplets,
  Thermometer,
  Wind,
  AlertOctagon,
  AlertTriangle,
  CheckCircle2,
  ArrowUpRight,
  TrendingDown,
  TrendingUp,
  Sliders,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { Patient, RiskLevel } from '../../types';
import { TelemetryWaveform } from '../common/TelemetryWaveform';

interface LiveMonitoringProps {
  patients: Patient[];
  onSelectPatient: (patientId: string) => void;
  onNavigateView: (viewId: string) => void;
}

export const LiveMonitoring: React.FC<LiveMonitoringProps> = ({
  patients,
  onSelectPatient,
  onNavigateView,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Critical' | 'Warning' | 'Stable'>('All');
  const [selectedPatientId, setSelectedPatientId] = useState<string>(patients[0]?.id || 'PT-8942');
  const [soundMuted, setSoundMuted] = useState(true);

  const criticalPatients = patients.filter((p) => p.overallRisk === 'Critical');
  const warningPatients = patients.filter((p) => p.overallRisk === 'High' || p.overallRisk === 'Medium');
  const stablePatients = patients.filter((p) => p.overallRisk === 'Low');

  const displayedPatients =
    selectedCategory === 'Critical'
      ? criticalPatients
      : selectedCategory === 'Warning'
      ? warningPatients
      : selectedCategory === 'Stable'
      ? stablePatients
      : patients;

  const activePatient = patients.find((p) => p.id === selectedPatientId) || patients[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">Live Monitoring</h1>
            <span className="flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping mr-0.5"></span>
              ICU TELEMETRY ACTIVE
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Continuous multi-lead physiological waveforms, alarm limits, and real-time AI trend detection
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setSoundMuted(!soundMuted)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border flex items-center gap-1.5 transition-colors ${
              soundMuted
                ? 'bg-slate-100 text-slate-600 border-slate-300'
                : 'bg-rose-50 text-rose-700 border-rose-300 animate-pulse'
            }`}
          >
            {soundMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            <span>{soundMuted ? 'Telemetry Chimes Muted' : 'Audible Telemetry Active'}</span>
          </button>
        </div>
      </div>

      {/* AI Trend Detection Clinical Banner */}
      <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-start space-x-3">
          <div className="p-2 rounded-lg bg-rose-600 text-white shrink-0">
            <AlertOctagon className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-800">
                AI Trend Alert • Bed ICU-04 ({activePatient.name})
              </span>
              <span className="text-[11px] font-mono text-rose-600 font-semibold">T-0 to T-30m window</span>
            </div>
            <p className="text-xs font-semibold text-rose-950 mt-0.5">
              "SpO₂ has continuously decreased over the last 30 minutes (95% &rarr; 88%). PaO₂/FiO₂ ratio dropping."
            </p>
            <p className="text-xs text-rose-800 mt-0.5">
              <strong>Clinical Assessment:</strong> Acute respiratory deterioration risk increasing (+34% probability). Sepsis-induced ARDS escalation detected.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={() => onNavigateView('precision')}
            className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg transition-colors shadow-2xs"
          >
            Trigger PrecisionAI Protocol
          </button>
          <button
            onClick={() => onSelectPatient(activePatient.id)}
            className="px-3 py-1.5 bg-white hover:bg-slate-50 text-rose-900 border border-rose-300 text-xs font-bold rounded-lg transition-colors"
          >
            Open 360°
          </button>
        </div>
      </div>

      {/* Category Tabs: Critical, Warning, Stable */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto">
        <div className="flex space-x-1.5 p-1 bg-slate-100 rounded-lg border border-slate-200 overflow-x-auto no-scrollbar shrink-0">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-2.5 sm:px-3 py-1 text-xs font-bold rounded-md whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === 'All' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Beds ({patients.length})
          </button>
          <button
            onClick={() => setSelectedCategory('Critical')}
            className={`px-2.5 sm:px-3 py-1 text-xs font-bold rounded-md whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
              selectedCategory === 'Critical'
                ? 'bg-rose-600 text-white shadow-2xs'
                : 'text-rose-700 hover:bg-rose-50'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse shrink-0" />
            Critical ({criticalPatients.length})
          </button>
          <button
            onClick={() => setSelectedCategory('Warning')}
            className={`px-2.5 sm:px-3 py-1 text-xs font-bold rounded-md whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
              selectedCategory === 'Warning'
                ? 'bg-amber-600 text-white shadow-2xs'
                : 'text-amber-700 hover:bg-amber-50'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
            Warning ({warningPatients.length})
          </button>
          <button
            onClick={() => setSelectedCategory('Stable')}
            className={`px-2.5 sm:px-3 py-1 text-xs font-bold rounded-md whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
              selectedCategory === 'Stable'
                ? 'bg-emerald-700 text-white shadow-2xs'
                : 'text-emerald-700 hover:bg-emerald-50'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
            Stable ({stablePatients.length})
          </button>
        </div>

        <span className="text-xs text-slate-500 font-mono hidden sm:inline whitespace-nowrap">
          Showing {displayedPatients.length} live telemetry streams
        </span>
      </div>

      {/* Patient Monitoring Bed Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {displayedPatients.map((p) => {
          const isSelected = p.id === activePatient.id;
          return (
            <div
              key={p.id}
              onClick={() => setSelectedPatientId(p.id)}
              className={`bg-white rounded-xl border p-4 transition-all cursor-pointer relative shadow-2xs ${
                isSelected
                  ? 'ring-2 ring-teal-600 border-teal-500'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Card Header: Bed, Name, Risk */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs font-extrabold px-2 py-0.5 bg-slate-900 text-white rounded">
                      {p.roomBed}
                    </span>
                    <span className="font-bold text-sm text-slate-900">{p.name}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5 truncate max-w-[210px]">
                    {p.primaryDiagnosis}
                  </div>
                </div>

                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    p.overallRisk === 'Critical'
                      ? 'bg-rose-100 text-rose-800'
                      : p.overallRisk === 'High'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {p.overallRisk}
                </span>
              </div>

              {/* Vitals Matrix */}
              <div className="grid grid-cols-5 gap-1 mt-3.5 p-2 bg-slate-50 rounded-lg text-center font-mono">
                <div>
                  <div className="text-[10px] text-slate-400">HR</div>
                  <div
                    className={`text-xs font-bold ${
                      p.vitals.heartRate.status === 'Critical' ? 'text-rose-600' : 'text-slate-800'
                    }`}
                  >
                    {p.vitals.heartRate.value}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">SpO₂</div>
                  <div
                    className={`text-xs font-bold ${
                      p.vitals.spO2.status === 'Critical' ? 'text-rose-600' : 'text-teal-700'
                    }`}
                  >
                    {p.vitals.spO2.value}%
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">BP</div>
                  <div className="text-[11px] font-bold text-slate-800 truncate">
                    {p.vitals.bloodPressure.value.split(' ')[0]}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">Temp</div>
                  <div className="text-xs font-bold text-slate-800">{p.vitals.temperature.value}°</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">RR</div>
                  <div
                    className={`text-xs font-bold ${
                      p.vitals.respiratoryRate.status === 'Critical' ? 'text-rose-600' : 'text-slate-800'
                    }`}
                  >
                    {p.vitals.respiratoryRate.value}
                  </div>
                </div>
              </div>

              {/* Live Waveform preview */}
              <div className="mt-2.5">
                <TelemetryWaveform
                  type={p.overallRisk === 'Critical' ? 'ecg' : 'spo2'}
                  color={p.overallRisk === 'Critical' ? '#e11d48' : '#0d9488'}
                  height={28}
                />
              </div>

              {/* Alert Snippet & Quick Actions */}
              <div className="mt-2.5 flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                <span className="text-[11px] text-slate-500 truncate max-w-[190px]">
                  {p.latestAlert || 'Continuous telemetry regular'}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectPatient(p.id);
                  }}
                  className="text-teal-700 font-bold hover:text-teal-900 inline-flex items-center gap-0.5 text-xs"
                >
                  360° <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Focused Telemetry View for Selected Patient */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-4">
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-sm font-bold text-slate-900">
                High-Resolution Telemetry Station: {activePatient.name}
              </h3>
              <span className="font-mono text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                {activePatient.roomBed}
              </span>
            </div>
            <p className="text-xs text-slate-500">Real-time synchronized physiological trends (1-sec sampling)</p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onSelectPatient(activePatient.id)}
              className="px-3 py-1.5 text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1"
            >
              Open Full Patient 360°
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* 5 Synchronized Waveform Panels */}
        <div className="space-y-3">
          {/* ECG Lead II */}
          <div className="p-3 bg-slate-950 text-white rounded-lg border border-slate-800">
            <div className="flex items-center justify-between mb-1 text-xs">
              <span className="font-mono font-bold text-emerald-400">ECG Lead II (Continuous)</span>
              <span className="font-mono font-bold text-emerald-400">
                HR: {activePatient.vitals.heartRate.value} bpm (Sinus Tachycardia)
              </span>
            </div>
            <TelemetryWaveform type="ecg" color="#10b981" height={44} />
          </div>

          {/* Plethysmogram / SpO2 */}
          <div className="p-3 bg-slate-950 text-white rounded-lg border border-slate-800">
            <div className="flex items-center justify-between mb-1 text-xs">
              <span className="font-mono font-bold text-cyan-400">Plethysmograph (SpO₂)</span>
              <span className="font-mono font-bold text-cyan-400">
                SpO₂: {activePatient.vitals.spO2.value}% (Perfusion Index 2.8)
              </span>
            </div>
            <TelemetryWaveform type="spo2" color="#06b6d4" height={44} />
          </div>

          {/* Respiration Waveform */}
          <div className="p-3 bg-slate-950 text-white rounded-lg border border-slate-800">
            <div className="flex items-center justify-between mb-1 text-xs">
              <span className="font-mono font-bold text-amber-400">Thoracic Bioimpedance (Resp Rate)</span>
              <span className="font-mono font-bold text-amber-400">
                RR: {activePatient.vitals.respiratoryRate.value} breaths/min
              </span>
            </div>
            <TelemetryWaveform type="resp" color="#f59e0b" height={44} />
          </div>
        </div>
      </div>
    </div>
  );
};
