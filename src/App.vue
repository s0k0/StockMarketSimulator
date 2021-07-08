<template>
  <div id="app">
    <h1>Hello Stock Market!</h1>
    <StockValue v-if="event" :event="event" :key="event.lastEventId" />
  </div>
</template>

<script>
import StockValue from "./components/StockValue.vue";
import config from "./config.json";

export default {
  name: "App",
  components: {
    StockValue
  },
  data: function() {
    return {
      connection: null,
      event: null
    };
  },
  created: function() {
    console.log("Starting connection to WebSocket Server");
    const websocket = `ws://${config.websocket.ip}:${config.websocket.port}/`;
    const connection = new WebSocket(websocket);

    connection.onmessage = event => {
      this.event = event;
    };

    connection.onopen = event => {
      console.log(event);
      console.log("Successfully connected to the echo websocket server...");
      connection.send(JSON.stringify({ subscribe: "DE000BASF111" }));
    };

    connection.onclose = event => {
      console.log(
        "Socket is closed. Reconnect will be attempted in 1 second.",
        event.reason
      );
      setTimeout(() => {
        this.event = this.event === null ? [] : null; //force rerender by changing prop alternating untill connection back
      }, 1000);
    };

    connection.onerror = err => {
      console.error(
        "Socket encountered error: ",
        err.message,
        "Closing socket"
      );
      connection.close();
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
</style>
