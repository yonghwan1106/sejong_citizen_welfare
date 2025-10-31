export type RiskLevel = 'GREEN' | 'YELLOW' | 'ORANGE' | 'RED';

export type HouseholdType = '1인 가구' | '2인 가구' | '3인 가구' | '4인 이상';

export type Gender = '남성' | '여성';

export type Urgency = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export type InterventionStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

export interface UsageData {
  month: string;
  usage: number;
  bill: number;
  overdue: boolean;
}

export interface HealthInsurance {
  premium: number;
  overdue: boolean;
  arrears: number;
  monthsOverdue: number;
}

export interface MedicalRecord {
  date: string;
  type: string;
  reason: string;
}

export interface CounselingRecord {
  date: string;
  type: string;
  category: string[];
  summary: string;
  keywords: string[];
  sentiment: number;
}

export interface CallPattern {
  totalCalls: number;
  frequencyChange: number;
  emergencyCalls: {
    '119': number;
    '112': number;
  };
  socialCallsRatio: number;
}

export interface RiskFactors {
  economic: number;
  health: number;
  psychological: number;
  social: number;
}

export interface AIAnalysis {
  summary: string;
  urgency: Urgency;
  recommendedActions: string[];
  predictedCrisisDate: string | null;
}

export interface Intervention {
  id: string;
  householdId: string;
  type: string;
  assignedTo: string;
  status: InterventionStatus;
  contactMethod: string;
  contactedAt: string;
  serviceLinked: string[];
  notes: string;
  outcome?: string;
  createdAt: string;
  completedAt?: string;
}

export interface Household {
  id: string;
  householdId: string;
  region: string;
  dong: string;
  householdType: HouseholdType;
  age: number;
  gender: Gender;
  registeredAt: string;
  riskScore: number;
  riskLevel: RiskLevel;
  riskFactors: RiskFactors;
  electricityUsage: UsageData[];
  waterUsage: UsageData[];
  healthInsurance: HealthInsurance;
  medicalHistory: MedicalRecord[];
  counselingRecords: CounselingRecord[];
  callPattern: CallPattern;
  intervention: Intervention | null;
  lastContact: string;
  aiAnalysis: AIAnalysis;
}

export interface DashboardStats {
  totalHouseholds: number;
  criticalRisk: number;
  highRisk: number;
  mediumRisk: number;
  lowRisk: number;
  interventionsToday: number;
  interventionsThisWeek: number;
  interventionsThisMonth: number;
  crisisPrevented: number;
}
