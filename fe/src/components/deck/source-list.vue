<template>
  <v-card>
    <now-loading :show="show" />
    <v-expansion-panel class="source-list" v-if="show">
      <template v-for="(i, index) in cards.array">
        <v-expansion-panel-content :key="index">
          <div slot="header">
            <v-btn icon flat @click="addToDeck($event, i)"><v-icon>add</v-icon></v-btn>
            <span v-html="factionIcons(i.faction)"></span><span class="font-icon icon-unique" v-if="i.isUnique"></span>{{ `${i.name} ` }}<span v-if="i.xp">{{ `(${i.xp})` }}</span>
          </div>
          <card-page :card="i" />
        </v-expansion-panel-content>
      </template>
    </v-expansion-panel>
  </v-card>
</template>

<style>
.source-list .v-expansion-panel__header {
  padding-left: 6px;
}
</style>

<script>
import nowLoading from '@/components/now-loading'
import cardListMixin from '@/components/mixins/card-list-mixin'
import cardStyleMixin from '@/components/mixins/card-style-mixin'
import cardPage from '@/components/card/card-page'

export default {
  mixins: [
    cardListMixin,
    cardStyleMixin
  ],
  components: {
    cardPage,
    nowLoading
  },
  props: {
    id: { type: String, default: null }
  },
  data () {
    return {
      show: false
    }
  },
  created () {
    this.getList()
  },
  methods: {
    addToDeck (e, i) {
      e.stopPropagation()
      this.$emit('add', i)
    },
    getList () {
      this.$axios.get(`${this.$cfg.path.api}data/card/deckSourceList`, {
        params: {
          id: this.id,
          draw: this.p.draw + 1
        }
      })
      .then((res) => {
        if (!res.data.success) throw new Error(res.data.msg)
        this.cards = res.data.cards
        this.show = true
      })
      .catch((err) => {
        console.log(err.message)
      })
    }
  }
}
</script>
