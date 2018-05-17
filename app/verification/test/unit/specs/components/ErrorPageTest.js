import test from 'ava';
import ErrorPage from '../../../../../src/components/common/ErrorPage.vue';
import {shallow} from '../../../helpers/setupComponent';

test('shows error message and error action', t => {
  const errorPage = shallow(ErrorPage);

  const errorMessage = errorPage.find('.error-message');
  const errorAction = errorPage.find('.error-action');
  t.true(errorMessage.text().includes('Sorry! Something went wrong.'));
  t.true(errorAction.text().includes('Please try again later.'));
});
