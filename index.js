var Redis = require("redis-stream")
    , mapSync = require("event-stream").mapSync
    , duplex = require("duplexer")
    , partial = require("ap").partial

module.exports = createRedisStore

function createRedisStore(port, host, namespace) {
    var client = new Redis(port, host)

    return {
        get: partial(createRedisStream, client, namespace)
    }
}

function createRedisStream(client, namespace, streamName, callback) {
    streamName = namespace + ":" + streamName
    var publish = client.stream("publish", streamName)
        , subscribe = client.stream("subscribe")
        , subscribeStripper = mapSync(stripJunk)
        , connected = false
        , stream = duplex(publish, subscribeStripper)
        , count = 0

    subscribe.pipe(subscribeStripper)
    
    subscribe.write(streamName)

    publish.on("end", end)

    return stream

    function stripJunk(data) {
        count++
        if (count !== 3) {
            return
        }
        count = 0
        data = data.toString()
        if (data === "1") {
            connected = true
            stream.emit("open")
            stream.open = true
            return
        }
        if (!connected) {
            return
        }
        return data
    }

    function end() {
        publish.end()
        subscribe.end()
    }
}