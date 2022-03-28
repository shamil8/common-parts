import { connect, Channel, Connection, } from 'amqplib';

export type THandler = (msg: unknown, ack?: boolean) => Promise<void>;

interface IStringMap { [key: string]: THandler[], }

/** Broker for async messaging */
export default class MessageBroker {
  protected amqpUrl: string;

  protected queues: IStringMap;

  protected connection: Connection;

  protected channel: Channel;

  /** * Trigger init connection method */
  constructor(amqpUrl: string) {
    this.amqpUrl = amqpUrl;
    this.queues = {};
  }

  /** * Initialize connection to rabbitMQ */
  async init(): Promise<MessageBroker> {
    this.connection = await connect(this.amqpUrl);
    this.channel = await this.connection.createChannel();

    return this;
  }

  /** * Send message to queue */
  async send(queue: string, msg: unknown): Promise<void> {
    if (!this.connection) {
      await this.init();
    }

    await this.assertQueue(queue);

    const data = Buffer.from(JSON.stringify(msg));

    this.channel.sendToQueue(queue, data, { persistent: true, });
  }

  async subscribe(queue: string, handler: THandler): Promise<() => void> {
    if (!this.connection) {
      await this.init();
    }

    if (this.queues[queue]) {
      !this.queues[queue].includes(handler) && this.queues[queue].push(handler);

      return () => this.unsubscribe(queue, handler);
    }

    await this.assertQueue(queue);

    this.queues[queue] = [handler];

    await this.channel.consume(queue, (msg) => {
      msg && this.channel.ack(msg);

      this.queues[queue].forEach((h) => h(msg && JSON.parse(msg.content.toString())));
    }, { noAck: false, });

    return () => this.unsubscribe(queue, handler);
  }

  unsubscribe(queue: string, handler: THandler): void {
    const idx = this.queues[queue].indexOf(handler);

    if (idx > -1) {
      this.queues[queue].splice(idx, 1);
    }
  }

  async assertQueue(queue: string): Promise<void> {
    await this.channel.assertQueue(queue, { autoDelete: false, durable: true, });
  }
}
