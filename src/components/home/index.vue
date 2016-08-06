<template>
  <div class="ui container">
    <component :is="authen_status ? 'HomeAuthen': 'Home'">
      <!-- component changes when vm.currentview changes! -->
    </component>
  </div>
</template>
<script>
import Home from './home'
import HomeAuthen from './HomeAuthen'
import Event from './../Events/index'
export default {
  vuex: {
    getters: { authen_status: state => state.authen }
  },
  components: {
    Home: Home,
    Event: Event,
    HomeAuthen: HomeAuthen
  },
  methods: {},
  route: {
    data: function (transition) {
      console.log(transition)
    }
  }
}
</script>

</style>
