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
        columns: ['name'],
        searches: [''],
        order: '_id',
        sort: 1,
        skip: 0,
        limit: 20
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
    list () {
      this.$axios.get(`${this.$cfg.path.api}data/card/list`, {
        params: {
          draw: this.p.draw + 1,
          columns: this.p.columns,
          searches: this.p.searches,
          order: this.p.order,
          sort: this.p.sort,
          limit: this.p.limit,
          skip: this.setSkip
        }
      })
      .then((res) => {
        if (!res.data.success) throw new Error(res.data.msg)
        this.cards = res.data.cards
      })
      .catch((err) => {
        console.log(err.message)
      })
    }
  }
}
</script>
