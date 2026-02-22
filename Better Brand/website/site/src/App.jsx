import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Philosophy from './components/Philosophy'
import Protocol from './components/Protocol'
import GetStarted from './components/GetStarted'
import Footer from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  return (
    <div className="relative">
      <Navbar />
      <Hero />
      <Features />
      <Philosophy />
      <Protocol />
      <GetStarted />
      <Footer />
    </div>
  )
}
