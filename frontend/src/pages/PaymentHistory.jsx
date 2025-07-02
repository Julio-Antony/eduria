import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPaymentHistory } from '../redux/actions/PaymentAction'
import swal from 'sweetalert'

const PaymentHistory = () => {
  const dispatch = useDispatch()
  const { paymentHistory } = useSelector((state) => state.payment)
  const userLevel = localStorage.getItem('level')
  const currentUserEmail = localStorage.getItem('email')

  useEffect(() => {
    const token = localStorage.getItem('access_token')
  if (token) {
    dispatch(getPaymentHistory(token))
  }
  }, [dispatch])

  const filteredPayments = userLevel === 'admin'
    ? paymentHistory
    : paymentHistory.filter((p) => p.email === currentUserEmail)

  return (
    <div className="container mt-4">
      <h3>Riwayat Pembelian Kursus</h3>

      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>No</th>
            <th>Order ID</th>
            <th>Nama Kursus</th>
            <th>Harga</th>
            <th>Status</th>
            <th>Email</th>
            <th>Waktu</th>
          </tr>
        </thead>
        <tbody>
          {filteredPayments.length > 0 ? (
            filteredPayments.map((pay, idx) => (
              <tr key={pay._id}>
                <td>{idx + 1}</td>
                <td>{pay.orderId}</td>
                <td>{pay.course?.fullname || '-'}</td>
                <td>Rp{pay.amount?.toLocaleString()}</td>
                <td>{pay.status}</td>
                <td>{pay.email}</td>
                <td>{new Date(pay.createdAt).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">Tidak ada riwayat pembayaran.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default PaymentHistory
