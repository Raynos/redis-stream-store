var Redis = require("redis-stream")
    , es = require("event-stream")
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
        , subscribeStripper = es.mapSync(stripJunk)
        , connected = false
        , stream = es.duplex(publish, subscribeStripper)

    subscribe.pipe(subscribeStripper)
    
    subscribe.write(streamName)

    publish.on("end", end)

    function stripJunk(data) {
        data = data.toString()
        if (data === "1") {
            connected = true
            callback(stream)
            return
        }
        if (!connected) {
            return
        }
        if (data === "message") {
            return
        }
        if (data === streamName) {
            return
        }
        return data
    }

    function end() {
        publish.end()
        subscribe.end()
    }
}