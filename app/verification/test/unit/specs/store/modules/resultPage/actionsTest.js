import test from 'ava';
import sinon from 'sinon';
import actions from '../../../../../../../src/store/modules/resultPage/actions';
import {
  SET_TEMPERATURE,
} from '../../../../../../../src/store/modules/resultPage/types';

const sandbox = sinon.createSandbox();

test.afterEach.always(() => sandbox.reset());

test('set temperature', t => {
  const commitSpy = sandbox.spy();
  const temperatures = [{
    time: '15 Jun 2017, 23:07GMT',
    location: 'Xiamen',
    supplyTemperature: '-21.7',
    returnTemperature: '-23.5',
    remarks: 'cosu remarks',
  }, {
    time: '14 Jun 2017, 23:07GMT',
    location: 'Xiamen',
    supplyTemperature: '-21.7',
    returnTemperature: '-23.5',
    remarks: 'cosu remarks',
  }, {
    time: '13 Jun 2017, 23:07GMT',
    location: 'Xiamen',
    supplyTemperature: '-21.7',
    returnTemperature: '-23.5',
    remarks: 'cosu remarks',
  }];
  actions[SET_TEMPERATURE]({commit: commitSpy}, temperatures);
  t.true(commitSpy.called);
  t.is(commitSpy.args[0][0], SET_TEMPERATURE);
  t.deepEqual(commitSpy.args[0][1], temperatures);
});

