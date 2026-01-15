import React from 'react'
import { motion } from 'framer-motion'
import './WhenNeeded.css'

const WhenNeeded = () => {
  const triggers = [
    {
      icon: '🎯',
      title: 'Too Many Initiatives, Too Little Outcome',
      symptoms: [
        'Focus is blurry across the company',
        'Priorities change every quarter',
        'Projects start but rarely finish',
      ],
    },
    {
      icon: '🔄',
      title: 'Leadership Misalignment',
      symptoms: [
        'Team and leadership not synchronized',
        'Communication breaks down',
        'Burnout grows across teams',
      ],
    },
    {
      icon: '📉',
      title: 'Business Stagnation',
      symptoms: [
        'Old solutions no longer work',
        'No clear next steps forward',
        'Growth has plateaued',
      ],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <section id="when-needed" className="when-needed section">
      <div className="when-needed__glow"></div>
      
      <div className="container">
        <motion.div 
          className="when-needed__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="label">Signs You Need This</span>
          <h2 className="when-needed__title">
            When You Need a <span className="gradient-text">Strategic Session</span>
          </h2>
          <p className="when-needed__subtitle">
            Recognize these patterns? A facilitated session can help break through.
          </p>
        </motion.div>

        <motion.div
          className="when-needed__cards"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {triggers.map((trigger, index) => (
            <motion.div
              key={index}
              className="trigger-card"
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className="trigger-card__icon">
                {trigger.icon}
              </div>
              <h3 className="trigger-card__title">{trigger.title}</h3>
              <ul className="trigger-card__symptoms">
                {trigger.symptoms.map((symptom, idx) => (
                  <li key={idx} className="trigger-card__symptom">
                    <span className="trigger-card__bullet"></span>
                    {symptom}
                  </li>
                ))}
              </ul>
              <div className="trigger-card__glow"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default WhenNeeded
