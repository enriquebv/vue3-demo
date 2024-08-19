import './assets/main.css'
import 'vue-toastification/dist/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { plugin as VueTippy } from 'vue-tippy'
import Toast from 'vue-toastification'

import App from './App.vue'
import router from './router'
import injectDependencies from './di'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(VueTippy, {
  defaultProps: {
    theme: 'light'
  }
})
app.use(Toast, {
  position: 'bottom-center',
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: 'button',
  icon: false,
  rtl: false,
  transition: 'Vue-Toastification__fade',
  maxToasts: 1,
  newestOnTop: true
})

// Injections
injectDependencies(app)

app.mount('#app')
