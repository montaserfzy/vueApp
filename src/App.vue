<template>
    <div class="main">
        <nav-bar />
        <div class="container pt-4">
            <router-view />
        </div>
    </div>
</template>

<script>
    import { Component, Vue } from 'vue-property-decorator'
    import NavBar from './components/NavBar'
    @Component({
        components: {
            'nav-bar': NavBar
        }
    })
    export default class App extends Vue {}
</script>

<style scoped>
</style>
