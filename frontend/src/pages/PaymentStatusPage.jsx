import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkPaymentStatus, getCourseByOrderId } from '../redux/actions/PaymentAction'
import { useParams, useHistory } from 'react-router-dom'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

const PaymentStatusPage = () => {
    const { orderId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const token = localStorage.getItem('access_token')
    const receiptRef = useRef(null)

    const { loadingStatus: loading, status: payment, errorStatus: error } = useSelector(
        (state) => state.payment
    )
    const { courseFromOrder } = useSelector((state) => state.payment)

    useEffect(() => {
        if (orderId && token) {
            dispatch(checkPaymentStatus(orderId, token))
            dispatch(getCourseByOrderId(orderId, token))
        }
    }, [dispatch, orderId, token])

    const formatDateTime = (dateStr) => {
        const date = new Date(dateStr)
        return date.toLocaleString('id-ID', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    const handleDownloadPDF = async () => {
        const element = receiptRef.current
        const canvas = await html2canvas(element, { scale: 2, useCORS: true })
        const imgData = canvas.toDataURL('image/png')
        const pdf = new jsPDF('p', 'mm', 'a4')
        const width = pdf.internal.pageSize.getWidth()
        const height = (canvas.height * width) / canvas.width
        pdf.addImage(imgData, 'PNG', 0, 0, width, height)
        pdf.save(`struk-pembayaran-${payment.order_id}.pdf`)
    }

    //   const goToCourse = () => {
    //     if (courseFromOrder?.course) {
    //       history.push(`/course_detail/${courseFromOrder._id}`)
    //     }
    //   }

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div
                ref={receiptRef}
                className="bg-white rounded shadow-sm p-4"
                style={{ maxWidth: '400px', width: '100%' }}
            >
                {loading ? (
                    <p>Memuat...</p>
                ) : error ? (
                    <p className="text-danger">{error}</p>
                ) : payment ? (
                    <>
                        <div className="text-center mb-3">
                            <div
                                className="bg-success text-white rounded-circle d-inline-flex justify-content-center align-items-center"
                                style={{ width: '50px', height: '50px', fontSize: '24px' }}
                            >
                                ✓
                            </div>
                            <p className="text-success font-weight-bold mt-3 mb-1">Pembayaran Berhasil!</p>
                            <h5 className="font-weight-bold">Rp {Number(payment.gross_amount).toLocaleString('id-ID')}</h5>
                        </div>

                        <div className="bg-light rounded p-3 mb-3">
                            <p className="font-weight-bold text-center border-bottom pb-2 mb-3">
                                Detail Pembayaran
                            </p>

                            <div className="mb-2 d-flex justify-content-between">
                                <small className="text-muted">Nomor Referensi</small>
                                <span className="text-right">{payment.order_id}</span>
                            </div>

                            <div className="mb-2 d-flex justify-content-between">
                                <small className="text-muted">Waktu Pembayaran</small>
                                <span>{formatDateTime(payment.createdAt || Date.now())}</span>
                            </div>

                            <div className="mb-2 d-flex justify-content-between">
                                <small className="text-muted">Metode Pembayaran</small>
                                <span className="text-capitalize">{payment.payment_type || '-'}</span>
                            </div>

                            <div className="mb-2 d-flex justify-content-between">
                                <small className="text-muted">Nama Pengirim</small>
                                <span>{payment.customer_name || '-'}</span>
                            </div>

                            <div className="mb-2 d-flex justify-content-between">
                                <small className="text-muted">Jumlah</small>
                                <span>
                                    <strong>Rp {Number(payment.amount || payment.gross_amount).toLocaleString('id-ID')}</strong>
                                </span>
                            </div>

                            <div className="mb-2 d-flex justify-content-between">
                                <small className="text-muted">Status</small>
                                <span className="badge badge-success">{payment.transaction_status}</span>
                            </div>
                        </div>

                        <button
                            onClick={handleDownloadPDF}
                            className="btn btn-outline-primary btn-block mb-2"
                        >
                            <i className="bx bx-download mr-2"></i> Unduh Struk PDF
                        </button>

                        {courseFromOrder && (
                            <div className="text-center">
                                <h5 className="mt-4">Kursus: {courseFromOrder.fullname}</h5>
                                <button
                                    onClick={() => history.push(`/course_detail/${courseFromOrder._id}`)}
                                    className="btn btn-primary mt-2"
                                >
                                    <i className="bx bx-book mr-2"></i> Buka Kursus
                                </button>
                            </div>
                        )}
                    </>
                ) : null}
            </div>
        </div>
    )
}

export default PaymentStatusPage
