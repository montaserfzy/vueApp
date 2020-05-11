<template>
    <b-navbar type="dark" variant="dark">
        <div class="container">
            <b-navbar-nav>
                <b-nav-item href="/" v-if="isLoggedIn" v-bind:class="isActive('home')">Email</b-nav-item>
                <b-nav-item href="/username" v-if="isLoggedIn" :class="isActive('username')">Username</b-nav-item>
                <b-nav-item href="/about" v-if="isLoggedIn" :class="isActive('about')">About</b-nav-item>
                <b-nav-item href="/login" v-if="!isLoggedIn" :class="isActive('login')">Login</b-nav-item>

            </b-navbar-nav>
            <b-navbar-nav>
                <b-nav-item href="#" v-if="isLoggedIn" right v-on:click="this.onLogOut">Log out</b-nav-item>
            </b-navbar-nav>
        </div>
    </b-navbar>
</template>

<script>
    import router from "../routes";

    export default {
        name: "nav-bar",

        computed:{
            isLoggedIn(){
                return !!window.localStorage.user;
            }
        },

        methods: {
            isActive(route){
                return router.currentRoute.matched[0].name === route?'active':'';
            },

            onLogOut(e) {
                e.preventDefault();
                window.localStorage.removeItem('user');
                window.location.href = '/login'
            }
        }
    }
</script>

<style scoped>

</style>
