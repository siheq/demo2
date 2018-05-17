import mutations from './mutations';
import actions from './actions';
import getters from './getters';

const state = {
  temperatures: [],
  filterDates: [],
  exceptions: [],
  lastUpdatedTime: '',
  temperaturesGraphFilter: {
    start: '',
    end: '',
  },
  zoominPoint: [],
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

