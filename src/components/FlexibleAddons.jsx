import React from 'react'
import { motion } from 'framer-motion'
import './FlexibleAddons.css'
import { IconMagnifier, IconClock, IconLayers, IconFileText } from './Icons'

const FlexibleAddons = () => {
  const addons = [
    {
      icon: <IconMagnifier size={24} />,
      title: 'Extra Discovery Interviews',
      description: 'Additional stakeholder interviews to gather deeper context and diverse perspectives.',
    },
    {
      icon: <IconClock size={24} />,
      title: 'Additional Facilitation',
      description: 'Extended session time (+half day) for complex topics requiring more discussion.',
    },
    {
      icon: <IconLayers size={24} />,
      title: 'Post-Session Follow-up',
      description: '3 follow-up calls over 30 days to support implementation and answer questions.',
    },
    {
      icon: <IconFileText size={24} />,
      title: 'Deep Documentation',
      description: 'Comprehensive deliverables with detailed documentation of all outcomes and decisions.',
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <section className="flexible-addons section">
      <div className="container">
        <motion.div 
          className="flexible-addons__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="flexible-addons__title">Flexible add-ons</h2>
          <p className="flexible-addons__subtitle">
            Extend the value of your strategic session with these optional add-ons.
          </p>
        </motion.div>

        <motion.div
          className="flexible-addons__grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {addons.map((addon, index) => (
            <motion.div
              key={index}
              className="addon-card"
              variants={itemVariants}
            >
              <div className="addon-card__icon">
                {addon.icon}
              </div>
              <h3 className="addon-card__title">{addon.title}</h3>
              <p className="addon-card__description">{addon.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default FlexibleAddons
