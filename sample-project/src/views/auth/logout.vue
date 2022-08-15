<template>
  <v-main>
    <v-container fluid>
        <v-layout align-center justify-center>
          <v-progress-circular indeterminate color="blue"></v-progress-circular>
        </v-layout>
    </v-container>
  </v-main>
</template>    
<script>
import store from '../../store';
import router from "@/router";

export default {
  name: "app-logout",
  components: {},
  data: () => ({
    models:{}
  }),
  computed: {},
  watch: {},
  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      store.dispatch("logout");
      router.push("/login");
    }
  },
  mounted() {},
  created() {
    return this.logout();
  },
};
</script>