/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum ProductionStatus {
  PENDING = '等待中',
  IN_PROGRESS = '生产中',
  COMPLETED = '已完成',
  DELAYED = '已延期',
}

export enum KittingStatus {
  KITTED = '已齐套',
  PARTIAL = '部分齐套',
  NOT_KITTED = '未齐套',
}

export enum QualityStatus {
  QUALIFIED = '合格',
  UNQUALIFIED = '不合格',
  REWORK = '返修',
  PENDING = '待检',
}

export interface QualityIssue {
  id: string;
  title: string;
  description: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'OPEN' | 'RESOLVED' | 'IN_PROGRESS';
  date: string;
  reporter: string;
}

export interface InspectionItem {
  id: string;
  name: string;
  requirement: string;
  actualValue?: string;
  result: QualityStatus;
}

export interface NonConformanceReport {
  id: string;
  issueDescription: string;
  causeAnalysis: string;
  disposition: 'REWORK' | 'SCRAP' | 'ACCEPT_AS_IS';
  dispositionNotes: string;
  handler: string;
  date: string;
}

export interface ProductionRecord {
  id: string;
  stepName: string;
  operator: string;
  startTime: string;
  endTime?: string;
  result: QualityStatus;
  notes?: string;
  attachments?: string[];
  inspections?: InspectionItem[];
  ncr?: NonConformanceReport;
}

export interface Certificate {
  id: string;
  name: string;
  type: 'OUTSOURCED' | 'SUBCONTRACTED' | 'INTERNAL';
  vendor: string;
  issueDate: string;
  expiryDate?: string;
  fileUrl: string;
}

export interface MissingItem {
  id: string;
  name: string;
  requiredQuantity: number;
  availableQuantity: number;
}

export interface Operation {
  id: string;
  name: string;
  status: ProductionStatus;
  progress: number;
  operator?: string;
}

export interface ScheduleInfo {
  plannedStart: string;
  plannedEnd: string;
  actualStart?: string;
  actualEnd?: string;
  remainingHours?: number;
}

export interface Part {
  id: string;
  name: string;
  progress: number;
  status: ProductionStatus;
  quantity: number;
  completedQuantity: number;
  dueDate: string;
  schedule?: ScheduleInfo;
  operations?: Operation[];
  kittingStatus?: KittingStatus;
  missingItems?: MissingItem[];
  qualityStatus?: QualityStatus;
  productionHistory?: ProductionRecord[];
  certificates?: Certificate[];
}

export interface SubAssembly {
  id: string;
  name: string;
  progress: number;
  status: ProductionStatus;
  parts: Part[];
  subAssemblies?: SubAssembly[];
  dueDate: string;
  schedule?: ScheduleInfo;
  kittingStatus?: KittingStatus;
  missingItems?: MissingItem[];
  qualityStatus?: QualityStatus;
  productionHistory?: ProductionRecord[];
}

export interface MachineTool {
  id: string;
  projectNumber: string;
  model: string;
  serialNumber: string;
  overallProgress: number;
  status: ProductionStatus;
  finalAssemblyProgress: number;
  subAssemblies: SubAssembly[];
  startDate: string;
  targetDate: string;
  customer: string;
  schedule?: ScheduleInfo;
  kittingStatus?: KittingStatus;
  missingItems?: MissingItem[];
  productionHistory?: ProductionRecord[];
}

export interface TrendData {
  month: string;
  planned: number;
  actual: number;
}

export interface BottleneckData {
  category: string;
  delayCount: number;
  avgDelayDays: number;
}

export interface CycleAnalysisData {
  machineType: string;
  plannedCycle: number;
  actualCycle: number;
  avgCycle: number;
}

export interface FactorInsight {
  factor: string;
  impactScore: number;
  description: string;
}

export interface QualityDetail {
  id: string;
  name: string;
  type: 'PRODUCT' | 'SUB_ASSEMBLY' | 'PART';
  passRate: number;
  totalChecks: number;
  qualifiedCount: number;
  unqualifiedCount: number;
  reworkCount: number;
  history: ProductionRecord[];
}

