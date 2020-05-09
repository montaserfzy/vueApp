<template>
  <div>
    <h3>Home Page</h3>
    <AutoComplete />
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
