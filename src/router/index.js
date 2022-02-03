import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../components/paginas/Index.vue'
import Loja from '../components/paginas/Loja.vue'
Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Index,
        props: true
    },
    {
        path: '/loja',
        name: 'Loja',
        component: Loja,
        props: true
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '*',
        component: Index
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router