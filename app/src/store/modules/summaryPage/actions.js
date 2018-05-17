import {SET_CONTAINERS, SET_SEARCH_RESULT} from './types';

export default {
  [SET_CONTAINERS]: ({commit}, containers) => {
    commit(SET_CONTAINERS, containers);
  },
  [SET_SEARCH_RESULT]: ({commit}, containers) => {
    commit(SET_SEARCH_RESULT, containers);
  },
};
