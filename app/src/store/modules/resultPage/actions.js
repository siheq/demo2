import {
  SET_FILTER_DATES,
  SET_TEMPERATURE,
  SET_TEMPERATURE_EXCEPTIONS,
  SET_LAST_UPDATE_TIME,
  SET_TEMPERATURES_GRAPH_FILTER,
  SET_MAP_ZOOMIN_POINT,
} from './types';

export default {
  [SET_TEMPERATURE]: ({commit}, temperatures) => {
    commit(SET_TEMPERATURE, temperatures);
  },
  [SET_FILTER_DATES]: ({commit}, filterDates) => {
    commit(SET_FILTER_DATES, filterDates);
  },
  // [SET_POSITION_HISTORY]: ({commit}, positionHistory) => {
  //   commit(SET_POSITION_HISTORY, positionHistory);
  // },
  [SET_TEMPERATURE_EXCEPTIONS]: ({commit}, eceptions) => {
    commit(SET_TEMPERATURE_EXCEPTIONS, eceptions);
  },
  [SET_LAST_UPDATE_TIME]: ({commit}, lastUpdatedTime) => {
    commit(SET_LAST_UPDATE_TIME, lastUpdatedTime);
  },
  [SET_TEMPERATURES_GRAPH_FILTER]: ({commit}, temperaturesGraphFilter) => {
    commit(SET_TEMPERATURES_GRAPH_FILTER, temperaturesGraphFilter);
  },
  [SET_MAP_ZOOMIN_POINT]: ({commit}, zoominPoint) => {
    commit(SET_MAP_ZOOMIN_POINT, zoominPoint);
  },
};
