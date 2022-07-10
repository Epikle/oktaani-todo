import mongoose from 'mongoose';

const shareSchema = new mongoose.Schema({
  shareId: { type: String },
  title: { type: String },
  color: { type: String },
  todos: { type: Array },
  created: { type: Date, default: new Date() },
});

export default mongoose.model('Share', shareSchema);
