const DetailQuantity = ({quantity}) => {
	return(
		<div className="i_product-detail-quantity">
			<div className="i_product-detail-quantity-item">
				<div className="i_product-detail-quantity-item-name"><span>Остаток</span>
				</div>
				<div className="i_product-detail-quantity-item-value"><span>{quantity.order ? 'на заказ' : quantity.quantity + ' шт'}</span></div>
			</div>
		</div>
	)
}

export default DetailQuantity;