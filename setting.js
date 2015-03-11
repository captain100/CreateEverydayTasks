module.exports = {
    cookieSecret: 'wedateiosgamedev',
    db: 'wedate',
    mongodbUrl: 'mongodb://10.0.0.51:10002,10.0.0.52:10001,10.0.0.53:10003/wedate',
    rabbitMQHost: '10.0.0.49',
    rabbitMQPort: 5672,
    rabbitMQUser:'wedatemq',
    rabbitMQPassword:'muse0530',
    maxAge: 30*24*60*60*1000,
    singleServer : {
        "db" : "wedate",
        "collection" : "sessions",
        "host" : "localhost",
        "port" : 27017
    },
    replicaSet:{
        "collection" : "sessions",
        "stringify": false,
        "db": {
            "name" : "wedate",
            "servers" : [
                {
                    "host" : "10.0.0.51",
                    "port" : 10002,
                    "options" : {
                        "autoReconnect" : false,
                        "poolSize" : 200,
                        "socketOptions" : {
                            "timeout" : 0,
                            "noDelay" : true,
                            "keepAlive" : 1,
                            "encoding" : "utf8"
                        }
                    }
                },
                {
                    "host" : "10.0.0.52",
                    "port" : 10001,
                    "options" : {
                        "autoReconnect" : false,
                        "poolSize" : 200,
                        "socketOptions" : {
                            "timeout" : 0,
                            "noDelay" : true,
                            "keepAlive" : 1,
                            "encoding" : "utf8"
                        }
                    }
                },
                {
                    "host" : "10.0.0.53",
                    "port" : 10003,
                    "options" : {
                        "autoReconnect" : false,
                        "poolSize" : 200,
                        "socketOptions" : {
                            "timeout" : 0,
                            "noDelay" : true,
                            "keepAlive" : 1,
                            "encoding" : "utf8"
                        }
                    }
                }
            ]
        }
    }


};