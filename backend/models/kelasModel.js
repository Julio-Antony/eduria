import mongoose from 'mongoose'

const kelasSchema = mongoose.Schema({
    nama_kelas: {
        type: String,
        required: true
    },
    wali_kelas: {
        type: String,
        required: true
    },
    jurusan: String,
    jml_siswa: Number
}, {
    timestamps: true,
})

const Kelas = mongoose.model('Kelas', kelasSchema)

export default Kelas