import React from 'react'
import { motion } from 'framer-motion'
import './HowItWorks.css'

const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      title: 'Decision-Maker Interview',
      description: 'We start with a deep-dive conversation with the key decision maker to understand context, challenges, and expectations.',
      duration: '1-2 hours',
    },
    {
      number: '02',
      title: 'Context & Pain Points Collection',
      description: 'Gather input from key stakeholders through interviews or surveys to map the full picture.',
      duration: '2-5 days',
    },
    {
      number: '03',
      title: 'Session Design',
      description: 'We design a custom agenda and facilitation plan tailored to your specific goals and team dynamics.',
      duration: '2-3 days',
    },
    {
      number: '04',
      title: 'Run the Session',
      description: 'Facilitated strategic session with your leadership team. Focused work, structured discussions, clear outputs.',
      duration: '1-2 days',
    },
    {
      number: '05',
      title: 'Deliverables & Support',
      description: 'Document all decisions, agreements, and next steps. Optional follow-up support to ensure execution.',
      duration: '3-5 days',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  }

  const stepVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <section className="how-it-works section">
      <div className="how-it-works__glow"></div>
      
      <div className="container">
        <motion.div 
          className="how-it-works__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="label">Process</span>
          <h2 className="how-it-works__title">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="how-it-works__subtitle">
            A structured approach to designing and running effective strategic sessions.
          </p>
        </motion.div>

        <motion.div
          className="how-it-works__timeline"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="timeline-step"
              variants={stepVariants}
            >
              <div className="timeline-step__connector">
                <div className="timeline-step__number">{step.number}</div>
                {index < steps.length - 1 && <div className="timeline-step__line"></div>}
              </div>
              <div className="timeline-step__content">
                <div className="timeline-step__header">
                  <h3 className="timeline-step__title">{step.title}</h3>
                  <span className="timeline-step__duration">{step.duration}</span>
                </div>
                <p className="timeline-step__description">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="how-it-works__note"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="16" x2="12" y2="12"/>
            <line x1="12" y1="8" x2="12.01" y2="8"/>
          </svg>
          <span>Decision maker participation is required throughout the process.</span>
        </motion.div>
      </div>
    </section>
  )
}

export default HowItWorks
