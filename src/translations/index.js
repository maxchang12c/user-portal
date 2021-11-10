import Vue from 'vue';
import VueI18n from 'vue-i18n';

import enUS from './en';
import zhCN from './zh';


Vue.use(VueI18n);

let messages = {
  en_US: {
    ...enUS,
  },
  zh_CN: {
    ...zhCN,
  },
};

const i18n = new VueI18n({
  locale: 'en_US',
  messages,
  silentTranslationWarn: true
});

export default i18n;
