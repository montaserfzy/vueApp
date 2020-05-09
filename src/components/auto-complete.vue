<template>
    <b-navbar type="dark" variant="dark">
        <div class="container">
            <b-navbar-nav>
                <b-nav-item href="/" v-if="isLoggedIn">Home</b-nav-item>
                <b-nav-item href="/about" v-if="isLoggedIn">About</b-nav-item>
                <b-nav-item href="/contact_us" v-if="isLoggedIn">Contact Us</b-nav-item>
                <b-nav-item href="/login" v-if="!isLoggedIn" right>Login</b-nav-item>
                <b-nav-item href="#" v-if="isLoggedIn" right v-on:click="this.onLogOut">LogOut</b-nav-item>
            </b-navbar-nav>
        </div>
    </b-navbar>
</template>

<script>
    export default {
        name: "NavBar",
        data() {
            const isLoggedIn = !!window.localStorage?.user;

            return {
                isLoggedIn
            }
        },
        methods: {
            onLogOut(e){
                e.preventDefault();
                window.localStorage.removeItem('user');
                window.location.href = '/login'
            }
        }
    }
</script>

<style scoped>

</style>
