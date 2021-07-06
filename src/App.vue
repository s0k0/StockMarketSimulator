<template>
  <div id="app">
    <StockMarket />
  </div>
</template>

<script>
import StockMarket from './components/StockMarket.vue'

export default {
  name: 'App',
  components: {
    StockMarket
  },
   data: function() {
    return {
      connection: null
    }
  },
  created: function() {
    console.log("Starting connection to WebSocket Server")
    this.connection = new WebSocket("ws://159.89.15.214:8080/")

    this.connection.onmessage = function(event) {
      console.log(event);
    }

    this.connection.onopen = function(event) {
      console.log(event)
      console.log("Successfully connected to the echo websocket server...")
    }
    }

}
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
