import styles from './ExpoListItems.module.scss'
import {Link} from "react-router-dom";

const ExpoListItems = ({items}) => {

	return(
		<div className={styles.expoListItems}>
			{items.map(item => {
				return(
					<Link to={`/${item.code}`} key={item.id} className={styles.expoListItem} id={item.active ? 'expo-focus' : ''}>
						<div className={styles.expoListLeft}>
							<div className={styles.expoListItemImg}>
								<img src={item.logo} alt={item.code}/>
							</div>
						</div>
						<div className={styles.expoListRight}>
							<div className={styles.expoListItemName}>{item.name}</div>
							<div className={styles.expoListItemDate}>
								<div className={styles.expoListItemStart}>
									{item.start}
								</div>
								-
								<div className={styles.expoListItemEnd}>
									{item.end}
								</div>
							</div>

							<div className={styles.expoListItemCountry}>{item.country_name}</div>
							<div className={styles.expoListItemAddress}>{item.address}</div>
							<div className={styles.expoListOrganizer}>{item.organizer}</div>

							{
								item?.partners?.length > 0 && (
									<>
										<div className={styles.expoListPartnersTitle}>{item.partners_title}</div>
										<div className={styles.expoListPartners}>
											{
												item.partners.map((partner, index) => {
													return (
														<>
															<div className={styles.expoListPartner} key={index}>
																<img src={partner.logo} alt={partner.name}/>
															</div>
														</>
													)
												})
											}
										</div>
									</>
								)
							}
						</div>
					</Link>
				)
			})}
		</div>
	)
}

export default ExpoListItems;