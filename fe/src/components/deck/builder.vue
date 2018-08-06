<template>
  <div>
    <p v-for="(i, index) in cards.array" :key="index">
      <span v-html="factionIcons(i.faction)"></span>{{ i.name }}<span v-if="i.xp">{{ `(${i.xp})` }}</span>
    </p>
  </div>
</template>

<script>
import cardListMixin from '@/components/mixins/card-list-mixin'
import replaceMixin from '@/components/mixins/replace-mixin'

export default {
  mixins: [
    cardListMixin,
    replaceMixin
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
