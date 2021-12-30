import mongoose from 'mongoose'

const pesertaSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    },
    nama: String,
    file_tugas: String
})

const tugasSchema = mongoose.Schema({
    nama_tugas: String,
    mata_pelajaran: String,
    kelas: String,
    nama_guru: String,
    peserta: [pesertaSchema]
})

const Tugas = mongoose.model('Tugas', tugasSchema)

export default Tugas