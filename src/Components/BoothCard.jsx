

function BoothCard({ booth, liveQueue, liveVoted, lastUpdated }) {
    const pct = Math.round((liveVoted / booth.totalVoters) * 100)
    const wait = Math.round(liveQueue <= 5 ? Math.max(2, liveQueue * 1.5) : liveQueue <= 15 ? liveQueue * 1.2 : liveQueue * 1.1)

    const fillClass = pct < 40 ? 'fill-low' : pct < 70 ? 'fill-mid' : 'fill-high'

    const statusClass = {
        active: 'status-active',
        busy: 'status-busy',
        closed: 'status-closed',
    }[booth.status] || 'status-active'

    const statusText = { active: 'Active', busy: 'Busy', closed: 'Closed' }[booth.status]

    const bestTime =
        liveQueue <= 5 ? 'Right now!' : wait > 30 ? 'After 2 PM' : 'Early morning'

    const timeStr = lastUpdated.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
    })

    const dotCount = Math.min(60, Math.round(booth.totalVoters / 20))
    const votedDots = Math.round((liveVoted / booth.totalVoters) * dotCount)

    return (
        <div className="result-card">

            {/* Header */}
            <div className="card-header">
                <div>
                    <div className="booth-name">{booth.name}</div>
                    <div className="booth-address">{booth.address}</div>
                </div>
                <span className={`status-badge ${statusClass}`}>{statusText}</span>
            </div>

            {/* Metric grid */}
            <div className="metrics">
                <div className="metric">
                    <div className="metric-label">In queue</div>
                    <div className="metric-value">{liveQueue}</div>
                    <div className="metric-unit">people</div>
                </div>
                <div className="metric">
                    <div className="metric-label">Wait time</div>
                    <div className="metric-value">{wait}</div>
                    <div className="metric-unit">minutes</div>
                </div>
                <div className="metric">
                    <div className="metric-label">Voted</div>
                    <div className="metric-value">{liveVoted}</div>
                    <div className="metric-unit">of {booth.totalVoters}</div>
                </div>
                <div className="metric">
                    <div className="metric-label">Turnout</div>
                    <div className="metric-value">{pct}%</div>
                    <div className="metric-unit">so far</div>
                </div>
            </div>

            {/* Progress + dot map */}
            <div className="queue-section">
                <div className="queue-label">
                    <span>
                        <span className="live-dot" />
                        Live turnout progress
                    </span>
                    <span className="pct-label">{pct}% complete</span>
                </div>
                <div className="progress-track">
                    <div className={`progress-fill ${fillClass}`} style={{ width: `${pct}%` }} />
                </div>
                <div className="queue-viz">
                    {Array.from({ length: dotCount }).map((_, i) => (
                        <div key={i} className={`person-dot ${i < votedDots ? 'voted' : ''}`} />
                    ))}
                </div>
                <div className="dot-legend">
                    <span className="legend-dot voted-dot" /> Voted
                    <span className="legend-dot registered-dot" /> Registered
                </div>
            </div>

            {/* Timings grid */}
            <div className="timings">
                <div className="timing-item">

                    <div>
                        <div className="timing-title">Booth timings</div>
                        <div className="timing-val">{booth.openTime} – {booth.closeTime}</div>
                    </div>
                </div>
                <div className="timing-item">

                    <div>
                        <div className="timing-title">Booth officer</div>
                        <div className="timing-val">{booth.officer}</div>
                    </div>
                </div>
                <div className="timing-item">

                    <div>
                        <div className="timing-title">Area</div>
                        <div className="timing-val">{booth.area}</div>
                    </div>
                </div>
                <div className="timing-item">

                    <div>
                        <div className="timing-title">Best time to visit</div>
                        <div className="timing-val">{bestTime}</div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="update-bar">
                <span><span className="live-dot" /> Simulated live data — updates every 15s</span>
                <span>Last updated {timeStr}</span>
            </div>

        </div>
    )
}

export default BoothCard