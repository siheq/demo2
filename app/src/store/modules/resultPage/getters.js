import {
  GET_TEMPERATURES,
} from './types';

let getters = {
  [GET_TEMPERATURES]: state => state.temperatures,
};
export default getters;
