import mongoose from 'mongoose'

const paymentSchema = new mongoose.Schema(
  {
    order_id: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    payment_type: {
      type: String,
    },
    bank: {
      type: String,
    },
    va_number: {
      type: String,
    },
    transaction_status: {
      type: String,
      enum: ['pending', 'settlement', 'expire', 'cancel', 'deny'],
      default: 'pending',
    },
    transaction_time: {
      type: Date,
    },
    paid_at: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('Payment', paymentSchema)
