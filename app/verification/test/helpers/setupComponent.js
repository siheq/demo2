import {shallow as vueShallow, mount as vueMount, createLocalVue} from 'vue-test-utils';
import _ from 'lodash'
import Vuex from 'vuex';
import enUS from '../../../src/locales/en-US';

const localVue = createLocalVue();
localVue.use(Vuex);

const shallow = (Component, {propsData = {}, store = {}, route = {}, stubs = []} = {}) => {
  const wrapper = vueShallow(Component, {
    propsData,
    store: new Vuex.Store(store),
    mocks: {
      $route: route,
      $t: key => _.get(enUS, key),
    },
    stubs: stubs.reduce((memo, stub) => ({...memo, [stub]: `<div class='${stub}-stub'/>`}), {}),
    localVue,
  });

  return wrapper;
};

const mount = (Component, {propsData = {}, store = {}, route = {}, stubs = []} = {}) => {
  const wrapper = vueMount(Component, {
    propsData,
    store: new Vuex.Store(store),
    mocks: {
      $route: route,
      $t: key => _.get(enUS, key),
    },
    stubs: stubs.reduce((memo, stub) => ({...memo, [stub]: `<div class='${stub}-stub'/>`}), {}),
    localVue,
  });

  return wrapper;
};

export {mount, shallow};
