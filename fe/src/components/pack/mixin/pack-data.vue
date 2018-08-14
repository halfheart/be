<script>
export default {
  data () {
    return {
      pack: {
        _id: { type: String, default: null },
        name: { type: String, default: null },
        parent_id: { type: String, default: null }
      }
    }
  },
  methods: {
    resetPack () {
      const p = this.pack

      p._id = null
      p.name = null
      p.parent_id = null
    }
  }
}
</script>
