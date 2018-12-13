import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMall from '@/components/ShoppingMall'
import register from '@/components/component/register'
import Login from '@/components/component/login'
import Goods from '@/components/component/goods'
import caregoryList from '@/components/component/caregoryList'
import Cart from '@/components/component/cart'
import Main from '@/components/component/main'
import Vip from '@/components/component/Vip'

Vue.use(Router)
export default new Router({
    routes: [{
            path: '/',
            name: "Main",
            component: Main,
            children: [{
                    path: '/',
                    name: 'ShoppingMall',
                    component: ShoppingMall
                },
                {
                    path: '/caregoryList',
                    name: 'caregoryList',
                    component: caregoryList
                },
                {
                    path: '/cart',
                    name: 'Cart',
                    component: Cart
                },
                {
                    path: '/vip',
                    name: 'Vip',
                    component: Vip
                }
            ]
        },
        {
            path: '/register',
            name: 'register',
            component: register
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/goods',
            name: 'Goods',
            component: Goods
        },


    ]
})