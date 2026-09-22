import React from 'react';
import {
  LayoutDashboard,
  Users,
  Activity,
  Sparkles,
  GitFork,
  FlaskConical,
  ShieldCheck,
  SearchCode,
  Share2,
  Building,
  Radio,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  BrainCircuit,
  Lock,
  UserPlus,
  HeartPulse,
  X,
} from 'lucide-react';
import { UserRole } from '../../types';

export interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  roles: UserRole[];
  badge?: string;
  badgeColor?: string;
}

export const NAV_ITEMS: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    roles: ['Doctor', 'Nurse', 'Hospital Administrator'],
  },
  {
    id: 'patient-portal',
    label: 'My Health Portal',
    icon: HeartPulse,
    roles: ['Patient'],
    badge: 'Active',
    badgeColor: 'bg-emerald-100 text-emerald-800',
  },
  {
    id: 'patients',
    label: 'Patients',
    icon: Users,
    roles: ['Doctor', 'Nurse'],
    badge: '6 Critical',
    badgeColor: 'bg-rose-100 text-rose-800',
  },
  {
    id: 'monitoring',
    label: 'Monitoring',
    icon: Activity,
    roles: ['Doctor', 'Nurse'],
    badge: 'Live',
    badgeColor: 'bg-emerald-100 text-emerald-800',
  },
  {
    id: 'precision',
    label: 'PrecisionAI',
    icon: Sparkles,
    roles: ['Doctor'],
    badge: 'AI',
    badgeColor: 'bg-teal-100 text-teal-800',
  },
  {
    id: 'twin',
    label: 'MedTwin X',
    icon: GitFork,
    roles: ['Doctor'],
  },
  {
    id: 'simulation',
    label: 'Disease Simulation',
    icon: FlaskConical,
    roles: ['Doctor', 'Researcher'],
  },
  {
    id: 'cds',
    label: 'Clinical Decision Support',
    icon: ShieldCheck,
    roles: ['Doctor', 'Nurse'],
    badge: '2 Due',
    badgeColor: 'bg-amber-100 text-amber-800',
  },
  {
    id: 'research',
    label: 'Clinical Research',
    icon: SearchCode,
    roles: ['Researcher'],
  },
  {
    id: 'intelligence',
    label: 'Hospital Intelligence',
    icon: Building,
    roles: ['Hospital Administrator', 'Doctor', 'Researcher'],
  },
  {
    id: 'command',
    label: 'Command Center',
    icon: Radio,
    roles: ['Hospital Administrator', 'System Administrator'],
    badge: '91% Cap',
    badgeColor: 'bg-rose-100 text-rose-800',
  },
  {
    id: 'users',
    label: 'User Management',
    icon: UserPlus,
    roles: ['System Administrator'],
    badge: 'RBAC',
    badgeColor: 'bg-teal-100 text-teal-800',
  },
  {
    id: 'alerts',
    label: 'Alerts & Triage',
    icon: ShieldCheck,
    roles: ['Doctor', 'Nurse', 'Hospital Administrator'],
  },
  {
    id: 'audit',
    label: 'Security & Audit',
    icon: Lock,
    roles: ['System Administrator', 'Hospital Administrator'],
  },
  {
    id: 'settings',
    label: 'Settings & Governance',
    icon: Settings,
    roles: ['System Administrator'],
  },
];

