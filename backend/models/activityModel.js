import mongoose from 'mongoose'

const activitySchema = mongoose.Schema({
    nama_aktivitas: {
        type: String,
        required: true
    },
    nama_pengguna: {
        type: String,
        required: true
    },
    status: String
}, {
    timestamps: true
})

const Aktivitas = mongoose.model('Aktivitas', activitySchema)

export default Aktivitas