import Vue from 'vue'
import Router from 'vue-router'
import Crc from '@/components/Crc'
import Ham from '@/components/Ham'
import root from '@/components/root'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'root',
      component: root,
    },
    {
      path: '/crc',
      name: 'CRC',
      component: Crc
    },
    {
      path: '/ham',
      name: 'HAM',
      component: Ham
    }
  ]
})
