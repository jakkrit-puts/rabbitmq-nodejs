const amqp = require('amqplib')

async function connect() {
    try {

        let queue = 'hello';

        const connection = await amqp.connect('amqp://localhost:5672');
        const channel = await connection.createChannel();
        const result = await channel.assertQueue(queue, { durable: false });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
        channel.consume(queue, function (msg) {
            console.log(" [x] Received %s", msg.content.toString());
        }, {
            noAck: true
        });


    } catch (error) {
        console.error(error);
    }
}


connect();
