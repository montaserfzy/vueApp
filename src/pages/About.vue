<template>
  <div>
    <h3>About Page</h3>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class About extends Vue {}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
</style>
