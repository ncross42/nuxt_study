<template>
  <div>
    <h2 class="text-center">Login</h2>
    <hr>
    <v-alert v-if="error" :value="true" type="danger">{{ error + '' }}</v-alert>
    <v-alert v-if="$auth.$state.redirect" :value="true">
      You have to login before accessing to <strong>{{ $auth.$state.redirect }}</strong>
    </v-alert>

    <v-container fluid grid-list-md text-xs-center>
      <v-layout align-center justify-center row wrap fill-height>
        <v-flex d-flex xs12 sm4 md4>
          <v-card light>
            <busy-overlay />
            <v-card-title class="headline">
              Local Login
            </v-card-title>
            <v-card-text>
              <v-form ref="form">
                <v-text-field v-model="username" :counter="10" :rules="rules" label="Username"></v-text-field>
                <v-text-field v-model="password" :counter="10" :rules="rules" label="Password"></v-text-field>
              </v-form>
              <form @keydown.enter="login">
                <div class="text-center">
                  <v-btn color="primary" block @click="login">Login</v-btn>
                </div>
              </form>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex d-flex xs12 sm2 md2>
          <div class="text-center"><v-chip light class="title">OR</v-chip></div>
        </v-flex>

        <v-flex d-flex xs12 sm4 md4 class="text-center">
          <v-card>
            <v-card-title class="headline">
              Social Login
            </v-card-title>
            <v-card-text>
              <div v-for="s in strategies" :key="s.key" class="mb-2">
                <v-btn :style="{background: s.color}" class="login-button" block @click="$auth.loginWith(s.key)">Login with {{ s.name }}</v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<style scoped>
.login-button {
  border: 0;
};
</style>

<script>
import busyOverlay from '~/components/busy-overlay'

export default {
  middleware: ['auth'],
  components: { busyOverlay },
  data() {
    return {
      lorem: 'Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.',
      username: 'anything',
      password: '123',
      error: null
    }
  },
  computed: {
    rules() {
      const rules = []
      // if (this.max) {
      //   const rule = (v) => {
      //     return (v || '').length <= this.max || `A maximum of ${this.max} characters is allowed`
      //   }
      //   rules.push(rule)
      // }
      // if (!this.allowSpaces) {
      //   const rule = (v) => {
      //     return (v || '').indexOf(' ') < 0 || 'No spaces are allowed'
      //   }
      //   rules.push(rule)
      // }
      // if (this.match) {
      //   const rule = (v) => {
      //     return (!!v && v) === this.match || 'Values do not match'
      //   }
      //   rules.push(rule)
      // }
      return rules
    },
    strategies: () => ([
      { key: 'auth0', name: 'Auth0', color: '#ec5425' },
      { key: 'google', name: 'Google', color: '#4284f4' },
      { key: 'facebook', name: 'Facebook', color: '#3c65c4' },
      { key: 'github', name: 'GitHub', color: '#202326' }
    ]),
    redirect() {
      return (
        this.$route.query.redirect &&
        decodeURIComponent(this.$route.query.redirect)
      )
    },
    isCallback() {
      return Boolean(this.$route.query.callback)
    }
  },
  methods: {
    login() {
      this.error = null

      return this.$auth
        .loginWith('local', {
          data: {
            username: this.username,
            password: this.password
          }
        })
        .catch((e) => {
          this.error = e + ''
        })
    }
  }
}
</script>
