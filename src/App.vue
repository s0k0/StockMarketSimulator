<template>
  <div id="app">
    <header>
      <h1>Hello Stock Market!</h1>
      <button class="add-subsciption" @click="addSubscription('DE000BASF111')">
        Subscribe
      </button>
    </header>
    <StockValue
      v-for="(value, name) in stocks"
      :price="value"
      :isin="name"
      :key="name"
    />
  </div>
</template>

<script>
import StockValue from "./components/StockValue.vue";
import config from "./config.json";

//TODO: subscribe to any ISNI
//TODO: allow multiple subscription and disable duplicate
//TODO: display error message to user in case of connection broken
//TODO: add unit test

export default {
  name: "App",
  components: {
    StockValue
  },
  data: function() {
    return {
      connection: null,
      stocks: {}
    };
  },
  methods: {
    addSubscription: function(isin) {
      this.connection.send(JSON.stringify({ subscribe: isin }));
    },
    handleEvent: function(event) {
      const { isin, price } = JSON.parse(event.data);
      this.stocks = { ...this.stocks, [isin]: price };
    }
  },
  created: function() {
    let vm = this;
    console.log("Starting connection to WebSocket Server");
    const websocket = `ws://${config.websocket.ip}:${config.websocket.port}/`;
    this.connection = new WebSocket(websocket);

    this.connection.onmessage = function(event) {
      vm.handleEvent(event);
    };

    this.connection.onopen = function(event) {
      console.log(event);
      console.log("Successfully connected to the echo websocket server...");
    };

    this.connection.onclose = function(event) {
      console.log(
        "Socket is closed. Reconnect will be attempted in 1 second.",
        event.reason
      );
      setTimeout(() => {
        this.stocks = this.stocks === null ? {} : null; //force rerender by changing prop alternating untill connection back
      }, 1000);
    };

    this.connection.onerror = function(err) {
      console.error(
        "Socket encountered error: ",
        err.message,
        "Closing socket"
      );
      this.connection.close();
    };
  }
};
</script>

<style>
#app {
  text-align: center;
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: baseline;
  font-size: calc(10px + 2vmin);
  color: white;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.add-subsciption {
  cursor: pointer;
  margin: 12px;
  padding: 0 24px;
  font-size: x-large;
  color: white;
  font-weight: 900;
  border: 1px solid orange;
  border-radius: 6px;
  background: orange;
}
</style>
