<template>

</template>

<script>
export default {
  data () {
    return {
      cards: {
        cnt: 0,
        draw: 0,
        array: []
      },
      p: {
        page: 1,
        draw: 0,
        order: '_id',
        sort: 1,
        limit: 20,
        query: {}
      }
    }
  },
  computed: {
    setSkip: function () {
      if (this.p.page < 0) return 0

      return this.p.limit * (this.p.page - 1)
    }
  },
  methods: {
    async getCard (id) {
      const res = await this.$axios.get(`${this.$cfg.path.api}data/card`, {
        params: {
          _id: id
        }
      })

      return res
    },
    async getCardList (params) {
      if (params) this.p = params
      const res = await this.$axios.get(`${this.$cfg.path.api}data/card/list`, {
        params: {
          draw: this.p.draw + 1,
          order: this.p.order,
          sort: this.p.sort,
          limit: this.p.limit,
          skip: this.setSkip,
          query: this.p.query
        }
      })

      return res
    }
  }
}
</script>
