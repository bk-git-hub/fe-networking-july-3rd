import type { LastRequest, StatusTone } from '../types/request'

type StatusPanelProps = {
  lastRequest: LastRequest
  statusTone: StatusTone
}

export function StatusPanel({ lastRequest, statusTone }: StatusPanelProps) {
  return (
    <section className="rail-panel" aria-labelledby="api-status-title">
      <div className="rail-heading">
        <div>
          <p className="section-label">Network tab</p>
          <h2 id="api-status-title">API Status</h2>
        </div>
        <span className={`status-dot ${statusTone}`} aria-hidden="true" />
      </div>

      <dl className="request-list">
        <div>
          <dt>Method</dt>
          <dd>{lastRequest.method}</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>{lastRequest.status}</dd>
        </div>
        <div>
          <dt>URL</dt>
          <dd className="url-cell">{lastRequest.url}</dd>
        </div>
      </dl>
    </section>
  )
}
