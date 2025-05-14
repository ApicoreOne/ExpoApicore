import infoImg from "@/images/info.svg";
import {useSelector} from "react-redux";
import OpenCatalogs from "./components/OpenCatalogs";
import CloseCatalogs from "./components/CloseCatalogs";
import CategoryListNew from "./components/CategoryListNew";
import {useTranslation} from "react-i18next";

const CategoryListMobileModal = () => {

	const categoryList = useSelector(state => state.catalog.categoryList.categoryList);
	const {t} = useTranslation();
	return (
		<div className="i_modal-catalog-category">
			<div className="i_catalog-tools">
				<div className="i_catalog-tools-right">
					<OpenCatalogs/>
					<CloseCatalogs/>
				</div>
			</div>
			<div className="i_catalog-category-items">
				<CategoryListNew modalLevel={2}/>
				{
					categoryList.length === 0 && (
						<div className="i_catalog-category-empty">
							<div className="i_catalog-page-empty-title">
								<img src={infoImg} alt=""/>
								<span>{t("CATEGORIES_EMPTY")}</span>
							</div>
						</div>
					)
				}
			</div>
		</div>
	)
}

export default CategoryListMobileModal;