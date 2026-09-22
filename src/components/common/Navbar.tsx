import React, { useState, useEffect } from 'react';
import {
  Search,
  Bell,
  Activity,
  ShieldCheck,
  ChevronDown,
  User,
  LogOut,
  Building2,
  Clock,
  Menu,
  Stethoscope,
  Sparkles,
} from 'lucide-react';
import { UserProfile, UserRole } from '../../types';
import { INITIAL_USERS } from '../../data/mockData';

interface NavbarProps {
  currentUser?: UserProfile;
  userRole?: UserRole;
  onLogout: () => void;
  unreadAlertsCount?: number;
  activeAlertCount?: number;
  onOpenNotifications: () => void;
  onOpenSearch: () => void;
  onToggleSidebar?: () => void;
  activePatientContext?: { name: string; mrn: string; bed: string };
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  userRole,
  onLogout,
  unreadAlertsCount,
  activeAlertCount,
  onOpenNotifications,
  onOpenSearch,
  onToggleSidebar,
  activePatientContext,
}) => {
  const [time, setTime] = useState<string>('');
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  // Safe fallback for user
  const user: UserProfile =
    currentUser ||
    INITIAL_USERS.find((u) => u.role === userRole) ||
    INITIAL_USERS[0] || {
      id: 'usr-1',
      name: 'Dr. Sarah Vance, MD',
      role: userRole || 'Doctor',
      title: 'Director of Critical Care Medicine',
      department: 'Medical Intensive Care Unit (MICU)',
      email: 'sarah.vance@medbrain.org',
      badgeId: 'PHYS-48921',
    };

  const alertCount = activeAlertCount !== undefined ? activeAlertCount : (unreadAlertsCount || 0);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-30 flex items-center justify-between px-3 sm:px-6">
      {/* Left section: Hamburger for mobile + Hospital Context */}
      <div className="flex items-center space-x-2 sm:space-x-4">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            id="mobile-sidebar-toggle"
            aria-label="Toggle navigation drawer"
            className="md:hidden p-2 -ml-1 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div className="hidden lg:flex items-center space-x-3">
          <div className="p-1.5 rounded-md bg-teal-50 text-teal-700 border border-teal-200">
            <Building2 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
              Metropolitan University Medical Center
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse mr-1"></span>
                LIVE HL7
              </span>
            </div>
            <div className="text-[11px] text-slate-500">Main Quaternary Hospital • Level 1 Trauma Center</div>
          </div>
        </div>

        {/* Active Patient Context Badge */}
        {activePatientContext && (
          <div className="hidden xl:flex items-center space-x-2 px-3 py-1 bg-teal-50/80 border border-teal-200 rounded-lg text-xs">
            <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse shrink-0" />
            <span className="text-slate-500 text-[11px]">Active:</span>
            <span className="font-bold text-slate-900">{activePatientContext.name}</span>
            <span className="text-slate-400 font-mono text-[11px]">({activePatientContext.mrn})</span>
            <span className="bg-teal-700 text-white font-mono text-[10px] font-bold px-1.5 py-0.2 rounded">
              {activePatientContext.bed}
            </span>
          </div>
        )}
      </div>

      {/* Middle section: Global Search Box */}
      <div className="flex-1 max-w-md mx-4 hidden sm:block">
        <button
          onClick={onOpenSearch}
          className="w-full flex items-center justify-between px-3.5 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-xs text-slate-500 transition-colors shadow-2xs group"
        >
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4 text-slate-400 group-hover:text-teal-600 transition-colors" />
            <span className="font-medium text-slate-600">Search patient, MRN, diagnosis, bed, drugs...</span>
          </div>
          <div className="flex items-center space-x-1 font-mono text-[10px] text-slate-400 bg-white px-1.5 py-0.5 rounded border border-slate-200">
            <span>⌘</span>
            <span>K</span>
          </div>
        </button>
      </div>

      {/* Right section: Time, Notifications, Role Switcher, Profile */}
      <div className="flex items-center space-x-1.5 sm:space-x-3">
        {/* Real-time Clock */}
        <div className="hidden xl:flex items-center space-x-2 text-xs font-mono text-slate-600 bg-slate-50 px-2.5 py-1.5 rounded-md border border-slate-200">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>{time} UTC-7</span>
        </div>

        {/* Mobile Search Button */}
        <button
          onClick={onOpenSearch}
          aria-label="Open search"
          className="sm:hidden p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 cursor-pointer"
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Notification Bell */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
          title="Clinical Alerts Center"
          aria-label="Open clinical alerts"
        >
          <Bell className="w-5 h-5" />
          {alertCount > 0 && (
            <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-600 text-[10px] font-bold text-white ring-2 ring-white animate-pulse">
              {alertCount}
            </span>
          )}
        </button>

        {/* Read-Only Assigned Role Badge (Role is strictly fixed per user account) */}
        <div
          id="navbar-user-role-badge"
          className="flex items-center space-x-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-teal-50 border border-teal-200 text-teal-800 text-[11px] sm:text-xs font-semibold select-none whitespace-nowrap"
          title="User Role is assigned by the System Administrator and fixed"
        >
          <span className="w-2 h-2 rounded-full bg-teal-500 shrink-0"></span>
          <span className="hidden sm:inline text-[11px] font-normal text-teal-600">Role:</span>
          <span>{user.role}</span>
        </div>

        {/* Profile Avatar / Menu */}
        <div className="relative">
          <button
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            className="flex items-center space-x-1.5 sm:space-x-2 p-1 sm:p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold ring-2 ring-slate-200">
              {user.name
                ? user.name
                    .split(' ')
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join('')
                : 'U'}
            </div>
            <div className="hidden md:block text-left">
              <div className="text-xs font-bold text-slate-900 leading-tight truncate max-w-[130px]">
                {user.name ? user.name.split(',')[0] : 'User'}
              </div>
              <div className="text-[10px] text-slate-500 truncate max-w-[130px]">{user.badgeId}</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden md:block" />
          </button>

          {profileMenuOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-4 py-2.5 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-900">{user.name}</p>
                <p className="text-[11px] text-slate-500">{user.title}</p>
                <p className="text-[10px] font-mono text-teal-700 mt-0.5">{user.email}</p>
                <div className="mt-2 inline-flex items-center px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-medium">
                  {user.department}
                </div>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    setProfileMenuOpen(false);
                    onLogout();
                  }}
                  className="w-full text-left px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 flex items-center space-x-2 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign out of Hospital Brain</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
