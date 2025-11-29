# GPU 调度前端对接说明（给后端同学）

本文仅说明 **GPU 调度页面（`src/views/gpu/index.vue`）** 所需的后端接口约定，方便后端快速对接。

前端已完成：
- 页面布局与交互（余额、GPU 概览、拓扑图、显存监控、资源分配、任务列表）
- 所有请求统一通过 `request` 封装（`src/utils/http.ts`），自动携带 Token、租户信息
- GPU 相关接口已集中在：`src/apis/gpu/index.ts`

后端只需实现/对齐本文定义的接口，即可完成对接。

---

## 认证与通用约定

- 所有接口都通过 `request` 发送，已自动带上：
  - `Authorization: Bearer <token>`（来自登录接口返回的 token）
  - 如开启多租户，还会带上 `X-Tenant-Id`
- 通用返回结构（定义在 `src/types/api.d.ts`）：

```ts
interface ApiRes<T> {
  code: number
  data: T
  msg: string
  success: boolean
  timestamp: string
}
```

- 前端只看 `success`、`data`、`msg`：
  - `success === true`：认为成功，使用 `data`
  - `success === false`：弹出 `msg` 错误提示

---

## 一、用量信息 & GPU 概览

前端代码：`getGpuOverview`（`src/apis/gpu/index.ts`）

```ts
export interface GpuBalanceInfo {
  recharge: number      // 充值余额（单位：元）
  monthlyUsage: number  // 本月消费（单位：元）
}

export interface GpuStats {
  total: number         // 总 GPU 数量
  used: number          // 使用中的 GPU 数
  idle: number          // 空闲 GPU 数
  usageRate: number     // 使用率（0-100）
}

export interface GpuOverviewResp {
  balance: GpuBalanceInfo
  stats: GpuStats
}

// GET /gpu/dashboard/overview
export const getGpuOverview = () => {
  return request.get<GpuOverviewResp>('/gpu/dashboard/overview')
}
```

### 后端期望

- URL：`GET /gpu/dashboard/overview`
- 认证：需要 Token（只返回当前登录用户的数据）
- 响应示例：

```json
{
  "code": 200,
  "success": true,
  "msg": "OK",
  "timestamp": "2025-11-29T08:00:00Z",
  "data": {
    "balance": {
      "recharge": 123.45,
      "monthlyUsage": 67.89
    },
    "stats": {
      "total": 8,
      "used": 5,
      "idle": 3,
      "usageRate": 62.5
    }
  }
}
```

---

## 二、算力拓扑图（服务器 & GPU 状态）

前端代码：`getGpuServers`

```ts
export interface GpuServerNode {
  id: string
  name: string
  gpus: Array<0 | 1> // 0=空闲，1=训练中
}

// GET /gpu/dashboard/servers
export const getGpuServers = () => {
  return request.get<GpuServerNode[]>('/gpu/dashboard/servers')
}
```

### 后端期望

- URL：`GET /gpu/dashboard/servers`
- 认证：需要 Token
- 说明：
  - 返回当前用户可见的服务器列表
  - 每个服务器的 `gpus` 数组长度 = GPU 数量，元素值 0/1 表示该卡是否正在被训练任务占用
- 响应示例：

```json
[
  { "id": "s1", "name": "服务器1", "gpus": [0, 0, 1, 1] },
  { "id": "s2", "name": "服务器2", "gpus": [1, 1, 1, 1] },
  { "id": "s3", "name": "服务器3", "gpus": [0, 0, 0, 0] }
]
```

---

## 三、资源分配饼图（任务 GPU 分配）

前端代码：`getGpuAllocation`

```ts
export interface GpuAllocationItem {
  name: string     // 任务/业务名称
  gpuCount: number // 占用 GPU 数
}

// GET /gpu/dashboard/allocation
export const getGpuAllocation = () => {
  return request.get<GpuAllocationItem[]>('/gpu/dashboard/allocation')
}
```

### 后端期望

- URL：`GET /gpu/dashboard/allocation`
- 认证：需要 Token
- 说明：
  - 统计当前用户的各个训练任务/业务，对应占用的 GPU 数量，用于饼图展示
- 响应示例：

```json
[
  { "name": "LLaMA-3 训练任务", "gpuCount": 4 },
  { "name": "空闲", "gpuCount": 2 }
]
```

---

## 四、显存监控（历史 + 实时）

### 1. 历史数据（页面初始化）

```ts
export interface GpuVramPoint {
  timestamp: string      // 时间字符串，例如 '12:30:00' 或 ISO 时间
  usagePercent: number   // 显存占用率（0-100）
}

// GET /gpu/dashboard/vram/history?limit=30
export const getGpuVramHistory = (params: { limit: number }) => {
  return request.get<GpuVramPoint[]>('/gpu/dashboard/vram/history', { params })
}
```

#### 后端期望

- URL：`GET /gpu/dashboard/vram/history`
- Query 参数：
  - `limit`：返回最近多少个点（前端默认 30）
- 响应示例：

