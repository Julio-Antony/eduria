import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getCourseById } from '../redux/actions/CourseAction'
import Swal from 'sweetalert'

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
                  <li key={j} className="list-group-item">
                    <strong>{mod.title}</strong> - {mod.type}
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
