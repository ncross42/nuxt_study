<template>
  <div>
    <v-alert :value="true" type="warning">This is a secure page!</v-alert>
    <v-container fluid grid-list-md text-xs-center>
      <v-layout align-center justify-center row wrap fill-height>
        <v-flex d-flex xs12 sm8 md8>
          <v-card>
            <v-card-title class="headline">State</v-card-title>
            <v-card-text>
              <pre>{{ state }}</pre>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm4 md4>
          <v-card>
            <v-card-title class="headline">Scopes</v-card-title>
            <v-card-text>
              User: <v-chip>{{ $auth.hasScope('user') }}</v-chip>
              Test: <v-chip>{{ $auth.hasScope('test') }}</v-chip>
              Admin: <v-chip>{{ $auth.hasScope('admin') }}</v-chip>
            </v-card-text>
          </v-card>
          <v-card>
            <v-card-title class="headline">Token</v-card-title>
            <v-card-text>
              {{ $auth.token || '-' }}
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      <hr>
      <v-card>
        <v-card-title>
          <v-btn @click="$auth.fetchUser()">Fetch User</v-btn>
          <v-btn @click="$auth.logout()">Logout</v-btn>
        </v-card-title>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  middleware: ['auth'],
  computed: {
    state() {
      return JSON.stringify(this.$auth.$state, undefined, 2)
    }
  }
}
</script>
