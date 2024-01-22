module.exports = {
  rabbitMQ: {
    url: "amqp://rabbitmq", // for docker // TODO:: use it from .env
    // url: "amqp://rabbitmq:5672", // for docker
    // url: "amqp://localhost", // for non docker
    exchangeName: "logExchange",
  },
};
