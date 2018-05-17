import {SET_SHIPMENT_INFO} from './types';

export default {
  [SET_SHIPMENT_INFO]: ({commit}, shipmentInfo) => {
    commit(SET_SHIPMENT_INFO, shipmentInfo);
  },
};
