import React, { useState } from 'react';
import { UserRole, Patient, PatientAlert, UserProfile } from './types';
import { INITIAL_PATIENTS, INITIAL_ALERTS, INITIAL_USERS } from './data/mockData';

// Layout & Common components
import { Sidebar } from './components/common/Sidebar';
import { Navbar } from './components/common/Navbar';
import { NotificationDrawer } from './components/common/NotificationDrawer';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';

// Public & Auth Screens
import { PublicHospitalOverview } from './components/public/PublicHospitalOverview';
import { LoginPage } from './components/auth/LoginPage';

// Role-Specific & Clinical Screens
import { PatientPortal } from './components/patient/PatientPortal';
import { UserManagement } from './components/admin/UserManagement';
import { HospitalDashboard } from './components/dashboard/HospitalDashboard';
import { PatientList } from './components/patients/PatientList';
import { PatientProfile } from './components/patients/PatientProfile';
import { LiveMonitoring } from './components/monitoring/LiveMonitoring';
import { PrecisionAIWorkspace } from './components/precision/PrecisionAIWorkspace';
import { MedTwinX } from './components/twin/MedTwinX';
import { ClinicalDecisionSupport } from './components/cds/ClinicalDecisionSupport';
import { DiseaseSimulation } from './components/simulation/DiseaseSimulation';
import { ClinicalResearch } from './components/research/ClinicalResearch';
import { HospitalIntelligence } from './components/analytics/HospitalIntelligence';
import { CommandCenter } from './components/command/CommandCenter';
import { AlertsTriage } from './components/alerts/AlertsTriage';
import { AuditLogs } from './components/audit/AuditLogs';
import { SettingsGovernance } from './components/settings/SettingsGovernance';

