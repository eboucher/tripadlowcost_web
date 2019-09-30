import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _1b4d0786 = () => interopDefault(import('../pages/about/index.vue' /* webpackChunkName: "pages/about/index" */))
const _0d7bb5ce = () => interopDefault(import('../pages/login/index.vue' /* webpackChunkName: "pages/login/index" */))
const _4526ce19 = () => interopDefault(import('../pages/profile/index.vue' /* webpackChunkName: "pages/profile/index" */))
const _690fe45e = () => interopDefault(import('../pages/trips/index.vue' /* webpackChunkName: "pages/trips/index" */))
const _6d61ba06 = () => interopDefault(import('../pages/about/about-us/index.vue' /* webpackChunkName: "pages/about/about-us/index" */))
const _1c5ead59 = () => interopDefault(import('../pages/about/cookie-consent/index.vue' /* webpackChunkName: "pages/about/cookie-consent/index" */))
const _3e19f2a9 = () => interopDefault(import('../pages/about/cookie-policy/index.vue' /* webpackChunkName: "pages/about/cookie-policy/index" */))
const _05ccff3f = () => interopDefault(import('../pages/about/privacy-policy/index.vue' /* webpackChunkName: "pages/about/privacy-policy/index" */))
const _491d20c8 = () => interopDefault(import('../pages/about/terms-and-conditions/index.vue' /* webpackChunkName: "pages/about/terms-and-conditions/index" */))
const _5c5eaa1c = () => interopDefault(import('../pages/auth/forgotpassword.vue' /* webpackChunkName: "pages/auth/forgotpassword" */))
const _c2258d52 = () => interopDefault(import('../pages/auth/register.vue' /* webpackChunkName: "pages/auth/register" */))
const _3c44f334 = () => interopDefault(import('../pages/auth/resetpassword.vue' /* webpackChunkName: "pages/auth/resetpassword" */))
const _2966ae13 = () => interopDefault(import('../pages/profile/edit.vue' /* webpackChunkName: "pages/profile/edit" */))
const _3ebe1bc0 = () => interopDefault(import('../pages/trips/create.vue' /* webpackChunkName: "pages/trips/create" */))
const _64ab80cc = () => interopDefault(import('../pages/trips/search.vue' /* webpackChunkName: "pages/trips/search" */))
const _89a01f22 = () => interopDefault(import('../pages/trips/user.vue' /* webpackChunkName: "pages/trips/user" */))
const _67d8fa7e = () => interopDefault(import('../pages/profile/_id.vue' /* webpackChunkName: "pages/profile/_id" */))
const _5283a049 = () => interopDefault(import('../pages/trips/_id/index.vue' /* webpackChunkName: "pages/trips/_id/index" */))
const _110ed5e3 = () => interopDefault(import('../pages/trips/_id/edit.vue' /* webpackChunkName: "pages/trips/_id/edit" */))
const _5466e84c = () => interopDefault(import('../pages/trips/_id/_eid.vue' /* webpackChunkName: "pages/trips/_id/_eid" */))
const _51b623ff = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
      path: "/about",
      component: _1b4d0786,
      name: "about"
    }, {
      path: "/login",
      component: _0d7bb5ce,
      name: "login"
    }, {
      path: "/profile",
      component: _4526ce19,
      name: "profile"
    }, {
      path: "/trips",
      component: _690fe45e,
      name: "trips"
    }, {
      path: "/about/about-us",
      component: _6d61ba06,
      name: "about-about-us"
    }, {
      path: "/about/cookie-consent",
      component: _1c5ead59,
      name: "about-cookie-consent"
    }, {
      path: "/about/cookie-policy",
      component: _3e19f2a9,
      name: "about-cookie-policy"
    }, {
      path: "/about/privacy-policy",
      component: _05ccff3f,
      name: "about-privacy-policy"
    }, {
      path: "/about/terms-and-conditions",
      component: _491d20c8,
      name: "about-terms-and-conditions"
    }, {
      path: "/auth/forgotpassword",
      component: _5c5eaa1c,
      name: "auth-forgotpassword"
    }, {
      path: "/auth/register",
      component: _c2258d52,
      name: "auth-register"
    }, {
      path: "/auth/resetpassword",
      component: _3c44f334,
      name: "auth-resetpassword"
    }, {
      path: "/profile/edit",
      component: _2966ae13,
      name: "profile-edit"
    }, {
      path: "/trips/create",
      component: _3ebe1bc0,
      name: "trips-create"
    }, {
      path: "/trips/search",
      component: _64ab80cc,
      name: "trips-search"
    }, {
      path: "/trips/user",
      component: _89a01f22,
      name: "trips-user"
    }, {
      path: "/profile/:id",
      component: _67d8fa7e,
      name: "profile-id"
    }, {
      path: "/trips/:id",
      component: _5283a049,
      name: "trips-id"
    }, {
      path: "/trips/:id/edit",
      component: _110ed5e3,
      name: "trips-id-edit"
    }, {
      path: "/trips/:id/:eid",
      component: _5466e84c,
      name: "trips-id-eid"
    }, {
      path: "/",
      component: _51b623ff,
      name: "index"
    }],

  fallback: false
}

export function createRouter() {
  return new Router(routerOptions)
}
