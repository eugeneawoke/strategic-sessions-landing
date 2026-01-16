import React from 'react'
import { motion } from 'framer-motion'
import './Deliverables.css'
import { IconLayers, IconTarget, IconFileText, IconUsers, IconCheckCircle, IconGear, IconBarChart, IconCalendar, IconCheck } from './Icons'

const Deliverables = () => {
  const deliverables = [
    {
      icon: <IconLayers size={20} />,
      title: 'Strategy or Set of Hypotheses',
      description: 'Clear strategic direction based on your context',
    },
    {
      icon: <IconTarget size={20} />,
      title: 'Goals, Priorities & Metrics',
      description: 'Measurable objectives with clear success criteria',
    },
    {
      icon: <IconFileText size={20} />,
      title: 'Roadmap & Initiatives',
      description: 'Concrete steps and timeline for execution',
    },
    {
      icon: <IconUsers size={20} />,
      title: 'Agreements & Ownership',
      description: 'Distributed responsibility across the team',
    },
    {
      icon: <IconCheckCircle size={20} />,
      title: 'Near-Term Action Plan',
      description: 'First 30-60-90 day implementation steps',
    },
  ]

  const formats = [
    { name: 'Notion', icon: <IconFileText size={16} /> },
    { name: 'Google Docs', icon: <IconFileText size={16} /> },
    { name: 'Miro', icon: <IconLayers size={16} /> },
    { name: 'Custom', icon: <IconGear size={16} /> },
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
                    <IconBarChart size={18} className="preview-card__icon" />
                    Strategic Direction
                  </div>
                  <div className="preview-card__block preview-card__block--wide"></div>
                  <div className="preview-card__block preview-card__block--medium"></div>
                </div>
                <div className="preview-card__section">
                  <div className="preview-card__section-title">
                    <IconTarget size={18} className="preview-card__icon" />
                    Q1 Priorities
                  </div>
                  <div className="preview-card__items">
                    <div className="preview-card__item">
                      <IconCheck size={14} className="preview-card__check" />
                      <div className="preview-card__block preview-card__block--line"></div>
                    </div>
                    <div className="preview-card__item">
                      <IconCheck size={14} className="preview-card__check" />
                      <div className="preview-card__block preview-card__block--line"></div>
                    </div>
                    <div className="preview-card__item">
                      <IconCheck size={14} className="preview-card__check" />
                      <div className="preview-card__block preview-card__block--line"></div>
                    </div>
                  </div>
                </div>
                <div className="preview-card__section">
                  <div className="preview-card__section-title">
                    <IconCalendar size={18} className="preview-card__icon" />
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
                    <IconUsers size={18} className="preview-card__icon" />
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
