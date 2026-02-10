import BestSeller from "../components/BestSeller"
import Category from "../components/Category"
import Hero from "../components/Hero"
import Newsletter from "../components/Newsletter"

const Home = () => {
  return (
    <div className="mt-10">
      <Hero />
      <Category />
      <BestSeller />
      <Newsletter />
    </div>
  )
}

export default Home