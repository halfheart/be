<template>
  <v-toolbar dark color="primary">
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title>{{ `${title}` }}</v-toolbar-title>
    <v-spacer />
    <user-ctrls />
  </v-toolbar>
</template>

<script>
import userCtrls from '@/components/auth/user-ctrls'
export default {
  components: {
    userCtrls
  },
  props: {
    title: { type: String }
  },
  data () {
    return {
    }
  }
}
</script>
