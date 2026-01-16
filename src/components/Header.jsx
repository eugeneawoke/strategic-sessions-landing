import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Header.css'
import { trackCtaClick } from '../utils/analytics'
import { IconSparkle } from './Icons'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '#when-needed', label: 'When Needed' },
    { href: '#outcomes', label: 'Outcomes' },
    { href: '#deliverables', label: 'Deliverables' },
    { href: '#calculator', label: 'Calculator' },
    { href: '#faq', label: 'FAQ' },
  ]

  const scrollToCalculator = (source = 'nav') => {
    trackCtaClick(source)
    const element = document.getElementById('calculator')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      // Focus first interactive element for accessibility
      setTimeout(() => {
        const firstInput = element.querySelector('input[type="range"]')
        if (firstInput) firstInput.focus()
      }, 500)
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <motion.header 
        className={`header ${isScrolled ? 'header--scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="header__container">
          <a href="#" className="header__logo">
            <IconSparkle size={20} className="header__logo-icon" />
            Strategic Sessions
          </a>

          <nav className="header__nav">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="header__nav-link"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button className="header__cta btn btn-primary" onClick={() => scrollToCalculator('nav')}>
            Calculate Price
          </button>

          <button
            className="header__mobile-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`hamburger ${isMobileMenuOpen ? 'hamburger--active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="mobile-menu__nav">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="mobile-menu__link"
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.button
                className="mobile-menu__cta btn btn-primary btn-large"
                onClick={() => scrollToCalculator('mobileMenu')}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Calculate Price
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header
