<template>
  <v-menu
  v-model="show"
  transition="slide-x-transition"
  open-on-hover
  offset-x
  :close-on-content-click="false">
    <a slot="activator" :class="myStyle">{{ card.name }}{{ (card.subname && showSubname) ? `: ${card.subname}` : '' }}</a>
    <card-page :card="card" :width="400" />
  </v-menu>
</template>

<script>
import cardPage from '@/components/card/card-page'

export default {
  components: {
    cardPage
  },
  props: {
    card: { type: Object },
    myStyle: { type: String, default: '' },
    showSubname: { type: Boolean, default: false }
  },
  data () {
    return {
      show: false
    }
  }
}
</script>
