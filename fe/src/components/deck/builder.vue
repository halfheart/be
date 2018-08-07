<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex md6>
        <v-card>
          <v-card-title>
          {{ investigatorName }}  Deck ({{ deckSize }})
          </v-card-title>
          <v-card-text>
            <v-list class="deck-builder">
              <template v-for="(i, index) in deck">
                <v-list-tile :key="index">
                  <v-list-tile-title>
                    {{ `${i.qty} ` }}<span v-html="factionIcons(i.card.faction)"></span><span class="font-icon icon-unique" v-if="i.card.isUnique"></span>{{ `${i.card.name}` }}
                    <template v-if="i.card.xp">
                      {{ `(${i.card.xp})` }}
                    </template>
                  </v-list-tile-title>
                  <v-list-tile-content />
                  <v-list-tile-action>
                    <v-btn icon flat @click="removeFromDeck(i)" v-if="!isRequired(i._id)"><v-icon>remove</v-icon></v-btn>
                  </v-list-tile-action>
                </v-list-tile>
              </template>
            </v-list>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex md6>
        <source-list @add="addToDeck($event)" :id="id" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import sourceList from '@/components/deck/source-list'
import cardStyleMixin from '@/components/mixins/card-style-mixin'

export default {
  mixins: [
    cardStyleMixin
  ],
  components: {
    sourceList
  },
  props: {
    id: { type: String, default: null }
  },
  data () {
    return {
      deck: [],
      investigator: {
        name: ''
      }
    }
  },
  computed: {
    investigatorName: function () {
      return this.investigator.name
    },
    deckSize: function () {
      let size = 0
      this.deck.forEach((i) => {
        size += i.qty
      })

      return size
    }
  },
  mounted () {
    this.getInvestigator(this.id)
  },
  methods: {
    isRequired (id) {
      const index = this.indexOfCard(id)

      return this.deck[index].require
    },
    setRequirements (investigator) {
      const requirements = investigator.deckRequirements

      requirements.forEach((i) => {
        this.deck.push({
          card: i,
          _id: i._id,
          qty: 1,
          require: true
        })
      })
    },
    getInvestigator (id) {
      this.$axios.get(`${this.$cfg.path.api}data/card`, {
        params: {
          _id: id
        }
      })
      .then((res) => {
        if (!res.data.success) throw new Error(res.data.msg)
        this.investigator = res.data.card
        this.setRequirements(this.investigator)
      })
      .catch((err) => {
        console.log(err.message)
      })
    },
    addToDeck (e) {
      const id = e._id
      if (!this.isExist(id) && !this.isFull(e.name)) {
        this.deck.push({
          card: e,
          _id: id,
          qty: 1,
          require: false
        })
      } else if (this.isExist(id) && !e.isUnique && !this.isFull(e.name)) {
        const index = this.indexOfCard(id)
        this.deck[index].qty += 1
      }
    },
    removeFromDeck (i) {
      const id = i._id
      const index = this.indexOfCard(id)
      let card = this.deck[index]

      if (card.qty === 1) {
        this.deck.splice(index, 1)
      } else {
        card.qty -= 1
      }
    },
    isExist (id) {
      let result = this.deck.filter((i) => {
        return i._id === id
      })

      if (result.length > 0) return true
      return false
    },
    isFull (name) {
      let qty = 0
      this.deck.forEach((i) => {
        if (i.card.name === name) {
          qty += i.qty
        }
      })

      if (qty >= 2) return true
      return false
    },
    indexOfCard (id) {
      const index = this.deck.findIndex((i) => {
        return i._id === id
      })

      return index
    }
  }
}
</script>
