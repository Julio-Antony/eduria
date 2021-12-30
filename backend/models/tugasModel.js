import mongoose from 'mongoose'

const pesertaSchema = mongoose.Schema({
    nama: String,
    nilai: String
})

const tugasSchema = mongoose.Schema({
    nama_tugas: String,
    mata_pelajaran: String,
    peserta: [pesertaSchema]
})

const Tugas = mongoose.model('Tugas', tugasSchema)

export default Tugas