import asyncHandler from 'express-async-handler'
import Post from '../models/postModel.js'

// @desc    Fetch all posts
// @route   GET /api/posts
// @access  Public
const getPosts = asyncHandler(async (req, res) => {
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

    const count = await Post.countDocuments({ ...keyword })
    const posts = await Post.find({ ...keyword })
        .limit(pageSize)
        .skip(pageSize * (page - 1))

    res.json({ posts, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch single post
// @route   GET /api/posts/:id
// @access  Public
const getPostById = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id)

    if (post) {
        res.json(post)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc    Delete a posts
// @route   DELETE /api/posts/:id
// @access  Private/Admin
const deletePost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id)

    if (post) {
        await post.remove()
        res.json({ message: 'Pengumuman dihapus' })
    } else {
        res.status(404)
        throw new Error('Pengumuman tidak ditemukan')
    }
})

// @desc    Create a post
// @route   POST /api/post
// @access  Private/Admin
const createPost = asyncHandler(async (req, res) => {
    const post = new Post({
        judul: req.body.judul,
        isi: req.body.isi,
        pembuat: req.body.pembuat,
        lampiran: req.body.lampiran,
        gambar: req.body.gambar,
        user: req.user._id,
    })

    const createdPost = await post.save()
    res.status(201).json({ message: "Pengumuman berhasi dibuat !", createdPost })
})

// @desc    Update a posts
// @route   PUT /api/posts/:id
// @access  Private/Admin
const updatePost = asyncHandler(async (req, res) => {
    const {
        judul,
        isi,
        penyunting,
        gambar,
    } = req.body

    const post = await Post.findById(req.params.id)

    if (post) {
        post.judul = judul
        post.isi = isi
        post.penyunting = penyunting
        post.gambar = gambar

        const updatedPost = await post.save()
        res.json({ message: "Pengumuman berhasi diubah !", updatedPost })
    } else {
        res.status(404)
        throw new Error('Pengumuman tidak ditemukan')
    }
})

// @desc    Create new comment
// @route   POST /api/posts/:id/komentar
// @access  Private
const createComment = asyncHandler(async (req, res) => {

    const post = await Post.findById(req.params.id)

    if (post) {

        const comment = {
            nama_user: req.body.nama,
            statement: req.body.komentar,
            user: req.user._id,
        }

        post.komentar.push(comment)

        await post.save()
        res.status(201).json({ message: 'Komentar ditambahkan', comment })
    } else {
        res.status(404)
        throw new Error('Pengumuman tidak di temukan')
    }
})

export {
    getPosts,
    getPostById,
    deletePost,
    createPost,
    updatePost,
    createComment,
}
