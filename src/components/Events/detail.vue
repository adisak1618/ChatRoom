/*global localStorage: false, console: false, io: false, socket: false*/
<template>
  <div>
    <div id="Events" class="ui container">
      <div class="ui equal width grid">
        <div class="sixteen wide mobile ten wide tablet ten wide computer column">
          <div class="ui stacked segment">
            <h1 class="ui header center">{{Topic.topic }}</h1>
            <div id="ChatArea" class="ui chat segment">
              <div class="message-container" v-for="message in Topic.messages">
                <div v-if="message.messageType === 'TEXT'">
                  <div v-if="!(ownid === message.user_id) " class="message-name ui label">
                    {{message.name}}
                  </div>
                  <div :class="{ ownmessage: (ownid === message.user_id) }" class="message-text ui  white basic label">
                    <p>{{message.message}}</p>
                  </div>
                </div>
                <div v-if="message.messageType === 'JOIN'">
                  <div class="message-name ui label joinevent">
                    {{message.name}} เข้าร่วมห้องสนทนา
                  </div>
                </div>
                <div v-if="message.messageType === 'STICKER'">
                  <div v-if="!(ownid === message.user_id) " class="message-name ui label">
                    {{message.name}}
                  </div>
                  <div :class="{ ownmessage: (ownid === message.user_id) }" class="message-text ui sticker">
                    <img v-bind:src="'/static/sticker/'+message.message">
                  </div>
                </div>
              </div>
            </div>
            <div v-show='Joined && Topic.status === 0' v-on:keyup.enter="push_msg($store, TextMessage, sendMessage, $route.params.id, 'TEXT')" class="ui form">
                <div class="ui input fluid">
                  <input id="typing" v-model="TextMessage" type="text" name="message" placeholder="ข้อความ">
                  <button @click="sticker_panel = !sticker_panel" class="ui teal right icon button"><i class="smile icon"></i></button>
                </div>
                <div v-if="sticker_panel" id="sticker_panel" class="ui card">
                  <div class="ui grid">
                    <div class="doubling three column row">
                      <div v-for="item in sticker_list" class="column sticker_item">
                        <div class="image" @click="push_msg($store, item.img+'.'+item.type, sendMessage, $route.params.id, 'STICKER')">
                          <img v-bind:src="'/static/sticker/'+item.img+'.'+item.type">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
            <div v-show='!Joined && Topic.status === 0' class="ui form">
                <div class="required fields">
                  <div class="sixteen wide field">
                    <button @click="join_EVENT_method($store, joinEvent, $route.params.id, username, JoinNumber)" class="ui massive fullwidth button green larg" type="submit">เข้าร่วม<i class="right arrow icon"></i></button>
                  </div>
                </div>
            </div>
          </div>
        </div>
        <div class="column center">
          <div class="ui stacked segment">
            <h2 @click="adisak()" class="center ui header">{{Topic.own_id.name}}</h2>
            <button v-if="ownTopic(Topic.own_id.id) && Topic.status === 0" @click="confirm_close(closeEvent, $route, Topic._id)" class="blue inverted wide fullwidth ui button">ปิดหัวข้อสนทนา</button>
            <h2 class="ui center aligned icon header">
              <i class="circular users icon"></i>
              <p>Join</p>
              <p>{{JoinNumber}}</p>
              <button v-if="ownTopic(Topic.own_id.id)" @click="confirm_delete(delEvent, $route, Topic._id)" class="red inverted wide fullwidth ui button">ลบ</button>
            </h2>
          </div>
        </div>
      </div>
    </div>

    <div class="ui small basic confirm_close modal transition">
      <div class="ui icon header">
        <i class="archive icon"></i>
        โปรดยืนยันเพื่อปิดหัวข้อการสนทนา
      </div>
      <div class="content">
        <p>เมื่อหัวข้อสนทนาถูกปิดแล้วจะไม่สามารถนำกลับมาได้ </p>
        <p>คุณแน่ใจที่จะปิดหัวข้อสนทนานี้หรือไม่</p>
      </div>
      <div class="actions">
        <div class="ui red basic cancel inverted button">
          <i class="remove icon"></i>
          No
        </div>
        <div class="ui green ok inverted button">
          <i class="checkmark icon"></i>
          Yes
        </div>
      </div>
    </div>

    <div class="ui small basic confirm_delete modal transition">
      <div class="ui icon header">
        <i class="archive icon"></i>
        โปรดยืนยันเพื่อลบหัวข้อการสนทนา
      </div>
      <div class="content">
        <p>เมื่อหัวข้อสนทนาถูกลบแล้วจะไม่สามารถนำกลับมาได้ </p>
        <p>คุณแน่ใจที่จะลบหัวข้อสนทนานี้หรือไม่</p>
      </div>
      <div class="actions">
        <div class="ui red basic cancel inverted button">
          <i class="remove icon"></i>
          No
        </div>
        <div class="ui green ok inverted button">
          <i class="checkmark icon"></i>
          Yes
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { BASE_URL } from './../../const'
import * as event from './../../actions/event'
import $ from 'jquery'
import io from 'socket.io-client'
import { sticker } from './../../../sticker.config'
let socket = io(BASE_URL)
export default {
  data () {
    return {
      username: localStorage.getItem('name'),
      TextMessage: '',
      Joined: false,
      message_list: [],
      ownid: localStorage.getItem('id'),
      room: '',
      sticker_panel: false,
      sticker_list: sticker
    }
  },
  methods: {
    join_EVENT_method: (store, joinEvent, id, username, join_num) => {
      //alert(Number(join_num))
      socket.emit('join', Number(join_num) + 1, id)
      socket.emit('message', { 'messageType': 'JOIN', 'user_id': localStorage.getItem('id'), 'message': 'hi i join event', 'name': localStorage.getItem('name'), 'date': new Date() }, id)
      joinEvent(id, username)
    },
    push_msg: (store, message, sendMessage, id, type) => {
      // sendMessage(this.$route.params.id,TextMessage)
      console.log(message)
      console.log('MMMMMMMMMMMMMMMMM')
      if (message !== '' &&  message !== null) {
        console.log(store)
        sendMessage(id, message, type)
        socket.emit('message', { 'messageType': type, 'user_id': localStorage.getItem('id'), 'message': message, 'name': localStorage.getItem('name'), 'date': new Date() }, id)
        console.log('this');
        console.log(this);
        $('#typing').val('')
      }
    },
    ownTopic: (id) => {
      console.log('own topic')
      console.log(id)
      console.log(localStorage.getItem('id'))
      return id === localStorage.getItem('id')
    },
    confirm_delete: (fn, route, id) => {
      $('.ui.confirm_delete.modal')
      .modal({
        detachable: false,
        onDeny    : function(){
          $('.ui.modal').modal('hide all')
        },
        onApprove : function() {
          fn(id, route)
          $('.ui.modal').modal('hide all')
        }
      })
      .modal('show')
    },
    confirm_close: (fn, route, id) => {
      $('.ui.confirm_close.modal')
      .modal({
        detachable: false,
        onDeny    : function(){
          $('.ui.modal').modal('hide all')
        },
        onApprove : function() {
          //closeEvent(Topic._id, $route)
          fn(id, route)
          $('.ui.modal').modal('hide all')
        }
      })
      .modal('show')
    }
  },
  vuex: {
    getters: {
      Topic: state => state.Topic,
      JoinNumber: state => state.join_number
    },
    actions: Object.assign({}, event)
  },
  attached () {
  },
  ready () {
    // sendMessage(this.$route.params.id,TextMessage)

    // this.join_number = this.Topic.join_list.length
    var that = this
    this.room = this.$route.params.id
    socket.emit('joinRoom', this.$route.params.id)
    socket.on('message', function (data) {
      that.pushMessage(data.message, data.messageType, data.name, data.user_id)
      // alert(data);
      console.log('Incoming message from Com:', data)
    })
    //var that = this
    socket.on('join', function (data) {
      console.log('UODATE JOIN NUMBER')
      console.log(data)
      that.updateJoinNum(data)
      if (data === 'JOINED') {
        that.getSingleEvent(that.$route.params.id)
      }
    })
    console.log('Thiks')
    console.log(this)
    console.log('YYYYYYYYYYYYY')
    console.log(this.topic_id)
    this.getSingleEvent(this.$route.params.id)
    this.message_list = this.Topic.messages
    this.$watch('Topic', (val, oldval) => {
      let height = 0
      $('#ChatArea .message-container').each((i, value) => {
        height += Math.ceil($(value).height()) + 10
      })
      $('#ChatArea').animate({scrollTop: height + 1000})
      console.log(height)

      this.sticker_panel = false
      if (val.join_list instanceof Array) {
        val.join_list.map((data) => {
          if (data.user_id === localStorage.getItem('id')) {
            this.Joined = true
          }
        })
      }
    },
      {
        deep: true
      }
    )
  },
  destroyed (test) {
    console.log('LEAVE ROOM ID => ' + this.room)
    socket.emit('leaveRoom', this.room)
    socket.removeListener('message')
    $('.ui.confirm_delete.modal').modal('destroy')
  }
}
</script>
<style>
  #sticker_panel{
    position: absolute;
    bottom: 44px;
    right: 4px;
    padding: 3px;
    max-height: 450px;
    overflow-y: auto;
    overflow-x: hidden;
  }
  #sticker_panel .sticker_item:hover{
    background: #eee;
  }
  #sticker_panel .column img {
    width: 100%;
    cursor: pointer;
  }
  .center{
    text-align: center;
  }
  .chat{
    background: #efefef !important;
  }
  .fullwidth{
    width: 100%
  }
  .message-container{
    margin-bottom: 10px;
    overflow: hidden;
  }
  .sticker{
    height: 120px;
    display: inline-block;
    vertical-align: baseline;
  }
  .sticker img{
    height: 100%
  }
  .ownmessage{
    float: right;
  }
  .message-container .message-name{
    margin-top: -50%;
  }
  #ChatArea{
    min-height: 400px;
    max-height: 600px;
    overflow: auto;
  }
  .joinevent {
    color: #f99b24 !important;
    background: #f9f9f9 !important;
    margin-left: 35% !important;
  }

  .message-text {
    font-size: 24px !important;
  }
  .message-name {
    font-size: 24px !important;
    font-weight: bold !important;
  }
</style>
