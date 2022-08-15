import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    token: "",
  },
  mutations: {},
  actions: {
    logout(){
      try {
        var request = {
          query: `mutation {logout}`,
        };
        Vue.axios.post("/graphql", request).then((response) => {
         this.state.token="";
         this.state.user={};
        });
      } catch (error) {
        console.log(error);
      }
    }
  },
});
