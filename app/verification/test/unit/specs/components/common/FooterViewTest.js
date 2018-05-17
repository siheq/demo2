import test from 'ava';
import {shallow} from '../../../../helpers/setupComponent';
import FooterView from '../../../../../../src/components/common/FooterView';

test('show footer', t => {
  const footerView = shallow(FooterView);
  const links = footerView.find('.footer .links');
  t.is(links.text(), 'Terms of Useprivacy and Security StatementCopyright Infringement Policy');
});
