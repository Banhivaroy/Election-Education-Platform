import React, { useState } from 'react'



const candidates = [
    {
        id: 1,
        name: 'Arjun Mehta',
        hindi: 'अर्जुन मेहता',
        party: 'Bharatiya Vikas Party',
        partyShort: 'BVP',
        color: '#FF6B1A',
        bg: '#FFF5EE',
        border: 'rgba(255, 107, 26, 0.2)',
        votes: 48320,
        percent: 42,
    },
    {
        id: 2,
        name: 'Priya Sharma',
        hindi: 'प्रिया शर्मा',
        party: 'Rashtriya Jan Sangh',
        partyShort: 'RJS',
        color: '#15803d',
        bg: '#F0FFF4',
        border: 'rgba(21, 128, 61, 0.2)',
        votes: 39150,
        percent: 34,
    },
    {
        id: 3,
        name: 'Vikram Singh',
        hindi: 'विक्रम सिंह',
        party: 'Democratic People Front',
        partyShort: 'DPF',
        color: '#1d4ed8',
        bg: '#EEF2FF',
        border: 'rgba(29, 78, 216, 0.2)',
        votes: 27100,
        percent: 24,
    },
]

// Simulate: voter voted for candidate 1 (in real app this comes from backend)
const VOTED_FOR_ID = 1

