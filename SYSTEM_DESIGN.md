# 生产分析平台 (Production Analysis Platform) 系统详细设计报告

## 1. 项目概述
本项目旨在构建一个智能化的生产分析平台，为生产管理人员提供实时的生产进度监控、AI 驱动的决策建议、质量分析、计划变更管理以及设备/人员效率分析。系统采用现代化的前后端分离架构，确保高可用性、可扩展性和数据的一致性。

## 2. 系统架构设计
系统采用三层架构模式：
- **表现层 (Frontend)**: 基于 React + TypeScript + Tailwind CSS 构建的单页面应用 (SPA)。
- **业务逻辑层 (Backend)**: 基于 Node.js + Express 构建的 RESTful API 服务。
- **数据存储层 (Database)**: 使用 **MySQL 8.0** 关系型数据库存储核心业务数据。

### 2.1 技术栈
- **前端**: React 18, TypeScript, Tailwind CSS, Lucide React (图标), Recharts/D3 (图表), Framer Motion (动画)。
- **后端**: Node.js, Express, Sequelize (ORM)。
- **数据库**: MySQL 8.0。

---

## 3. 前端展现界面设计

### 3.1 整体布局 (Layout)
系统采用典型的管理后台布局：
- **侧边导航栏 (Sidebar)**: 固定在左侧，包含“管理决策”和“主题分析”两大板块。
- **顶部状态栏 (Header)**: 包含智能对话框、通知提醒和用户信息。
- **主内容区 (Main Content)**: 响应式区域，根据导航切换不同的看板页面。

### 3.2 核心功能模块设计

#### 3.2.1 智能对话框 (Intelligent Dialogue Box)
- **位置**: 顶部 Header 中心。
- **功能**: 用户输入生产相关问题，按回车键后自动跳转至外部交互页面。
- **交互逻辑**: `window.location.href = "http://210.12.53.106:116/interaction?q=" + encodeURIComponent(query)`。
- **视觉设计**: 带有 AI 闪烁图标和“AI”标识，增强智能化感知。

#### 3.2.2 计划主题看板 (Planning Dashboard)
- **指标卡片**: 展示 BOM 准备率、工艺准备率、计划下发率等。
- **计划变更联动 (Linkage)**: 
    - 顶部展示 5 种变更类型的统计卡片（BOM变更、工艺变更、计划插单、计划新增、计划变更）。
    - **点击联动**: 点击卡片可过滤下方明细列表，再次点击或点击“总变更”可重置过滤。
- **执行进度**: 使用进度条展示各产品的实时生产进度。

#### 3.2.3 质量主题看板 (Quality Dashboard)
- **可视化图表**: 使用饼图展示缺陷分布，折线图展示合格率趋势。
- **异常预警**: 实时滚动展示最近的质量问题（严重程度区分颜色）。

#### 3.2.4 数据钻取 (Drill-down)
- **机制**: 点击看板中的任何数据项，弹出全屏/半屏模态框展示明细。
- **层级**: 支持多级钻取（如：订单 -> 部件 -> 工序），顶部带有面包屑导航支持快速回退。

#### 3.2.5 AI 生产洞察 (AI Insights)
- **功能**: 提供每日、每周、每月、每季、每年等不同维度的生产经营深度分析。
- **报告重点分工**: 
    - **每日洞察**: 重点报告当日生产情况，包括生产进展、异常发生与处理、预警与建议。
    - **每周洞察**: 重点报告本周任务完成情况、生产进展、异常发生与处理、预警与建议。
    - **月度/季度/年度洞察**: 重点报告关键经营指标（营收、利润等）、产品生产与交付情况、紧急/重点任务完成情况、重大质量问题与解决情况、资源配套（供应链/人力）主要问题与协调情况、进一步的预警与建议。
- **交互**: 支持在不同时间维度间切换，卡片式展示关键指标趋势。数据在初始生成后保持静态，不再进行实时更新。

---

## 4. 后端处理逻辑设计

后端采用 RESTful 风格设计 API，所有逻辑均围绕 MySQL 数据表展开。

### 4.1 核心 API 接口列表

