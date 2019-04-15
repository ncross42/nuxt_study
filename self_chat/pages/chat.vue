<template>
  <v-layout>
    <h2>채팅 웹앱</h2>
    <v-flex xs12 sm6 md3>
      <v-text-field
        v-model="username"
      />
    </v-flex>
    <v-btn color="success" @click="enter">
      입장
    </v-btn>
    <h1>A{{ retMsg }}B</h1>
  </v-layout>
</template>

<script>
import socket from '~/plugins/socket.io.js'

export default {
  data: () => ({
    username: '',
    retMsg: ''
  }),
  beforeMount() {
    socket.on('everybody', (msg) => {
      this.retMsg = msg
    })
  },
  methods: {
    enter() {
      socket.emit('everybody', this.username)
    }
  }
}
</script>
