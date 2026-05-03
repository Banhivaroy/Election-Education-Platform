import React, { useState } from 'react'


const STEPS = {
    IDLE: 'idle',
    CONFIRM: 'confirm',
    PROCESSING: 'processing',
    SUCCESS: 'success',
}
function LandingOn() {
    const [step, setStep] = useState(STEPS.IDLE)
    const [ripples, setRipples] = useState([])

    const voter = JSON.parse(sessionStorage.getItem('voter') || '{}')

    function addRipple(e) {
        const btn = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - btn.left
        const y = e.clientY - btn.top
        const id = Date.now()
        setRipples((prev) => [...prev, { id, x, y }])
        setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 700)
    }

    function handleVoteClick(e) {
        addRipple(e)
        setTimeout(() => setStep(STEPS.CONFIRM), 150)
    }

    function handleConfirm() {
        setStep(STEPS.PROCESSING)
        setTimeout(() => setStep(STEPS.SUCCESS), 2200)
    }

    function handleCancel() {
        setStep(STEPS.IDLE)
    }
    return (
        <div className="vote-page">

            {/* Decorative background */}
            <div className="vote-bg-circle vote-bg-circle--1" />
            <div className="vote-bg-circle vote-bg-circle--2" />
            <div className="vote-bg-grain" />

            <div className="vote-inner">

                {/* Header */}
                <div className="vote-header">

                    <h1 className="vote-title">
                        <span className="vote-title-hindi">मतदान करें</span>
                        <span className="vote-title-en">Cast Your Vote</span>
                    </h1>
                    {voter.name && (
                        <p className="vote-greeting">
                            Welcome, <strong>{voter.name}</strong>
                        </p>
                    )}
                </div>

                {/* State card */}
                <div className={`vote-card vote-card--${step}`}>

                    {/* ── IDLE ── */}
                    {step === STEPS.IDLE && (
                        <div className="vote-state vote-state--idle">
                            <p className="vote-instruction">
                                Your vote is your voice. Exercise your democratic right securely and confidently.
                            </p>
                            <button className="vote-btn" onClick={handleVoteClick}>
                                {ripples.map((r) => (
                                    <span key={r.id} className="vote-ripple" style={{ left: r.x, top: r.y }} />
                                ))}
                                <span className="vote-btn-icon">✦</span>
                                <span className="vote-btn-text">Vote Online</span>
                                <span className="vote-btn-sub">Tap to begin</span>
                            </button>
                            <p className="vote-secure">
                                <span className="vote-lock"></span> 256-bit encrypted · Tamper-proof
                            </p>
                        </div>
                    )}

                    {/* ── CONFIRM ── */}
                    {step === STEPS.CONFIRM && (
                        <div className="vote-state vote-state--confirm">
                            <div className="confirm-icon"></div>
                            <h2 className="confirm-title">Confirm Your Vote</h2>
                            <p className="confirm-body">
                                This action is <strong>irreversible</strong>. Once submitted, your vote cannot be changed. Are you sure you want to proceed?
                            </p>
                            {voter.epic && (
                                <div className="confirm-meta">
                                    EPIC · <span>{voter.epic.slice(0, 3)}•••••••</span>
                                </div>
                            )}
                            <div className="confirm-actions">
                                <button className="confirm-btn confirm-btn--yes" onClick={handleConfirm}>
                                    Yes, Cast My Vote
                                </button>
                                <button className="confirm-btn confirm-btn--no" onClick={handleCancel}>
                                    Go Back
                                </button>
                            </div>
                        </div>
                    )}

                    {/* ── PROCESSING ── */}
                    {step === STEPS.PROCESSING && (
                        <div className="vote-state vote-state--processing">
                            <div className="processing-ring">
                                <div className="processing-ring-inner" />
                            </div>
                            <h2 className="processing-title">Submitting…</h2>
                            <p className="processing-body">
                                Encrypting and recording your vote on the secure ledger.
                            </p>
                            <div className="processing-steps">
                                <div className="pstep pstep--done">✓ Identity verified</div>
                                <div className="pstep pstep--active">◌ Encrypting vote</div>
                                <div className="pstep pstep--pending">◌ Recording to ledger</div>
                            </div>
                        </div>
                    )}

                    {/* ── SUCCESS ── */}
                    {step === STEPS.SUCCESS && (
                        <div className="vote-state vote-state--success">
                            <div className="success-burst">
                                <div className="success-check">✓</div>
                            </div>
                            <h2 className="done-title">Vote Cast!</h2>
                            <p className="success-body">
                                Your vote has been securely recorded. Thank you for participating in India's democracy.
                            </p>
                            <div className="success-id">
                                Reference ID · <strong>VT{Date.now().toString().slice(-8)}</strong>
                            </div>
                            <div className="success-hindi">जय हिन्द 🇮🇳</div>
                        </div>
                    )}

                </div>

                <div className="vote-footer">
                    निर्वाचन आयोग · Election Commission of India
                </div>

            </div>
        </div>
    )
}

export default LandingOn