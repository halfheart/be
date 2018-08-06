<template>

</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    titleClass (faction) {
      if (faction === this.$cfg.const.FACTIONS[1]) return `red white--text` // 생존자
      if (faction === this.$cfg.const.FACTIONS[2]) return `indigo white--text` // 수호자
      if (faction === this.$cfg.const.FACTIONS[3]) return `purple white--text` // 미스틱
      if (faction === this.$cfg.const.FACTIONS[4]) return `orange white--text` // 탐구자
      if (faction === this.$cfg.const.FACTIONS[5]) return `green white--text` // 로그
      return `grey white--text`
    },
    cardText (str) {
      let result = ''

      str = str.replace(/\[reaction\]/gi, `<span class="font-icon icon-reaction" title="${this.$cfg.const.REACTION}"></span>`)
      str = str.replace(/\[action\]/gi, `<span class="font-icon icon-action" title="${this.$cfg.const.ACTION}"></span>`)
      str = str.replace(/\[auto fail\]/gi, `<span class="font-icon icon-autofail" title="${this.$cfg.const.AUTOFAIL}"></span>`)
      str = str.replace(/\[skull\]/gi, `<span class="font-icon icon-skull" title="${this.$cfg.const.SKULL}"></span>`)
      str = str.replace(/\[cultist\]/gi, `<span class="font-icon icon-cultist" title="${this.$cfg.const.CULTIST}"></span>`)
      str = str.replace(/\[tablet\]/gi, `<span class="font-icon icon-tablet" title="${this.$cfg.const.TABLET}"></span>`)
      str = str.replace(/\[elder thing\]/gi, `<span class="font-icon icon-elderthing" title="${this.$cfg.const.ELDERTHING}"></span>`)
      str = str.replace(/\[elder sign\]/gi, `<span class="font-icon icon-eldersign" title="${this.$cfg.const.ELDERSIGN}"></span>`)
      str = str.replace(/\[fast action\]/gi, `<span class="font-icon icon-fastaction" title="${this.$cfg.const.FASTACTION}"></span>`)
      str = str.replace(/\[combat\]/gi, `<span class="font-icon icon-combat" title="${this.$cfg.const.COMBAT}"></span>`)
      str = str.replace(/\[agility\]/gi, `<span class="font-icon icon-agility" title="${this.$cfg.const.AGILITY}"></span>`)
      str = str.replace(/\[intellect\]/gi, `<span class="font-icon icon-intellect" title="${this.$cfg.const.INTELLECT}"></span>`)
      str = str.replace(/\[willpower\]/gi, `<span class="font-icon icon-willpower" title="${this.$cfg.const.WILLPOWER}"></span>`)

      str = str.split('\n')
      str.forEach((i) => {
        result += `<p class="card-text">${i}</p>`
      })

      return result
    },
    factionIcons (faction) {
      if (faction === this.$cfg.const.FACTIONS[1]) return `<span class="img-icon icon-survivor title="${faction}"></span>`
      if (faction === this.$cfg.const.FACTIONS[2]) return `<span class="img-icon icon-guardian title="${faction}"></span>`
      if (faction === this.$cfg.const.FACTIONS[3]) return `<span class="img-icon icon-mystic title="${faction}"></span>`
      if (faction === this.$cfg.const.FACTIONS[4]) return `<span class="img-icon icon-seeker title="${faction}"></span>`
      if (faction === this.$cfg.const.FACTIONS[5]) return `<span class="img-icon icon-rogue title="${faction}"></span>`
      return ''
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
.icon-skull:before {
  content: "k"
}
.icon-cultist:before {
  content: "l"
}
.icon-elderthing:before {
  content: "n"
}
.icon-tablet:before {
  content: "q"
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
