import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  ShieldCheck,
  Search,
  Filter,
  CheckCircle2,
  Key,
  Mail,
  Building,
  User,
  Activity,
  Sparkles,
  Lock,
  Stethoscope,
  FlaskConical,
  HeartPulse,
  Clock,
  Eye,
  RefreshCw,
  X,
} from 'lucide-react';
import { UserProfile, UserRole } from '../../types';

interface UserManagementProps {
  users: UserProfile[];
  onAddUser: (user: UserProfile) => void;
}

export const UserManagement: React.FC<UserManagementProps> = ({ users, onAddUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [successBanner, setSuccessBanner] = useState<string | null>(null);

  // Form state
  const [selectedRole, setSelectedRole] = useState<'Patient' | 'Doctor' | 'Nurse' | 'Researcher'>('Doctor');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [setupMethod, setSetupMethod] = useState<'password' | 'invitation'>('password');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'Active' | 'Pending' | 'On Duty'>('Active');
  
  // Role specific state
  const [department, setDepartment] = useState('Medical Intensive Care Unit (MICU)');
  const [title, setTitle] = useState('Attending Physician');
  const [specialty, setSpecialty] = useState('Critical Care & Pulmonology');
  const [licenseOrMrn, setLicenseOrMrn] = useState('PHYS-9821');
  const [roomBed, setRoomBed] = useState('ICU-Bed 05');
  const [assignedPhysician, setAssignedPhysician] = useState('Dr. Sarah Vance, MD');

  // Handle Role Change inside Form to auto-populate sensible role-specific defaults
  const handleRoleSelection = (role: 'Patient' | 'Doctor' | 'Nurse' | 'Researcher') => {
    setSelectedRole(role);
    if (role === 'Doctor') {
      setTitle('Attending Physician');
      setDepartment('Medical Intensive Care Unit (MICU)');
      setSpecialty('Critical Care & Pulmonology');
      setLicenseOrMrn(`PHYS-${Math.floor(10000 + Math.random() * 90000)}`);
    } else if (role === 'Nurse') {
      setTitle('Staff Critical Care Nurse, BSN');
      setDepartment('Cardiovascular ICU');
      setSpecialty('Cardiovascular Care');
      setLicenseOrMrn(`NURS-${Math.floor(10000 + Math.random() * 90000)}`);
    } else if (role === 'Researcher') {
      setTitle('Senior Clinical Data Scientist');
      setDepartment('Computational Medicine & Genomics');
      setSpecialty('Predictive Modeling & Sepsis');
      setLicenseOrMrn(`RESR-${Math.floor(10000 + Math.random() * 90000)}`);
    } else if (role === 'Patient') {
      setTitle('Inpatient');
      setDepartment('Patient Care Services');
      setSpecialty('Inpatient Recovery');
      setLicenseOrMrn(`MRN-${Math.floor(1000 + Math.random() * 9000)}-09`);
      setRoomBed('ICU-Bed 08');
      setAssignedPhysician('Dr. Sarah Vance, MD');
    }
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    const newUser: UserProfile = {
      id: `usr-${Date.now().toString().slice(-4)}`,
      name,
      role: selectedRole as UserRole,
      title: title || `${selectedRole}`,
      department: department || 'General Medicine',
      email,
      badgeId: selectedRole === 'Patient' ? `PAT-${Math.floor(1000 + Math.random() * 9000)}` : licenseOrMrn,
      status: status,
      mrn: selectedRole === 'Patient' ? licenseOrMrn : undefined,
      specialty: specialty,
      roomBed: selectedRole === 'Patient' ? roomBed : undefined,
      assignedPhysician: selectedRole === 'Patient' ? assignedPhysician : undefined,
    };

    onAddUser(newUser);

    // Reset & Notify
    setIsAddModalOpen(false);
    setName('');
    setEmail('');
    setPassword('');
    setSuccessBanner(`Successfully registered ${selectedRole}: "${newUser.name}". Account active with role permissions.`);
    setTimeout(() => {
      setSuccessBanner(null);
    }, 5000);
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.badgeId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === 'all' || u.role.toLowerCase() === roleFilter.toLowerCase();

    return matchesSearch && matchesRole;
  });

  const doctorCount = users.filter((u) => u.role === 'Doctor').length;
  const nurseCount = users.filter((u) => u.role === 'Nurse').length;
  const researcherCount = users.filter((u) => u.role === 'Researcher').length;
  const patientCount = users.filter((u) => u.role === 'Patient').length;
  const adminCount = users.filter((u) => u.role === 'Hospital Administrator' || u.role === 'System Administrator').length;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-2">
            <Lock className="w-3.5 h-3.5 text-teal-600" />
            <span>System Administrator Console • Identity & Access Management (IAM)</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            User Management & Role Assignment
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Provision user accounts with strict role-based access control. System Administrator is the sole authority
            authorized to assign and maintain user roles across doctors, nurses, researchers, and patients.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          id="add-new-user-button"
          className="px-4 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 active:bg-teal-900 text-white font-bold text-xs shadow-md flex items-center space-x-2 transition-all shrink-0 cursor-pointer"
        >
          <UserPlus className="w-4 h-4" />
          <span>+ Add New User</span>
        </button>
      </div>

      {/* Success Banner */}
      {successBanner && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-900 flex items-center justify-between animate-in fade-in">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successBanner}</span>
          </div>
          <button onClick={() => setSuccessBanner(null)} className="text-emerald-700 hover:text-emerald-900">
            ✕
          </button>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Users</span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">{users.length}</div>
          <div className="text-[10px] text-teal-600 font-medium mt-0.5">Directory Active</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Doctors</span>
          <div className="text-2xl font-extrabold text-teal-700 mt-1">{doctorCount}</div>
          <div className="text-[10px] text-slate-500 font-medium mt-0.5">Clinical Prescribers</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Nurses</span>
          <div className="text-2xl font-extrabold text-blue-700 mt-1">{nurseCount}</div>
          <div className="text-[10px] text-slate-500 font-medium mt-0.5">Bedside Care</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Researchers</span>
          <div className="text-2xl font-extrabold text-purple-700 mt-1">{researcherCount}</div>
          <div className="text-[10px] text-slate-500 font-medium mt-0.5">Genomics & Trials</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Patients</span>
          <div className="text-2xl font-extrabold text-emerald-700 mt-1">{patientCount}</div>
          <div className="text-[10px] text-slate-500 font-medium mt-0.5">Portal Accounts</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Administrators</span>
          <div className="text-2xl font-extrabold text-slate-700 mt-1">{adminCount}</div>
          <div className="text-[10px] text-slate-500 font-medium mt-0.5">Exec & Security</div>
        </div>
      </div>

      {/* Directory Table with Search & Filter */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        {/* Controls Bar */}
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, email, badge, or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-600 text-slate-900"
            />
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto no-scrollbar pb-1 sm:pb-0">
            <span className="text-xs text-slate-400 font-medium flex items-center gap-1 shrink-0">
              <Filter className="w-3.5 h-3.5" />
              <span>Role:</span>
            </span>
            {['all', 'Doctor', 'Nurse', 'Researcher', 'Patient', 'Hospital Administrator', 'System Administrator'].map((r) => (
              <button
                key={r}
                onClick={() => setRoleFilter(r)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer shrink-0 ${
                  roleFilter.toLowerCase() === r.toLowerCase()
                    ? 'bg-teal-700 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {r === 'all' ? 'All Roles' : r}
              </button>
            ))}
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[680px]">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">User Details</th>
                <th className="py-3 px-4">Assigned Role</th>
                <th className="py-3 px-4">Department / Room</th>
                <th className="py-3 px-4">Badge / MRN</th>
                <th className="py-3 px-4">Account Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredUsers.map((u) => {
                const getRoleBadge = (role: UserRole) => {
                  switch (role) {
                    case 'Doctor':
                      return 'bg-teal-50 text-teal-800 border-teal-200';
                    case 'Nurse':
                      return 'bg-blue-50 text-blue-800 border-blue-200';
                    case 'Researcher':
                      return 'bg-purple-50 text-purple-800 border-purple-200';
                    case 'Patient':
                      return 'bg-emerald-50 text-emerald-800 border-emerald-200';
                    case 'Hospital Administrator':
                      return 'bg-amber-50 text-amber-800 border-amber-200';
                    case 'System Administrator':
                      return 'bg-slate-100 text-slate-800 border-slate-300';
                    default:
                      return 'bg-slate-50 text-slate-700 border-slate-200';
                  }
                };

                return (
                  <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-xs shrink-0">
                          {u.name
                            .split(' ')
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join('')}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{u.name}</div>
                          <div className="text-[11px] text-slate-500">{u.email}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getRoleBadge(u.role)}`}>
                        {u.role}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-medium text-slate-900">{u.department}</div>
                      <div className="text-[11px] text-slate-500">
                        {u.role === 'Patient' ? u.roomBed || 'ICU Bed' : u.title}
                      </div>
                    </td>

                    <td className="py-3 px-4 font-mono text-[11px] text-slate-600">
                      {u.badgeId || u.mrn || 'N/A'}
                    </td>

                    <td className="py-3 px-4">
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        <span>{u.status || 'Active'}</span>
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center space-x-1.5">
                        <button
                          title="View Security Details"
                          className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          title="Reset Credentials"
                          className="p-1 rounded text-slate-400 hover:text-teal-700 hover:bg-slate-100"
                        >
                          <Key className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-xs text-slate-400">
                    No users found matching query.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New User Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
              <div>
                <h3 className="text-base font-bold text-slate-900">Add New User Account</h3>
                <p className="text-xs text-slate-500">Provision identity and assign a fixed role in MedBrain OS</p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-5 text-xs">
              {/* 1. ROLE SELECTION CARDS */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Select User Role <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { role: 'Doctor', desc: 'Clinical diagnosis & decision support', icon: Stethoscope },
                    { role: 'Nurse', desc: 'Bedside care, vitals & task alerts', icon: HeartPulse },
                    { role: 'Researcher', desc: 'Cohorts, trials & predictive models', icon: FlaskConical },
                    { role: 'Patient', desc: 'Personal health portal & vitals', icon: User },
                  ].map((item) => {
                    const Icon = item.icon;
                    const isSelected = selectedRole === item.role;
                    return (
                      <button
                        key={item.role}
                        type="button"
                        onClick={() => handleRoleSelection(item.role as any)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-teal-50/80 border-teal-600 ring-2 ring-teal-600/20 text-teal-900'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <Icon className={`w-4 h-4 ${isSelected ? 'text-teal-600' : 'text-slate-400'}`} />
                            {isSelected && <span className="w-2 h-2 rounded-full bg-teal-600" />}
                          </div>
                          <div className="font-bold">{item.role}</div>
                        </div>
                        <div className="text-[10px] text-slate-500 mt-1 leading-tight">{item.desc}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. CORE DETAILS: NAME & EMAIL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={
                      selectedRole === 'Doctor'
                        ? 'e.g. Dr. Arthur Pendelton, MD'
                        : selectedRole === 'Patient'
                        ? 'e.g. Robert Mitchell'
                        : 'e.g. Julian Hayes'
                    }
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-teal-600"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Email / Institutional Username <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder={
                      selectedRole === 'Patient'
                        ? 'e.g. r.mitchell@patientportal.org'
                        : 'e.g. a.pendelton@medbrain.org'
                    }
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-teal-600"
                  />
                </div>
              </div>

              {/* 3. PASSWORD SETUP METHOD & USER STATUS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Account Password Setup
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setSetupMethod('password')}
                      className={`flex-1 py-1.5 px-3 rounded-lg border text-xs font-semibold cursor-pointer ${
                        setupMethod === 'password'
                          ? 'bg-teal-50 border-teal-600 text-teal-800'
                          : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      Set Initial Password
                    </button>
                    <button
                      type="button"
                      onClick={() => setSetupMethod('invitation')}
                      className={`flex-1 py-1.5 px-3 rounded-lg border text-xs font-semibold cursor-pointer ${
                        setupMethod === 'invitation'
                          ? 'bg-teal-50 border-teal-600 text-teal-800'
                          : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      Send Activation Link
                    </button>
                  </div>

                  {setupMethod === 'password' ? (
                    <input
                      type="password"
                      placeholder="Enter temporary password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full mt-2 p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-teal-600"
                    />
                  ) : (
                    <p className="text-[11px] text-slate-500 mt-2">
                      An encrypted one-time activation token will be emailed to the user with 48h validity.
                    </p>
                  )}
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Initial Account Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-teal-600"
                  >
                    <option value="Active">Active (Immediate Login Granted)</option>
                    <option value="Pending">Pending Invitation Verification</option>
                    <option value="On Duty">On Duty (Clinical Shift Active)</option>
                  </select>
                </div>
              </div>

              {/* 4. ROLE-SPECIFIC INFORMATION SECTION */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <div className="font-bold text-slate-800 flex items-center justify-between">
                  <span>Role-Specific Attributes ({selectedRole})</span>
                  <span className="text-[10px] text-teal-700 font-mono">Dynamic Schema</span>
                </div>

                {selectedRole === 'Doctor' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Medical Department</label>
                      <input
                        type="text"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="w-full p-2 bg-white border border-slate-300 rounded-lg text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Physician License / NPI</label>
                      <input
                        type="text"
                        value={licenseOrMrn}
                        onChange={(e) => setLicenseOrMrn(e.target.value)}
                        className="w-full p-2 bg-white border border-slate-300 rounded-lg text-slate-900 font-mono"
                      />
                    </div>
                  </div>
                )}

                {selectedRole === 'Nurse' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Clinical Nursing Ward</label>
                      <input
                        type="text"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="w-full p-2 bg-white border border-slate-300 rounded-lg text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Nursing License (RN / CCRN)</label>
                      <input
                        type="text"
                        value={licenseOrMrn}
                        onChange={(e) => setLicenseOrMrn(e.target.value)}
                        className="w-full p-2 bg-white border border-slate-300 rounded-lg text-slate-900 font-mono"
                      />
                    </div>
                  </div>
                )}

                {selectedRole === 'Researcher' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Research Division / Institute</label>
                      <input
                        type="text"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="w-full p-2 bg-white border border-slate-300 rounded-lg text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">IRB Protocol ID / Grant ID</label>
                      <input
                        type="text"
                        value={licenseOrMrn}
                        onChange={(e) => setLicenseOrMrn(e.target.value)}
                        className="w-full p-2 bg-white border border-slate-300 rounded-lg text-slate-900 font-mono"
                      />
                    </div>
                  </div>
                )}

                {selectedRole === 'Patient' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Medical Record Number (MRN)</label>
                      <input
                        type="text"
                        value={licenseOrMrn}
                        onChange={(e) => setLicenseOrMrn(e.target.value)}
                        className="w-full p-2 bg-white border border-slate-300 rounded-lg text-slate-900 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Assigned Room & Bed</label>
                      <input
                        type="text"
                        value={roomBed}
                        onChange={(e) => setRoomBed(e.target.value)}
                        className="w-full p-2 bg-white border border-slate-300 rounded-lg text-slate-900"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Attending Physician</label>
                      <input
                        type="text"
                        value={assignedPhysician}
                        onChange={(e) => setAssignedPhysician(e.target.value)}
                        className="w-full p-2 bg-white border border-slate-300 rounded-lg text-slate-900"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex justify-end space-x-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold bg-teal-700 hover:bg-teal-800 active:bg-teal-900 text-white rounded-lg transition-colors flex items-center space-x-2 shadow-md cursor-pointer"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Create User Account</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
