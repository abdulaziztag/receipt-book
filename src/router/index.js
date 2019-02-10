import Vue from 'vue'
import AuthGuard from './auth-guard'
import Router from 'vue-router'
import Home from '@/components/Home'
import Receipt from '@/components/receipts/receipt'
import errorPage from '@/components/404error/404error'
import newreceipt from '@/components/receipts/newreceipt'
import Login from '@/components/auth/login'
import Registration from '@/components/auth/registration'
import store from '../store'
/* import fb from '../../firebase' */

Vue.use(Router)

/* const router = new Router({})

router.beforeEach((to, from, next) => {
  store.dispatch('setLoading', {loading: true})
  if (!store.getters.auth) {
    fb.initializeApp({
      apiKey: 'AIzaSyCXP3YaKCRw6xwe6uMN16Bpjkc203WwlFA',
      authDomain: 'my-receipt-book.firebaseapp.com',
      databaseURL: 'https://my-receipt-book.firebaseio.com',
      projectId: 'my-receipt-book',
      storageBucket: 'my-receipt-book.appspot.com',
      messagingSenderId: '97969530002'
    })
    fb.auth().onAuthStateChanged(user => {
      if (user) {
        store.dispatch('autoLoginUser', { user })
        store.dispatch('setAuth', { auth: true })
        store.dispatch('setLoading', { loading: false })
        next()
      } else {
        store.dispatch('setAuth', { auth: true })
        store.dispatch('setLoading', { loading: false })
        next()
      }
    })
  } else {
    store.dispatch('setLoading', { loading: false })
    next()
  }
}) */

export default new Router({
  routes: [
    {
      path: '',
      name: 'home',
      component: Home
    },
    {
      path: '/receipt/:id',
      props: true,
      name: 'receipt',
      component: Receipt,
      beforeEnter: AuthGuard
    },
    {
      path: '/new',
      name: 'newreceipt',
      component: newreceipt,
      beforeEnter: AuthGuard
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/registration',
      name: 'Registration',
      component: Registration
    },
    {
      path: '*',
      name: '404error',
      component: errorPage,
      beforeEnter (to, from, next) {
        store.dispatch('for404err')
        next()
      }
    }
  ],
  mode: 'history'
})
