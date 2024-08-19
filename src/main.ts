import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// Plugins
import { plugin as VueTippy } from 'vue-tippy'
import injectDependencies from './di'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)

// Install plugins
app.use(VueTippy, {
  defaultProps: {
    theme: 'light'
  }
})

// Injections
injectDependencies(app)

app.mount('#app')
