<template>
  <v-container
    fill-height
    class="d-flex flex-row mr-12 align-center justify-center"
  >
    <v-responsive
      style="border: 1px solid; border-color: #a7a7a7; background-color: white"
      class="rounded-lg pa-8 text-center"
      max-width="350px"
      min-width="250px"
    >
      <v-btn @click="goHome" color="primary" dark icon absolute top left>
        <v-icon> mdi-home </v-icon>
      </v-btn>
      <h3 style="line-height: 1; color: #2196f3; font-size: 42px" class="mb-8">
        Log in
      </h3>

      <v-divider style="background-color: #becdda" />

      <v-form class="py-4" v-model="isFormValid">
        <v-text-field
          required
          outlined
          autofocus
          min="8"
          label="Username"
          placeholder="Username"
          v-model="email"
          :rules="[usernameRules]"
        />

        <v-text-field
          required
          outlined
          min="8"
          type="password"
          label="Password"
          placeholder="Password"
          v-model="password"
          :rules="[passwordRules]"
        />

        <div>
          <v-checkbox
            class="pt-0 mt-0"
            label="Remember me"
            v-model="rememberMe"
            color="primary"
          />
        </div>

        <p style="font-size: 16px" class="red--text font-weight-bold">
          {{ this.error }}
        </p>
      </v-form>

      <v-form class="d-flex flex-column justify-space-between">
        <v-btn
          block
          outlined
          color="primary"
          style="font-size: 18px"
          class="font-weight-bold rounded-0 text-capitalize"
          @click="logIn"
          :disabled="!isFormValid"
        >
          Log In
        </v-btn>

        <h5 style="font-size: 14px" class="my-8 grey--text">Or</h5>

        <v-btn
          outlined
          style="font-size: 18px; color: #4267b2"
          class="rounded-0 text-capitalize font-weight-bold mb-8"
          @click="oauthGoogle"
        >
          Continue with Google
        </v-btn>
      </v-form>

      Don't have an account ?
      <p style="color: #2196f3; cursor: pointer" @click="register">Sign up</p>
    </v-responsive>

    <v-responsive class="d-flex justify-center">
      <v-img src="@/assets/cryptocurrency.svg" max-height="700px" lazy />
    </v-responsive>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      error: "",
      email: this.email,
      password: this.password,
      rememberMe: false,
      isFormValid: false,
    };
  },
  computed: {
    passwordRules() {
      return (v) => !!v || "Password is required";
    },
    usernameRules() {
      return (v) => !!v || "Email is required";
    },
  },
  methods: {
    logIn() {
      axios
        .post(process.env.VUE_APP_API_URL + "/api/user/login", {
          email: this.email,
          password: this.password,
          oAuthGoogle: true,
        })
        .then((response) => {
          this.$store.commit("SET_USER", response.data.data);
          if (this.rememberMe) {
            localStorage.setItem(
              "cof_user",
              JSON.stringify(response.data.data)
            );
          }
          this.$router.push("/");
          this.$toast("Successfully connected !", {
            color: "green",
          });
        })
        .catch((err) => {
          this.$toast(err.response.data.message, {
            color: "red",
          });
          throw err;
        });
    },
    register() {
      this.$router.push("/register");
    },
    goHome() {
      this.$router.push("/");
    },
    createAccount() {
      axios
        .post(process.env.VUE_APP_API_URL + "/api/user/register", {
          email: this.email,
          password: this.password,
          oAuthGoogle: true,
        })
        .then(() => {
          this.logIn();
        })
        .catch((err) => {
          this.$toast(err.response.data.message, {
            color: "red",
          });
          throw err;
        });
    },
    oauthGoogle() {
      this.$gAuth
        .signIn()
        .then((GoogleUser) => {
          this.password = GoogleUser.vc.id_token;
          this.email = GoogleUser.xu.lv;
          axios
            .post(process.env.VUE_APP_API_URL + "/api/user/login", {
              email: this.email,
              password: this.password,
              oAuthGoogle: true,
            })
            .then((response) => {
              this.$store.commit("SET_USER", response.data.data);
              this.$router.push("/");
              this.$toast("Successfully connected !", {
                color: "green",
              });
            })
            .catch((err) => {
              if (err.response.status === 400) this.createAccount();
              throw err;
            });
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
  },
};
</script>
