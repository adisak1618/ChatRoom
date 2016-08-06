/*global $ */
<template>
  <div>
    <div id="Events" class="ui container">
      <!-- ADD {{count}}
      <button @click="increment">+</button>
      <button>-</button> -->
      <div class="ui segment">

        <div class="ui buttons right">
          <button @click="getEvent(userid)" class="ui button active positive">เปิด</button>
          <div class="or" data-text="or"></div>
          <button @click="getCloseEvent(userid)" class="ui button ">ปิด</button>
        </div>
      </div>
      <div id="event-list">
        <div class="ui doubling stackable three column grid">
          <div v-for="event in events" class="column">
            <div class="ui fluid card">
              <div class="content">
                <div class="header">{{event.topic}}</div>
                <div class="meta">
                  <a>{{event.own_id.name}}</a>
                </div>
                <div class="description">
                  {{event.description}}
                </div>
              </div>
              <div class="extra content">
                <span class="right floated">
                  {{event.createDate}}
                </span>
                <span>
                  <i class="user icon"></i>
                  {{event.join_list.length}} Peoples
                </span>
              </div>
              <a v-link="{ path: '/topic/' + event._id}">
                <div class="ui green bottom attached button">
                  <i class="add icon"></i>
                  เข้าร่วม
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as actions from './../../actions/counter'
import * as event from './../../actions/event'
export default {
  data () {
    return {
      userid: localStorage.getItem('id')
    }
  },
  ready () {
    console.log('THISSSS')
    console.log(this.userid)
    console.log(this)
    this.getEvent(this.userid)
    window.addEventListener('scroll', function () {
      console.log('dasdfasdfasdfsafasdf')
    })
  },
  vuex: {
    getters: {
      events: state => state.Event
    },
    actions: Object.assign({}, event, actions)
  }
}
</script>
<style>
  #Events{
    padding: 20px;
  }
  .right{
    float: right;
  }
  .segment{
    overflow: hidden;
  }
</style>
