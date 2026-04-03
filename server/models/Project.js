import mongoose from 'mongoose';
const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  techStack: [String],
  githubUrl: String,
  liveUrl: String,
  image: String,
  featured: { type: Boolean, default: false },
}, { timestamps: true });
export default mongoose.model('Project', projectSchema);