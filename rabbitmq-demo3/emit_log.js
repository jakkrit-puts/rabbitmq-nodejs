const amqp = require('amqplib')

async function connect() {
    try {

        let exchange = 'logs';
        let msg = process.argv.slice(2).join(' ') || 'Hello World!';

        const connection = await amqp.connect('amqp://localhost:5672');
        const channel = await connection.createChannel();
        const result = await channel.assertExchange(exchange, 'fanout', {
            durable: false
        });

        channel.publish(exchange, '', Buffer.from(msg));
        console.log(" [x] Sent %s", msg);

        setTimeout(function () {
            connection.close();
            process.exit(0);
        }, 100);

    } catch (error) {
        console.error(error);
    }
}


connect();