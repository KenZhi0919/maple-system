import { createRouter, createWebHistory } from 'vue-router'
import { ItemExchange, Login } from '@/views'

const getCookie = cname => {
  const name = cname + '='
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) == ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

const routes = [
  {
    path: '/itemexchange',
    name: 'ItemExchange',
    component: ItemExchange,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { layout: 'LoginLayout' },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach(async to => {
  if (to.name !== 'Login' && getCookie('accessToken') === '') {
    // redirect the user to the login page
    return { name: 'Login' }
  }
})

export default router
