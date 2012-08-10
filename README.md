# redis-stream-store

Store streams in redis

## Example

``` js
var store = require("redis-stream-store")(6379, "localhost", "prefix")
var stream = store.get("streamName")
stream.on("open", funciton () {
    stream.write("data goes in")
})
stream.on("data", function (data) {
    console.log("data comes out!", data)
})
```

## Installation

`npm install redis-stream-store`

## Tests

`node test.js`

## Contributors

 - Raynos

## MIT Licenced

  [1]: https://secure.travis-ci.org/Raynos/redis-stream-store.png
  [2]: http://travis-ci.org/Raynos/redis-stream-store