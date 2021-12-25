import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    nama: "Julio Antony",
    email: "julio@eduria.local",
    password: bcrypt.hashSync('admin123', 10),
    identitas: {
      agama: "islam",
      alamat: "Cikarang",
      diterima_disekolah: {
        di_kelas: "X",
        pada_tanggal: "2020-07-20T03:40:18.199Z"
      },
      ijazah: {
        nomor: "M-SMK/06-3/0000001",
        tahun: "2019"
      },
      jenis_kelamin: "Laki-laki",
      kelas: "[\"X TKJ 1\",\"XI TKJ 1\"]",
      kelas_sekarang: "XII TKJ 1",
      nama_orangtua: {
        alamat: "perum cijingga permai blok z no 69 ",
        ayah: "damai",
        ibu: "misyi",
        no_telpon: "08968913345",
        pekerjaan_ayah: "guru",
        pekerjaan_ibu: "bidan"
      },
      nisn: "null",
      no_telepon: "81381953798",
      nomor_induk: "311810397",
      sekolah_asal: {
        alamat: "jl.jatimulya raya No.185",
        nama_sekolah: "SMP NEGERI 4 TAMBUN SELATAN"
      },
      tanggal_lahir: "1997-07-21T02:39:19.199Z",
      tempat_lahir: "tangerang",
      wali: {
        alamat: "Kp Cijingga Desa serang",
        nama_wali: "susi",
        no_telpon: "082323657890",
        pekerjaan_wali: "dosen"
      }
    },
    isVerified: true,
    level: "admin"
  },
  {
    email: "misyiambar@eduria.local",
    nama: "Misyi Ambar",
    password: bcrypt.hashSync('admin123', 10),
    identitas: {
      agama: "islam",
      alamat: "Cibarusah",
      diterima_disekolah: {
        di_kelas: "X",
        pada_tanggal: "2020-07-20T03:40:18.199Z"
      },
      ijazah: {
        nomor: "M-SMK/06-3/0000002",
        tahun: "2019"
      },
      jenis_kelamin: "Perempuan",
      kelas: "[\"X TKJ 1\",\"XI TKJ 1\"]",
      kelas_sekarang: "XII TKJ 1",
      nama_orangtua: {
        alamat: "perum harvest city blok az no 10 ",
        ayah: "dica",
        ibu: "maesyarah",
        no_telpon: "08968913678",
        pekerjaan_ayah: "karyawan",
        pekerjaan_ibu: "perawat"
      },
      nisn: "null",
      no_telepon: "082323657890",
      nomor_induk: "311810398",
      sekolah_asal: {
        alamat: "jl.tuanku imam bonjol",
        nama_sekolah: "SMP NEGERI 1 TAMBUN SELATAN"
      },
      tanggal_lahir: "1997-01-20T02:39:19.199Z",
      tempat_lahir: "tangerang",
      wali: {
        alamat: "Kp Cijingga Desa serang",
        nama_wali: "refo",
        no_telpon: "082323657899",
        pekerjaan_wali: "guru"
      }
    },
    isVerified: true,
    level: "admin"
  },
  {
    email: "susimul@eduria.local",
    nama: "Susi Mulyanti Arifani",
    password: bcrypt.hashSync('admin123', 10),
    identitas: {
      agama: "islam",
      alamat: "pondok ungu",
      diterima_disekolah: {
        di_kelas: "X",
        pada_tanggal: "2020-07-20T03:40:18.199Z"
      },
      ijazah: {
        nomor: "M-SMK/06-3/0000003",
        tahun: "2019"
      },
      jenis_kelamin: "Perempuan",
      kelas: "[\"X TKJ 1\",\"XI TKJ 1\"]",
      kelas_sekarang: "XII TKJ 1",
      nama_orangtua: {
        alamat: "perum harvest city blok B no 7 ",
        ayah: "budi",
        ibu: "nina",
        no_telpon: "08968913345",
        pekerjaan_ayah: "karyawan",
        pekerjaan_ibu: "perawat"
      },
      nisn: "null",
      no_telepon: "082323657123",
      nomor_induk: "311810340",
      sekolah_asal: {
        alamat: "jl.tuanku imam bonjol",
        nama_sekolah: "SMP NEGERI 1 TAMBUN SELATAN"
      },
      tanggal_lahir: "1998-01-22T02:39:19.199Z",
      tempat_lahir: "bekasi",
      wali: {
        alamat: "Kp Cijingga Desa serang",
        nama_wali: "zahra",
        no_telpon: "082323123899",
        pekerjaan_wali: "guru"
      }
    },
    "isVerified": "true",
    "level": "admin"
  }
]

export default users
