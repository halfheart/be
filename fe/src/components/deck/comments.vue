<template>
  <v-card>

  </v-card>
</template>

<script>
export default {
  props: {
    id: { type: String, default: '' }
  },
  data () {
    return {
      d: {
        cnt: 0,
        ds: []
      }
    }
  },
  created () {
    this.$axios.get(`${this.$cfg.path.api}data/deck/comment`, {
      target_id: this.id
    })
    .then((res) => {
      if (!res.data.success) throw new Error(res.data.msg)
      this.d = res.data.d
    })
    .catch((err) => {
      console.log(err.message)
    })
  }
}
</script>
