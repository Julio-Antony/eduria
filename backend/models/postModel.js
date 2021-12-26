import mongoose from 'mongoose'

const komentar = mongoose.Schema({
    nama_user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    },
    statement: String,
})

const model = mongoose.Schema({
    judul: {
        type: String,
        required: true
    },
    isi: {
        type: String,
        required: true
    },
    pembuat: {
        type: String,
        required: true
    },
    penyunting: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    },
    gambar: String,
    suka: Number,
    komentar: [komentar]
}, {
    timestamps: true
}
);

const Post = mongoose.model('Post', model)

export default Post