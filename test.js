var RedisStore = require("./")
    , redisStore = RedisStore(6379, "localhost")
    , assert = require("assert")

redisStore.get("streamName", function (streamOne) {
    redisStore.get("streamName", function (streamTwo) {
        streamOne.on("data", function (data) {
            console.log("one", data)
            //assert.equal(data, "foo")
            //streamOne.end()
            //streamTwo.end()
        })
        streamTwo.on("data", function (data) {
            console.log("two", data)
        })
        streamTwo.write("foo")
    })
})