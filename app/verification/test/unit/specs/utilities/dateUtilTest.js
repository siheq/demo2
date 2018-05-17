import test from 'ava';
import {formatRouteDate} from '../../../../../src/utilities/dateUtil';

test('format eta/etd', t => {
  let dateStr = '2018-03-12';
  let str = formatRouteDate(dateStr);
  t.is(str, '12 Mar');
});
