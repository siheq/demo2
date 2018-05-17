import test from 'ava';
import sinon from 'sinon';
import actions from '../../../../../src/store/actions';
import {
  LOADING_BEGIN,
  LOADING_FINISHED,
} from '../../../../../src/store/types';

const sandbox = sinon.createSandbox();

test.afterEach.always(() => sandbox.reset());

test('loading begin', t => {
  const commitSpy = sandbox.spy();
  actions[LOADING_BEGIN]({commit: commitSpy});
  t.true(commitSpy.called);
  t.is(commitSpy.args[0][0], LOADING_BEGIN);
});
test('loading finished', t => {
  const commitSpy = sandbox.spy();
  actions[LOADING_FINISHED]({commit: commitSpy});
  t.true(commitSpy.called);
  t.is(commitSpy.args[0][0], LOADING_FINISHED);
});

