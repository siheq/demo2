import test from 'ava';
import mutations from '../../../../../../../src/store/modules/summaryPage/mutations';

test('set summary containers', t => {
  const state = {containers: null};
  const expectation = [{containerNumber: 'OOLU001'}, {containerNumber: 'OOLU002'}];
  mutations['SET_CONTAINERS'](state, expectation);
  t.deepEqual(state.containers, expectation);
});

test('set search result', t => {
  const state = {searchResult: null};
  const expectation = [{containerNumber: 'OOLU001'}, {containerNumber: 'OOLU002'}];
  mutations['SET_SEARCH_RESULT'](state, expectation);
  t.deepEqual(state.searchResult, expectation);
});
