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
import deckMixin from './mixins/deck-mixin'

export default {
  mixins: [
    cardStyleMixin,
    cardListMixin,
    deckMixin
  ],
  props: {
    id: { type: String, default: '' }
  },
  data () {
    return {

    }
  },
  methods: {
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
