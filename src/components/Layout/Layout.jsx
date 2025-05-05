import {Toaster} from "react-hot-toast";
import {TOAST_CONFIG} from "@/utils/config.js";
import MultiModal from "@/components/MultiModal/MultiModal.jsx";
import MultiPopup from "@/components/MultiPopup/MultiPopup.jsx";
import Overlay from "@/components/Overlay/Overlay.jsx";
import Header from "@/components/Header/Header.jsx";
import Banner from "@/components/Banner/Banner.jsx";
import Exponent from "@/components/Exponent/Exponent.jsx";
import CheckAuth from "@/components/CheckAuth/CheckAuth.jsx";
import {Outlet} from "react-router-dom";

const Layout = () => {
	return(
		<>
			<CheckAuth>
				<Toaster toastOptions={TOAST_CONFIG}/>
				<MultiModal />
				<MultiPopup />
				<Overlay />
				<Header />
				<Outlet />
				{/*<Banner />*/}
				{/*<Exponent />*/}
			</CheckAuth>
		</>
	)
}

export default Layout;