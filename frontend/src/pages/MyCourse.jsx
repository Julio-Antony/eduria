import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMyCourses } from '../redux/actions/EnrollmentAction'
import { Link } from 'react-router-dom'

const MyCourse = () => {
  const dispatch = useDispatch()
  const token = localStorage.getItem('access_token')

  const { loading, courses, error } = useSelector((state) => state.enrollment)

  useEffect(() => {
    if (token) {
      dispatch(getMyCourses(token))
    }
  }, [dispatch, token])

  if (loading) return <p className="text-center mt-5">Memuat kursus kamu...</p>
  if (error) return <p className="text-danger text-center mt-5">Gagal: {error}</p>

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Kursus Saya</h3>

      
      {courses.length === 0 ? (
        <div className="alert alert-info">Kamu belum mengambil kursus apa pun.</div>
      ) : (
        <div className="row">
          {courses.map((course) => (
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
                  <p className="card-text text-muted">Kategori: {course.category?.name || '-'}</p>
                  <Link
                    to={`/course_detail/${course._id}`}
                    className="btn btn-primary mt-auto"
                  >
                    <i className="bx bx-book-open mr-1"></i> Buka Kursus
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyCourse
