import mongoose from 'mongoose'

const onlineSchema = mongoose.Schema({
    jumlah: Number,
    tanggal: Date
})

const Online = mongoose.model('Online', onlineSchema)

export default Online