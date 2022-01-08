import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'

const mapelSchema = mongoose.Schema({
  mata_pelajaran: String
})

const kelasSchema = mongoose.Schema({
  kelas: String
})

const userSchema = mongoose.Schema(
  {
    nama: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
      default: false,
    },
    foto: String,
    isVerified: Boolean,
    identitas: {
      no_induk: String,
      kelas: [kelasSchema],
      jenis_kelamin: String,
      agama: String,
      tempat_lahir: String,
      tanggal_lahir: Date,
      no_telepon: String,
      alamat: String,
      mata_pelajaran_diampu: [mapelSchema]
    }
  },
  {
    timestamps: true,
  }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User
