<template>
    <div class="main">
        <NavBar></NavBar>
        <div class="container pt-4">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import { Component, Vue } from 'vue-property-decorator'
    import NavBar from './components/navbar'
    @Component({
        components: {
            NavBar
        }
    })
    export default class App extends Vue {}
</script>

<style scoped>
</style>