export interface QualityStats {
  passRate: number;
  unqualifiedCount: number;
  reworkCount: number;
  pendingCount: number;
  recentIssues: QualityIssue[];
  defectDistribution: { category: string; count: number }[];
  qualityDetails: QualityDetail[];
  // New process quality analysis fields
  inspectionTaskStats: {
    total: number;
    completed: number;
    overdue: number;
    inspectors: { name: string; completed: number; overdue: number }[];
  };
  inspectionTimeAnalysis: {
    taskName: string;
    avgTime: number;
    maxTime: number;
    plannedTime: number;
  }[];
  processPassRate: {
    processCode: string;
    processName: string;
    passRate: number;
    totalChecks: number;
  }[];
  teamPassRate: {
    teamName: string;
    passRate: number;
    totalChecks: number;
  }[];
  workerPassRate: {
    workerName: string;
    passRate: number;
    totalChecks: number;
  }[];
  defectCauseAnalysis: {
    cause: string;
    count: number;
    percentage: number;
  }[];
  qualityTrend: {
    month: string;
    passRate: number;
    defectCount: number;
  }[];
  supplierQuality: {
    supplierName: string;
    passRate: number;
    defectTypes: { type: string; count: number }[];
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  }[];
  qualityCost: {
    category: string;
    amount: number;
    trend: number; // percentage change
  }[];
}

export interface CostData {
  category: string;
  budget: number;
  actual: number;
}

export interface ResourceLoad {
  department: string;
  capacity: number;
  load: number;
  efficiency: number;
}

