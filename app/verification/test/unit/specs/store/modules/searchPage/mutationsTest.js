import test from 'ava';
import mutations from '../../../../../../../src/store/modules/searchPage/mutations';
import * as types from '../../../../../../../src/store/modules/searchPage/types';

test('set shipment information', t => {
  const state = {shipmentInfo: {}};
  mutations[types.SET_SHIPMENT_INFO](state, {containerNumber: 'OOLU000001'});
  t.deepEqual(state.shipmentInfo, {containerNumber: 'OOLU000001'});
});
