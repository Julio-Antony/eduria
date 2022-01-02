import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import kelas from './data/kelas.js'
import tugas from './data/tugas.js'
import akvtivitas from './data/aktivitas.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import Post from './models/postModel.js'
import Kelas from './models/kelasModel.js'
import Tugas from './models/tugasModel.js'
import Aktivitas from './models/activityModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()
    await Post.deleteMany()
    await Kelas.deleteMany()
    await Tugas.deleteMany()
    await Aktivitas.deleteMany()

    const createdUsers = await User.insertMany(users)

    const adminUser = createdUsers[0]._id

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser }
    })

    await Product.insertMany(sampleProducts)
    await Kelas.insertMany(kelas)
    await Tugas.insertMany(tugas)
    await Aktivitas.insertMany(akvtivitas)

    console.log('Data Imported!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()
    await Post.deleteMany()
    await Kelas.deleteMany()
    await Tugas.deleteMany()
    await Aktivitas.deleteMany()

    console.log('Data Destroyed!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
