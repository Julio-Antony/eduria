import mongoose from 'mongoose';

const KategoriSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  idNumber: {
    type: String,
    unique: true,
    sparse: true, // boleh kosong, tapi harus unik jika diisi
  },
  description: {
    type: String,
    default: '',
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Kategori', // self-reference
    default: null, // root category jika null
  },
  visibility: {
    type: Boolean,
    default: true, // true = terlihat, false = disembunyikan
  },
}, {
  timestamps: true, // createdAt, updatedAt
});

const Kategori = mongoose.model('Kategori', KategoriSchema);
export default Kategori;

