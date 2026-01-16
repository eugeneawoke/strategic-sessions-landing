import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './MobileCTA.css'
import { trackCtaClick } from '../utils/analytics'
import { IconArrowRight } from './Icons'

const MobileCTA = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero (approximately 100vh)
      const heroHeight = window.innerHeight
      setIsVisible(window.scrollY > heroHeight * 0.6)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToCalculator = () => {
    trackCtaClick('mobileSticky')
    const element = document.getElementById('calculator')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="mobile-cta"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <button
            className="btn btn-primary btn-large"
            onClick={scrollToCalculator}
          >
            Calculate Price
            <IconArrowRight size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default MobileCTA
