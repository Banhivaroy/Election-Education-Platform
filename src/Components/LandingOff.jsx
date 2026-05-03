import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"

const options = [
    {
        id: "candidates",
        hindi: "उम्मीदवार",
        english: "CANDIDATES",
        description: "View all registered candidates and their party affiliations",
        path: "/candidates",
        icon: (
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="16" r="9" strokeWidth="2.5" stroke="currentColor" />
                <path d="M6 42c0-9.941 8.059-18 18-18s18 8.059 18 18" strokeWidth="2.5" stroke="currentColor" strokeLinecap="round" />
            </svg>
        ),
        accent: "#FF6B1A",
        bg: "#FFF5EE",
        index: 0,
    },
    {
        id: "your-area",
        hindi: "आपका क्षेत्र",
        english: "YOUR AREA",
        description: "Explore candidates and polling booths in your constituency",
        path: "/area",
        icon: (
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 4C16.268 4 10 10.268 10 18c0 11 14 26 14 26S38 29 38 18C38 10.268 31.732 4 24 4z" strokeWidth="2.5" stroke="currentColor" />
                <circle cx="24" cy="18" r="5" strokeWidth="2.5" stroke="currentColor" />
            </svg>
        ),
        accent: "#1B5E20",
        bg: "#F0F7F0",
        index: 1,
    },
    {
        id: "results",
        hindi: "परिणाम",
        english: "RESULTS",
        description: "Live and historical election results across all constituencies",
        path: "/results",
        icon: (
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="30" width="8" height="14" rx="2" strokeWidth="2.5" stroke="currentColor" />
                <rect x="20" y="20" width="8" height="24" rx="2" strokeWidth="2.5" stroke="currentColor" />
                <rect x="34" y="10" width="8" height="34" rx="2" strokeWidth="2.5" stroke="currentColor" />
                <path d="M10 20 L24 12 L38 6" strokeWidth="2.5" stroke="currentColor" strokeLinecap="round" />
            </svg>
        ),
        accent: "#1A3A8C",
        bg: "#EEF2FF",
        index: 2,
    },
    {
        id: "voter-list",
        hindi: "मतदाता सूची",
        english: "VOTER LIST",
        description: "Search and verify your name on the official electoral roll",
        path: "/voterlist",
        icon: (
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="8" y="6" width="32" height="38" rx="3" strokeWidth="2.5" stroke="currentColor" />
                <path d="M16 16h16M16 24h16M16 32h10" strokeWidth="2.5" stroke="currentColor" strokeLinecap="round" />
            </svg>
        ),
        accent: "#8B1A1A",
        bg: "#FFF0F0",
        index: 3,
    },
];
function LandingOff() {
    const navigate = useNavigate();
    const [hovered, setHovered] = useState(null);
    const [active, setActive] = useState(null);
    return (
        <div className="page">
            <div className="tricolor-bar">
                <span className="tc-saffron" />
                <span className="tc-white" />
                <span className="tc-green" />
            </div>

            <header className="page-header">
                <div className="brand">
                    <span className="brand-hindi">मतदान</span>
                    <span className="brand-sub">निर्वाचन आयोग · Election Commission</span>
                </div>
                <div className="ashoka-wheel">
                    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="30" cy="30" r="26" stroke="#1A3A8C" strokeWidth="2" />
                        <circle cx="30" cy="30" r="5" fill="#1A3A8C" />
                        {Array.from({ length: 24 }).map((_, i) => {
                            const angle = (i * 360) / 24;
                            const rad = (angle * Math.PI) / 180;
                            const x1 = 30 + 6 * Math.cos(rad);
                            const y1 = 30 + 6 * Math.sin(rad);
                            const x2 = 30 + 24 * Math.cos(rad);
                            const y2 = 30 + 24 * Math.sin(rad);
                            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#1A3A8C" strokeWidth="1.2" />;
                        })}
                    </svg>
                </div>
            </header>

            <main className="grid-area">
                {options.map((opt) => (
                    <button
                        key={opt.id}
                        className={`option-card card-${opt.id}${hovered === opt.id ? " hovered" : ""}${active === opt.id ? " active" : ""}`}
                        style={{
                            "--accent": opt.accent,
                            "--card-bg": opt.bg,
                        }}
                        onMouseEnter={() => setHovered(opt.id)}
                        onMouseLeave={() => setHovered(null)}
                        onMouseDown={() => setActive(opt.id)}
                        onMouseUp={() => setActive(null)}
                        aria-label={opt.english}
                        onClick={() => navigate(opt.path)}
                    >
                        <div className="card-icon">{opt.icon}</div>
                        <div className="card-text">
                            <span className="card-hindi">{opt.hindi}</span>
                            <span className="card-english">{opt.english}</span>
                            <span className="card-desc">{opt.description}</span>
                        </div>
                        <div className="card-arrow">
                            <svg viewBox="0 0 24 24" fill="none">
                                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div className="card-stripe" />
                    </button>
                ))}
            </main>

            <footer className="page-footer">
                <span>भारत निर्वाचन आयोग · Election Commission of India</span>
            </footer>

            <div className="tricolor-bar bottom">
                <span className="tc-saffron" />
                <span className="tc-white" />
                <span className="tc-green" />
            </div>
        </div>

    )
}

export default LandingOff