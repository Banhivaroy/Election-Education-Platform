
import { useState } from 'react'

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)

    const navLinks = [
        { hindi: 'मुख्य पृष्ठ', english: 'Home' },
        { hindi: 'उम्मीदवार', english: 'Candidates' },
        { hindi: 'आपका क्षेत्र', english: 'Your Area' },
        { hindi: 'परिणाम', english: 'Results' },
        { hindi: 'मतदाता सूची', english: 'Voter List' },
    ]
    return (
        <nav className="navbar">
            <div className="navbar-top-stripe" />

            <div className="navbar-inner">
                {/* Logo / Brand */}
                <div className="navbar-brand">

                    <div className="brand-text">
                        <span className="brand-hindi">मतदान</span>
                        <span className="brand-sub">निर्वाचन आयोग</span>
                    </div>
                </div>

                {/* Desktop Links */}
                <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
                    {navLinks.map((link, i) => (
                        <li key={i} className="nav-item">
                            <a href="#" className="nav-link">
                                <span className="nav-hindi">{link.hindi}</span>
                                <span className="nav-english">{link.english}</span>
                            </a>
                        </li>
                    ))}
                    <li>
                        <a href="#" className="nav-cta">
                            <span>मतदान करें</span>
                            <span className="cta-sub">Vote Now</span>
                        </a>
                    </li>
                </ul>

                {/* Hamburger */}
                <button
                    className={`hamburger ${menuOpen ? 'active' : ''}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span /><span /><span />
                </button>
            </div>

            <div className="navbar-bottom-stripe" />
        </nav>
    )
}

export default Navbar