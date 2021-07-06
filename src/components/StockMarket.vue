<template>
  <div class="stock-market">
    <h1>Hello Stock Market!</h1>
    {{ event.data }}
  </div>
</template>

<script>
export default {
  name: "StockMarket",
  props: {
    event: MessageEvent
  },
};
</script>

<style scoped></style>
