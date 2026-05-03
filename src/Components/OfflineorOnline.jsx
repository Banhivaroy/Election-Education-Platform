import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const modes = [
    {
        id: 'online',
        hindi: 'ऑनलाइन',
        english: 'Online',
        tagline: 'Vote from anywhere',
        description: 'Cast your vote securely from your device. Encrypted, verified, and instant.',
        path: '/login',
        icon: (
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="10" width="36" height="24" rx="3" stroke="currentColor" strokeWidth="2.5" />
                <path d="M16 38h16M24 34v4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M17 22c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="24" cy="22" r="2.5" fill="currentColor" />
                <path d="M11 19c0-7.18 5.82-13 13-13s13 5.82 13 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 2" />
            </svg>
        ),
        accent: '#1d4ed8',
        glow: 'rgba(29, 78, 216, 0.35)',
        shine: 'rgba(29, 78, 216, 0.08)',
    },
    {
        id: 'offline',
        hindi: 'ऑफलाइन',
        english: 'Offline',
        tagline: 'Visit your booth',
        description: 'Find your nearest polling booth, check queue status, and vote in person.',
        path: '/landingOff',
        icon: (
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 6C16.268 6 10 12.268 10 20c0 12 14 22 14 22S38 32 38 20C38 12.268 31.732 6 24 6z" stroke="currentColor" strokeWidth="2.5" />
                <circle cx="24" cy="20" r="5" stroke="currentColor" strokeWidth="2.5" />
                <path d="M14 42h20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
        ),
        accent: '#15803d',
        glow: 'rgba(21, 128, 61, 0.35)',
        shine: 'rgba(21, 128, 61, 0.08)',
    },
]

function OfflineorOnline() {
    const navigate = useNavigate();
    const [hovered, setHovered] = useState(null)
    const [selected, setSelected] = useState(null)

    function handleSelect(mode) {
        setSelected(mode.id)
        setTimeout(() => navigate(mode.path), 420)
    }
    return (
        <div className="vm-page">

            {/* Background */}
            <div className="vm-bg" />
            <div className="vm-bg-grid" />

            <div className="vm-inner">

                {/* Header */}
                <div className="vm-header">
                    <div className="vm-pill">मतदान · Digital India</div>
                    <h1 className="vm-title">
                        How would you like<br />
                        <span className="vm-title-accent">to vote today?</span>
                    </h1>
                    <p className="vm-subtitle">
                        Choose your preferred method. Both are secure, private, and officially recognised.
                    </p>
                </div>

                {/* Cards */}
                <div className="vm-cards">
                    {modes.map((mode, i) => (
                        <button
                            key={mode.id}
                            className={`vm-card vm-card--${mode.id}${hovered === mode.id ? ' vm-card--hovered' : ''}${selected === mode.id ? ' vm-card--selected' : ''}`}
                            style={{
                                '--accent': mode.accent,
                                '--glow': mode.glow,
                                '--shine': mode.shine,
                                animationDelay: `${i * 0.12}s`,
                            }}
                            onMouseEnter={() => setHovered(mode.id)}
                            onMouseLeave={() => setHovered(null)}
                            onClick={() => handleSelect(mode)}
                            aria-label={mode.english}
                        >
                            {/* Shine overlay */}
                            <div className="vm-card-shine" />

                            {/* Top row */}
                            <div className="vm-card-top">
                                <div className="vm-card-icon">{mode.icon}</div>
                                <div className="vm-card-arrow">
                                    <svg viewBox="0 0 20 20" fill="none">
                                        <path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>

                            {/* Labels */}
                            <div className="vm-card-labels">
                                <span className="vm-card-hindi">{mode.hindi}</span>
                                <span className="vm-card-english">{mode.english}</span>
                            </div>

                            {/* Tagline */}
                            <div className="vm-card-tagline">{mode.tagline}</div>

                            {/* Description */}
                            <p className="vm-card-desc">{mode.description}</p>

                            {/* Bottom accent bar */}
                            <div className="vm-card-bar" />
                        </button>
                    ))}
                </div>

                {/* Divider label */}
                <div className="vm-divider">
                    <span className="vm-divider-line" />
                    <span className="vm-divider-text">or</span>
                    <span className="vm-divider-line" />
                </div>

                {/* Footer note */}
                <p className="vm-note">
                    Not sure? <strong>Online voting</strong> takes under 60 seconds. <strong>Offline voting</strong> lets you check your booth queue before leaving.
                </p>

                <div className="vm-footer">
                    निर्वाचन आयोग · Election Commission of India
                </div>

            </div>
        </div>
    )
}

export default OfflineorOnline