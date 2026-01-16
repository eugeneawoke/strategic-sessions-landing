import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import WhenNeeded from './components/WhenNeeded'
import Outcomes from './components/Outcomes'
import Deliverables from './components/Deliverables'
import Calculator from './components/Calculator'
import HowItWorks from './components/HowItWorks'
import Trust from './components/Trust'
import FAQ from './components/FAQ'
import CTA from './components/CTA'
import Footer from './components/Footer'
import MobileCTA from './components/MobileCTA'
import './App.css'

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Hero />
        <WhenNeeded />
        <Outcomes />
        <Deliverables />
        <Calculator />
        <HowItWorks />
        <Trust />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <MobileCTA />
    </div>
  )
}

export default App
