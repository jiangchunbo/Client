import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        role: '',
        menus: []
    },

    mutations: {
        refreshUser(state, newState) {
            state.role = newState.role;
            state.menus = newState.menus;

        }
    }


});