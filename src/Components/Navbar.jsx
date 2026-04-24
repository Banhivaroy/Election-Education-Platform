
import { useState } from 'react'
import { Link } from 'react-router-dom'
function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)

    const navLinks = [
        { hindi: 'उम्मीदवार', english: 'Candidates', path: "/candidates" },
        { hindi: 'आपका क्षेत्र', english: 'Your Area', path: "/area" },
        { hindi: 'परिणाम', english: 'Results', path: "/results" },
        { hindi: 'मतदाता सूची', english: 'Voter List', path: "/voterlist" },
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
                            <Link to={link.path} className="nav-link" >
                                <span className="nav-hindi">{link.hindi}</span>
                                <span className="nav-english">{link.english}</span>
                            </Link>
                        </li>
                    ))}
                    <li>
                        <Link to="/vote" className="nav-cta">
                            <span>मतदान करें</span>
                            <span className="cta-sub">Vote Now</span>
                        </Link>
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