var RedisStore = require("./")
    , redisStore = RedisStore(6379, "localhost")
    , assert = require("assert")

var streamOne = redisStore.get("streamName")
var streamTwo = redisStore.get("streamName")
streamOne.on("data", function (data) {
    assert.equal(data, "foo")
    streamOne.end()
    streamTwo.end()
    console.log("DONE")
})
streamOne.on("open", function () {
    streamTwo.write("foo")
})