<template>
  <div id="app">
    <StockMarket :event="event"/>
  </div>
</template>

<script>
import StockMarket from "./components/StockMarket.vue";

export default {
  name: "App",
  components: {
    StockMarket
  },
  data: function() {
    return {
      connection: null,
      event: null
    };
  },
  created: function() {
    console.log("Starting connection to WebSocket Server");
    const connection = new WebSocket("ws://159.89.15.214:8080/");

    connection.onmessage = (event) => {
      this.event = event
    };

    connection.onopen = (event) => {
      console.log(event);
      console.log("Successfully connected to the echo websocket server...");
      connection.send(JSON.stringify({"subscribe": "DE000BASF111"}))
    };

  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
