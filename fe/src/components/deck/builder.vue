<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex md6>
        <v-card>
          <v-card-title>
          {{ investigatorName }}  Deck ({{ deckSize }}/{{ deckLimit }})
          <v-spacer />
          <v-btn :disabled="!deckValidate" @click="submit()">submit</v-btn>
          </v-card-title>
          <v-card-text>
            <v-list class="deck-builder">
              <template v-for="(s, index) in subheaders">
                <v-subheader v-if="haveContents(s)">{{ s.name }}</v-subheader>
                <template v-for="(i, index) in deck">
                  <v-list-tile :key="index" v-if="s.value(i)">
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
import cardListMixin from '@/components/mixins/card-list-mixin'

export default {
  mixins: [
    cardStyleMixin,
    cardListMixin
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
      investigator: { type: Object, default: null },
      basicWeakness: [],
      requirements: 0,
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
    investigatorName: function () {
      if (this.investigator.name) return this.investigator.name
      return ''
    },
    deckSize: function () {
      let size = 0 - this.requirements
      this.deck.forEach((i) => {
        size += i.qty
      })

      return size
    },
    deckLimit: function () {
      if (this.investigator.deckSize) return this.investigator.deckSize
      return 0
    },
    deckValidate: function () {
      if (this.deckLimit === 0) return false
      if (this.deckSize >= this.deckLimit) return true
      return false
    }
  },
  mounted () {
    this.getInvestigator(this.id)
  },
  methods: {
    submit () {
      console.log('등록됨')
    },
    haveContents (subheader) {
      let contents = 0
      this.deck.forEach((i) => {
        if (subheader.value(i)) contents++
      })

      if (contents > 0) return true
      return false
    },
    isRequired (id) {
      const index = this.indexOfCard(id)

      return this.deck[index].require
    },
    setRequirements (investigator) {
      const requirements = investigator.deckRequirements

      this.requirements = this.deck.push({
        card: {
          name: 'Random Basic Weakness'
        },
        _id: '',
        qty: 1,
        require: true
      })

      requirements.forEach((i) => {
        this.requirements = this.deck.push({
          card: i,
          _id: i._id,
          qty: 1,
          require: true
        })
      })
    },
    getInvestigator (id) {
      this.getCard(id)
      .then((res) => {
        if (!res.data.success) throw new Error(res.data.msg)
        this.investigator = res.data.card
        this.setRequirements(this.investigator)
        this.getBasicWeakness()
      })
      .catch((err) => {
        console.log(err.message)
      })
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
      this.deck.unshift({
        card: weak[index],
        _id: weak[index]._id,
        qty: 1,
        require: true
      })

      this.deck.splice(1, 1)
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
