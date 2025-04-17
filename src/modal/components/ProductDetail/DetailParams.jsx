const DetailParams = ({params, itemShowCount}) => {
	let paramsObject = [{
		name : 'Ширина товара', value : params.width
	},{
		name : 'Высота товара', value : params.height
	},{
		name : 'Длина товара', value : params.length
	},{
		name : 'Единица измерения размеров', value : params.dimensions_unit
	},{
		name : 'Вес товара', value : params.weight
	},{
		name : 'Единица измерения веса', value : params.weight_unit
	}]
	return (
		<>
			<div className="i_product-detail-props-items">
				{paramsObject.map((item, index) => {
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

export default DetailParams;