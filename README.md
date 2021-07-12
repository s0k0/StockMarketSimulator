# stock-market
This project displays data from a dummy server via websocket connection for stocks prices of companies. You can select a company from a given list representing current DAX list. The associated stock information
will appear after you clicked on subscribe button. If you want to unsubscribe for a stock, click on the x button at the right hand end of the information section.


### Multiple subsriptions
You are not able to subscribe multiple times to the same company and the app will check for this to mitigate. In case you want to allow this, you will open multiple subscription on the dummy server and hence need to close all of them if you want to unsubscribe. The current solution will overwrite the stock data for multiple subscriptions to the same ISIN so that you will only see one stock information line displayed anyway. Hence, my initial set up does not enable multiple subscriptions in the first place.

### Websocket diconnects
In case the websocket disconnects due to close or erro event, the current stocks data stays displayed and an additional error message appears below the headline. Additionally the onclose function on the websockets trys to re-connect itself with a delayed state change to trigger a rerender of the component by changing the data. This way you force an update to establish a new connection to the server every 1 second.

### Known issues
For unsubscribing to stock data, a message is send to the websocket connecton containing the isin and the keyword 'unsubscribe'. This works fine for individual subscriptions. However, if you subscribe multiple isin and unsubsribe later, you still receive events from them unless you unsubscribed from the most recent. I don't know whats causing this issue - looks to me like lifo function on the serer which does not allow individual unsubscribtions out of order.


## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Tests
```
yarn test:unit
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
