// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import axios from 'axios'
import cfg from '../static/cfg'
import vueCookie from 'vue-cookie'

axios.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token')
  config.headers.Authorization = token
  return config
}, (err) => {
  return Promise.reject(err)
})

axios.interceptors.response.use((res) => {
  const rtk = res.headers['x-access-token']
  if (rtk) {
    vueCookie.set('token', rtk, { expires: cfg.cookie.expiresIn })
    axios.defaults.headers.common.Authorization = vueCookie.get('token')
  }
  const isAdmin = res.headers['x-is-admin']
  if (isAdmin) {
    sessionStorage.setItem('isAdmin', isAdmin)
  }
  return Promise.resolve(res)
}, (err) => {
  return Promise.reject(err)
})

Vue.prototype.$auth = {
  admin: sessionStorage.getItem('isAdmin'),
  token: vueCookie.get('token'),
  _id: vueCookie.get('user_id'),
  username: vueCookie.get('username'),
  email: vueCookie.get('userEmail'),
  destroy: function () {
    sessionStorage.removeItem('isAdmin')
    vueCookie.delete('token')
    vueCookie.delete('user_id')
    vueCookie.delete('username')
    vueCookie.delete('userEmail')
  }
}

Vue.prototype.$cookie = vueCookie
Vue.prototype.$axios = axios
Vue.prototype.$cfg = cfg

Vue.use(Vuetify)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
