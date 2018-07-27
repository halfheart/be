<template>
  <v-dialog v-model="show" :width="width">
    <v-btn slot="activator" icon>
      <v-icon>edit</v-icon>
    </v-btn>
    <pack-form ref="form" :title="title" :mode="mode" @close-form="close()" @submit-form="mod($event)" />
  </v-dialog>
</template>

<script>
import packForm from '@/components/pack/pack-form'

export default {
  components: {
    packForm
  },
  props: {
    id: { type: String, default: null },
    width: { type: Number, default: 600 }
  },
  data () {
    return {
      show: false,
      title: '팩 수정',
      mode: this.$cfg.const.MOD_MODE
    }
  },
  methods: {
    close () {
      this.show = false
    },
    mod (pack) {
      this.$axios.put(`${this.$cfg.path.api}data/pack`, {
        _id: pack._id,
        name: pack.name,
        parent: pack.parent
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
