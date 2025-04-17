import infoImg from "@/images/info.svg";
import {useSelector} from "react-redux";
import OpenCatalogs from "./components/OpenCatalogs";
import CloseCatalogs from "./components/CloseCatalogs";
import CategoryListNew from "./components/CategoryListNew";

const CategoryListMobileModal = () => {

	const categoryList = useSelector(state => state.catalog.categoryList.categoryList);

	return (
		<div className="i_modal-catalog-category">
			<div className="i_catalog-tools">
				<div className="i_catalog-tools-right">
					<OpenCatalogs/>
					<CloseCatalogs/>
				</div>
			</div>
			<div className="i_catalog-category-items">
				{
					<CategoryListNew modalLevel={2}/>
				}
				{
					categoryList.length === 0 && (
						<div className="i_catalog-category-empty">
							<div className="i_catalog-page-empty-title">
								<img src={infoImg} alt=""/>
								<span>Категории отсутствуют.</span>
							</div>
							<span>Вы можете добавить категории через&nbsp;
								<a href="https://docs.apicore.kz/dealer-api/"
								   target="_blank">Dealer API</a>
										</span>
						</div>
					)
				}
			</div>
		</div>
	)
}

export default CategoryListMobileModal;