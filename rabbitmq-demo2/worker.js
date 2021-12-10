const amqp = require('amqplib')

async function connect() {
    try {

        let queue = 'task_queue';

        const connection = await amqp.connect('amqp://localhost:5672');
        const channel = await connection.createChannel();
        const result = await channel.assertQueue(queue, { durable: true });

        channel.consume(queue, function(msg) {

            let secs = msg.content.toString().split('.').length - 1;
          
            console.log(" [x] Received %s", msg.content.toString());
            setTimeout(function() {
              console.log(" [x] Done");
            }, secs * 1000);
          }, {
            // automatic acknowledgment mode,
            // see ../confirms.html for details
            noAck: true
          });

    } catch (error) {
        console.error(error);
    }
}


connect();