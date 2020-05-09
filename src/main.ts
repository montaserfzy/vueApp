
import Vue from 'vue'
import Router from './routes';
import App from './App.vue';
import BootstrapVue from 'bootstrap-vue';

import './styles/main.scss';

Vue.use(BootstrapVue);

new Vue({
    el: '#app',
    router: Router,
    render: h => h(App, {})
});
