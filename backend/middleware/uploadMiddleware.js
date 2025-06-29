import multer from 'multer'
import path from 'path'
import fs from 'fs'

// Tentukan folder tujuan
const uploadDir = path.join('uploads', 'modul-files')

// Cek dan buat folder jika belum ada
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadDir)
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  },
})

export const upload = multer({ storage })
