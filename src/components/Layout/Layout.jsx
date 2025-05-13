import {Toaster} from "react-hot-toast";
import {TOAST_CONFIG} from "@/utils/config.js";
import MultiModal from "@/components/MultiModal/MultiModal.jsx";
import MultiPopup from "@/components/MultiPopup/MultiPopup.jsx";
import Overlay from "@/components/Overlay/Overlay.jsx";
import Header from "@/components/Header/Header.jsx";
import CheckAuth from "@/components/CheckAuth/CheckAuth.jsx";
import {Outlet, useHref} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch} from "react-redux";

const Layout = () => {
	const href = useHref();
	const dispatch = useDispatch();

	useEffect(() => {
		if(href === '/') {
			console.log(123)
			dispatch({type: "CLEAR_EXPONENT_DATA"});
		}
	}, [href]);

	return(
		<>
			<CheckAuth>
				<Toaster toastOptions={TOAST_CONFIG}/>
				<MultiModal />
				<MultiPopup />
				<Overlay />
				<Header />
				<Outlet />
			</CheckAuth>
		</>
	)
}

export default Layout;