import React from 'react'
import { motion } from 'framer-motion'
import './CTA.css'

const CTA = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="contact" className="cta section">
      <div className="cta__glow"></div>
      
      <div className="container">
        <motion.div
          className="cta__content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="cta__content-glow"></div>
          <h2 className="cta__title">
            Ready to Align Your Team<br />
            and <span className="gradient-text">Move Forward?</span>
          </h2>
          <p className="cta__subtitle">
            Get a personalized estimate in 2 minutes. No commitment required.
          </p>
          <div className="cta__buttons">
            <button
              className="btn btn-primary btn-large"
              onClick={() => scrollToSection('calculator')}
            >
              Calculate Price
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"/>
                <path d="M12 5l7 7-7 7"/>
              </svg>
            </button>
            <button
              className="btn btn-secondary btn-large"
              onClick={() => window.location.href = 'mailto:hello@strategicsessions.com'}
            >
              Request a Consultation
            </button>
          </div>
          <p className="cta__note">
            Typical response time: within 24 hours
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default CTA
