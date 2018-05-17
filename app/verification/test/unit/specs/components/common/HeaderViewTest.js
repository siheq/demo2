import test from 'ava';
import {shallow} from '../../../../helpers/setupComponent';
import HeaderView from '../../../../../../src/components/common/HeaderView';

test('show logo', t => {
  const headerView = shallow(HeaderView);
  const logo = headerView.find('.pure-menu-heading img');
  t.true(logo.hasClass('img'));
});

test('show party menu', t => {
  const headerView = shallow(HeaderView);
  const menu = headerView.findAll('.party-menu li').wrappers;
  t.is(menu[0].text(), '|');
  t.is(menu[1].text(), 'HOME');
  t.is(menu[2].text(), '|');
  t.is(menu[3].text(), 'E-SERVICE');
  t.is(menu[4].text(), '|');
  t.is(menu[5].text(), 'HELP');
});

test('show user name', t => {
  const headerView = shallow(HeaderView);
  headerView.setData({user: {userId: 'test'}});
  const name = headerView.find('.name.sign-in');
  t.is(name.text().trim(), 'test');
});

