<template>
  <div>
    <user-signin v-if="!isLoggedin" />
    <user-register v-if="!isLoggedin" />
    <user-signout v-if="isLoggedin" />
  </div>
</template>

<script>
import userRegister from '@/components/auth/user-register'
import userSignin from '@/components/auth/user-signin'
import userSignout from '@/components/auth/user-signout'
export default {
  components: {
    userRegister,
    userSignin,
    userSignout
  },
  data () {
    return {

    }
  },
  computed: {
    isLoggedin: function () {
      // if (this.$cookie.get('token') !== null) return true
      if (sessionStorage.getItem('token') !== null) return true
      return false
    }
  }
}
</script>
