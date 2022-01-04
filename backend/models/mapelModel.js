import mongoose from 'mongoose'

const attendanceSchema = mongoose.Schema({
    nama_siswa: String
})

const balasanSchema = mongoose.Schema({
    nama_user: String,
    statement: String
})

const diskusiSchema = mongoose.Schema({
    nama_user: String,
    komentar: String,
    balasan: [balasanSchema]
})

const materiSchema = mongoose.Schema({
    attachment: String,
    attendance: [attendanceSchema],
    deskripsi: String,
    diskusi: [diskusiSchema],
    nama_materi: String,
    pertemuan_ke: Number,
    tanggal: String,
})

const mapel = mongoose.Schema({
    nama_mapel: {
        type: String,
        required: true
    },
    nama_guru: {
        type: String,
        required: true
    },
    cover: Buffer,
    materi: [materiSchema],
    penyunting: String
}, {
    timestamps: true,
})

const Mapel = mongoose.model('Mapel', mapel)

export default Mapel