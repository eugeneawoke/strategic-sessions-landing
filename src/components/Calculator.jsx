import React, { useState, useMemo, createContext, useContext } from 'react'
import { motion } from 'framer-motion'
import './Calculator.css'
import { track } from '../utils/analytics'
import { IconCheck } from './Icons'

// Create context to share calculator state with ContactForm
export const CalculatorContext = createContext(null)

export const useCalculator = () => useContext(CalculatorContext)

export const CalculatorProvider = ({ children }) => {
  const [calculatorState, setCalculatorState] = useState({
    hasInteracted: false,
    participants: 8,
    format: 'online',
    addOns: {
      extraInterviews: false,
      additionalFacilitation: false,
      followUpCalls: false,
      deepDocumentation: false,
    },
    pricing: { base: 2500, addOns: 0, total: 2500 },
  })

  return (
    <CalculatorContext.Provider value={{ calculatorState, setCalculatorState }}>
      {children}
    </CalculatorContext.Provider>
  )
}

const Calculator = () => {
  const { calculatorState, setCalculatorState } = useCalculator()
  const { participants, format, addOns } = calculatorState

  // Pricing logic
  const pricing = useMemo(() => {
    let basePrice = 2500

    // Participant adjustment
    if (participants <= 7) {
      basePrice = 2500
    } else if (participants <= 10) {
      basePrice = 3200
    } else {
      basePrice = 4000
    }

    // Format adjustment
    if (format === 'offline') {
      basePrice += 800
    }

    // Add-ons
    let addOnTotal = 0
    if (addOns.extraInterviews) addOnTotal += 400
    if (addOns.additionalFacilitation) addOnTotal += 600
    if (addOns.followUpCalls) addOnTotal += 350
    if (addOns.deepDocumentation) addOnTotal += 500

    return {
      base: Math.round(basePrice),
      addOns: addOnTotal,
      total: Math.round(basePrice + addOnTotal),
    }
  }, [participants, format, addOns])

  // Update context whenever pricing changes
  React.useEffect(() => {
    setCalculatorState(prev => ({ ...prev, pricing }))
  }, [pricing, setCalculatorState])

  const handleParticipantsChange = (value) => {
    setCalculatorState(prev => ({ 
      ...prev, 
      hasInteracted: true,
      participants: value 
    }))
    track('calculator_change', { field: 'participants', value })
  }

  const handleFormatChange = (value) => {
    setCalculatorState(prev => ({ 
      ...prev, 
      hasInteracted: true,
      format: value 
    }))
    track('calculator_change', { field: 'format', value })
  }

  const handleAddOnToggle = (key) => {
    setCalculatorState(prev => ({ 
      ...prev, 
      hasInteracted: true,
      addOns: { ...prev.addOns, [key]: !prev.addOns[key] }
    }))
    track('calculator_change', { field: 'addon', addon: key, value: !addOns[key] })
  }

  const addOnOptions = [
    {
      key: 'extraInterviews',
      title: 'Extra Discovery Interviews',
      price: 400,
    },
    {
      key: 'additionalFacilitation',
      title: 'Additional Facilitation',
      price: 600,
    },
    {
      key: 'followUpCalls',
      title: 'Post-Session Follow-up',
      price: 350,
    },
    {
      key: 'deepDocumentation',
      title: 'Deep Documentation',
      price: 500,
    },
  ]

  // Calculate slider position percentage
  const sliderPercent = ((participants - 5) / (15 - 5)) * 100

  return (
    <section id="calculator" className="calculator section">
      <div className="container">
        <motion.div
          className="calculator__card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="calculator__main">
            <div className="calculator__left">
              <h2 className="calculator__title">Calculate Your Investment</h2>
              <p className="calculator__enterprise-link">
                Or <a href="mailto:hello@strategicsessions.com">talk to us</a> about custom packages.
              </p>

              {/* Base Package Info */}
              <div className="calculator__base-section">
                <h3 className="calculator__section-title">Base Package</h3>
                <div className="calculator__base-items">
                  <div className="calculator__base-item">
                    <IconCheck size={14} className="calculator__check-icon" />
                    <span>Decision-maker interview</span>
                  </div>
                  <div className="calculator__base-item">
                    <IconCheck size={14} className="calculator__check-icon" />
                    <span>Context & pain points collection</span>
                  </div>
                  <div className="calculator__base-item">
                    <IconCheck size={14} className="calculator__check-icon" />
                    <span>Custom session design</span>
                  </div>
                  <div className="calculator__base-item">
                    <IconCheck size={14} className="calculator__check-icon" />
                    <span>1-2 day facilitated session</span>
                  </div>
                  <div className="calculator__base-item">
                    <IconCheck size={14} className="calculator__check-icon" />
                    <span>Documented deliverables</span>
                  </div>
                </div>
              </div>

              {/* Participants Slider */}
              <div className="calculator__slider-section">
                <div className="calculator__slider-header">
                  <span className="calculator__slider-label">Number of participants:</span>
                  <span className="calculator__slider-value">{participants}</span>
                </div>
                <div className="calculator__slider-wrapper">
                  <input
                    type="range"
                    min="5"
                    max="15"
                    value={participants}
                    onChange={(e) => handleParticipantsChange(Number(e.target.value))}
                    className="calculator__slider"
                    style={{ '--slider-percent': `${sliderPercent}%` }}
                  />
                  <div className="calculator__slider-track">
                    <div 
                      className="calculator__slider-fill" 
                      style={{ width: `${sliderPercent}%` }}
                    />
                  </div>
                </div>
                <div className="calculator__slider-labels">
                  <span>5</span>
                  <span>10</span>
                  <span>15</span>
                </div>
              </div>

              {/* Format */}
              <div className="calculator__format-section">
                <span className="calculator__section-label">Format:</span>
                <div className="calculator__format-toggle">
                  <button
                    className={`calculator__format-btn ${format === 'online' ? 'calculator__format-btn--active' : ''}`}
                    onClick={() => handleFormatChange('online')}
                  >
                    Online
                  </button>
                  <button
                    className={`calculator__format-btn ${format === 'offline' ? 'calculator__format-btn--active' : ''}`}
                    onClick={() => handleFormatChange('offline')}
                  >
                    Offline (+$800)
                  </button>
                </div>
              </div>

              {/* Add-ons */}
              <div className="calculator__addons-section">
                <span className="calculator__section-label">Flexible add-ons:</span>
                <div className="calculator__addons-grid">
                  {addOnOptions.map((addon) => (
                    <button
                      key={addon.key}
                      className={`calculator__addon-btn ${addOns[addon.key] ? 'calculator__addon-btn--active' : ''}`}
                      onClick={() => handleAddOnToggle(addon.key)}
                    >
                      {addon.title} (+${addon.price})
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="calculator__right">
              <div className="calculator__price-display">
                <div className="calculator__price-total">
                  <span className="calculator__price-amount">${pricing.total.toLocaleString()}</span>
                  <span className="calculator__price-label">Total investment</span>
                </div>

                <div className="calculator__price-breakdown">
                  <div className="calculator__price-row">
                    <span>Base package</span>
                    <span>${pricing.base.toLocaleString()}</span>
                  </div>
                  {pricing.addOns > 0 && (
                    <div className="calculator__price-row">
                      <span>Add-ons</span>
                      <span>+${pricing.addOns.toLocaleString()}</span>
                    </div>
                  )}
                </div>

                <div className="calculator__price-config">
                  <span className="calculator__config-tag">{participants} participants</span>
                  <span className="calculator__config-tag">{format === 'online' ? 'Online' : 'Offline'}</span>
                </div>

                <p className="calculator__price-note">
                  *Final price may vary based on specific requirements. We'll confirm details during our initial call.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Calculator
