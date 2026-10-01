import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import TopBenefits from './components/TopBenefits/TopBenefits'
import TalkAbout from './components/TalkAbout/TalkAbout'
import HowToOrder from './components/HowToOrder/HowToOrder'
import FAQ from './components/FAQ/FAQ'
import InfoBanner from './components/InfoBanner/InfoBanner'
import FinalCTA from './components/FinalCTA/FinalCTA'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TopBenefits />
        <TalkAbout />
        <HowToOrder />
        <FAQ />
        <InfoBanner />
        <FinalCTA />
      </main>
    </>
  )
}

export default App
