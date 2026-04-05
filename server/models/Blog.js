import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  excerpt: String,
  content: String,
  tags: [String],
  date: { type: Date, default: Date.now },
}, { timestamps: true })

export default mongoose.model('Blog', blogSchema)