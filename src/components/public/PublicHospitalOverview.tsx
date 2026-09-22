import React, { useState } from 'react';
import {
  BrainCircuit,
  Building2,
  Bed,
  Users,
  Activity,
  HeartPulse,
  ShieldCheck,
  Stethoscope,
  ArrowRight,
  TrendingUp,
  Clock,
  Radio,
  FileCheck2,
  Award,
  Sparkles,
  Search,
  ExternalLink,
  ChevronRight,
  Lock,
  PhoneCall,
  MapPin,
  Ambulance,
  Zap,
} from 'lucide-react';

interface PublicHospitalOverviewProps {
  onOpenSignIn: () => void;
}

export const PublicHospitalOverview: React.FC<PublicHospitalOverviewProps> = ({ onOpenSignIn }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'departments' | 'capacity' | 'services' | 'technology'>('overview');

  const departments = [
    {
      id: 'micu',
      name: 'Medical Intensive Care Unit (MICU)',
      beds: 24,
      occupied: 22,
      director: 'Dr. Sarah Vance, MD, FCCP',
      specialties: ['Acute Respiratory Distress Syndrome (ARDS)', 'Septic Shock Resuscitation', 'Continuous Hemofiltration'],
      equipment: ['AI Continuous Arterial Waveform Trackers', 'Targeted Temperature Enclosures', 'High-Frequency Oscillators'],
      acuity: 'Level 1 Critical',
    },
    {
      id: 'cvicu',
      name: 'Cardiovascular ICU & Heart Institute',
      beds: 18,
      occupied: 17,
      director: 'Dr. Robert Thorne, MD, FACC',
      specialties: ['Post-CABG & Valve Reconstructions', 'ECMO Mechanical Circulatory Support', 'Cardiogenic Shock Protocols'],
      equipment: ['CentriMag VAD Consoles', 'Cardiopulmonary Bypass Telemetry', 'Dynamic SVR Monitors'],
      acuity: 'Level 1 Cardiac',
    },
    {
      id: 'trauma',
      name: 'Level 1 Trauma Resuscitation Center',
      beds: 12,
      occupied: 10,
      director: 'Dr. Kimberly Chen, MD, FACS',
      specialties: ['Polytrauma Damage Control', 'Emergency Surgical Resuscitation', 'Neurotrauma Rapid Decompression'],
      equipment: ['Dual-Source Hybrid CT Trauma Suites', 'Rapid Infuser Auto-Transfusion Units', 'Direct Helipad Airlift Bay'],
      acuity: 'Highest Priority',
    },
    {
      id: 'nccu',
      name: 'Neurological Critical Care (NCCU)',
      beds: 16,
      occupied: 15,
      director: 'Dr. Julian Morales, MD, PhD',
      specialties: ['Subarachnoid Hemorrhage', 'Comprehensive Thrombectomy Monitoring', 'Status Epilepticus Management'],
      equipment: ['Continuous Quantitative 64-Channel EEG', 'Pupillometry Optical Arrays', 'ICP Micro-Transducers'],
      acuity: 'Level 1 Neuro',
    },
    {
      id: 'sicu',
      name: 'Surgical & Transplant ICU (SICU)',
      beds: 14,
      occupied: 12,
      director: 'Dr. Maya Patel, MD, FAST',
      specialties: ['Hepatic & Renal Transplantation', 'Complex Abdominal Reconstruction', 'Microvascular Free Flaps'],
      equipment: ['Near-Infrared Tissue Perfusion Probes', 'Continuous Thromboelastography (TEG)', 'Targeted Cytokine Filters'],
      acuity: 'Level 1 Surgical',
    },
    {
      id: 'oncology',
      name: 'Precision Oncology & Cellular Therapeutics',
      beds: 20,
      occupied: 18,
      director: 'Dr. David Lindqvist, MD, PhD',
      specialties: ['CAR-T Cell Infusions', 'Cytokine Release Syndrome Management', 'Experimental Phase I Immunotherapies'],
      equipment: ['HEPA Positive Pressure Clean Suites', 'Cellular Thawing Cryo-Stations', 'Continuous Biometric Patches'],
      acuity: 'Specialized Oncology',
    },
  ];

  const hospitalServices = [
    {
      title: 'Quaternary Intensive Care',
      desc: '70 dedicated critical care beds supported by 24/7 in-house board-certified intensivists and real-time hemodynamic ODE digital twins.',
      icon: HeartPulse,
      badge: '24/7 In-House Attending',
    },
    {
      title: 'Level 1 Comprehensive Trauma',
      desc: 'Highest verification standard with twin rooftop helipads, direct-to-CT trauma bays, and immediate multidisciplinary operative response.',
      icon: Ambulance,
      badge: 'State Certified',
    },
    {
      title: 'Precision AI Diagnostic Intelligence',
      desc: 'Embedded MedBrain OS clinical neural algorithms predicting sepsis, cardiac collapse, and respiratory failure 4 to 6 hours before onset.',
      icon: Sparkles,
      badge: 'MIMIC-IV Validated',
    },
    {
      title: 'Extracorporeal Life Support (ECMO)',
      desc: 'ELSO Center of Excellence providing mobile cannulation and transport for refractory ARDS and catastrophic cardiogenic shock.',
      icon: Activity,
      badge: 'Platinum Center',
    },
    {
      title: 'Clinical Genomics & Translational Trials',
      desc: 'Active biobanking and computational drug response modeling with 140+ active institutional research protocols.',
      icon: BrainCircuit,
      badge: 'NIH / IRB Governed',
    },
    {
      title: 'Integrated Tele-ICU Command Network',
      desc: 'Centralized telemetry hub overseeing continuous multi-parameter waveforms across 520 beds with automated early-warning paging.',
      icon: Radio,
      badge: 'Continuous Ingestion',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-teal-500 selection:text-white">
      {/* Top Emergency & Public Announcement Bar */}
      <div className="bg-slate-950/90 border-b border-slate-800 py-1.5 px-4 text-[11px] text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-3">
            <span className="flex items-center space-x-1.5 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Emergency Center: OPEN (No Diversion)</span>
            </span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="text-slate-400 hidden sm:inline">Trauma Level 1: Ready</span>
            <span className="text-slate-600 hidden md:inline">•</span>
            <span className="text-slate-400 hidden md:inline">Current Hospital Census: 482 / 520 (92.6%)</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1 text-slate-400">
              <PhoneCall className="w-3 h-3 text-teal-400" />
              <span>Main Switchboard: (555) 019-2000</span>
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400 font-mono">HIPAA & HL7 FHIR Compliant</span>
          </div>
        </div>
      </div>

      {/* Main Public Navigation Header */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-2">
          {/* Hospital Brand & MedBrain Tag */}
          <div className="flex items-center space-x-2.5 sm:space-x-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-teal-400 flex items-center justify-center text-white shadow-md shadow-teal-950/50 ring-1 ring-teal-300/30 shrink-0">
              <BrainCircuit className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center space-x-2">
                <span className="text-xs sm:text-base md:text-lg font-extrabold text-white tracking-tight truncate">
                  Metropolitan Memorial Medical Center
                </span>
                <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-teal-950 text-teal-300 border border-teal-800 shrink-0">
                  Powered by MedBrain OS
                </span>
              </div>
              <p className="hidden sm:block text-[11px] text-slate-400 leading-none mt-0.5 truncate">
                Academic Quaternary Hospital • Level 1 Trauma Center
              </p>
            </div>
          </div>

          {/* Quick Nav Anchors */}
          <div className="hidden lg:flex items-center space-x-6 text-xs font-semibold text-slate-300 shrink-0">
            <button
              onClick={() => setActiveTab('overview')}
              className={`hover:text-teal-400 transition-colors ${activeTab === 'overview' ? 'text-teal-400' : ''}`}
            >
              Hospital Overview
            </button>
            <button
              onClick={() => setActiveTab('departments')}
              className={`hover:text-teal-400 transition-colors ${activeTab === 'departments' ? 'text-teal-400' : ''}`}
            >
              Departments
            </button>
            <button
              onClick={() => setActiveTab('capacity')}
              className={`hover:text-teal-400 transition-colors ${activeTab === 'capacity' ? 'text-teal-400' : ''}`}
            >
              Live Capacity
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`hover:text-teal-400 transition-colors ${activeTab === 'services' ? 'text-teal-400' : ''}`}
            >
              Clinical Services
            </button>
            <button
              onClick={() => setActiveTab('technology')}
              className={`hover:text-teal-400 transition-colors ${activeTab === 'technology' ? 'text-teal-400' : ''}`}
            >
              MedBrain OS
            </button>
          </div>

          {/* Prominent Sign In Button */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            <button
              onClick={onOpenSignIn}
              id="public-signin-button"
              className="px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-lg bg-teal-600 hover:bg-teal-500 active:bg-teal-700 text-white text-xs sm:text-sm font-bold shadow-lg shadow-teal-950/50 flex items-center space-x-1.5 sm:space-x-2 transition-all transform hover:-translate-y-0.5 cursor-pointer ring-1 ring-teal-400/30 whitespace-nowrap"
            >
              <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Sign In</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:py-20 border-b border-slate-800/80">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#0f766e15_1px,transparent_1px),linear-gradient(to_bottom,#0f766e15_1px,transparent_1px)] bg-[size:36px_36px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Col: Introduction */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-950/80 border border-teal-800/60 text-xs font-semibold text-teal-300">
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                <span>Next-Generation AI Hospital Digital Brain</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Quaternary Clinical Excellence, <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
                  Continuous Neural Intelligence.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                Metropolitan Memorial Medical Center integrates quaternary bedside critical care with{' '}
                <strong className="text-white font-semibold">MedBrain OS</strong> — an enterprise clinical AI engine providing
                continuous real-time telemetry, predictive sepsis early-warning, and individualized patient digital twins.
              </p>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-wrap items-center gap-3">
                <button
                  onClick={onOpenSignIn}
                  className="px-6 py-3 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm shadow-xl shadow-teal-950/60 flex items-center space-x-2 transition-all cursor-pointer"
                >
                  <Lock className="w-4 h-4" />
                  <span>Enter MedBrain Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setActiveTab('capacity')}
                  className="px-5 py-3 rounded-lg bg-slate-800/90 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-sm border border-slate-700/80 transition-colors flex items-center space-x-2"
                >
                  <Activity className="w-4 h-4 text-teal-400" />
                  <span>View Hospital Capacity</span>
                </button>
              </div>

              {/* Verified Trust Badges */}
              <div className="pt-4 flex flex-wrap items-center gap-4 text-xs text-slate-400">
                <div className="flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-teal-400" />
                  <span>The Joint Commission Accredited</span>
                </div>
                <span>•</span>
                <div className="flex items-center space-x-1.5">
                  <Award className="w-4 h-4 text-teal-400" />
                  <span>ACS Level 1 Trauma Center</span>
                </div>
                <span>•</span>
                <div className="flex items-center space-x-1.5">
                  <FileCheck2 className="w-4 h-4 text-teal-400" />
                  <span>HIPAA / HL7 FHIR v4 Certified</span>
                </div>
              </div>
            </div>

            {/* Right Col: High-Level Real-Time Hospital Status Card */}
            <div className="lg:col-span-5">
              <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 shadow-2xl backdrop-blur-md relative">
                <div className="flex items-center justify-between border-b border-slate-700 pb-4 mb-5">
                  <div className="flex items-center space-x-2.5">
                    <Building2 className="w-5 h-5 text-teal-400" />
                    <div>
                      <h2 className="text-sm font-bold text-white">Live Hospital Operations</h2>
                      <p className="text-[11px] text-slate-400">Aggregated non-PHI hospital metrics</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                    Live Feed
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3.5 mb-5">
                  <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Inpatients</span>
                    <div className="text-2xl font-extrabold text-white mt-1">482 <span className="text-xs text-slate-400 font-normal">/ 520</span></div>
                    <div className="text-[10px] text-teal-400 font-medium mt-1">92.6% Occupancy</div>
                  </div>

                  <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">ICU Bed Census</span>
                    <div className="text-2xl font-extrabold text-teal-300 mt-1">64 <span className="text-xs text-slate-400 font-normal">/ 70</span></div>
                    <div className="text-[10px] text-amber-400 font-medium mt-1">91.4% ICU Capacity</div>
                  </div>

                  <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">OR Theaters In Use</span>
                    <div className="text-2xl font-extrabold text-white mt-1">18 <span className="text-xs text-slate-400 font-normal">/ 20</span></div>
                    <div className="text-[10px] text-emerald-400 font-medium mt-1">2 Emergency Ready</div>
                  </div>

                  <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Active Ventilators</span>
                    <div className="text-2xl font-extrabold text-white mt-1">24 <span className="text-xs text-slate-400 font-normal">/ 35</span></div>
                    <div className="text-[10px] text-emerald-400 font-medium mt-1">11 in reserve</div>
                  </div>
                </div>

                <div className="p-3 bg-teal-950/40 rounded-xl border border-teal-900/60 text-xs text-slate-300 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>AI Early-Warning Lead Time:</span>
                  </div>
                  <span className="font-bold text-teal-300 font-mono">4.8 Hours Ahead</span>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-700/80 flex items-center justify-between">
                  <div className="text-[11px] text-slate-400">Need patient or staff portal access?</div>
                  <button
                    onClick={onOpenSignIn}
                    className="text-xs font-bold text-teal-400 hover:text-teal-300 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Sign In Here</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Hospital Statistics Bar */}
      <section className="bg-slate-950 py-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-white">520</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">Licensed Beds</div>
            </div>
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-teal-400">70</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">Specialized ICU Beds</div>
            </div>
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-white">48,500+</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">Annual Admissions</div>
            </div>
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-teal-400">98.4%</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">Trauma Survival Rate</div>
            </div>
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-white">142</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">Active Clinical Trials</div>
            </div>
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">2.4 min</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">Avg. Critical Response</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Sections: Navigation Tabs */}
      <section className="py-12 bg-slate-900/90 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Section Selector Tabs */}
          <div className="flex border-b border-slate-800 overflow-x-auto no-scrollbar scroll-smooth">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-2.5 sm:py-3 px-3.5 sm:px-5 text-xs sm:text-sm font-bold whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
                activeTab === 'overview'
                  ? 'border-teal-500 text-teal-400 bg-slate-800/30'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Hospital Overview
            </button>
            <button
              onClick={() => setActiveTab('departments')}
              className={`py-2.5 sm:py-3 px-3.5 sm:px-5 text-xs sm:text-sm font-bold whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
                activeTab === 'departments'
                  ? 'border-teal-500 text-teal-400 bg-slate-800/30'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Specialized Departments
            </button>
            <button
              onClick={() => setActiveTab('capacity')}
              className={`py-2.5 sm:py-3 px-3.5 sm:px-5 text-xs sm:text-sm font-bold whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
                activeTab === 'capacity'
                  ? 'border-teal-500 text-teal-400 bg-slate-800/30'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              ICU & Inpatient Capacity
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`py-2.5 sm:py-3 px-3.5 sm:px-5 text-xs sm:text-sm font-bold whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
                activeTab === 'services'
                  ? 'border-teal-500 text-teal-400 bg-slate-800/30'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Clinical Services
            </button>
            <button
              onClick={() => setActiveTab('technology')}
              className={`py-2.5 sm:py-3 px-3.5 sm:px-5 text-xs sm:text-sm font-bold whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
                activeTab === 'technology'
                  ? 'border-teal-500 text-teal-400 bg-slate-800/30'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              MedBrain OS Architecture
            </button>
          </div>

          {/* TAB 1: Hospital Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-slate-800/70 border border-slate-700/80 rounded-2xl p-6 space-y-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-teal-400" />
                    <span>About Metropolitan Memorial Medical Center</span>
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Founded in 1954 as a premier quaternary research hospital, Metropolitan Memorial has evolved into a global
                    benchmark for critical care innovation. Operating across 12 multidisciplinary pavilions, the hospital
                    serves over 48,000 inpatients annually and acts as the designated regional referral hub for complex
                    polytrauma, refractory cardiogenic shock, and hyper-acute neurological emergencies.
                  </p>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    In 2024, Metropolitan Memorial launched <strong className="text-teal-300 font-semibold">MedBrain OS</strong>,
                    a unified digital nervous system connecting bedside telemetry, high-frequency arterial waveforms,
                    electronic health record order entry, and multi-scale physiological simulations. This enables our clinical teams
                    to detect silent decompensation hours ahead of conventional threshold alerts.
                  </p>

                  <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-3.5 bg-slate-900/70 rounded-xl border border-slate-800">
                      <div className="font-bold text-xs text-white">Campus Infrastructure</div>
                      <div className="text-xs text-slate-400 mt-1">
                        1.8M sq. ft. quaternary clinical footprint, dual rooftop FAA helipads, 20 high-acuity surgical theaters.
                      </div>
                    </div>
                    <div className="p-3.5 bg-slate-900/70 rounded-xl border border-slate-800">
                      <div className="font-bold text-xs text-white">Academic Faculty</div>
                      <div className="text-xs text-slate-400 mt-1">
                        650+ attending physicians, 1,400 specialized critical care nurses, 85 clinical data science researchers.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Hospital Accreditation & Public Safety */}
                <div className="bg-slate-800/70 border border-slate-700/80 rounded-2xl p-6 space-y-4 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>Institutional Governance & Accreditations</span>
                    </h3>
                    <div className="mt-4 space-y-3 text-xs">
                      <div className="p-2.5 bg-slate-900/70 rounded-lg border border-slate-800 flex items-start gap-2.5">
                        <Award className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-white">The Joint Commission Gold Seal</span>
                          <p className="text-slate-400 text-[11px] mt-0.5">Comprehensive Critical Care & Hospital Safety</p>
                        </div>
                      </div>
                      <div className="p-2.5 bg-slate-900/70 rounded-lg border border-slate-800 flex items-start gap-2.5">
                        <Ambulance className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-white">ACS Level 1 Trauma Verification</span>
                          <p className="text-slate-400 text-[11px] mt-0.5">Highest level of 24/7 surgical trauma readiness</p>
                        </div>
                      </div>
                      <div className="p-2.5 bg-slate-900/70 rounded-lg border border-slate-800 flex items-start gap-2.5">
                        <Lock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-white">HIPAA & SOC 2 Type II Certified</span>
                          <p className="text-slate-400 text-[11px] mt-0.5">FIPS 140-2 end-to-end data encryption across MedBrain OS</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-700/60">
                    <button
                      onClick={onOpenSignIn}
                      className="w-full py-2.5 px-4 bg-teal-700 hover:bg-teal-600 text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>Access Staff / Patient Portal</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Departments */}
          {activeTab === 'departments' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h3 className="text-lg font-bold text-white">Specialized Clinical Units & Intensive Care Divisions</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Each unit is equipped with dedicated bedside telemetry streaming directly into the MedBrain OS neural core.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {departments.map((dept) => (
                  <div
                    key={dept.id}
                    className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-5 flex flex-col justify-between hover:border-teal-500/50 transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-950 text-teal-300 border border-teal-800 font-bold">
                          {dept.acuity}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">
                          {dept.occupied}/{dept.beds} Beds ({Math.round((dept.occupied / dept.beds) * 100)}%)
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-white">{dept.name}</h4>
                      <p className="text-xs text-teal-400 mt-0.5 font-medium">Director: {dept.director}</p>

                      {/* Bed capacity mini progress bar */}
                      <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden my-3">
                        <div
                          className="bg-teal-500 h-full rounded-full"
                          style={{ width: `${(dept.occupied / dept.beds) * 100}%` }}
                        />
                      </div>

                      <div className="mt-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Clinical Focus</span>
                        <ul className="mt-1.5 space-y-1 text-xs text-slate-300">
                          {dept.specialties.map((spec, idx) => (
                            <li key={idx} className="flex items-start space-x-1.5">
                              <span className="text-teal-400 mt-0.5">•</span>
                              <span>{spec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-700/60 text-[11px] text-slate-400 font-mono">
                      Equipped: {dept.equipment[0]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: ICU & Hospital Capacity */}
          {activeTab === 'capacity' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-700 pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Bed className="w-5 h-5 text-teal-400" />
                      <span>General & ICU Capacity Information</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Live aggregate institutional census updated every 60 seconds (Safe Public Summary)
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs text-emerald-400 font-bold">System Status: Active & Operational</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Metric 1 */}
                  <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800">
                    <div className="flex justify-between items-center text-xs text-slate-400 mb-1">
                      <span>Total Inpatient Census</span>
                      <span className="font-mono text-teal-300">92.6% Occupancy</span>
                    </div>
                    <div className="text-3xl font-extrabold text-white">482 / 520</div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-3">
                      <div className="bg-teal-500 h-full rounded-full" style={{ width: '92.6%' }}></div>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-2">38 general ward beds currently available for admission.</p>
                  </div>

                  {/* Metric 2 */}
                  <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800">
                    <div className="flex justify-between items-center text-xs text-slate-400 mb-1">
                      <span>ICU Critical Care Beds</span>
                      <span className="font-mono text-amber-400">91.4% In Use</span>
                    </div>
                    <div className="text-3xl font-extrabold text-white">64 / 70</div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-3">
                      <div className="bg-amber-500 h-full rounded-full" style={{ width: '91.4%' }}></div>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-2">6 beds immediately staffed; 6 step-down candidates pending.</p>
                  </div>

                  {/* Metric 3 */}
                  <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800">
                    <div className="flex justify-between items-center text-xs text-slate-400 mb-1">
                      <span>Emergency Room Triage</span>
                      <span className="font-mono text-emerald-400">Zero Wait Priority 1</span>
                    </div>
                    <div className="text-3xl font-extrabold text-white">42 Beds Active</div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-3">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: '70%' }}></div>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-2">Trauma Bay 1 & 2 cleared for immediate resuscitation.</p>
                  </div>
                </div>

                {/* Capacity breakdown by ward */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Capacity by Clinical Division</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {departments.map((dept) => (
                      <div key={dept.id} className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 flex items-center justify-between">
                        <div>
                          <div className="text-xs font-bold text-white truncate max-w-[180px]">{dept.name.split('(')[0]}</div>
                          <div className="text-[11px] text-slate-400 font-mono">{dept.occupied} of {dept.beds} beds occupied</div>
                        </div>
                        <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded ${
                          dept.occupied / dept.beds > 0.9 ? 'bg-amber-950 text-amber-300 border border-amber-800' : 'bg-teal-950 text-teal-300 border border-teal-800'
                        }`}>
                          {Math.round((dept.occupied / dept.beds) * 100)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Services */}
          {activeTab === 'services' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h3 className="text-lg font-bold text-white">Hospital Clinical Services</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Metropolitan Memorial provides comprehensive tertiary and quaternary services backed by AI decision support.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {hospitalServices.map((svc, idx) => {
                  const Icon = svc.icon;
                  return (
                    <div
                      key={idx}
                      className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-5 flex flex-col justify-between hover:border-teal-500/50 transition-colors"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="p-2 rounded-lg bg-teal-950 border border-teal-800 text-teal-400">
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                            {svc.badge}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-white">{svc.title}</h4>
                        <p className="text-xs text-slate-300 leading-relaxed mt-2">{svc.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 5: MedBrain OS Technology Introduction */}
          {activeTab === 'technology' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 space-y-6">
                <div className="flex items-center space-x-3 border-b border-slate-700 pb-4">
                  <div className="p-2 rounded-xl bg-teal-950 border border-teal-800 text-teal-400">
                    <BrainCircuit className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Introduction to MedBrain OS</h3>
                    <p className="text-xs text-slate-400">Enterprise Clinical Artificial Intelligence Digital Brain</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs text-slate-300">
                  <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-2">
                    <div className="font-bold text-white text-sm flex items-center gap-1.5">
                      <Activity className="w-4 h-4 text-teal-400" />
                      <span>1. High-Frequency Telemetry Ingestion</span>
                    </div>
                    <p className="leading-relaxed text-slate-400">
                      MedBrain OS continuously ingests 100 Hz arterial waveforms, photoplethysmography (PPG), ECG rhythm, and
                      end-tidal CO2 directly from ICU bedside monitors, establishing real-time hemodynamic baselines.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-2">
                    <div className="font-bold text-white text-sm flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-teal-400" />
                      <span>2. Predictive Sepsis & Shock Modeling</span>
                    </div>
                    <p className="leading-relaxed text-slate-400">
                      Bi-directional Transformer models cross-reference live laboratory panels, lactate kinetics, and vasopressor
                      titrations to alert the attending team 4.8 hours prior to clinical deterioration.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-2">
                    <div className="font-bold text-white text-sm flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-teal-400" />
                      <span>3. MedTwin X: ODE Digital Twins</span>
                    </div>
                    <p className="leading-relaxed text-slate-400">
                      Clinicians can run zero-risk simulation scenarios (e.g., fluid bolus vs. early norepinephrine vs. PEEP
                      titration) on the patient's calibrated digital twin before bedside execution.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Call-To-Action Sign-In Card */}
          <div className="bg-gradient-to-r from-teal-950 to-slate-900 border border-teal-800/80 rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-xl font-extrabold text-white">Access the MedBrain OS Platform</h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                Authorized medical personnel, researchers, and registered patients can sign in to access clinical workspaces,
                live patient telemetry, research cohorts, or personal health records.
              </p>
              <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-teal-300">
                <span>• Doctor & Nurse Clinical Workstation</span>
                <span>• Researcher Cohort Explorer</span>
                <span>• Patient Health Portal</span>
              </div>
            </div>

            <button
              onClick={onOpenSignIn}
              className="px-6 py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 active:bg-teal-600 text-slate-950 font-extrabold text-sm shadow-xl flex items-center space-x-2 transition-all transform hover:scale-105 shrink-0 cursor-pointer"
            >
              <Lock className="w-4 h-4 text-slate-950" />
              <span>Sign In to Portal</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        </div>
      </section>

      {/* Public Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 rounded-lg bg-teal-600 flex items-center justify-center text-white">
              <BrainCircuit className="w-4 h-4" />
            </div>
            <span className="font-bold text-slate-300">Metropolitan Memorial Medical Center</span>
            <span>•</span>
            <span>MedBrain OS Enterprise v4.8</span>
          </div>

          <div className="flex items-center space-x-6 text-[11px]">
            <span>Level 1 Adult & Pediatric Trauma</span>
            <span>IRB Protocol #2024-918</span>
            <span>HIPAA Privacy Notice</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
