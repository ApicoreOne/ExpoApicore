import styles from './Exponent.module.scss'
import {useEffect} from "react";
import {api} from "@/api/index.js";
import {ExponentItem, ShowFavorite, Wrapper} from "@/utils/ui/index.js";
import {useDispatch, useSelector} from "react-redux";
import {useURLParamWatcher} from "@/hooks/index";
import Cookies from 'js-cookie';
import ShowDistributorExponentMeet from "@/utils/ui/ShowDistributorExponentMeet/ShowDistributorExponentMeet.jsx";

const Exponent = () => {
	const dispatch = useDispatch();
	const exponentList = useSelector(state => state.exponent.exponentList)

	useURLParamWatcher('catalog', (catalogHash) => {
		// Получаем идентификатор пользователя из cookie
		const ExpoIDUser = Cookies.get('expo_user_id');
		if(catalogHash !== null){
			if(ExpoIDUser) {
				dispatch({
					type: "OPEN_MODAL",
					modalType: 'modalCatalogList',
					modalLevel: 1,
					modalData: {hash: catalogHash},
					modalWidth: 'large'
				});
			}else{
				dispatch({type: "OPEN_MODAL", modalType: 'expoRegisterUser', modalLevel : 1,  modalData: {hash: catalogHash}});
			}
		}
	})

	return(
		<Wrapper wrapperBackground={'#f7f8fa'}>
			<div className={styles.exponent}>
				<div className={styles.exponentHead}>
					<div className={styles.exponentTitle}>
						<span>Экспоненты</span>
					</div>

					<div className={styles.exponentHeadActions}>
						{/*{(authorized === true || ExpoIDUser) && <ShowDistributorExponentMeet/>}*/}
						<ShowDistributorExponentMeet />
						<ShowFavorite/>
					</div>
				</div>


				<div className={styles.exponentItems}>
					{
						exponentList?.length > 0 && exponentList.map((item, index) => {
							return (
								<ExponentItem key={index} item={item}/>
							)
						})
					}
				</div>
			</div>
		</Wrapper>
	)
}

export default Exponent;