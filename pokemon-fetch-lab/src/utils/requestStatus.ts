import type { LastRequestStatus, StatusTone } from '../types/request'

export function getStatusTone(
  status: LastRequestStatus,
  loading: boolean,
  error: string,
): StatusTone {
  if (loading || status === 'Pending') {
    return 'pending'
  }

  if (error || status === 'Failed') {
    return 'failed'
  }

  if (status === '200 OK') {
    return 'success'
  }

  return 'ready'
}
