<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    isLoggedin: function () {
      if (this.$auth.token !== null) return true
      return false
    }
  }
}
</script>
