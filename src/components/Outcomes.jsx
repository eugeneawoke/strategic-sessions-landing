import React from 'react'
import { motion } from 'framer-motion'
import './Outcomes.css'
import { IconCompass, IconLightning, IconCalendar, IconUsers, IconBarChart } from './Icons'

const Outcomes = () => {
  const outcomes = [
    {
      icon: <IconCompass size={22} />,
      title: 'Direction becomes clear',
      description: 'Where you\'re going and why—agreed by the entire leadership team',
    },
    {
      icon: <IconLightning size={22} />,
      title: 'Priorities and key metrics are set',
      description: 'Focus points defined with measurable success criteria',
    },
    {
      icon: <IconCalendar size={22} />,
      title: 'Delayed decisions get made',
      description: 'Blockers resolved, hard choices addressed together',
    },
    {
      icon: <IconUsers size={22} />,
      title: 'Roles and ownership are clarified',
      description: 'Everyone knows who is responsible for what',
    },
    {
      icon: <IconBarChart size={22} />,
      title: 'Chaos decreases, manageability increases',
      description: 'Structured approach replaces reactive firefighting',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <section id="outcomes" className="outcomes section">
      <div className="outcomes__glow"></div>
      
      <div className="container">
        <div className="outcomes__layout">
          <motion.div 
            className="outcomes__header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="label">Results</span>
            <h2 className="outcomes__title">
              What Changes in <span className="gradient-text">1–2 Weeks</span>
            </h2>
            <p className="outcomes__subtitle">
              Tangible outcomes you can expect after a strategic session with us.
            </p>
          </motion.div>

          <motion.ul
            className="outcomes__list"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {outcomes.map((outcome, index) => (
              <motion.li
                key={index}
                className="outcome-item"
                variants={itemVariants}
                whileHover={{ x: 8, transition: { duration: 0.2 } }}
              >
                <div className="outcome-item__icon">
                  {outcome.icon}
                </div>
                <div className="outcome-item__content">
                  <h3 className="outcome-item__title">{outcome.title}</h3>
                  <p className="outcome-item__description">{outcome.description}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}

export default Outcomes
