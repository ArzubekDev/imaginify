import { model, models, Schema } from 'mongoose';

const TransactonSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  stripedId: { type: String, required: true, unique: true },
  amount: { type: Number, required: true },
  plan: { type: String },
  credits: { type: Number },
  buyer: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Transaction = models?.Transaction || model('Transaction', TransactonSchema);

export default Transaction;
