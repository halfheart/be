<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex md6>
        <v-card>
          <v-list>
            <template v-for="(i, index) in deck">
              <v-list-tile :key="index">
                <v-list-tile-content>
                  {{ `${i.qty} ${i.card.name}` }}
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-btn icon flat @click="removeFromDeck(i)"><v-icon>remove</v-icon></v-btn>
                </v-list-tile-action>
              </v-list-tile>
            </template>
          </v-list>
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

export default {
  components: {
    sourceList
  },
  props: {
    id: { type: String, default: null }
  },
  data () {
    return {
      deck: []
    }
  },
  methods: {
    addToDeck (e) {
      const id = e._id
      if (this.isExist(id)) {
        const index = this.indexOfCard(id)
        this.deck[index].qty += 1
      } else {
        this.deck.push({
          card: e,
          _id: id,
          qty: 1
        })
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
    indexOfCard (id) {
      const index = this.deck.findIndex((i) => {
        return i._id === id
      })

      return index
    }
  }
}
</script>
