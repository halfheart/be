<template>
  <v-dialog v-model="show" :width="width" persistent>
    <v-btn fab small slot="activator">
      <v-icon>library_add</v-icon>
    </v-btn>
    <playercard-form ref="form" :title="title" :mode="mode" @close-form="close()" @submit-form="add($event)" />
  </v-dialog>
</template>

<script>
import playercardForm from '@/components/card/playercard/playercard-form'

export default {
  components: {
    playercardForm
  },
  props: {
    width: { type: Number, default: 600 }
  },
  data () {
    return {
      show: false,
      title: '플레이어 카드 추가',
      mode: this.$cfg.const.ADD_MODE
    }
  },
  methods: {
    close () {
      this.show = false
    },
    add (form) {
      this.$axios.post(`${this.$cfg.path.api}data/card`, {
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
        pack_id: form.pack_id,
        number: form.number
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
