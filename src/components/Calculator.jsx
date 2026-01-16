import React, { useState, useMemo, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import './Calculator.css'
import { track } from '../utils/analytics'
import { IconCheck, IconCheckCircle, IconArrowRight } from './Icons'

const Calculator = () => {
  // Pricing state
  const [participants, setParticipants] = useState(8)
  const [format, setFormat] = useState('online')
  const [addOns, setAddOns] = useState({
    extraInterviews: false,
    additionalFacilitation: false,
    followUpCalls: false,
    deepDocumentation: false,
  })

  // Form state - simplified: Name required, contact (email OR telegram) required
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    telegram: '',
    company: '',
    role: '',
    notes: '',
    honeypot: '', // Anti-spam honeypot field
  })
  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Anti-spam: track first interaction time
  const firstInteractionTime = useRef(null)
  const formRef = useRef(null)

  // Track calculator changes
  const handleParticipantsChange = (value) => {
    setParticipants(value)
    track('calculator_change', { field: 'participants', value })
  }

  const handleFormatChange = (value) => {
    setFormat(value)
    track('calculator_change', { field: 'format', value })
  }

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
  }, [participants, format, addOns])

  const handleAddOnToggle = (key) => {
    setAddOns((prev) => ({ ...prev, [key]: !prev[key] }))
    track('calculator_change', { field: 'addon', addon: key, value: !addOns[key] })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    
    // Track first interaction for anti-spam
    if (!firstInteractionTime.current) {
      firstInteractionTime.current = Date.now()
    }
    
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }))
    }
  }

  // Validation helpers
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const isValidTelegram = (telegram) => {
    // Accepts @username or t.me/username or https://t.me/username
    return /^@[\w]{5,}$|^(https?:\/\/)?(t\.me|telegram\.me)\/[\w]{5,}$/i.test(telegram)
  }

  const validateForm = () => {
    const newErrors = {}

    // Name is required
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    // At least one contact method required
    const hasEmail = formData.email.trim()
    const hasTelegram = formData.telegram.trim()

    if (!hasEmail && !hasTelegram) {
      newErrors.contact = 'Please provide email or Telegram'
    } else {
      // Validate email format if provided
      if (hasEmail && !isValidEmail(formData.email)) {
        newErrors.email = 'Please enter a valid email'
      }
      // Validate telegram format if provided
      if (hasTelegram && !isValidTelegram(formData.telegram)) {
        newErrors.telegram = 'Use @username or t.me/username'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    track('estimate_submit_attempt', { pricing: pricing.total })

    // Anti-spam: honeypot check
    if (formData.honeypot) {
      console.log('Spam detected: honeypot filled')
      return
    }

    // Anti-spam: time guard (minimum 3 seconds since first interaction)
    if (firstInteractionTime.current && Date.now() - firstInteractionTime.current < 3000) {
      console.log('Spam detected: too fast submission')
      return
    }

    if (!validateForm()) {
      track('estimate_submit_fail', { errors: Object.keys(errors) })
      return
    }

    setIsSubmitting(true)

    // Prepare payload with all calculator values
    const payload = {
      calculator: {
        participants,
        format,
        addOns,
        pricing,
      },
      contact: {
        name: formData.name,
        email: formData.email || null,
        telegram: formData.telegram || null,
        company: formData.company || null,
        role: formData.role || null,
        notes: formData.notes || null,
      },
      submittedAt: new Date().toISOString(),
    }

    try {
      // Try to send to webhook if configured
      const webhookUrl = import.meta.env.VITE_LEAD_WEBHOOK_URL
      
      if (webhookUrl) {
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        
        if (!response.ok) {
          throw new Error('Webhook failed')
        }
      } else {
        // Log locally if no webhook configured
        console.log('Form submission payload:', payload)
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 800))
      }

      track('estimate_submit_success', { pricing: pricing.total })
      setIsSubmitting(false)
      setIsSubmitted(true)
    } catch (error) {
      console.error('Submission error:', error)
      track('estimate_submit_fail', { error: error.message })
      setIsSubmitting(false)
      setErrors({ submit: 'Something went wrong. Please try again.' })
    }
  }

  const addOnOptions = [
    {
      key: 'extraInterviews',
      title: 'Extra Discovery Interviews',
      description: '+3 stakeholder interviews',
      price: 400,
    },
    {
      key: 'additionalFacilitation',
      title: 'Additional Facilitation',
      description: 'Extended session (+half day)',
      price: 600,
    },
    {
      key: 'followUpCalls',
      title: 'Post-Session Follow-up',
      description: '3 calls over 30 days',
      price: 350,
    },
    {
      key: 'deepDocumentation',
      title: 'Deep Documentation',
      description: 'Comprehensive deliverables',
      price: 500,
    },
  ]

  // Success state with "What happens next"
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
              <IconCheckCircle size={48} />
            </div>
            <h3 className="calculator__success-title">Request Sent!</h3>
            <p className="calculator__success-text">
              Thank you, {formData.name}! We've received your estimate request.
            </p>
            
            <div className="calculator__success-summary">
              <div className="calculator__success-row">
                <span>Estimated Investment</span>
                <span className="calculator__success-price">${pricing.total.toLocaleString()}</span>
              </div>
            </div>

            <div className="calculator__next-steps">
              <h4 className="calculator__next-steps-title">What happens next</h4>
              <ol className="calculator__next-steps-list">
                <li>
                  <span className="calculator__step-number">1</span>
                  <span>We read your request</span>
                </li>
                <li>
                  <span className="calculator__step-number">2</span>
                  <span>Ask 2–3 quick questions</span>
                </li>
                <li>
                  <span className="calculator__step-number">3</span>
                  <span>20-minute fit call</span>
                </li>
                <li>
                  <span className="calculator__step-number">4</span>
                  <span>Confirm format & date</span>
                </li>
              </ol>
            </div>

            <button
              className="btn btn-secondary"
              onClick={() => {
                setIsSubmitted(false)
                setFormData({ name: '', email: '', telegram: '', company: '', role: '', notes: '', honeypot: '' })
                firstInteractionTime.current = null
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
                  <IconCheck size={16} className="calculator__base-icon" />
                  Decision-maker interview
                </div>
                <div className="calculator__base-item">
                  <IconCheck size={16} className="calculator__base-icon" />
                  Context & pain points collection
                </div>
                <div className="calculator__base-item">
                  <IconCheck size={16} className="calculator__base-icon" />
                  Custom session design
                </div>
                <div className="calculator__base-item">
                  <IconCheck size={16} className="calculator__base-icon" />
                  1-2 day facilitated session
                </div>
                <div className="calculator__base-item">
                  <IconCheck size={16} className="calculator__base-icon" />
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
                  onChange={(e) => handleParticipantsChange(Number(e.target.value))}
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
                  onClick={() => handleFormatChange('online')}
                >
                  Online
                </button>
                <button
                  className={`calculator__toggle ${format === 'offline' ? 'calculator__toggle--active' : ''}`}
                  onClick={() => handleFormatChange('offline')}
                >
                  Offline (Minsk)
                </button>
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
                      {addOns[addon.key] && <IconCheck size={12} />}
                    </div>
                    <div className="calculator__addon-content">
                      <div className="calculator__addon-title">{addon.title}</div>
                      <div className="calculator__addon-description">{addon.description}</div>
                      <div className="calculator__addon-price">+${addon.price}</div>
                    </div>
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
              </div>

              <form className="calculator__form" onSubmit={handleSubmit} ref={formRef}>
                {/* Honeypot field - hidden from users */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleInputChange}
                  className="calculator__honeypot"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="calculator__form-group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name *"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`calculator__input ${errors.name ? 'calculator__input--error' : ''}`}
                  />
                  {errors.name && <span className="calculator__error">{errors.name}</span>}
                </div>

                <div className="calculator__form-row">
                  <div className="calculator__form-group">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`calculator__input ${errors.email ? 'calculator__input--error' : ''}`}
                    />
                    {errors.email && <span className="calculator__error">{errors.email}</span>}
                  </div>
                  <div className="calculator__form-group">
                    <input
                      type="text"
                      name="telegram"
                      placeholder="@telegram"
                      value={formData.telegram}
                      onChange={handleInputChange}
                      className={`calculator__input ${errors.telegram ? 'calculator__input--error' : ''}`}
                    />
                    {errors.telegram && <span className="calculator__error">{errors.telegram}</span>}
                  </div>
                </div>
                {errors.contact && <span className="calculator__error calculator__error--contact">{errors.contact}</span>}

                <div className="calculator__form-row">
                  <div className="calculator__form-group">
                    <input
                      type="text"
                      name="company"
                      placeholder="Company (optional)"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="calculator__input"
                    />
                  </div>
                  <div className="calculator__form-group">
                    <input
                      type="text"
                      name="role"
                      placeholder="Role (optional)"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="calculator__input"
                    />
                  </div>
                </div>

                <div className="calculator__form-group">
                  <textarea
                    name="notes"
                    placeholder="Tell us about your situation (optional)"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows="2"
                    className="calculator__input calculator__textarea"
                  />
                </div>

                {errors.submit && <span className="calculator__error">{errors.submit}</span>}

                <button
                  type="submit"
                  className="btn btn-primary btn-large calculator__submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Request'}
                  {!isSubmitting && <IconArrowRight size={16} />}
                </button>

                <p className="calculator__microcopy">
                  Reply in 24h. No spam. Quick fit check first.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Calculator
