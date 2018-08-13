<template>
  <v-navigation-drawer
  v-model="show"
  clipped
  enable-resize-watcher
  fixed
  app>
    <v-list>
      <v-list-tile v-for="(i, index) in items" :key="index" @click="redirect(i.route)">
        <v-list-tile-content>
          {{ i.title }}
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      items: [
        {
          title: '세트 관리',
          route: 'packlist'
        },
        {
          title: '카드 관리',
          route: 'cardlist'
        },
        {
          title: '덱 관리',
          route: 'deckList'
        }
      ]
    }
  },
  methods: {
    toggleDrawer () {
      this.show = !this.show
    },
    redirect (r) {
      this.$router.push({ name: r })
    }
  }
}
</script>
