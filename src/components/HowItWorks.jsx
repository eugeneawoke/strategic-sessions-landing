import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import './HowItWorks.css'

const HowItWorks = () => {
  const containerRef = useRef(null)
  
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

  return (
    <section className="how-it-works section" ref={containerRef}>
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

        <div className="how-it-works__timeline">
          {steps.map((step, index) => (
            <TimelineStep 
              key={index} 
              step={step} 
              index={index} 
              totalSteps={steps.length}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

const TimelineStep = ({ step, index, totalSteps }) => {
  const stepRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: stepRef,
    offset: ["start end", "center center"]
  })

  const fillOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.7, 1])
  const fillScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 0.95, 1])
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <motion.div
      ref={stepRef}
      className="timeline-step"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="timeline-step__connector">
        <motion.div 
          className="timeline-step__number"
          style={{ 
            opacity: fillOpacity,
            scale: fillScale
          }}
        >
          <div className="timeline-step__number-bg"></div>
          <span className="timeline-step__number-text">{step.number}</span>
        </motion.div>
        {index < totalSteps - 1 && (
          <div className="timeline-step__line-wrapper">
            <div className="timeline-step__line-bg"></div>
            <motion.div 
              className="timeline-step__line-fill"
              style={{ height: lineHeight }}
            />
          </div>
        )}
      </div>
      <div className="timeline-step__content">
        <div className="timeline-step__header">
          <h3 className="timeline-step__title">{step.title}</h3>
          <span className="timeline-step__duration">{step.duration}</span>
        </div>
        <p className="timeline-step__description">{step.description}</p>
      </div>
    </motion.div>
  )
}

export default HowItWorks