export interface SupplierPerformance {
  name: string;
  onTimeRate: number;
  qualityRate: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface DecisionRecommendation {
  id: string;
  title: string;
  impact: 'HIGH' | 'MEDIUM' | 'LOW';
  category: 'PRODUCTION' | 'QUALITY' | 'SUPPLY' | 'RESOURCE';
  description: string;
  action: string;
}

export interface StrategicStats {
  totalValueAtRisk: number;
  resourceEfficiency: number;
  supplierRiskIndex: number;
  costPerformanceIndex: number;
  costs: CostData[];
  loads: ResourceLoad[];
  suppliers: SupplierPerformance[];
  recommendations: DecisionRecommendation[];
}

export interface WorkerLaborHour {
  id: string;
  workerName: string;
  workerId: string;
  workshop: string;
  team: string;
  date: string;
  hours: number;
  taskName: string;
  efficiency: number; // percentage
}

export interface PersonnelPerformanceStats {
  totalHours: number;
  avgEfficiency: number;
  topPerformers: { name: string; hours: number; efficiency: number }[];
  workshopComparison: { name: string; hours: number; efficiency: number }[];
  teamComparison: { name: string; hours: number; efficiency: number }[];
  laborHourTrend: { date: string; hours: number; efficiency: number }[];
  workerRankings: {
    workerName: string;
    totalHours: number;
    avgHours: number;
    avgEfficiency: number;
    rank: number;
    trend: 'UP' | 'DOWN' | 'STABLE';
  }[];
  laborHourDetails: WorkerLaborHour[];
}

export interface ProductionTaskStats {
  total: number;
  completed: number;
  planned: number;
  completionRate: number;
  urgentCount: number;
  attentionCount: number;
}

export interface MonthlyCompletion {
  month: string;
  completionRate: number;
  targetRate: number;
}

export interface ProductionProblem {
  category: string;
  count: number;
  impactHours: number;
  trend: 'UP' | 'DOWN' | 'STABLE';
}

export interface ProductionAnalysisStats {
  workshopStats: {
    name: string;
    projectCompletion: ProductionTaskStats;
    monthlyTrend: MonthlyCompletion[];
    currentMonthTasks: { id: string; name: string; status: string; progress: number; isUrgent: boolean }[];
  }[];
  teamStats: {
    teamName: string;
    workshopName: string;
    monthlyTrend: MonthlyCompletion[];
    currentMonthTasks: { id: string; name: string; status: string; progress: number; isUrgent: boolean }[];
  }[];
  workerStats: {
    workerName: string;
    teamName: string;
    monthlyTrend: MonthlyCompletion[];
    currentMonthTasks: { id: string; name: string; status: string; progress: number; isUrgent: boolean }[];
  }[];
  problemAnalysis: ProductionProblem[];
}

export interface EquipmentStats {
  totalDevices: number;
  activeDevices: number;
  maintenanceDevices: number;
  faultDevices: number;
  soundnessRate: number;
  operationRate: number;
  pendingFaults: number;
  overallOEE: number;
  oeeTrend: { date: string; oee: number; availability: number; performance: number; quality: number }[];
  faultDistribution: { category: string; count: number }[];
  maintenancePlans: { id: string; deviceName: string; type: string; date: string; status: string }[];
  devices: { id: string; name: string; status: string; oee: number; lastMaintenance: string }[];
}

export interface MaterialStats {
  inventoryTurnover: number;
  stockoutAlerts: number;
  materialAvailability: number;
  inventoryStructure: { category: string; value: number }[];
  availabilityTrend: { month: string; rate: number }[];
  inventoryDetails: { id: string; name: string; category: string; stock: number; unit: number; status: string }[];
}

export interface DrillDownData {
  title: string;
  columns: { key: string; label: string }[];
  data: any[];
}

export interface ProcurementStats {
  totalPurchaseOrders: number;
  pendingOrders: number;
  onTimeArrivalRate: number;
  procurementCost: { budget: number; actual: number; trend: number };
  supplierPerformance: {
    name: string;
    deliveryRate: number;
    qualityRate: number;
    leadTime: number;
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  }[];
  materialArrivalStatus: {
    materialName: string;
    orderId: string;
    quantity: number;
    plannedArrival: string;
    status: 'IN_TRANSIT' | 'DELAYED' | 'RECEIVED' | 'PENDING';
    productionImpact: 'HIGH' | 'MEDIUM' | 'LOW';
  }[];
  leadTimeAnalysis: {
    category: string;
    avgLeadTime: number;
    targetLeadTime: number;
  }[];
  procurementTrend: {
    month: string;
    orderCount: number;
    cost: number;
  }[];
}

export interface AIInsight {
  id: string;
  subject: 'PRODUCTION' | 'QUALITY' | 'PERSONNEL' | 'EQUIPMENT' | 'MATERIAL' | 'PROCUREMENT' | 'PLANNING' | 'COMPREHENSIVE';
  period: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'QUARTERLY' | 'YEARLY';
  summary: string;
  metrics: { label: string; value: string; trend: 'UP' | 'DOWN' | 'STABLE'; description?: string }[];
  alerts: { type: 'WARNING' | 'CRITICAL' | 'INFO'; message: string }[];
  suggestions: string[];
}

export interface PlanningStats {
  bomPreparation: {
    totalProducts: number;
    completedBOM: number;
    pendingBOM: number;
    completionRate: number;
    details: { product: string; status: 'COMPLETED' | 'PENDING' | 'IN_PROGRESS'; progress: number }[];
  };
  processPreparation: {
    totalProducts: number;
    completedProcess: number;
    pendingProcess: number;
    completionRate: number;
    details: { product: string; status: 'COMPLETED' | 'PENDING' | 'IN_PROGRESS'; progress: number }[];
  };
  planDecomposition: {
    totalPlans: number;
    decomposedCount: number;
    pendingDecomposition: number;
    rate: number;
    details: { planId: string; productName: string; status: 'DECOMPOSED' | 'PENDING'; date: string }[];
  };
  planCompilation: {
    totalPlans: number;
    compiledCount: number;
    pendingCompilation: number;
    rate: number;
    details: { planId: string; productName: string; status: 'COMPILED' | 'PENDING'; date: string }[];
  };
  planIssuance: {
    totalPlans: number;
    issuedCount: number;
    pendingIssuance: number;
    rate: number;
    details: { planId: string; productName: string; status: 'ISSUED' | 'PENDING'; date: string }[];
  };
  planExecution: {
    totalTasks: number;
    completedTasks: number;
    delayedTasks: number;
    executionRate: number;
    details: { taskId: string; productName: string; progress: number; status: ProductionStatus }[];
  };
  planChanges: {
    total: number;
    bomChanges: number;
    processChanges: number;
    planInsertions: number;
    planAdditions: number;
    planChanges: number;
    details: {
      id: string;
      type: 'BOM_CHANGE' | 'PROCESS_CHANGE' | 'PLAN_INSERTION' | 'PLAN_ADDITION' | 'PLAN_CHANGE';
      title: string;
      product: string;
      date: string;
      status: 'PENDING' | 'COMPLETED' | 'IN_PROGRESS';
      description: string;
    }[];
  };
}

export interface DashboardStats {
  totalOrders: number;
  completedOrders: number;
  delayedOrders: number;
  averageProgress: number;
  onTimeDeliveryRate: number;
  capacityUtilization: number;
  trend: TrendData[];
  bottlenecks: BottleneckData[];
  cycleAnalysis: CycleAnalysisData[];
  factorInsights: FactorInsight[];
  qualityStats: QualityStats;
  strategicStats?: StrategicStats;
  personnelStats?: PersonnelPerformanceStats;
  productionAnalysis?: ProductionAnalysisStats;
  equipmentStats?: EquipmentStats;
  materialStats?: MaterialStats;
  procurementStats?: ProcurementStats;
  planningStats?: PlanningStats;
  aiInsights?: AIInsight[];
}
