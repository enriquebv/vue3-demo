import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Plugins
import { plugin as VueTippy } from 'vue-tippy'

const app = createApp(App)

app.use(router)

// Install plugins
app.use(VueTippy, {
  defaultProps: {
    theme: 'light'
  }
})

app.mount('#app')
