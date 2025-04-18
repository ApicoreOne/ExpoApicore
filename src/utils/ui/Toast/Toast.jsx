import { toast } from "react-hot-toast";
import React from "react";
import CloseToast from "@/images/closeModal.svg?react";
import styles from './Toast.module.scss'

const Toast = (message, type = "success") => {
	toast((t) => (
		<span className={styles.toast}>
		    {message}
		    <button className={styles.toastClose} onClick={() => toast.dismiss(t.id)}>
					<CloseToast />
		    </button>
	  </span>
	), {type, duration: 2000} );
};

export default Toast;