```json
[
  { "timestamp": "12:30:00", "usagePercent": 40 },
  { "timestamp": "12:30:05", "usagePercent": 45 }
]
```

### 2. 实时快照（轮询）

```ts
// GET /gpu/dashboard/vram/snapshot
export const getGpuVramSnapshot = () => {
  return request.get<GpuVramPoint>('/gpu/dashboard/vram/snapshot')
}
```

#### 后端期望

- URL：`GET /gpu/dashboard/vram/snapshot`
- 前端每 5 秒调用一次，追加一个最新点
- 响应示例同单个 `GpuVramPoint`：

```json
{
  "timestamp": "12:31:10",
  "usagePercent": 52
}
```

---

## 五、训练任务列表（分页）

前端代码：`getGpuTasks`

```ts
export interface GpuTasksParams {
  page: number  // 当前页（从 1 开始）
  size: number  // 每页大小
}

export interface GpuTaskItem {
  id: string
  name: string
  model: string
  gpuCount: number
  status: 'pending' | 'running' | 'completed' | 'failed'
  startTime: string
  progress: number      // 0-100
}

export interface GpuTasksResp {
  list: GpuTaskItem[]
  total: number
}

// GET /gpu/tasks?page=1&size=10
export const getGpuTasks = (params: GpuTasksParams) => {
  return request.get<GpuTasksResp>('/gpu/tasks', { params })
}
```

### 后端期望

- URL：`GET /gpu/tasks`
- Query 参数：`page`、`size`
- 认证：需要 Token，只返回当前用户的任务列表
- 响应示例：

```json
{
  "code": 200,
  "success": true,
  "msg": "OK",
  "timestamp": "2025-11-29T08:10:00Z",
  "data": {
    "list": [
      {
        "id": "1",
        "name": "LLaMA-3 Training",
        "model": "llama-3",
        "gpuCount": 4,
        "status": "running",
        "startTime": "2025-11-29 15:00:00",
        "progress": 65
      }
    ],
    "total": 1
  }
}
```

---

## 六、训练任务操作（创建 / 启动 / 停止 / 删除）

### 1. 创建任务

```ts
export interface CreateGpuTaskReq {
  name: string
  model: string
  gpuCount: number
}

// POST /gpu/tasks
export const createGpuTask = (data: CreateGpuTaskReq) => {
  return request.post('/gpu/tasks', data)
}
```

#### 后端期望

- URL：`POST /gpu/tasks`
- Body（JSON）：`CreateGpuTaskReq`
- 行为：为当前用户创建一个新训练任务，初始状态通常为 `pending`

### 2. 启动任务

```ts
// POST /gpu/tasks/{id}/start
export const startGpuTask = (taskId: string) => {
  return request.post(`/gpu/tasks/${taskId}/start`)
}
```

### 3. 停止任务

```ts
// POST /gpu/tasks/{id}/stop
export const stopGpuTask = (taskId: string) => {
  return request.post(`/gpu/tasks/${taskId}/stop`)
}
```

### 4. 删除任务

```ts
// DELETE /gpu/tasks/{id}
export const deleteGpuTask = (taskId: string) => {
  return request.del(`/gpu/tasks/${taskId}`)
}
```

#### 后端期望

- 上述 3 个接口均需要 Token，必须校验任务归属（只能操作自己的任务）。
- 建议在非法操作（例如删除运行中的任务）时，通过 `success=false` + 合理 `msg` 提示。

---

## 七、充值相关（可选草案）

如果你准备接入充值功能，可参考 `src/apis/billing/index.ts`：

```ts
export interface CreateRechargeOrderReq {
  amount: number   // 单位：分
}

export interface CreateRechargeOrderResp {
  orderId: string
  payUrl?: string
}

// POST /billing/recharge/orders
export const createRechargeOrder = (data: CreateRechargeOrderReq) => {
  return request.post<CreateRechargeOrderResp>('/billing/recharge/orders', data)
}

// GET /billing/balance
export const getBalance = () => {
  return request.get<{ balance: number; monthlyUsage: number }>('/billing/balance')
}
```

可以在单独的“充值页面”中使用上述接口，GPU 页只负责展示余额和跳转入口。

---

## 八、调试建议

1. **本地联调**：
   - 确保 `.env.development` 中 `VITE_API_PREFIX` 或 `VITE_API_BASE_URL` 指向后端网关地址。
   - 也可使用 Vite 代理，在 `vite.config.ts` 的 `server.proxy` 中为 `/gpu` 和 `/billing` 配置目标地址。

2. **查看实际请求**：
   - 浏览器 DevTools → Network，过滤 `/gpu/`、`/billing/`，确认请求路径、参数和响应结构。

3. **错误处理**：
   - 任意接口返回 `success=false` 或 HTTP 4xx/5xx 时，前端会弹出错误提示（message 或 notification），方便排查。

如果后端实际路径 / 字段与本文不一致，只需在 `src/apis/gpu/index.ts`（以及 `src/apis/billing/index.ts`）中调整对应 URL / 类型即可，前端页面逻辑不需要再改。*** End Patch`"}]}}

