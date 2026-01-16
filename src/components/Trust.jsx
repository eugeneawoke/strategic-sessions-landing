import React from 'react'
import { motion } from 'framer-motion'
import './Trust.css'
import { IconCheckCircle, IconUsers, IconFileText, IconCheck, IconShield } from './Icons'

const Trust = () => {
  const principles = [
    {
      icon: <IconCheckCircle size={24} />,
      title: 'Outcome-Driven',
      description: 'We focus on tangible results, not just facilitation. Every session ends with documented decisions and next steps.',
    },
    {
      icon: <IconUsers size={24} />,
      title: 'Expert Facilitation',
      description: 'Neutral, structured guidance that helps your team reach alignment without getting stuck in debates.',
    },
    {
      icon: <IconFileText size={24} />,
      title: 'Clear Artifacts',
      description: 'Comprehensive documentation in your preferred format—Notion, Google Docs, Miro, or custom.',
    },
    {
      icon: <IconCheck size={24} />,
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
                <IconFileText size={16} />
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
            <IconShield size={24} />
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
