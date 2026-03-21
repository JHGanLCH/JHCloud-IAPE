import { MachineTool, ProductionStatus, KittingStatus, DashboardStats, QualityStatus, PlanningStats } from './types';

export const mockMachineTools: MachineTool[] = [
  {
    id: 'MT-001',
    projectNumber: 'PRJ-2024-001',
    model: 'VMC-850 立式加工中心',
    serialNumber: 'SN202403001',
    overallProgress: 75,
    status: ProductionStatus.IN_PROGRESS,
    finalAssemblyProgress: 40,
    startDate: '2024-02-15',
    targetDate: '2024-03-25',
    customer: '通用汽车制造部',
    kittingStatus: KittingStatus.KITTED,
    schedule: {
      plannedStart: '2024-02-15',
      plannedEnd: '2024-03-25',
      actualStart: '2024-02-15',
      remainingHours: 120
    },
    productionHistory: [
      { 
        id: 'MT-REC-001', 
        stepName: '底座安装', 
        operator: '陈工', 
        startTime: '2024-02-15', 
        endTime: '2024-02-17', 
        result: QualityStatus.QUALIFIED, 
        notes: '底座水平度调整完成，符合标准。',
        inspections: [
          { id: 'INS-001', name: '水平度检查', requirement: '≤ 0.02mm/m', actualValue: '0.015mm/m', result: QualityStatus.QUALIFIED },
          { id: 'INS-002', name: '地脚螺栓紧固', requirement: '扭矩 120Nm', actualValue: '120Nm', result: QualityStatus.QUALIFIED }
        ]
      },
      { 
        id: 'MT-REC-002', 
        stepName: '立柱吊装', 
        operator: '陈工', 
        startTime: '2024-02-18', 
        endTime: '2024-02-20', 
        result: QualityStatus.UNQUALIFIED,
        notes: '立柱垂直度超差。',
        inspections: [
          { id: 'INS-003', name: '垂直度检查', requirement: '≤ 0.03mm/m', actualValue: '0.05mm/m', result: QualityStatus.UNQUALIFIED }
        ],
        ncr: {
          id: 'NCR-2024-001',
          issueDescription: '立柱安装后，使用激光干涉仪检测垂直度为0.05mm/m，超过设计要求的0.03mm/m。',
          causeAnalysis: '底座支撑垫铁不平整导致。',
          disposition: 'REWORK',
          dispositionNotes: '重新调整垫铁高度，再次进行垂直度校准。',
          handler: '质量部-王经理',
          date: '2024-02-20'
        }
      },
      { id: 'MT-REC-003', stepName: '主轴箱装配', operator: '王工', startTime: '2024-02-21', endTime: '2024-02-25', result: QualityStatus.QUALIFIED },
      { id: 'MT-REC-004', stepName: '电气布线', operator: '赵工', startTime: '2024-02-26', result: QualityStatus.PENDING, notes: '正在进行主控柜接线。' }
    ],
    subAssemblies: [
      {
        id: 'SA-L1-001',
        name: '主轴系统 (L1)',
        progress: 90,
        status: ProductionStatus.IN_PROGRESS,
        dueDate: '2024-03-05',
        kittingStatus: KittingStatus.KITTED,
        qualityStatus: QualityStatus.QUALIFIED,
        schedule: {
          plannedStart: '2024-02-16',
          plannedEnd: '2024-03-05',
          actualStart: '2024-02-16',
          remainingHours: 24
        },
        productionHistory: [
          { id: 'REC-001', stepName: '粗加工', operator: '王工', startTime: '2024-02-16', endTime: '2024-02-18', result: QualityStatus.QUALIFIED },
          { id: 'REC-002', stepName: '热处理', operator: '刘工', startTime: '2024-02-19', endTime: '2024-02-20', result: QualityStatus.QUALIFIED },
          { id: 'REC-003', stepName: '精加工', operator: '张工', startTime: '2024-02-21', endTime: '2024-02-25', result: QualityStatus.QUALIFIED }
        ],
        parts: [],
        subAssemblies: [
          {
            id: 'SA-L2-001',
            name: '主轴驱动单元 (L2)',
            progress: 85,
            status: ProductionStatus.IN_PROGRESS,
            dueDate: '2024-03-02',
            schedule: {
              plannedStart: '2024-02-18',
              plannedEnd: '2024-03-02',
              actualStart: '2024-02-19',
              remainingHours: 48
            },
            parts: [],
            subAssemblies: [
              {
                id: 'SA-L3-001',
                name: '电机组件 (L3)',
                progress: 80,
                status: ProductionStatus.IN_PROGRESS,
                dueDate: '2024-02-28',
                schedule: {
                  plannedStart: '2024-02-20',
                  plannedEnd: '2024-02-28',
                  actualStart: '2024-02-21',
                  remainingHours: 36
                },
                parts: [],
                subAssemblies: [
                  {
                    id: 'SA-L4-001',
                    name: '转子总成 (L4)',
                    progress: 70,
                    status: ProductionStatus.IN_PROGRESS,
                    dueDate: '2024-02-25',
                    parts: [],
                    subAssemblies: [
                      {
                        id: 'SA-L5-001',
                        name: '轴承支架组 (L5)',
                        progress: 60,
                        status: ProductionStatus.IN_PROGRESS,
                        dueDate: '2024-02-20',
                        parts: [
                          { 
                            id: 'P-L5-001', 
                            name: '精密轴承', 
                            progress: 100, 
                            status: ProductionStatus.COMPLETED, 
                            quantity: 2, 
                            completedQuantity: 2, 
                            dueDate: '2024-02-15',
                            kittingStatus: KittingStatus.KITTED,
                            qualityStatus: QualityStatus.QUALIFIED,
                            certificates: [
                              { id: 'CERT-001', name: '轴承合格证', type: 'OUTSOURCED', vendor: 'SKF', issueDate: '2024-01-10', fileUrl: '#' }
                            ]
                          },
                          { 
                            id: 'P-L5-002', 
                            name: '支架铸件', 
                            progress: 20, 
                            status: ProductionStatus.IN_PROGRESS, 
                            quantity: 1, 
                            completedQuantity: 0, 
                            dueDate: '2024-02-18',
                            kittingStatus: KittingStatus.KITTED,
                            qualityStatus: QualityStatus.PENDING,
                            operations: [
                              { id: 'OP-L5-01', name: '粗铣', status: ProductionStatus.COMPLETED, progress: 100, operator: '张工' },
                              { id: 'OP-L5-02', name: '精铣', status: ProductionStatus.IN_PROGRESS, progress: 20, operator: '李工' }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'SA-002',
        name: '工作台部装',
        progress: 80,
        status: ProductionStatus.IN_PROGRESS,
        dueDate: '2024-03-15',
        kittingStatus: KittingStatus.KITTED,
        qualityStatus: QualityStatus.QUALIFIED,
        parts: [
          { id: 'P-003', name: '丝杠', progress: 100, status: ProductionStatus.COMPLETED, quantity: 1, completedQuantity: 1, dueDate: '2024-03-05', kittingStatus: KittingStatus.KITTED, qualityStatus: QualityStatus.QUALIFIED },
          { 
            id: 'P-004', 
            name: '导轨滑块', 
            progress: 60, 
            status: ProductionStatus.IN_PROGRESS, 
            quantity: 4, 
            completedQuantity: 2, 
            dueDate: '2024-03-12',
            kittingStatus: KittingStatus.KITTED,
            qualityStatus: QualityStatus.REWORK,
            productionHistory: [
              { id: 'REC-004', stepName: '磨削', operator: '王工', startTime: '2024-03-08', endTime: '2024-03-10', result: QualityStatus.UNQUALIFIED, notes: '表面粗糙度超标' },
              { id: 'REC-005', stepName: '返修磨削', operator: '王工', startTime: '2024-03-11', result: QualityStatus.REWORK }
            ],
            operations: [
              { id: 'OP-04', name: '下料', status: ProductionStatus.COMPLETED, progress: 100, operator: '王工' },
              { id: 'OP-05', name: '铣削', status: ProductionStatus.IN_PROGRESS, progress: 50, operator: '赵工' },
              { id: 'OP-06', name: '钻孔', status: ProductionStatus.PENDING, progress: 0 }
            ]
          },
        ]
      }
    ]
  },
  {
    id: 'MT-002',
    projectNumber: 'PRJ-2024-002',
    model: 'CK-6150 数控车床',
    serialNumber: 'SN202403002',
    overallProgress: 30,
    status: ProductionStatus.DELAYED,
    finalAssemblyProgress: 0,
    startDate: '2024-03-01',
    targetDate: '2024-04-10',
    customer: '航天精工科技',
    kittingStatus: KittingStatus.PARTIAL,
    missingItems: [
      { id: 'M-001', name: '数控系统', requiredQuantity: 1, availableQuantity: 0 },
      { id: 'M-002', name: '主电机', requiredQuantity: 1, availableQuantity: 1 }
    ],
    subAssemblies: [
      {
        id: 'SA-003',
        name: '床身部装',
        progress: 45,
        status: ProductionStatus.IN_PROGRESS,
        dueDate: '2024-03-20',
        kittingStatus: KittingStatus.KITTED,
        parts: [
          { id: 'P-005', name: '床身铸件', progress: 100, status: ProductionStatus.COMPLETED, quantity: 1, completedQuantity: 1, dueDate: '2024-03-05', kittingStatus: KittingStatus.KITTED },
          { 
            id: 'P-006', 
            name: '导轨磨削', 
            progress: 20, 
            status: ProductionStatus.IN_PROGRESS, 
            quantity: 1, 
            completedQuantity: 0, 
            dueDate: '2024-03-15',
            kittingStatus: KittingStatus.KITTED,
            operations: [
              { id: 'OP-07', name: '粗磨', status: ProductionStatus.IN_PROGRESS, progress: 40, operator: '陈工' },
              { id: 'OP-08', name: '精磨', status: ProductionStatus.PENDING, progress: 0 }
            ]
          },
        ]
      }
    ]
  },
  {
    id: 'MT-004',
    projectNumber: 'PRJ-2024-008',
    model: 'VMC-1000 立式加工中心',
    serialNumber: 'SN202403008',
    overallProgress: 0,
    status: ProductionStatus.PENDING,
    finalAssemblyProgress: 0,
    startDate: '2024-03-20',
    targetDate: '2024-05-01',
    customer: '大连机床集团',
    kittingStatus: KittingStatus.NOT_KITTED,
    missingItems: [
      { id: 'M-003', name: '铸件底座', requiredQuantity: 1, availableQuantity: 0 },
      { id: 'M-004', name: '立柱', requiredQuantity: 1, availableQuantity: 0 }
    ],
    subAssemblies: [
      {
        id: 'SA-004',
        name: '主轴组',
        progress: 0,
        status: ProductionStatus.PENDING,
        dueDate: '2024-04-05',
        kittingStatus: KittingStatus.PARTIAL,
        missingItems: [
          { id: 'M-005', name: '精密轴承', requiredQuantity: 4, availableQuantity: 2 }
        ],
        parts: [
          { id: 'P-007', name: '主轴芯', progress: 0, status: ProductionStatus.PENDING, quantity: 1, completedQuantity: 0, dueDate: '2024-03-25', kittingStatus: KittingStatus.NOT_KITTED, missingItems: [{ id: 'M-006', name: '40Cr圆钢', requiredQuantity: 1, availableQuantity: 0 }] }
        ]
      }
    ]
  },
  {
    id: 'MT-003',
    projectNumber: 'PRJ-2024-005',
    model: 'HMC-630 卧式加工中心',
    serialNumber: 'SN202403003',
    overallProgress: 100,
    status: ProductionStatus.COMPLETED,
    finalAssemblyProgress: 100,
    startDate: '2024-01-10',
    targetDate: '2024-03-01',
    customer: '重工机械集团',
    kittingStatus: KittingStatus.KITTED,
    subAssemblies: []
  }
];

export const mockPlanningStats: PlanningStats = {
  bomPreparation: {
    totalProducts: 120,
    completedBOM: 108,
    pendingBOM: 12,
    completionRate: 90,
    details: [
      { product: 'VMC-850 立式加工中心', status: 'COMPLETED', progress: 100 },
      { product: 'HMC-630 卧式加工中心', status: 'IN_PROGRESS', progress: 85 },
      { product: 'TC-200 数控车床', status: 'PENDING', progress: 0 },
    ]
  },
  processPreparation: {
    totalProducts: 120,
    completedProcess: 102,
    pendingProcess: 18,
    completionRate: 85,
    details: [
      { product: 'VMC-850 立式加工中心', status: 'COMPLETED', progress: 100 },
      { product: 'HMC-630 卧式加工中心', status: 'IN_PROGRESS', progress: 70 },
      { product: 'TC-200 数控车床', status: 'PENDING', progress: 0 },
    ]
  },
  planDecomposition: {
    totalPlans: 45,
    decomposedCount: 42,
    pendingDecomposition: 3,
    rate: 93.3,
    details: [
      { planId: 'PLN-2024-001', productName: 'VMC-850', status: 'DECOMPOSED', date: '2024-03-15' },
      { planId: 'PLN-2024-002', productName: 'HMC-630', status: 'DECOMPOSED', date: '2024-03-16' },
      { planId: 'PLN-2024-003', productName: 'TC-200', status: 'PENDING', date: '2024-03-20' },
    ]
  },
  planCompilation: {
    totalPlans: 45,
    compiledCount: 40,
    pendingCompilation: 5,
    rate: 88.9,
    details: [
      { planId: 'PLN-2024-001', productName: 'VMC-850', status: 'COMPILED', date: '2024-03-15' },
      { planId: 'PLN-2024-002', productName: 'HMC-630', status: 'COMPILED', date: '2024-03-17' },
      { planId: 'PLN-2024-003', productName: 'TC-200', status: 'PENDING', date: '2024-03-20' },
    ]
  },
  planIssuance: {
    totalPlans: 45,
    issuedCount: 38,
    pendingIssuance: 7,
    rate: 84.4,
    details: [
      { planId: 'PLN-2024-001', productName: 'VMC-850', status: 'ISSUED', date: '2024-03-16' },
      { planId: 'PLN-2024-002', productName: 'HMC-630', status: 'ISSUED', date: '2024-03-18' },
      { planId: 'PLN-2024-003', productName: 'TC-200', status: 'PENDING', date: '2024-03-20' },
    ]
  },
  planExecution: {
    totalTasks: 250,
    completedTasks: 210,
    delayedTasks: 15,
    executionRate: 84,
    details: [
      { taskId: 'TSK-001', productName: 'VMC-850', progress: 100, status: ProductionStatus.COMPLETED },
      { taskId: 'TSK-002', productName: 'HMC-630', progress: 65, status: ProductionStatus.IN_PROGRESS },
      { taskId: 'TSK-003', productName: 'TC-200', progress: 10, status: ProductionStatus.IN_PROGRESS },
    ]
  },
  planChanges: {
    total: 28,
    bomChanges: 8,
    processChanges: 6,
    planInsertions: 4,
    planAdditions: 5,
    planChanges: 10,
    details: [
      { id: 'CHG-001', type: 'BOM_CHANGE', title: '主轴轴承规格变更', product: 'VMC-850', date: '2024-03-18', status: 'COMPLETED', description: '由于原供应商缺货，更换为同等级NSK轴承，BOM已同步更新。' },
      { id: 'CHG-002', type: 'PROCESS_CHANGE', title: '底座精加工工艺优化', product: 'HMC-630', date: '2024-03-19', status: 'IN_PROGRESS', description: '为提升精度稳定性，增加一次时效处理工序。' },
      { id: 'CHG-003', type: 'PLAN_INSERTION', title: '紧急出口订单插单', product: 'TC-200', date: '2024-03-20', status: 'PENDING', description: '东南亚客户紧急追加2台订单，需优先排产。' },
      { id: 'CHG-005', type: 'PLAN_ADDITION', title: '新增年度维保备件计划', product: '通用备件', date: '2024-03-21', status: 'COMPLETED', description: '根据年度维保需求，新增一批关键备件生产计划。' },
      { id: 'CHG-004', type: 'PLAN_CHANGE', title: '交付日期延后调整', product: 'VMC-850', date: '2024-03-21', status: 'COMPLETED', description: '受物流影响，交付日期由25日调整至28日。' },
    ]
  }
};

export const mockDashboardStats: DashboardStats = {
  totalOrders: 24,
  completedOrders: 18,
  delayedOrders: 3,
  averageProgress: 68,
  onTimeDeliveryRate: 85,
  capacityUtilization: 92,
  trend: [
    { month: '10月', planned: 4, actual: 4 },
    { month: '11月', planned: 5, actual: 4 },
    { month: '12月', planned: 6, actual: 6 },
    { month: '1月', planned: 4, actual: 3 },
    { month: '2月', planned: 5, actual: 5 },
    { month: '3月', planned: 6, actual: 2 }, // Current month
  ],
  bottlenecks: [
    { category: '主轴系统', delayCount: 5, avgDelayDays: 4.2 },
    { category: '床身铸件', delayCount: 3, avgDelayDays: 7.5 },
    { category: '数控系统外购', delayCount: 4, avgDelayDays: 12.0 },
    { category: '精加工工序', delayCount: 2, avgDelayDays: 3.1 },
  ],
  cycleAnalysis: [
    { machineType: '立式加工中心', plannedCycle: 35, actualCycle: 38, avgCycle: 36.5 },
    { machineType: '数控车床', plannedCycle: 25, actualCycle: 28, avgCycle: 26.2 },
    { machineType: '卧式加工中心', plannedCycle: 45, actualCycle: 44, avgCycle: 44.8 },
    { machineType: '龙门加工中心', plannedCycle: 60, actualCycle: 68, avgCycle: 65.0 },
  ],
  factorInsights: [
    { factor: '外购件到货延迟', impactScore: 85, description: '数控系统及精密轴承到货周期不稳定，是导致延期的首要因素。' },
    { factor: '关键工序产能受限', impactScore: 65, description: '精加工中心负荷率长期处于95%以上，工序排队时间较长。' },
    { factor: '设计变更频繁', impactScore: 40, description: '非标定制化需求导致的临时设计调整影响了部装进度。' },
    { factor: '装配调试效率', impactScore: 30, description: '新员工入职后的技能熟练度提升期对总装周期有小幅影响。' },
  ],
  qualityStats: {
    passRate: 98.5,
    unqualifiedCount: 12,
    reworkCount: 8,
    pendingCount: 45,
    recentIssues: [
      { id: 'ISS-001', title: '主轴径向跳动超差', description: '在精磨工序后检测发现主轴径向跳动为0.005mm，超出0.003mm的标准。', severity: 'HIGH', status: 'IN_PROGRESS', date: '2024-03-12', reporter: '张工' },
      { id: 'ISS-002', title: '铸件表面砂眼', description: '床身铸件底座发现少量砂眼，需进行补焊处理。', severity: 'MEDIUM', status: 'OPEN', date: '2024-03-11', reporter: '李工' },
      { id: 'ISS-003', title: '丝杠防护罩尺寸偏差', description: '外协件防护罩长度偏短5mm，已联系供应商退货。', severity: 'LOW', status: 'RESOLVED', date: '2024-03-10', reporter: '王工' }
    ],
    defectDistribution: [
      { category: '尺寸超差', count: 15 },
      { category: '外观缺陷', count: 8 },
      { category: '装配干涉', count: 5 },
      { category: '性能不达标', count: 3 },
      { category: '其他', count: 2 }
    ],
    qualityDetails: [
      {
        id: 'MT-001',
        name: 'VMC-850 立式加工中心 (SN202403001)',
        type: 'PRODUCT',
        passRate: 96.5,
        totalChecks: 120,
        qualifiedCount: 116,
        unqualifiedCount: 4,
        reworkCount: 2,
        history: [
          { 
            id: 'MT-REC-001', 
            stepName: '底座安装', 
            operator: '陈工', 
            startTime: '2024-02-15', 
            endTime: '2024-02-17', 
            result: QualityStatus.QUALIFIED, 
            notes: '底座水平度调整完成，符合标准。',
            inspections: [
              { id: 'INS-001', name: '水平度检查', requirement: '≤ 0.02mm/m', actualValue: '0.015mm/m', result: QualityStatus.QUALIFIED },
              { id: 'INS-002', name: '地脚螺栓紧固', requirement: '扭矩 120Nm', actualValue: '120Nm', result: QualityStatus.QUALIFIED }
            ]
          },
          { 
            id: 'MT-REC-002', 
            stepName: '立柱吊装', 
            operator: '陈工', 
            startTime: '2024-02-18', 
            endTime: '2024-02-20', 
            result: QualityStatus.UNQUALIFIED,
            notes: '立柱垂直度超差。',
            inspections: [
              { id: 'INS-003', name: '垂直度检查', requirement: '≤ 0.03mm/m', actualValue: '0.05mm/m', result: QualityStatus.UNQUALIFIED }
            ],
            ncr: {
              id: 'NCR-2024-001',
              issueDescription: '立柱安装后，使用激光干涉仪检测垂直度为0.05mm/m，超过设计要求的0.03mm/m。',
              causeAnalysis: '底座支撑垫铁不平整导致。',
              disposition: 'REWORK',
              dispositionNotes: '重新调整垫铁高度，再次进行垂直度校准。',
              handler: '质量部-王经理',
              date: '2024-02-20'
            }
          }
        ]
      },
      {
        id: 'SA-L1-001',
        name: '主轴系统 (L1)',
        type: 'SUB_ASSEMBLY',
        passRate: 98.2,
        totalChecks: 56,
        qualifiedCount: 55,
        unqualifiedCount: 1,
        reworkCount: 1,
        history: [
          { id: 'REC-001', stepName: '粗加工', operator: '王工', startTime: '2024-02-16', endTime: '2024-02-18', result: QualityStatus.QUALIFIED },
          { id: 'REC-002', stepName: '热处理', operator: '刘工', startTime: '2024-02-19', endTime: '2024-02-20', result: QualityStatus.QUALIFIED }
        ]
      },
      {
        id: 'P-L5-001',
        name: '精密轴承',
        type: 'PART',
        passRate: 100,
        totalChecks: 12,
        qualifiedCount: 12,
        unqualifiedCount: 0,
        reworkCount: 0,
        history: []
      }
    ],
    inspectionTaskStats: {
      total: 150,
      completed: 135,
      overdue: 15,
      inspectors: [
        { name: '张工', completed: 45, overdue: 2 },
        { name: '李工', completed: 40, overdue: 5 },
        { name: '王工', completed: 50, overdue: 8 }
      ]
    },
    inspectionTimeAnalysis: [
      { taskName: '主轴径向跳动检测', avgTime: 45, maxTime: 120, plannedTime: 40 },
      { taskName: '导轨直线度检测', avgTime: 60, maxTime: 90, plannedTime: 50 },
      { taskName: '整机定位精度测试', avgTime: 180, maxTime: 240, plannedTime: 150 },
      { taskName: '电气系统绝缘测试', avgTime: 30, maxTime: 45, plannedTime: 30 }
    ],
    processPassRate: [
      { processCode: 'OP-01', processName: '粗加工', passRate: 99.2, totalChecks: 500 },
      { processCode: 'OP-05', processName: '精磨', passRate: 94.5, totalChecks: 200 },
      { processCode: 'OP-10', processName: '热处理', passRate: 98.0, totalChecks: 150 },
      { processCode: 'OP-20', processName: '总装调试', passRate: 92.0, totalChecks: 80 }
    ],
    teamPassRate: [
      { teamName: '机加工一班', passRate: 98.5, totalChecks: 300 },
      { teamName: '机加工二班', passRate: 96.2, totalChecks: 280 },
      { teamName: '装配一班', passRate: 94.0, totalChecks: 120 },
      { teamName: '装配二班', passRate: 95.5, totalChecks: 110 }
    ],
    workerPassRate: [
      { workerName: '张师傅', passRate: 99.5, totalChecks: 100 },
      { workerName: '李师傅', passRate: 92.0, totalChecks: 95 },
      { workerName: '王师傅', passRate: 98.0, totalChecks: 110 },
      { workerName: '赵师傅', passRate: 95.5, totalChecks: 85 }
    ],
    defectCauseAnalysis: [
      { cause: '设备精度偏差', count: 25, percentage: 35 },
      { cause: '操作不当', count: 18, percentage: 25 },
      { cause: '原材料缺陷', count: 12, percentage: 17 },
      { cause: '环境因素', count: 8, percentage: 11 },
      { cause: '设计不合理', count: 8, percentage: 12 }
    ],
    qualityTrend: [
      { month: '10月', passRate: 97.5, defectCount: 15 },
      { month: '11月', passRate: 98.2, defectCount: 12 },
      { month: '12月', passRate: 97.8, defectCount: 14 },
      { month: '1月', passRate: 98.5, defectCount: 10 },
      { month: '2月', passRate: 98.8, defectCount: 8 },
      { month: '3月', passRate: 98.5, defectCount: 12 }
    ],
    supplierQuality: [
      { 
        supplierName: 'SKF轴承', 
        passRate: 99.5, 
        defectTypes: [{ type: '尺寸偏差', count: 1 }, { type: '包装破损', count: 2 }],
        riskLevel: 'LOW'
      },
      { 
        supplierName: '发那科数控', 
        passRate: 98.0, 
        defectTypes: [{ type: '软件故障', count: 3 }, { type: '接口松动', count: 1 }],
        riskLevel: 'MEDIUM'
      },
      { 
        supplierName: '大连铸造', 
        passRate: 92.5, 
        defectTypes: [{ type: '砂眼', count: 8 }, { type: '裂纹', count: 2 }],
        riskLevel: 'HIGH'
      }
    ],
    qualityCost: [
      { category: '预防成本', amount: 450000, trend: 5.2 },
      { category: '鉴定成本', amount: 320000, trend: -2.1 },
      { category: '内部故障成本', amount: 180000, trend: -12.5 },
      { category: '外部故障成本', amount: 950000, trend: -8.4 }
    ]
  },
  strategicStats: {
    totalValueAtRisk: 12500000,
    resourceEfficiency: 88.5,
    supplierRiskIndex: 12.4,
    costPerformanceIndex: 0.94,
    costs: [
      { category: '原材料', budget: 5000000, actual: 5200000 },
      { category: '外购件', budget: 8000000, actual: 8500000 },
      { category: '人工成本', budget: 3000000, actual: 2800000 },
      { category: '制造费用', budget: 2000000, actual: 2100000 },
    ],
    loads: [
      { department: '机加工车间', capacity: 10000, load: 9500, efficiency: 92 },
      { department: '装配车间', capacity: 8000, load: 7800, efficiency: 85 },
      { department: '质检部', capacity: 2000, load: 2200, efficiency: 98 },
      { department: '物流部', capacity: 1500, load: 1200, efficiency: 80 },
    ],
    suppliers: [
      { name: 'SKF轴承', onTimeRate: 98, qualityRate: 99.5, riskLevel: 'LOW' },
      { name: '发那科数控', onTimeRate: 85, qualityRate: 98.0, riskLevel: 'MEDIUM' },
      { name: '大连铸造', onTimeRate: 70, qualityRate: 92.5, riskLevel: 'HIGH' },
    ],
    recommendations: [
      { 
        id: 'REC-001', 
        title: '供应链风险预警', 
        impact: 'HIGH', 
        category: 'SUPPLY', 
        description: '大连铸造连续三批次交付延迟，且质量合格率下降至92.5%。', 
        action: '启动备选供应商评估，并对在途订单进行驻厂监造。' 
      },
      { 
        id: 'REC-002', 
        title: '产能瓶颈优化', 
        impact: 'MEDIUM', 
        category: 'RESOURCE', 
        description: '质检部当前负荷率达110%，已成为整机交付的瓶颈。', 
        action: '建议增加临时质检工位，或将部分初检工序下放到生产班组。' 
      },
      { 
        id: 'REC-003', 
        title: '成本超支控制', 
        impact: 'LOW', 
        category: 'PRODUCTION', 
        description: '外购件成本较预算超支6.2%，主要受汇率波动影响。', 
        action: '锁定核心外购件年度采购价格，减少零星采购比例。' 
      },
    ]
  },
  personnelStats: {
    totalHours: 12500,
    avgEfficiency: 94.5,
    topPerformers: [
      { name: '张师傅', hours: 185, efficiency: 99.5 },
      { name: '王师傅', hours: 178, efficiency: 98.2 },
      { name: '李师傅', hours: 172, efficiency: 97.8 }
    ],
    workshopComparison: [
      { name: '机加工一车间', hours: 4500, efficiency: 96.2 },
      { name: '机加工二车间', hours: 4200, efficiency: 94.8 },
      { name: '装配车间', hours: 3800, efficiency: 92.5 }
    ],
    teamComparison: [
      { name: '机加一班', hours: 1200, efficiency: 97.5 },
      { name: '机加二班', hours: 1150, efficiency: 95.8 },
      { name: '装配一班', hours: 1050, efficiency: 93.2 },
      { name: '装配二班', hours: 1100, efficiency: 94.5 }
    ],
    laborHourTrend: [
      { date: '2024-03-01', hours: 420, efficiency: 93.5 },
      { date: '2024-03-02', hours: 435, efficiency: 94.2 },
      { date: '2024-03-03', hours: 410, efficiency: 92.8 },
      { date: '2024-03-04', hours: 450, efficiency: 95.5 },
      { date: '2024-03-05', hours: 465, efficiency: 96.8 },
      { date: '2024-03-06', hours: 440, efficiency: 94.5 },
      { date: '2024-03-07', hours: 455, efficiency: 95.2 }
    ],
    workerRankings: [
      { workerName: '张师傅', totalHours: 520, avgHours: 173, avgEfficiency: 99.2, rank: 1, trend: 'UP' },
      { workerName: '王师傅', totalHours: 510, avgHours: 170, avgEfficiency: 98.5, rank: 2, trend: 'STABLE' },
      { workerName: '李师傅', totalHours: 495, avgHours: 165, avgEfficiency: 97.8, rank: 3, trend: 'UP' },
      { workerName: '赵师傅', totalHours: 480, avgHours: 160, avgEfficiency: 95.5, rank: 4, trend: 'DOWN' },
      { workerName: '陈师傅', totalHours: 470, avgHours: 156, avgEfficiency: 94.2, rank: 5, trend: 'STABLE' }
    ],
    laborHourDetails: [
      { id: 'LH-001', workerName: '张师傅', workerId: 'W-001', workshop: '机加工一车间', team: '机加一班', date: '2024-03-12', hours: 8.5, taskName: '主轴精磨', efficiency: 99.5 },
      { id: 'LH-002', workerName: '李师傅', workerId: 'W-002', workshop: '机加工一车间', team: '机加二班', date: '2024-03-12', hours: 8.0, taskName: '导轨磨削', efficiency: 92.0 },
      { id: 'LH-003', workerName: '王师傅', workerId: 'W-003', workshop: '装配车间', team: '装配一班', date: '2024-03-12', hours: 9.0, taskName: '整机调试', efficiency: 98.0 },
      { id: 'LH-004', workerName: '赵师傅', workerId: 'W-004', workshop: '装配车间', team: '装配二班', date: '2024-03-12', hours: 8.5, taskName: '电气接线', efficiency: 95.5 },
      { id: 'LH-005', workerName: '陈师傅', workerId: 'W-005', workshop: '机加工二车间', team: '机加三班', date: '2024-03-12', hours: 8.0, taskName: '粗加工', efficiency: 94.2 }
    ]
  },
  productionAnalysis: {
    workshopStats: [
      {
        name: '机加一车间',
        projectCompletion: { total: 45, completed: 38, planned: 42, completionRate: 90.5, urgentCount: 3, attentionCount: 5 },
        monthlyTrend: [
          { month: '10月', completionRate: 92, targetRate: 95 },
          { month: '11月', completionRate: 88, targetRate: 95 },
          { month: '12月', completionRate: 94, targetRate: 95 },
          { month: '1月', completionRate: 91, targetRate: 95 },
          { month: '2月', completionRate: 85, targetRate: 95 },
          { month: '3月', completionRate: 93, targetRate: 95 },
        ],
        currentMonthTasks: [
          { id: 'W1-01', name: 'VMC850主轴箱加工', status: '进行中', progress: 75, isUrgent: true },
          { id: 'W1-02', name: 'HMC630底座铸件粗加工', status: '进行中', progress: 40, isUrgent: false },
          { id: 'W1-03', name: '立柱导轨精磨', status: '已完成', progress: 100, isUrgent: false },
        ]
      },
      {
        name: '装配车间',
        projectCompletion: { total: 28, completed: 22, planned: 25, completionRate: 88.0, urgentCount: 4, attentionCount: 3 },
        monthlyTrend: [
          { month: '10月', completionRate: 95, targetRate: 95 },
          { month: '11月', completionRate: 93, targetRate: 95 },
          { month: '12月', completionRate: 96, targetRate: 95 },
          { month: '1月', completionRate: 89, targetRate: 95 },
          { month: '2月', completionRate: 91, targetRate: 95 },
          { month: '3月', completionRate: 94, targetRate: 95 },
        ],
        currentMonthTasks: [
          { id: 'W2-01', name: 'VMC1100总装', status: '进行中', progress: 85, isUrgent: true },
          { id: 'W2-02', name: '数控系统调试', status: '进行中', progress: 60, isUrgent: true },
          { id: 'W2-03', name: '精度补偿测试', status: '待开始', progress: 0, isUrgent: false },
        ]
      }
    ],
    teamStats: [
      {
        teamName: '机加一班',
        workshopName: '机加一车间',
        monthlyTrend: [
          { month: '1月', completionRate: 94, targetRate: 96 },
          { month: '2月', completionRate: 82, targetRate: 96 },
          { month: '3月', completionRate: 95, targetRate: 96 },
        ],
        currentMonthTasks: [
          { id: 'T1-01', name: '主轴精加工', status: '进行中', progress: 80, isUrgent: true },
          { id: 'T1-02', name: '轴承座加工', status: '已完成', progress: 100, isUrgent: false },
        ]
      }
    ],
    workerStats: [
      {
        workerName: '张师傅',
        teamName: '机加一班',
        monthlyTrend: [
          { month: '1月', completionRate: 98, targetRate: 95 },
          { month: '2月', completionRate: 92, targetRate: 95 },
          { month: '3月', completionRate: 97, targetRate: 95 },
        ],
        currentMonthTasks: [
          { id: 'WK1-01', name: '主轴锥孔研磨', status: '进行中', progress: 90, isUrgent: true },
        ]
      }
    ],
    problemAnalysis: [
      { category: '物料短缺', count: 24, impactHours: 120, trend: 'UP' },
      { category: '设备故障', count: 12, impactHours: 48, trend: 'DOWN' },
      { category: '工艺不当', count: 8, impactHours: 32, trend: 'STABLE' },
      { category: '人员变动', count: 5, impactHours: 40, trend: 'UP' },
    ]
  },
  equipmentStats: {
    totalDevices: 124,
    activeDevices: 112,
    maintenanceDevices: 8,
    faultDevices: 4,
    soundnessRate: 96.8,
    operationRate: 88.2,
    pendingFaults: 6,
    overallOEE: 84.5,
    oeeTrend: [
      { date: '03-01', oee: 82, availability: 90, performance: 92, quality: 99 },
      { date: '03-02', oee: 85, availability: 92, performance: 93, quality: 99 },
      { date: '03-03', oee: 83, availability: 91, performance: 92, quality: 99 },
      { date: '03-04', oee: 86, availability: 93, performance: 94, quality: 99 },
      { date: '03-05', oee: 84, availability: 92, performance: 92, quality: 99 },
      { date: '03-06', oee: 87, availability: 94, performance: 93, quality: 99 },
      { date: '03-07', oee: 85, availability: 93, performance: 92, quality: 99 },
    ],
    faultDistribution: [
      { category: '电气故障', count: 15 },
      { category: '机械磨损', count: 12 },
      { category: '液压系统', count: 8 },
      { category: '数控系统', count: 5 },
      { category: '其他', count: 3 },
    ],
    maintenancePlans: [
      { id: 'MP-001', deviceName: 'VMC-850 #1', type: '一级保养', date: '2024-03-20', status: '待执行' },
      { id: 'MP-002', deviceName: 'CK-6150 #3', type: '精度校验', date: '2024-03-22', status: '待执行' },
      { id: 'MP-003', deviceName: 'HMC-630 #2', type: '二级保养', date: '2024-03-25', status: '待执行' },
    ],
    devices: [
      { id: 'EQ-001', name: '五轴加工中心 A1', status: '运行中', oee: 88, lastMaintenance: '2024-03-01' },
      { id: 'EQ-002', name: '数控车床 B2', status: '待机', oee: 75, lastMaintenance: '2024-02-15' },
      { id: 'EQ-003', name: '激光切割机 C1', status: '维修中', oee: 0, lastMaintenance: '2024-03-10' },
      { id: 'EQ-004', name: '工业机器人 R1', status: '运行中', oee: 92, lastMaintenance: '2024-03-05' },
      { id: 'EQ-005', name: '磨床 G1', status: '运行中', oee: 82, lastMaintenance: '2024-02-28' },
    ]
  },
  materialStats: {
    inventoryTurnover: 4.2,
    stockoutAlerts: 12,
    materialAvailability: 94.8,
    inventoryStructure: [
      { category: '原材料', value: 4500000 },
      { category: '外购件', value: 8200000 },
      { category: '在制品', value: 3500000 },
      { category: '成品', value: 2800000 },
    ],
    availabilityTrend: [
      { month: '10月', rate: 92 },
      { month: '11月', rate: 91 },
      { month: '12月', rate: 94 },
      { month: '1月', rate: 93 },
      { month: '2月', rate: 95 },
      { month: '3月', rate: 94.8 },
    ],
    inventoryDetails: [
      { id: 'MAT-001', name: '精密轴承 7005C', category: '外购件', stock: 45, unit: 120, status: '正常' },
      { id: 'MAT-002', name: '40Cr 圆钢 Φ50', category: '原材料', stock: 1200, unit: 5000, status: '预警' },
      { id: 'MAT-003', name: 'FANUC 0i-MF 系统', category: '外购件', stock: 5, unit: 20, status: '正常' },
    ]
  },
  procurementStats: {
    totalPurchaseOrders: 456,
    pendingOrders: 28,
    onTimeArrivalRate: 92.5,
    procurementCost: { budget: 12000000, actual: 11500000, trend: -4.2 },
    supplierPerformance: [
      { name: '上海精工机械', deliveryRate: 98, qualityRate: 99, leadTime: 12, riskLevel: 'LOW' },
      { name: '江苏博世传动', deliveryRate: 85, qualityRate: 95, leadTime: 25, riskLevel: 'MEDIUM' },
      { name: '浙江力源液压', deliveryRate: 92, qualityRate: 98, leadTime: 18, riskLevel: 'LOW' },
      { name: '大连机床附件', deliveryRate: 78, qualityRate: 92, leadTime: 35, riskLevel: 'HIGH' },
    ],
    materialArrivalStatus: [
      { materialName: '主轴轴承', orderId: 'PO-2024-001', quantity: 200, plannedArrival: '2024-03-20', status: 'IN_TRANSIT', productionImpact: 'HIGH' },
      { materialName: '铸铁床身', orderId: 'PO-2024-005', quantity: 10, plannedArrival: '2024-03-18', status: 'DELAYED', productionImpact: 'HIGH' },
      { materialName: '控制面板', orderId: 'PO-2024-012', quantity: 50, plannedArrival: '2024-03-25', status: 'PENDING', productionImpact: 'MEDIUM' },
      { materialName: '导轨滑块', orderId: 'PO-2024-008', quantity: 400, plannedArrival: '2024-03-15', status: 'RECEIVED', productionImpact: 'LOW' },
    ],
    leadTimeAnalysis: [
      { category: '电子元器件', avgLeadTime: 45, targetLeadTime: 30 },
      { category: '机械标准件', avgLeadTime: 15, targetLeadTime: 14 },
      { category: '铸锻件', avgLeadTime: 60, targetLeadTime: 45 },
      { category: '液压件', avgLeadTime: 25, targetLeadTime: 21 },
    ],
    procurementTrend: [
      { month: '10月', orderCount: 38, cost: 950000 },
      { month: '11月', orderCount: 42, cost: 1100000 },
      { month: '12月', orderCount: 35, cost: 880000 },
      { month: '1月', orderCount: 45, cost: 1250000 },
      { month: '2月', orderCount: 30, cost: 750000 },
      { month: '3月', orderCount: 48, cost: 1350000 },
    ]
  },
  planningStats: mockPlanningStats,
  aiInsights: [
    {
      id: 'comp-d-1',
      subject: 'COMPREHENSIVE',
      period: 'DAILY',
      summary: '今日生产运行平稳。总装车间交付2台VMC-850机床，关键工序节拍符合预期。昨日夜班期间出现一次主轴箱装配小幅滞后，已于今日早班通过人员调配追回进度。当前全线无重大异常。',
      metrics: [
        { label: '当日产出', value: '2台', trend: 'STABLE', description: '符合计划排产' },
        { label: '工序达成率', value: '98.5%', trend: 'UP', description: '较昨日提升1.2%' },
        { label: '异常处理及时率', value: '100%', trend: 'STABLE' },
        { label: '当日OEE', value: '84.2%', trend: 'UP', description: '设备状态良好' }
      ],
      alerts: [
        { type: 'INFO', message: '总装A线今日完成TC-200首台样机底座安装。' },
        { type: 'WARNING', message: '精密研磨工序刀具寿命接近临界点，预计明早需更换。' }
      ],
      suggestions: [
        '关注明早精密研磨工序的刀具更换，确保不影响后续装配。',
        '夜班交接需重点确认TC-200样机的安装精度数据。'
      ]
    },
    {
      id: 'comp-w-1',
      subject: 'COMPREHENSIVE',
      period: 'WEEKLY',
      summary: '本周任务完成情况良好，周计划达成率达102%。上周遗留的供应链短缺问题已在本周二得到彻底解决。本周重点机型HMC-630进入总装高峰期，质量表现稳定。人员效率较上周有显著提升。',
      metrics: [
        { label: '周计划达成率', value: '102%', trend: 'UP', description: '较上周提升5%' },
        { label: '周平均产出', value: '1.8台/日', trend: 'UP', description: '产能释放明显' },
        { label: '质量一次合格率', value: '97.8%', trend: 'STABLE' },
        { label: '周设备停机时间', value: '3.5h', trend: 'DOWN', description: '较上周减少2h' }
      ],
      alerts: [
        { type: 'INFO', message: '本周成功解决外协件防护罩尺寸偏差的长期质量问题。' },
        { type: 'WARNING', message: '下周预计有大范围降温，需检查恒温车间空调系统稳定性。' }
      ],
      suggestions: [
        '总结本周HMC-630总装高峰期的经验，优化下周的排产计划。',
        '针对下周降温，提前进行车间环境温湿度巡检。'
      ]
    },
    {
      id: 'comp-m-1',
      subject: 'COMPREHENSIVE',
      period: 'MONTHLY',
      summary: '本月关键经营指标稳步提升，产品生产和交付情况符合预期。紧急任务“TC-200样机试制”已按期完成关键节点。本月解决了一项重大质量问题（主轴箱温升超标），资源配套方面，关键轴承的到货周期仍有波动，需加强协调。',
      metrics: [
        { label: '月度达成率', value: '94.2%', trend: 'UP', description: '较上月提升1.8%' },
        { label: '订单交付率', value: '96.5%', trend: 'UP', description: '交付能力增强' },
        { label: '质量损失率', value: '1.2%', trend: 'DOWN', description: '下降0.3%' },
        { label: '库存周转率', value: '4.2', trend: 'UP', description: '物料流转加速' }
      ],
      alerts: [
        { type: 'WARNING', message: '核心机型 TC-200 供应链存在潜在风险，关键轴承到货可能延迟。' },
        { type: 'INFO', message: '数字化工厂二期扩建计划已获批，预计下季度启动。' }
      ],
      suggestions: [
        '建立关键零部件的安全库存预警机制，增强供应链韧性。',
        '推广总装A线的精益生产经验至全线，实现均衡化生产。',
        '深化数字化系统应用，提升跨部门协同效率。'
      ]
    },
    {
      id: 'comp-q-1',
      subject: 'COMPREHENSIVE',
      period: 'QUARTERLY',
      summary: '本季度关键经营指标表现优异，产品生产和交付总量较去年同期增长15%。重点任务“数字化工厂一期上线”圆满完成。重大质量问题解决率达100%。资源配套方面，通过引入第二供应商，有效缓解了铸件供应瓶颈。',
      metrics: [
        { label: '季度营收达成', value: '105%', trend: 'UP', description: '超额完成季度目标' },
        { label: '季度产出总量', value: '156台', trend: 'UP', description: '同比增长15%' },
        { label: '客户满意度', value: '98.2', trend: 'UP', description: '服务质量提升' },
        { label: '全员劳动生产率', value: '112%', trend: 'UP', description: '效率持续优化' }
      ],
      alerts: [
        { type: 'INFO', message: '数字化工厂一期系统运行稳定，数据准确率达99.5%。' },
        { type: 'WARNING', message: '下季度原材料价格预计有小幅上涨，需提前锁定采购价格。' }
      ],
      suggestions: [
        '启动数字化工厂二期规划，重点关注智能物流与仓储。',
        '加强与核心供应商的战略合作，建立更紧密的利益共同体。',
        '优化人才梯队建设，针对关键技术岗位开展专项培训。'
      ]
    },
    {
      id: 'comp-y-1',
      subject: 'COMPREHENSIVE',
      period: 'YEARLY',
      summary: '本年度关键经营指标全面达标，产品生产和交付规模创历史新高。紧急和重点任务完成率100%。重大质量问题得到系统性解决，质量管理体系进一步完善。资源配套方面，实现了关键零部件的自主可控，抗风险能力显著增强。',
      metrics: [
        { label: '年度营收增长', value: '22%', trend: 'UP', description: '创历史新高' },
        { label: '年度交付总量', value: '620台', trend: 'UP', description: '产能实现跨越' },
        { label: '研发投入占比', value: '8.5%', trend: 'UP', description: '创新动力充足' },
        { label: '品牌影响力指数', value: '92.5', trend: 'UP', description: '市场认可度提升' }
      ],
      alerts: [
        { type: 'INFO', message: '本年度荣获“省级智能制造示范企业”称号。' },
        { type: 'INFO', message: '成功开拓海外市场，首批机型已顺利交付欧洲客户。' }
      ],
      suggestions: [
        '深化全球化战略布局，建立海外服务与备件中心。',
        '加大人工智能在生产调度与质量检测中的应用研究。',
        '持续推进绿色制造，降低单位产值能耗，实现可持续发展。'
      ]
    },
    {
      id: 'plan-m-1',
      subject: 'PLANNING',
      period: 'MONTHLY',
      summary: '本月计划执行整体平稳，但BOM准备和工艺编制在部分新机型上存在滞后，需重点关注。',
      metrics: [
        { label: 'BOM准备完成率', value: '90%', trend: 'UP', description: '较上月提升5%' },
        { label: '计划执行率', value: '84%', trend: 'STABLE' },
        { label: '工艺编制及时率', value: '85%', trend: 'DOWN' }
      ],
      alerts: [
        { type: 'WARNING', message: 'TC-200 数控车床BOM尚未完成，将影响下周的采购计划。' },
        { type: 'INFO', message: 'HMC-630 计划分解已完成，进入编制阶段。' }
      ],
      suggestions: [
        '加速TC-200机型的BOM审核流程，确保物料采购不脱节。',
        '优化工艺编制模板，减少重复性工作，提升编制效率。'
      ]
    },
    {
      id: 'prod-m-1',
      subject: 'PRODUCTION',
      period: 'MONTHLY',
      summary: '本月生产效率稳步提升，但部分关键工序存在瓶颈，导致整体交付周期略有延长。',
      metrics: [
        { label: '生产达成率', value: '94.5%', trend: 'UP', description: '较上月提升2.1%' },
        { label: '平均交付周期', value: '18.5天', trend: 'DOWN', description: '较目标缩短1.2天' },
        { label: '产能利用率', value: '88.2%', trend: 'STABLE' }
      ],
      alerts: [
        { type: 'WARNING', message: '总装车间A线体在过去一周内出现3次非计划停机，累计时长4.5小时。' },
        { type: 'INFO', message: '新导入的MES系统已覆盖80%的生产线，数据采集频率提升至秒级。' }
      ],
      suggestions: [
        '优化总装A线的预防性维护计划，增加关键易损件的备库。',
        '针对瓶颈工序“精密研磨”引入自动化检测设备，减少人工复检时间。'
      ]
    },
    {
      id: 'qual-m-1',
      subject: 'QUALITY',
      period: 'MONTHLY',
      summary: '质量表现整体稳定，但外购件合格率波动较大，需加强供应商质量管控。',
      metrics: [
        { label: '一次检验合格率', value: '98.2%', trend: 'UP', description: '连续三月保持增长' },
        { label: '外部投诉率', value: '0.05%', trend: 'DOWN' },
        { label: '质量损失成本', value: '¥12.5万', trend: 'DOWN' }
      ],
      alerts: [
        { type: 'CRITICAL', message: '供应商“大连机床附件”连续两批次铸件出现砂眼缺陷，合格率仅为78%。' },
        { type: 'WARNING', message: '返修区积压待处理品数量超过警戒线，建议增加临时技术支持。' }
      ],
      suggestions: [
        '启动对“大连机床附件”的质量专项审核，必要时启动备选供应商。',
        '在关键工序前置自检环节，降低后道工序的批量性缺陷风险。'
      ]
    },
    {
      id: 'pers-m-1',
      subject: 'PERSONNEL',
      period: 'MONTHLY',
      summary: '人员效能维持高位，但高强度加班导致部分核心技工出现疲劳迹象，需关注流失风险。',
      metrics: [
        { label: '全员劳动生产率', value: '¥2.4万/人', trend: 'UP' },
        { label: '平均加班时长', value: '42小时/月', trend: 'UP', description: '已接近预警值' },
        { label: '技能矩阵覆盖率', value: '75%', trend: 'STABLE' }
      ],
      alerts: [
        { type: 'WARNING', message: '精加工班组连续两周平均工时超过10小时，存在安全生产隐患。' },
        { type: 'INFO', message: '本月完成3场多能工培训，新增5名具备三轴加工中心操作能力的员工。' }
      ],
      suggestions: [
        '调整排班计划，引入弹性工时制度以缓解核心技工的压力。',
        '建立技能津贴激励机制，加速“多能工”培养计划的落地。'
      ]
    },
    {
      id: 'equip-m-1',
      subject: 'EQUIPMENT',
      period: 'MONTHLY',
      summary: '设备运行状况良好，OEE指标达到年度目标，但老旧设备故障频率有所抬头。',
      metrics: [
        { label: '综合设备效率(OEE)', value: '82.5%', trend: 'UP' },
        { label: '设备完好率', value: '98.5%', trend: 'STABLE' },
        { label: '平均故障间隔(MTBF)', value: '450h', trend: 'DOWN' }
      ],
      alerts: [
        { type: 'WARNING', message: '2号加工中心主轴振动值异常，预计剩余寿命不足200小时。' },
        { type: 'INFO', message: '预测性维护系统成功预警1次液压泵失效，避免了约8小时的停机损失。' }
      ],
      suggestions: [
        '利用周末停机窗口，对2号加工中心主轴进行预防性更换。',
        '扩大物联网传感器覆盖范围，重点监控服役超过5年的老旧设备。'
      ]
    },
    {
      id: 'mat-m-1',
      subject: 'MATERIAL',
      period: 'MONTHLY',
      summary: '库存周转率提升明显，但由于物流波动，部分关键原材料的安全库存水平偏低。',
      metrics: [
        { label: '库存周转率', value: '4.2次/年', trend: 'UP' },
        { label: '物料齐套率', value: '94.8%', trend: 'STABLE' },
        { label: '呆滞物料占比', value: '3.5%', trend: 'DOWN' }
      ],
      alerts: [
        { type: 'CRITICAL', message: '原材料“40Cr圆钢”库存仅够维持3天生产，后续到货预计延迟2天。' },
        { type: 'WARNING', message: '精密轴承库存出现结构性短缺，部分型号溢出，部分型号告急。' }
      ],
      suggestions: [
        '紧急协调物流渠道，对“40Cr圆钢”进行空运补货。',
        '优化库存控制模型，引入动态安全库存算法以应对市场波动。'
      ]
    },
    {
      id: 'proc-m-1',
      subject: 'PROCUREMENT',
      period: 'MONTHLY',
      summary: '采购成本控制在预算范围内，但供应商交付准时率出现下滑，影响了生产计划的稳定性。',
      metrics: [
        { label: '采购成本偏差', value: '-4.2%', trend: 'DOWN', description: '低于预算目标' },
        { label: '到货准时率', value: '92.5%', trend: 'DOWN' },
        { label: '核心供应商占比', value: '65%', trend: 'UP' }
      ],
      alerts: [
        { type: 'WARNING', message: '受原材料涨价影响，预计下季度电子元器件采购成本将上升5%-8%。' },
        { type: 'INFO', message: '成功与3家战略供应商签署年度框架协议，锁定了关键零部件的供应优先级。' }
      ],
      suggestions: [
        '针对潜在涨价物料，提前进行战略性备货。',
        '建立供应商分级预警机制，对交付表现持续下滑的供应商进行约谈。'
      ]
    },
    // Quarterly Insights
    {
      id: 'prod-q-1',
      subject: 'PRODUCTION',
      period: 'QUARTERLY',
      summary: '本季度生产总量同比增长15%，数字化转型初见成效，但跨部门协同效率仍有提升空间。',
      metrics: [
        { label: '季度产值达成率', value: '102%', trend: 'UP' },
        { label: '平均制造提前期', value: '22天', trend: 'DOWN' },
        { label: '一次交验合格率', value: '97.8%', trend: 'UP' }
      ],
      alerts: [
        { type: 'INFO', message: '二季度新增3条自动化产线，预计将提升总产能约20%。' }
      ],
      suggestions: [
        '加强生产计划与采购计划的实时联动，减少物料等待时间。'
      ]
    },
    {
      id: 'qual-q-1',
      subject: 'QUALITY',
      period: 'QUARTERLY',
      summary: '季度质量体系运行平稳，重大质量事故为零，过程能力指数（CPK）持续优化。',
      metrics: [
        { label: '过程能力指数(CPK)', value: '1.45', trend: 'UP' },
        { label: '百万分缺陷数(PPM)', value: '450', trend: 'DOWN' }
      ],
      alerts: [
        { type: 'WARNING', message: '部分精密零件的尺寸公差出现漂移趋势，需关注刀具磨损补偿。' }
      ],
      suggestions: [
        '引入在线闭环补偿系统，实现加工过程的实时质量修正。'
      ]
    },
    {
      id: 'pers-q-1',
      subject: 'PERSONNEL',
      period: 'QUARTERLY',
      summary: '人才梯队建设取得进展，关键岗位储备率提升，员工满意度调查结果优于去年同期。',
      metrics: [
        { label: '关键岗位储备率', value: '85%', trend: 'UP' },
        { label: '员工流失率', value: '2.1%', trend: 'DOWN' }
      ],
      alerts: [
        { type: 'INFO', message: '季度内完成全员安全生产培训，考核通过率100%。' }
      ],
      suggestions: [
        '启动“领军人才”选拔计划，为下半年的新项目储备技术骨干。'
      ]
    },
    {
      id: 'equip-q-1',
      subject: 'EQUIPMENT',
      period: 'QUARTERLY',
      summary: '设备资产利用率达到历史高位，数字化监控覆盖率实现100%，维修响应时间缩短30%。',
      metrics: [
        { label: '设备资产利用率', value: '85.5%', trend: 'UP' },
        { label: '平均维修时间(MTTR)', value: '2.4h', trend: 'DOWN' }
      ],
      alerts: [
        { type: 'WARNING', message: '夏季高温即将来临，需重点检查各电控柜的散热系统。' }
      ],
      suggestions: [
        '开展“夏季设备保卫战”专项巡检，确保极端天气下的运行稳定。'
      ]
    },
    {
      id: 'mat-q-1',
      subject: 'MATERIAL',
      period: 'QUARTERLY',
      summary: '供应链韧性增强，核心物料实现双来源供应，库存结构进一步优化。',
      metrics: [
        { label: '供应链韧性指数', value: '8.2', trend: 'UP' },
        { label: '呆滞库存清理率', value: '45%', trend: 'UP' }
      ],
      alerts: [
        { type: 'INFO', message: '新建立的VMI仓库已正式投入使用，降低了约15%的自有库存压力。' }
      ],
      suggestions: [
        '推广VMI模式至更多非核心标准件，进一步释放流动资金。'
      ]
    },
    {
      id: 'proc-q-1',
      subject: 'PROCUREMENT',
      period: 'QUARTERLY',
      summary: '战略采购占比提升，通过集中采购实现成本节约约350万元。',
      metrics: [
        { label: '战略采购占比', value: '72%', trend: 'UP' },
        { label: '采购节约率', value: '5.8%', trend: 'UP' }
      ],
      alerts: [
        { type: 'WARNING', message: '国际物流费用波动剧烈，需关注下季度进口零部件的到货成本。' }
      ],
      suggestions: [
        '探索更多国产替代方案，降低对单一进口渠道的依赖。'
      ]
    },
    // Yearly Insights
    {
      id: 'prod-y-1',
      subject: 'PRODUCTION',
      period: 'YEARLY',
      summary: '年度生产目标圆满达成，智能制造转型取得阶段性胜利，整体竞争力显著增强。',
      metrics: [
        { label: '年度目标达成率', value: '105%', trend: 'UP' },
        { label: '人均产值提升', value: '18%', trend: 'UP' }
      ],
      alerts: [
        { type: 'INFO', message: '荣获“省级智能制造示范工厂”称号。' }
      ],
      suggestions: [
        '制定下一年度“黑灯工厂”建设路线图，进一步提升自动化水平。'
      ]
    },
    {
      id: 'qual-y-1',
      subject: 'QUALITY',
      period: 'YEARLY',
      summary: '年度质量口碑良好，客户满意度达到98分，成功通过多项国际质量体系认证。',
      metrics: [
        { label: '客户满意度', value: '98.2', trend: 'UP' },
        { label: '外部审计合规率', value: '100%', trend: 'STABLE' }
      ],
      alerts: [
        { type: 'INFO', message: '顺利通过AS9100航空航天质量体系换证审核。' }
      ],
      suggestions: [
        '深化全员质量文化建设，将“零缺陷”理念融入每一个生产环节。'
      ]
    },
    {
      id: 'pers-y-1',
      subject: 'PERSONNEL',
      period: 'YEARLY',
      summary: '组织架构优化完成，人才密度显著提升，企业文化凝聚力增强。',
      metrics: [
        { label: '高技能人才占比', value: '35%', trend: 'UP' },
        { label: '员工敬业度评分', value: '4.6/5', trend: 'UP' }
      ],
      alerts: [
        { type: 'INFO', message: '年度员工培训投入同比增长25%。' }
      ],
      suggestions: [
        '建立更具竞争力的薪酬福利体系，吸引全球顶尖制造人才。'
      ]
    },
    {
      id: 'equip-y-1',
      subject: 'EQUIPMENT',
      period: 'YEARLY',
      summary: '设备全生命周期管理体系成熟，资产回报率(ROA)提升12%。',
      metrics: [
        { label: '资产回报率(ROA)', value: '18.5%', trend: 'UP' },
        { label: '设备数字化率', value: '100%', trend: 'STABLE' }
      ],
      alerts: [
        { type: 'INFO', message: '成功实施15项设备节能改造，年节约电费约120万元。' }
      ],
      suggestions: [
        '探索“设备即服务”(EaaS)模式，降低未来扩产的资金门槛。'
      ]
    },
    {
      id: 'mat-y-1',
      subject: 'MATERIAL',
      period: 'YEARLY',
      summary: '绿色供应链建设起步，环保材料占比提升，废旧物料回收利用率达90%。',
      metrics: [
        { label: '环保材料占比', value: '15%', trend: 'UP' },
        { label: '物料回收利用率', value: '92%', trend: 'UP' }
      ],
      alerts: [
        { type: 'INFO', message: '入选“国家级绿色供应链管理企业”名单。' }
      ],
      suggestions: [
        '与供应商共同开发闭环回收系统，实现资源的最大化循环利用。'
      ]
    },
    {
      id: 'proc-y-1',
      subject: 'PROCUREMENT',
      period: 'YEARLY',
      summary: '全球采购网络初步形成，供应链抗风险能力显著提升。',
      metrics: [
        { label: '全球供应覆盖率', value: '45%', trend: 'UP' },
        { label: '采购合规性评分', value: '98.5', trend: 'UP' }
      ],
      alerts: [
        { type: 'INFO', message: '成功应对两次全球性供应链中断危机，确保了生产不间断。' }
      ],
      suggestions: [
        '深化与核心供应商的资本合作，构建更紧密的命运共同体。'
      ]
    }
  ]
};
