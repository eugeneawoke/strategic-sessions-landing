import React from 'react'
import { motion } from 'framer-motion'
import './Hero.css'
import { trackCtaClick } from '../utils/analytics'
import { IconLightning, IconTarget, IconUsers, IconSparkle, IconArrowRight } from './Icons'

const Hero = () => {
  const benefits = [
    {
      icon: <IconLightning size={20} className="hero__benefit-icon-svg" />,
      text: 'Clarity on direction in 1–2 weeks',
    },
    {
      icon: <IconTarget size={20} className="hero__benefit-icon-svg" />,
      text: 'Measurable goals and key metrics',
    },
    {
      icon: <IconUsers size={20} className="hero__benefit-icon-svg" />,
      text: 'Team aligned with clear ownership',
    },
  ]

  const targetAudience = ['Owners', 'CEOs', 'C-Level', 'COO', 'CPO', 'HRD']

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <section className="hero">
      {/* Background glow effects */}
      <div className="hero__glow hero__glow--1"></div>
      <div className="hero__glow hero__glow--2"></div>
      <div className="hero__grid-bg"></div>

      <div className="hero__container">
        <motion.div
          className="hero__content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="hero__badge" variants={itemVariants}>
            <span className="hero__badge-dot"></span>
            Trusted by leadership teams worldwide
          </motion.div>

          <motion.h1 className="hero__headline" variants={itemVariants}>
            Turn Strategy Chaos
            <br />
            <span className="hero__headline-gradient">Into Focused Action</span>
          </motion.h1>
          
          <motion.p className="hero__subheadline" variants={itemVariants}>
            Facilitated strategic sessions that align your leadership team, 
            set clear priorities, and produce actionable plans—in just 1–2 days.
          </motion.p>

          <motion.ul className="hero__benefits" variants={itemVariants}>
            {benefits.map((benefit, index) => (
              <motion.li
                key={index}
                className="hero__benefit"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
              >
                <span className="hero__benefit-icon">{benefit.icon}</span>
                <span className="hero__benefit-text">{benefit.text}</span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div className="hero__audience" variants={itemVariants}>
            <span className="hero__audience-label">Designed for:</span>
            <div className="hero__audience-tags">
              {targetAudience.map((role, index) => (
                <motion.span 
                  key={role} 
                  className="hero__audience-tag"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.05 }}
                >
                  {role}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div className="hero__ctas" variants={itemVariants}>
            <button
              className="btn btn-primary btn-large hero__cta-primary"
              onClick={() => {
                trackCtaClick('hero')
                scrollToSection('calculator')
              }}
            >
              Calculate Price
              <IconArrowRight size={16} />
            </button>
            <button
              className="btn btn-secondary btn-large"
              onClick={() => {
                trackCtaClick('hero_secondary')
                scrollToSection('contact')
              }}
            >
              Request a Consultation
            </button>
          </motion.div>

          <motion.p className="hero__promise" variants={itemVariants}>
            Send an estimate request. We'll confirm scope and propose the best format.
          </motion.p>
        </motion.div>

        <motion.div
          className="hero__visual"
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero__visual-card">
            <div className="hero__visual-header">
              <div className="hero__visual-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span className="hero__visual-title">Session Outcome</span>
            </div>
            <div className="hero__visual-content">
              <div className="hero__visual-item hero__visual-item--accent">
                <span className="hero__visual-check">✓</span>
                Strategic Direction
              </div>
              <div className="hero__visual-item">
                <span className="hero__visual-check">✓</span>
                Q1 Priorities Set
              </div>
              <div className="hero__visual-item">
                <span className="hero__visual-check">✓</span>
                Team Aligned
              </div>
              <div className="hero__visual-item">
                <span className="hero__visual-check">✓</span>
                Roadmap Created
              </div>
              <div className="hero__visual-progress">
                <div className="hero__visual-progress-bar"></div>
              </div>
              <span className="hero__visual-label">Action Plan Ready</span>
            </div>
            <div className="hero__visual-glow"></div>
          </div>

          {/* Floating badges */}
          <motion.div 
            className="hero__floating-badge hero__floating-badge--1"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <span>98%</span>
            <small>Success Rate</small>
          </motion.div>
          <motion.div 
            className="hero__floating-badge hero__floating-badge--2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <span>1-2</span>
            <small>Days Only</small>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
