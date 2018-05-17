import {LOADING_BEGIN, LOADING_FINISHED, SET_CONTAINER_NUMBER} from './types';

export default {
  [LOADING_BEGIN]: state => {
    state.loading = true;
  },
  [LOADING_FINISHED]: state => {
    state.loading = false;
  },
  [SET_CONTAINER_NUMBER]: (state, containerNumber) => {
    state.containerNumber = containerNumber;
  },
};
