import InputMask from "react-input-mask";
import {useDispatch, useSelector} from "react-redux";
import HelpIcon from "@/images/info.svg?react";
import RequiredIcon from "@/images/requiered-icon.svg?react";
import styles from "./CustomInput.module.scss";
import {COUNTRY_CONFIG} from "@/utils/config.js";
import formatNumberWithSpaces from "@/utils/formatNumberWithSpaces.js";

// Кастомный инпут
const CustomInput = ({
	                     title,
	                     value,
	                     onChange,
	                     isMobile,
	                     isBin,
	                     type,
	                     isTextarea,
	                     error,
	                     helpTitle,
	                     helpTitleIsHTML,
	                     showHelpTitleInMobile,
	                     required,
	                     readOnly,
	                     maxLength,
	                     className,
	                     disabled,
	                     placeholder
                     }) => {

	const siteID = useSelector((state) => {
		const country = state.userData?.data?.country;
		return country ? country.toLowerCase() : ''; // Возвращаем пустую строку, если country не определено
	});

	const dispatch = useDispatch();

	// Используем маску для мобильных устройств если isMobile = true, иначе обычный инпут
	return (
		<div className={`${styles.input} ${className} ${disabled ? styles.disabled : ''}`}>
			<div className={styles.inputLabel}>
				<label>{title}</label>
				{required && (
					<span
						onMouseEnter={() =>
							dispatch({
								type: "SWITCH_CURSOR_HELP",
								show: true,
								content: "Обязательное поле",
							})
						}
						onMouseLeave={() => dispatch({type: "SWITCH_CURSOR_HELP", show: false})}
						className={styles.inputRequired}
					>
            <RequiredIcon/>
          </span>
				)}
				{helpTitle && (
					<div
						className={styles.inputHelpIcon}
						onMouseEnter={() =>
							dispatch({
								type: "SWITCH_CURSOR_HELP",
								show: true,
								content: helpTitle,
								isHTML: helpTitleIsHTML,
								showInMobile: showHelpTitleInMobile,
							})
						}
						onMouseLeave={() => dispatch({type: "SWITCH_CURSOR_HELP", show: false, isHTML: false, showInMobile: false})}
					>
						<HelpIcon/>
					</div>
				)}
			</div>

			{/* Маска для мобильного телефона */}
			{isMobile ? (
				<InputMask
					mask={COUNTRY_CONFIG[siteID].phone}
					value={value}
					alwaysShowMask={false}
					formatChars={{"9": "[0-9]"}}
					onChange={(e) => onChange(e.target.value)}
					readOnly={readOnly}  // Добавляем поддержку readOnly
					maxLength={maxLength}
				/>
			) : isBin ? (
				<InputMask
					mask={COUNTRY_CONFIG[siteID].bin}
					maskPlaceholder={null}
					value={value}
					alwaysShowMask={false}
					formatChars={{"9": "[0-9]"}}
					onChange={(e) => onChange(e.target.value)}
					readOnly={readOnly}  // Добавляем поддержку readOnly
					maxLength={maxLength}
				/>
			) : type === "number" ? (
				<input
					value={value}
					onChange={(e) => {
						const value = e.target.value;
						const filteredValue = value.replace(/[^+\d]/g, "");
						onChange(filteredValue);
					}}
					inputMode="numeric"
					readOnly={readOnly}  // Добавляем поддержку readOnly
					maxLength={maxLength}
				/>
			) :
			type === "price" ? (
					<InputMask
						mask=""
						value={formatNumberWithSpaces(value)}
						alwaysShowMask={false}
						onChange={(e) => {
							const onlyNumbers = e.target.value.replace(/\D/g, "");
							onChange(onlyNumbers);
						}}
						inputMode="numeric"
						readOnly={readOnly}  // Добавляем поддержку readOnly
						maxLength={maxLength}
					/>
				) :
				type === "date" ? (
				<InputMask
					mask="99.99.9999 99:99"
					placeholder="дд.мм.гггг чч:мм"
					value={value}
					onChange={(e) => onChange(e.target.value)}
					readOnly={readOnly}  // Добавляем поддержку readOnly
					maxLength={maxLength}
				/>
			) : type === 'textOnly' ?
				<input
					type="text"
					placeholder="KZT"
					value={value}
					onChange={(e) => onChange(e.target.value.replace(/[^a-zA-Z\s]/g, ''))}
					readOnly={readOnly}  // Поддержка readOnly
					maxLength={maxLength}
				/>
				: isTextarea ? (
					<div className={styles.textarea}>
						<textarea
							value={value}
							onChange={(e) => onChange(e.target.value)}
							readOnly={readOnly}  // Добавляем поддержку readOnly
							maxLength={maxLength}
						/>
					</div>

				) : (
					<input
						type={type}
						value={value}
						onChange={(e) => onChange(e.target.value)}
						readOnly={readOnly}  // Добавляем поддержку readOnly
						maxLength={maxLength}
						placeholder={placeholder}
					/>
				)}

			{/* Выводим ошибку, если она есть */}
			{error && (
				<div className={styles.inputError}>
					<span>{error}</span>
				</div>
			)}
		</div>
	);
};

export default CustomInput;
