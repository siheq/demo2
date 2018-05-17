
import {
  SET_TEMPERATURE,
} from './types';

export default {
  [SET_TEMPERATURE]: (state, temperatures) => {
    state.temperatures = temperatures;
  },
};
