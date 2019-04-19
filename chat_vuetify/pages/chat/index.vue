<template>
  <v-container grid-list-xl text-xs-center>
    <v-layout align-center row wrap>
      <v-flex xs12 class="title">채팅 입장</v-flex>
      <v-flex xs2 class="title">이름</v-flex>
      <v-flex xs8>
        <v-text-field v-model="username" label="이름을 입력하세요" @keyup.enter="enter" />
      </v-flex>
      <v-flex xs2>
        <v-btn color="success" class="title black--text font-weight-black" @click="enter">보내기</v-btn>
      </v-flex>
      <v-flex xs2 class="title">응답</v-flex>
      <v-flex xs10>
        <v-text-field v-model="retMessage" readonly />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import io from 'socket.io-client'
const socket = io('http://localhost:3000')

export default {
  data: () => ({
    username: '',
    retMessage: ''
  }),
  beforeMount() {
    socket.on('echo', (result) => {
      if (result) {
        this.retMessage = result
      } else {
        alert('응답이 없습니다.')
      }
    })
  },
  methods: {
    enter(event) {
      if (this.username) {
        socket.emit('echo', this.username)
      } else {
        alert('이름이 비었습니다.')
      }
    }
  }
}
</script>

<style scoped>

</style>
