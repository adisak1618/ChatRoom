<template>
  <div>
    Chat
  </div>
</template>
<script>

export default {
  ready () {

  },
  data () {
    return {
    }
  },
  vuex: {
    getters: { authen_status: state => state.authen },
  }
}
</script>

</style>
