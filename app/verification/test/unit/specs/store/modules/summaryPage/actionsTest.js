import test from 'ava';
import sinon from 'sinon';
import actions from '../../../../../../../src/store/modules/summaryPage/actions';

const sandbox = sinon.createSandbox();

test.afterEach.always(() => sandbox.reset());

test('set summary containers', t => {
  const commitSpy = sandbox.spy();
  const containers = [
    {containerNumber: '001'},
    {containerNumber: '002'},
  ];
  actions['SET_CONTAINERS']({commit: commitSpy}, containers);
  t.true(commitSpy.called);
  t.is(commitSpy.args[0][0], 'SET_CONTAINERS');
  t.deepEqual(commitSpy.args[0][1], containers);
});

test('set search result', t => {
  const commitSpy = sandbox.spy();
  const containers = [
    {containerNumber: '001'},
    {containerNumber: '002'},
  ];
  actions['SET_SEARCH_RESULT']({commit: commitSpy}, containers);
  t.true(commitSpy.called);
  t.is(commitSpy.args[0][0], 'SET_SEARCH_RESULT');
  t.deepEqual(commitSpy.args[0][1], containers);
});
