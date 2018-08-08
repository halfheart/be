<template>
  <v-dialog v-model="show" :width="width">
    <v-btn small slot="activator" icon>
      <v-icon>delete</v-icon>
    </v-btn>
    <confirm-card :title="title" :message="message" @click-confirm="del()" @click-cancel="close()" />
  </v-dialog>
</template>

<script>
import confirmCard from '@/components/confirm-card'
export default {
  components: {
    confirmCard
  },
  props: {
    id: { type: String, default: '' },
    width: { type: Number, default: 600 }
  },
  data () {
    return {
      show: false,
      title: '덱 삭제',
      message: '정말 삭제하시겠습니까?'
    }
  },
  methods: {
    close () {
      this.show = false
    },
    del () {
      this.$axios.delete(`${this.$cfg.path.api}data/deck`, {
        params: {
          _id: this.id
        }
      })
      .then((res) => {
        if (!res.data.success) throw new Error(res.data.msg)
        console.log('삭제됨')
        this.$router.push({ name: 'deckList' })
        this.close()
      })
      .catch((err) => {
        console.log(err.message)
      })
    }
  }
}
</script>
