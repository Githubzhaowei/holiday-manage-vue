import message from "./module/message.js";
import person from "./module/person.js";

import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        person,
        message,
    },
});
