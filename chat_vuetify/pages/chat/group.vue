<template>
  <v-container grid-list-xl text-xs-center>
    <v-layout align-center row wrap>
      <v-flex xs2>
        <dialog-group :group-name="group" />
      </v-flex>
      <v-flex xs8 class="display-1">그룹방</v-flex>
      <v-flex xs2>
        <v-btn color="info" @click="echo">에코</v-btn>
      </v-flex>
      <v-flex xs2 class="title">메시지</v-flex>
      <v-flex xs2>
        <v-text-field v-model="group" label="그룹명" />
      </v-flex>
      <v-flex xs6>
        <v-text-field v-model="msg" label="메시지를 입력하세요" @keyup.enter="sendGroup" />
      </v-flex>
      <v-flex xs2>
        <v-btn color="success" class="title black--text" @click="sendGroup">전송</v-btn>
      </v-flex>

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
// import socket from '~/plugins/socket.group.js'
import DialogGroup from '../../components/DialogGroup'

export default {
  components: { DialogGroup },
  data: () => ({
    group: '',
    msg: '',
    arrMsg: []
  }),
  beforeMount() {
    this.$sockGroup.on('sendGroup', (result) => {
      if (result) {
        this.arrMsg.push(result)
      } else {
        alert('응답이 없습니다.')
      }
    })
    this.$sockGroup.on('echo', (ret) => {
      console.log(ret)
    })
    // this.$sockGroup.on('enter', (result) => {
    //   if (result) {
    //     alert(result)
    //     this.username = ''
    //   } else {
    //     this.login = true
    //   }
    // })
  },
  methods: {
    sendGroup(event) {
      console.log(this.group, this.msg)
      if (this.group && this.msg) {
        const req = { group: this.group, msg: this.msg }
        this.$sockGroup.emit('sendGroup', req)
      } else {
        alert('그룹명 또는 메시지가 없습니다.')
      }
    },
    echo(e) {
      this.$sockGroup.emit('echo', this.group)
    }
    // enter(event) {
    //   if (this.username) {
    //     sockGroup.emit('enter', this.username)
    //   } else {
    //     alert('이름이 비었습니다.')
    //   }
    // }
  }
}
</script>

<style scoped>

</style>
