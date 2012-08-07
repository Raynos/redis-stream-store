var RedisStore = require("./")
    , redisStore = RedisStore(6379, "localhost")
    , assert = require("assert")

redisStore.get("streamName", function (err, streamOne) {
    redisStore.get("streamName", function (err, streamTwo) {
        streamOne.stream.on("data", function (data) {
            assert.equal(data, "foo")
            streamOne.stream.end()
            streamTwo.stream.end()
        })
        streamTwo.stream.write("foo")
    })
})