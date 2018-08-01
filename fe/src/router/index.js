import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import packList from '@/components/pack/pack-list'
import cardList from '@/components/card/card-list'
import chooseInvestigator from '@/components/deck/choose-investigator'
import builder from '@/components/deck/builder'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/deck/edit/',
      name: 'builder',
      component: builder,
      props: (route) => ({
        id: route.query.id
      })
    },
    {
      path: '/deck/new',
      name: 'chooseInvestigator',
      component: chooseInvestigator
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
