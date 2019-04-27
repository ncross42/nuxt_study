<template>
  <v-container grid-list-xl text-xs-center>
    <v-layout align-center row wrap>
      <template v-if="login">
        <v-flex xs12 class="display-1">전체방</v-flex>
        <v-flex xs2 class="title">메시지</v-flex>
        <v-flex xs8>
          <v-text-field v-model="msg" label="메시지를 입력하세요" @keyup.enter="sendAll" />
        </v-flex>
        <v-flex xs2>
          <v-btn color="success" class="title black--text" @click="sendAll">전송</v-btn>
        </v-flex>
      </template>
      <template v-else>
        <v-flex xs12 class="display-1">채팅 입장</v-flex>
        <v-flex xs2 class="title">이름</v-flex>
        <v-flex xs8>
          <v-text-field v-model="username" label="이름을 입력하세요" @keyup.enter="enter" />
        </v-flex>
        <v-flex xs2>
          <v-btn color="success" class="title black--text" @click="enter">입장</v-btn>
        </v-flex>
      </template>

      <v-flex xs12 class="headline">대화록</v-flex>

      <v-flex xs12 text-xs-left>
        <v-card>
          <v-list>
            <template v-for="(msg,i) in arrMsg">
              <v-list-tile :key="i">
                <v-list-tile-content>
                  <v-list-tile-title class="body-1" v-text="msg" />
                </v-list-tile-content>
              </v-list-tile>
              <v-divider v-if="i + 1 < arrMsg.length" :key="`divider-${i}`" />
            </template>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// import { socketOpen as socket } from '~/plugins/socket.io.js'
export default {
  data: () => ({
    username: '',
    login: false,
    msg: '',
    arrMsg: []
  }),
  beforeMount() {
    this.$sockOpen.on('sendAll', (ret) => {
      if (ret) {
        this.arrMsg.push(ret)
      } else {
        alert('응답이 없습니다.')
      }
    })
    this.$sockOpen.on('enter', (ret) => {
      if (ret.code === 2) {
        alert(ret.message)
        this.username = ''
      } else {
        this.login = true
        this.username = ret.name
      }
    })
  },
  methods: {
    sendAll(event) {
      if (this.msg) {
        this.$sockOpen.emit('sendAll', this.msg)
      } else {
        alert('메시지가 없습니다.')
      }
    },
    enter(event) {
      if (this.username) {
        this.$sockOpen.emit('enter', this.username)
      } else {
        alert('이름이 비었습니다.')
      }
    }
  }
}
</script>

<style scoped>

</style>
