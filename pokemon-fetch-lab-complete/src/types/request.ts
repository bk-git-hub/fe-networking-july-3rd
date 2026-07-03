export type LastRequestStatus = 'Ready' | 'Pending' | '200 OK' | 'Failed'

export type LastRequest = {
  method: 'GET'
  url: string
  status: LastRequestStatus
}

export type StatusTone = 'ready' | 'pending' | 'success' | 'failed'
