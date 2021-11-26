import { createApp } from "vue"
import App from "./App.vue"
import "normalize.css"
import "./assets/css/base.less"

import { registerEl } from "./global/element"
import { registerProperties } from "./global/register-properties"

import router from "./router"
import store from "./store"
import { setupStore } from "./store"

const app = createApp(App)

registerProperties(app)
registerEl(app)
setupStore()
app.use(store).use(router).mount("#app")