export default function App() {
  // Public Landing Page is the default entry state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [showSignInModal, setShowSignInModal] = useState<boolean>(false);

  // Authenticated State & Role Assignment (Fixed per user)
  const [userRole, setUserRole] = useState<UserRole>('Doctor');
  const [users, setUsers] = useState<UserProfile[]>(INITIAL_USERS);
  const [currentUser, setCurrentUser] = useState<UserProfile>(INITIAL_USERS[0]);

  // Active View Router
  const [activeView, setActiveView] = useState<string>('dashboard');
  const [selectedPatientId, setSelectedPatientId] = useState<string>('PT-8942');

  // Shared Data States
  const [patients, setPatients] = useState<Patient[]>(INITIAL_PATIENTS);
  const [alerts, setAlerts] = useState<PatientAlert[]>(INITIAL_ALERTS);

  // Modals & Navigation Drawers
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  // Active patient object
  const activePatient = patients.find((p) => p.id === selectedPatientId) || patients[0];

  const handleSelectPatient = (patientId: string) => {
    setSelectedPatientId(patientId);
    setActiveView('patient-detail');
  };

  const handleAddUser = (newUser: UserProfile) => {
    setUsers((prev) => [newUser, ...prev]);
  };

  // Get initial landing view tailored strictly to the user's fixed role
  const getInitialViewForRole = (role: UserRole): string => {
    switch (role) {
      case 'Patient':
        return 'patient-portal';
      case 'Doctor':
        return 'dashboard';
      case 'Nurse':
        return 'monitoring';
      case 'Researcher':
        return 'research';
      case 'Hospital Administrator':
        return 'command';
      case 'System Administrator':
        return 'users';
      default:
        return 'dashboard';
    }
  };

  const handleLogin = (role: UserRole, profile?: UserProfile) => {
    const assignedUser = profile || users.find((u) => u.role === role) || users[0];
    setUserRole(role);
    setCurrentUser(assignedUser);
    setIsAuthenticated(true);
    setShowSignInModal(false);
    setActiveView(getInitialViewForRole(role));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowSignInModal(false);
  };

  // 1. PUBLIC LANDING PAGE: If unauthenticated and not in sign-in view, show Public Hospital Overview
  if (!isAuthenticated) {
    if (showSignInModal) {
      return (
        <LoginPage
          users={users}
          onLogin={handleLogin}
          onBackToPublic={() => setShowSignInModal(false)}
        />
      );
    }
    return (
      <PublicHospitalOverview
        onOpenSignIn={() => setShowSignInModal(true)}
      />
    );
  }

  // 2. AUTHENTICATED WORKSPACE (Strict Role-Based Access Control)
  return (
    <div className="flex h-screen bg-slate-100 text-slate-900 overflow-hidden font-sans antialiased">
      {/* Persistent Left Navigation Sidebar (Desktop) / Slide-over Drawer (Mobile) */}
      <Sidebar
        activeView={activeView}
        onSelectView={(view) => {
          setActiveView(view);
          setIsMobileSidebarOpen(false);
        }}
        userRole={userRole}
        activeAlertCount={alerts.filter((a) => !a.read).length}
        onLogout={handleLogout}
        mobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Top Operational Navigation Bar */}
        <Navbar
          currentUser={currentUser}
          userRole={userRole}
          activeAlertCount={alerts.filter((a) => !a.read).length}
          unreadAlertsCount={alerts.filter((a) => !a.read).length}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenNotifications={() => setIsNotificationOpen(true)}
          onToggleSidebar={() => setIsMobileSidebarOpen((prev) => !prev)}
          onLogout={handleLogout}
          activePatientContext={
            ['patient-detail', 'precision', 'twin', 'cds'].includes(activeView)
              ? { name: activePatient.name, mrn: activePatient.mrn, bed: activePatient.roomBed }
              : undefined
          }
        />

        {/* Scrollable Viewport Container */}
        <main className="flex-1 overflow-y-auto p-3.5 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* 1. Patient Portal (Only for Patient role) */}
            {(userRole === 'Patient' || activeView === 'patient-portal') && (
              <PatientPortal currentUser={currentUser} />
            )}

            {/* 2. System Administrator User Management */}
            {userRole === 'System Administrator' && activeView === 'users' && (
              <UserManagement users={users} onAddUser={handleAddUser} />
            )}

            {/* 3. Clinical & Operational Views (Restricted for non-patient roles) */}
            {userRole !== 'Patient' && (
              <>
                {activeView === 'dashboard' && (
                  <HospitalDashboard
                    patients={patients}
                    alerts={alerts}
                    onSelectPatient={handleSelectPatient}
                    onNavigateView={(view) => setActiveView(view)}
                  />
                )}

                {activeView === 'patients' && (
                  <PatientList
                    patients={patients}
                    onSelectPatient={handleSelectPatient}
                    onNavigateView={(view) => setActiveView(view)}
                  />
                )}

                {activeView === 'patient-detail' && (
                  <PatientProfile
                    patient={activePatient}
                    onBack={() => setActiveView('patients')}
                    onNavigateView={(view) => setActiveView(view)}
                  />
                )}

                {activeView === 'monitoring' && (
                  <LiveMonitoring
                    patients={patients}
                    onSelectPatient={handleSelectPatient}
                    onNavigateView={(view) => setActiveView(view)}
                  />
                )}

                {activeView === 'precision' && (
                  <PrecisionAIWorkspace
                    patient={activePatient}
                    patients={patients}
                    onSelectPatient={(id) => setSelectedPatientId(id)}
                    onNavigateView={(view) => setActiveView(view)}
                  />
                )}

                {activeView === 'twin' && (
                  <MedTwinX
                    patient={activePatient}
                    patients={patients}
                    onSelectPatient={(id) => setSelectedPatientId(id)}
                    onNavigateView={(view) => setActiveView(view)}
                  />
                )}

                {activeView === 'cds' && (
                  <ClinicalDecisionSupport
                    patient={activePatient}
                    patients={patients}
                    onSelectPatient={(id) => setSelectedPatientId(id)}
                    onNavigateView={(view) => setActiveView(view)}
                  />
                )}

                {activeView === 'simulation' && <DiseaseSimulation />}

                {activeView === 'research' && <ClinicalResearch />}

                {activeView === 'intelligence' && <HospitalIntelligence />}

                {activeView === 'command' && <CommandCenter />}

                {activeView === 'alerts' && (
                  <AlertsTriage alerts={alerts} onSelectPatient={handleSelectPatient} />
                )}

                {activeView === 'audit' && <AuditLogs />}

                {activeView === 'settings' && <SettingsGovernance />}
              </>
            )}
          </div>
        </main>
      </div>

      {/* Slide-Over Notification & Alert Center */}
      <NotificationDrawer
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        alerts={alerts}
        onSelectPatient={(patientId) => {
          setIsNotificationOpen(false);
          handleSelectPatient(patientId);
        }}
        onDismissAlert={(alertId) => {
          setAlerts((prev) => prev.filter((a) => a.id !== alertId));
        }}
        onMarkAllRead={() => {
          setAlerts((prev) => prev.map((a) => ({ ...a, read: true })));
        }}
      />

      {/* Global Cmd+K Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        patients={patients}
        onSelectPatient={(patientId) => {
          setIsSearchOpen(false);
          handleSelectPatient(patientId);
        }}
        onNavigateView={(viewId) => {
          setIsSearchOpen(false);
          setActiveView(viewId);
        }}
      />
    </div>
  );
}
