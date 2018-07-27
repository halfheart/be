<template>
  <div>
    <v-list>
      <v-list-tile v-for="pack in packs.array" :key="pack._id" @click="">
        <v-list-tile-content>
          {{ pack.name }}
        </v-list-tile-content>
        <pack-mod :id="pack._id" @list="list()" />
        <pack-del :id="pack._id" @list="list()" />
      </v-list-tile>
    </v-list>
    <pack-add @list="list()" />
  </div>
</template>

<script>
import packAdd from '@/components/pack/pack-add'
import packMod from '@/components/pack/pack-mod'
import packDel from '@/components/pack/pack-del'

export default {
  components: {
    packAdd,
    packMod,
    packDel
  },
  name: 'pack-list',
  data () {
    return {
      packs: {
        cnt: 0,
        draw: 0,
        array: []
      },
      p: {
        page: 1,
        draw: 0,
        search: '',
        order: '_id',
        sort: 1,
        skip: 0,
        limit: 20
      }
    }
  },
  computed: {
    setSkip: function () {
      if (this.p.page < 0) return 0

      return this.p.limit * (this.p.page - 1)
    }
  },
  mounted () {
    this.list()
  },
  methods: {
    list () {
      this.$axios.get(`${this.$cfg.path.api}data/pack/list`, {
        params: {
          draw: this.p.draw + 1,
          search: this.p.search,
          order: this.p.order,
          sort: this.p.sort,
          limit: this.p.limit,
          skip: this.setSkip
        }
      })
      .then((res) => {
        if (!res.data.success) throw new Error(res.data.msg)
        this.packs = res.data.packs
      })
      .catch((err) => {
        console.log(err.message)
      })
    }
  }
}
</script>
