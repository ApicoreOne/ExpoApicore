import styles from './PasswordInput.module.scss';
import EyeOpen from "@/images/eye.svg?react";
import EyeClose from "@/images/eye-close.svg?react";
import {useState} from "react";
import {CustomInput} from "@/utils/ui/index.js";

const PasswordInput = ({ value, onChange , title}) => {

	const [showVisible, setShowVisible] = useState(false)

	return(
		<div className={styles.passwordInput}>
			<CustomInput title={title} type={showVisible ? 'text' : 'password'} onChange={onChange} value={value}/>
			<div className={styles.changeVisible} onClick={()=>{setShowVisible(!showVisible)}}>
				{
					showVisible ? <EyeOpen/> : <EyeClose/>
				}
			</div>
		</div>
	)
};

export default PasswordInput;