<template>
  <div id="Account">
    <h1>Account Settings</h1>
    <h3>You can change your informations here</h3>
    <v-form class="accountForm py-4">
      <v-text-field
        class="mt-5"
        required
        outlined
        min="8"
        label="Email"
        placeholder="Email"
        v-model="email"
        :rules="[rules.required, rules.validEmail]"
        :disabled="oAuthGoogle ? true : false"
      />

      <v-text-field
        class="my-5"
        required
        outlined
        min="8"
        label="Nickname"
        placeholder="Nickname"
        v-model="nickname"
        :rules="[rules.required]"
      />

      <v-text-field
        required
        outlined
        min="8"
        type="password"
        label="Password"
        placeholder="Password"
        v-model="password"
        :rules="[
          rules.required,
          rules.counter,
          rules.number,
          rules.capital,
          rules.special,
        ]"
        :disabled="oAuthGoogle ? true : false"
      />

      <p style="font-size: 16px" class="red--text font-weight-bold">
        {{ this.error }}
      </p>
    </v-form>
    <v-btn
      color="primary"
      style="font-size: 18px"
      class="font-weight-bold rounded-0 text-capitalize"
      @click="updateAccount"
      :disabled="email && nickname && password ? false : true"
    >
      Update Account
    </v-btn>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Account",
  data() {
    return {
      error: "",
      email: null,
      nickname: null,
      password: null,
      oAuthGoogle: false,
      rules: {
        required: (value) => !!value || "Is required.",
        counter: (value) =>
          (value && value.length >= 8) || "Must have at least 8 characters",
        number: (value) =>
          (value && /\d/.test(value)) || "Must have at least one number.",
        capital: (value) =>
          (value && /[A-Z]{1}/.test(value)) ||
          "Must have at least one capital letter",
        special: (value) =>
          (value && /[^A-Za-z0-9]/.test(value)) ||
          "At least one special character",
        validEmail: (value) =>
          !value ||
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
          "E-mail must be valid",
      },
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  mounted() {
    this.$store
      .dispatch("fetchAccount")
      .then((response) => {
        this.email = response.email;
        this.nickname = response.nickname;
        this.oAuthGoogle = response.oAuthGoogle;
      })
      .catch((error) => {
        throw error;
      });
  },
  methods: {
    updateAccount() {
      this.$store
        .dispatch("modifAccount", {
          email: this.email,
          nickname: this.nickname,
          password: this.password,
        })
        .then((response) => {
          this.$toast(response.data.message, {
            color: "green",
          });
        })
        .catch((error) => {
          this.$toast(error.response.data.message, {
            color: "red",
          });
          throw error;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
#Account {
  .accountForm {
    width: 30rem;
    max-width: 80%;
  }
}
</style>
