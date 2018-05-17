import {LOADING_BEGIN, LOADING_FINISHED} from './types';

export default {
  [LOADING_BEGIN]: ({commit}) => {
    commit(LOADING_BEGIN);
  },
  [LOADING_FINISHED]: ({commit}) => {
    commit(LOADING_FINISHED);
  },
};
