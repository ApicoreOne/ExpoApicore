import {useEffect, useState} from "react";
import {ExpoListItems} from "@/utils/ui/";
import styles from './ExpoList.module.scss'

const ExpoList = ({items}) => {

	const [exponentItems, setExponentItems] = useState(items)

	useEffect(() => {
		setExponentItems(items)
	}, [items]);

	return(
		<div className={styles.expoLists}>
			{exponentItems.map(item => {
				return(
					<div className={styles.expoList} data-code={item.code}>
						<div className={styles.expoListTitle}>
							<span>{item.title}</span>
						</div>
						<ExpoListItems items={item.items}/>
					</div>
				)
			})}
		</div>
	)
}

export default ExpoList;