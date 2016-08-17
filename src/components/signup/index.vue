<template>
  <div>
    <br/><br/><br/><br/>
    <div class="ui middle aligned center aligned grid">
      <div class="five wide column">
        <h2 class="ui teal image header">

          <div class="content">
            <h1>สมัครสมาชิก</h1>
          </div>
        </h2>
        <form class="ui large form">
          <div class="ui stacked segment">
            <div class="field">
              <div class="ui left icon input">
                <i class="user icon"></i>
                <input type="text" name="Name" v-model="name" placeholder="ชื่อ">
              </div>
            </div>
            <div class="field">
              <div class="ui left icon input">
                <i class="user icon"></i>
                <input type="text" name="email" v-model="email" placeholder="อีเมลย์">
              </div>
            </div>
            <div class="field" v-bind:class="{ 'error': passwordNotMatch }">
              <div class="ui left icon input">
                <i class="lock icon"></i>
                <input type="password" name="password" v-bind:class="{ 'error': false}" v-model="password" placeholder="รหัสผ่าน">
              </div>
            </div>
            <div class="field" v-bind:class="{ 'error': passwordNotMatch }">
              <div class="ui left icon input red">
                <i class="lock icon"></i>
                <input type="password" name="password" class="error"   v-model="repassword" placeholder="ใส่รหัสผ่านอีกครั้ง">
              </div>
            </div>
            <div class="ui fluid large teal submit button" @click="signup(name, email, password)"><h1>สมัครเลย!</h1></div>
          </div>

          <div class="ui error message"></div>

        </form>


      </div>
    </div>
    <div class="ui small basic signup_success modal transition">
      <div class="ui icon header">
        <i class="archive icon"></i>
        สมัครเสร็จสมบูรณ์แล้ว
      </div>
      <div class="content">
        <p>คุณสามาถเข้าใช้งานห้องสนทนาเลย</p>
      </div>
      <div class="actions">
        <div class="ui green ok inverted button">
          <i class="checkmark icon"></i>
          ตกลง
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { signup } from './../../actions/login'
export default {
  data () {
    return {
      email: '',
      password: '',
      repassword: '',
      name: '',
      passwordNotMatch: false
    }
  },
  ready () {
    this.$watch('repassword', (val, oldval) => {
      console.log(val + '==' + oldval)
      if (val.length > 4 && val !== this.password) {
        this.passwordNotMatch = true
      } else {
        this.passwordNotMatch = false
      }
    })
  },
  vuex: {
    getters: { authen_status: state => state.authen },
    actions: { signup }
  },
  methods: {
    test: () => {
      window.location = '/#!/'
    }
  }
}
</script>

</style>
