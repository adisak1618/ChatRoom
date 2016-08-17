<template>
  <div>
    <br/><br/><br/><br/>
    <div class="ui middle aligned center aligned grid">
      <div class="five wide column">
        <h2 class="ui teal image header">

          <div class="content">
            <h1>เข้าสู่ระบบ</h1>
          </div>
        </h2>
        <form class="ui large form">
          <div class="ui stacked segment">
            <div class="field">
              <div class="ui left icon input">
                <i class="user icon"></i>
                <input type="text" name="email" v-model="username" placeholder="อีเมล">
              </div>
            </div>
            <div class="field" v-bind:class="{ 'error': !loginSuccess }">
              <div class="ui left icon input">
                <i class="lock icon"></i>
                <input type="password" name="password" v-model="password" placeholder="รหัสผ่าน">
              </div>
            </div>
            <div class="ui fluid large teal submit button" @click="loginSuccess = login(username, password)"><h1>ลงชื่อเข้าใช้</h1></div>
          </div>

          <div class="ui error message"></div>

        </form>

        <div class="ui message">
          <span>สมาชิกใหม่?</span> <a  v-link="{path:'/signup'}">สมัคร</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { login } from './../../actions/login'
export default {
  ready () {

  },
  data () {
    return {
      username: '',
      password: '',
      loginSuccess: true
    }
  },
  vuex: {
    getters: { authen_status: state => state.authen },
    actions: { login }
  },
  methods: {
    test: () => {
      window.location = '/#!/'
    }
  },
  route: {
    data: function (transition) {
    }
  }
}
</script>
<style>
span{ font-size: 24px}
</style>
