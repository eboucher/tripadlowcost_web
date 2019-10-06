<template>
<div>
  {{isAuth}}
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
      isAuth() {
        return this.$store.getters.isAuthenticated;
      }
    },
    components: {},
  };
</script>
