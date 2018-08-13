<template>
  <div>
    <nav-drawer ref="drawer" />
    <nav-toolbar @toggle-drawer="toggleDrawer()" :title="title" />
    <v-content>
      <router-view />
    </v-content>
  </div>
</template>

<script>
import navToolbar from '@/components/nav-toolbar'
import navDrawer from '@/components/nav-drawer'
export default {
  components: {
    navToolbar,
    navDrawer
  },
  data () {
    return {
      title: '아컴 호러: 카드 게임 한국어 DB'
    }
  },
  methods: {
    toggleDrawer () {
      this.$refs.drawer.toggleDrawer()
    }
  }
}
</script>
