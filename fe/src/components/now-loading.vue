<template>
  <v-layout align-center justify-center fill-height v-if="!show" class="pa-3">
    <div class="pr-3">
      <v-progress-circular
        :size="30"
        :width="3"
        indeterminate
      ></v-progress-circular>
    </div>
    {{ msg }}
  </v-layout>
</template>

<script>
export default {
  props: {
    show: { type: Boolean, default: false },
    msg: { type: String, default: '불러오는 중...' }
  },
  data () {
    return {

    }
  }
}
</script>
