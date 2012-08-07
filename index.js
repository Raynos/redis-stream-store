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
    var writableStream = client.stream("publish", streamName)
        , readableStream = client.stream("subscribe")
    
    readableStream.write(streamName)

    callback(es.duplex(writableStream, readableStream))
}