import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert'
import { getCourseById } from '../redux/actions/CourseAction'
import axios from 'axios'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const getModuleIcon = (type) => {
  const sizeClass = 'fs-2'
  switch (type) {
    case 'video': return <i className={`bx bx-video text-danger ${sizeClass}`} title="Video"></i>
    case 'file': return <i className={`bx bx-file text-primary ${sizeClass}`} title="File"></i>
    case 'link': return <i className={`bx bx-link-alt text-success ${sizeClass}`} title="Link"></i>
    case 'text': return <i className={`bx bx-text text-info ${sizeClass}`} title="Text"></i>
    case 'quiz': return <i className={`bx bx-help-circle text-warning ${sizeClass}`} title="Quiz"></i>
    default: return <i className={`bx bx-question-mark ${sizeClass}`} title="Unknown"></i>
  }
}

const CourseDetail = () => {
  const [openSections, setOpenSections] = useState({})
  const { id } = useParams()
  const dispatch = useDispatch()
  const history = useHistory()

  const { loading, courseDetail, error } = useSelector((state) => state.course)
  const { loading: loadingPay } = useSelector((state) => state.payment)
  const { courses: enrolledCourses } = useSelector((state) => state.enrollment)

  const isEnrolled = enrolledCourses?.some((course) => course._id === courseDetail._id)
  const userLevel = localStorage.getItem('level')

  const canViewContent =
    userLevel === 'admin' ||
    userLevel === 'guru' ||
    (userLevel === 'siswa' && isEnrolled)

  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  // Ambil course detail
  useEffect(() => {
    dispatch(getCourseById(id))
  }, [dispatch, id])

  // Show error popup
  useEffect(() => {
    if (error) Swal('Gagal', error, 'error')
  }, [error])

  // Load Snap JS
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://app.sandbox.midtrans.com/snap/snap.js'
    script.setAttribute('data-client-key', process.env.REACT_APP_MIDTRANS_SANDBOX_CLIENT_KEY)
    script.async = true
    document.body.appendChild(script)
    return () => document.body.removeChild(script)
  }, [])

  // Handle klik pembayaran
  const handlePayment = async () => {
    try {
      const token = localStorage.getItem('access_token')
      const email = localStorage.getItem('email')
      const fullname = localStorage.getItem('username')
      if (!token) return Swal('Gagal', 'Kamu belum login', 'error')

      const orderId = 'ORDER-' + Date.now()
      localStorage.setItem('last_order_id', orderId)

      const { data } = await axios.post(
        '/api/payments/create',
        {
          orderId,
          amount: courseDetail.price,
          fullname,
          email: email,
          courseId: courseDetail._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      window.snap.pay(data.token, {
        onPending: function (result) {
          history.push(`/payment/status/${result.order_id}`)
        },
        onSuccess: async function (result) {
          try {
            const token = localStorage.getItem('access_token')
            const config = {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }

            // Panggil endpoint enroll langsung
            await axios.post(
              '/api/enrollments',
              { courseId: courseDetail._id }, // sesuaikan dengan struktur datamu
              config
            )

            history.push(`/payment/status/${result.order_id}`)
          } catch (err) {
            console.error('Gagal enroll setelah pembayaran:', err)
            Swal('Gagal', 'Terjadi kesalahan saat enroll setelah pembayaran', 'error')
          }
        },
        onError: function (error) {
          console.error(error)
          Swal('Gagal', 'Terjadi kesalahan saat proses pembayaran', 'error')
        },
        onClose: function () {
          Swal('Ditutup', 'Kamu menutup pembayaran sebelum selesai', 'info')
        },
      })
    } catch (err) {
      console.error(err)
      Swal('Gagal', 'Terjadi kesalahan saat memulai pembayaran', 'error')
    }
  }


  if (loading || !courseDetail) return <div className="container mt-4">Loading...</div>

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-5">
          {courseDetail.thumbnail && (
            <img src={courseDetail.thumbnail} alt={courseDetail.fullname} className="img-fluid rounded" />
          )}
        </div>
        <div className="col-md-7">
          <h2>{courseDetail.fullname}</h2>
          <p className="text-muted">{courseDetail.category?.name}</p>
          <p>{courseDetail.description}</p>
          <p><strong>Pengajar:</strong> {courseDetail.teacher?.nama || '-'}</p>
          {!isEnrolled && (
            <>
              <p><strong>Harga:</strong> Rp{courseDetail.price?.toLocaleString()}</p>
              <button
                className="btn btn-success mt-2"
                onClick={handlePayment}
                disabled={loadingPay}
              >
                {loadingPay ? 'Memuat...' : 'Beli Kursus'}
              </button>
            </>
          )}
        </div>
      </div>

      <hr className="my-4" />

      <div>
        <h4>Konten Kursus</h4>
        {courseDetail.sections?.length > 0 ? (
          courseDetail.sections.map((section, i) => (
            <div key={i} className="mb-3">
              <button
                className="btn btn-outline-primary btn-block text-left"
                onClick={() => toggleSection(i)}
              >
                {i + 1}. {section.title}
              </button>

              {openSections[i] && (
                <div className="card card-body mt-2">
                  <p>{section.description}</p>
                  <ul className="list-group">
                    {section.modules.map((mod, j) => (
                      <li key={j} className="list-group-item">
                        <div className="d-flex justify-content-between align-items-center">
                          <strong>{mod.title}</strong>
                          {getModuleIcon(mod.type)}
                        </div>

                        {canViewContent && (
                          <div className="mt-2">
                            <small className="text-muted">Konten:</small><br />
                            {mod.type === 'link' && mod.content.includes('youtube.com') ? (
                              <div className="embed-responsive embed-responsive-16by9">
                                <iframe
                                  className="embed-responsive-item"
                                  src={mod.content.replace("watch?v=", "embed/")}
                                  allowFullScreen
                                  title="Video YouTube"
                                ></iframe>
                              </div>
                            ) : mod.type === 'video' ? (
                              <video src={mod.content} controls width="100%" />
                            ) : mod.type === 'file' ? (
                              <a href={mod.content} target="_blank" rel="noopener noreferrer">
                                Unduh File
                              </a>
                            ) : (
                              <div>{mod.content}</div>
                            )}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>Belum ada konten.</p>
        )}

        {!canViewContent && userLevel === 'siswa' && !isEnrolled && (
          <div className="alert alert-warning mt-3">
            Kamu harus membeli kursus untuk melihat isi modulnya.
          </div>
        )}
      </div>


    </div>
  )
}

export default CourseDetail
