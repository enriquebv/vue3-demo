import { createPinia } from 'pinia'
import { plugin as VueTippy } from 'vue-tippy'
import Toast from 'vue-toastification'

import router from './router'
import type { App } from 'vue'

const pinia = createPinia()

export default function installPlugins(app: App) {
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
}
