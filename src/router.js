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
      component: () => import("./views/trips/Trips.vue"),
      children: [
        {
          path: "public-trips",
          name: "PublicTrips",
          component: () => import("./views/trips/PublicTrips.vue"),
        },
        {
          path: "user-trips",
          name: "UserTrips",
          component: () => import("./views/trips/UserTrips.vue"),
        },
        {
          path: ":id",
          name: ":id",
          component: () => import("./views/trips/trip/_id.vue"),
        },
        // this should be a child of :id, I just didn't figure out to make the route in less than 2 minutes
        {
          path: ":eid",
          name: ":eid",
          component: () => import("./views/trips/trip/stage/_eid.vue"),
        }
      ]
    },
    {
      path: "/post",
      name: "post",
      component: () =>
        import("./views/trips/Post.vue")
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("./views/profile/Profile.vue"),
      children: [
        {
          path: ":user-profile",
          name: ":UserProfile",
          component: () => import("./views/profile/_id.vue"),
        },
        {
          path: 'edit-profile',
          name: "EditProfile",
          component: () => import("./views/profile/EditProfile.vue"),
        }
      ]
    }
  ],
});
