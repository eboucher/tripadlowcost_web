<template>
  <v-app>
    <core-toolbar/>
    <router-view></router-view>
    <core-footer/>
  </v-app>
</template>

<script>
  export default {
    name: "App",
    components: {
      CoreToolbar: () => import("@/components/core/Toolbar"),
      CoreFooter: () => import("@/components/core/Footer")
    },
    data() {
      return {
      };
    }
  };
</script>
