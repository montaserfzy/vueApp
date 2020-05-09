<template>
  <div class="login">
    <h1>404</h1>
    <p>
      Page Not Found! <a href="/">Back To Home</a>
    </p>
  </div>
</template>

<script lang="ts">
import * as VueJs from 'vue-property-decorator';

@VueJs.Component
export default class NotFound extends VueJs.Vue {
}
</script>

<style scoped>
h1 {
  margin: 40px 0 0;
}
p{
  margin:0px;
}
a {
  color: #42b983;
}
</style>
