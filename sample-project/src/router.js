

import Vue from 'vue';
import Router from 'vue-router';
import store from './store';


// ---------------- Routes ------------------

import Login from './views/auth/login'
import Logout from './views/auth/logout'

import Order from './views/pages/order'
import Product from './views/pages/product'

Vue.use(Router);

const router = new Router({
    mode:'history',
    base:'localhost:8080',
    routes:[
       
        {
            path:'/login',
            name:'app-login',
            component: Login
        },
        {
            path:'/logout',
            name:'app-logout',
            component: Logout
        },
        {
            path:'/order-list',
            name:'order-list',
            component: Order
        },
        {
            path:'/product-list',
            name:'product-list',
            component: Product
        }
    ]
})


export default router;