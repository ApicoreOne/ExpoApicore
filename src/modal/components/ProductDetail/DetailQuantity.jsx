import {useTranslation} from "react-i18next";

const DetailQuantity = ({quantity}) => {

	const { t } = useTranslation();

	return(
		<div className="i_product-detail-quantity">
			<div className="i_product-detail-quantity-item">
				<div className="i_product-detail-quantity-item-name"><span>{t("PRODUCT_QUANTITY")}</span></div>
				<div className="i_product-detail-quantity-item-value"><span>{quantity.order ? t("ORDER_TITLE_LOWERCASE") : quantity.quantity + t("PRODUCT_UNIT")}</span></div>
			</div>
		</div>
	)
}

export default DetailQuantity;