import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    age: '',
    epic: '',
  })

  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [showEpic, setShowEpic] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target

    // EPIC number: uppercase only, max 10 chars
    if (name === 'epic') {
      setForm((prev) => ({ ...prev, epic: value.toUpperCase().slice(0, 10) }))
    } else if (name === 'age') {
      // digits only
      setForm((prev) => ({ ...prev, age: value.replace(/\D/g, '').slice(0, 3) }))
    } else {
      setForm((prev) => ({ ...prev, [name]: value }))
    }

    // Clear error on change
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  function validate() {
    const newErrors = {}

    if (!form.name.trim()) {
      newErrors.name = 'Full name is required.'
    } else if (form.name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters.'
    }

    if (!form.age) {
      newErrors.age = 'Age is required.'
    } else if (parseInt(form.age) < 18) {
      newErrors.age = 'You must be 18 or older to vote.'
    } else if (parseInt(form.age) > 120) {
      newErrors.age = 'Please enter a valid age.'
    }

    if (!form.epic.trim()) {
      newErrors.epic = 'EPIC number is required.'
    } else if (!/^[A-Z]{3}[0-9]{7}$/.test(form.epic)) {
      newErrors.epic = 'Format: 3 letters + 7 digits (e.g. ABC1234567)'
    }

    return newErrors
  }

  function handleSubmit() {
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setSubmitted(true)

    // Store voter info in sessionStorage for use across pages
    sessionStorage.setItem('voter', JSON.stringify(form))

    setTimeout(() => navigate('/mode'), 1800)
  }

  if (submitted) {
    return (
      <div className="login-page">
        <div className="login-success">
          <div className="success-icon">✓</div>
          <h2 className="success-title">Verified!</h2>
          <p className="success-sub">Welcome, {form.name.split(' ')[0]}. Redirecting…</p>
        </div>
      </div>
    )
  }
  return (
    <div className="login-page">

      {/* Left panel — decorative */}
      <div className="login-left">
        <div className="left-emblem">🗳</div>
        <h1 className="left-title">मतदान</h1>
        <p className="left-subtitle">Digital Voting Portal</p>
        <div className="left-divider" />
        <p className="left-body">
          India's elections, reimagined for the digital age. Verify your
          identity to access your personalised voting dashboard.
        </p>
        <div className="left-badge">निर्वाचन आयोग · Election Commission</div>
      </div>

      {/* Right panel — form */}
      <div className="login-right">
        <div className="form-card">

          <div className="form-header">
            <h2 className="form-title">Voter Verification</h2>
            <p className="form-subtitle">Enter your details as per your Voter ID card</p>
          </div>

          {/* Name */}
          <div className={`field ${errors.name ? 'field-error' : ''}`}>
            <label className="field-label" htmlFor="name">
              Full Name <span className="required">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="field-input"
              placeholder="As on your Voter ID"
              value={form.name}
              onChange={handleChange}
              autoComplete="off"
            />
            {errors.name && <span className="field-msg">{errors.name}</span>}
          </div>

          {/* Age */}
          <div className={`field ${errors.age ? 'field-error' : ''}`}>
            <label className="field-label" htmlFor="age">
              Age <span className="required">*</span>
            </label>
            <input
              id="age"
              name="age"
              type="text"
              inputMode="numeric"
              className="field-input"
              placeholder="Must be 18 or above"
              value={form.age}
              onChange={handleChange}
              autoComplete="off"
            />
            {errors.age && <span className="field-msg">{errors.age}</span>}
          </div>

          {/* EPIC number */}
          <div className={`field ${errors.epic ? 'field-error' : ''}`}>
            <label className="field-label" htmlFor="epic">
              EPIC / Voter Card Number <span className="required">*</span>
            </label>
            <div className="epic-input-wrapper">
              <input
                id="epic"
                name="epic"
                type="text"
                className={`field-input epic-input ${showEpic ? 'epic-masked' : ''}`}
                placeholder="e.g. ABC1234567"
                value={form.epic}
                onChange={handleChange}
                autoComplete="off"
                maxLength={10}
              />
              <button
                type="button"
                className="toggle-btn"
                onClick={() => setShowEpic((prev) => !prev)}
                aria-label={showEpic ? 'Hide EPIC number' : 'Show EPIC number'}
              >
                {showEpic ? (
                  /* Eye-off icon */
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  /* Eye icon */
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>

            <span className="field-hint">3 capital letters followed by 7 digits</span>
            {errors.epic && <span className="field-msg">{errors.epic}</span>}

          </div>


          {/* Submit */}
          <button className="submit-btn" onClick={handleSubmit}>
            <span>Verify &amp; Continue</span>
            <span className="btn-arrow">→</span>
          </button>

          <p className="disclaimer">
            Your data is encrypted and used solely for voter verification.
          </p>

        </div>
      </div>

    </div>
  )
}

export default Login