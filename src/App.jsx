import {useDispatch, useSelector} from "react-redux";
import Header from "@/components/Header/Header.jsx";
import './styles/general.scss'
import './styles/normalize.css'
import Banner from "@/components/Banner/Banner.jsx";
import Exponent from "@/components/Exponent/Exponent.jsx";
import MultiModal from "@/components/MultiModal/MultiModal.jsx";
import Overlay from "@/components/Overlay/Overlay.jsx";
import {useEffect} from "react";

function App() {

  const modals = useSelector(state => state.multiModal.modals)
  const dispatch = useDispatch()

  // Закрытие модального окна по нажатию на Escape
  const handleKeyDown = (event) => {

    if (event.key === 'Escape') {
      // Проходимся по массиву c конца , и если модальное окно открыто , то закрываем его и выходим с цикла
      // Метод find() находит первый открытый модал.
      const openModal = modals.slice().reverse().find(modal => modal.modalIsOpen === true);

      if (openModal) {

        dispatch({ type: "CLOSE_MODAL", modalLevel: openModal.modalLevel });
      }

      dispatch({type: "SWITCH_POPUP", popupType: null, popupIsOpen: false, currentCatalogItem: null})
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
      <MultiModal />
      <Overlay />
      <Header />
      <Banner />
      <Exponent />
    </div>
  )
}

export default App
