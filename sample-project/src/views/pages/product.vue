<template>
  <v-main>
    <app-header></app-header>
    <v-container fluid>
      <v-row align="center" class="list px-3 mx-auto">
        <v-col cols="12" sm="12">
          <v-card class="mx-auto" tile>
            <v-data-table
              :headers="headers"
              :items="products"
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
              class="elevation-1"
              :loading="isLoading"
              item-key="id"
            >
              <template v-slot:[`item.actions`]="{ item }">
                <v-btn
                  class="mx-1"
                  fab
                  small
                  depressed
                  color="secondary"
                  @click="openProductDetail(item)"
                >
                  <v-icon>mdi-pencil</v-icon></v-btn
                >
              </template>
              <template v-slot:[`item.createdAt`]="{ item }">
                <span>{{ new Date(item.createdAt).toLocaleString() }}</span>
              </template>
              <template v-slot:[`item.stockStatus.available`]="{ item }">
                <v-simple-checkbox
                  v-model="item.stockStatus.available"
                  disabled
                ></v-simple-checkbox>
              </template>
            </v-data-table>
          </v-card> </v-col
      ></v-row>
    </v-container>
    <template>
      <v-dialog v-model="showDialog" max-width="750" min-height="550">
        <v-card>
          <v-card-title class="px-0 py-0">
            <v-toolbar flat dense class="pr-1 secondary">
              <v-toolbar-title dark class="white--text"
                ><strong>Product Details</strong></v-toolbar-title
              >
            </v-toolbar>
          </v-card-title>
          <v-card-text>
            <v-container fluid class="mt-4">
              <v-row
                ><v-subheader
                  ><h3>{{ models.description1 }}</h3></v-subheader
                ></v-row
              ><v-row class="mb-4"><v-divider></v-divider></v-row>

              <v-row>
                <v-col cols="6" class="mb-0 pb-0">
                  <v-text-field
                    v-model="models.itemType"
                    label="Item Type"
                    disabled
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="6" class="mb-0 pb-0">
                  <v-text-field
                    v-model="models.vatCode"
                    label="Product Vat Code"
                    disabled
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="6" class="mb-0 pb-0">
                  <v-text-field v-model="models.isNew" label="Is New" disabled>
                  </v-text-field>
                </v-col>
                <v-col cols="6" class="mb-0 pb-0">
                  <v-text-field
                    v-model="models.price.price.price"
                    label="Price"
                    disabled
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row
                ><v-subheader><h3>Attributes</h3></v-subheader></v-row
              ><v-row class="mb-4"><v-divider></v-divider></v-row
              ><v-row>
                <v-col cols="6" class="mb-0 pb-0">
                  <v-text-field
                    v-model="models.categories[0].name"
                    label="Category Name"
                    disabled
                  >
                  </v-text-field>
                </v-col>

                <v-col
                  v-for="item in models.attributes"
                  :key="item.id"
                  cols="6"
                  class="mb-0 pb-0"
                >
                  <v-text-field
                    v-if="item.visible == true"
                    v-model="item.values[0].name"
                    :label="item.name"
                    disabled
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
    </template>
  </v-main>
</template>
<script>
import store from "../../store";
import AppHeader from "@/components/app-header.vue";
import router from "@/router";

export default {
  name: "product-list",
  components: {AppHeader},
  data: () => ({
    isLoading: false,
    showDialog: false,
    models: {
      id: 0,
      code: "",
      description1: "",
      vatCode: "",
      barcode1: "",
      barcode2: "",
      barcode3: "",
      unit1: "",
      pSize: "",
      weight: "",
      itemType: "",
      defaultUnit: "",
      catalogCode: "",
      allowSales: "",
      createdAt: "",
      isNew: false,
      price: { price: { price: 0 } },
      categories: [{ name: "" }],
      attributes: [
        {
          id: 0,
          name: "",
          values: [{ id: 0, name: "", index: "" }],
          visible: "",
        },
      ],
      stockStatus: { available: false },
    },
    products: [],
    sortBy: "code",
    sortDesc: false,
    headers: [
      { text: "Actions", value: "actions" },
      { text: "Product Code", value: "code" },
      { text: "Catalog Code", value: "catalogCode" },
      { text: "Description", value: "description1" },
      { text: "Barcode", value: "barcode1" },
      { text: "Unit", value: "unit1" },
      { text: "Default Unit", value: "defaultUnit" },
      { text: "Allow Sales", value: "allowSales" },
      { text: "Created At", value: "createdAt" },
      { text: "Available Stock", value: "stockStatus.available" },
    ],
  }),
  computed: {},
  watch: {},
  methods: {
    getProducts() {
      this.isLoading = true;
      try{      let request = {
        query: `{products(index:0,limit:10){ products{
                 id
                 code
                 description1
                 vatCode
                 barcode1
                 unit1
                 pSize
                 weight
                 itemType
                 defaultUnit
                 catalogCode
                 allowSales
                 createdAt
                 isNew
                 price{price{price}}
                 categories{name}
                 attributes{id name values{id name index} visible}
                 stockStatus{available}
             }}}`,
      };
      this.axios.post("/graphql", request).then((response) => {
        response.data?.data?.products?.products?.map((product) => {
          this.products.push(product);
        });
        this.isLoading = false;
      });}catch{
        this.error({})
      }

    },
    openProductDetail(item) {
      this.showDialog = true;
      this.models = item;
    },
  },
  mounted() {
    if(store.state.token && store.state.token != ""){
      this.getProducts();
    }else{
      router.push({name:"app-login"})
    }
  },
  created() {},
};
</script>
