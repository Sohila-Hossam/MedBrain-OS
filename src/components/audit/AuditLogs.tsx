import React, { useState } from 'react';
import {
  ShieldCheck,
  Search,
  Filter,
  Download,
  Lock,
  FileCheck,
  CheckCircle2,
  KeyRound,
  Terminal,
} from 'lucide-react';
import { INITIAL_AUDIT_LOGS } from '../../data/mockData';
import { AuditLog } from '../../types';

export const AuditLogs: React.FC = () => {
  const [logs, setLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');

  const filteredLogs = logs.filter((l) => {
    if (search && !l.action.toLowerCase().includes(search.toLowerCase()) && !l.user.toLowerCase().includes(search.toLowerCase()) && !l.patientOrResource.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    if (roleFilter !== 'All' && l.userRole !== roleFilter) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">Audit & Security Logs</h1>
            <span className="px-2.5 py-0.5 text-xs font-bold rounded bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              HIPAA § 164.312(b) Compliant Audit Trail
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Tamper-evident, cryptographically hashed access logs tracking every clinical action and PHI query
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => alert('Cryptographic audit bundle (SHA-256 signed) ready for download.')}
            className="px-3.5 py-2 text-xs font-bold bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 rounded-lg shadow-2xs flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-4 h-4 text-teal-700" />
            <span>Export Verified Audit Manifest</span>
          </button>
        </div>
      </div>

      {/* Compliance Verification Banner */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-slate-900">Immutable Hash-Chained Log Ledger</div>
            <div className="text-slate-500 text-[11px]">
              Merkle Root: <span className="font-mono text-slate-700">0x8f3c...b4a1</span> • Verified 100% Integrity
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 font-mono text-[11px] text-slate-600">
          <span>Retention: 7 Years (HIPAA Standard)</span>
        </div>
      </div>

      {/* Filter Row */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by staff member, clinical action, MRN, or workstation ID..."
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:ring-1 focus:ring-teal-600"
          />
        </div>

        <div className="w-full sm:w-56">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-teal-600"
          >
            <option value="All">All Roles</option>
            <option value="Doctor">Physicians / Doctors</option>
            <option value="Nurse">Nursing Staff</option>
            <option value="Researcher">Clinical Researchers</option>
            <option value="Hospital Administrator">Hospital Administrators</option>
            <option value="System Administrator">System Administrators</option>
          </select>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-4">Timestamp (UTC)</th>
                <th className="py-3 px-3">User & Badge</th>
                <th className="py-3 px-3">Role</th>
                <th className="py-3 px-3">Clinical Action</th>
                <th className="py-3 px-3">Target Patient / Asset</th>
                <th className="py-3 px-3">Workstation IP</th>
                <th className="py-3 px-4 text-right">Compliance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-500">{log.timestamp}</td>
                  <td className="py-3 px-3 font-bold text-slate-900">
                    {log.user}
                    <div className="text-[10px] font-mono text-slate-400 font-normal">Badge: {log.badgeId}</div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700">
                      {log.userRole}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-800 font-semibold">{log.action}</td>
                  <td className="py-3 px-3 font-mono text-teal-800">{log.patientOrResource}</td>
                  <td className="py-3 px-3 font-mono text-slate-500 text-[11px]">{log.ipAddress}</td>
                  <td className="py-3 px-4 text-right">
                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold text-[10px] border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-600" />
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
