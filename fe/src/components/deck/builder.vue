<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex md6>
        <v-card>
          <now-loading :show="show" />
          <template v-if="show">
            <v-card-title class="builder-title">
            {{ `${investigatorName} Deck` }}<span :class="{ danger: !deckValidate }">{{ `(${deckSize}/${deckLimit})` }}</span>
            <v-spacer />
            <v-btn :disabled="!deckValidate || pending" :loading="pending" @click="submit()">submit</v-btn>
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
                        <v-btn icon flat @click="removeFromDeck(i)" v-if="!isRequired(i._id)"><v-icon>remove</v-icon></v-btn>
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
        <source-list @add="addToDeck($event)" :id="id" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style>
.builder-title .danger {
  color: #ff0000
}
</style>

<script>
import sourceList from '@/components/deck/source-list'
import deck from '@/components/deck/deck'

export default {
  extends: deck,
  components: {
    sourceList
  },
  data () {
    return {
      requirements: 0,
      pending: false
    }
  },
  computed: {
    investigatorName: function () {
      if (this.deck.investigator !== {}) return this.deck.investigator.name
      return ''
    },
    deckLimit: function () {
      if (this.deck.investigator !== {}) return this.deck.investigator.deckSize
      return 0
    },
    deckValidate: function () {
      if (this.deckLimit === 0) return false
      if (this.deckSize >= this.deckLimit) return true
      return false
    }
  },
  created () {
    this.getInvestigator(this.id)
  },
  methods: {
    getDeck () {
      // Overriding NOP
    },
    submit () {
      this.pending = true
      this.$axios.post(`${this.$cfg.path.api}data/deck`, {
        name: `${this.investigatorName} Deck`,
        investigator: this.deck.investigator,
        cards: this.deck.cards
      })
      .then((res) => {
        if (!res.data.success) throw new Error(res.data.msg)
        const id = res.data.id
        this.$router.push({ name: 'deck', query: { id: id } })
      })
      .catch((err) => {
        console.log(err.message)
        this.pending = false
      })
    },
    isRequired (id) {
      const index = this.indexOfCard(id)

      return this.deck.cards[index].require
    },
    getInvestigator (id) {
      if (!this.id) {
        console.log('잘못된 접근')
        return this.$router.push({ name: 'chooseInvestigator' })
      }
      this.getCard(id)
      .then((res) => {
        if (!res.data.success) throw new Error(res.data.msg)
        this.deck.investigator = res.data.card
        this.setRequirements(this.deck.investigator)
        this.show = true
      })
      .catch((err) => {
        console.log(err.message)
      })
    },
    setRequirements (investigator) {
      const requirements = investigator.deckRequirements

      this.requirements = this.deck.cards.push(this.rbw)

      requirements.forEach((i) => {
        this.requirements = this.deck.cards.push({
          card: i,
          _id: i._id,
          qty: 1,
          require: true
        })
      })
    },
    addToDeck (e) {
      const id = e._id
      if (!this.isExist(id) && !this.isFull(e.name)) {
        this.deck.cards.push({
          card: e,
          _id: id,
          qty: 1,
          require: false
        })
      } else if (this.isExist(id) && !e.isUnique && !this.isFull(e.name)) {
        const index = this.indexOfCard(id)
        this.deck.cards[index].qty += 1
      }
    },
    removeFromDeck (i) {
      const id = i._id
      const index = this.indexOfCard(id)
      let card = this.deck.cards[index]

      if (card.qty === 1) {
        this.deck.cards.splice(index, 1)
      } else {
        card.qty -= 1
      }
    },
    isExist (id) {
      let result = this.deck.cards.filter((i) => {
        return i._id === id
      })

      if (result.length > 0) return true
      return false
    },
    isFull (name) {
      let qty = 0
      this.deck.cards.forEach((i) => {
        if (i.card.name === name) {
          qty += i.qty
        }
      })

      if (qty >= 2) return true
      return false
    },
    indexOfCard (id) {
      const index = this.deck.cards.findIndex((i) => {
        return i._id === id
      })

      return index
    }
  }
}
</script>
