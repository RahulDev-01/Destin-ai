import './App.css'
import Hero from './components/custom/Hero'
import Destinations from './components/custom/Destinations'
import Features from './components/custom/Features'
import HowItWorks from './components/custom/HowItWorks'
import Testimonials from './components/custom/Testimonials'
import FAQ from './components/custom/FAQ'
import Footer from './components/custom/Footer'

function App() {
  // Root app wrapped with BrowserRouter to support <Link> components used in Hero

  return (
    <>
      <Hero />
      <Destinations />
      <Features />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <Footer />
    </>
  )
}
// https://github.com/oykuky/Full-Stack-AI-Trip-Planner?tab=readme-ov-file#key-environment-variables
export default App
