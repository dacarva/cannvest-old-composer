import Vue from 'vue';
import Router from 'vue-router';

import PersonalBlog from './views/PersonalBlog.vue';
import UserProfileLite from './views/UserProfileLite.vue';
import AddNewPost from './views/AddNewPost.vue';
import Errors from './views/Errors.vue';
import ComponentsOverview from './views/ComponentsOverview.vue';
import Tables from './views/Tables.vue';
import BlogPosts from './views/BlogPosts.vue';
import ProductLots from './views/ProductLots.vue';
import ViewProducers from './views/ViewProducers.vue';
import ViewConsumers from './views/ViewConsumers.vue';
import ViewSmartContracts from './views/ViewSmartContracts.vue';
import AddConsumer from './views/AddConsumer.vue';
import AddProducer from './views/AddProducer.vue';
import AddProductLot from './views/AddProductLot.vue';
import AddSmartContract from './views/AddSmartContract.vue';
import ExecuteTransactions from './views/ExecuteTransactions.vue';


Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active',
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: '/',
      redirect: '/blog-overview',
    },
    {
      path: '/product-lots',
      name: 'product-lots',
      component: ProductLots,
    },
    {
      path: '/view-producers',
      name: 'view-producers',
      component: ViewProducers,
    },
    {
      path: '/view-consumers',
      name: 'view-consumers',
      component: ViewConsumers,
    },
    {
      path: '/view-smart-contracts',
      name: 'view-smart-contracts',
      component: ViewSmartContracts,
    },
    {
      path: '/add-consumer',
      name: 'add-consumer',
      component: AddConsumer,
    },
    {
      path: '/add-producer',
      name: 'add-producer',
      component: AddProducer,
    },
    {
      path: '/add-product-lot',
      name: 'add-product-lot',
      component: AddProductLot,
    },
    {
      path: '/add-smart-contract',
      name: 'add-smart-contract',
      component: AddSmartContract,
    },    
    {
      path: '/execute-transactions',
      name: 'execute-transactions',
      component: ExecuteTransactions,
    },    
    {
      path: '/blog-overview',
      name: 'blog-overview',
      component: PersonalBlog,
    },
    {
      path: '/user-profile-lite',
      name: 'user-profile-lite',
      component: UserProfileLite,
    },
    {
      path: '/add-new-post',
      name: 'add-new-post',
      component: AddNewPost,
    },
    {
      path: '/errors',
      name: 'errors',
      component: Errors,
    },
    {
      path: '/components-overview',
      name: 'components-overview',
      component: ComponentsOverview,
    },
    {
      path: '/tables',
      name: 'tables',
      component: Tables,
    },
    {
      path: '/blog-posts',
      name: 'blog-posts',
      component: BlogPosts,
    }, {
      path: '*',
      redirect: '/errors',
    },
  ],
});
