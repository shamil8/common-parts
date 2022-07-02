import { Mongoose, connect, } from 'mongoose';
import LinkClick from './LinkClick';

export default class MongooseCon {
  protected mongoLink: string;

  constructor(mongoLink: string) {
    this.mongoLink = mongoLink;
  }

  public async init(): Promise<Mongoose | void> {
    return await connect(this.mongoLink);
  }
}

export {
  LinkClick,
};
