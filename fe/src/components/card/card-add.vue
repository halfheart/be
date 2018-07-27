<template>
  <v-speed-dial
  dark
  fab
  fixed
  bottom
  right
  v-model="fab"
  >
    <v-btn fab slot="activator" v-model="fab">
      <v-icon>add</v-icon>
      <v-icon>close</v-icon>
    </v-btn>

    <investigator-add @list="list()" />
    <playercard-add @list="list()" />

  </v-speed-dial>
</template>

<script>
import investigatorAdd from '@/components/card/investigator/investigator-add'
import playercardAdd from '@/components/card/playercard/playercard-add'

export default {
  components: {
    investigatorAdd,
    playercardAdd
  },
  data () {
    return {
      fab: false
    }
  },
  methods: {
    list () {
      this.$emit('list')
    }
  }
}
</script>
