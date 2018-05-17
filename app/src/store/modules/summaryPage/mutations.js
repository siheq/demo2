import {SET_CONTAINERS, SET_SEARCH_RESULT} from './types';

export default {
  [SET_CONTAINERS]: (state, containers) => {
    state.containers = containers;
  },
  [SET_SEARCH_RESULT]: (state, containers) => {
    state.searchResult = containers;
  },
};
