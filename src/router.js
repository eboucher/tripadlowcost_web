import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/about/AboutUs.vue")
    },
    {
      path: "/about/cookie-consent",
      name: "about-cookie-consent",
      component: () =>
        import("./views/about/CookieConsent.vue")
    },
    {
      path: "/about/cookie-policy",
      name: "about-cookie-policy",
      component: () =>
        import("./views/about/CookiePolicy.vue")
    },
    {
      path: "/about/privacy-policy",
      name: "about-privacy-policy",
      component: () =>
        import("./views/about/PrivacyPolicy.vue")
    },
    {
      path: "/about/terms-and-conditions",
      name: "/about-terms-and-conditions",
      component: () =>
        import("./views/about/TermsAndConditions.vue")
    }
  ]
});
