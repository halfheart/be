<template>
  <v-dialog v-model="show" :width="width" persistent>
    <v-btn fab small slot="activator">
      <v-icon>person_add</v-icon>
    </v-btn>
    <investigator-form ref="form" :title="title" :mode="mode" @close-form="close()" @submit-form="add($event)" />
  </v-dialog>
</template>

<script>
import investigatorForm from '@/components/card/investigator/investigator-form'

export default {
  components: {
    investigatorForm
  },
  props: {
    width: { type: Number, default: 600 }
  },
  data () {
    return {
      show: false,
      title: '조사자 추가',
      mode: this.$cfg.const.ADD_MODE
    }
  },
  methods: {
    close () {
      this.show = false
    },
    add (form) {
      let deckOption = []

      this.$cfg.const.FACTIONS.forEach((i, index) => {
        if (form.deckOption.sw[index]) {
          deckOption.push({
            faction: i,
            min: form.deckOption.min[index],
            max: form.deckOption.max[index]
          })
        }
      })

      this.$axios.post(`${this.$cfg.path.api}data/card`, {
        name: form.name,
        subname: form.subname,
        faction: form.faction,
        type: form.type,
        isUnique: form.isUnique,
        doubleFaced: form.doubleFaced,
        trait: form.trait,
        will: form.will,
        int: form.int,
        combat: form.combat,
        agi: form.agi,
        health: form.health,
        sanity: form.sanity,
        text: form.text,
        flavor: form.flavor,
        backName: form.backName,
        backText: form.backText,
        backFlavor: form.backFlavor,
        deckSize: form.deckSize,
        deckReq_ids: form.deckReq_ids,
        illustrator: form.illustrator,
        pack_id: form.pack_id,
        number: form.number,
        deckOption: deckOption
      })
      .then((res) => {
        if (!res.data.success) throw new Error(res.data.msg)
        console.log('추가됨')
        this.$emit('list')
        this.close()
      })
      .catch((err) => {
        console.log(err.message)
      })
    }
  },
  watch: {
    show (val) {
      if (!val) this.$refs.form.resetForm()
      if (val) this.$refs.form.readPackList()
    }
  }
}
</script>
