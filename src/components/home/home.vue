<template>
  <div>
    <h1>Home page</h1>
  </div>
</template>
<script>
export default {
  vuex: {
    getters: { authen_status: state => state.authen }
  },
  methods: {
  }
}
</script>

</style>
