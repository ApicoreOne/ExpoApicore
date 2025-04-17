import {useSelector} from "react-redux";
import Header from "@/components/Header/Header.jsx";
import './styles/general.scss'
import './styles/normalize.css'
import Banner from "@/components/Banner/Banner.jsx";
import Exponent from "@/components/Exponent/Exponent.jsx";
import MultiModal from "@/components/MultiModal/MultiModal.jsx";
import Overlay from "@/components/Overlay/Overlay.jsx";

function App() {
  return (
    <div className={'apicore-expo'}>
      <MultiModal />
      <Overlay />
      <Header />
      <Banner />
      <Exponent />
    </div>
  )
}

export default App