function LandingOn() {
    const voter = JSON.parse(sessionStorage.getItem('voter') || '{}')
    const votedFor = candidates.find((c) => c.id === VOTED_FOR_ID)
    const [activeTab, setActiveTab] = useState('profile') // profile | ballot | standings

    const referenceId = `VT${voter.epic ? voter.epic.slice(-4) : '0000'}2026`
    const votedAt = new Date().toLocaleString('en-IN', {
        day: '2-digit', month: 'long', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
    })

    return (
        <div className="ldon-page">

            {/* Background */}
            <div className="ldon-bg" />

            <div className="ldon-inner">

                {/* ── Top banner ── */}
                <div className="ldon-banner">
                    <div className="ldon-banner-left">
                        <span className="ldon-emblem">🗳</span>
                        <div>
                            <div className="ldon-banner-title">Voter Dashboard</div>
                            <div className="ldon-banner-sub">मतदाता प्रोफ़ाइल · {new Date().getFullYear()} General Election</div>
                        </div>
                    </div>
                    <div className="ldon-voted-badge">
                        <span className="ldon-voted-dot" />
                        Vote Recorded
                    </div>
                </div>

                {/* ── Profile card ── */}
                <div className="ldon-profile-card">
                    <div className="ldon-avatar">
                        {voter.name ? voter.name.charAt(0).toUpperCase() : 'V'}
                    </div>
                    <div className="ldon-profile-info">
                        <div className="ldon-profile-name">{voter.name || 'Voter'}</div>
                        <div className="ldon-profile-meta">
                            <span className="ldon-meta-chip">Age {voter.age || '—'}</span>
                            <span className="ldon-meta-chip ldon-meta-chip--epic">
                                EPIC · {voter.epic ? `${voter.epic.slice(0, 3)}•••••••` : '—'}
                            </span>
                        </div>
                    </div>
                    <div className="ldon-ref-box">
                        <div className="ldon-ref-label">Reference ID</div>
                        <div className="ldon-ref-id">{referenceId}</div>
                        <div className="ldon-ref-time">{votedAt}</div>
                    </div>
                </div>

                {/* ── Tabs ── */}
                <div className="ldon-tabs">
                    {[
                        { id: 'profile', label: 'My Vote' },
                        { id: 'standings', label: 'Live Standings' },
                        { id: 'info', label: 'Booth Info' },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            className={`ldon-tab ${activeTab === tab.id ? 'ldon-tab--active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* ── Tab: My Vote ── */}
                {activeTab === 'profile' && (
                    <div className="ldon-section" key="profile">

                        <div className="ldon-section-label">Your voted candidate</div>

                        <div
                            className="ldon-voted-card"
                            style={{
                                '--ccolor': votedFor.color,
                                '--cbg': votedFor.bg,
                                '--cborder': votedFor.border,
                            }}
                        >
                            <div className="ldon-voted-symbol">{votedFor.symbol}</div>
                            <div className="ldon-voted-info">
                                <div className="ldon-voted-name">{votedFor.name}</div>
                                <div className="ldon-voted-hindi">{votedFor.hindi}</div>
                                <div className="ldon-voted-party">{votedFor.party}</div>
                            </div>
                            <div className="ldon-voted-check">✓</div>
                        </div>

                        {/* Status strip */}
                        <div className="ldon-status-strip">
                            <div className="ldon-status-item">
                                <div>
                                    <div className="ldon-status-title">Encrypted</div>
                                    <div className="ldon-status-sub">256-bit AES</div>
                                </div>
                            </div>
                            <div className="ldon-status-divider" />
                            <div className="ldon-status-item">
                                <div>
                                    <div className="ldon-status-title">Verified</div>
                                    <div className="ldon-status-sub">Identity confirmed</div>
                                </div>
                            </div>
                            <div className="ldon-status-divider" />
                            <div className="ldon-status-item">
                                <div>
                                    <div className="ldon-status-title">Recorded</div>
                                    <div className="ldon-status-sub">Tamper-proof ledger</div>
                                </div>
                            </div>
                        </div>

                        {/* All candidates summary */}
                        <div className="ldon-section-label" style={{ marginTop: '1.5rem' }}>All candidates</div>
                        <div className="ldon-candidates">
                            {candidates.map((c) => (
                                <div
                                    key={c.id}
                                    className={`ldon-candidate ${c.id === VOTED_FOR_ID ? 'ldon-candidate--voted' : ''}`}
                                    style={{ '--ccolor': c.color, '--cbg': c.bg }}
                                >
                                    <div className="ldon-c-symbol">{c.symbol}</div>
                                    <div className="ldon-c-info">
                                        <div className="ldon-c-name">{c.name}</div>
                                        <div className="ldon-c-party">{c.partyShort} · {c.party}</div>
                                    </div>
                                    {c.id === VOTED_FOR_ID && (
                                        <div className="ldon-c-voted-tag">Your vote</div>
                                    )}
                                </div>
                            ))}
                        </div>

                    </div>
                )}

                {/* ── Tab: Live Standings ── */}
                {activeTab === 'standings' && (
                    <div className="ldon-section" key="standings">
                        <div className="ldon-section-label">Live vote standings</div>
                        <div className="ldon-standings">
                            {[...candidates]
                                .sort((a, b) => b.votes - a.votes)
                                .map((c, i) => (
                                    <div key={c.id} className="ldon-standing-row">
                                        <div className="ldon-standing-rank">{i + 1}</div>
                                        <div className="ldon-standing-symbol">{c.symbol}</div>
                                        <div className="ldon-standing-info">
                                            <div className="ldon-standing-name">
                                                {c.name}
                                                {c.id === VOTED_FOR_ID && (
                                                    <span className="ldon-standing-you">you</span>
                                                )}
                                            </div>
                                            <div className="ldon-standing-party">{c.partyShort}</div>
                                            <div className="ldon-standing-bar-track">
                                                <div
                                                    className="ldon-standing-bar-fill"
                                                    style={{ width: `${c.percent}%`, background: c.color }}
                                                />
                                            </div>
                                        </div>
                                        <div className="ldon-standing-stats">
                                            <div className="ldon-standing-pct" style={{ color: c.color }}>{c.percent}%</div>
                                            <div className="ldon-standing-votes">{c.votes.toLocaleString()}</div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                        <div className="ldon-total-note">
                            Total votes cast: <strong>{candidates.reduce((a, c) => a + c.votes, 0).toLocaleString()}</strong>
                        </div>
                    </div>
                )}

                {/* ── Tab: Booth Info ── */}
                {activeTab === 'info' && (
                    <div className="ldon-section" key="info">
                        <div className="ldon-section-label">Voting details</div>
                        <div className="ldon-info-grid">
                            {[
                                { label: 'Constituency', value: 'Kolkata North — Ward 12' },
                                { label: 'Polling Booth', value: 'Govt. Primary School, Sector IV' },
                                { label: 'Booth Number', value: 'BN-0042' },
                                { label: 'Election Date', value: '3 May 2026' },
                                { label: 'Voting Method', value: 'Online — Secure Portal' },
                                { label: 'Status', value: '✓ Successfully recorded' },
                            ].map((item) => (
                                <div key={item.label} className="ldon-info-item">
                                    <div className="ldon-info-label">{item.label}</div>
                                    <div className="ldon-info-value">{item.value}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="ldon-footer">
                    निर्वाचन आयोग · Election Commission of India · Tamper-proof &amp; Encrypted
                </div>

            </div>
        </div>
    )
}

export default LandingOn