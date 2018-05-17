import test from 'ava';
import getters from '../../../../../../../src/store/modules/summaryPage/getters';
import * as types from '../../../../../../../src/store/modules/summaryPage/types';

test('get containers by type', t => {
  const state = {
    containers: {
      results: ['aa'],
    },
    searchResult: {
      results: ['bb'],
    },
  };
  t.deepEqual(getters[types.GET_CONTAINERS_BY_TYPE](state)('summary'), ['aa']);
  t.deepEqual(getters[types.GET_CONTAINERS_BY_TYPE](state)('search'), ['bb']);
});

test('get last update date by type', t => {
  const state = {
    containers: {
      lastUpdated: '2018-04-25T08:06:31.801Z',
    },
    searchResult: {
      lastUpdated: '2018-04-50T08:06:31.801Z',
    },
  };
  t.deepEqual(getters[types.GET_LAST_UPDATED_DATE_BY_TYPE](state)('summary'), '2018-04-25T08:06:31.801Z');
  t.deepEqual(getters[types.GET_LAST_UPDATED_DATE_BY_TYPE](state)('search'), '2018-04-50T08:06:31.801Z');
});

