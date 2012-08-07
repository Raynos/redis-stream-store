var RedisStore = require("./")
    , redisStore = RedisStore(6379, "localhost")
    , assert = require("assert")

redisStore.get("streamName", function (err, streamOne) {
    redisStore.get("streamName", function (err, streamTwo) {
        streamOne.on("data", function (data) {
            assert.equal(data, "foo")
            streamOne.end()
            streamTwo.end()
        })
        streamTwo.write("foo")
    })
})