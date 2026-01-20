import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import WhenNeeded from './components/WhenNeeded'
import Outcomes from './components/Outcomes'
import Deliverables from './components/Deliverables'
import Calculator, { CalculatorProvider } from './components/Calculator'
import FlexibleAddons from './components/FlexibleAddons'
import HowItWorks from './components/HowItWorks'
import ContactForm from './components/ContactForm'
import Trust from './components/Trust'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import MobileCTA from './components/MobileCTA'
import './App.css'

function App() {
  return (
    <CalculatorProvider>
      <div className="App">
        <Header />
        <main>
          <Hero />
          <WhenNeeded />
          <Outcomes />
          <Deliverables />
          <Calculator />
          <FlexibleAddons />
          <HowItWorks />
          <ContactForm />
          <Trust />
          <FAQ />
        </main>
        <Footer />
        <MobileCTA />
      </div>
    </CalculatorProvider>
  )
}

export default App
