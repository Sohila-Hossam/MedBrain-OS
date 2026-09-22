import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Users,
  AlertOctagon,
  ArrowUpRight,
  Sparkles,
  SlidersHorizontal,
  ChevronRight,
  HeartPulse,
} from 'lucide-react';
import { Patient, RiskLevel } from '../../types';

interface PatientListProps {
  patients: Patient[];
  onSelectPatient: (patientId: string) => void;
  onNavigateView: (viewId: string) => void;
}

export const PatientList: React.FC<PatientListProps> = ({
  patients,
  onSelectPatient,
  onNavigateView,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [riskFilter, setRiskFilter] = useState<'All' | RiskLevel>('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [ageFilter, setAgeFilter] = useState('All');

  const departments = ['All', 'Medical ICU', 'Cardiac ICU', 'Neuro ICU', 'Pulmonology', 'General Surgical', 'Emergency / Trauma'];
  const risks: ('All' | RiskLevel)[] = ['All', 'Critical', 'High', 'Medium', 'Low'];
  const statuses = ['All', 'Critical', 'Unstable', 'Guarded', 'Stable'];
  const ageRanges = ['All', '< 50 years', '50 - 65 years', '> 65 years'];

  const filteredPatients = useMemo(() => {
    return patients.filter((p) => {
      // Search query
      if (
        searchQuery &&
        !p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !p.mrn.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !p.roomBed.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !p.primaryDiagnosis.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Department filter
      if (departmentFilter !== 'All' && p.department !== departmentFilter) {
        return false;
      }

      // Risk filter
      if (riskFilter !== 'All' && p.overallRisk !== riskFilter) {
        return false;
      }

      // Status filter
      if (statusFilter !== 'All' && p.currentStatus !== statusFilter) {
        return false;
      }

      // Age filter
      if (ageFilter === '< 50 years' && p.age >= 50) return false;
      if (ageFilter === '50 - 65 years' && (p.age < 50 || p.age > 65)) return false;
      if (ageFilter === '> 65 years' && p.age <= 65) return false;

      return true;
    });
  }, [patients, searchQuery, departmentFilter, riskFilter, statusFilter, ageFilter]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">Patients</h1>
            <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-slate-100 text-slate-700 border border-slate-200">
              {filteredPatients.length} of {patients.length} Active
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Search and manage hospital patients across all inpatient and critical care units
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onNavigateView('monitoring')}
            className="px-3.5 py-2 text-xs font-semibold bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg shadow-2xs flex items-center gap-1.5 transition-colors"
          >
            <HeartPulse className="w-4 h-4 text-rose-600" />
            <span>Switch to Live ICU Monitoring</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3">
        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by patient name, MRN, room/bed, or clinical diagnosis..."
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-600"
          />
        </div>

        {/* Dropdown Filters Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
          {/* Department */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Department / Ward
            </label>
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-md text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-teal-600"
            >
              {departments.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* AI Risk Level */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              AI Risk Level
            </label>
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value as any)}
              className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-md text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-teal-600"
            >
              {risks.map((r) => (
                <option key={r} value={r}>
                  {r} Risk
                </option>
              ))}
            </select>
          </div>

          {/* Clinical Status */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Clinical Acuity
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-md text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-teal-600"
            >
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Age Bracket */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Age Range
            </label>
            <select
              value={ageFilter}
              onChange={(e) => setAgeFilter(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-md text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-teal-600"
            >
              {ageRanges.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Patient Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-4">Patient & MRN</th>
                <th className="py-3 px-3">Age / Sex</th>
                <th className="py-3 px-3">Department & Bed</th>
                <th className="py-3 px-3">AI Risk Band</th>
                <th className="py-3 px-3">Primary Diagnosis</th>
                <th className="py-3 px-3">Acuity Status</th>
                <th className="py-3 px-3">Last Telemetry</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium">
              {filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500">
                    No patients found matching the selected filter criteria.
                  </td>
                </tr>
              ) : (
                filteredPatients.map((p) => (
                  <tr
                    key={p.id}
                    onClick={() => onSelectPatient(p.id)}
                    className="hover:bg-teal-50/30 transition-colors cursor-pointer group"
                  >
                    {/* Patient Name & MRN */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                        {p.name}
                      </div>
                      <div className="text-[11px] font-mono text-slate-500">{p.mrn}</div>
                    </td>

                    {/* Age / Sex */}
                    <td className="py-3.5 px-3 font-mono text-slate-700">
                      {p.age}y / {p.gender}
                    </td>

                    {/* Department & Bed */}
                    <td className="py-3.5 px-3">
                      <div className="font-semibold text-slate-800">{p.department}</div>
                      <div className="text-[11px] font-mono text-teal-700 font-medium">{p.roomBed}</div>
                    </td>

                    {/* AI Risk Band */}
                    <td className="py-3.5 px-3">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          p.overallRisk === 'Critical'
                            ? 'bg-rose-100 text-rose-800 border border-rose-200'
                            : p.overallRisk === 'High'
                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                            : p.overallRisk === 'Medium'
                            ? 'bg-blue-50 text-blue-800 border border-blue-200'
                            : 'bg-slate-100 text-slate-700 border border-slate-200'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                            p.overallRisk === 'Critical'
                              ? 'bg-rose-600'
                              : p.overallRisk === 'High'
                              ? 'bg-amber-600'
                              : p.overallRisk === 'Medium'
                              ? 'bg-blue-600'
                              : 'bg-slate-500'
                          }`}
                        />
                        {p.overallRisk}
                      </span>
                    </td>

                    {/* Primary Diagnosis */}
                    <td className="py-3.5 px-3 max-w-[240px]">
                      <div className="truncate text-slate-800 font-medium" title={p.primaryDiagnosis}>
                        {p.primaryDiagnosis}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate">
                        Attending: {p.attendingPhysician}
                      </div>
                    </td>

                    {/* Acuity Status */}
                    <td className="py-3.5 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                          p.currentStatus === 'Critical'
                            ? 'bg-rose-50 text-rose-700'
                            : p.currentStatus === 'Unstable'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-emerald-50 text-emerald-700'
                        }`}
                      >
                        {p.currentStatus}
                      </span>
                    </td>

                    {/* Last Telemetry */}
                    <td className="py-3.5 px-3 font-mono text-[11px] text-slate-500">
                      HR {p.vitals.heartRate.value} • SpO₂ {p.vitals.spO2.value}%
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectPatient(p.id);
                        }}
                        className="px-3 py-1 text-xs font-semibold bg-teal-700 hover:bg-teal-800 text-white rounded shadow-2xs inline-flex items-center gap-1 transition-colors"
                      >
                        <span>Profile 360°</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
