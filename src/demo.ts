import MessageBroker from './utils/rabbit';

let broker: MessageBroker;

async function initBroker(): Promise<MessageBroker> {
  if (!broker) {
    broker = new MessageBroker('amqp://infam:rabbitmq@127.0.0.1:5672'); // ampqLink
    await broker.init();
  }

  return broker;
}

initBroker();
