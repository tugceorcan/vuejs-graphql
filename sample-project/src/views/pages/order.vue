<template>
  <v-main>
    <v-container fluid>
      <div>
        <v-data-table
          :headers="headers"
          :items="orders"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          class="elevation-1"
        ></v-data-table>
      </div>
    </v-container>
  </v-main>
</template>    
<script>
import store from "../../store";
import Vue from "vue";
export default {
  name: "order-list",
  components: {},
  data: () => ({
    models: {
      id: 0,
      orderNo: "",
      orderName: "",
      fulfillmentType: "",
      paymentType: "",
      orderDate: "",
      deliveryDate: "",
      collectionDate: "",
      status: 0,
      currency: "",
      currencyCode: "",
      currencyValue: 0,
      subTotal: 0,
      discountTotal: 0,
      vatTotal: 0,
      total: 0,
      notes: "",
      details: [],
      deletedAt: "",
    },
    sortBy: "orderNo",
    sortDesc: false,
    headers: [
      { text: "Order Number", value: "orderNo" },
      { text: "Order Name", value: "orderName" },
      { text: "Payment Type", value: "paymentType" },
      { text: "Order Date", value: "orderDate" },
      { text: "Delivery Date", value: "deliveryDate" },
      { text: "Status", value: "status" },
      { text: "Currency", value: "currency" },
      { text: "Currency Code", value: "currencyCode" },
      { text: "Sub Total", value: "subTotal" },
      { text: "Discount Total", value: "discountTotal" },
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
  },
  mounted() {
    let request = {
      query: `{
                orders(startDate: "01/07/2022", endDate: "14/08/2022") {
                  id
                  orderNo
                  orderName
                  fulfillmentType
                  paymentType
                  orderDate
                  deliveryDate
                  collectionDate
                  status
                  currency
                  currencyCode
                  currencyValue
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
                    price
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
      console.log(response.data);
    });
  },
  created() {},
};
</script>