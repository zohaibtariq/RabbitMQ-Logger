const amqp = require("amqplib");

const RETRY_INTERVAL = 5000; // 5 seconds
const MAX_RETRIES = 10;

async function connectToRabbitMQ() {
  let connection;
  let retries = 0;

  while (!connection && retries < MAX_RETRIES) {
    try {
      connection = await amqp.connect("amqp://rabbitmq"); // TODO:: use it from .env
      console.log('LogWarningAndErrorMS Connected successfully...')
    } catch (error) {
      console.error(`Failed to connect to RabbitMQ. Retrying in ${RETRY_INTERVAL / 1000} seconds...`);
      await new Promise((resolve) => setTimeout(resolve, RETRY_INTERVAL));
      retries++;
    }
  }

  if (!connection) {
    console.error(`Could not connect to RabbitMQ after ${MAX_RETRIES} retries.`);
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
  const connection = await connectToRabbitMQ();
  const channel = await connection.createChannel();

  await channel.assertExchange("logExchange", "direct");

  const q = await channel.assertQueue("WarningAndErrorsQueue");

  await channel.bindQueue(q.queue, "logExchange", "Warning");
  await channel.bindQueue(q.queue, "logExchange", "Error");

  channel.consume(q.queue, (msg) => {
    const data = JSON.parse(msg.content);
    console.log(data);
    channel.ack(msg);
  });
}

consumeMessages();
