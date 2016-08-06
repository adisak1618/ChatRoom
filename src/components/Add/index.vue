<template>
  <div>
    <div class="ui container">
      <br/><br/>
      <div class="ui padded segment">
        <div class="header">
          <h1 style='text-align:center'>หัวข้อใหม่</h1>
        </div>
        <div class="ui form">
          <div class="field">
            <label>หัวข้อเรื่อง</label>
            <input v-model="topic" type="text">
          </div>
          <div class="field">
            <label>รายละเอียด</label>
            <textarea v-model="description" rows="2" style="margin-top: 0px; margin-bottom: 0px; height: 65px;"></textarea>
          </div>
          <button @click="addEvent(topic, description, $route)" class="green ui button right big">เพิ่ม</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { addEvent } from './../../actions/event'
export default {
  data () {
    return {
      topic: '',
      description: ''
    }
  },
  vuex: {
    getters: {
      count: state => state.count
    },
    actions: { addEvent }
  }
}
</script>
<style media="screen">
    label{
      font-size: 22px !important;
    }
</style>
