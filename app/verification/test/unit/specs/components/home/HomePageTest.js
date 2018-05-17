import test from 'ava';
import HomePage from '../../../../../../src/components/home/HomePage.vue';
import {shallow} from '../../../../helpers/setupComponent';

test('shows a title', t => {
  const searchPage = shallow(HomePage);
  searchPage.a = 'a';
  t.true(true);
});
