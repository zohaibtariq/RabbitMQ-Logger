const amqp = require("amqplib");

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function connectWithRetry(url, maxRetries = 5, retryInterval = 5000) {
  let retries = 0;
  let connection = null;

  while (retries < maxRetries) {
    try {
      connection = await amqp.connect(url);
      console.log('LogInfoMS Connected successfully...')
      break;
    } catch (error) {
      console.error(`Failed to connect to RabbitMQ. Retrying in ${retryInterval / 1000} seconds...`);
      await sleep(retryInterval);
      retries++;
    }
  }

  if (!connection) {
    console.error(`Could not connect to RabbitMQ after ${maxRetries} retries.`);
    process.exit(1); // Exit the application or handle the error appropriately.
  }

  return connection;
}

//step 1 : Connect to the rabbitmq server
//step 2 : Create a new channel
//step 3 : Create the exchange
//step 4 : Create the queue
//step 5 : Bind the queue to the exchange
//step 6 : Consume messages from the queue

async function consumeMessages() {
  const rabbitMQUrl = "amqp://rabbitmq"; // for docker // TODO:: use it from .env
  // const rabbitMQUrl = "amqp://rabbitmq:5672"; // for docker
  // const rabbitMQUrl = "amqp://localhost"; // for non-docker

  const connection = await connectWithRetry(rabbitMQUrl);
  const channel = await connection.createChannel();

  await channel.assertExchange("logExchange", "direct");

  const q = await channel.assertQueue("InfoQueue");

  await channel.bindQueue(q.queue, "logExchange", "Info");

  channel.consume(q.queue, (msg) => {
    const data = JSON.parse(msg.content);
    console.log(data);
    channel.ack(msg);
  });
}

consumeMessages();
