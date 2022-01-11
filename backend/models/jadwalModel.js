import mongoose from 'mongoose'

const jadwalSchema = mongoose.Schema({
    kelas: {
        type: String,
        required: true
    },
    hari: String,
    waktu: String,
    mapel: String,
    id_mapel: String
},
    {
        timestamps: true
    })

const Jadwal = mongoose.model('Jadwal', jadwalSchema)

export default Jadwal