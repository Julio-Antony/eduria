import mongoose from 'mongoose'

const siswaSchema = mongoose.Schema({
    nama_siswa: String,
    id: String
})

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
    jml_siswa: Number,
    daftar_siswa: [siswaSchema]
}, {
    timestamps: true,
})

const Kelas = mongoose.model('Kelas', kelasSchema)

export default Kelas