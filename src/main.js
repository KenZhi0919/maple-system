import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from '@/i18n'
import { example } from '@/plugins'
import VueLoading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import 'bootstrap/dist/js/bootstrap.js'
import Notifications from '@kyvg/vue3-notification'

import { defineRule, configure } from 'vee-validate'
import { between, required, digits } from '@vee-validate/rules'
import { localize } from '@vee-validate/i18n'
import vue3GoogleLogin from 'vue3-google-login'
// define global rules
defineRule('required', required)
defineRule('between', between)
defineRule('digits', digits)

configure({
  // create and set a localization handler
  generateMessage: localize('zh-TW', {
    messages: {
      // interpolates the field name
      required: '必填',
      // interpolates the min, max params
      between: '{field} 須介於 0:{min} ~ 1:{max}',
      // Interpolates another field value in the form
      digits: '{field} 必須是數字',
    },
  }),
})

createApp(App)
  .use(store)
  .use(router)
  .use(i18n)
  .use(example)
  .use(vue3GoogleLogin, {
    clientId:
      '922847161487-8h08c0cbtttcvshn19eg199vek0r4qu9.apps.googleusercontent.com',
  })
  .use(VueLoading, {
    color: '#EB7547',
    loader: 'bars',
    height: 100,
    width: 100,
  })
  .use(Notifications)
  .mount('#app')
