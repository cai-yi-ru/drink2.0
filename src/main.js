import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Loading from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';

/* fontawesome 效果 */
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faBars, faCocktail } from '@fortawesome/free-solid-svg-icons';

import App from './App.vue';
import router from './router';

/* fontawesome 效果 */
library.add(faBars, faCocktail);

const app = createApp(App);
app.use(VueAxios, axios);
app.use(router);
app.component('Loading', Loading);
/* fontawesome 效果 */
app.component('font-awesome-icon', FontAwesomeIcon);
app.config.productionTip = false;

app.mount('#app');
