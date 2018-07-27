<template>
  <v-card>
    <v-container grid-list-md>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text>
        {{ message }}
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn @click="clickConfirm()">{{ confirm }}</v-btn>
        <v-btn @click="clickCancel()">{{ cancel }}</v-btn>
      </v-card-actions>
    </v-container>
  </v-card>
</template>

<script>
export default {
  props: {
    title: { type: String, default: '' },
    message: { type: String, default: '' },
    confirm: { type: String, default: '확인' },
    cancel: { type: String, default: '취소' }
  },
  data () {
    return {

    }
  },
  methods: {
    clickConfirm () {
      this.$emit('click-confirm')
    },
    clickCancel () {
      this.$emit('click-cancel')
    }
  }
}
</script>
