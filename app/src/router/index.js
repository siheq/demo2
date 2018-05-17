import Vue from 'vue';
import VueRouter from 'vue-router';
import ErrorPage from '../components/common/ErrorPage.vue';
import HomePage from '../components/home/HomePage';

Vue.use(VueRouter);

const routes = [
  {
    path: '/', component: HomePage, name: 'home', meta: {title: 'KMR'},
  },
  {path: '/error', component: ErrorPage, meta: {title: 'KMR|Error'}},
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

export default router;
