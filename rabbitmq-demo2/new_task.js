const amqp = require('amqplib')

async function connect() {
    try {

        const queue = 'task_queue';
        const msg = process.argv.slice(2).join(' ') || "Hello World! ...";

        const connection = await amqp.connect('amqp://localhost:5672');
        const channel = await connection.createChannel();
        const result = await channel.assertQueue(queue, { durable: true });
        channel.sendToQueue(queue, Buffer.from(msg), {
            persistent: true
        })

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
