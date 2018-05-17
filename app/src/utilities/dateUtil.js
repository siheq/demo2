import _ from 'lodash';
import moment from 'moment';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const formatRouteDate = str => {
  if (_.isEmpty(str)) return '';
  let date = new Date(str);
  let month = date.getMonth();
  let day = date.getDate();
  day = day > 9 ? day : `0${day}`;
  return `${day} ${MONTHS[month]}`;
};

export const formatToUTCDate = str => {
  return moment(str).utc().format('YYYY-MM-DD HH:mm UTC');
};

export const formatToLocalDate = dateStr => {
  return moment(dateStr).format('YYYY-MM-DD HH:mm');
};
