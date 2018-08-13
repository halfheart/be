<template>
  <div>
    <v-data-table
    :headers="headers"
    :items="cards.array"
    hide-actions
    disable-initial-sort>
      <template slot="items" slot-scope="cards">
        <td>
          <v-layout>
            <span class="font-icon icon-unique" v-if="cards.item.isUnique"></span>
            <card-popover :card="cards.item" :show-subname="true" my-style="py-2 pr-2" />
            <span v-if="cards.item.xp">{{ `(${cards.item.xp})` }}</span>
          </v-layout>
        </td>
        <td>
          <v-layout>
            <span v-html="factionIcons(cards.item.faction)"></span>{{ cards.item.faction }}
          </v-layout>
        </td>
        <td>{{ cards.item.cost }}</td>
        <td>{{ cards.item.type }}</td>
        <td>
          <span v-if="cards.item.type !== $cfg.const.INVESTIGATOR" v-html="testIcons(cards.item)" />
        </td>
        <td>
          <span v-for="(i, index) in cards.item.trait" :key="index">{{ `${i}. `}}</span>
        </td>
        <td>{{ `${cards.item.includedPack.name} #${cards.item.number}` }}</td>
        <td>
          <v-layout>
            <investigator-mod v-if="cards.item.type === $cfg.const.INVESTIGATOR" :id="cards.item._id" @list="list()" />
            <playercard-mod v-if="cards.item.type !== $cfg.const.INVESTIGATOR" :id="cards.item._id" @list="list()" />
            <card-del :id="cards.item._id" @list="list()" />
          </v-layout>
        </td>
      </template>
    </v-data-table>
    <div class="text-xs-center">
      <v-pagination v-model="p.page" @input="list()" :length="5" />
    </div>
    <card-add @list="list()" />
  </div>
</template>

<script>
import cardPopover from '@/components/card/card-popover'
import cardAdd from '@/components/card/card-add'
import cardDel from '@/components/card/card-del'
import investigatorMod from '@/components/card/investigator/investigator-mod'
import playercardMod from '@/components/card/playercard/playercard-mod'
import cardStyleMixin from '@/components/mixins/card-style-mixin'
import cardListMixin from '@/components/mixins/card-list-mixin'

export default {
  mixins: [
    cardStyleMixin,
    cardListMixin
  ],
  components: {
    cardPopover,
    cardAdd,
    cardDel,
    playercardMod,
    investigatorMod
  },
  name: 'card-list',
  data () {
    return {
      headers: [
        {
          text: '카드 이름',
          sortable: true,
          value: 'name'
        },
        {
          text: '진영',
          sortable: true,
          value: 'faction'
        },
        {
          text: '비용',
          sortable: true,
          value: 'cost'
        },
        {
          text: '유형',
          sortable: true,
          value: 'type'
        },
        {
          text: '테스트',
          sortable: false
        },
        {
          text: '특성',
          sortable: false
        },
        {
          text: '세트',
          sortable: true,
          value: 'number'
        },
        {
          text: '편집',
          sortable: false
        }
      ],
      p: {
        page: 1,
        draw: 0,
        order: 'number',
        sort: 1,
        skip: 0,
        limit: 20,
        query: {}
      }
    }
  },
  methods: {
    list () {
      this.getCardList(this.p)
      .then((res) => {
        if (!res.data.success) throw new Error(res.data.msg)
        this.cards = res.data.cards
      })
      .catch((err) => {
        console.log(err.message)
      })
    }
  },
  mounted () {
    this.list()
  }
}
</script>

<style>

</style>
