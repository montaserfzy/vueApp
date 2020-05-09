<template>
  <div>
    <h3>Home Page</h3>
    <AutoComplete
            uri='http://www.mocky.io/v2/5eb6ff46310000fe3bc8a0e3?mocky-delay=10000ms'
            keyMatch="email"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AutoComplete from '../components/auto-complete';
@Component({
    components: {
        AutoComplete
    }
})
export default class Home extends Vue {

}
</script>


<style scoped>
</style>
