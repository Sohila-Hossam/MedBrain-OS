export type UserRole = 'Doctor' | 'Nurse' | 'Researcher' | 'Hospital Administrator' | 'System Administrator' | 'Patient';

export type RiskLevel = 'Critical' | 'High' | 'Medium' | 'Low';

export type AlertType = 'Critical' | 'Warning' | 'Research' | 'System';

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  title: string;
  department: string;
  email: string;
  avatarUrl?: string;
  badgeId: string;
  status?: 'Active' | 'Pending' | 'On Duty' | 'Discharged';
  mrn?: string;
  specialty?: string;
  phone?: string;
  assignedPhysician?: string;
  roomBed?: string;
}

export interface VitalSign {
  name: string;
  value: number | string;
  unit: string;
  normalRange: string;
  status: 'Critical' | 'Warning' | 'Stable';
  trend: 'increasing' | 'decreasing' | 'stable';
  history: number[];
}

export interface PatientAlert {
  id: string;
  patientId: string;
  patientName: string;
  bed: string;
  type: AlertType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionRequired?: string;
}

export interface Patient {
  id: string;
  mrn: string;
  name: string;
  age: number;
  gender: 'M' | 'F' | 'Other';
  department: string;
  roomBed: string;
  admissionDate: string;
  admissionStatus: 'Admitted' | 'Observation' | 'ICU Transfer' | 'Discharge Pending';
  currentStatus: 'Critical' | 'Unstable' | 'Guarded' | 'Stable';
  overallRisk: RiskLevel;
  primaryDiagnosis: string;
  attendingPhysician: string;
  vitals: {
    heartRate: VitalSign;
    spO2: VitalSign;
    bloodPressure: VitalSign;
    temperature: VitalSign;
    respiratoryRate: VitalSign;
  };
  aiRisks: {
    sepsis: { score: number; band: RiskLevel; trend: 'increasing' | 'stable' | 'decreasing'; confidence: number };
    respiratoryFailure: { score: number; band: RiskLevel; trend: 'increasing' | 'stable' | 'decreasing'; confidence: number };
    cardiacEvent: { score: number; band: RiskLevel; trend: 'increasing' | 'stable' | 'decreasing'; confidence: number };
  };
  latestAlert?: string;
  history: string[];
  medications: { name: string; dose: string; route: string; frequency: string; status: 'Active' | 'Holding' | 'Completed' }[];
  labs: { test: string; result: string; unit: string; range: string; status: 'Normal' | 'High' | 'Low' | 'Critical'; date: string }[];
  imaging: { type: string; area: string; date: string; findings: string; impression: string }[];
  clinicalNotes: { author: string; role: string; date: string; note: string }[];
  timeline: { id: string; time: string; event: string; type: 'admission' | 'lab' | 'medication' | 'oxygen' | 'ai' | 'alert'; detail: string }[];
}

export interface TreatmentScenario {
  id: string;
  name: string;
  category: string;
  expectedResponse: string;
  potentialBenefit: string;
  sideEffectRisk: string;
  patientSpecificConsiderations: string;
  projectedRiskScore: number;
  survivalDelta: string;
  confidence: number;
  recommended: boolean;
  rationale: string;
  contributingFactors: { factor: string; impact: 'High' | 'Medium' | 'Low'; weight: number }[];
}

export interface OrganStatus {
  name: 'Heart' | 'Lungs' | 'Kidneys' | 'Blood & Coagulation' | 'Brain / Neuro' | 'Metabolic & Liver';
  score: number; // 0 - 100 (higher is healthier)
  status: 'Optimal' | 'Mild Dysfunction' | 'Moderate Stress' | 'Severe Strain' | 'Failure';
  metrics: { label: string; value: string; trend: string }[];
  notes: string;
}

export interface ResearchCohort {
  id: string;
  name: string;
  condition: string;
  treatment: string;
  patientCount: number;
  avgAge: number;
  primaryOutcomeMetric: string;
  outcomeValue: string;
  pVal: string;
  hazardRatio?: string;
  confidenceInterval?: string;
  validationStatus: 'Validated' | 'Pending Validation' | 'Exploratory Cohort';
  findingSummary: string;
  patternSignals: string[];
}

export interface KnowledgeNode {
  id: string;
  label: string;
  type: 'Disease' | 'Complication' | 'Drug' | 'Lab Marker' | 'Outcome';
  category: string;
  x: number;
  y: number;
  description: string;
  clinicalEvidence: string;
  connectedTo: string[];
}

export interface ResourceMetric {
  title: string;
  current: number;
  total: number;
  unit: string;
  status: 'Normal' | 'Warning' | 'Critical';
  forecastDelta: string;
  aiNote: string;
}

export interface SystemAuditLog {
  id: string;
  user: string;
  role: string;
  action: string;
  module: string;
  timestamp: string;
  status: 'SUCCESS' | 'WARNING' | 'FAILED';
  ip: string;
}

export interface HospitalReport {
  id: string;
  name: string;
  type: 'Patient Report' | 'Clinical Summary' | 'AI Analysis Report' | 'Simulation Report' | 'Research Report' | 'Hospital Performance Report';
  target: string;
  createdDate: string;
  createdBy: string;
  status: 'Finalized' | 'Draft' | 'Archived';
  fileSize: string;
  summary: string;
}

export interface CDSRecommendation {
  id: string;
  title: string;
  urgency: 'Critical' | 'Warning' | 'Optimization';
  evidenceLevel: string;
  guidelineReference: string;
  clinicalExplanation: string;
  patientDataDrivers: string[];
  status?: 'Pending' | 'Accepted' | 'Overridden';
  overrideReason?: string;
}

export interface SimulationDisease {
  id: string;
  name: string;
  progressionSpeed: string;
  icuAdmissionRate: number;
  mortalityRate: number;
  description: string;
}

export interface ResearchStudy {
  id: string;
  title: string;
  phase: string;
  status: string;
  cohortSize: number;
  principalInvestigator: string;
  hypothesis: string;
  inclusionCriteria: string[];
  endpoints: string[];
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  badgeId: string;
  userRole: string;
  action: string;
  patientOrResource: string;
  ipAddress: string;
  status: string;
}
