import React from 'react'
import { motion } from 'framer-motion'
import './Trust.css'

const Trust = () => {
  const principles = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      ),
      title: 'Outcome-Driven',
      description: 'We focus on tangible results, not just facilitation. Every session ends with documented decisions and next steps.',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      title: 'Expert Facilitation',
      description: 'Neutral, structured guidance that helps your team reach alignment without getting stuck in debates.',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
        </svg>
      ),
      title: 'Clear Artifacts',
      description: 'Comprehensive documentation in your preferred format—Notion, Google Docs, Miro, or custom.',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 11 12 14 22 4"/>
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
        </svg>
      ),
      title: 'Ownership Built-In',
      description: 'Every decision and action item has a clear owner. Your team leaves ready to execute.',
    },
  ]

  const sampleDeliverables = [
    'Strategic Direction Document',
    'Priorities & Focus Areas',
    'OKRs / Goals Framework',
    'Roadmap with Milestones',
    'Ownership Matrix',
    '30-60-90 Day Action Plan',
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <section className="trust section">
      <div className="trust__glow"></div>
      
      <div className="container">
        <motion.div 
          className="trust__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="label">Our Approach</span>
          <h2 className="trust__title">
            How We <span className="gradient-text">Work</span>
          </h2>
          <p className="trust__subtitle">
            Principles that guide every strategic session we facilitate.
          </p>
        </motion.div>

        <motion.div
          className="trust__principles"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {principles.map((principle, index) => (
            <motion.div
              key={index}
              className="principle-card"
              variants={itemVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <div className="principle-card__icon">
                {principle.icon}
              </div>
              <h3 className="principle-card__title">{principle.title}</h3>
              <p className="principle-card__description">{principle.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="trust__deliverables"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="trust__deliverables-header">
            <h3 className="trust__deliverables-title">Sample Deliverables</h3>
            <p className="trust__deliverables-subtitle">
              Examples of what teams typically receive after a session.
            </p>
          </div>
          <div className="trust__deliverables-grid">
            {sampleDeliverables.map((item, index) => (
              <motion.div 
                key={index} 
                className="trust__deliverable-item"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ x: 4 }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                </svg>
                <span>{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="trust__guarantee"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="trust__guarantee-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <div className="trust__guarantee-content">
            <h4 className="trust__guarantee-title">Our Commitment</h4>
            <p className="trust__guarantee-text">
              If the session doesn't meet the agreed-upon objectives, we'll work with you until it does—at no additional cost. Your outcomes matter more than our time.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Trust
