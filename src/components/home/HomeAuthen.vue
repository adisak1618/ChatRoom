/*global $ */
<template>
  <div>
    <div id="Events" class="ui container">
      <!-- ADD {{count}}
      <button @click="increment">+</button>
      <button>-</button> -->
      <!-- Open popular topic -->
      <div class="ui segment teal" style="background:#3381a7; color:#FFF">
        <h1 class="ui algin center teal">บทสนทนายอดนิยมในขณะนี้</h1>
      </div>
      <div id="event-list">
        <div class="ui doubling stackable three column grid">
          <div v-for="event in openPop" class="column">
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


      <!-- Close oppular topic -->
      <div class="ui segment teal" style="background:#3381a7; color:#FFF">
        <h1 class="ui algin center yellow ">บทสนทนายอดนิยมที่สิ้นสุดแล้ว</h1>
      </div>
      <div id="event-list">
        <div class="ui doubling stackable three column grid">
          <div v-for="event in closePop" class="column">
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
                <div class="ui bottom attached button">
                  <i class="add icon"></i>
                  อ่านต่อ
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
    return {}
  },
  ready () {
    console.log('THISSSS')
    console.log(this)
    this.getClosePopEvent()
    this.getOpenPopEvent()

  },
  vuex: {
    getters: {
      openPop: state => state.OpenPopEvent,
      closePop: state => state.ClosePopEvent
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
