import React, { useEffect, useRef, useMemo } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Testimonials.css'

gsap.registerPlugin(ScrollTrigger)

const Testimonials = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const cloudRef = useRef(null)

  useEffect(() => {
    gsap.from(titleRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    })

    const testimonials = cloudRef.current?.querySelectorAll('.testimonial-item')
    if (testimonials) {
      testimonials.forEach((item, index) => {
        gsap.from(item, {
          opacity: 0,
          scale: 0.8,
          duration: 0.6,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none'
          }
        })
      })
    }
  }, [])

  const testimonials = [
    { text: 'Strategic sessions helped us see new opportunities', author: 'Anna K.', role: 'CEO' },
    { text: 'Incredibly effective approach to planning', author: 'Dmitry S.', role: 'Founder' },
    { text: 'Our business really took off after these sessions', author: 'Maria V.', role: 'CMO' },
    { text: 'Professional and results-driven', author: 'Ivan P.', role: 'Director' },
    { text: 'Best investment in company development', author: 'Elena R.', role: 'COO' },
    { text: 'We found solutions we never even thought of', author: 'Sergey M.', role: 'CTO' },
    { text: 'Exceeded all expectations', author: 'Olga T.', role: 'VP Strategy' },
    { text: 'Strategy became clear and understandable', author: 'Alexey N.', role: 'Head of Growth' },
    { text: 'I recommend to everyone who wants to grow', author: 'Tatyana L.', role: 'CEO' },
    { text: 'Visualization tools are simply amazing', author: 'Pavel K.', role: 'Founder' },
    { text: 'Fast and high quality', author: 'Yulia D.', role: 'CMO' },
    { text: 'Results exceeded expectations', author: 'Nikolay B.', role: 'Director' }
  ]

  const testimonialPositions = useMemo(() => {
    return testimonials.map((_, index) => {
      const angle = (index / testimonials.length) * Math.PI * 2
      const radius = 25 + (index % 4) * 12
      const centerX = 50
      const centerY = 50
      
      const x = centerX + Math.cos(angle) * radius + (Math.random() - 0.5) * 15
      const y = centerY + Math.sin(angle) * radius + (Math.random() - 0.5) * 15
      
      return {
        x: Math.max(2, Math.min(98, x)),
        y: Math.max(2, Math.min(98, y)),
        size: 0.7 + (index % 5) * 0.08,
        delay: (index * 0.3) % 2
      }
    })
  }, [])

  return (
    <section ref={sectionRef} className="testimonials">
      <div className="testimonials-container">
        <h2 ref={titleRef} className="testimonials-title">
          Tell your <span className="highlight">Story</span>
        </h2>
        <p className="testimonials-subtitle">
          Join our vibrant community of creators, artists, and marketers who use Strategic Sessions 
          to tell stories that connect with their audiences.
        </p>

        <div ref={cloudRef} className="testimonials-cloud">
          {testimonials.map((testimonial, index) => {
            const pos = testimonialPositions[index]
            return (
            <div
              key={index}
              className="testimonial-item"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                '--size': pos.size,
                animationDelay: `${pos.delay}s`
              }}
            >
              <div className="testimonial-bubble">
                <p className="testimonial-text">"{testimonial.text}"</p>
                <div className="testimonial-author">
                  <span className="author-name">{testimonial.author}</span>
                  <span className="author-role">{testimonial.role}</span>
                </div>
              </div>
            </div>
            )
          })}
        </div>

        <div className="testimonials-cta">
          <a href="#discord" className="cta-link">Join our Discord</a>
          <a href="#get-started" className="cta-button">Get Started</a>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
