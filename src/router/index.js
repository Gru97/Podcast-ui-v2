import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'

const Login = () => import('@/views/Login')
const Register = () => import('@/views/Register')
const ChannelsList = () => import('@/views/channel/ChannelsList')
const NewChannel = () => import('@/views/channel/NewChannel')
const NewAlbum = () => import('@/views/Album/NewAlbum')
const ChannelDetail = () => import('@/views/channel/channelDetail')
const albumDetail = () => import('@/views/Album/AlbumDetail')

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },

  {
    path: '/channelsList',
    name: 'ChannelsList',
    component: ChannelsList,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/NewChannel',
    name: 'NewChannel',
    component: NewChannel
  },
  {
    path: '/NewAlbum/:cid',
    name: 'NewAlbum',
    component: NewAlbum
  },
  {
    path: '/channelDetail/:id',
    name: 'channelDetail',
    component: ChannelDetail
  },
  
  {
    path: '/albumDetail/:id',
    name: 'albumDetail',
    component: albumDetail
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) === true && store.getters.isLoggedIn === false) next({ name: 'Login' })
  else next()
  // return console.log(to.matched.some(record => record.meta.requiresAuth))
})

export default router
