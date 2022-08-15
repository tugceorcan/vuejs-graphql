<template>
  <v-app>
    <v-main style="margin-top: -35px; margin-leftÇ -25px">
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12" :loading="isLoading">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form ref="form" @keyup.native.enter="submit">
                  <v-text-field
                    prepend-icon="mdi-account"
                    v-model="email"
                    label="E-mail"
                    type="text"
                    required
                    :rules="[rules.required, rules.email]"
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    prepend-icon="mdi-lock"
                    v-model="password"
                    label="Password"
                    :type="inputType"
                    required
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="
                      show = !show;
                      inputType = inputType == 'text' ? 'password' : 'text';
                    "
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-form>
                <div v-if="showError">
                  <v-alert type="error"> {{ errorMessage }} </v-alert>
                </div>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="submit">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import store from "../../store";
export default {
  name: "app-login",
  components: {},
  data: () => ({
    isLoading: false,
    email: "",
    password: "",
    inputType: "password",
    show: false,
    errorMessage: "",
    showError: false,
    rules: {
      required: (value) => !!value || "Required.",
      counter: (value) => value.length <= 20 || "Max 20 characters",
      email: (value) => {
        const pattern =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      },
    },
  }),
  computed: {},
  watch: {},
  methods: {
    async submit() {
      if (!this.$refs.form.validate()) {
        return false;
      }
      this.isLoading = true;
      try {
        var request = {
          query: `mutation {login(email:"${this.email}"password:"${this.password}")}`,
        };
        this.axios.post("/graphql", request).then(async (response) => {
          if (response.data.data.login == null) {
            this.showError = true;
            this.errorMessage =
              JSON.parse(response.data.errors[0].message)?.message ||
              "Invalid User";
            return;
          }
          store.state.token = response.data.data.login;
          localStorage.setItem("token", store.state.token);
         
          this.$router.push({ name: "product-list" });
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
   
  },
  mounted() {},
  created() {},
};
</script>
