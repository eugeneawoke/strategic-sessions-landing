import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import './ContactForm.css'
import { track } from '../utils/analytics'
import { useCalculator } from './Calculator'
import { IconCheckCircle, IconArrowRight } from './Icons'

const ContactForm = () => {
  const { calculatorState } = useCalculator()
  const { hasInteracted, pricing, participants, format } = calculatorState

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    telegram: '',
    company: '',
    role: '',
    notes: '',
    honeypot: '',
  })
  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Anti-spam: track first interaction time
  const firstInteractionTime = useRef(null)
  const formRef = useRef(null)

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
    return /^@[\w]{5,}$|^(https?:\/\/)?(t\.me|telegram\.me)\/[\w]{5,}$/i.test(telegram)
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    const hasEmail = formData.email.trim()
    const hasTelegram = formData.telegram.trim()

    if (!hasEmail && !hasTelegram) {
      newErrors.contact = 'Please provide email or Telegram'
    } else {
      if (hasEmail && !isValidEmail(formData.email)) {
        newErrors.email = 'Please enter a valid email'
      }
      if (hasTelegram && !isValidTelegram(formData.telegram)) {
        newErrors.telegram = 'Use @username or t.me/username'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    track('contact_submit_attempt', { hasCalculatorData: hasInteracted, pricing: hasInteracted ? pricing.total : null })

    // Anti-spam: honeypot check
    if (formData.honeypot) {
      console.log('Spam detected: honeypot filled')
      return
    }

    // Anti-spam: time guard
    if (firstInteractionTime.current && Date.now() - firstInteractionTime.current < 3000) {
      console.log('Spam detected: too fast submission')
      return
    }

    if (!validateForm()) {
      track('contact_submit_fail', { errors: Object.keys(errors) })
      return
    }

    setIsSubmitting(true)

    const payload = {
      calculator: hasInteracted ? {
        participants,
        format,
        pricing,
      } : null,
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
        console.log('Form submission payload:', payload)
        await new Promise((resolve) => setTimeout(resolve, 800))
      }

      track('contact_submit_success', { hasCalculatorData: hasInteracted, pricing: hasInteracted ? pricing.total : null })
      setIsSubmitting(false)
      setIsSubmitted(true)
    } catch (error) {
      console.error('Submission error:', error)
      track('contact_submit_fail', { error: error.message })
      setIsSubmitting(false)
      setErrors({ submit: 'Something went wrong. Please try again.' })
    }
  }

  if (isSubmitted) {
    return (
      <section id="contact" className="contact-form section">
        <div className="container">
          <motion.div
            className="contact-form__success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="contact-form__success-icon">
              <IconCheckCircle size={48} />
            </div>
            <h3 className="contact-form__success-title">Request Sent!</h3>
            <p className="contact-form__success-text">
              Thank you, {formData.name}! We've received your request and will get back to you within 24 hours.
            </p>

            {hasInteracted && (
              <div className="contact-form__success-summary">
                <div className="contact-form__success-row">
                  <span>Your estimated investment</span>
                  <span className="contact-form__success-price">${pricing.total.toLocaleString()}</span>
                </div>
              </div>
            )}

            <div className="contact-form__next-steps">
              <h4 className="contact-form__next-steps-title">What happens next</h4>
              <ol className="contact-form__next-steps-list">
                <li>
                  <span className="contact-form__step-number">1</span>
                  <span>We read your request</span>
                </li>
                <li>
                  <span className="contact-form__step-number">2</span>
                  <span>Ask 2–3 quick questions</span>
                </li>
                <li>
                  <span className="contact-form__step-number">3</span>
                  <span>20-minute fit call</span>
                </li>
                <li>
                  <span className="contact-form__step-number">4</span>
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
              Submit Another Request
            </button>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="contact-form section">
      <div className="container">
        <motion.div
          className="contact-form__wrapper"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="contact-form__header">
            <h2 className="contact-form__title">
              Ready to <span className="gradient-text">Get Started?</span>
            </h2>
            <p className="contact-form__subtitle">
              {hasInteracted 
                ? "Send us your request and we'll confirm your session details."
                : "Request a consultation and we'll discuss how we can help your team."
              }
            </p>
          </div>

          <div className="contact-form__content">
            {hasInteracted && (
              <div className="contact-form__estimate">
                <div className="contact-form__estimate-label">Your estimated investment</div>
                <div className="contact-form__estimate-price">${pricing.total.toLocaleString()}</div>
                <div className="contact-form__estimate-config">
                  <span>{participants} participants</span>
                  <span>•</span>
                  <span>{format === 'online' ? 'Online' : 'Offline'}</span>
                </div>
              </div>
            )}

            <form className="contact-form__form" onSubmit={handleSubmit} ref={formRef}>
              {/* Honeypot */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={handleInputChange}
                className="contact-form__honeypot"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="contact-form__row">
                <div className="contact-form__group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name *"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`contact-form__input ${errors.name ? 'contact-form__input--error' : ''}`}
                  />
                  {errors.name && <span className="contact-form__error">{errors.name}</span>}
                </div>
              </div>

              <div className="contact-form__row contact-form__row--half">
                <div className="contact-form__group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`contact-form__input ${errors.email ? 'contact-form__input--error' : ''}`}
                  />
                  {errors.email && <span className="contact-form__error">{errors.email}</span>}
                </div>
                <div className="contact-form__group">
                  <input
                    type="text"
                    name="telegram"
                    placeholder="@telegram"
                    value={formData.telegram}
                    onChange={handleInputChange}
                    className={`contact-form__input ${errors.telegram ? 'contact-form__input--error' : ''}`}
                  />
                  {errors.telegram && <span className="contact-form__error">{errors.telegram}</span>}
                </div>
              </div>
              {errors.contact && <span className="contact-form__error contact-form__error--contact">{errors.contact}</span>}

              <div className="contact-form__row contact-form__row--half">
                <div className="contact-form__group">
                  <input
                    type="text"
                    name="company"
                    placeholder="Company (optional)"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="contact-form__input"
                  />
                </div>
                <div className="contact-form__group">
                  <input
                    type="text"
                    name="role"
                    placeholder="Role (optional)"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="contact-form__input"
                  />
                </div>
              </div>

              <div className="contact-form__row">
                <div className="contact-form__group">
                  <textarea
                    name="notes"
                    placeholder="Tell us about your situation (optional)"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows="3"
                    className="contact-form__input contact-form__textarea"
                  />
                </div>
              </div>

              {errors.submit && <span className="contact-form__error">{errors.submit}</span>}

              <button
                type="submit"
                className="btn btn-primary btn-large contact-form__submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Request'}
                {!isSubmitting && <IconArrowRight size={16} />}
              </button>

              <p className="contact-form__microcopy">
                Reply within 24 hours. No spam. Quick fit check first.
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ContactForm
