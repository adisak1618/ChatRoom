/*global $ */
<template>
  <div>
    <div id="Events" class="ui container">
      <!-- ADD {{count}}
      <button @click="increment">+</button>
      <button>-</button> -->
      <div id="eventList" class="ui segment">
        <button v-link="{ path: '/add'}" class="ui positive button">
          <i class="plus icon"></i>
          เพิ่มหัวข้อสนทนา
        </button>
        <div class="ui toggle buttons right">
          <button @click="getEvent('')" class="ui button active positive">เปิด</button>
          <div class="or" data-text="or"></div>
          <button @click="getCloseEvent('')" class="ui button ">ปิด</button>
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
                  {{event.createDate | date}}
                </span>
                <span>
                  <i class="user icon"></i>
                  {{event.join_list.length}} Peoples
                </span>
              </div>
              <a v-link="{ path: '/topic/' + event._id}">
                <div class="ui  green bottom attached button">
                  <i class="add icon"></i>
                  เข้าร่วม
                </div>
              </a>
            </div>
          </div>
        </div>
        <div class="ui one column stackable center aligned page grid">
           <div class="column twelve wide">
             <button v-if="open_close === 0" @click="getEventMore('OPEN')" class="ui button">
               เพิ่มเติม
             </button>
             <button v-else @click="getEventMore('CLOSE')" class="ui button">
               เพิ่มเติม
             </button>
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
    this.getEvent('')

  },
  vuex: {
    getters: {
      events: state => state.Event,
      open_close: state => state.eventtype
    },
    actions: Object.assign({}, event, actions)
  }
}
</script>
<style>
  #Events{
    padding: 20px;
  }
  .extra{
    color: #555;
    font-weight: bold;
  }
  .right{
    float: right;
  }
  .segment{
    overflow: hidden;
  }
  #eventList .toggle .button{
    font-size: 28px !important;
    padding: 0 15px !important;
    font-family: 'THSarabunNew' !important;
    font-weight: bold;
  }
  #eventList  .button{
    font-size: 28px !important;
    font-family: 'THSarabunNew' !important;
    font-weight: bold;
  }
  #eventList .or{
    font-size: 16px !important;
    font-weight: bold !important;
  }
</style>
