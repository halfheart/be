import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import packList from '@/components/pack/pack-list'
import cardList from '@/components/card/card-list'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/packlist',
      name: 'packlist',
      component: packList
    },
    {
      path: '/cardlist',
      name: 'cardlist',
      component: cardList
    }
  ]
})
