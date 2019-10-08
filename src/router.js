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
        import("./views/about/About.vue"),
      children: [
        {
          path: "",
          name: "AboutUs",
          component: () => import("./views/about/AboutUs.vue"),
        },
        {
          path: 'privacy-policy',
          name: "PrivacyPolicy",
          component: () => import("./views/about/PrivacyPolicy.vue"),
        },
        {
          path: 'terms-and-conditions',
          name: "TermsAndConditions",
          component: () => import("./views/about/TermsAndConditions.vue"),
        },
        {
          path: 'cookie-policy',
          name: "CookiePolicy",
          component: () => import("./views/about/CookiePolicy.vue"),
        }
      ]
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
    },
    {
      path: "/trips",
      name: "trips",
      component: () =>
        import("./views/trips/Trips.vue"),
      children: [
        {
          path: "/trips/post",
          name: "trip-post",
          component: () => import("./views/trips/Post.vue"),
        },
        {
          path: "/trips/:id",
          name: "trips-id",
          component: () => import("./views/trips/_id/index.vue"),
          children: [
            {
              path: "/trips/:id/edit",
              name: "trips-id-edit",
              component: () => import("./views/trips/_id/Edit.vue"),
            },
            {
              path: "/trips/:id/:eid",
              name: "trips-id-eid",
              component: () => import("./views/trips/_id/_eid.vue"),
            }
          ]
        },
      ]
    }
  ],
});
