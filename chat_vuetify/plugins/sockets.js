import Vue from 'vue'
import io from 'socket.io-client'

// const socketGroup = io('http://localhost:3000/group')
// export default socketGroup

Vue.prototype.$sockOpen = io('http://localhost:3000/')
Vue.prototype.$sockGroup = io('http://localhost:3000/group')
