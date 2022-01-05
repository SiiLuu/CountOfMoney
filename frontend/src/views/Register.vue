<template>
  <v-container
    fill-height
    class="d-flex flex-row mr-12 align-center justify-center"
  >
    <v-responsive
      style="
        border: 1px solid;
        border-color: #a7a7a7;
        background-color: white;
        font-size: 48px;
      "
      class="rounded-lg pa-8 blue--text text-center"
      max-width="350px"
      min-width="250px"
    >
      <v-btn @click="goHome" color="primary" dark icon absolute top left>
        <v-icon> mdi-home </v-icon>
      </v-btn>
      <h3 style="line-height: 1; color: #2196f3; font-size: 42px" class="mb-8">
        Register
      </h3>

      <v-divider style="background-color: #becdda" />

      <v-form class="py-4">
        <v-text-field
          required
          outlined
          autofocus
          placeholder="example@gmail.com"
          label="Email"
          v-model="email"
          :rules="[emailRules]"
        />

        <v-text-field
          required
          outlined
          placeholder="Secret"
          label="Password"
          type="password"
          v-model="password"
          :rules="[
            rules.required,
            rules.counter,
            rules.number,
            rules.capital,
            rules.special,
          ]"
        />
      </v-form>

      <v-divider style="background-color: #becdda" />

      <v-container class="d-flex flex-column justify-space-between">
        <v-btn
          block
          color="primary"
          :disabled="email && password ? false : true"
          style="font-size: 18px; border: 2px solid black !important"
          class="font-weight-bold rounded-0 text-capitalize"
          @click="register"
        >
          Register
        </v-btn>
      </v-container>

      <div class="goToLogin">
        <p>Already have an account ?</p>
        <span @click="login">Sign in</span>
      </div>
    </v-responsive>

    <v-responsive>
      <v-img src="@/assets/cryptocurrency.svg" max-height="700px" lazy />
    </v-responsive>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: this.email,
      password: this.password,
      rules: {
        required: (value) => !!value || "Password is required.",
        counter: (value) =>
          (value && value.length >= 8) ||
          "Password must have at least 8 characters",
        number: (value) =>
          (value && /\d/.test(value)) ||
          "Password must have at least one number.",
        capital: (value) =>
          (value && /[A-Z]{1}/.test(value)) ||
          "Password must have at least one capital letter",
        special: (value) =>
          (value && /[^A-Za-z0-9]/.test(value)) ||
          "At least one special character",
      },
    };
  },
  computed: {
    emailRules() {
      return (
        () => (v) => !!v || "Email is required",
        (v) => (v && !!v.trim()) || "Value cannot be empty",
        (v) =>
          !v ||
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid"
      );
    },
    usernameRules() {
      return (
        () => (v) => !!v || "Username is required",
        (v) => (v && !!v.trim()) || "Value cannot be empty"
      );
    },
  },
  methods: {
    register() {
      axios
        .post(process.env.VUE_APP_API_URL + "/api/user/register", {
          email: this.email,
          password: this.password,
          oAuthGoogle: false,
        })
        .then(() => {
          this.$toast("User created successfully !", {
            color: "green",
          });
          this.$router.push("/login");
        })
        .catch((err) => {
          this.$toast(err.response.data.message, {
            color: "red",
          });
          throw err;
        });
    },
    login() {
      this.$router.push("/login");
    },
    goHome() {
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
.goToLogin {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  margin-top: 1rem;
  p {
    color: black;
    margin-bottom: 0;
  }
  span {
    color: rgb(33, 150, 243);
    cursor: pointer;
  }
}
</style>
