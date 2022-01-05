<template>
  <v-container class="appBarContainer" fluid>
    <div class="logoBox">
      <router-link to="/">
        <v-img src="@/assets/logo.png" height="4rem" contain />
      </router-link>
    </div>
    <v-app-bar elevation="4" class="rounded-pill" color="#72c4ff">
      <router-link to="/prices">
        <v-btn class="mx-2" :class="{ selected: isPrices }" left bottom text>
          Prices
        </v-btn>
      </router-link>
      <router-link to="/news">
        <v-btn :class="{ selected: isNews }" left bottom text>News</v-btn>
      </router-link>
      <router-link to="/preferences" v-if="user && user.rank === 2">
        <v-btn :class="{ selected: isPreferences }" left bottom text>
          User preferences
        </v-btn>
      </router-link>

      <v-spacer />

      <div v-if="!user">
        <router-link to="/login">
          <v-btn left bottom text>Login</v-btn>
        </router-link>

        <router-link to="/register">
          <v-btn class="ml-2" left bottom rounded>Register</v-btn>
        </router-link>
      </div>
      <div class="text-center" v-else>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-avatar
              class="avatar white--text"
              size="40"
              v-bind="attrs"
              v-on="on"
            >
              {{ initials }}
            </v-avatar>
          </template>
          <v-list>
            <v-list-item @click="goToAccount">
              <v-list-item-title>
                <v-icon class="mr-2">mdi-account</v-icon>
                Account
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="logOut">
              <v-list-item-title>
                <v-icon class="mr-2">mdi-logout</v-icon>
                Logout
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Navbar",
  computed: {
    ...mapGetters(["user"]),
    isPrices() {
      return this.$route.path === "/prices";
    },
    isNews() {
      return this.$route.path === "/news";
    },
    isPreferences() {
      return this.$route.path === "/preferences";
    },
    initials() {
      if (this.user) {
        return this.user.email[0].toUpperCase();
      } else return "";
    },
  },
  methods: {
    goToAccount() {
      this.$router.push("/account");
    },
    logOut() {
      this.$store.commit("SET_USER", null);
      localStorage.removeItem("cof_user");
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss" scoped>
.appBarContainer {
  display: flex;
  padding-left: 2rem;
  padding-right: 2rem;

  .logoBox {
    max-width: 20%;
    margin-right: 1rem;
  }

  .selected {
    color: #fff;
    font-weight: bold;
    border-bottom: 3px solid #fff;
    border-radius: 0;
  }

  .avatar {
    transition: 0.25s all linear;
    cursor: pointer;
    font-weight: bold;
    background: rgb(68, 64, 64);
    &:hover {
      transform: scale(1.05);
      background: rgb(106, 100, 100);
    }
  }

  @media only screen and (max-width: 600px) {
    flex-direction: column;
    padding-left: 0.5rem;
    padding-right: 0.5rem;

    .logoBox {
      max-width: 50%;
      margin: auto;
    }
  }
}
</style>
