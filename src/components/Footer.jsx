import React from 'react'
import { motion } from 'framer-motion'
import './Footer.css'

const Footer = () => {
  const scrollToSection = (id) => {
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
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
            <rect x="2" y="9" width="4" height="12"/>
            <circle cx="4" cy="4" r="2"/>
          </svg>
        ),
      },
      { 
        label: 'Telegram', 
        href: 'https://t.me/strategicsessions',
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21.198 2.433a2.242 2.242 0 0 0-1.022.215l-8.609 3.33c-2.068.8-4.133 1.598-5.724 2.21a405.15 405.15 0 0 1-2.849 1.09c-.42.147-.99.332-1.473.901-.728.855-.2 1.845.292 2.298.402.37.96.53 1.29.626.763.219 1.531.451 2.295.694.151.484.336 1.084.56 1.799.376 1.198.78 2.493 1.02 3.212l.022.076a1.52 1.52 0 0 0 .277.567c.09.118.197.226.32.32.12.092.247.162.384.21l.006.002c.118.044.235.07.35.08h.003a1.47 1.47 0 0 0 .368 0l.007-.001c.136-.013.272-.044.407-.096a1.47 1.47 0 0 0 .347-.18c.14-.094.278-.209.411-.337l.007-.007.006-.005 2.09-2.04 4.001 3.178a2.18 2.18 0 0 0 1.356.482c.296 0 .597-.053.881-.163.502-.196.918-.541 1.206-.984.27-.419.437-.907.505-1.392l1.768-12.58a2.67 2.67 0 0 0-.043-.963 2.36 2.36 0 0 0-.32-.741 2.23 2.23 0 0 0-1.62-1.1 2.19 2.19 0 0 0-.652-.003z"/>
          </svg>
        ),
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
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"/>
                <path d="M12 5l7 7-7 7"/>
              </svg>
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
                <span className="footer__logo-icon">✦</span>
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
            <p className="footer__disclaimer">
              We don't work with government institutions.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
