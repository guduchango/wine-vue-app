import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import WineListView from '../views/WineListView.vue'
import WineFormView from '../views/WineFormView.vue'
import ResetPassword from '../views/ResetPassword.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
import { useAuthStore } from '../stores/auth'
import WineDetailView from '../views/WineDetailView.vue'
import ProfileView from '../views/ProfileView.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/register', name: 'Register', component: RegisterView },
  { path: '/wine_list', name: 'WineList', component: WineListView },
  { path: '/wine_form', name: 'WineForm', component: WineFormView },
  { path: '/profile', name: 'ProfileView', component: ProfileView },

  { path: '/wine_detail', name: 'WineDetail', component: WineDetailView },
  { path: '/forgot-password', name: 'ForgotPassword', component: ForgotPassword },
  { path: '/reset-password/:token', name: 'ResetPassword', component: ResetPassword },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  const isProtected = ['/wine_list', '/wine_form','/profile']

  if (isProtected.includes(to.path) && !auth.token) {
    next('/login')
  } else {
    next()
  }
})

export default router