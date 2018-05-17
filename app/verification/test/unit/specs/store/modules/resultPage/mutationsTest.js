import test from 'ava';
import mutations from '../../../../../../../src/store/modules/resultPage/mutations';
import {
  SET_TEMPERATURE,
} from '../../../../../../../src/store/modules/resultPage/types';

test('set temperature', t => {
  const state = {temperatures: []};
  mutations[SET_TEMPERATURE](state, ['20']);
  t.deepEqual(state.temperatures, ['20']);
});

