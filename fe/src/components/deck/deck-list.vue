<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex v-for="(i, index) in decks.array" :key="index" md4>
        <v-card>
          <v-card-media
          :src="imgPath(i.investigator._id)"
          height="150">
          </v-card-media>
          <v-card-title primary-title>
            <h3 class="headline mb-0">{{ i.name }}</h3>
          </v-card-title>
          <v-card-text>

          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn flat color="indigo" :href="$cfg.path.web+'deck/?id='+i._id">
              선택
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      decks: {
        cnt: 0,
        draw: 0,
        array: []
      },
      p: {
        page: 1,
        draw: 0,
        order: 'ut',
        sort: 1,
        limit: 0,
        query: {}
      }
    }
  },
  computed: {
    setSkip: function () {
      if (this.p.page < 0) return 0

      return this.p.limit * (this.p.page - 1)
    }
  },
  methods: {
    imgPath (id) {
      return `${this.$cfg.path.public}/images/${id}.jpg`
    },
    list () {
      this.$axios.get(`${this.$cfg.path.api}data/deck/list`, {
        params: {
          draw: this.p.draw,
          order: this.p.order,
          sort: this.p.sort,
          limit: this.p.limit,
          query: this.p.query,
          skip: this.setSkip
        }
      })
      .then((res) => {
        if (!res.data.success) throw new Error(res.data.msg)
        this.decks = res.data.decks
      })
      .catch((err) => {
        console.log(err.message)
      })
    }
  },
  mounted () {
    this.list()
  }
}
</script>
