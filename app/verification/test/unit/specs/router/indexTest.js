import test from 'ava';
import Router from '../../../../../src/router/index';

test('include root path', t => {
  t.true(Router.matcher.match('/').matched.length === 1);
});

test('include error path', t => {
  t.true(Router.matcher.match('/error').matched.length === 1);
});

