import en from './trans/en.json'
import ru from './trans/ru.json'
import cn from './trans/cn.json'
import uz from './trans/uz.json'

import {initReactI18next} from "react-i18next";
import i18n from 'i18next'

const resources = {
	en:{
		translation : en
	},
	ru:{
		translation : ru
	},
	cn:{
		translation : cn
	},
	uz:{
		translation : uz
	}
}

i18n.use(initReactI18next).init({resources, lng:JSON.parse(localStorage.getItem('language')), fallbackLng:'ru'})

export default i18n;