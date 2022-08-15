<template>
  <v-toolbar
    class="d-flex justify-center align-center"
    style="max-height: 10vh"
    color="error"
  >
    <v-toolbar-title class="white--text">
      <div class="mr-2">
        <img class="logo" src="../assets/logo.png" width="50px" />
      </div>
    </v-toolbar-title>

    <v-toolbar-items>
      <v-btn dark text @click="$router.push({ name: 'product-list' })"
        >Products</v-btn
      >
      <v-btn dark text @click="$router.push({ name: 'order-list' })"
        >Orders</v-btn
      >
      <v-btn dark text @click="$router.push({ name: 'app-logout' })"
        ><v-icon>mdi-exit-to-app</v-icon></v-btn
      >
      <v-menu bottom min-width="200px" rounded offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon x-large v-on="on">
            <v-avatar color="primary" size="40">
              <span class="white--text text-h5"> P </span>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <v-avatar color="primary" class="my-2">
                <span class="white--text text-h5">P</span>
              </v-avatar>
              <h3>{{ user.name }}</h3>
              <v-divider class="my-3"></v-divider>
              <p class="text-caption mt-1">
                {{ user.telephone }}
              </p>
              <v-divider class="my-3"></v-divider>
              <p class="text-caption mt-1">
                {{ user.email }}
              </p>
              <v-divider class="my-3"></v-divider>
              <p class="text-caption mt-1">
                {{ user.address1 }}
              </p>
              <v-divider class="my-3"></v-divider>
              <p class="text-caption mt-1">
                {{ user.city }}
              </p>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
    </v-toolbar-items>
  </v-toolbar>
</template>
<script>
import store from "@/store";
export default {
  name: "app-header",
  data: () => ({
    user: {},
  }),
  components: {},
  computed: {},
  watch: {},
  methods: {
    getUserInfo() {
      try {
        var request = {
          query: `{user{name email address1 city telephone}}`,
        };
        this.axios.post("/graphql", request).then((response) => {
          store.state.user = response.data.data.user;
          this.user = response.data.data.user;
          localStorage.setItem("user", JSON.stringify(response.data.data.user));
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.getUserInfo();
  },
  created() {},
};
</script>
