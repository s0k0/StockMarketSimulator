<template>
  <div class="stock-value">
    <span>ISIN: {{ data.isin }}</span>
    <span>{{ data.price.toFixed(2) }} €</span>
  </div>
</template>

<script>
export default {
  name: "StockMarket",
  props: {
    event: MessageEvent
  },
  data() {
    return {
      data: JSON.parse(event.data)
    };
  },
  watch: {
    event: function(newEvent) {
      this.data = JSON.parse(newEvent.data);
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
}
</style>
