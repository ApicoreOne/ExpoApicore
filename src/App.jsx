import {useDispatch, useSelector} from "react-redux";
import Header from "@/components/Header/Header.jsx";
import './styles/general.scss'
import './styles/normalize.css'
import '@/styles/Modal.scss'
import Banner from "@/components/Banner/Banner.jsx";
import Exponent from "@/components/Exponent/Exponent.jsx";
import MultiModal from "@/components/MultiModal/MultiModal.jsx";
import Overlay from "@/components/Overlay/Overlay.jsx";
import {useEffect} from "react";
import Cookies from "js-cookie";
import CheckAuth from "@/components/CheckAuth/CheckAuth.jsx";
import {Toaster} from "react-hot-toast";
import {TOAST_CONFIG} from "@/utils/config.js";
import MultiPopup from "@/components/MultiPopup/MultiPopup.jsx";
import {useUrlParams} from "@/hooks/index.js";
import {Route, Routes} from "react-router-dom";
import Layout from "@/components/Layout/Layout.jsx";
import MainPage from "@/pages/MainPage/MainPage.jsx";
import Texpo4 from "@/pages/Texpo4/Texpo4.jsx";

function App() {

  const modals = useSelector(state => state.multiModal.modals)
  const dispatch = useDispatch();

  useEffect(()=>{
    const favoriteProductCookies = Cookies.get('favoriteProduct') ? JSON.parse(Cookies.get('favoriteProduct')) : []
    dispatch({type: "SET_FAVORITE_LIST", favoriteList: favoriteProductCookies})
  },[])

  const { removeParam } = useUrlParams();

  // Закрытие модального окна по нажатию на Escape
  const handleKeyDown = (event) => {

    if (event.key === 'Escape') {
      // Проходимся по массиву c конца , и если модальное окно открыто , то закрываем его и выходим с цикла
      // Метод find() находит первый открытый модал.
      const openModal = modals.slice().reverse().find(modal => modal.modalIsOpen === true);

      if (openModal) {

        dispatch({ type: "CLOSE_MODAL", modalLevel: openModal.modalLevel });
        dispatch({type: "CLEAR_EXPONENT_MEETING"})

        if(openModal.modalLevel === 1){
          removeParam('catalog')
        }
      }

      dispatch({type: "SWITCH_POPUP", popupType: null, popupIsOpen: false, currentCatalogItem: null, popupData: null})
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [modals]);

  return (
    <div className={'apicore-expo'}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path='/texpo4/' element={<Texpo4 />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
