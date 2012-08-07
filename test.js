var RedisStore = require("./")
    , redisStore = RedisStore(6379, "localhost")
    , assert = require("assert")

redisStore.get("streamName", function (streamOne) {
    redisStore.get("streamName", function (streamTwo) {
        streamOne.on("data", function (data) {
            assert.equal(data, "foo")
            streamOne.end()
            streamTwo.end()
        })
        streamTwo.write("foo")
    })
})