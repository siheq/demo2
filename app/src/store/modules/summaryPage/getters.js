import {GET_CONTAINERS_BY_TYPE, GET_LAST_UPDATED_DATE_BY_TYPE} from './types';

export default {
  [GET_CONTAINERS_BY_TYPE]: state => type => {
    if (type === 'summary') {
      return state.containers.results;
    }
    else {
      return state.searchResult.results;
    }
  },
  [GET_LAST_UPDATED_DATE_BY_TYPE]: state => type => {
    if (type === 'summary') {
      return state.containers.lastUpdated;
    }
    else {
      return state.searchResult.lastUpdated;
    }
  },
};

