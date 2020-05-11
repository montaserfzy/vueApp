<template>
  <div class="d-flex flex-sm-grow-1 min-vh-90 justify-content-center align-items-center">
    <div class="d-flex flex-column align-items-center h-auto">
      <h1 class="py-3 text-muted font-weight-bolder fs-100">404</h1>
      <p class="p-0">
        Page Not Found! <a href="/" class="text-success">Back To Home</a>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import * as VueJs from 'vue-property-decorator';

@VueJs.Component
export default class NotFound extends VueJs.Vue {
}
</script>
