<template>
  <div>
    <v-data-table
    :headers="headers"
    :items="cards.array"
    hide-actions
    disable-initial-sort>
      <template slot="items" slot-scope="cards">
        <td>
          <span class="font-icon icon-unique" v-if="cards.item.isUnique" />
          {{ (cards.item.subname) ? `${cards.item.name}: ${cards.item.subname}` : `${cards.item.name}`}}
        </td>
        <td v-html="factionIcons(cards.item.faction)"></td>
        <td>{{ cards.item.cost }}</td>
        <td>{{ cards.item.type }}</td>
        <td>
          <span v-if="cards.item.type !== $cfg.const.INVESTIGATOR" v-html="testIcons(cards.item)" />
        </td>
        <td>{{ traitLists(cards.item.trait) }}</td>
        <td>{{ `${cards.item.includedPack.name} #${cards.item.number}` }}</td>
        <td>
          <investigator-mod v-if="cards.item.type === $cfg.const.INVESTIGATOR" :id="cards.item._id" @list="list()" />
          <playercard-mod v-if="cards.item.type !== $cfg.const.INVESTIGATOR" :id="cards.item._id" @list="list()" />
          <card-del :id="cards.item._id" @list="list()" />
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
import cardAdd from '@/components/card/card-add'
import cardDel from '@/components/card/card-del'
import investigatorMod from '@/components/card/investigator/investigator-mod'
import playercardMod from '@/components/card/playercard/playercard-mod'
import iconMixin from '@/components/mixins/icon-mixin'

export default {
  mixins: [
    iconMixin
  ],
  components: {
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
      cards: {
        cnt: 0,
        draw: 0,
        array: []
      },
      p: {
        page: 1,
        draw: 0,
        search: '',
        order: 'number',
        sort: 1,
        skip: 0,
        limit: 20
      }
    }
  },
  computed: {
    setSkip: function () {
      if (this.p.page < 0) return 0

      return this.p.limit * (this.p.page - 1)
    }
  },
  mounted () {
    this.list()
  },
  methods: {
    list () {
      this.$axios.get(`${this.$cfg.path.api}data/card/list`, {
        params: {
          draw: this.p.draw + 1,
          search: this.p.search,
          order: this.p.order,
          sort: this.p.sort,
          limit: this.p.limit,
          skip: this.setSkip
        }
      })
      .then((res) => {
        if (!res.data.success) throw new Error(res.data.msg)
        this.cards = res.data.cards
      })
      .catch((err) => {
        console.log(err.message)
      })
    }
  }
}
</script>

<style>
@font-face {
  font-family: "arkham-icons";
  src: url('http://localhost:3000/fonts/arkham-icons.woff') format('woff'),
      url('http://localhost:3000/fonts/arkham-icons.tfilter.type') format('truetype'),
      url('http://localhost:3000/fonts/arkham-icons.svg') format('svg'),
      url('http://localhost:3000/fonts/arkham-icons.ofilter.type') format('opentype')
}
.icon-action:before {
  content: "i";
}
.icon-combat:before {
  content: "c";
  color: #663300;
}
.icon-agility:before {
  content: "a";
  color: #006633;
}
.icon-willpower:before {
  content: "p";
  color: #333399;
}
.icon-intellect:before {
  content: "b";
  color: #330066;
}
.icon-reaction:before {
  content: "!";
}
.icon-fastaction:before {
  content: "j";
}
.icon-unique:before {
  content: "s"
}
.icon-eldersign:before {
  content: "o"
}
.icon-autofail:before {
  content: "m"
}
.icon-wild:before {
  content: "?";
  font-weight: bold;
  padding-right: 3px;
  padding-left: 3px;
}
.font-icon {
  font-family: "arkham-icons";
  font-size: 15pt;
}
.icon-guardian {
  background-image: url('http://localhost:3000/images/system/guardian_icon.png');
}
.icon-seeker {
  background-image: url('http://localhost:3000/images/system/seeker_icon.png');
}
.icon-rogue {
  background-image: url('http://localhost:3000/images/system/rogue_icon.png');
}
.icon-survivor {
  background-image: url('http://localhost:3000/images/system/survivor_icon.png');
}
.icon-mystic {
  background-image: url('http://localhost:3000/images/system/mystic_icon.png');
}
.img-icon {
  width: 1.3em;
  height: 1.3em;
  background-position: center;
  background-repeat: no-repeat;
  display: inline-block;
  box-sizing: border-box;
}
</style>