| 接口路径 | 方法 | 描述 | 处理逻辑摘要 |
| :--- | :--- | :--- | :--- |
| `/api/dashboard/stats` | GET | 获取全局概览指标 | 聚合 `machine_tools` 和 `orders` 表，计算平均进度和交付率。 |
| `/api/planning/stats` | GET | 获取计划主题数据 | 查询 `bom_prep`, `process_prep` 及 `plan_changes` 表。 |
| `/api/production/stats` | GET | 获取生产执行数据 | 联表查询 `workshops`, `teams` 和 `tasks` 表。 |
| `/api/quality/stats` | GET | 获取质量分析数据 | 统计 `quality_issues` 状态分布及 `pass_rate` 趋势。 |
| `/api/machine-tools` | GET | 获取机床列表 | 支持根据 `model`, `status`, `customer` 进行模糊查询和过滤。 |
| `/api/machine-tools/:id` | GET | 获取机床详细信息 | 递归查询 `assemblies_parts` 获取完整的 BOM 树。 |

### 4.2 关键业务逻辑处理

#### 4.2.1 计划变更联动逻辑
- **前端**: 维护 `selectedChangeType` 状态。
- **后端**: API 接收 `type` 参数，SQL 语句动态拼接 `WHERE type = ?`。
- **数据一致性**: 变更记录写入 `plan_changes` 表时，需同步更新关联的 `machine_tools` 状态或 `bom_preparation` 进度。

#### 4.2.2 进度自动计算逻辑
- **逻辑**: 机床总体进度 = Σ(部件权重 * 部件进度)。
- **触发**: 当 `production_history` 中某工序标记为“已完成”时，触发存储过程或后端 Hook 重新计算父级部件及整机的进度。

---

## 5. 数据库详细设计 (MySQL)

### 5.1 核心实体表

#### 5.1.1 机床设备表 (`machine_tools`)
| 字段名 | 类型 | 描述 |
| :--- | :--- | :--- |
| id | VARCHAR(50) | 主键，设备唯一标识 |
| project_number | VARCHAR(50) | 项目编号 |
| model | VARCHAR(100) | 设备型号 |
| overall_progress | INT | 总体进度 (0-100) |
| status | ENUM | 状态 (PENDING, IN_PROGRESS, COMPLETED, DELAYED) |

#### 5.1.2 BOM 层级表 (`assemblies_parts`)
| 字段名 | 类型 | 描述 |
| :--- | :--- | :--- |
| id | VARCHAR(50) | 主键 |
| parent_id | VARCHAR(50) | 父级 ID (实现 L1-L5 树状结构) |
| machine_id | VARCHAR(50) | 外键，关联机床 |
| type | ENUM | 类型 (SUB_ASSEMBLY, PART) |

#### 5.1.3 生产记录表 (`production_history`)
| 字段名 | 类型 | 描述 |
| :--- | :--- | :--- |
| id | VARCHAR(50) | 主键 |
| machine_id | VARCHAR(50) | 外键 |
| step_name | VARCHAR(100) | 工序名称 |
| result | ENUM | 质量结果 (QUALIFIED, UNQUALIFIED, etc.) |

---

## 6. 系统集成与部署

### 6.1 数据流向
1. **用户交互**: 用户在前端点击过滤或输入搜索。
2. **请求发送**: 前端通过 `fetch` 发送带参数的 API 请求。
3. **后端处理**: Express 路由解析参数，调用 Sequelize 模型。
4. **数据库查询**: 执行 SQL 语句，从 MySQL 获取结果。
5. **结果渲染**: 前端接收 JSON 数据，通过 React 状态更新 UI，Framer Motion 提供平滑动画。

### 6.2 部署要求
- **前端编译**: `npm run build` 生成静态文件。
- **后端运行**: `node server.js` (生产环境建议使用 PM2 托管)。
- **数据库**: MySQL 8.0，需配置连接池以支持高并发查询。

## 7. 总结
本详细设计报告涵盖了生产分析平台从前端视觉交互到后端数据流转的完整设计。通过模块化的 React 组件设计和结构化的 MySQL 数据库建模，开发人员可以根据此报告快速复刻并实现同样功能的智能化生产管理系统。
