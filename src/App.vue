<template>
  <div id="app">
    <header>
      <h1>Hello Stock Market!</h1>
      <h5 class="server-error" v-if="socketStatus === 'closed'">
        The connection to server is interrupted. Please reload or try again
        later.
      </h5>
      <SelectCompany v-on:selectCompany="onChangeCompany" />
      <button class="add-subsciption" @click="addSubscription">
        Subscribe
      </button>
    </header>
    <template v-if="hasStocks">
      <StockValue
        v-for="(value, name) in stocks"
        :price="value"
        :isin="name"
        :key="name"
        v-on:removeStock="removeSubscription"
      />
    </template>
    <p v-else>No data yet. Select a company to display stock informations.</p>
  </div>
</template>

<script>
import Vue from "vue";
import StockValue from "./components/StockValue.vue";
import SelectCompany from "./components/SelectCompany.vue";
import config from "./config.json";

export default {
  name: "App",
  components: {
    StockValue,
    SelectCompany
  },
  data: function() {
    return {
      connection: null,
      stocks: {},
      selectedCompany: null,
      socketStatus: null
    };
  },
  computed: {
    hasStocks: function() {
      return Object.keys(this.stocks).length > 0;
    }
  },
  methods: {
    addSubscription: function() {
      if (this.stocks[this.selectedCompany]) return; //avoid re-subscriptions if you already subscribed to this isin
      this.connection.send(JSON.stringify({ subscribe: this.selectedCompany }));
    },
    removeSubscription: async function(value) {
      this.connection.send(
        JSON.stringify({ unsubscribe: this.selectedCompany })
      );
      Vue.delete(this.stocks, value);
    },
    handleEvent: function(event) {
      const { isin, price } = JSON.parse(event.data);
      this.stocks = { ...this.stocks, [isin]: price };
    },
    onChangeCompany: function(value) {
      this.selectedCompany = value;
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
      vm.socketStatus = "open";
      console.log(event);
      console.log("Successfully connected to the echo websocket server...");
    };

    this.connection.onclose = function(event) {
      vm.socketStatus = "closed";
      console.log(
        "Socket is closed. Reconnect will be attempted in 1 second.",
        event.reason
      );
      setTimeout(() => {
        vm.socketStatus = "reconnect"; //force rerender by changing prop alternating untill connection back
      }, 1000);
    };

    this.connection.onerror = function(err) {
      vm.socketStatus = "error";
      console.error(
        "Socket encountered error: ",
        err.message,
        "Closing socket"
      );
      this.connection.onclose();
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
  padding: 12px 24px;
  font-size: x-large;
  color: white;
  font-weight: 900;
  border: 1px solid orange;
  border-radius: 6px;
  background: orange;
}

.server-error {
  color: red;
}
</style>
