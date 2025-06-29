import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createCourse, deleteCourse, getAllCourses, updateCourse } from '../redux/actions/CourseAction'
import { listCategories } from '../redux/actions/CategoryAction'
import Swal from 'sweetalert'
import CourseContentForm from '../components/form/CourseContentForm'
import { getAllTeachers } from '../redux/actions/UserAction'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

const Course = () => {
    const dispatch = useDispatch()

    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')
    const [sortOption, setSortOption] = useState('')
    const [editMode, setEditMode] = useState(false)
    const [editingCourseId, setEditingCourseId] = useState(null)

    const [showModal, setShowModal] = useState(false)
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        fullname: '',
        shortname: '',
        description: '',
        price: '',
        category: '',
        teacher: '',
        thumbnail: '',
        visibility: true,
    })

    const [courseContent, setCourseContent] = useState([
        {
            title: '',
            description: '',
            modules: []
        }
    ])

    const { loading, courses, error } = useSelector((state) => state.course)
    const { categories } = useSelector((state) => state.categoryList)
    const { teachers } = useSelector((state) => state.user)
    const userInfo = localStorage.getItem('level')

    useEffect(() => {
        dispatch(getAllCourses())
        dispatch(listCategories())
        dispatch(getAllTeachers())
    }, [dispatch])

    useEffect(() => {
        if (error) {
            Swal('Gagal', error, 'error')
        }
    }, [error])

    const filteredCourses = courses
        .filter((course) =>
            (course.fullname || '').toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter((course) =>
            selectedCategory ? course.category?._id === selectedCategory : true
        )
        .sort((a, b) => {
            if (sortOption === 'termurah') return a.price - b.price
            if (sortOption === 'terbaru')
                return new Date(b.createdAt) - new Date(a.createdAt)
            if (sortOption === 'populer') return (b.enrollments || 0) - (a.enrollments || 0)
            return 0
        })

    const handleNext = () => {
        if (step < 2) setStep(step + 1)
    }

    const handlePrev = () => {
        if (step > 1) setStep(step - 1)
    }

    const handleEdit = (course) => {
        setEditMode(true)
        setEditingCourseId(course._id)
        setFormData({
            fullname: course.fullname,
            shortname: course.shortname,
            description: course.description,
            price: course.price,
            category: course.category?._id || '',
            teacher: course.teacher?._id || '',
            visibility: course.visible,
            thumbnail: course.thumbnail,
        })
        setCourseContent(course.sections || [])
        setShowModal(true)
    }

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        })
    }

    const handleThumbnailUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setFormData((prev) => ({
                    ...prev,
                    thumbnail: reader.result, // base64 image
                }))
            }
            reader.readAsDataURL(file)
        }
    }

    const handleDelete = (id) => {
        Swal({
            title: 'Yakin ingin menghapus kursus ini?',
            text: 'Tindakan ini tidak dapat dibatalkan!',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                dispatch(deleteCourse(id))
            }
        })
    }

    const handleSubmit = async () => {
        // Validasi wajib
        if (!formData.fullname || !formData.shortname) {
            return Swal('Gagal', 'Nama lengkap dan shortname wajib diisi', 'error')
        }

        console.log({'course content' : courseContent})

        const transformedSections = courseContent.map((section) => ({
            ...section,
            modules: section.modules.map((mod) => {
                let content = ''

                if (mod.type === 'video' || mod.type === 'link') {
                    content = mod.content || ''
                } else if (mod.type === 'text') {
                    content = mod.content || ''
                } else if (mod.type === 'file' && mod.file) {
                    content = mod.file // akan diganti oleh backend saat upload file
                }

                return {
                    ...mod,
                    content,
                    url: undefined,
                    text: undefined,
                    file: undefined,
                }
            }),
        }))

        console.log(transformedSections)

        const fullData = {
            ...formData,
            sections: courseContent,
        }

        console.log(fullData)

        try {
            if (editMode) {
                await dispatch(updateCourse(editingCourseId, fullData))
                Swal('Berhasil', 'Kursus berhasil diperbarui', 'success')
            } else {
                await dispatch(createCourse(fullData))
                Swal('Berhasil', 'Kursus berhasil ditambahkan', 'success')
            }

            dispatch(getAllCourses())
            resetFormState()
        } catch (error) {
            Swal('Gagal', 'Terjadi kesalahan saat menyimpan kursus', 'error')
        }
    }

    // 🔁 Reset State Helper
    const resetFormState = () => {
        setShowModal(false)
        setStep(1)
        setEditMode(false)
        setEditingCourseId(null)
        setFormData({
            fullname: '',
            shortname: '',
            description: '',
            price: '',
            category: '',
            visibility: true,
            thumbnail: '',
        })
        setCourseContent([{ title: '', description: '', modules: [] }])
    }



    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3>Katalog Kursus</h3>
                <button className="btn btn-success" onClick={() => setShowModal(true)}>
                    Tambah Kursus
                </button>
            </div>

            {/* FILTERS */}
            <div className="row mb-4">
                <div className="col-md-4">
                    <input
                        type="text"
                        placeholder="Cari kursus..."
                        className="form-control"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="col-md-4">
                    <select
                        className="form-control"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">Semua Kategori</option>
                        {categories.map((cat) => (
                            <option key={cat._id} value={cat._id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="col-md-4">
                    <select
                        className="form-control"
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                    >
                        <option value="">Urutkan</option>
                        <option value="termurah">Harga Termurah</option>
                        <option value="terbaru">Terbaru</option>
                        <option value="populer">Paling Populer</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="row">
                    {filteredCourses.map((course) => (
                        <div key={course._id} className="col-md-4 mb-4">
                            <div className="card h-100">
                                {course.thumbnail && (
                                    <img
                                        src={course.thumbnail}
                                        className="card-img-top"
                                        alt={course.fullname}
                                        style={{ height: '200px', objectFit: 'cover' }}
                                    />
                                )}
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{course.fullname}</h5>
                                    <p className="card-text">{course.description?.slice(0, 100)}...</p>
                                    <p className="card-text">
                                        <small className="text-muted">
                                            Kategori: {course.category?.name || '-'}
                                        </small>
                                    </p>
                                    <p className="card-text fw-bold">
                                        Rp{course.price?.toLocaleString()}
                                    </p>
                                    <Link to={`/course_detail/${course._id}`} className="btn btn-primary mt-auto">
                                        Lihat Detail
                                    </Link>
                                    {(userInfo === 'guru' || userInfo === 'admin') && (
                                        <>
                                            <button
                                                className="btn btn-warning mt-auto"
                                                onClick={() => handleEdit(course)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-danger mt-auto"
                                                onClick={() => handleDelete(course._id)}
                                            >
                                                Hapus
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                    {filteredCourses.length === 0 && (
                        <p className="text-center">Tidak ada kursus yang ditemukan.</p>
                    )}
                </div>
            )}

            {showModal && (
                <div className="modal d-block" tabIndex="-1">
                    <div className="modal-dialog modal-lg modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{editMode ? 'Edit Kursus' : 'Tambah Kursus'} - Langkah {step}</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                {step === 1 && (
                                    <>
                                        <div className="mb-3">
                                            <label className="form-label">Judul Kursus</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="fullname"
                                                value={formData.fullname}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Nama Ringkas</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="shortname"
                                                value={formData.shortname}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Deskripsi</label>
                                            <textarea
                                                className="form-control"
                                                name="description"
                                                value={formData.description}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Harga</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                name="price"
                                                value={formData.price}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Kategori</label>
                                            <select
                                                name="category"
                                                className="form-control"
                                                value={formData.category}
                                                onChange={handleInputChange}
                                            >
                                                <option value="">Pilih Kategori</option>
                                                {categories.map((cat) => (
                                                    <option key={cat._id} value={cat._id}>
                                                        {cat.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Instruktur</label>
                                            <select
                                                name="teacher"
                                                className="form-control"
                                                value={formData.teacher}
                                                onChange={handleInputChange}
                                            >
                                                <option value="">Pilih Instruktur</option>
                                                {teachers.map((tcr) => (
                                                    <option key={tcr._id} value={tcr._id}>
                                                        {tcr.nama}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Thumbnail (gambar)</label>
                                            <input
                                                type="file"
                                                className="form-control"
                                                name="thumbnail"
                                                accept="image/*"
                                                onChange={(e) => handleThumbnailUpload(e)}
                                            />
                                            {formData.thumbnail && (
                                                <img
                                                    src={formData.thumbnail}
                                                    alt="Preview Thumbnail"
                                                    className="img-thumbnail mt-2"
                                                    style={{ maxHeight: '200px' }}
                                                />
                                            )}
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="visibility"
                                                name="visibility"
                                                checked={formData.visibility}
                                                onChange={handleInputChange}
                                            />
                                            <label className="form-check-label" htmlFor="visibility">
                                                Tampilkan kursus
                                            </label>
                                        </div>
                                    </>
                                )}

                                {step === 2 && (
                                    <CourseContentForm
                                        contents={courseContent}
                                        setContents={setCourseContent}
                                    />
                                )}
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => {
                                        setShowModal(false)
                                        setStep(1)
                                        setFormData({
                                            fullname: '',
                                            shortname: '',
                                            description: '',
                                            price: '',
                                            category: '',
                                            visibility: true,
                                            thumbnail: '',
                                            teacher: '',
                                        })
                                        setCourseContent([{ title: '', description: '', modules: [] }])
                                    }}
                                >
                                    Batal
                                </button>
                                {step > 1 && (
                                    <button className="btn btn-secondary" onClick={handlePrev}>
                                        Kembali
                                    </button>
                                )}
                                {step < 2 ? (
                                    <button className="btn btn-primary" onClick={handleNext}>
                                        Selanjutnya
                                    </button>
                                ) : (
                                    <button className="btn btn-success" onClick={handleSubmit}>
                                        Simpan Kursus
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Course
