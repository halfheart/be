<template>
  <div>
    <v-data-table
    :headers="headers"
    :items="cards.array"
    hide-actions
    disable-initial-sort>
      <template slot="items" slot-scope="cards">
        <td>
          <span class="font-icon icon-unique" v-if="cards.item.isUnique"></span>
          <card-popover :card="cards.item" :show-subname="true" my-style="py-2 pr-2" />
        </td>
        <td><span v-html="factionIcons(cards.item.faction)"></span>{{ cards.item.faction }}</td>
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
import cardPopover from '@/components/card/card-popover'
import cardAdd from '@/components/card/card-add'
import cardDel from '@/components/card/card-del'
import investigatorMod from '@/components/card/investigator/investigator-mod'
import playercardMod from '@/components/card/playercard/playercard-mod'
import replaceMixin from '@/components/mixins/replace-mixin'
import cardListMixin from '@/components/mixins/card-list-mixin'

export default {
  mixins: [
    replaceMixin,
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
        columns: ['name'],
        searches: [''],
        order: 'number',
        sort: 1,
        skip: 0,
        limit: 20
      }
    }
  },
  mounted () {
    this.list()
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
.popover {
  padding-top: 2px;
  padding-bottom: 2px;
  padding-right: 2px;
  padding-left: 2px;
}
</style>
