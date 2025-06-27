import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  listCategories,
  updateCategory,
  deleteCategory,
  createCategory,
} from '../redux/actions/CategoryAction'
import swal from 'sweetalert'

const Category = () => {
  const dispatch = useDispatch()
  const { categories } = useSelector((state) => state.categoryList)

  const [showModal, setShowModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState({
    _id: '',
    name: '',
    description: '',
    idNumber: '',
    visibility: true,
    parent: '',
  })

  useEffect(() => {
    dispatch(listCategories())
  }, [dispatch])

  const refreshData = () => {
    dispatch(listCategories())
  }

  const openModal = (category = null) => {
    if (category) {
      // Edit
      setSelectedCategory({
        _id: category._id,
        name: category.name,
        description: category.description,
        idNumber: category.idNumber,
        visibility: category.visibility,
        parent: category.parent?._id || '',
      })
    } else {
      // Tambah
      setSelectedCategory({
        _id: '',
        name: '',
        description: '',
        idNumber: '',
        visibility: true,
        parent: '',
      })
    }
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedCategory({
      _id: '',
      name: '',
      description: '',
      idNumber: '',
      visibility: true,
      parent: '',
    })
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setSelectedCategory({
      ...selectedCategory,
      [name]: type === 'checkbox' ? checked : value === '' ? null : value,
    })
  }

  const handleSave = async () => {
    if (selectedCategory._id) {
      await dispatch(updateCategory(selectedCategory._id, selectedCategory))
      swal('Sukses', 'Kategori berhasil diperbarui', 'success')
    } else {
      await dispatch(createCategory(selectedCategory))
      swal('Sukses', 'Kategori berhasil ditambahkan', 'success')
    }
    refreshData()
    closeModal()
  }

  const handleDelete = async (id) => {
    const confirm = await swal({
      title: 'Yakin hapus kategori ini?',
      icon: 'warning',
      buttons: ['Batal', 'Hapus'],
      dangerMode: true,
    })

    if (confirm) {
      await dispatch(deleteCategory(id))
      swal('Dihapus!', 'Kategori berhasil dihapus', 'success')
      refreshData()
    }
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Kategori Kursus</h3>
        <button className="btn btn-primary" onClick={() => openModal()}>
          Tambah Kategori
        </button>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Deskripsi</th>
            <th>ID Number</th>
            <th>Parent</th>
            <th>Visibility</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat, idx) => (
            <tr key={cat._id}>
              <td>{idx + 1}</td>
              <td>{cat.name}</td>
              <td>{cat.description}</td>
              <td>{cat.idNumber}</td>
              <td>{cat.parent?.name || '-'}</td>
              <td>{cat.visibility ? 'Ya' : 'Tidak'}</td>
              <td style={{width:'100%', display:'flex', justifyContent:"space-around"}}>
                <button className="btn btn-warning btn-sm me-2" onClick={() => openModal(cat)}>
                  Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(cat._id)}>
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="modal d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {selectedCategory._id ? 'Edit Kategori' : 'Tambah Kategori'}
                </h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Nama</label>
                  <input
                    type="text"
                    name="name"
                    value={selectedCategory.name}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Deskripsi</label>
                  <textarea
                    name="description"
                    value={selectedCategory.description}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">ID Number</label>
                  <input
                    type="text"
                    name="idNumber"
                    value={selectedCategory.idNumber}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Parent Kategori</label>
                  <select
                    name="parent"
                    value={selectedCategory.parent || ''}
                    onChange={handleChange}
                    className="form-control"
                  >
                    <option value="">-- Tidak Ada --</option>
                    {categories
                      .filter((cat) => {
                        const isSelf = cat._id === selectedCategory._id
                        const isParent =
                          selectedCategory.parent && cat._id === selectedCategory.parent
                        return selectedCategory.parent ? !isSelf && !isParent : !isSelf
                      })
                      .map((cat) => (
                        <option key={cat._id} value={cat._id}>
                          {cat.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="visibility"
                    checked={selectedCategory.visibility}
                    onChange={handleChange}
                    id="visibilityCheck"
                  />
                  <label className="form-check-label" htmlFor="visibilityCheck">
                    Tampilkan kategori ini?
                  </label>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeModal}>
                  Batal
                </button>
                <button className="btn btn-primary" onClick={handleSave}>
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Category
