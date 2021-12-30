import mongoose from 'mongoose'

const pesertaSchema = mongoose.Schema({
    nama: String,
    nilai: String
})

const kuisSchema = mongoose.Schema({
    nama_kuis: String,
    mata_pelajaran: String,
    peserta: [pesertaSchema]
})

const Kuis = mongoose.model('Kuis', kuisSchema)

export default Kuis