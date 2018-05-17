import {SET_SHIPMENT_INFO} from './types';

export default {
  [SET_SHIPMENT_INFO]: (state, shipmentInfo) => {
    state.shipmentInfo = shipmentInfo;
  },
};
