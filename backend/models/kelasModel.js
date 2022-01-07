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
    id_walas: String,
    wali_kelas: {
        type: String,
        required: true
    },
    cover: String,
    jurusan: String,
    jml_siswa: Number,
    daftar_siswa: [siswaSchema]
}, {
    timestamps: true,
})

const Kelas = mongoose.model('Kelas', kelasSchema)

export default Kelas