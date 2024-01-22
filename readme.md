#### Clone the repo
```
git clone https://github.com/zohaibtariq/RabbitMQ-Logger.git RabbitMQ-Logger
```

#### change dir to cloned repo
```
cd RabbitMQ-Logger
```

#### this will build containers
```
docker compose build
```

#### this will run containers in detached mode
```
docker compose up -d
```

#### this will list all active runing containers
```
docker ps
```

#### this will list all container regardless of active state
```
docker ps -a
```

#### this will show logs of rabbitmq container
```
docker logs -f rabbitmq
```

#### this will show logs of loggerms container
```
docker logs -f loggerms
```

#### this will show logs of loginfoms container
```
docker logs -f loginfoms
```

#### this will show logs of logwarninganderrorms container
```
docker logs -f logwarninganderrorms
```

#### postman collection file link
```
[POSTMAN COLLECTION FILE](https://github.com/zohaibtariq/RabbitMQ-Logger/blob/main/RabbitMQ-Logger.postman_collection.json)
```

#### this log should appear in only loginfoms container
```
POST http://0.0.0.0:3000/sendLog
{
    "logType": "Info",
    "message": "Info Msg send from POST api sendLog"
}
```
#### this log should appear in only logwarninganderrorms container
```
POST http://0.0.0.0:3000/sendLog
{
    "logType": "Warning",
    "message": "Warning Msg send from POST api sendLog"
}
```

#### this log should appear in only logwarninganderrorms container
```
POST http://0.0.0.0:3000/sendLog
{
    "logType": "Error",
    "message": "Error Msg send from POST api sendLog"
}
```

#### rabbitmq management dashboard
```
GET http://0.0.0.0:15672

username: guest
password: guest
```