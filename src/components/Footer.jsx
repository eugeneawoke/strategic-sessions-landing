import React from 'react'
import { motion } from 'framer-motion'
import './Footer.css'
import { trackCtaClick } from '../utils/analytics'
import { IconSparkle, IconArrowRight, IconLinkedIn, IconTelegram } from './Icons'

const Footer = () => {
  const scrollToSection = (id) => {
    trackCtaClick('footer')
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const footerLinks = {
    services: [
      { label: 'Strategic Sessions', href: '#when-needed' },
      { label: 'Session Preparation', href: '#' },
      { label: 'Follow-up Support', href: '#' },
      { label: 'Pricing Calculator', href: '#calculator' },
    ],
    contact: [
      { label: 'hello@strategicsessions.com', href: 'mailto:hello@strategicsessions.com' },
      { label: 'Telegram', href: 'https://t.me/strategicsessions' },
      { label: 'Minsk, Belarus', href: '#' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Data Processing', href: '#' },
    ],
    social: [
      { 
        label: 'LinkedIn', 
        href: 'https://linkedin.com',
        icon: <IconLinkedIn size={20} />,
      },
      { 
        label: 'Telegram', 
        href: 'https://t.me/strategicsessions',
        icon: <IconTelegram size={20} />,
      },
    ],
  }

  return (
    <footer className="footer">
      {/* Top CTA Section */}
      <div className="footer__cta">
        <div className="container">
          <div className="footer__cta-content">
            <h3 className="footer__cta-title">
              Let's build clarity for your team.
            </h3>
            <button
              className="btn btn-primary btn-large"
              onClick={() => scrollToSection('calculator')}
            >
              Calculate Price
              <IconArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="footer__main">
        <div className="container">
          <div className="footer__grid">
            {/* Brand Column */}
            <div className="footer__brand">
              <a href="#" className="footer__logo">
                <IconSparkle size={20} className="footer__logo-icon" />
                Strategic Sessions
              </a>
              <p className="footer__tagline">
                Facilitated strategic sessions for leadership teams. 
                Clear direction, aligned priorities, actionable outcomes.
              </p>
              <div className="footer__social">
                {footerLinks.social.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="footer__social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Services Column */}
            <div className="footer__column">
              <h4 className="footer__column-title">Services</h4>
              <ul className="footer__links">
                {footerLinks.services.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="footer__link">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Column */}
            <div className="footer__column">
              <h4 className="footer__column-title">Contact</h4>
              <ul className="footer__links">
                {footerLinks.contact.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="footer__link">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Column */}
            <div className="footer__column">
              <h4 className="footer__column-title">Legal</h4>
              <ul className="footer__links">
                {footerLinks.legal.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="footer__link">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer__bottom">
        <div className="container">
          <div className="footer__bottom-content">
            <p className="footer__copyright">
              © 2026 Strategic Sessions. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
