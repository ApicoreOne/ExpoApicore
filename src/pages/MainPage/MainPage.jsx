import {useEffect, useState} from "react";
import {api} from "@/api/index.js";
import {useDispatch} from "react-redux";
import ExpoList from "@/components/ExpoList/ExpoList.jsx";
import styles from './MainPage.module.scss'
import {Wrapper} from "@/utils/ui/index.js";

const MainPage = () => {

	const [exponentList, setExponentList] = useState([]);

	const dispatch = useDispatch()

	const getData = async() => {
		try{
			const response = await api.exponentApi.getExpoList()

			if(response.status === true){
				setExponentList(response.expo.expo_list)
				dispatch({type: "SET_HEADER_MONTHS", headerMonths: response.expo.months})
			}

		}catch (e) {
			console.log(e)
		}
	}

	useEffect(() => {
		getData()
	}, []);


	return(
		<div className={styles.main}>
			<Wrapper wrapperBackground={'rgb(247, 248, 250)'}>
					{
						exponentList.length > 0 && (
							<ExpoList items={exponentList}/>
						)
					}
			</Wrapper>
		</div>
	)
}

export default MainPage;