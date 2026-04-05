import mongoose from 'mongoose'

const skillSchema = new mongoose.Schema({
  category: { type: String, required: true },
  items: [String],
})

export default mongoose.model('Skill', skillSchema)