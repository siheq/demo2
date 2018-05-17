import test from 'ava';
import mutations from '../../../../../src/store/mutations';
import {
  LOADING_BEGIN,
  LOADING_FINISHED,
  SET_CONTAINER_NUMBER,
} from '../../../../../src/store/types';

test('loading begin', t => {
  const state = {loading: false};
  mutations[LOADING_BEGIN](state);
  t.deepEqual(state.loading, true);
});

test('loading finished', t => {
  const state = {loading: true};
  mutations[LOADING_FINISHED](state);
  t.deepEqual(state.loading, false);
});

test('set container number', t => {
  const state = {containerNumber: ''};
  mutations[SET_CONTAINER_NUMBER](state, 'OOLU000001');
  t.deepEqual(state.containerNumber, 'OOLU000001');
});
