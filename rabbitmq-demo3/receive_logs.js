const amqp = require('amqplib')

async function connect() {
    try {

        let exchange = 'logs';
        let msg = process.argv.slice(2).join(' ') || 'Hello World!';

        const connection = await amqp.connect('amqp://localhost:5672');
        const channel = await connection.createChannel();
        const resultExc = await channel.assertExchange(exchange, 'fanout', { durable: false });
        const result = await channel.assertQueue('', { exclusive: true });

        console.log(" [*] Waiting for messages in %s.", result.queue);
        channel.bindQueue(result.queue, exchange, '');

        channel.consume(result.queue, function (msg) {
            if (msg.content) {
                console.log(" [x] %s", msg.content.toString());
            }
        }, {
            noAck: true
        });

    } catch (error) {
        console.error(error);
    }
}


connect();