<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <now-loading :show="show" />
      <template v-if="show">
        <v-flex v-for="(i, index) in cards.array" :key="index" md4>
          <v-card>
            <v-card-media
            :src="imgPath(i._id)"
            height="150">
            </v-card-media>
            <v-card-title primary-title>
              <h3 class="headline mb-0">{{ i.name }}</h3>
              <div>{{ introduce(i.backFlavor) }}</div>
            </v-card-title>
            <v-card-text>
              <ul>
                <li>덱 사이즈: {{ i.deckSize }}장</li>
                <li v-for="(i, index) in i.deckRequirements" :key="index">
                  <card-popover :card="i" my-style="pr-1" />1장
                </li>
                <li>랜덤 기본 약점 카드 1장</li>
                <li>
                  <span v-for="j in i.deckOption">
                    <span v-if="j.faction !== $cfg.const.FACTIONS[0]">
                      <span v-html="factionIcons(j.faction)"></span>{{ `~${j.max}` }}
                    </span>
                  </span>
                </li>
              </ul>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn flat color="indigo" :href="$cfg.path.web+'deck/edit?id='+i._id">
                선택
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </template>
    </v-layout>
  </v-container>
</template>

<script>
import cardPopover from '@/components/card/card-popover'
import cardListMixin from '@/components/mixins/card-list-mixin'
import cardStyleMixin from '@/components/mixins/card-style-mixin'
import nowLoading from '@/components/now-loading'

export default {
  components: {
    cardPopover,
    nowLoading
  },
  mixins: [
    cardListMixin,
    cardStyleMixin
  ],
  data () {
    return {
      show: false,
      p: {
        page: 1,
        draw: 0,
        order: 'number',
        sort: 1,
        limit: 0,
        query: {
          type: this.$cfg.const.INVESTIGATOR
        }
      }
    }
  },
  methods: {
    imgPath (id) {
      return `${this.$cfg.path.public}/images/${id}.jpg`
    },
    introduce (str) {
      const length = 100
      let result = ''

      result += str.substring(0, length)
      result += '...'

      return result
    },
    list () {
      this.getCardList(this.p)
      .then((res) => {
        if (!res.data.success) throw new Error(res.data.msg)
        this.cards = res.data.cards
        this.show = true
      })
      .catch((err) => {
        console.log(err.message)
      })
    }
  },
  created () {
    this.list()
  }
}
</script>
