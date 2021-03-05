import VueRouter from "vue-router";
window.Vue = require('vue');
Vue.use(VueRouter);

import Form from "./utilities/Form";
window.Form = Form;

import router from "./routes";

// Vue.component('example-component', require('./components/ExampleComponent.vue').default);

const app = new Vue({
    el: "#app",
    router
});
