import { GoogleGenAI, Type } from "@google/genai";
import { DashboardStats, AIInsight } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const generateAIInsight = async (
  stats: DashboardStats, 
  subject: AIInsight['subject'], 
  period: AIInsight['period']
): Promise<AIInsight> => {
  const model = "gemini-3-flash-preview";
  
  const prompt = `
    作为一名资深制造行业分析专家，请根据以下机床制造企业的实时生产经营数据，针对“${subject}”主题生成一份“${period}”维度的深度洞察报告。
    
    数据概览:
    - 总订单: ${stats.totalOrders}
    - 已完成: ${stats.completedOrders}
    - 延期订单: ${stats.delayedOrders}
    - 平均进度: ${stats.averageProgress}%
    - 准时交付率: ${stats.onTimeDeliveryRate}%
    - 产能利用率: ${stats.capacityUtilization}%
    
    质量数据:
    - 合格率: ${stats.qualityStats.passRate}%
    - 不合格数: ${stats.qualityStats.unqualifiedCount}
    - 返修数: ${stats.qualityStats.reworkCount}
    
    请生成符合以下结构的JSON数据：
    {
      "summary": "一句话核心摘要",
      "metrics": [
        { "label": "指标名称", "value": "指标值", "trend": "UP|DOWN|STABLE", "description": "简短描述" }
      ],
      "alerts": [
        { "type": "WARNING|CRITICAL|INFO", "message": "预警信息" }
      ],
      "suggestions": ["建议1", "建议2"]
    }
    
    要求：
    1. 洞察要深刻，体现行业专业性。
    2. 指标要具体，能够反映数据背后的趋势。
    3. 建议要具有可操作性。
    4. 语言专业、严谨。
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            metrics: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  label: { type: Type.STRING },
                  value: { type: Type.STRING },
                  trend: { type: Type.STRING, enum: ["UP", "DOWN", "STABLE"] },
                  description: { type: Type.STRING }
                },
                required: ["label", "value", "trend"]
              }
            },
            alerts: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  type: { type: Type.STRING, enum: ["WARNING", "CRITICAL", "INFO"] },
                  message: { type: Type.STRING }
                },
                required: ["type", "message"]
              }
            },
            suggestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["summary", "metrics", "alerts", "suggestions"]
        }
      }
    });

    const result = JSON.parse(response.text || '{}');
    return {
      id: `ai-${Date.now()}`,
      subject,
      period,
      ...result
    };
  } catch (error) {
    console.error("Error generating AI insight:", error);
    throw error;
  }
};

export const generateComprehensiveAIInsight = async (
  stats: DashboardStats,
  period: AIInsight['period']
): Promise<AIInsight> => {
  const model = "gemini-3-flash-preview";
  
  const periodFocus = period === 'DAILY' 
    ? '重点报告当日生产情况，包括生产相关进展、生产相关异常发生和处理情况、预警和建议等内容。' 
    : period === 'WEEKLY' 
    ? '重点报告本周任务和完成情况、生产相关进展、生产相关异常发生和处理情况、预警和建议等内容。' 
    : period === 'MONTHLY'
    ? '重点报告本月关键经营指标、产品生产和交付情况、紧急和重点任务完成情况、重大质量问题和解决情况、资源配套主要问题和协调情况、进一步的预警和建议等内容。'
    : period === 'QUARTERLY'
    ? '重点报告本季度关键经营指标、产品生产和交付情况、紧急和重点任务完成情况、重大质量问题和解决情况、资源配套主要问题和协调情况、进一步的预警和建议等内容。'
    : '重点报告本年度关键经营指标、产品生产和交付情况、紧急和重点任务完成情况、重大质量问题和解决情况、资源配套主要问题和协调情况、进一步的预警和建议等内容。';

  const prompt = `
    作为一名资深制造行业分析专家，请根据以下机床制造企业的全量实时生产经营数据，生成一份“${period}”维度的全景生产洞察报告。
    
    分析重点: ${periodFocus}
    
    数据概览:
    - 总订单: ${stats.totalOrders}
    - 已完成: ${stats.completedOrders}
    - 延期订单: ${stats.delayedOrders}
    - 平均进度: ${stats.averageProgress}%
    - 准时交付率: ${stats.onTimeDeliveryRate}%
    - 产能利用率: ${stats.capacityUtilization}%
    
    质量数据:
    - 合格率: ${stats.qualityStats.passRate}%
    - 不合格数: ${stats.qualityStats.unqualifiedCount}
    - 返修数: ${stats.qualityStats.reworkCount}
    
    人员绩效:
    - 总投入工时: ${stats.personnelStats?.totalHours}h
    - 平均效率: ${stats.personnelStats?.avgEfficiency}%
    
    设备状态:
    - OEE: ${stats.equipmentStats?.overallOEE}%
    - 运行率: ${stats.equipmentStats?.operationRate}%
    
    物料与采购:
    - 库存周转率: ${stats.materialStats?.inventoryTurnover}
    - 缺料预警: ${stats.materialStats?.stockoutAlerts}
    - 采购准时率: ${stats.procurementStats?.onTimeArrivalRate}%
    
    请生成符合以下结构的JSON数据，将各个主题（计划、生产、采购、质量、物料、设备、人员）的分析整合在一起：
    {
      "summary": "全景核心摘要，涵盖整体经营状况",
      "metrics": [
        { "label": "指标名称", "value": "指标值", "trend": "UP|DOWN|STABLE", "description": "简短描述" }
      ],
      "alerts": [
        { "type": "WARNING|CRITICAL|INFO", "message": "预警信息" }
      ],
      "suggestions": ["建议1", "建议2", "建议3", "建议4", "建议5"]
    }
    
    要求：
    1. 洞察要全面，体现全链路协同。
    2. 指标要涵盖各个关键主题。
    3. 建议要具有战略高度和可操作性。
    4. 语言专业、严谨。
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            metrics: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  label: { type: Type.STRING },
                  value: { type: Type.STRING },
                  trend: { type: Type.STRING, enum: ["UP", "DOWN", "STABLE"] },
                  description: { type: Type.STRING }
                },
                required: ["label", "value", "trend"]
              }
            },
            alerts: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  type: { type: Type.STRING, enum: ["WARNING", "CRITICAL", "INFO"] },
                  message: { type: Type.STRING }
                },
                required: ["type", "message"]
              }
            },
            suggestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["summary", "metrics", "alerts", "suggestions"]
        }
      }
    });

    const result = JSON.parse(response.text || '{}');
    return {
      id: `ai-comp-${Date.now()}`,
      subject: 'COMPREHENSIVE' as any,
      period,
      ...result
    };
  } catch (error) {
    console.error("Error generating comprehensive AI insight:", error);
    throw error;
  }
};
