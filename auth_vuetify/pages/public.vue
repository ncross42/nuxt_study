<template>
  <div>
    <v-alert :value="true" type="info">You should see this page without need to authentication!</v-alert>
  </div>
</template>

<script>
export default {
  middleware: ['auth'],
  options: {
    auth: false
  }
}
</script>
