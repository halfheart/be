<template>

</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    factionIcons (faction) {
      if (faction === this.$cfg.const.FACTIONS[1]) return `<span class="img-icon icon-survivor title="${faction}"></span>${faction}`
      if (faction === this.$cfg.const.FACTIONS[2]) return `<span class="img-icon icon-guardian title="${faction}"></span>${faction}`
      if (faction === this.$cfg.const.FACTIONS[3]) return `<span class="img-icon icon-mystic title="${faction}"></span>${faction}`
      if (faction === this.$cfg.const.FACTIONS[4]) return `<span class="img-icon icon-seeker title="${faction}"></span>${faction}`
      if (faction === this.$cfg.const.FACTIONS[5]) return `<span class="img-icon icon-rogue title="${faction}"></span>${faction}`
      return faction
    },
    traitLists (trait) {
      let str = ''

      trait.forEach((i) => {
        str += `${i}. `
      })

      return str
    },
    testIcons (card) {
      let will = card.will
      let int = card.int
      let combat = card.combat
      let agi = card.agi
      let wild = card.wild

      let str = ''

      while (will > 0) {
        str += `<span class="font-icon icon-willpower" title="${this.$cfg.const.WILLPOWER}"></span>`
        will -= 1
      }

      while (int > 0) {
        str += `<span class="font-icon icon-intellect" title="${this.$cfg.const.INTELLECT}"></span>`
        int -= 1
      }

      while (combat > 0) {
        str += `<span class="font-icon icon-combat" title="${this.$cfg.const.COMBAT}"></span>`
        combat -= 1
      }

      while (agi > 0) {
        str += `<span class="font-icon icon-agility" title="${this.$cfg.const.AGILITY}"></span>`
        agi -= 1
      }

      while (wild > 0) {
        str += `<span class="font-icon icon-wild" title="${this.$cfg.const.WILD}"></span>`
        wild -= 1
      }

      return str
    }
  }
}
</script>
