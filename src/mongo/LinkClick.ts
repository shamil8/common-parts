import { Schema, model, } from 'mongoose';

export interface ILinkClick {
    type: string,
    url: string,
    ip: string,
    socialType?: string,
    userId?: string,
    viewerId?: string,
    inviteCode?: string,
}

const schema = new Schema({
  type: String,
  socialType: String,
  userId: String,
  viewerId: String,
  inviteCode: String,
  url: String,
  ip: String,
  createAt: {
    type: Date,
    default: Date.now,
  },
});

export default model('LinkClick', schema);
