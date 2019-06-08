<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <v-card>
        <v-card-title class="headline">
          Welcome to Nuxt.js auth example
        </v-card-title>
        <v-card-text>
          <template v-if="$auth.$state.loggedIn">
            <v-btn class="ml-3" color="info" to="/secure">Secure</v-btn>
            <v-btn class="ml-3" color="warning" @click="$auth.logout()">Logout</v-btn>
          </template>
          <v-btn v-else to="/login" color="success">Login</v-btn>
        </v-card-text>
        <v-card-actions>
          User status:
          <v-chip>{{ $auth.$state.loggedIn ? 'Logged In' : 'Guest' }}</v-chip>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
}
</script>
