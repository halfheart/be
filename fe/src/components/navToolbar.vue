<template>
  <v-toolbar dark color="primary">
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title>{{ title }}</v-toolbar-title>
    <v-spacer />
    <user-register />
  </v-toolbar>
</template>

<script>
import userRegister from '@/components/auth/user-register'
export default {
  components: {
    userRegister
  },
  props: {
    title: { type: String }
  },
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>
