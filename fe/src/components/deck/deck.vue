<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex md6>
        <v-card>
          <v-card-title>
          {{ deck.name }}
          </v-card-title>
          <v-card-text>
            <v-list class="deck-builder" dense>
              <template v-for="(s, index) in subheaders">
                <v-subheader>{{ s.name }}</v-subheader>
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
        </v-card>
      </v-flex>
      <v-flex md6>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import cardStyleMixin from '@/components/mixins/card-style-mixin'
import cardListMixin from '@/components/mixins/card-list-mixin'

export default {
  mixins: [
    cardStyleMixin,
    cardListMixin
  ],
  props: {
    id: { type: String, default: '' }
  },
  data () {
    return {
      deck: {
        name: '',
        investigator: null,
        cards: [],
        ut: ''
      },
      basicWeakness: [],
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
        this.deck.cards.unshift({
          card: {
            _id: '',
            name: 'Random Basic Weakness',
            faction: '',
            type: ''
          },
          qty: 1,
          require: true
        })
      })
      .catch((err) => {
        console.log(err.message)
      })
    }
  },
  mounted () {
    this.getDeck(this.id)
    this.getBasicWeakness()
  }
}
</script>
