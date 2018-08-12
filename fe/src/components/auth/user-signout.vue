<template>
  <v-btn flat icon @click="signout()"><v-icon>lock_open</v-icon></v-btn>
</template>

<script>
export default {
  data () {
    return {
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
}
</script>
