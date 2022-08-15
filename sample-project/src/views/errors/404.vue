<template>
  <v-main>
    <v-container fluid>
      <v-alert type="error">404- Page Not Found.</v-alert>
      <v-btn color="primary" @click="goToLogin">Go to Login or Home</v-btn>
    </v-container>
  </v-main>
</template>
<script>
import router from "@/router";
export default {
  name: "app-error",
  components: {},
  computed: {},
  watch: {},
  methods: {
    goToLogin() {
      var token = localStorage.getItem("token");
      if (token && token != "") this.$router.push({ name: "product-list" });
      else router.push({ name: "app-login" });
    },
  },
  mounted() {},
  created() {},
};
</script>
