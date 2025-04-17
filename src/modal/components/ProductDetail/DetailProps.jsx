const DetailProps = ({props, itemShowCount}) => {
	return(
		<>
			<div className="i_product-detail-props-items">
				{props.map((item, index) => {
					index++;
					if(index > itemShowCount) return null
					return (
						<div key={index} className="i_product-detail-props-item">
							<div className="i_product-detail-props-item-name">
								<span>{item.name}</span>
							</div>
							<div className="i_product-detail-props-item-value">
								<span>{item.value}</span>
							</div>
						</div>
					)
				})}
			</div>
		</>
	)
}

export default DetailProps;