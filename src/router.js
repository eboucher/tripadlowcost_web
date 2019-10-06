import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: () =>
        import("./views/Home.vue")
    },
    {
      path: "/about",
      name: "about",
      component: () =>
        import("./views/about/AboutUs.vue")
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
      name: "about-terms-and-conditions",
      component: () =>
        import("./views/about/TermsAndConditions.vue")
    },
    {
      path: "/register",
      name: "register",
      component: () =>
        import("./views/auth/Register.vue")
    },
    {
      path: "/login",
      name: "login",
      component: () =>
        import("./views/auth/Login.vue")
    }
  ],
});
