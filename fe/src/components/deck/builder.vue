<template>
  <div>
    <p v-for="(i, index) in cards.array" :key="index">
      {{ i.name }}
    </p>
  </div>
</template>

<script>
import cardListMixin from '@/components/mixins/card-list-mixin'

export default {
  mixins: [
    cardListMixin
  ],
  props: {
    id: { type: String, default: null }
  },
  data () {
    return {

    }
  },
  mounted () {
    this.list()
  },
  methods: {
    list () {
      this.$axios.get(`${this.$cfg.path.api}data/card/deckSourceList`, {
        params: {
          id: this.id,
          draw: this.p.draw + 1
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
