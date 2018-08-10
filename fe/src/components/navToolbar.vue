<template>
  <v-toolbar dark color="primary">
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title>{{ title }}</v-toolbar-title>
    <v-spacer />
    <user-signin />
    <user-register />
  </v-toolbar>
</template>

<script>
import userRegister from '@/components/auth/user-register'
import userSignin from '@/components/auth/user-signin'
export default {
  components: {
    userRegister,
    userSignin
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
