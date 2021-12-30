import mongoose from 'mongoose'

const jamSchema = mongoose.Schema({
    waktu: String,
    mapel: String
})

const jadwalSchema = mongoose.Schema({
    kelas: {
        type: String,
        required: true
    },
    hari: String,
    sesi: [jamSchema]
})

const Jadwal = mongoose.model('Jadwal', jadwalSchema)

export default Jadwal