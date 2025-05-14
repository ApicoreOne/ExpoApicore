import {useTranslation} from "react-i18next";

const DetailPrice = ({price}) => {
	const { t } = useTranslation();
	return (
		<div className="i_product-detail-price">
			<div className="i_product-detail-price-items">
				<div className={`i_product-detail-price-item alone-item`}>
					<div className="i_product-detail-price-item-name">
						<span>{t("PRODUCT_PRICE")}</span>
					</div>
					<div className="i_product-detail-price-item-value">
            <span>
              {price && price.print_price ? (
	              <>
		              {price.print_price}
	              </>
              ) : (
	              t("PRODUCT_PRICE_EMPTY")
              )}
            </span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DetailPrice;
