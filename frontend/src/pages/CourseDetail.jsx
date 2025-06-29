import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getCourseById } from '../redux/actions/CourseAction'
import Swal from 'sweetalert'

const getModuleIcon = (type) => {
  const sizeClass = 'fs-2' // Bisa juga fs-3, fs-2 untuk lebih besar
  switch (type) {
    case 'video':
      return <i className={`bx bx-video text-danger ${sizeClass}`} title="Video"></i>
    case 'file':
      return <i className={`bx bx-file text-primary ${sizeClass}`} title="File"></i>
    case 'link':
      return <i className={`bx bx-link-alt text-success ${sizeClass}`} title="Link"></i>
    case 'text':
      return <i className={`bx bx-text text-info ${sizeClass}`} title="Text"></i>
    case 'quiz':
      return <i className={`bx bx-help-circle text-warning ${sizeClass}`} title="Quiz"></i>
    default:
      return <i className={`bx bx-question-mark ${sizeClass}`} title="Unknown"></i>
  }
}

const CourseDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()

  const { loading, courseDetail, error } = useSelector((state) => state.course)

  useEffect(() => {
    dispatch(getCourseById(id))
  }, [dispatch, id])

  useEffect(() => {
    if (error) {
      Swal('Gagal', error, 'error')
    }
  }, [error])

  if (loading || !courseDetail) return <div className="container mt-4">Loading...</div>

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-5">
          {courseDetail.thumbnail && (
            <img
              src={courseDetail.thumbnail}
              alt={courseDetail.fullname}
              className="img-fluid rounded"
            />
          )}
        </div>
        <div className="col-md-7">
          <h2>{courseDetail.fullname}</h2>
          <p className="text-muted">{courseDetail.category?.name}</p>
          <p>{courseDetail.description}</p>
          <p><strong>Harga:</strong> Rp{courseDetail.price?.toLocaleString()}</p>
          <p><strong>Pengajar:</strong> {courseDetail.teacher?.nama || '-'}</p>
          <button className="btn btn-success mt-2">Daftar Kursus</button>
        </div>
      </div>

      <hr className="my-4" />

      <div>
        <h4>Konten Kursus</h4>
        {courseDetail.sections && courseDetail.sections.length > 0 ? (
          courseDetail.sections.map((section, i) => (
            <div key={i} className="mb-4">
              <h5>{i + 1}. {section.title}</h5>
              <p>{section.description}</p>
              <ul className="list-group">
                {section.modules.map((mod, j) => (
                  <li key={j} className="list-group-item d-flex justify-content-between align-items-center">
                    <strong>{mod.title}</strong>
                    {getModuleIcon(mod.type)}
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p>Belum ada konten.</p>
        )}
      </div>
    </div>
  )
}

export default CourseDetail
