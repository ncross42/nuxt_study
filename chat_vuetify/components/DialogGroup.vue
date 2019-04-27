<template>
  <v-dialog max-width="300">
    <v-btn slot="activator" flat class="success" @click="getMember">맴버확인</v-btn>
    <v-card>
      <v-card-title>
        맴버리스트
      </v-card-title>
      <v-card-text v-if="! $parent.group.length">
        그룹명이 없습니다.
      </v-card-text>
      <v-card-text v-else>
        <v-list>
          <template v-for="(name, i) in arrMember">
            <v-list-tile :key="i">
              <v-list-tile-content>
                <v-list-tile-title class="body-1" v-text="name" />
              </v-list-tile-content>
            </v-list-tile>
            <v-divider v-if="i + 1 < arrMember.length" :key="`divider-${i}`" />
          </template>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    groupName: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    arrMember: []
  }),
  beforeMount() {
    this.$sockGroup.on('getMember', (ret) => {
      console.log('getMember: ', ret)
      if (ret.code) {
        alert(ret.message)
      } else {
        this.arrMember = ret.arrMember
      }
    })
  },
  methods: {
    getMember() {
      if (this.$parent.group.trim()) {
        // console.log(`getMember : ${this.groupName}`)
        console.log('getMember :', this.$parent.group)
        this.$sockGroup.emit('getMember', this.$parent.group)
      }
    }
  }
}
</script>
