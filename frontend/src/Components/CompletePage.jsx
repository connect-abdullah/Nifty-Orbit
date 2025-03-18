import Navbar from './layout/Navbar'
import Hero from './layout/Hero'
import TopProducts from './product/TopProducts'
import MovingBrands from './product/MovingBrands'
import Banner from './layout/Banner'
import Footer from './layout/Footer'
import StatsComponent from './StatsComponent'

const CompletePage = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <MovingBrands/>
      <TopProducts/>
      <StatsComponent/>
      <Banner/>  
      <Footer/>

     
    </div>
  )
}

export default CompletePage
