<template>

</template>

<script>
import cardListMixin from '@/components/mixins/card-list-mixin'

export default {
  mixins: [
    cardListMixin
  ],
  data () {
    return {
      basicWeakness: [],
      deck: {
        name: '',
        investigator: {},
        cards: [],
        ut: ''
      },
      subheaders: [
        {
          name: 'Deck requirements',
          value: (value) => { return value.require === true }
        },
        {
          name: this.$cfg.const.TYPES[0],
          value: (value) => { return value.card.type === this.$cfg.const.TYPES[0] && value.require === false }
        },
        {
          name: this.$cfg.const.TYPES[1],
          value: (value) => { return value.card.type === this.$cfg.const.TYPES[1] && value.require === false }
        },
        {
          name: this.$cfg.const.TYPES[2],
          value: (value) => { return value.card.type === this.$cfg.const.TYPES[2] && value.require === false }
        }
      ]
    }
  },
  methods: {
    haveContents (subheader) {
      let contents = 0
      this.deck.cards.forEach((i) => {
        if (subheader.value(i)) contents++
      })

      if (contents > 0) return true
      return false
    },
    getBasicWeakness () {
      this.getCardList({
        draw: 0,
        order: '_id',
        sort: 1,
        limit: 0,
        query: {
          subtype: 'Basic Weakness'
        }
      })
      .then((res) => {
        if (!res.data.success) throw new Error(res.data.msg)
        this.basicWeakness = res.data.cards.array
      })
      .catch((err) => {
        console.log(err.message)
      })
    },
    setBasicWeakness () {
      const weak = this.basicWeakness
      const min = 0
      const max = weak.length
      const index = Math.floor(Math.random() * (max - min)) + min
      this.deck.cards.unshift({
        card: weak[index],
        _id: weak[index]._id,
        qty: 1,
        require: true
      })

      this.deck.cards.splice(1, 1)
    }
  }
}
</script>