interface SidebarProps {
  currentView?: string;
  activeView?: string;
  onNavigate?: (viewId: string) => void;
  onSelectView?: (viewId: string) => void;
  userRole: UserRole;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  activeAlertCount?: number;
  onLogout?: () => void;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  activeView,
  onNavigate,
  onSelectView,
  userRole,
  collapsed: externalCollapsed,
  onToggleCollapse,
  activeAlertCount,
  onLogout,
  mobileOpen = false,
  onCloseMobile,
}) => {
  const [internalCollapsed, setInternalCollapsed] = React.useState(false);
  const collapsed = externalCollapsed !== undefined ? externalCollapsed : internalCollapsed;
  const handleToggleCollapse = onToggleCollapse || (() => setInternalCollapsed((c) => !c));

  const effectiveView = activeView || currentView || 'dashboard';
  const handleNavigate = (viewId: string) => {
    if (onSelectView) onSelectView(viewId);
    if (onNavigate) onNavigate(viewId);
    if (onCloseMobile) onCloseMobile();
  };

  // Filter nav items by role
  const allowedNav = NAV_ITEMS.filter((item) => item.roles.includes(userRole));

  return (
    <>
      {/* Mobile Drawer Backdrop Overlay */}
      <div
        className={`fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-40 transition-opacity duration-300 md:hidden ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onCloseMobile}
        aria-hidden="true"
      />

      <aside
        className={`bg-slate-900 text-slate-300 flex flex-col transition-all duration-300 z-50 shrink-0 select-none
          fixed md:static inset-y-0 left-0 max-w-[85vw]
          ${mobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0'}
          ${collapsed ? 'md:w-18' : 'w-72 md:w-64'}
        `}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800">
          <div
            onClick={() => handleNavigate('dashboard')}
            className="flex items-center space-x-3 cursor-pointer overflow-hidden"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white shadow-md shadow-teal-900/30 shrink-0">
              <BrainCircuit className="w-6 h-6 text-white" />
            </div>
            {(!collapsed || mobileOpen) && (
              <div className="flex flex-col">
                <span className="text-sm font-extrabold tracking-tight text-white flex items-center gap-1.5">
                  MedBrain <span className="text-teal-400 font-mono text-xs px-1.5 py-0.5 rounded bg-teal-950 border border-teal-800">OS</span>
                </span>
                <span className="text-[10px] text-slate-400 font-medium tracking-wide">
                  AI Hospital Digital Brain
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-1">
            {/* Desktop Collapse / Expand toggle */}
            <button
              onClick={handleToggleCollapse}
              className="hidden md:flex p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>

            {/* Mobile Close Button */}
            <button
              onClick={onCloseMobile}
              className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close navigation menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Role Context Pill */}
        {(!collapsed || mobileOpen) && (
          <div className="px-4 pt-4 pb-1">
            <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/50 flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Current Role</div>
                <div className="text-xs font-bold text-teal-300 truncate">{userRole}</div>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            </div>
          </div>
        )}

      {/* Nav list */}
      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
        {allowedNav.map((item) => {
          const IconComponent = item.icon;
          const isActive =
            effectiveView === item.id ||
            (item.id === 'patients' && effectiveView === 'patient-detail');

          return (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.id)}
              title={collapsed ? item.label : undefined}
              className={`w-full flex items-center rounded-lg transition-all text-xs font-medium relative group ${
                collapsed ? 'justify-center p-3' : 'px-3 py-2.5 space-x-3'
              } ${
                isActive
                  ? 'bg-teal-700 text-white font-semibold shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <IconComponent
                className={`shrink-0 transition-colors ${
                  collapsed ? 'w-5 h-5' : 'w-4 h-4'
                } ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}
              />

              {!collapsed && (
                <span className="flex-1 text-left truncate">{item.label}</span>
              )}

              {!collapsed && item.badge && (
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${
                    item.badgeColor || 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {item.badge}
                </span>
              )}

              {/* Collapsed tooltip badge */}
              {collapsed && item.badge && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-slate-900" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Security & System Info Footer */}
      <div className="p-3 border-t border-slate-800 text-slate-400 space-y-2">
        {!collapsed ? (
          <div className="flex items-center justify-between text-[11px] px-2 py-1 bg-slate-950/40 rounded-md border border-slate-800/80">
            <div className="flex items-center space-x-1.5 text-slate-400">
              <Lock className="w-3.5 h-3.5 text-teal-400" />
              <span className="font-mono text-[10px]">HIPAA / HL7 v4.0</span>
            </div>
            <span className="font-mono text-[10px] text-emerald-400">ENC-256</span>
          </div>
        ) : (
          <div className="flex justify-center">
            <Lock className="w-4 h-4 text-teal-400" title="HIPAA / HL7 Encrypted" />
          </div>
        )}

        {onLogout && !collapsed && (
          <button
            onClick={onLogout}
            className="w-full text-left px-2 py-1 text-[11px] text-slate-400 hover:text-rose-400 flex items-center justify-between rounded hover:bg-slate-800/50 transition-colors"
          >
            <span>Sign out</span>
            <span className="font-mono text-[10px]">&rarr;</span>
          </button>
        )}
      </div>
    </aside>
  </>
  );
};
