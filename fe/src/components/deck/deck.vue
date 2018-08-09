<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex md6>
        <v-card>
          <now-loading :show="show" />
          <template v-if="show">
            <v-card-title>
              {{ `${deck.name} (${deckSize})` }}
              <v-spacer />
              <v-btn icon flat @click="mod()"><v-icon>edit</v-icon></v-btn>
              <deck-del :id="id" />
            </v-card-title>
            <v-card-text>
              <v-list class="deck-builder" dense>
                <template v-for="(s, index) in subheaders">
                  <v-subheader v-if="haveContents(s)">{{ s.name }}</v-subheader>
                  <template v-for="(i, index) in deck.cards">
                    <v-list-tile :key="index" v-if="s.value(i)" @click="">
                      <v-list-tile-title>
                        {{ `${i.qty}x ` }}<span v-html="factionIcons(i.card.faction)"></span><span class="font-icon icon-unique" v-if="i.card.isUnique"></span>{{ `${i.card.name}` }}
                        <template v-if="i.card.xp">
                          {{ `(${i.card.xp})` }}
                        </template>
                      </v-list-tile-title>
                      <v-list-tile-content />
                      <v-list-tile-action>
                        <v-btn icon flat @click="setBasicWeakness()" v-if="index === 0"><v-icon>shuffle</v-icon></v-btn>
                      </v-list-tile-action>
                    </v-list-tile>
                  </template>
                </template>
              </v-list>
            </v-card-text>
          </template>
        </v-card>
      </v-flex>
      <v-flex md6>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import deckDel from '@/components/deck/deck-del'
import nowLoading from '@/components/now-loading'
import cardStyleMixin from '@/components/mixins/card-style-mixin'
import cardListMixin from '@/components/mixins/card-list-mixin'

export default {
  mixins: [
    cardStyleMixin,
    cardListMixin
  ],
  components: {
    nowLoading,
    deckDel
  },
  props: {
    id: { type: String, default: '' }
  },
  data () {
    return {
      show: false,
      basicWeakness: [],
      deck: {
        name: '',
        investigator: {},
        cards: [],
        ut: ''
      },
      rbw: {
        card: {
          _id: '',
          name: 'Random Basic Weakness',
          faction: '',
          type: ''
        },
        qty: 1,
        require: true
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
  computed: {
    deckSize: function () {
      let size = 0
      this.deck.cards.forEach((i) => {
        if (!i.require) size += i.qty
      })
      return size
    }
  },
  methods: {
    mod () {
      this.$router.push({ name: 'deck-mod', query: { id: this.id, invId: this.deck.investigator.id } })
    },
    getDeck (id) {
      this.$axios.get(`${this.$cfg.path.api}data/deck`, {
        params: {
          id: id
        }
      })
      .then((res) => {
        if (!res.data.success) throw new Error(res.data.msg)
        this.deck = res.data.deck
        this.deck.cards.unshift(this.rbw)
        this.show = true
      })
      .catch((err) => {
        console.log(err.message)
      })
    },
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
  },
  created () {
    this.getDeck(this.id)
    this.getBasicWeakness()
  }
}
</script>
