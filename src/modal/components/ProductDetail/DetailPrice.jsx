const DetailPrice = ({price}) => {
	return (
		<div className="i_product-detail-price">
			<div className="i_product-detail-price-items">
				<div className={`i_product-detail-price-item alone-item`}>
					<div className="i_product-detail-price-item-name">
						<span>Цена</span>
					</div>
					<div className="i_product-detail-price-item-value">
            <span>
              {price && price.print_price ? (
	              <>
		              {price.print_price}
	              </>
              ) : (
	              "Нет цены"
              )}
            </span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DetailPrice;
