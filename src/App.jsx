import {useSelector} from "react-redux";
import Header from "@/components/Header/Header.jsx";
import './styles/general.scss'
import './styles/normalize.css'
import Banner from "@/components/Banner/Banner.jsx";
import Exponent from "@/components/Exponent/Exponent.jsx";

function App() {
  return (
    <>
      <Header />
      <Banner />
      <Exponent />
    </>
  )
}

export default App
