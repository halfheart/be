<template>
  <v-toolbar dark color="primary" app clipped-left>
    <v-toolbar-side-icon @click="toggleDrawer()"></v-toolbar-side-icon>
    <v-toolbar-title>{{ `${title}` }}</v-toolbar-title>
    <v-spacer />
    <user-signin />
    <user-register />
    <user-signout />
  </v-toolbar>
</template>

<script>
import userSignin from '@/components/auth/user-signin'
import userSignout from '@/components/auth/user-signout'
import userRegister from '@/components/auth/user-register'
export default {
  components: {
    userRegister,
    userSignin,
    userSignout
  },
  props: {
    title: { type: String }
  },
  data () {
    return {
    }
  },
  methods: {
    toggleDrawer () {
      this.$emit('toggle-drawer')
    }
  }
}
</script>
