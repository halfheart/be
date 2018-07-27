<template>
  <v-dialog v-model="show" :width="width">
    <v-btn
      dark
      fab
      fixed
      bottom
      right
      slot="activator"
      >
      <v-icon>add</v-icon>
    </v-btn>
    <pack-form ref="form" :title="title" :mode="mode" @close-form="close()" @submit-form="add($event)" />
  </v-dialog>
</template>

<script>
import packForm from '@/components/pack/pack-form'

export default {
  components: {
    packForm
  },
  props: {
    width: { type: Number, default: 600 }
  },
  data () {
    return {
      show: false,
      title: '팩 추가',
      mode: this.$cfg.const.ADD_MODE
    }
  },
  methods: {
    close () {
      this.show = false
    },
    add (pack) {
      this.$axios.post(`${this.$cfg.path.api}data/pack`, {
        name: pack.name,
        parent: pack.parent
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
      if (val) this.$refs.form.readParentPacks()
    }
  }
}
</script>
