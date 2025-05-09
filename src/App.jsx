import {useDispatch, useSelector} from "react-redux";
import './styles/general.scss'
import './styles/normalize.css'
import '@/styles/Modal.scss'
import {useEffect} from "react";
import Cookies from "js-cookie";
import {useUrlParams} from "@/hooks/index.js";
import {Route, Routes} from "react-router-dom";
import Layout from "@/components/Layout/Layout.jsx";
import MainPage from "@/pages/MainPage/MainPage.jsx";
import ExponentPage from "@/pages/ExponentPage/[expoID].jsx";

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
          <Route path='/:expoID' element={<ExponentPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
