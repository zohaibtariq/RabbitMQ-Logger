First start RabbitMQ docker container

```
yarn start
```

```
POST /sendLog
{
    "logType": "Info",
    "message": "Info Msg send from POST api sendLog"
}
```

```
POST /sendLog
{
    "logType": "Warning",
    "message": "Warning Msg send from POST api sendLog"
}
```

```
POST /sendLog
{
    "logType": "Error",
    "message": "Error Msg send from POST api sendLog"
}
```