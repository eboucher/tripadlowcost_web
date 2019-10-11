<template>
  <v-app>
    <core-toolbar/>
    <v-content>
      <!-- Provides the application the proper gutter -->
      <v-container>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-content>
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
    return {};
  }
};
</script>
