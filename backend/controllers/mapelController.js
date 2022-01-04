import asyncHandler from 'express-async-handler'
import Mapel from '../models/mapelModel.js'

// @desc    Fetch all subject
// @route   GET /api/subject
// @access  Private/Admin

const getAllSubject = asyncHandler(async (req, res) => {
    const pageSize = 10
    const page = Number(req.query.pageNumber) || 1

    const keyword = req.query.keyword
        ? {
            name: {
                $regex: req.query.keyword,
                $options: 'i',
            },
        }
        : {}

    const count = await Mapel.countDocuments({ ...keyword })
    const subjectCount = await Mapel.count({})
    const subject = await Mapel.find({ ...keyword })
        .limit(pageSize)
        .skip(pageSize * (page - 1))

    res.json({ message: "ditemukan " + subjectCount + " Mata Pelajaran", subject, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch single subject
// @route   GET /api/subject/:id
// @access  Public
const getSubjectById = asyncHandler(async (req, res) => {
    const subject = await Mapel.findById(req.params.id)

    if (subject) {
        res.json(subject)
    } else {
        res.status(404)
        throw new Error('Mata pelajaran tidak ditemukan')
    }
})

// @desc    Create a subject
// @route   POST /api/subject
// @access  Private/Admin

const createSubject = asyncHandler(async (req, res) => {
    const subject = new Mapel({
        nama_mapel: req.body.nama_mapel,
        nama_guru: req.body.nama_guru,
        cover: req.body.cover,
        user: req.user._id,
    })

    const createdSubject = await subject.save()
    res.status(201).json({ message: "Mata pelajatan berhasi dibuat !", createdSubject })
})

// @desc    Update a Subject
// @route   PUT /api/subject/:id
// @access  Private/Admin

const updateSubject = asyncHandler(async (req, res) => {
    const {
        nama_mapel,
        nama_guru,
        attachment,
        penyunting,
    } = req.body

    const subject = await Mapel.findById(req.params.id)

    if (subject) {
        subject.nama_mapel = nama_mapel
        subject.nama_guru = nama_guru
        subject.attachment = attachment
        subject.penyunting = penyunting

        const updatedSubject = await subject.save()
        res.json({ message: "Mata Pelajaran berhasil diubah !", updatedSubject })
    } else {
        res.status(404)
        throw new Error('Mata pelajaran tidak ditemukan')
    }
})

// @desc    Add a chapter to subject
// @route   POST /api/subject/:id/chapter
// @access  Private
const addChapter = asyncHandler(async (req, res) => {

    const subject = await Mapel.findById(req.params.id)

    if (subject) {

        const chapter = {
            nama_materi: req.body.nama_materi,
            attachment: req.body.attachment,
            deskripsi: req.body.deskripsi,
            pertemuan_ke: req.body.pertemuan_ke,
            tanggal: req.body.tanggal
        }

        subject.materi.push(chapter)

        await subject.save()
        res.status(201).json({ message: 'Materi ditambahkan', chapter })
    } else {
        res.status(404)
        throw new Error('Mata Pelajaran tidak ditemukan')
    }
})

// @desc    Delete a subject
// @route   DELETE /api/subject/:id
// @access  Private/Admin
const deleteSubject = asyncHandler(async (req, res) => {
    const subject = await Mapel.findById(req.params.id)

    if (subject) {
        await subject.remove()
        res.json({ message: 'Mata pelajaran dihapus' })
    } else {
        res.status(404)
        throw new Error('Mata pelajaran tidak ditemukan')
    }
})

export { getAllSubject, getSubjectById, createSubject, addChapter, updateSubject, deleteSubject }