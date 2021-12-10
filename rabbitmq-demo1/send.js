const amqp = require('amqplib')

async function connect() {
    try {

        let queue = 'hello';
        let msg = 'Hello world Prayut';

        const connection = await amqp.connect('amqp://localhost:5672');
        const channel = await connection.createChannel();
        const result = await channel.assertQueue(queue, { durable: false });
        channel.sendToQueue(queue, Buffer.from(msg))
        
        console.log(" [x] Sent %s", msg);

        setTimeout(function () {
            connection.close();
            process.exit(0)
        }, 1000);

    } catch (error) {
        console.error(error);
    }
}


connect();

