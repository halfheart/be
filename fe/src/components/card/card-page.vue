<template>
  <v-card :width="width">
    <v-card-title :class="titleClass(card.faction)">
      <div>
        <div class="headline"><span class="font-icon icon-unique" v-if="card.isUnique"></span>{{ card.name }}</div>
        <span v-if="card.subname">{{ card.subname }}</span>
      </div>
    </v-card-title>
    <v-card-text>
      <div>{{ card.faction }}</div>
      <div>
        <span>{{ card.type }}</span>
        <span v-if="card.slot.length > 0" v-for="(i, index) in card.slot" :key="index">{{ `${i} ` }}</span>
        <span v-if="card.subtype">{{ card.subtype }}</span>
      </div>
      <div class="trait-list">
        <span v-for="(i, index) in card.trait" :key="index">{{ `${i}. ` }}</span>
      </div>
      <div v-if="card.cost">
        {{ `${$cfg.const.COST}: ${card.cost}` }}
      </div>
      <div>
        <span v-if="card.will">{{ `${$cfg.const.WILLPOWER}: ${card.will}` }}</span>
        <span v-if="card.int">{{ `${$cfg.const.INTELLECT}: ${card.int}` }}</span>
        <span v-if="card.combat">{{ `${$cfg.const.COMBAT}: ${card.combat}` }}</span>
        <span v-if="card.agi">{{ `${$cfg.const.AGILITY}: ${card.agi}` }}</span>
        <span v-if="card.wild">{{ `${$cfg.const.WILD}: ${card.wild}` }}</span>
      </div>
      <div v-if="card.health > 0 || card.sanity > 0">
        <span>{{ `${$cfg.const.HEALTH}: ${card.health}` }}</span>
        <span>{{ `${$cfg.const.SANITY}: ${card.sanity}` }}</span>
      </div>
      <div class="text-box" v-html="cardText(card.text)"></div>
      <div class="flavor">
        {{ card.flavor }}
      </div>
      <div><v-icon>brush</v-icon>{{ card.illustrator }}</div>
      <div>{{ `${card.includedPack.name} #${card.number}` }}</div>
    </v-card-text>
  </v-card>
</template>

<style>
.card-text {
  margin: 0px;
  line-height: 1.3;
}
div.text-box {
  border-left: solid #666666;
  padding-left: 5px;
  margin-bottom: 3px;
}
div.flavor {
  font-style: italic;
}
div.trait-list {
  font-style: italic;
  font-weight: bold;
}
</style>

<script>
import cardStyleMixin from '@/components/mixins/card-style-mixin'

export default {
  mixins: [
    cardStyleMixin
  ],
  props: {
    card: { type: Object },
    width: { type: Number, default: null }
  },
  data () {
    return {

    }
  }
}
</script>
