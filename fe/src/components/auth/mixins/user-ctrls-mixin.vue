<script>
export default {
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
