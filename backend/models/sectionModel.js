import mongoose from 'mongoose'

const moduleSchema = mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['video', 'file', 'quiz', 'text', 'link'], required: true },
  content: { type: String }, // bisa berupa URL, teks, atau ID quiz
})

const sectionSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  modules: [moduleSchema],
})

export default sectionSchema