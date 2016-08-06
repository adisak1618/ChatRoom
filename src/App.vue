<template>
  <div id="app">
      <Menu></Menu>
      <router-view></router-view>
  </div>
</template>

<script>
import store from './store/index'
import Hello from './components/Hello'
import Menu from './components/Menu/index'
import { login, LoginSuccess, LoginFail } from './actions/login'

export default {
  components: {
    Menu,
    Hello
  },
  store,
  vuex: {
    getters: {
      authen: state => state.authen
    },
    actions: { login, LoginSuccess, LoginFail }
  },
  ready () {
    console.log(this)
    let token = localStorage.getItem('token')
    if (token !== null && token !== '') {
      LoginSuccess(this.$store)
    } else {
      LoginFail(this.$store)
    }
  }
}
</script>

<style>

</style>
