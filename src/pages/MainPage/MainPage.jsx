import {useEffect, useState} from "react";
import {api} from "@/api/index.js";

const MainPage = () => {

	const [exponentItems, setExponentItems] = useState(null);

	const getData = async() => {
		try{
			const response = await api.exponentApi.getExpoList()

			setExponentItems(response.expo)
			console.log(response)
		}catch (e) {
			console.log(e)
		}
	}

	useEffect(() => {
		getData()
	}, []);


	return(
		<>
			{exponentItems?.map(item => {
				return(
					<>
						{item.code}
						{item.name}
						{item.start}
						{item.end}
					</>
				)
			})}
		</>
	)
}

export default MainPage;