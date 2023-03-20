import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translations: {
                'Sign Up': 'Sign Up',
                'Password mismatch': 'Password mismatch',
                'Username':'Username',
                'Display Name':'Display Name',
                'Password':'Password',
                'Password Repeat':'Password Repeat'
            }
        },
        tr: {
            translations: {
                'Sign Up': 'Kay\u0131t Ol',
                'Password mismatch': 'Ayn\u0131 şifreyi giriniz',
                'Username':'Kullan\u0131c\u0131 Ad\u0131',
                'Display Name':'Görünen Ad',
                'Password':'Şifre',
                'Password Repeat':'Şifre Tekrar\u0131'
            }
        }
    },
    fallbackLng: 'en',
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