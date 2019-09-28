<template>
  <body>
    <ul>
      <!-- Load an icon library -->
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

      <div class="navbar">
        <a class="round-button" href="/"><img class="logo" src="../static/logo.png" alt= "logo" height="5" width="150"></a>
        <v-spacer></v-spacer>
        <!-- Centered link -->
        <div class="search-container">
          <form action="/trips/search">
            <input type="text" placeholder="Search.." name="query">
            <button type="submit"><i class="fa fa-search"></i></button>
          </form>
        </div>
        <a class="active" href="/"><i class="fa fa-fw fa-home"></i> Home</a>
        <a class="round-button" href="/trips/create" v-if="isAuthenticated" ><i class="fa fa-fw fa-pencil-square-o"></i> Post</a>
        <a class="round-button" href="/trips"><i class="fa fa-fw fa-plane"></i> Trips</a>
        <!-- <a href="/profile"><i class="fa fa-fw fa-user"></i> Profile</a> -->

        <div class="navbar-item has-dropdown is-hoverable" v-if="isAuthenticated">
          <a class="navbar-link" v-if="isAuthenticated"> {{ loggedInUser.username }} </a>
          <div class="navbar-dropdown">
            <nuxt-link class="navbar-item-dropdown" to="/profile">My Profile</nuxt-link>
            <nuxt-link class="navbar-item-dropdown" to="/trips/user">My Trips</nuxt-link>
            <nuxt-link class="navbar-item-dropdown" to="/test">Test</nuxt-link>
            <hr class="navbar-divider">
            <a class="navbar-item-dropdown" @click="logout">Logout</a>
          </div>
        </div>
        <template v-else>
          <nuxt-link class="navbar-item" to="/auth/register">Register</nuxt-link>
          <nuxt-link class="navbar-item" to="/login">Log In</nuxt-link>
        </template>
        <div class="profile-picture">
          <v-avatar>
            <img v-if="loggedInUser && this.$auth.$state.user.picture" class="profilepic" :src="this.$auth.$state.user.picture.url" >
            <img v-else class="profilepic" src="../static/defaultpic.png" alt= "profile">
          </v-avatar>
        </div>
      </div>
    </ul>
  </body>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters(['isAuthenticated', 'loggedInUser'])
    },
    data() {
      return {
        search : ''
      }
    },

    methods: {
      async logout() {
        await this.$auth.logout();
      },
      trigger() {
        this.$router.push(`/trips/search?query=${this.search}`)
      }
    }
  }
</script>

<style scoped>
  ul {
    margin: 0;
    padding: 0;
    background-color: rgb(126, 167, 163);
  }

  li {
    float: left;
  }

  li a {
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
  }

  .navbar-item-dropdown {
    width: 100%;
    background-color:rgb(147, 173, 171);
  }
  .navbar {
    width: 100%;
    background-color: rgb(147, 173, 171);
  }

  /* Navbar links */
  .navbar a {
    float: left;
    text-align: center;
    padding: 12px;
    color: white;
    text-decoration: none;
    font-size: 17px;
    margin: auto;
  }

  /* Navbar links on mouse-over */
  .navbar a:hover {
    background-color: rgb(165, 190, 181);
  }

  /* Current/active navbar link */
  .active {
    background-color: rgb(115, 138, 136);
    margin: auto;
    border-radius: 12px;
    right: 10em;
  }

  .round-button {
    border-radius: 12px;
  }

  * {box-sizing: border-box;}

  body {
    margin: 0;
    font-family: Arial, Helvetica, sans-serif;
  }

  .navbar .search-container {
    float: right;
    margin-top: 20px;
	  margin-right: 300px;
  }

  .navbar .search-container input {
    background-color: white;
    border-radius: 12px;
    width: 400px;
  }

  .navbar input[type=text] {
    padding: 6px;
    margin-top: 8px;
    font-size: 17px;
    border: none;
  }

  .navbar-link {
    right: 0.6em;
    margin-right: 17px;
    background-color: rgb(147, 173, 171);
  }

  .navbar-link {
    background-color: rgb(147, 173, 171);
  }

  .navbar-link::after {
    right: -0.7em;
    margin-right: 17px;
  }

  .navbar .search-container button {
    float: right;
    padding: 6px 10px;
    margin-top: 8px;
    margin-right: 16px;
    background: #ddd;
    font-size: 17px;
    border: none;
    cursor: pointer;
    border-radius: 12px;
  }

  .navbar .search-container button:hover {
    background: #ccc;
  }

  @media screen and (max-width: 600px) {
    .navbar .search-container {
      float: none;
    }
    .navbar a, .topnav input[type=text], .navbar .search-container button {
      float: none;
      display: block;
      text-align: left;
      width: 100%;
      margin: 0;
      padding: 14px;
    }

    .navbar input[type=text] {
      border: 1px solid rgb(44, 42, 42);  
    }

    .navbar .profile-picture v-avatar img {
      margin-top: 50px;
      margin-right: 17px;
    }
  }
</style>
