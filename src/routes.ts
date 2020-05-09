import Vue from 'vue';
import Router from 'vue-router';

import Home from './pages/Home.vue';
import Login from './pages/Login.vue';
import About from './pages/About.vue';
import ContactUs from './pages/ContactUs.vue';
import NotFound from './pages/NotFound.vue';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {path: '/', name: 'home', component: Home, meta: {isAuth: true}},
        {path: '/login', name: 'login', component: Login},
        {path: '/contact_us', name: 'contact_us', component: ContactUs, meta: {isAuth: true}},
        {path: '/about', name: 'about', component: About, meta: {isAuth: true}},
        {path: '*', name: '404', component: NotFound, meta: {isAuth: true}}
    ]
});

router.beforeEach((to, from, next) => {
    const {user} = window.localStorage;
    const {isAuth} = to?.meta;

    // user logged in and route login
    if(to.fullPath.match(/^\/login(?:\/(?=$))?$/i) && user)
        return next({path: '/'});

    // route required auth and user not logged in
    if (isAuth && !user)
        return next({path: '/login', params: {nextUrl: to.fullPath}});

    // otherwise
    return next();
});

export default router;
