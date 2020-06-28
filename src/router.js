import Vue from 'vue'
import VueRouter from 'vue-router'
import login from './components/Login.vue'
import Home from './components/Home.vue'
import Welcome from './components/welcome.vue'
import Userlist from './components/User/UserList.vue'
import Rights from './components/Power/Rights.vue'
import Roles from './components/Power/Roles.vue'
import Mybooktodo from './components/Author/Author.vue'
import Writebook from './components/Author/Writebook.vue'
import Booklist from './components/Reader/Booklist.vue'
import Bookdetailed from './components/Reader/BookDetailed.vue'
import Readbook from './components/Reader/Readbook.vue'
import Bookinfo from './components/Book/Bookinfo.vue'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
const router = new VueRouter({
  routes: [
    { path: '/Login', component: login },
    {
      path: '/Home',
      redirect: '/Booklist',
      component: Home,
      children: [
        { path: '/welcome', component: Welcome },
        { path: '/Userlist', component: Userlist },
        { path: '/Permissionlist', component: Rights },
        { path: '/Rolelist', component: Roles },
        { path: '/Mybooktodo', component: Mybooktodo },
        { path: '/Writebook', component: Writebook },
        { path: '/Booklist', component: Booklist },
        { path: '/Bookdetailed', component: Bookdetailed },
        { path: '/Readbook', component: Readbook },
        { path: '/Bookinfo', component: Bookinfo }]
    }
  ]
})

router.beforeEach(function (to, from, next) {
  if (to.path == '/Login') return next()
  const token = window.sessionStorage.getItem('token')
  if (!token) return next('/Login')
  return next()
})

export default router
