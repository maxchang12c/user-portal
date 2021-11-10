import Vue from 'vue'
import App from './App.vue'
import router from './router';
import i18n from './translations';
import vuetify from './plugins/vuetify'
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import './plugins/validators';


Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);

Vue.config.productionTip = false;

new Vue({
  i18n,
  router,
  render: h => h(App),
  vuetify,
}).$mount('#app')
