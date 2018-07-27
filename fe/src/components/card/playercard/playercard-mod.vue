<template>
  <v-dialog v-model="show" :width="width" persistent>
    <v-btn small icon slot="activator">
      <v-icon>edit</v-icon>
    </v-btn>
    <playercard-form ref="form" :title="title" :mode="mode" @close-form="close()" @submit-form="mod($event)" />
  </v-dialog>
</template>

<script>
import playercardForm from '@/components/card/playercard/playercard-form'

export default {
  components: {
    playercardForm
  },
  props: {
    width: { type: Number, default: 600 },
    id: { type: String, default: null }
  },
  data () {
    return {
      show: false,
      title: '플레이어 카드 수정',
      mode: this.$cfg.const.MOD_MODE
    }
  },
  methods: {
    close () {
      this.show = false
    },
    mod (form) {
      this.$axios.put(`${this.$cfg.path.api}data/card`, {
        _id: form._id,
        name: form.name,
        subname: form.subname,
        faction: form.faction,
        type: form.type,
        subtype: form.subtype,
        isUnique: form.isUnique,
        trait: form.trait,
        slot: form.slot,
        cost: form.cost,
        xp: form.xp,
        will: form.will,
        int: form.int,
        combat: form.combat,
        agi: form.agi,
        wild: form.wild,
        health: form.health,
        sanity: form.sanity,
        text: form.text,
        flavor: form.flavor,
        illustrator: form.illustrator,
        includedPack: form.includedPack,
        number: form.number
      })
      .then((res) => {
        if (!res.data.success) throw new Error(res.data.msg)
        console.log('수정됨')
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
      if (val) this.$refs.form.modForm(this.id)
    }
  }
}
</script>
