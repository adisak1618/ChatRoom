import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'
import Login from './components/Login/index'
import Profile from './components/profile/index'
import Home from './components/home/index'
import Add from './components/Add/index'
import Event from './components/Events/index'
import EventDetail from './components/Events/detail'
import Signup from './components/signup/index'
import '../node_modules/semantic-ui/dist/semantic.min.css'
import semantic from 'semantic'
console.log('semantic')
console.log(semantic)
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.filter('date', function (value) {
  return (new Date(value)).toDateString();
})
// define some components
var router = new VueRouter()
// sync(store, router)

// define some routes.
// each route should map to a component.
// we'll talk about nested routes later.
router.map({
  '/topics': {
    component: Event,
    auth: true
  },
  '/login': {
    component: Login,
    auth: false
  },
  '/add': {
    component: Add,
    auth: true
  },
  '/topic/:id': {
    component: EventDetail,
    auth: true
  },
  '/signup': {
    component: Signup,
    auth: false
  },
  '/': {
    component: Home,
    auth: true
  },
  '/profile': {
    component: Profile,
    auth: true
  }
})

router.beforeEach(function (transition, next) {
  console.log(transition)
  if (transition.to.auth) {
    console.log(transition.to.auth)
    if (router.app.authen === true) {
      transition.next()
    } else {
      router.go('/login')
    }
  } else {
    transition.next()
  }
})
// now we can start the app!
// router will create an instance of App and mount to
// the element matching the selector #app.
router.start(App, '#app')
