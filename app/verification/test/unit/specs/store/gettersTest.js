import test from 'ava';
import getters from '../../../../../src/store/getters';

test('temperature', t => {
  t.is(getters.GET_CONTAINER_NUMBER({containerNumber: 'data'}), 'data');
});
