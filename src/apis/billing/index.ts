import request from '@/utils/http'

export interface CreateRechargeOrderReq {
  /** 充值金额，单位：分（示例：10000 = 100.00 元） */
  amount: number
}

export interface CreateRechargeOrderResp {
  orderId: string
  /** H5 支付链接，可在新窗口打开 */
  payUrl?: string
}

export const createRechargeOrder = (data: CreateRechargeOrderReq) => {
  return request.post<CreateRechargeOrderResp>('/billing/recharge/orders', data)
}

export const getBalance = () => {
  return request.get<{ balance: number; monthlyUsage: number }>('/billing/balance')
}


