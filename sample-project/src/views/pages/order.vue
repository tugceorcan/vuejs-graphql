<template>
  <v-main>
    <app-header></app-header>
    <v-container fluid>
      <v-row align="center" class="list px-3 mx-auto">
        <v-col cols="12" sm="12">
          <v-card class="mx-auto" tile>
            <v-data-table
              :headers="headers"
              :items="orders"
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
              class="elevation-1"
              :loading="isLoading"
              item-key="id"
            >
              <template v-slot:[`item.actions`]="{ item }">
                <v-btn
                  class="mx-2"
                  fab
                  small
                  depressed
                  color="secondary"
                  @click="openOrderDetail(item)"
                >
                  <v-icon>mdi-pencil</v-icon></v-btn
                >
              </template>
              <template v-slot:[`item.orderDate`]="{ item }">
                <span>{{ new Date(item.orderDate).toLocaleString() }}</span>
              </template>
              <template v-slot:[`item.deliveryDate`]="{ item }">
                <span>{{ new Date(item.deliveryDate).toLocaleString() }}</span>
              </template>
            </v-data-table>
          </v-card>
        </v-col></v-row
      >
    </v-container>
    <template>
      <v-dialog v-model="showDialog" max-width="750" min-height="550">
        <v-card>
          <v-card-title class="px-0 py-0">
            <v-toolbar flat dense class="pr-1 secondary">
              <v-toolbar-title dark class="white--text"
                ><strong>Order Details</strong></v-toolbar-title
              >
            </v-toolbar>
          </v-card-title>
          <v-card-text>
            <v-container fluid class="mt-4">
              <v-row
                ><v-subheader
                  ><h3>{{ models.orderName }}</h3></v-subheader
                ></v-row
              ><v-row class="mb-4"><v-divider></v-divider></v-row>

              <v-row>
                <v-col cols="6" class="mb-0 pb-0">
                  <v-text-field
                    v-model="models.details[0].price"
                    label="Order Price"
                    disabled
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="6" class="mb-0 pb-0">
                  <v-text-field
                    v-model="models.details[0].unit"
                    label="Order Unit"
                    disabled
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="6" class="mb-0 pb-0">
                  <v-text-field
                    v-model="models.details[0].subTotal"
                    label="Order Sub Total"
                    disabled
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="6" class="mb-0 pb-0">
                  <v-text-field
                    v-model="models.details[0].total"
                    label="Order Total"
                    disabled
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row
                ><v-subheader><h3>Product Details</h3></v-subheader></v-row
              ><v-row class="mb-4"><v-divider></v-divider></v-row>

              <v-row>
                <v-col cols="6" class="mb-0 pb-0">
                  <v-text-field
                    v-model="models.details[0]
                    .product.code"
                    label="Product Code"
                    disabled
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="6" class="mb-0 pb-0">
                  <v-text-field
                    v-model="models.details[0].product.description1"
                    label="Product Description"
                    disabled
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="6" class="mb-0 pb-0">
                  <v-text-field
                    v-model="models.details[0].product.barcode1"
                    label="Product Barcode"
                    disabled
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="6" class="mb-0 pb-0">
                  <v-text-field
                    v-model="models.details[0].product.categories[0].name"
                    label="Product Category Name"
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
import Vue from "vue";
import router from "@/router";
import AppHeader from "@/components/app-header.vue";
export default {
  name: "order-list",
  components: {AppHeader},
  data: () => ({
    isLoading: false,
    showDialog: false,
    models: {
      id: 0,
      orderName: "",
      orderDate: "",
      deliveryDate: "",
      collectionDate: "",
      status: 0,
      subTotal: 0,
      discountTotal: 0,
      vatTotal: 0,
      total: 0,
      notes: "",
      details: [
        {
          id: 0,
          price: 0,
          unit: "",
          quantity: 0,
          subTotal: 0,
          discountTotal: 0,
          total: 0,
          product: {
            id: 0,
            code: "",
            description1: "",
            barcode1: "",
            categories: [{ id: 0, name: "" }],
          },
        },
      ],
      deletedAt: "",
    },
    sortBy: "id",
    sortDesc: false,
    headers: [
      { text: "Actions", value: "actions" },
      { text: "Order Id", value: "id" },
      { text: "Order Name", value: "orderName" },
      // { text: "Payment Type", value: "paymentType" },
      { text: "Order Date", value: "orderDate" },
      { text: "Delivery Date", value: "deliveryDate" },
      // { text: "Status", value: "status" },
      { text: "Total Price", value: "total" },
      { text: "Notes", value: "notes" },
    ],
    orders: [],
  }),
  computed: {},
  watch: {},
  methods: {
    toggleOrder() {
      this.sortDesc = !this.sortDesc;
    },
    nextSort() {
      let index = this.headers.findIndex((h) => h.value === this.sortBy);
      index = (index + 1) % this.headers.length;
      this.sortBy = this.headers[index].value;
    },
    getOrders() {
      this.isLoading = true;
      let request = {
        query: `{
                orders(startDate: "01/06/2022", endDate: "14/08/2022") {
                  id
                  orderName
                  orderDate
                  deliveryDate
                  collectionDate
                  status
                  subTotal
                  discountTotal
                  vatTotal
                  total
                  notes
                  details {
                    id
                    price
                    unit
                    quantity
                    subTotal
                    discountTotal
                    total
                    product {
                      id
                      code
                      description1
                      barcode1
                      categories {
                        id
                        name
                      }
                    }
                  }
                }
              }`,
      };
      this.axios.post("/graphql", request).then((response) => {
        response.data?.data?.orders?.forEach((order) => {
          this.orders.push(order);
        });
        this.isLoading = false;
      });
    },
    openOrderDetail(item) {
      this.showDialog = true;
      this.models = item;
    },
  },
  mounted() {
    if(store.state.token && store.state.token != ""){
this.getOrders();
    }else{
      router.push({name:"app-login"})
    }
    
  },
  created() {},
};
</script>
