<template>
  <div>
    <div class="ui large top menu transition visible">
      <div class="ui container">
        <a class="item" v-link="{ path: '/'}" v-bind:class="{ 'activelink': $route.path === '/'}"><i class="home icon"></i>หน้าหลัก</a>
        <a class="item" v-link="{ path: '/topics', activeClass: 'activelink'}"><i class="talk icon"></i>หัวข้อสนทนา</a>
        <a class="item" v-link="{ path: '/add', activeClass: 'activelink'}"><i class="add cicle icon"></i>เพิ่ม</a>
        <div class="right menu">
          <div class="item">
            <div class="ui search">
              <div class="ui left icon input">
                <input class="prompt" type="text" placeholder="ค้นหาหัวข้อสนทนา">
                <i class="comment icon"></i>
              </div>
            </div>
          </div>
          <a v-if="authen_status" class="item" v-link="{ path: '/profile', activeClass: 'activelink'}">{{name}}</a>
          <div class="item">
            <a v-if="!authen_status" class="ui green button" v-link="{ path: '/login' }">ลงชื่อเข้าใช้</a>
            <a v-if="authen_status" class="ui red button" @click="LoginFail">ออกจากระบบ</a>
          </div>
          <div v-if="!authen_status" class="item">
            <a class="ui primary button" v-link="{ path: '/signup' }">สมัคร</a>
          </div>
        </div>


      </div>
    </div>
  </div>
</template>
<script>
import * as actions from './../../actions/login'
/*eslint-disable no-unused-vars*/
import semantic from 'semantic'
export default {
  data () {
    return {
      username: localStorage.getItem('name')
    }
  },
  ready () {
    this.setName(localStorage.getItem('name'))
    $('.ui.search')
    .search({
      type          : 'category',
      minCharacters : 3,
      maxResults: 7,
      apiSettings   : {
        onResponse: function(dataResponse) {
          console.log(dataResponse)
          var
            response = {
              results : {}
            }
          ;
          // translate GitHub API response to work with search
          $.each(dataResponse, function(index, item) {
            var
              status   = item.status === 0 ? 'OPEN' : 'CLOSE',
              maxResults = 8
            ;
            if(index >= maxResults) {
              return false;
            }
            // create new language category
            if(response.results[status] === undefined) {
              response.results[status] = {
                name    : status,
                results : []
              };
            }
            // add result to category
            response.results[status].results.push({
              title       : item.topic,
              description : item.description,
              url         : '/#!/topic/' + item._id
            });
          });
          return response;
        },
        url: '//10.4.52.75:3000/v1/message/find/{query}'
      }
    })
  },
  vuex: {
    getters: { authen_status: state => state.authen, name: state => state.name},
    actions: Object.assign({}, actions)
  },
  methods: {
  }
}
</script>

<style media="screen">
  a {
    font-size: 25px;
    font-weight: bold !important;
  }
  a.button {
    font-size: 22px !important;
    padding: 15px !important;
  }

  .activelink{
    background: #21ba45 !important;
    color: #FFF !important;
  }
</style>
