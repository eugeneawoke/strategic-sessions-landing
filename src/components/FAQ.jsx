import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './FAQ.css'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: 'We don\'t have time for a 2-day session. Can it be shorter?',
      answer: 'Yes, sessions can be condensed to 1 day or split into multiple shorter blocks. The key is having enough focused time to reach meaningful decisions. We\'ll design the format that works best for your schedule while ensuring quality outcomes.',
    },
    {
      question: 'We\'ve tried strategic sessions before and they didn\'t work. How is this different?',
      answer: 'Most sessions fail because they lack proper preparation, clear facilitation, or follow-through. We invest significant time in pre-session discovery to understand your real challenges. During the session, we use structured frameworks to drive decisions—not just discussions. And we don\'t disappear after—you get documented outcomes and optional follow-up support.',
    },
    {
      question: 'Our team isn\'t ready or aligned enough for a strategic session.',
      answer: 'That\'s often exactly when a session is most valuable. We design sessions specifically to surface misalignment and create shared understanding. The pre-session interviews help us understand tension points and design exercises that address them constructively.',
    },
    {
      question: 'What should we prepare before the session?',
      answer: 'Very little. The key decision maker will participate in a 1-2 hour interview, and we may conduct additional stakeholder interviews. We\'ll gather any existing strategy documents, metrics, or context you have. The goal is to minimize your prep burden while ensuring we have the context to be effective.',
    },
    {
      question: 'How are decisions documented and fixed?',
      answer: 'All decisions, action items, and agreements are captured in real-time during the session. Within 3-5 days after, you receive a comprehensive document package including: strategic direction, priorities, roadmap, ownership assignments, and near-term action plan. We deliver in your preferred format—Notion, Google Docs, Miro, or custom.',
    },
    {
      question: 'Who needs to attend the session?',
      answer: 'At minimum: the key decision maker (CEO/founder) and relevant leadership team members (typically 5-15 people). Everyone who will be responsible for executing decisions should be present. We can advise on the right participant mix based on your goals.',
    },
    {
      question: 'What does pricing depend on?',
      answer: 'Base pricing depends on team size, session format (online/offline), and geography. Add-ons like extra discovery interviews, extended facilitation, post-session follow-up calls, and comprehensive documentation can be added based on your needs. Use our calculator for an instant estimate, or request a consultation for a custom quote.',
    },
    {
      question: 'What happens after I submit a request?',
      answer: 'Within 24 hours, we\'ll reach out to schedule a brief discovery call (15-30 min). We\'ll discuss your situation, goals, and answer any questions. If there\'s a fit, we\'ll send a detailed proposal with timeline and exact pricing. No commitment until you\'re ready.',
    },
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="faq section">
      <div className="faq__glow"></div>
      
      <div className="container">
        <motion.div 
          className="faq__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="label">FAQ</span>
          <h2 className="faq__title">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="faq__subtitle">
            Common questions about strategic sessions.
          </p>
        </motion.div>

        <motion.div 
          className="faq__list"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className={`faq-item ${openIndex === index ? 'faq-item--open' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <button
                className="faq-item__question"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                <span>{faq.question}</span>
                <div className="faq-item__icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"/>
                    <line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                </div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    className="faq-item__answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p>{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default FAQ
