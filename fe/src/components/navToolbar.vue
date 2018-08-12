<template>
  <v-toolbar dark color="primary">
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title>{{ `${title}` }}</v-toolbar-title>
    <v-spacer />
    <template v-if="!isLoggedin">
      <user-signin />
      <user-register />
    </template>
    <v-btn flat icon @click="signout()" v-if="isLoggedin"><v-icon>lock_open</v-icon></v-btn>
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
  computed: {
    isLoggedin: function () {
      // if (this.$cookie.get('token') !== null) return true
      if (sessionStorage.getItem('token') !== null) return true
      return false
    }
  },
  data () {
    return {
    }
  },
  methods: {
    signout () {
      this.$axios.post(`${this.$cfg.path.api}data/auth/signout`)
      .then((res) => {
        if (!res.data.success) throw new Error(res.data.msg)
        // this.$cookie.delete('token')
        sessionStorage.removeItem('token')
        console.log('로그아웃됨')
        location.reload()
      })
      .catch((err) => {
        console.log(err.message)
      })
    }
  }
}
</script>
