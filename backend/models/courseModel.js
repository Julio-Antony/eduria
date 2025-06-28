import mongoose from "mongoose"

const courseSchema = new mongoose.Schema({
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Kategori' },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  thumbnail: {type: String, required: true},
  fullname: { type: String, required: true },
  shortname: { type: String, required: true },
  description: { type: String },
  summary: { type: String },
  price: { type: Number, default: 0 }, // For paid courses
  visible: { type: Boolean, default: true },
  startDate: { type: Date },
  endDate: { type: Date },
  timeCreated: { type: Date, default: Date.now }
})

export default mongoose.model('Course', courseSchema)
