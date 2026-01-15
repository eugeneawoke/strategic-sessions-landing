import React from 'react'
import { motion } from 'framer-motion'
import './Deliverables.css'

const Deliverables = () => {
  const deliverables = [
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2"/>
          <polyline points="2 17 12 22 22 17"/>
          <polyline points="2 12 12 17 22 12"/>
        </svg>
      ),
      title: 'Strategy or Set of Hypotheses',
      description: 'Clear strategic direction based on your context',
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      ),
      title: 'Goals, Priorities & Metrics',
      description: 'Measurable objectives with clear success criteria',
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <line x1="10" y1="9" x2="8" y2="9"/>
        </svg>
      ),
      title: 'Roadmap & Initiatives',
      description: 'Concrete steps and timeline for execution',
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      title: 'Agreements & Ownership',
      description: 'Distributed responsibility across the team',
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 11 12 14 22 4"/>
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
        </svg>
      ),
      title: 'Near-Term Action Plan',
      description: 'First 30-60-90 day implementation steps',
    },
  ]

  const formats = [
    { name: 'Notion', icon: '📝' },
    { name: 'Google Docs', icon: '📄' },
    { name: 'Miro', icon: '🎨' },
    { name: 'Custom', icon: '⚙️' },
  ]

  return (
    <section id="deliverables" className="deliverables section">
      <div className="deliverables__glow"></div>
      
      <div className="container">
        <motion.div 
          className="deliverables__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="label">What You Get</span>
          <h2 className="deliverables__title">
            Tangible <span className="gradient-text">Deliverables</span>
          </h2>
          <p className="deliverables__subtitle">
            Walk away with documented outcomes you can act on immediately.
          </p>
        </motion.div>

        <div className="deliverables__content">
          <motion.div
            className="deliverables__list"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {deliverables.map((item, index) => (
              <motion.div 
                key={index} 
                className="deliverable-item"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 8 }}
              >
                <div className="deliverable-item__icon">
                  {item.icon}
                </div>
                <div className="deliverable-item__content">
                  <h3 className="deliverable-item__title">{item.title}</h3>
                  <p className="deliverable-item__description">{item.description}</p>
                </div>
              </motion.div>
            ))}

            <div className="deliverables__formats">
              <span className="deliverables__formats-label">Delivered in your preferred format:</span>
              <div className="deliverables__formats-list">
                {formats.map((format) => (
                  <span key={format.name} className="deliverables__format">
                    {format.name}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="deliverables__preview"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="preview-card">
              <div className="preview-card__glow"></div>
              <div className="preview-card__header">
                <div className="preview-card__dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span className="preview-card__title">Deliverables Preview</span>
              </div>
              <div className="preview-card__content">
                <div className="preview-card__section">
                  <div className="preview-card__section-title">
                    <span className="preview-card__icon">📊</span>
                    Strategic Direction
                  </div>
                  <div className="preview-card__block preview-card__block--wide"></div>
                  <div className="preview-card__block preview-card__block--medium"></div>
                </div>
                <div className="preview-card__section">
                  <div className="preview-card__section-title">
                    <span className="preview-card__icon">🎯</span>
                    Q1 Priorities
                  </div>
                  <div className="preview-card__items">
                    <div className="preview-card__item">
                      <span className="preview-card__check">✓</span>
                      <div className="preview-card__block preview-card__block--line"></div>
                    </div>
                    <div className="preview-card__item">
                      <span className="preview-card__check">✓</span>
                      <div className="preview-card__block preview-card__block--line"></div>
                    </div>
                    <div className="preview-card__item">
                      <span className="preview-card__check">✓</span>
                      <div className="preview-card__block preview-card__block--line"></div>
                    </div>
                  </div>
                </div>
                <div className="preview-card__section">
                  <div className="preview-card__section-title">
                    <span className="preview-card__icon">📅</span>
                    Roadmap
                  </div>
                  <div className="preview-card__timeline">
                    <div className="preview-card__timeline-bar">
                      <div className="preview-card__timeline-segment" style={{ width: '30%', background: 'var(--gradient-primary)' }}></div>
                      <div className="preview-card__timeline-segment" style={{ width: '40%', background: 'var(--color-primary-dark)' }}></div>
                      <div className="preview-card__timeline-segment" style={{ width: '30%', background: 'var(--color-primary-darker)' }}></div>
                    </div>
                    <div className="preview-card__timeline-labels">
                      <span>Week 1-4</span>
                      <span>Month 2-3</span>
                      <span>Q2</span>
                    </div>
                  </div>
                </div>
                <div className="preview-card__section">
                  <div className="preview-card__section-title">
                    <span className="preview-card__icon">👥</span>
                    Ownership Matrix
                  </div>
                  <div className="preview-card__matrix">
                    <div className="preview-card__matrix-row">
                      <div className="preview-card__avatar">JD</div>
                      <div className="preview-card__block preview-card__block--line"></div>
                    </div>
                    <div className="preview-card__matrix-row">
                      <div className="preview-card__avatar">MK</div>
                      <div className="preview-card__block preview-card__block--line"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Deliverables
