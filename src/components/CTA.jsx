import React from 'react'
import { motion } from 'framer-motion'
import './CTA.css'
import { trackCtaClick } from '../utils/analytics'
import { IconArrowRight } from './Icons'

const CTA = () => {
  const scrollToSection = (id, source) => {
    trackCtaClick(source)
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
              onClick={() => scrollToSection('calculator', 'finalCta')}
            >
              Calculate Price
              <IconArrowRight size={16} />
            </button>
            <button
              className="btn btn-secondary btn-large"
              onClick={() => {
                trackCtaClick('finalCta_secondary')
                window.location.href = 'mailto:hello@strategicsessions.com'
              }}
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
