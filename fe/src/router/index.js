import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import packList from '@/components/pack/pack-list'
import cardList from '@/components/card/card-list'
import chooseInvestigator from '@/components/deck/choose-investigator'
import builder from '@/components/deck/builder'
import deckList from '@/components/deck/deck-list'
import deck from '@/components/deck/deck'
import deckMod from '@/components/deck/deck-mod'

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
      path: '/deck/mod/',
      name: 'deck-mod',
      component: deckMod,
      props: (route) => ({
        id: route.query.id,
        invId: route.query.invId
      })
    },
    {
      path: '/deck/',
      name: 'deck',
      component: deck,
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
      path: '/deck/list',
      name: 'deckList',
      component: deckList
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
