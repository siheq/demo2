import test from 'ava';
import sinon from 'sinon';
import actions from '../../../../../../../src/store/modules/searchPage/actions';
import * as types from '../../../../../../../src/store/modules/searchPage/types';
const sandbox = sinon.createSandbox();
const commitSpy = sandbox.spy();

test.beforeEach(() => {
});

test.afterEach.always(() => sandbox.reset());

test('set shipment information', t => {
  const data = {containerNumber: 'OOLU000001', bookingNumber: '1234567890'};

  actions[types.SET_SHIPMENT_INFO]({commit: commitSpy}, data);
  t.is(commitSpy.callCount, 1);
  t.deepEqual(commitSpy.args[0], [types.SET_SHIPMENT_INFO, {containerNumber: 'OOLU000001', bookingNumber: '1234567890'}]);
});
