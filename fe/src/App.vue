<template>
  <v-app>
    <nav-toolbar :title="title" />
    <router-view/>
  </v-app>
</template>

<script>
import navToolbar from '@/components/navToolbar'

export default {
  components: {
    navToolbar
  },
  data () {
    return {
      title: 'Title'
    }
  },
  name: 'App'
}
</script>
