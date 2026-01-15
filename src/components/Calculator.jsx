import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import './Calculator.css'

const Calculator = () => {
  // Pricing state
  const [participants, setParticipants] = useState(8)
  const [format, setFormat] = useState('online')
  const [geography, setGeography] = useState('kazakhstan')
  const [addOns, setAddOns] = useState({
    extraInterviews: false,
    additionalFacilitation: false,
    followUpCalls: false,
    deepDocumentation: false,
  })

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    role: '',
    contact: '',
    notes: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Pricing logic
  const pricing = useMemo(() => {
    let basePrice = 2500

    // Participant adjustment
    if (participants <= 7) {
      basePrice = 2500
    } else if (participants <= 10) {
      basePrice = 3200
    } else {
      basePrice = 4000
    }

    // Format adjustment
    if (format === 'offline') {
      basePrice += 800
    }

    // Geography adjustment
    const geoMultiplier = {
      kazakhstan: 1,
      georgia: 1,
      belarus: 0.85,
      russia: 0.85,
    }
    basePrice *= geoMultiplier[geography]

    // Add-ons
    let addOnTotal = 0
    if (addOns.extraInterviews) addOnTotal += 400
    if (addOns.additionalFacilitation) addOnTotal += 600
    if (addOns.followUpCalls) addOnTotal += 350
    if (addOns.deepDocumentation) addOnTotal += 500

    return {
      base: Math.round(basePrice),
      addOns: addOnTotal,
      total: Math.round(basePrice + addOnTotal),
    }
  }, [participants, format, geography, addOns])

  const handleAddOnToggle = (key) => {
    setAddOns((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Prepare payload with all calculator values
    const payload = {
      calculator: {
        participants,
        format,
        geography,
        addOns,
        pricing,
      },
      contact: formData,
      submittedAt: new Date().toISOString(),
    }

    // TODO: Replace with actual webhook/database integration
    console.log('Form submission payload:', payload)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const addOnOptions = [
    {
      key: 'extraInterviews',
      title: 'Extra Discovery Interviews',
      description: '+3 stakeholder interviews before session',
      price: 400,
    },
    {
      key: 'additionalFacilitation',
      title: 'Additional Facilitation Block',
      description: 'Extended session time (+ half day)',
      price: 600,
    },
    {
      key: 'followUpCalls',
      title: 'Post-Session Follow-up',
      description: '3 check-in calls over 30 days',
      price: 350,
    },
    {
      key: 'deepDocumentation',
      title: 'Deep Documentation',
      description: 'Comprehensive written deliverables',
      price: 500,
    },
  ]

  const geographies = [
    { value: 'kazakhstan', label: 'Kazakhstan', tag: 'Priority' },
    { value: 'georgia', label: 'Georgia', tag: 'Priority' },
    { value: 'belarus', label: 'Belarus', tag: null },
    { value: 'russia', label: 'Russia', tag: null },
  ]

  if (isSubmitted) {
    return (
      <section id="calculator" className="calculator section">
        <div className="calculator__glow"></div>
        <div className="container">
          <motion.div
            className="calculator__success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="calculator__success-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <h3 className="calculator__success-title">Request Sent Successfully</h3>
            <p className="calculator__success-text">
              Thank you, {formData.name}! We'll review your request and get back to you within 24 hours.
            </p>
            <div className="calculator__success-summary">
              <div className="calculator__success-row">
                <span>Estimated Investment</span>
                <span className="calculator__success-price">${pricing.total.toLocaleString()}</span>
              </div>
            </div>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setIsSubmitted(false)
                setFormData({ name: '', company: '', role: '', contact: '', notes: '' })
              }}
            >
              Calculate Another Estimate
            </button>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="calculator" className="calculator section">
      <div className="calculator__glow"></div>
      
      <div className="container">
        <motion.div 
          className="calculator__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="label">Pricing Calculator</span>
          <h2 className="calculator__title">
            Calculate Your <span className="gradient-text">Investment</span>
          </h2>
          <p className="calculator__subtitle">
            Customize your session package and get an instant estimate.
          </p>
        </motion.div>

        <div className="calculator__content">
          <motion.div 
            className="calculator__config"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Base Package */}
            <div className="calculator__section">
              <h3 className="calculator__section-title">Base Package</h3>
              <div className="calculator__base-info">
                <div className="calculator__base-item">
                  <span className="calculator__base-icon">✓</span>
                  Decision-maker interview
                </div>
                <div className="calculator__base-item">
                  <span className="calculator__base-icon">✓</span>
                  Context & pain points collection
                </div>
                <div className="calculator__base-item">
                  <span className="calculator__base-icon">✓</span>
                  Custom session design
                </div>
                <div className="calculator__base-item">
                  <span className="calculator__base-icon">✓</span>
                  1-2 day facilitated session
                </div>
                <div className="calculator__base-item">
                  <span className="calculator__base-icon">✓</span>
                  Documented deliverables
                </div>
              </div>
            </div>

            {/* Participants Slider */}
            <div className="calculator__section">
              <div className="calculator__section-header">
                <h3 className="calculator__section-title">Participants</h3>
                <span className="calculator__section-value">{participants} people</span>
              </div>
              <div className="calculator__slider-container">
                <input
                  type="range"
                  min="5"
                  max="15"
                  value={participants}
                  onChange={(e) => setParticipants(Number(e.target.value))}
                  className="calculator__slider"
                />
                <div className="calculator__slider-labels">
                  <span>5</span>
                  <span>15</span>
                </div>
              </div>
            </div>

            {/* Format Toggle */}
            <div className="calculator__section">
              <h3 className="calculator__section-title">Format</h3>
              <div className="calculator__toggle-group">
                <button
                  className={`calculator__toggle ${format === 'online' ? 'calculator__toggle--active' : ''}`}
                  onClick={() => setFormat('online')}
                >
                  Online
                </button>
                <button
                  className={`calculator__toggle ${format === 'offline' ? 'calculator__toggle--active' : ''}`}
                  onClick={() => setFormat('offline')}
                >
                  Offline (Minsk)
                </button>
              </div>
            </div>

            {/* Geography */}
            <div className="calculator__section">
              <h3 className="calculator__section-title">Region</h3>
              <div className="calculator__geography-grid">
                {geographies.map((geo) => (
                  <button
                    key={geo.value}
                    className={`calculator__geography ${geography === geo.value ? 'calculator__geography--active' : ''}`}
                    onClick={() => setGeography(geo.value)}
                  >
                    {geo.label}
                    {geo.tag && <span className="calculator__geography-tag">{geo.tag}</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Add-ons */}
            <div className="calculator__section">
              <h3 className="calculator__section-title">Add-ons</h3>
              <div className="calculator__addons">
                {addOnOptions.map((addon) => (
                  <div
                    key={addon.key}
                    className={`calculator__addon ${addOns[addon.key] ? 'calculator__addon--active' : ''}`}
                    onClick={() => handleAddOnToggle(addon.key)}
                  >
                    <div className="calculator__addon-checkbox">
                      {addOns[addon.key] && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      )}
                    </div>
                    <div className="calculator__addon-content">
                      <div className="calculator__addon-title">{addon.title}</div>
                      <div className="calculator__addon-description">{addon.description}</div>
                    </div>
                    <div className="calculator__addon-price">+${addon.price}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="calculator__summary"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="calculator__summary-card">
              <div className="calculator__summary-glow"></div>
              <h3 className="calculator__summary-title">Your Estimate</h3>

              <div className="calculator__summary-breakdown">
                <div className="calculator__summary-row">
                  <span>Base package</span>
                  <span>${pricing.base.toLocaleString()}</span>
                </div>
                {pricing.addOns > 0 && (
                  <div className="calculator__summary-row">
                    <span>Add-ons</span>
                    <span>+${pricing.addOns.toLocaleString()}</span>
                  </div>
                )}
                <div className="calculator__summary-divider"></div>
                <div className="calculator__summary-row calculator__summary-row--total">
                  <span>Total</span>
                  <span>${pricing.total.toLocaleString()}</span>
                </div>
              </div>

              <div className="calculator__summary-config">
                <div className="calculator__summary-tag">{participants} participants</div>
                <div className="calculator__summary-tag">{format === 'online' ? 'Online' : 'Offline'}</div>
                <div className="calculator__summary-tag">{geographies.find(g => g.value === geography)?.label}</div>
              </div>

              <form className="calculator__form" onSubmit={handleSubmit}>
                <div className="calculator__form-group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="calculator__input"
                  />
                </div>
                <div className="calculator__form-group">
                  <input
                    type="text"
                    name="company"
                    placeholder="Company"
                    value={formData.company}
                    onChange={handleInputChange}
                    required
                    className="calculator__input"
                  />
                </div>
                <div className="calculator__form-group">
                  <input
                    type="text"
                    name="role"
                    placeholder="Your role"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                    className="calculator__input"
                  />
                </div>
                <div className="calculator__form-group">
                  <input
                    type="text"
                    name="contact"
                    placeholder="Email or Telegram"
                    value={formData.contact}
                    onChange={handleInputChange}
                    required
                    className="calculator__input"
                  />
                </div>
                <div className="calculator__form-group">
                  <textarea
                    name="notes"
                    placeholder="Tell us about your situation (optional)"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows="3"
                    className="calculator__input calculator__textarea"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-large calculator__submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Request with Estimate'}
                  {!isSubmitting && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"/>
                      <path d="M12 5l7 7-7 7"/>
                    </svg>
                  )}
                </button>
              </form>

              <p className="calculator__note">
                Prices are estimates. Final pricing confirmed after discovery call.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Calculator
