<template>
  <div class="stock-value">
    <span>{{ name }} ({{ isin }})</span>
    <span>{{ price.toFixed(2) }} €</span>
  </div>
</template>

<script>
import companies from "../data/companyList.json";

export default {
  name: "StockMarket",
  props: {
    price: Number,
    isin: String
  },
  data: function() {
    return {
      name: companies.list.filter(company => company.isin === this.isin)[0].name
    };
  }
};
</script>

<style scoped>
.stock-value {
  border: 2px solid white;
  width: 60%;
  padding: 12px;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
}
</style>
