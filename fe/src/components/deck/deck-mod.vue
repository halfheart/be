<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex md6>
        <v-card>
          <now-loading :show="show" />
          <template v-if="show">
            <v-card-title class="builder-title">
            {{ deck.name }}<span :class="{ danger: !deckValidate }">{{ `(${deckSize}/${deckLimit})` }}</span>
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
        <template v-if="show">
          <source-list @add="addToDeck($event)" :id="deck.investigator._id" />
        </template>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import builder from '@/components/deck/builder'

export default {
  extends: builder,
  data () {
    return {
    }
  },
  created () {
    this.getDeck(this.id)
  },
  methods: {
    submit () {
      this.pending = true
      this.$axios.put(`${this.$cfg.path.api}data/deck`, {
        _id: this.id,
        name: this.deck.name,
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
    getInvestigator () {
      // Overriding NOP
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
    }
  }
}
</script>
