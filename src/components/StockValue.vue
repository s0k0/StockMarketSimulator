<template>
  <div class="stock-value">
    <span>{{ name }} ({{ isin }})</span>
    <span
      >{{ price.toFixed(2) }} €
      <button class="remove-stock" @click="removeStock">X</button></span
    >
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
  },
  methods: {
    removeStock: function() {
      this.$emit("removeStock", this.isin);
    }
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
  align-content: center;
}
.remove-stock {
  margin: 0 12px 0 36px;
  padding: 6px;
  background: transparent;
  border: 2px solid white;
  border-radius: 6px;
  color: white;
  cursor: pointer;
}

span {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
