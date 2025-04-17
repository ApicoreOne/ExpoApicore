const DetailAttribute = ({attribute}) => {
	let attributeObject = [{
		name : 'Активен', value : attribute.active === true ? 'Да' : 'Нет'
	},{
		name : 'ID', value : attribute.id
	},{
		name : 'Детальное название', value : attribute.long_name
	},{
		name : 'Штрихкод', value : attribute.barcode
	},{
		name : 'Бренд', value : attribute.vendor
	},{
		name : 'Артикул', value : attribute.vendor_code
	},{
		name : 'Внутренний код', value : attribute.inner_code
	},{
		name : 'Дистрибьютор', value : attribute.distributor_name
	}]

	return (
		<>
			<div className="i_product-detail-props-items">
				{attributeObject.map((item, index) => {
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

export default DetailAttribute;