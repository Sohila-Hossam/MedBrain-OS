import React, { useState } from 'react';
import {
  ArrowLeft,
  Activity,
  Heart,
  Droplets,
  Wind,
  Thermometer,
  Sparkles,
  AlertTriangle,
  HelpCircle,
  FileText,
  Pill,
  Microscope,
  Image as ImageIcon,
  Clock,
  CheckCircle2,
  AlertOctagon,
  ChevronRight,
  GitFork,
  ShieldAlert,
  Download,
} from 'lucide-react';
import { Patient, RiskLevel } from '../../types';
import { TelemetryWaveform } from '../common/TelemetryWaveform';
import { WhyExplainerModal } from '../common/WhyExplainerModal';

interface PatientProfileProps {
  patient: Patient;
  onBack: () => void;
  onNavigateView: (viewId: string) => void;
}

export const PatientProfile: React.FC<PatientProfileProps> = ({
  patient,
  onBack,
  onNavigateView,
}) => {
  const [activeTab, setActiveTab] = useState<'history' | 'medications' | 'labs' | 'imaging' | 'notes'>('labs');
  const [showWhyModal, setShowWhyModal] = useState(false);

  return (
    <div className="space-y-6">
      {/* Back button & Quick Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white px-3 py-1.5 rounded-lg border border-slate-200 transition-colors shadow-2xs self-start"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Registry</span>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onNavigateView('precision')}
            className="px-2.5 sm:px-3 py-1.5 text-xs font-semibold bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 rounded-lg shadow-2xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>PrecisionAI</span>
          </button>
          <button
            onClick={() => onNavigateView('twin')}
            className="px-2.5 sm:px-3 py-1.5 text-xs font-semibold bg-teal-700 hover:bg-teal-800 text-white rounded-lg shadow-2xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <GitFork className="w-3.5 h-3.5" />
            <span>MedTwin X</span>
          </button>
          <button
            onClick={() => onNavigateView('cds')}
            className="px-2.5 sm:px-3 py-1.5 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white rounded-lg shadow-2xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-teal-400" />
            <span>CDS Protocol</span>
          </button>
        </div>
      </div>

      {/* Patient Header Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-start space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-lg font-bold shadow-md shrink-0 ring-2 ring-slate-100">
              {patient.name.split(' ').map((n) => n[0]).join('')}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  {patient.name}
                </h1>
                <span className="font-mono text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded font-semibold">
                  {patient.mrn}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    patient.overallRisk === 'Critical'
                      ? 'bg-rose-100 text-rose-800 border border-rose-200'
                      : patient.overallRisk === 'High'
                      ? 'bg-amber-100 text-amber-800 border border-amber-200'
                      : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  }`}
                >
                  {patient.overallRisk} AI Risk
                </span>
                <span className="px-2 py-0.5 rounded text-xs font-semibold bg-slate-100 text-slate-700">
                  {patient.currentStatus} Acuity
                </span>
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
                <span>
                  <strong className="text-slate-800">Age/Sex:</strong> {patient.age}y • {patient.gender === 'F' ? 'Female' : 'Male'}
                </span>
                <span>•</span>
                <span>
                  <strong className="text-slate-800">Department:</strong> {patient.department}
                </span>
                <span>•</span>
                <span>
                  <strong className="text-slate-800">Location:</strong>{' '}
                  <span className="font-mono text-teal-700 font-bold">{patient.roomBed}</span>
                </span>
                <span>•</span>
                <span>
                  <strong className="text-slate-800">Admitted:</strong> {patient.admissionDate}
                </span>
                <span>•</span>
                <span>
                  <strong className="text-slate-800">Attending:</strong> {patient.attendingPhysician}
                </span>
              </div>

              <div className="mt-2 text-xs text-slate-700 bg-slate-50 p-2 rounded-md border border-slate-200/80">
                <strong className="text-slate-900">Admission Diagnosis:</strong> {patient.primaryDiagnosis}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Current Vitals & Real-Time Waveforms */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-teal-600" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
              Bedside Telemetry & Continuous Vitals
            </h2>
          </div>
          <span className="text-[11px] font-mono text-slate-400">Streamed via Bedside Monitor • 0.5s Latency</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {/* Heart Rate */}
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">Heart Rate</span>
              <Heart className="w-4 h-4 text-rose-500 animate-pulse" />
            </div>
            <div className="mt-2 flex items-baseline space-x-1">
              <span className="text-2xl sm:text-3xl font-mono font-extrabold text-slate-900">
                {patient.vitals.heartRate.value}
              </span>
              <span className="text-xs text-slate-500">bpm</span>
            </div>
            <TelemetryWaveform type="ecg" color="#e11d48" height={30} className="mt-2" />
            <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-500">
              <span>Norm: {patient.vitals.heartRate.normalRange}</span>
              <span className="font-bold text-rose-600">Tachycardia</span>
            </div>
          </div>

          {/* SpO2 */}
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">SpO₂</span>
              <Droplets className="w-4 h-4 text-teal-600" />
            </div>
            <div className="mt-2 flex items-baseline space-x-1">
              <span className="text-2xl sm:text-3xl font-mono font-extrabold text-slate-900">
                {patient.vitals.spO2.value}
              </span>
              <span className="text-xs text-slate-500">%</span>
            </div>
            <TelemetryWaveform type="spo2" color="#0d9488" height={30} className="mt-2" />
            <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-500">
              <span>Target: &gt;92%</span>
              <span className="font-bold text-rose-600">Desaturating</span>
            </div>
          </div>

          {/* Blood Pressure */}
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">Blood Pressure (MAP)</span>
              <Activity className="w-4 h-4 text-blue-600" />
            </div>
            <div className="mt-2">
              <span className="text-lg sm:text-xl font-mono font-extrabold text-slate-900">
                {patient.vitals.bloodPressure.value}
              </span>
            </div>
            <TelemetryWaveform type="trend" color="#2563eb" height={30} className="mt-2" />
            <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-500">
              <span>Invasive A-Line</span>
              <span className="font-bold text-rose-600">MAP &lt; 65</span>
            </div>
          </div>

          {/* Temperature */}
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">Core Temp</span>
              <Thermometer className="w-4 h-4 text-amber-500" />
            </div>
            <div className="mt-2 flex items-baseline space-x-1">
              <span className="text-2xl sm:text-3xl font-mono font-extrabold text-slate-900">
                {patient.vitals.temperature.value}
              </span>
              <span className="text-xs text-slate-500">°C</span>
            </div>
            <TelemetryWaveform type="trend" color="#f59e0b" height={30} className="mt-2" />
            <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-500">
              <span>Foley sensor</span>
              <span className="font-bold text-rose-600">High Pyrexia</span>
            </div>
          </div>

          {/* Respiratory Rate */}
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">Resp Rate</span>
              <Wind className="w-4 h-4 text-cyan-600" />
            </div>
            <div className="mt-2 flex items-baseline space-x-1">
              <span className="text-2xl sm:text-3xl font-mono font-extrabold text-slate-900">
                {patient.vitals.respiratoryRate.value}
              </span>
              <span className="text-xs text-slate-500">bpm</span>
            </div>
            <TelemetryWaveform type="resp" color="#0891b2" height={30} className="mt-2" />
            <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-500">
              <span>Norm: 12-20</span>
              <span className="font-bold text-rose-600">Tachypneic</span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Risk Section & AI Clinical Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: AI Risk Scores & Contributing Factors */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-2xs p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-teal-600" />
                MedBrain AI Risk Evaluation & Predictive Trajectories
              </h3>
              <p className="text-xs text-slate-500">Continuous multimodal risk models calibrated every 60s</p>
            </div>
            <button
              onClick={() => setShowWhyModal(true)}
              className="px-2.5 py-1 text-xs font-bold bg-teal-50 text-teal-700 hover:bg-teal-100 rounded border border-teal-200 inline-flex items-center gap-1 transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Why? Explain Features</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Sepsis Risk */}
            <div className="p-3.5 rounded-lg border border-rose-200 bg-rose-50/30">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-800">Sepsis Deterioration</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-rose-100 text-rose-800">
                  {patient.aiRisks.sepsis.band}
                </span>
              </div>
              <div className="mt-2 flex items-baseline space-x-1">
                <span className="text-3xl font-extrabold font-mono text-rose-700">
                  {patient.aiRisks.sepsis.score}%
                </span>
                <span className="text-xs font-medium text-rose-600">▲ Rising</span>
              </div>
              <div className="mt-2 text-[11px] text-slate-600">
                Confidence: <strong>{patient.aiRisks.sepsis.confidence}%</strong> (SHAP calibrated)
              </div>
            </div>

            {/* Respiratory Failure */}
            <div className="p-3.5 rounded-lg border border-rose-200 bg-rose-50/30">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-800">Respiratory Failure</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-rose-100 text-rose-800">
                  {patient.aiRisks.respiratoryFailure.band}
                </span>
              </div>
              <div className="mt-2 flex items-baseline space-x-1">
                <span className="text-3xl font-extrabold font-mono text-rose-700">
                  {patient.aiRisks.respiratoryFailure.score}%
                </span>
                <span className="text-xs font-medium text-rose-600">▲ Surging</span>
              </div>
              <div className="mt-2 text-[11px] text-slate-600">
                Confidence: <strong>{patient.aiRisks.respiratoryFailure.confidence}%</strong>
              </div>
            </div>

            {/* Cardiac Risk */}
            <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-800">Major Cardiac Event</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-200 text-slate-800">
                  {patient.aiRisks.cardiacEvent.band}
                </span>
              </div>
              <div className="mt-2 flex items-baseline space-x-1">
                <span className="text-3xl font-extrabold font-mono text-slate-800">
                  {patient.aiRisks.cardiacEvent.score}%
                </span>
                <span className="text-xs font-medium text-slate-500">▶ Stable</span>
              </div>
              <div className="mt-2 text-[11px] text-slate-600">
                Confidence: <strong>{patient.aiRisks.cardiacEvent.confidence}%</strong>
              </div>
            </div>
          </div>

          {/* AI Clinical Insight Banner */}
          <div className="p-4 bg-teal-50/60 border border-teal-200 rounded-lg text-xs space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-teal-900 font-bold">
                <AlertOctagon className="w-4 h-4 text-rose-600" />
                <span>AI Clinical Insight: Accelerated Multi-System Deterioration</span>
              </div>
              <button
                onClick={() => setShowWhyModal(true)}
                className="text-teal-700 font-bold underline hover:text-teal-900"
              >
                View SHAP feature weights &raquo;
              </button>
            </div>
            <p className="text-slate-700 leading-relaxed">
              Combination of rapidly rising lactate (4.8 mmol/L), refractory hypotension (MAP 59 on Norepinephrine 0.18 mcg/kg/min), and deteriorating PaO₂/FiO₂ ratio (142 mmHg) triggers an escalated critical alert. Model predicts 78% probability of intubation and organ failure escalation within 4 hours if secondary vasopressor therapy is delayed.
            </p>
          </div>
        </div>

        {/* Right 1 Col: Clinical Timeline */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5 flex flex-col">
          <div className="border-b border-slate-100 pb-3 mb-3 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-500" />
              Clinical Timeline
            </h3>
            <span className="text-[11px] font-mono text-slate-400">Chronological</span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 max-h-[320px] pr-1">
            {patient.timeline.map((item) => (
              <div key={item.id} className="flex items-start space-x-3 text-xs">
                <div className="w-12 shrink-0 font-mono text-[11px] text-slate-400 pt-0.5">{item.time}</div>
                <div className="relative pl-3 border-l-2 border-slate-200">
                  <div
                    className={`absolute -left-1.5 top-1 w-2.5 h-2.5 rounded-full ${
                      item.type === 'alert'
                        ? 'bg-rose-500'
                        : item.type === 'ai'
                        ? 'bg-teal-500'
                        : item.type === 'lab'
                        ? 'bg-blue-500'
                        : 'bg-slate-400'
                    }`}
                  />
                  <div className="font-bold text-slate-800">{item.event}</div>
                  <div className="text-slate-600 text-[11px] mt-0.5 leading-tight">{item.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Medical Information Tabs */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        {/* Tabs Bar */}
        <div className="flex border-b border-slate-200 bg-slate-50/70 overflow-x-auto no-scrollbar scroll-smooth">
          {[
            { id: 'labs', label: 'Lab Results', icon: Microscope, count: patient.labs.length },
            { id: 'medications', label: 'Medications & Infusions', icon: Pill, count: patient.medications.length },
            { id: 'history', label: 'Medical History', icon: FileText, count: patient.history.length },
            { id: 'imaging', label: 'Imaging & Diagnostics', icon: ImageIcon, count: patient.imaging.length },
            { id: 'notes', label: 'Clinical Notes', icon: CheckCircle2, count: patient.clinicalNotes.length },
          ].map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-1.5 sm:space-x-2 py-2.5 sm:py-3 px-3 sm:px-5 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'border-teal-700 text-teal-800 bg-white'
                    : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/60'
                }`}
              >
                <IconComponent className={`w-4 h-4 ${isActive ? 'text-teal-700' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-teal-100 text-teal-800' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panels */}
        <div className="p-3.5 sm:p-5">
          {/* Labs */}
          {activeTab === 'labs' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse min-w-[520px]">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
                    <th className="py-2 px-3">Biomarker / Test</th>
                    <th className="py-2 px-3">Result</th>
                    <th className="py-2 px-3">Reference Range</th>
                    <th className="py-2 px-3">Status</th>
                    <th className="py-2 px-3">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {patient.labs.map((l, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-bold text-slate-900">{l.test}</td>
                      <td className="py-2.5 px-3 font-mono font-bold text-slate-900">
                        {l.result} <span className="text-slate-400 font-normal text-[11px]">{l.unit}</span>
                      </td>
                      <td className="py-2.5 px-3 text-slate-500 font-mono text-[11px]">{l.range}</td>
                      <td className="py-2.5 px-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            l.status === 'Critical'
                              ? 'bg-rose-100 text-rose-800'
                              : l.status === 'High'
                              ? 'bg-amber-100 text-amber-800'
                              : l.status === 'Low'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {l.status}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 font-mono text-slate-500 text-[11px]">{l.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Medications */}
          {activeTab === 'medications' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
                    <th className="py-2 px-3">Medication Name</th>
                    <th className="py-2 px-3">Dose / Rate</th>
                    <th className="py-2 px-3">Route</th>
                    <th className="py-2 px-3">Schedule</th>
                    <th className="py-2 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {patient.medications.map((m, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-bold text-slate-900">{m.name}</td>
                      <td className="py-2.5 px-3 font-mono text-teal-800 font-bold">{m.dose}</td>
                      <td className="py-2.5 px-3 text-slate-600">{m.route}</td>
                      <td className="py-2.5 px-3 text-slate-600">{m.frequency}</td>
                      <td className="py-2.5 px-3">
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          {m.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* History */}
          {activeTab === 'history' && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Documented Past Medical & Surgical History
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {patient.history.map((h, idx) => (
                  <li key={idx} className="flex items-center space-x-2 p-2 bg-slate-50 rounded-md border border-slate-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Imaging */}
          {activeTab === 'imaging' && (
            <div className="space-y-4">
              {patient.imaging.length === 0 ? (
                <div className="text-xs text-slate-500 py-4">No diagnostic imaging performed in this stay yet.</div>
              ) : (
                patient.imaging.map((img, idx) => (
                  <div key={idx} className="p-4 rounded-lg border border-slate-200 bg-slate-50/50 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="font-bold text-slate-900">{img.type}</div>
                      <span className="text-slate-500 font-mono text-[11px]">{img.date}</span>
                    </div>
                    <div className="text-xs text-slate-700">
                      <strong>Findings:</strong> {img.findings}
                    </div>
                    <div className="text-xs text-teal-900 bg-teal-50 p-2 rounded border border-teal-200 font-medium">
                      <strong>Impression:</strong> {img.impression}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Clinical Notes */}
          {activeTab === 'notes' && (
            <div className="space-y-4">
              {patient.clinicalNotes.map((cn, idx) => (
                <div key={idx} className="p-4 rounded-lg border border-slate-200 bg-slate-50/50 space-y-1.5">
                  <div className="flex items-center justify-between text-xs border-b border-slate-200 pb-2">
                    <div className="font-bold text-slate-900">
                      {cn.author} <span className="font-normal text-slate-500">({cn.role})</span>
                    </div>
                    <span className="text-slate-500 font-mono text-[11px]">{cn.date}</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed pt-1">{cn.note}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Reusable Why Explainer Modal */}
      <WhyExplainerModal
        isOpen={showWhyModal}
        onClose={() => setShowWhyModal(false)}
        title={`Why is ${patient.name}'s Sepsis & Decompensation Risk Critical (${patient.aiRisks.sepsis.score}%)?`}
        clinicalRationale="The predictive neural transformer correlates refractory hypotension (MAP 59 despite escalating Norepinephrine) with acute rise in serum lactate (4.8 mmol/L), severe hypoxemic shunt (P/F ratio 142), and procalcitonin surge (18.4 ng/mL). Multicenter historical cohorts with this exact physiological signature face a 74.8% likelihood of multi-organ failure if vasopressin receptor exhaustion is not counterbalanced."
        factors={[
          { factor: 'Lactate > 4.0 mmol/L with continuing positive slope', impact: 'High', weight: 0.38 },
          { factor: 'Mean Arterial Pressure < 65 mmHg refractory to vasopressor 0.18 mcg/kg/min', impact: 'High', weight: 0.31 },
          { factor: 'Arterial blood gas PaO₂/FiO₂ ratio = 142 (moderate-severe ARDS)', impact: 'High', weight: 0.19 },
          { factor: 'Oliguria < 0.4 mL/kg/hr indicating acute renal cortical vasoconstriction', impact: 'Medium', weight: 0.12 },
        ]}
      />
    </div>
  );
};
