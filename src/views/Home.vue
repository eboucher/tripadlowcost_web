<template>
<div>
  {{isAuthenticated}}
  {{loggedUser.username}}
</div>
</template>

<script>

  export default {
    name: "Home",
    data: () => {
      return {
      };
    },
    computed: {
      isAuthenticated() {
        return this.$store.getters.isAuthenticated;
      },

      loggedUser() {
        if(this.$store.getters.isAuthenticated) {
          return this.$store.getters.loggedUser;
        } else {
          return "User not found";
        }
      }
    },
    components: {},
  };
</script>
