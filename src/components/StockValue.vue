<template>
  <div class="stock-value">
    <span>ISIN: {{ isin }}</span>
    <span>{{ price.toFixed(2) }} €</span>
  </div>
</template>

<script>
export default {
  name: "StockMarket",
  props: {
    price: Number,
    isin: String
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
