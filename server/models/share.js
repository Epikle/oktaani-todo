import mongoose from 'mongoose';

const shareSchema = new mongoose.Schema({
  id: { type: String },
  shareId: { type: String },
  title: { type: String },
  color: { type: String },
  todos: { type: Array },
  timestamp: { type: Number },
});

export default mongoose.model('Share', shareSchema);
