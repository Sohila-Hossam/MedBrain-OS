import React, { useState } from 'react';
import {
  Heart,
  Activity,
  Pill,
  Calendar,
  UserCheck,
  Bell,
  MessageSquare,
  FileText,
  ShieldCheck,
  CheckCircle2,
  Clock,
  PhoneCall,
  Info,
  ChevronRight,
  Send,
  AlertCircle,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import { UserProfile } from '../../types';

interface PatientPortalProps {
  currentUser: UserProfile;
}

export const PatientPortal: React.FC<PatientPortalProps> = ({ currentUser }) => {
  const [activeTab, setActiveTab] = useState<'summary' | 'medications' | 'careteam' | 'schedule' | 'results'>('summary');
  const [nurseCallSent, setNurseCallSent] = useState<string | null>(null);
  const [messageOpen, setMessageOpen] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [messageSentSuccess, setMessageSentSuccess] = useState(false);

  const handleCallNurse = (requestType: string) => {
    setNurseCallSent(requestType);
    setTimeout(() => {
      setNurseCallSent(null);
    }, 4000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    setMessageSentSuccess(true);
    setMessageText('');
    setTimeout(() => {
      setMessageSentSuccess(false);
      setMessageOpen(false);
    }, 2500);
  };

  return (
    <div className="space-y-6">
      {/* Patient Welcome & Bedside Status Banner */}
      <div className="bg-gradient-to-r from-teal-800 to-slate-900 rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-300 via-teal-600 to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-teal-700/60 border border-teal-500/40 text-xs font-semibold text-teal-200 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Inpatient Portal • Private Health Record</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Hello, {currentUser.name || 'Eleanor Davis'}
            </h1>

            <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-teal-100/90 mt-2">
              <span><strong>MRN:</strong> {currentUser.mrn || 'MRN-4491-08'}</span>
              <span>•</span>
              <span><strong>Room & Bed:</strong> {currentUser.roomBed || 'Medical ICU - Bed 04'}</span>
              <span>•</span>
              <span><strong>Attending Doctor:</strong> {currentUser.assignedPhysician || 'Dr. Sarah Vance, MD'}</span>
            </div>
          </div>

          {/* Quick Bedside Nurse Call Button */}
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => handleCallNurse('Nurse Assistance')}
              className="px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 active:bg-teal-600 text-slate-950 font-bold text-xs shadow-lg flex items-center justify-center space-x-2 transition-all cursor-pointer"
            >
              <Bell className="w-4 h-4 text-slate-950" />
              <span>Call Bedside Nurse</span>
            </button>
            <button
              onClick={() => setMessageOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-white font-semibold text-xs border border-slate-700 flex items-center justify-center space-x-2 transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-teal-300" />
              <span>Message Care Team</span>
            </button>
          </div>
        </div>

        {nurseCallSent && (
          <div className="mt-4 p-3 bg-emerald-500/20 border border-emerald-400/40 rounded-xl text-xs font-bold text-emerald-200 flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Nurse Call Dispatched: Elena Rostova, BSN has received your alert and is responding to Bed 04.</span>
          </div>
        )}
      </div>

      {/* Patient-Friendly Navigation Tabs */}
      <div className="flex border-b border-slate-200 bg-white rounded-xl px-2 sm:px-4 shadow-2xs overflow-x-auto no-scrollbar scroll-smooth">
        <button
          onClick={() => setActiveTab('summary')}
          className={`py-3 sm:py-3.5 px-3 sm:px-4 text-xs font-bold whitespace-nowrap border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'summary' ? 'border-teal-600 text-teal-700' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>My Health & Vitals</span>
        </button>
        <button
          onClick={() => setActiveTab('medications')}
          className={`py-3 sm:py-3.5 px-3 sm:px-4 text-xs font-bold whitespace-nowrap border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'medications' ? 'border-teal-600 text-teal-700' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Pill className="w-4 h-4" />
          <span>Prescriptions & Schedule</span>
        </button>
        <button
          onClick={() => setActiveTab('careteam')}
          className={`py-3 sm:py-3.5 px-3 sm:px-4 text-xs font-bold whitespace-nowrap border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'careteam' ? 'border-teal-600 text-teal-700' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>My Care Team</span>
        </button>
        <button
          onClick={() => setActiveTab('schedule')}
          className={`py-3 sm:py-3.5 px-3 sm:px-4 text-xs font-bold whitespace-nowrap border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'schedule' ? 'border-teal-600 text-teal-700' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Today's Schedule</span>
        </button>
        <button
          onClick={() => setActiveTab('results')}
          className={`py-3 sm:py-3.5 px-3 sm:px-4 text-xs font-bold whitespace-nowrap border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'results' ? 'border-teal-600 text-teal-700' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Lab & Test Results</span>
        </button>
      </div>

      {/* TAB 1: My Health & Vitals */}
      {activeTab === 'summary' && (
        <div className="space-y-6">
          {/* Recovery Overview Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-teal-600" />
                <span>Today's Recovery Status</span>
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-200">
                Improving Steadily
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              You are on Day 4 of admission for treatment of acute lobar pneumonia. Your oxygen levels are stable on low-flow cannula (2 Liters),
              infection markers have decreased by 48% over the past 48 hours, and your lungs sound significantly clearer today.
            </p>
            <div className="p-3 bg-teal-50/80 rounded-lg border border-teal-200/80 text-xs text-teal-900 flex items-start gap-2">
              <Info className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <strong>Physician Note from Dr. Sarah Vance:</strong> "Eleanor is doing very well. We plan to taper IV antibiotics to oral later today, and if her chest imaging remains stable tomorrow, we will transition her to the step-down recovery floor."
              </div>
            </div>
          </div>

          {/* Patient-Friendly Vitals Grid */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Live Bedside Vitals (Continuous Telemetry)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
                  <span>Heart Rate</span>
                  <Heart className="w-4 h-4 text-rose-500" />
                </div>
                <div className="text-2xl font-bold text-slate-900 mt-2">78 <span className="text-xs text-slate-500 font-normal">bpm</span></div>
                <div className="mt-1 flex items-center text-[11px] text-emerald-700 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5" />
                  <span>Normal & Steady</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
                  <span>Blood Pressure</span>
                  <Activity className="w-4 h-4 text-teal-500" />
                </div>
                <div className="text-2xl font-bold text-slate-900 mt-2">118/74 <span className="text-xs text-slate-500 font-normal">mmHg</span></div>
                <div className="mt-1 flex items-center text-[11px] text-emerald-700 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5" />
                  <span>Optimal Blood Flow</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
                  <span>Oxygen Saturation</span>
                  <Activity className="w-4 h-4 text-blue-500" />
                </div>
                <div className="text-2xl font-bold text-slate-900 mt-2">98% <span className="text-xs text-slate-500 font-normal">SpO2</span></div>
                <div className="mt-1 flex items-center text-[11px] text-emerald-700 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5" />
                  <span>Excellent Oxygenation</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
                  <span>Body Temperature</span>
                  <Activity className="w-4 h-4 text-amber-500" />
                </div>
                <div className="text-2xl font-bold text-slate-900 mt-2">98.6 <span className="text-xs text-slate-500 font-normal">°F</span></div>
                <div className="mt-1 flex items-center text-[11px] text-emerald-700 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5" />
                  <span>No Fever (Afebrile)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Bedside Assistance Request Buttons */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Need Immediate Bedside Assistance?</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                onClick={() => handleCallNurse('Water / Ice Request')}
                className="p-3 bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-300 rounded-lg text-left transition-all cursor-pointer"
              >
                <div className="font-bold text-xs text-slate-900">Request Water / Ice</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Hydration refresh</div>
              </button>

              <button
                onClick={() => handleCallNurse('Pain Relief Evaluation')}
                className="p-3 bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-300 rounded-lg text-left transition-all cursor-pointer"
              >
                <div className="font-bold text-xs text-slate-900">Pain Assessment</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Inform nurse of discomfort</div>
              </button>

              <button
                onClick={() => handleCallNurse('Assistance Moving / Walking')}
                className="p-3 bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-300 rounded-lg text-left transition-all cursor-pointer"
              >
                <div className="font-bold text-xs text-slate-900">Assistance Moving</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Help moving to chair/restroom</div>
              </button>

              <button
                onClick={() => handleCallNurse('Speak to Attending Doctor')}
                className="p-3 bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-300 rounded-lg text-left transition-all cursor-pointer"
              >
                <div className="font-bold text-xs text-slate-900">Speak With Doctor</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Request physician round</div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Medications */}
      {activeTab === 'medications' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900">My Current Medications & Schedule</h2>
              <p className="text-xs text-slate-500">Administered directly by your nursing team</p>
            </div>
            <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
              4 Active Prescriptions
            </span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="font-bold text-slate-900 text-sm">Meropenem IV (1g / 100mL)</span>
                <p className="text-slate-500 text-xs mt-0.5">Purpose: Targeted antibiotic to treat lung infection</p>
                <span className="text-[11px] font-mono text-teal-700 font-medium">Schedule: Every 8 Hours • Next Dose: 2:00 PM</span>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 font-bold text-xs border border-emerald-200 self-start sm:self-auto">
                Administered on Schedule
              </span>
            </div>

            <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="font-bold text-slate-900 text-sm">Salbutamol Inhaler (100mcg)</span>
                <p className="text-slate-500 text-xs mt-0.5">Purpose: Bronchodilator to keep airways relaxed and breathing easy</p>
                <span className="text-[11px] font-mono text-teal-700 font-medium">Schedule: Every 4 to 6 Hours as needed</span>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 font-bold text-xs border border-emerald-200 self-start sm:self-auto">
                Available at Bedside
              </span>
            </div>

            <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="font-bold text-slate-900 text-sm">Enoxaparin (Lovenox 40mg SubQ)</span>
                <p className="text-slate-500 text-xs mt-0.5">Purpose: Blood clot prevention while resting in hospital bed</p>
                <span className="text-[11px] font-mono text-teal-700 font-medium">Schedule: Once Daily at 9:00 PM</span>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 font-bold text-xs border border-emerald-200 self-start sm:self-auto">
                Next Dose Tonight
              </span>
            </div>

            <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="font-bold text-slate-900 text-sm">Balanced Maintenance Electrolyte Infusion</span>
                <p className="text-slate-500 text-xs mt-0.5">Purpose: Hydration and potassium/magnesium balance</p>
                <span className="text-[11px] font-mono text-teal-700 font-medium">Schedule: Continuous slow infusion (50 mL/h)</span>
              </div>
              <span className="px-2.5 py-1 rounded bg-blue-50 text-blue-800 font-bold text-xs border border-blue-200 self-start sm:self-auto">
                Continuous
              </span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Care Team */}
      {activeTab === 'careteam' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs">
            <h2 className="text-sm font-bold text-slate-900 mb-1">Your Multidisciplinary Care Team</h2>
            <p className="text-xs text-slate-500 mb-4">Dedicated medical staff managing your treatment in the Medical ICU</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-start space-x-3">
                <div className="w-10 h-10 rounded-full bg-teal-800 text-white flex items-center justify-center font-bold text-sm shrink-0">
                  SV
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm">Dr. Sarah Vance, MD, FCCP</div>
                  <div className="text-xs text-teal-700 font-medium">Attending Physician & Critical Care Director</div>
                  <p className="text-[11px] text-slate-500 mt-1">Conducts daily morning rounds at 10:30 AM.</p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-start space-x-3">
                <div className="w-10 h-10 rounded-full bg-teal-700 text-white flex items-center justify-center font-bold text-sm shrink-0">
                  ER
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm">Elena Rostova, BSN, CCRN</div>
                  <div className="text-xs text-teal-700 font-medium">Primary Bedside Charge Nurse</div>
                  <p className="text-[11px] text-slate-500 mt-1">On duty 7:00 AM – 7:00 PM. Stationed at Pod 2.</p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-start space-x-3">
                <div className="w-10 h-10 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-sm shrink-0">
                  JM
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm">Dr. James Miller, PharmD</div>
                  <div className="text-xs text-slate-600 font-medium">Clinical Pharmacist</div>
                  <p className="text-[11px] text-slate-500 mt-1">Overseeing antibiotic kinetic dosing and kidney safety.</p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-start space-x-3">
                <div className="w-10 h-10 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-sm shrink-0">
                  LC
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm">Lisa Chen, DPT, RRT</div>
                  <div className="text-xs text-slate-600 font-medium">Respiratory & Physical Therapist</div>
                  <p className="text-[11px] text-slate-500 mt-1">Scheduled for breathing exercises and assisted walking at 2:00 PM.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Today's Schedule */}
      {activeTab === 'schedule' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900">Today's Care Timeline & Activities</h2>
            <p className="text-xs text-slate-500">Thursday, September 11, 2026</p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-start space-x-3 p-3 bg-emerald-50/60 rounded-lg border border-emerald-200">
              <Clock className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-slate-900">08:00 AM • Morning Vitals & Blood Draw (Completed)</div>
                <div className="text-slate-600 mt-0.5">CBC and metabolic panel drawn; infection markers down by 48%.</div>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-teal-50/60 rounded-lg border border-teal-200">
              <Clock className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-slate-900">10:30 AM • Attending Rounds with Dr. Vance</div>
                <div className="text-slate-600 mt-0.5">Discussion of step-down ward transfer and oral medication switch.</div>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
              <Clock className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-slate-900">12:30 PM • Nutritional Lunch Service</div>
                <div className="text-slate-600 mt-0.5">Heart-healthy low sodium dietary tray.</div>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
              <Clock className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-slate-900">02:00 PM • Respiratory Therapy with Lisa Chen</div>
                <div className="text-slate-600 mt-0.5">Incentive spirometry breathing workout and assisted hallway ambulation.</div>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
              <Clock className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-slate-900">04:30 PM • Follow-up Chest Ultrasound</div>
                <div className="text-slate-600 mt-0.5">Non-invasive check to confirm fluid resolution in the lower lung lobes.</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: Lab & Test Results */}
      {activeTab === 'results' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900">Recent Laboratory & Diagnostic Results</h2>
            <p className="text-xs text-slate-500">Reviewed and verified by your attending physician</p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-sm">White Blood Cell Count (Infection Marker)</span>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[11px]">
                  9.2 K/uL (Normal)
                </span>
              </div>
              <p className="text-slate-600">
                Standard Range: 4.5 – 11.0 K/uL. Down from 18.4 K/uL on Day 1. This confirms your infection is clearing effectively.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-sm">Blood Lactate (Oxygenation Index)</span>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[11px]">
                  1.1 mmol/L (Optimal)
                </span>
              </div>
              <p className="text-slate-600">
                Standard Range: 0.5 – 2.0 mmol/L. Normal tissue perfusion throughout your vital organs.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-sm">Chest Radiograph (X-Ray)</span>
                <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold text-[11px]">
                  Marked Improvement
                </span>
              </div>
              <p className="text-slate-600">
                Radiologist Note: "Significant aeration in right middle and lower lobes compared to admission film. No new infiltrates or pleural effusions."
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Message Care Team Modal */}
      {messageOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Send Message to Care Team</h3>
                <p className="text-xs text-slate-500">Sent directly to Dr. Vance and Charge Nurse Rostova</p>
              </div>
              <button
                onClick={() => setMessageOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-sm"
              >
                ✕
              </button>
            </div>

            {messageSentSuccess ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Message delivered to Dr. Vance's clinical pager. Expected response within 15 minutes.</span>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Question or Concern:
                  </label>
                  <textarea
                    rows={4}
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    required
                    placeholder="e.g. Could I ask the doctor about when I might be moved to the step-down room? Or I have a mild headache..."
                    className="w-full p-3 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-600"
                  />
                </div>

                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setMessageOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-bold bg-teal-700 hover:bg-teal-800 text-white rounded-lg transition-colors flex items-center space-x-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send to Nurse & Doctor</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
