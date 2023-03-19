import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translations: {
                'Sign Up': 'Sign Up',
                'Password mismatch': 'Password mismatch'
            }
        },
        tr: {
            translations: {
                'Sign Up': 'Kay\u0131t Ol',
                'Password mismatch': 'Ayn\u0131 şifreyi giriniz'
            }
        }
    },
    fallbackLng: 'tr',
    ns: ['translations'],
    defaultNS: ['translations'],
    keySeperator: false,
    interpolation: {
        espaceValue: false,
        formatSeperator: ','
    },
    react: {
        wait: true
    }
});

export default i18n;