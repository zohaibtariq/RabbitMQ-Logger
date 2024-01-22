const amqp = require("amqplib");
const config = require("./config");

//step 1 : Connect to the rabbitmq server
//step 2 : Create a new channel on that connection
//step 3 : Create the exchange
//step 4 : Publish the message to the exchange with a routing key

class Producer {
  channel;

  async createChannelWithRetry() {
    const RETRY_INTERVAL = 5000; // 5 seconds
    const MAX_RETRIES = 10;
    let retries = 0;

    while (!this.channel && retries < MAX_RETRIES) {
      try {
        const connection = await amqp.connect(config.rabbitMQ.url);
        this.channel = await connection.createChannel();
        console.log('LoggerMS Producer Connected successfully...')
      } catch (error) {
        console.error(`Failed to create channel. Retrying in ${RETRY_INTERVAL / 1000} seconds...`);
        await new Promise((resolve) => setTimeout(resolve, RETRY_INTERVAL));
        retries++;
      }
    }

    if (!this.channel) {
      console.error(`Could not create channel after ${MAX_RETRIES} retries.`);
      process.exit(1); // Exit the application or handle the error appropriately.
    }
  }

  async publishMessage(routingKey, message) {
    await this.createChannelWithRetry();

    const exchangeName = config.rabbitMQ.exchangeName;
    await this.channel.assertExchange(exchangeName, "direct");

    const logDetails = {
      logType: routingKey,
      message: message,
      dateTime: new Date(),
    };
    await this.channel.publish(
        exchangeName,
        routingKey,
        Buffer.from(JSON.stringify(logDetails))
    );

    console.log(
        `The new ${routingKey} log is sent to exchange ${exchangeName}`
    );
  }
}

module.exports = Producer;
