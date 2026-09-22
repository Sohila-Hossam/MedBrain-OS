import React, { useState } from 'react';
import {
  BrainCircuit,
  Lock,
  ShieldCheck,
  Building2,
  Stethoscope,
  ArrowRight,
  Activity,
  CheckCircle2,
  KeyRound,
  ArrowLeft,
  User,
  HeartPulse,
  Info,
  HelpCircle,
} from 'lucide-react';
import { UserProfile, UserRole } from '../../types';
import { INITIAL_USERS } from '../../data/mockData';

interface LoginPageProps {
  onLogin: (role: UserRole, userProfile?: UserProfile) => void;
  onBackToPublic?: () => void;
  users?: UserProfile[];
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onBackToPublic, users }) => {
  const activeUserList = users && users.length > 0 ? users : INITIAL_USERS;

  // Active portal tab: 'staff' | 'patient'
  const [authTab, setAuthTab] = useState<'staff' | 'patient'>('staff');

  // Staff credentials
  const [staffEmail, setStaffEmail] = useState('sarah.vance@medbrain.org');
  const [staffPassword, setStaffPassword] = useState('••••••••••••');
  const [staffRememberMe, setStaffRememberMe] = useState(true);

  // Patient credentials
  const [patientIdOrEmail, setPatientIdOrEmail] = useState('eleanor.davis@patientportal.org');
  const [patientPassword, setPatientPassword] = useState('••••••••••••');
  const [patientRememberMe, setPatientRememberMe] = useState(true);

  // Modals for Forgot Password
  const [forgotPasswordModal, setForgotPasswordModal] = useState<'staff' | 'patient' | null>(null);

  // Handle Staff Login Submit
  const handleStaffSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const matchedUser = activeUserList.find(
      (u) =>
        u.email.toLowerCase() === staffEmail.trim().toLowerCase() ||
        u.badgeId.toLowerCase() === staffEmail.trim().toLowerCase()
    );

    if (matchedUser && matchedUser.role !== 'Patient') {
      onLogin(matchedUser.role, matchedUser);
    } else {
      // Default to Doctor if email doesn't strictly match a known mock user
      const defaultDoc = activeUserList.find((u) => u.role === 'Doctor') || activeUserList[0];
      onLogin('Doctor', defaultDoc);
    }
  };

  // Handle Patient Login Submit
  const handlePatientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const matchedPatient = activeUserList.find(
      (u) =>
        u.role === 'Patient' &&
        (u.email.toLowerCase() === patientIdOrEmail.trim().toLowerCase() ||
          u.badgeId.toLowerCase() === patientIdOrEmail.trim().toLowerCase() ||
          u.mrn?.toLowerCase() === patientIdOrEmail.trim().toLowerCase())
    );

    if (matchedPatient) {
      onLogin('Patient', matchedPatient);
    } else {
      // Default patient fallback
      const fallbackPatient = activeUserList.find((u) => u.role === 'Patient') || {
        id: 'usr-6',
        name: 'Eleanor Davis',
        role: 'Patient' as UserRole,
        title: 'Inpatient (MICU)',
        department: 'Patient Care Services',
        email: 'eleanor.davis@patientportal.org',
        badgeId: 'PAT-8942',
        mrn: 'MRN-4491-08',
        status: 'Active' as const,
        roomBed: 'ICU-Bed 04',
        assignedPhysician: 'Dr. Sarah Vance, MD',
      };
      onLogin('Patient', fallbackPatient);
    }
  };

  // 1-Click Fast Login for reviewers
  const handleQuickLogin = (role: UserRole) => {
    const user = activeUserList.find((u) => u.role === role);
    if (user) {
      onLogin(role, user);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-center py-6 sm:py-10 px-3.5 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      {/* Subtle clinical background grid */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#0f766e15_1px,transparent_1px),linear-gradient(to_bottom,#0f766e15_1px,transparent_1px)] bg-[size:32px_32px]"></div>

      {/* Back to Public Hospital Overview Button */}
      {onBackToPublic && (
        <div className="sm:mx-auto sm:w-full sm:max-w-xl mb-4 relative z-20">
          <button
            onClick={onBackToPublic}
            id="back-to-overview-button"
            className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-teal-400" />
            <span>← Back to Public Hospital Overview</span>
          </button>
        </div>
      )}

      {/* Main Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-teal-600 to-teal-400 text-white shadow-xl shadow-teal-900/50 mb-2 sm:mb-3 ring-1 ring-teal-300/30">
          <BrainCircuit className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
        </div>
        <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight text-white">
          MedBrain <span className="text-teal-400">OS</span>
        </h1>
        <p className="mt-1 text-[11px] sm:text-xs font-semibold tracking-wide text-teal-300 uppercase">
          AI Hospital Digital Brain • Secure Portal
        </p>
      </div>

      {/* Card Wrapper */}
      <div className="mt-5 sm:mt-6 sm:mx-auto sm:w-full sm:max-w-xl relative z-10">
        <div className="bg-white text-slate-900 py-6 sm:py-7 px-4 sm:px-9 rounded-2xl shadow-2xl border border-slate-200">
          {/* Top Switcher: Staff Sign In vs. Patient Sign In */}
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2 p-1.5 bg-slate-100 rounded-xl mb-6">
            <button
              type="button"
              onClick={() => setAuthTab('staff')}
              className={`py-2 sm:py-2.5 px-2 sm:px-3 rounded-lg text-[11px] sm:text-xs font-bold transition-all flex items-center justify-center space-x-1.5 sm:space-x-2 cursor-pointer ${
                authTab === 'staff'
                  ? 'bg-white text-slate-900 shadow-xs ring-1 ring-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Stethoscope className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-600" />
              <span>Medical Staff</span>
            </button>

            <button
              type="button"
              onClick={() => setAuthTab('patient')}
              id="patient-signin-tab"
              className={`py-2 sm:py-2.5 px-2 sm:px-3 rounded-lg text-[11px] sm:text-xs font-bold transition-all flex items-center justify-center space-x-1.5 sm:space-x-2 cursor-pointer ${
                authTab === 'patient'
                  ? 'bg-white text-slate-900 shadow-xs ring-1 ring-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />
              <span>Patient Sign In</span>
            </button>
          </div>

          {/* ================= STAFF SIGN IN VIEW ================= */}
          {authTab === 'staff' && (
            <div>
              <div className="border-b border-slate-100 pb-4 mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-slate-900">Hospital Staff Authentication</h2>
                  <p className="text-xs text-slate-500">Doctors, Nurses, Researchers & Hospital Administrators</p>
                </div>
                <div className="flex items-center space-x-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-200 rounded-md text-[10px] font-bold text-emerald-800">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>HIPAA Secured</span>
                </div>
              </div>

              <form onSubmit={handleStaffSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Staff Institutional Email / Username
                  </label>
                  <input
                    type="text"
                    value={staffEmail}
                    onChange={(e) => setStaffEmail(e.target.value)}
                    required
                    placeholder="e.g. sarah.vance@medbrain.org or PHYS-48921"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-teal-600 transition-all font-medium"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                      Password / Passkey
                    </label>
                    <button
                      type="button"
                      onClick={() => setForgotPasswordModal('staff')}
                      className="text-xs text-teal-700 hover:text-teal-900 font-semibold cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <input
                    type="password"
                    value={staffPassword}
                    onChange={(e) => setStaffPassword(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-teal-600 transition-all font-mono"
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={staffRememberMe}
                      onChange={(e) => setStaffRememberMe(e.target.checked)}
                      className="w-4 h-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500"
                    />
                    <span className="text-xs text-slate-600 font-medium">Remember clinical workstation</span>
                  </label>
                  <span className="text-[11px] font-mono text-slate-400">Terminal: WS-ICU-084</span>
                </div>

                <button
                  type="submit"
                  id="staff-submit-button"
                  className="w-full mt-3 flex items-center justify-center space-x-2 py-3 px-4 bg-teal-700 hover:bg-teal-800 active:bg-teal-900 text-white text-xs sm:text-sm font-bold rounded-lg shadow-md shadow-teal-900/20 transition-colors cursor-pointer"
                >
                  <span>Authenticate & Enter MedBrain OS</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Fast 1-Click Role Access for Reviewers */}
              <div className="mt-7 pt-5 border-t border-slate-200">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center justify-between">
                  <span>Quick Test Sign-In (Fixed Staff Roles)</span>
                  <span className="text-[10px] text-slate-400">Click to enter as assigned role</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {activeUserList
                    .filter((u) => u.role !== 'Patient')
                    .map((u) => (
                      <button
                        key={u.id}
                        type="button"
                        onClick={() => handleQuickLogin(u.role)}
                        className="p-2 text-left rounded-lg border border-slate-200 hover:border-teal-500 hover:bg-teal-50/50 transition-all cursor-pointer group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900 group-hover:text-teal-900 truncate">
                            {u.role}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-600 truncate mt-0.5">{u.name.split(',')[0]}</div>
                        <div className="text-[10px] text-slate-400 truncate">{u.badgeId}</div>
                      </button>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* ================= PATIENT SIGN IN VIEW ================= */}
          {authTab === 'patient' && (
            <div className="animate-in fade-in duration-150">
              <div className="border-b border-slate-100 pb-4 mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-slate-900">Patient Health Portal Sign-In</h2>
                  <p className="text-xs text-slate-500">Access your live inpatient vitals, care team & prescriptions</p>
                </div>
                <div className="flex items-center space-x-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-200 rounded-md text-[10px] font-bold text-emerald-800">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Encrypted Patient Data</span>
                </div>
              </div>

              <form onSubmit={handlePatientSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Patient Email or Medical Record Number (MRN)
                  </label>
                  <input
                    type="text"
                    value={patientIdOrEmail}
                    onChange={(e) => setPatientIdOrEmail(e.target.value)}
                    required
                    placeholder="e.g. eleanor.davis@patientportal.org or MRN-4491-08"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-600 transition-all font-medium"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                      Portal Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setForgotPasswordModal('patient')}
                      className="text-xs text-emerald-700 hover:text-emerald-900 font-semibold cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <input
                    type="password"
                    value={patientPassword}
                    onChange={(e) => setPatientPassword(e.target.value)}
                    required
                    placeholder="••••••••••••"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-600 transition-all font-mono"
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={patientRememberMe}
                      onChange={(e) => setPatientRememberMe(e.target.checked)}
                      className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                    />
                    <span className="text-xs text-slate-600 font-medium">Remember on this device</span>
                  </label>
                  <span className="text-[11px] text-slate-400">Patient Access 256-bit</span>
                </div>

                <button
                  type="submit"
                  id="patient-submit-button"
                  className="w-full mt-3 flex items-center justify-center space-x-2 py-3 px-4 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white text-xs sm:text-sm font-bold rounded-lg shadow-md transition-colors cursor-pointer"
                >
                  <span>Sign In to Patient Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Quick Patient Test Sign In */}
              <div className="mt-7 pt-5 border-t border-slate-200">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center justify-between">
                  <span>Quick Patient Test Sign-In</span>
                  <span className="text-[10px] text-slate-400">1-Click Test Access</span>
                </div>

                <button
                  type="button"
                  onClick={() => handleQuickLogin('Patient')}
                  id="quick-patient-login-button"
                  className="w-full p-3 text-left rounded-xl border border-emerald-300 bg-emerald-50/70 hover:bg-emerald-100/80 transition-all cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs">
                      ED
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">Eleanor Davis (Patient)</div>
                      <div className="text-[11px] text-emerald-800 font-medium">Medical ICU • Bed 04 • MRN-4491-08</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                    <span>Sign In</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Security / Compliance Badges */}
        <div className="mt-6 text-center text-xs text-slate-400 flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          <span className="flex items-center space-x-1">
            <Lock className="w-3.5 h-3.5 text-teal-400 shrink-0" />
            <span>FIPS 140-2 Validated Encryption</span>
          </span>
          <span className="hidden sm:inline">•</span>
          <span>HL7 FHIR v4.0.1</span>
          <span className="hidden sm:inline">•</span>
          <span>Joint Commission Accredited</span>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {forgotPasswordModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-teal-600" />
                <span>
                  {forgotPasswordModal === 'patient' ? 'Patient Portal Password Help' : 'Staff IT Password Recovery'}
                </span>
              </h3>
              <button
                onClick={() => setForgotPasswordModal(null)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              {forgotPasswordModal === 'patient' ? (
                <>
                  <p>
                    For your privacy and security under HIPAA guidelines, patient portal credentials cannot be reset via unverified automated links.
                  </p>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                    <div className="font-bold text-slate-900">How to reset your Patient Password:</div>
                    <ul className="list-disc list-inside space-y-0.5 text-slate-600">
                      <li>Ask your bedside charge nurse (Elena Rostova) to issue a temporary PIN.</li>
                      <li>Call Patient Access Services at <strong>(555) 019-4800</strong> (24/7).</li>
                      <li>Visit the Patient Relations Desk in the Main Hospital Lobby.</li>
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <p>
                    Medical and administrative staff accounts are managed via the hospital's central Active Directory / LDAP federation.
                  </p>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                    <div className="font-bold text-slate-900">Hospital IT Helpdesk:</div>
                    <p>Internal Extension: <strong>Ext. 4357 (HELP)</strong></p>
                    <p>Direct Dial: <strong>(555) 019-HELP</strong></p>
                    <p>Clinical Informatics Center: Room 2B-104</p>
                  </div>
                </>
              )}
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setForgotPasswordModal(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
