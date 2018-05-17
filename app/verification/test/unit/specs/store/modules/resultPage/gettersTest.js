import test from 'ava';
import getters from '../../../../../../../src/store/modules/resultPage/getters';
import * as types from '../../../../../../../src/store/modules/resultPage/types';
test('temperature', t => {
  t.is(getters[types.GET_TEMPERATURES]({temperatures: 'data'}), 'data');
});

