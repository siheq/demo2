import Vue from 'vue';
import Vuex from 'vuex';
import searchPageModule from './modules/searchPage';
import resultPageModule from './modules/resultPage';
import summaryPageModule from './modules/summaryPage';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import {SEARCH_PAGE, RESULT_PAGE, SUMMARY_PAGE} from './namespaces';

Vue.use(Vuex);

const state = {
  loading: false,
  containerNumber: 'SZLU921851',
};

const modules = {
  [SEARCH_PAGE]: searchPageModule,
  [RESULT_PAGE]: resultPageModule,
  [SUMMARY_PAGE]: summaryPageModule,
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules,
});
