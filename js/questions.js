/**
 * Question Bank & Manager - Subway Surfers Edu: Edisi Produktif SMK (Informatika / RPL / TKJ)
 * Menyediakan 64 soal bawaan berkualitas tinggi lengkap dengan pembahasan + fitur CRUD Guru.
 */

const DEFAULT_CATEGORIES = [
  { id: 'all', name: 'Semua Mapel Produktif IT', icon: '🚀', color: '#f59e0b', desc: 'Campuran Informatika, Pemrograman RPL, TKJ & Sistem Komputer' },
  { id: 'informatika', name: 'Dasar Informatika & Algoritma', icon: '🧠', color: '#3b82f6', desc: 'Logika, Flowchart, Bilangan Biner, Struktur Data & Berpikir Komputasional' },
  { id: 'pemrograman', name: 'Pemrograman Web & RPL', icon: '💻', color: '#10b981', desc: 'HTML, CSS, JavaScript, PHP, Database SQL & Pemrograman Berorientasi Objek' },
  { id: 'tkj', name: 'Teknik Komputer & Jaringan (TKJ)', icon: '🌐', color: '#8b5cf6', desc: 'IP Address, Subnetting, OSI Layer, Mikrotik, Routing & Infrastruktur Jaringan' },
  { id: 'hardware_os', name: 'Sistem Operasi & Hardware', icon: '🛠️', color: '#ef4444', desc: 'Perakitan PC, BIOS, Perintah Linux, Server, Troubleshooting & Keamanan' }
];

const DEFAULT_QUESTIONS = [
  // ======================== 1. DASAR INFORMATIKA & ALGORITMA ========================
  {
    id: 'inf-1',
    category: 'informatika',
    question: 'Simbol bangun datar "Belah Ketupat" (Diamond) pada Flowchart berfungsi untuk menyatakan...',
    options: [
      'Proses perhitungan aritmatika',
      'Percabangan / Keputusan (Decision)',
      'Input dan Output data',
      'Awal dan akhir program (Terminator)'
    ],
    answer: 1,
    explanation: 'Simbol Diamond (Belah Ketupat) digunakan untuk Decision (keputusan/percabangan kondisi Ya/Tidak).'
  },
  {
    id: 'inf-2',
    category: 'informatika',
    question: 'Konversi bilangan biner 1101 ke dalam bilangan desimal adalah...',
    options: ['11', '12', '13', '15'],
    answer: 2,
    explanation: '1101 biner = (1×8) + (1×4) + (0×2) + (1×1) = 8 + 4 + 0 + 1 = 13.'
  },
  {
    id: 'inf-3',
    category: 'informatika',
    question: 'Tipe data yang paling tepat untuk menyimpan nilai rata-rata rapor siswa seperti 87.65 adalah...',
    options: ['Integer', 'Boolean', 'Float / Double', 'Char'],
    answer: 2,
    explanation: 'Float atau Double digunakan untuk menyimpan bilangan pecahan/desimal, sedangkan Integer untuk bilangan bulat.'
  },
  {
    id: 'inf-4',
    category: 'informatika',
    question: 'Struktur data yang menggunakan prinsip LIFO (Last In First Out), di mana data terakhir masuk adalah yang pertama keluar, disebut...',
    options: ['Queue (Antrean)', 'Stack (Tumpukan)', 'Linked List', 'Tree (Pohon)'],
    answer: 1,
    explanation: 'Stack (Tumpukan) bekerja dengan prinsip LIFO (Last In First Out), sedangkan Queue bekerja dengan FIFO.'
  },
  {
    id: 'inf-5',
    category: 'informatika',
    question: 'Pada gerbang logika AND, output akan bernilai 1 (True) apabila...',
    options: [
      'Salah satu input bernilai 1',
      'Semua input bernilai 0',
      'Semua input bernilai 1',
      'Kedua input memiliki nilai berbeda'
    ],
    answer: 2,
    explanation: 'Gerbang AND hanya menghasilkan output 1 jika seluruh input-nya bernilai 1.'
  },
  {
    id: 'inf-6',
    category: 'informatika',
    question: 'Pilar Berpikir Komputasional (Computational Thinking) yang memecah masalah besar dan kompleks menjadi bagian-bagian kecil agar mudah diselesaikan disebut...',
    options: ['Abstraksi', 'Dekomposisi', 'Pengenalan Pola', 'Algoritma'],
    answer: 1,
    explanation: 'Dekomposisi adalah teknik memecah masalah kompleks menjadi sub-masalah yang lebih kecil dan terkelola.'
  },
  {
    id: 'inf-7',
    category: 'informatika',
    question: 'Berapakah hasil dari operasi modulus (sisa bagi) `17 % 5` dalam pemrograman?',
    options: ['2', '3', '3.4', '5'],
    answer: 0,
    explanation: '17 dibagi 5 menghasilkan 3 dengan sisa 2. Operator % (modulo) mengambil nilai sisa baginya yaitu 2.'
  },
  {
    id: 'inf-8',
    category: 'informatika',
    question: 'Bilangan desimal 255 jika dikonversikan ke dalam bilangan Heksadesimal (basis 16) menjadi...',
    options: ['AA', 'F0', 'FE', 'FF'],
    answer: 3,
    explanation: '255 / 16 = 15 (F) sisa 15 (F), sehingga dalam heksadesimal ditulis FF.'
  },
  {
    id: 'inf-9',
    category: 'informatika',
    question: 'Algoritma pencarian yang mengharuskan data sudah terurut terlebih dahulu lalu membagi dua ruang pencarian secara berulang adalah...',
    options: ['Linear Search', 'Binary Search', 'Bubble Sort', 'Breadth-First Search'],
    answer: 1,
    explanation: 'Binary Search membagi dua kumpulan data yang sudah terurut (divide and conquer) untuk mencari elemen dengan cepat.'
  },
  {
    id: 'inf-10',
    category: 'informatika',
    question: 'Dalam struktur perulangan (looping), kondisi di mana perulangan tidak pernah berhenti karena syarat berhentinya tidak pernah tercapai disebut...',
    options: ['Syntax Error', 'Nested Loop', 'Infinite Loop', 'Deadlock'],
    answer: 2,
    explanation: 'Infinite Loop adalah perulangan tak berujung akibat kondisi bernilai True terus-menerus.'
  },
  {
    id: 'inf-11',
    category: 'informatika',
    question: 'Indeks pertama dari sebuah Array pada sebagian besar bahasa pemrograman modern (C, Java, JS, Python, PHP) dimulai dari angka...',
    options: ['0', '1', '-1', 'Bebas ditentukan OS'],
    answer: 0,
    explanation: 'Array menggunakan zero-based indexing, sehingga elemen pertama berada pada indeks ke-0.'
  },
  {
    id: 'inf-12',
    category: 'informatika',
    question: '1 Kilobyte (KB) dalam standar biner memori komputer (KiB) setara dengan...',
    options: ['100 Byte', '512 Byte', '1000 Bit', '1024 Byte'],
    answer: 3,
    explanation: 'Dalam sistem biner komputer (2^10), 1 KB (KiB) setara dengan 1024 Byte.'
  },
  {
    id: 'inf-13',
    category: 'informatika',
    question: 'Simbol "Jajar Genjang" (Parallelogram) pada diagram alir (Flowchart) digunakan untuk...',
    options: [
      'Deklarasi variabel awal',
      'Proses Input / Output data',
      'Memanggil sub-program / fungsi',
      'Menghubungkan halaman berbeda'
    ],
    answer: 1,
    explanation: 'Jajar genjang pada flowchart melambangkan operasi Input/Output (seperti Baca data atau Cetak hasil).'
  },
  {
    id: 'inf-14',
    category: 'informatika',
    question: 'Manakah di bawah ini yang merupakan operator logika "ATAU" (OR) dalam bahasa C, Java, JavaScript, dan PHP?',
    options: ['&&', '||', '!=', '=='],
    answer: 1,
    explanation: 'Simbol || mewakili logika OR, sedangkan && mewakili logika AND dan != mewakili tidak sama dengan.'
  },
  {
    id: 'inf-15',
    category: 'informatika',
    question: 'Proses menyaring dan mengabaikan detail yang tidak relevan agar fokus pada informasi penting saja dalam Computational Thinking disebut...',
    options: ['Dekomposisi', 'Abstraksi', 'Kompilasi', 'Iterasi'],
    answer: 1,
    explanation: 'Abstraksi adalah menyederhanakan masalah dengan memfokuskan pada informasi inti dan mengabaikan detail tidak penting.'
  },
  {
    id: 'inf-16',
    category: 'informatika',
    question: 'Jika variabel `A = 10` dan `B = 20`, lalu dijalankan perintah `A = A + B`, berapakah nilai `A` sekarang?',
    options: ['10', '20', '30', '200'],
    answer: 2,
    explanation: 'Nilai A yang baru diisi dengan nilai A lama (10) ditambah B (20) = 30.'
  },

  // ======================== 2. PEMROGRAMAN WEB & RPL ========================
  {
    id: 'rpl-1',
    category: 'pemrograman',
    question: 'Tag HTML yang digunakan untuk membuat hyperlink (tautan) ke halaman lain adalah...',
    options: ['<link>', '<a>', '<href>', '<url>'],
    answer: 1,
    explanation: 'Tag <a> (anchor) dengan atribut href="..." digunakan untuk membuat hyperlink di HTML.'
  },
  {
    id: 'rpl-2',
    category: 'pemrograman',
    question: 'Dalam CSS, bagaimana cara memilih elemen HTML yang memiliki atribut `id="header"`?',
    options: ['.header', '#header', '*header', 'header'],
    answer: 1,
    explanation: 'Selector ID di CSS menggunakan tanda pagar (#), sedangkan tanda titik (.) digunakan untuk selector Class.'
  },
  {
    id: 'rpl-3',
    category: 'pemrograman',
    question: 'Perintah SQL yang digunakan untuk mengambil/menampilkan data dari sebuah tabel database adalah...',
    options: ['GET', 'FETCH', 'SELECT', 'SHOW'],
    answer: 2,
    explanation: 'Perintah SELECT (misalnya: SELECT * FROM siswa;) digunakan untuk membaca/mengambil data pada SQL.'
  },
  {
    id: 'rpl-4',
    category: 'pemrograman',
    question: 'Pada JavaScript, metode yang digunakan untuk mengambil elemen HTML berdasarkan atribut ID-nya adalah...',
    options: [
      'document.queryElement("#id")',
      'document.getElementById("id")',
      'window.findElementById("id")',
      'document.getElementsByClass("id")'
    ],
    answer: 1,
    explanation: 'document.getElementById("id") adalah fungsi DOM standar untuk menyeleksi elemen tunggal berdasarkan ID.'
  },
  {
    id: 'rpl-5',
    category: 'pemrograman',
    question: 'Dalam bahasa pemrograman PHP, setiap penulisan nama variabel wajib diawali dengan karakter...',
    options: ['@', '#', '$', '&'],
    answer: 2,
    explanation: 'Semua variabel di PHP wajib diawali tanda dollar ($), contohnya: $namaSiswa = "Budi";'
  },
  {
    id: 'rpl-6',
    category: 'pemrograman',
    question: 'Konsep OOP (Object-Oriented Programming) di mana sebuah class anak dapat mewarisi properti dan method dari class induk disebut...',
    options: ['Encapsulation', 'Polymorphism', 'Inheritance', 'Abstraction'],
    answer: 2,
    explanation: 'Inheritance (Pewarisan) memungkinkan class turunan (subclass) mewarisi atribut dan method dari superclass.'
  },
  {
    id: 'rpl-7',
    category: 'pemrograman',
    question: 'Properti CSS Flexbox yang digunakan untuk meratakan item secara horizontal di tengah kontainer adalah...',
    options: [
      'align-items: center;',
      'justify-content: center;',
      'text-align: middle;',
      'flex-wrap: center;'
    ],
    answer: 1,
    explanation: 'Pada flex-direction: row (default), justify-content mengatur perataan sepanjang sumbu utama (horizontal).'
  },
  {
    id: 'rpl-8',
    category: 'pemrograman',
    question: 'Pada database relasional, kolom unik yang berfungsi sebagai identitas utama setiap baris data dalam tabel disebut...',
    options: ['Foreign Key', 'Primary Key', 'Index Key', 'Unique Constraint'],
    answer: 1,
    explanation: 'Primary Key adalah kunci utama yang nilainya unik dan tidak boleh kosong (NOT NULL) untuk mengidentifikasi record.'
  },
  {
    id: 'rpl-9',
    category: 'pemrograman',
    question: 'Perintah Git yang digunakan untuk mengunggah (mengirim) commit dari repositori lokal ke repositori remote (seperti GitHub) adalah...',
    options: ['git pull', 'git commit', 'git push', 'git clone'],
    answer: 2,
    explanation: 'git push mengirim perubahan commit lokal ke server remote, sedangkan git pull menarik perubahan dari remote.'
  },
  {
    id: 'rpl-10',
    category: 'pemrograman',
    question: 'Apa output dari kode JavaScript berikut: `console.log(typeof "123")`?',
    options: ['number', 'integer', 'string', 'object'],
    answer: 2,
    explanation: 'Karena angka 123 diapit oleh tanda kutip ("123"), maka tipe datanya adalah string.'
  },
  {
    id: 'rpl-11',
    category: 'pemrograman',
    question: 'Dalam komunikasi REST API / HTTP, method yang standar digunakan untuk mengirim data sensitif (seperti form login atau tambah data baru) adalah...',
    options: ['GET', 'POST', 'DELETE', 'HEAD'],
    answer: 1,
    explanation: 'Method POST mengirimkan data di dalam body request (bukan di URL seperti GET), sehingga tepat untuk login/insert data.'
  },
  {
    id: 'rpl-12',
    category: 'pemrograman',
    question: 'Singkatan dari JSON yang sering digunakan sebagai format pertukaran data API adalah...',
    options: [
      'Java Standard Object Network',
      'JavaScript Object Notation',
      'JavaScript Online Node',
      'Java Source Open Network'
    ],
    answer: 1,
    explanation: 'JSON adalah singkatan dari JavaScript Object Notation, format pertukaran data teks yang ringan dan mudah dibaca.'
  },
  {
    id: 'rpl-13',
    category: 'pemrograman',
    question: 'Perintah SQL `DELETE FROM siswa` tanpa klausa `WHERE` akan mengakibatkan...',
    options: [
      'Terjadi pesan error syntax SQL',
      'Hanya baris pertama tabel siswa yang terhapus',
      'Seluruh baris data di dalam tabel siswa terhapus',
      'Struktur tabel siswa beserta kolomnya hilang'
    ],
    answer: 2,
    explanation: 'DELETE tanpa WHERE akan mengosongkan (menghapus semua baris) di dalam tabel tersebut!'
  },
  {
    id: 'rpl-14',
    category: 'pemrograman',
    question: 'Dalam CSS Box Model, jarak ruang di bagian DALAM antara batas tepi (border) dengan isi konten elemen disebut...',
    options: ['Margin', 'Padding', 'Outline', 'Gap'],
    answer: 1,
    explanation: 'Padding adalah jarak di dalam border ke konten, sedangkan Margin adalah jarak di luar border antar elemen.'
  },
  {
    id: 'rpl-15',
    category: 'pemrograman',
    question: 'Kata kunci pada JavaScript modern (ES6) untuk mendeklarasikan variabel yang nilainya konstan (tidak bisa diubah ulang) adalah...',
    options: ['var', 'let', 'const', 'static'],
    answer: 2,
    explanation: 'const digunakan untuk mendeklarasikan konstanta yang referensinya tidak dapat di-reassign.'
  },
  {
    id: 'rpl-16',
    category: 'pemrograman',
    question: 'Kepanjangan dari MVC dalam arsitektur pengembangan aplikasi (seperti Laravel / CodeIgniter) adalah...',
    options: [
      'Model - View - Controller',
      'Module - Variable - Class',
      'Master - Virtual - Component',
      'Model - Visual - Container'
    ],
    answer: 0,
    explanation: 'MVC memisahkan aplikasi menjadi Model (data/logika bisnis), View (tampilan UI), dan Controller (pengatur alur).'
  },

  // ======================== 3. TEKNIK KOMPUTER & JARINGAN (TKJ) ========================
  {
    id: 'tkj-1',
    category: 'tkj',
    question: 'Berapa jumlah total lapisan (layer) pada model referensi jaringan OSI (Open Systems Interconnection)?',
    options: ['4 Layer', '5 Layer', '7 Layer', '8 Layer'],
    answer: 2,
    explanation: 'Model OSI terdiri dari 7 Layer: Physical, Data Link, Network, Transport, Session, Presentation, dan Application.'
  },
  {
    id: 'tkj-2',
    category: 'tkj',
    question: 'Perangkat Router dan pengalamatan IP Address bekerja pada lapisan ke-3 model OSI, yaitu...',
    options: ['Physical Layer', 'Data Link Layer', 'Network Layer', 'Transport Layer'],
    answer: 2,
    explanation: 'Network Layer (Layer 3) menangani pengalamatan logis (IP Address) dan penentuan jalur (Routing).'
  },
  {
    id: 'tkj-3',
    category: 'tkj',
    question: 'Pada jaringan dengan prefix `/24` (Subnet Mask `255.255.255.0`), berapakah jumlah maksimal IP Host yang valid dan dapat digunakan oleh perangkat?',
    options: ['256 Host', '255 Host', '254 Host', '128 Host'],
    answer: 2,
    explanation: 'Total IP pada /24 adalah 256, dikurangi 2 (1 IP Network & 1 IP Broadcast), sehingga tersisa 254 host valid.'
  },
  {
    id: 'tkj-4',
    category: 'tkj',
    question: 'Urutan warna kabel UTP standar Internasional T568B untuk pin 1, 2, dan 3 adalah...',
    options: [
      'Putih-Hijau, Hijau, Putih-Oranye',
      'Putih-Oranye, Oranye, Putih-Hijau',
      'Putih-Oranye, Putih-Hijau, Oranye',
      'Oranye, Putih-Oranye, Hijau'
    ],
    answer: 1,
    explanation: 'Standar T568B: 1.Putih-Oranye, 2.Oranye, 3.Putih-Hijau, 4.Biru, 5.Putih-Biru, 6.Hijau, 7.Putih-Cokelat, 8.Cokelat.'
  },
  {
    id: 'tkj-5',
    category: 'tkj',
    question: 'Layanan server yang berfungsi memberikan konfigurasi IP Address, Subnet Mask, Gateway, dan DNS secara otomatis kepada komputer klien adalah...',
    options: ['DNS Server', 'DHCP Server', 'FTP Server', 'Proxy Server'],
    answer: 1,
    explanation: 'DHCP (Dynamic Host Configuration Protocol) mendistribusikan alamat IP secara otomatis ke perangkat klien.'
  },
  {
    id: 'tkj-6',
    category: 'tkj',
    question: 'Protokol jaringan yang bertugas menerjemahkan nama domain (seperti `smkbudiagung.sch.id`) menjadi alamat IP dan sebaliknya adalah...',
    options: ['HTTP', 'DHCP', 'DNS', 'SNMP'],
    answer: 2,
    explanation: 'DNS (Domain Name System) menerjemahkan nama domain yang mudah diingat manusia menjadi IP Address.'
  },
  {
    id: 'tkj-7',
    category: 'tkj',
    question: 'Berapakah nomor Port default yang digunakan oleh protokol web aman HTTPS dan remote akses SSH?',
    options: [
      'HTTPS = 80, SSH = 21',
      'HTTPS = 443, SSH = 22',
      'HTTPS = 8080, SSH = 23',
      'HTTPS = 443, SSH = 25'
    ],
    answer: 1,
    explanation: 'HTTPS menggunakan port 443 (HTTP biasa port 80), sedangkan SSH menggunakan port 22 (Telnet port 23, FTP port 21).'
  },
  {
    id: 'tkj-8',
    category: 'tkj',
    question: 'Pada router MikroTik, fitur Firewall yang wajib dikonfigurasi (`action=masquerade`) agar jaringan lokal (LAN) dapat mengakses internet melalui IP Public ISP adalah...',
    options: ['Filter Rules', 'NAT (srcnat)', 'Mangle', 'Layer7 Protocol'],
    answer: 1,
    explanation: 'Source NAT (srcnat) dengan action=masquerade menerjemahkan IP Private klien LAN menjadi IP Public router.'
  },
  {
    id: 'tkj-9',
    category: 'tkj',
    question: 'Manakah di bawah ini yang termasuk dalam rentang IP Private Kelas C menurut standar RFC 1918?',
    options: [
      '10.10.1.1',
      '172.16.0.1',
      '192.168.10.1',
      '202.134.1.10'
    ],
    answer: 2,
    explanation: 'IP Private Kelas C berada pada rentang 192.168.0.0 hingga 192.168.255.255.'
  },
  {
    id: 'tkj-10',
    category: 'tkj',
    question: 'Konektor standar yang digunakan pada ujung kabel jaringan UTP (Cat5e / Cat6) adalah...',
    options: ['RJ-11', 'RJ-45', 'BNC', 'SC / LC'],
    answer: 1,
    explanation: 'Kabel UTP Ethernet menggunakan konektor RJ-45 (8 pin), sedangkan RJ-11 untuk telepon dan SC/LC untuk Fiber Optik.'
  },
  {
    id: 'tkj-11',
    category: 'tkj',
    question: 'Perintah pada Command Prompt / Terminal untuk menguji konektivitas jaringan dan mengukur waktu respons (latency) ke sebuah host adalah...',
    options: ['netstat', 'nslookup', 'ping', 'ipconfig'],
    answer: 2,
    explanation: 'Perintah ping mengirimkan paket ICMP Echo Request untuk mengecek apakah host tujuan aktif dan terhubung.'
  },
  {
    id: 'tkj-12',
    category: 'tkj',
    question: 'Teknologi pada Switch Manageable yang memungkinkan pemisahan satu switch fisik menjadi beberapa jaringan broadcast virtual yang berbeda disebut...',
    options: ['VPN', 'VLAN', 'VTP', 'VoIP'],
    answer: 1,
    explanation: 'VLAN (Virtual Local Area Network) mengelompokkan port switch menjadi beberapa segmen jaringan logis yang terpisah.'
  },
  {
    id: 'tkj-13',
    category: 'tkj',
    question: 'Berapakah panjang total bit dari sebuah alamat IPv4?',
    options: ['16 bit', '32 bit', '64 bit', '128 bit'],
    answer: 1,
    explanation: 'IPv4 terdiri dari 4 oktet × 8 bit = 32 bit, sedangkan IPv6 memiliki panjang 128 bit.'
  },
  {
    id: 'tkj-14',
    category: 'tkj',
    question: 'Alat yang digunakan oleh teknisi jaringan Fiber Optik untuk menyambungkan dua ujung serat kaca dengan cara meleburkannya menggunakan busur listrik adalah...',
    options: ['Crimping Tool', 'Fusion Splicer', 'LAN Tester', 'Optical Power Meter'],
    answer: 1,
    explanation: 'Fusion Splicer digunakan untuk menyambung core serat optik dengan presisi tinggi menggunakan pemanasan elektrik.'
  },
  {
    id: 'tkj-15',
    category: 'tkj',
    question: 'Topologi jaringan di mana seluruh komputer terhubung ke satu perangkat pusat seperti Switch disebut topologi...',
    options: ['Topologi Bus', 'Topologi Ring', 'Topologi Star', 'Topologi Peer-to-Peer'],
    answer: 2,
    explanation: 'Topologi Star menghubungkan setiap node ke satu titik pusat (Switch/Hub), paling umum digunakan di LAN modern.'
  },
  {
    id: 'tkj-16',
    category: 'tkj',
    question: 'Subnet mask dalam notasi desimal untuk prefix `/26` adalah...',
    options: [
      '255.255.255.128',
      '255.255.255.192',
      '255.255.255.224',
      '255.255.255.240'
    ],
    answer: 1,
    explanation: '/26 memiliki 2 bit subnet aktif di oktet ke-4 (11000000 biner = 128 + 64 = 192), sehingga 255.255.255.192.'
  },

  // ======================== 4. SISTEM OPERASI & HARDWARE ========================
  {
    id: 'hw-1',
    category: 'hardware_os',
    question: 'Komponen memori komputer yang bersifat Volatile (datanya akan hilang ketika komputer dimatikan/listrik terputus) adalah...',
    options: ['SSD NVMe', 'Harddisk (HDD)', 'RAM', 'ROM / Flash BIOS'],
    answer: 2,
    explanation: 'RAM (Random Access Memory) bersifat volatile, menyimpan data program sementara saat komputer menyala.'
  },
  {
    id: 'hw-2',
    category: 'hardware_os',
    question: 'Pasta yang dioleskan di antara permukaan prosesor (CPU) dan Heatsink/Fan berfungsi untuk...',
    options: [
      'Merekatkan CPU agar tidak lepas dari soket',
      'Menghantarkan panas dari CPU ke Heatsink secara optimal',
      'Mencegah arus pendek listrik pada motherboard',
      'Menambah kecepatan clock frekuensi prosesor'
    ],
    answer: 1,
    explanation: 'Thermal Paste mengisi celah mikroskopis antara CPU dan heatsink agar perpindahan panas berlangsung maksimal.'
  },
  {
    id: 'hw-3',
    category: 'hardware_os',
    question: 'Perintah dasar pada terminal Linux yang digunakan untuk mengubah hak akses (permission) baca/tulis/eksekusi sebuah file adalah...',
    options: ['chown', 'chmod', 'chroot', 'passwd'],
    answer: 1,
    explanation: 'chmod (change mode, misal: chmod 755 script.sh) mengubah permission read, write, dan execute file di Linux.'
  },
  {
    id: 'hw-4',
    category: 'hardware_os',
    question: 'Pada sistem operasi Linux, akun pengguna tertinggi (Superuser) yang memiliki akses penuh ke seluruh sistem disebut...',
    options: ['Administrator', 'Master', 'Root', 'Sudoer'],
    answer: 2,
    explanation: 'User tertinggi di Linux/Unix adalah root (ditandai dengan prompt # pada terminal).'
  },
  {
    id: 'hw-5',
    category: 'hardware_os',
    question: 'Proses pengecekan perangkat keras secara otomatis sesaat setelah komputer dinyalakan oleh BIOS/UEFI disebut...',
    options: ['BOOT', 'POST (Power-On Self-Test)', 'CMOS Check', 'Overclocking'],
    answer: 1,
    explanation: 'POST (Power-On Self-Test) memeriksa keberadaan dan fungsi CPU, RAM, VGA, dan keyboard saat PC baru menyala.'
  },
  {
    id: 'hw-6',
    category: 'hardware_os',
    question: 'Aplikasi perangkat lunak yang memungkinkan kita menjalankan beberapa sistem operasi virtual (Virtual Machine) sekaligus di dalam satu komputer fisik adalah...',
    options: [
      'VirtualBox / VMware / Proxmox',
      'Apache / Nginx',
      'PuTTY / WinSCP',
      'Wireshark / Packet Tracer'
    ],
    answer: 0,
    explanation: 'VirtualBox, VMware, dan Proxmox adalah perangkat lunak Hypervisor/Virtualisasi untuk menjalankan OS tamu.'
  },
  {
    id: 'hw-7',
    category: 'hardware_os',
    question: 'Komponen perangkat keras yang mengubah arus listrik AC dari PLN menjadi arus DC untuk menyuplai daya ke seluruh komponen PC adalah...',
    options: ['Stabilizer / AVR', 'Motherboard VRM', 'PSU (Power Supply Unit)', 'UPS'],
    answer: 2,
    explanation: 'PSU (Power Supply Unit) mengonversi arus AC 220V menjadi tegangan DC (12V, 5V, 3.3V) untuk komponen PC.'
  },
  {
    id: 'hw-8',
    category: 'hardware_os',
    question: 'Perintah CLI di Linux untuk melihat daftar file dan direktori di dalam folder yang sedang aktif adalah...',
    options: ['cd', 'pwd', 'ls', 'mkdir'],
    answer: 2,
    explanation: 'ls (list) menampilkan isi direktori, pwd menampilkan lokasi direktori saat ini, dan mkdir membuat folder baru.'
  },
  {
    id: 'hw-9',
    category: 'hardware_os',
    question: 'Jika pengaturan jam dan tanggal di BIOS selalu kembali ke pengaturan pabrik setiap kali kabel listrik PC dicabut, penyebab utamanya adalah...',
    options: [
      'Harddisk mengalami Bad Sector',
      'Baterai CMOS pada motherboard habis/lemah',
      'RAM kotor atau kurang rapat',
      'Sistem operasi terkena virus'
    ],
    answer: 1,
    explanation: 'Baterai CMOS (CR2032) menyuplai daya ke chip RTC/CMOS saat PC mati agar jam dan konfigurasi BIOS tetap tersimpan.'
  },
  {
    id: 'hw-10',
    category: 'hardware_os',
    question: 'Serangan siber yang membanjiri server target dengan trafik palsu dalam jumlah sangat besar hingga server down dan tidak bisa diakses pengguna asli disebut...',
    options: ['Phishing', 'SQL Injection', 'DDoS (Distributed Denial of Service)', 'Keylogger'],
    answer: 2,
    explanation: 'DDoS membanjiri bandwidth dan resource server dari banyak sumber hingga layanan lumpuh.'
  },
  {
    id: 'hw-11',
    category: 'hardware_os',
    question: 'Antarmuka (slot) penyimpanan modern pada motherboard yang memiliki kecepatan baca/tulis jauh lebih cepat dibanding kabel SATA III adalah...',
    options: ['IDE / PATA', 'M.2 NVMe (PCIe)', 'AGP Slot', 'Molex'],
    answer: 1,
    explanation: 'SSD M.2 NVMe menggunakan jalur PCIe berkecepatan tinggi (ribuan MB/s), jauh melampaui batas SATA III (600 MB/s).'
  },
  {
    id: 'hw-12',
    category: 'hardware_os',
    question: 'Dalam instalasi OS Linux, partisi khusus pada disk yang berfungsi sebagai memori cadangan (Virtual Memory) ketika RAM fisik mulai penuh adalah...',
    options: ['Partisi /boot', 'Partisi /home', 'Partisi Swap', 'Partisi EFI'],
    answer: 2,
    explanation: 'Swap space pada Linux digunakan sebagai ruang memori virtual tambahan di media penyimpanan.'
  },
  {
    id: 'hw-13',
    category: 'hardware_os',
    question: 'Jika komputer dinyalakan dan terdengar bunyi Beep berulang-ulang serta layar tidak tampil (No Display), komponen pertama yang paling sering perlu dibersihkan/dicek pemasangannya adalah...',
    options: ['DVD-ROM', 'RAM (Memory Module)', 'Kabel LAN', 'Mouse & Keyboard'],
    answer: 1,
    explanation: 'Bunyi beep berulang saat POST dengan layar gelap paling sering disebabkan oleh modul RAM yang kotor atau kendor.'
  },
  {
    id: 'hw-14',
    category: 'hardware_os',
    question: 'Malware berbahaya yang mengenkripsi (mengunci) seluruh file korban lalu meminta uang tebusan untuk membuka kuncinya disebut...',
    options: ['Adware', 'Spyware', 'Ransomware', 'Worm'],
    answer: 2,
    explanation: 'Ransomware menyandera data pengguna dengan enkripsi dan meminta tebusan (ransom).'
  },
  {
    id: 'hw-15',
    category: 'hardware_os',
    question: 'Pada Linux Debian/Ubuntu, perintah untuk memperbarui daftar paket dari repositori menggunakan APT adalah...',
    options: [
      'sudo apt update',
      'sudo apt install-all',
      'sudo yum refresh',
      'sudo dpkg --reset'
    ],
    answer: 0,
    explanation: 'sudo apt update memperbarui indeks/daftar paket dari server repositori Debian/Ubuntu.'
  },
  {
    id: 'hw-16',
    category: 'hardware_os',
    question: 'Bagian dari CPU yang bertugas khusus melakukan operasi perhitungan aritmatika (tambah, kurang) dan perbandingan logika adalah...',
    options: ['Control Unit (CU)', 'Register', 'ALU (Arithmetic Logic Unit)', 'L3 Cache'],
    answer: 2,
    explanation: 'ALU (Arithmetic Logic Unit) adalah sirkuit di dalam prosesor yang mengeksekusi operasi aritmatika dan logika.'
  }
];

const STORAGE_KEYS = {
  QUESTIONS: 'smk_surfers_questions_v1',
  CATEGORIES: 'smk_surfers_categories_v1'
};

class QuestionManagerClass {
  constructor() {
    this.categories = [];
    this.questions = [];
    this.recentIds = [];
    this.load();
  }

  load() {
    try {
      const savedCats = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      const savedQs = localStorage.getItem(STORAGE_KEYS.QUESTIONS);

      if (savedCats) {
        this.categories = JSON.parse(savedCats);
      } else {
        this.categories = JSON.parse(JSON.stringify(DEFAULT_CATEGORIES));
      }

      if (savedQs) {
        this.questions = JSON.parse(savedQs);
      } else {
        this.questions = JSON.parse(JSON.stringify(DEFAULT_QUESTIONS));
      }

      // Pastikan minimal ada soal
      if (!Array.isArray(this.questions) || this.questions.length === 0) {
        this.questions = JSON.parse(JSON.stringify(DEFAULT_QUESTIONS));
      }
      if (!Array.isArray(this.categories) || this.categories.length === 0) {
        this.categories = JSON.parse(JSON.stringify(DEFAULT_CATEGORIES));
      }
    } catch (e) {
      this.categories = JSON.parse(JSON.stringify(DEFAULT_CATEGORIES));
      this.questions = JSON.parse(JSON.stringify(DEFAULT_QUESTIONS));
    }
  }

  save() {
    try {
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(this.categories));
      localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(this.questions));
    } catch (e) {
      console.warn('Gagal menyimpan bank soal ke localStorage:', e);
    }
  }

  getCategories() {
    return this.categories;
  }

  getCategoryName(catId) {
    const found = this.categories.find(c => c.id === catId);
    return found ? found.name : catId;
  }

  addCategory(name, icon = '📘', color = '#3b82f6', desc = 'Mapel Kustom Guru') {
    const id = 'mapel_' + Date.now().toString(36);
    const newCat = { id, name: name.trim(), icon, color, desc };
    this.categories.push(newCat);
    this.save();
    return newCat;
  }

  getQuestions(categoryId = 'all') {
    if (!categoryId || categoryId === 'all') {
      return this.questions;
    }
    const filtered = this.questions.filter(q => q.category === categoryId);
    return filtered.length > 0 ? filtered : this.questions;
  }

  getRandomQuestion(categoryId = 'all') {
    const pool = this.getQuestions(categoryId);
    if (pool.length === 0) return DEFAULT_QUESTIONS[0];

    // Hindari soal berulang dalam 8 soal terakhir
    let candidates = pool.filter(q => !this.recentIds.includes(q.id));
    if (candidates.length === 0) {
      this.recentIds = [];
      candidates = pool;
    }

    const picked = candidates[Math.floor(Math.random() * candidates.length)];
    this.recentIds.push(picked.id);
    if (this.recentIds.length > Math.min(10, Math.floor(pool.length / 2))) {
      this.recentIds.shift();
    }

    // Kembalikan salinan soal
    return JSON.parse(JSON.stringify(picked));
  }

  addQuestion(data) {
    const newQ = {
      id: 'q_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 5),
      category: data.category || 'informatika',
      question: data.question.trim(),
      options: data.options.map(o => o.trim()),
      answer: Number(data.answer) || 0,
      explanation: (data.explanation || 'Jawaban benar sesuai materi pembelajaran SMK.').trim()
    };
    this.questions.unshift(newQ);
    this.save();
    return newQ;
  }

  updateQuestion(id, data) {
    const idx = this.questions.findIndex(q => q.id === id);
    if (idx === -1) return null;
    this.questions[idx] = {
      ...this.questions[idx],
      category: data.category || this.questions[idx].category,
      question: data.question.trim(),
      options: data.options.map(o => o.trim()),
      answer: Number(data.answer) || 0,
      explanation: (data.explanation || '').trim()
    };
    this.save();
    return this.questions[idx];
  }

  deleteQuestion(id) {
    if (this.questions.length <= 1) return false;
    this.questions = this.questions.filter(q => q.id !== id);
    this.save();
    return true;
  }

  resetToDefault() {
    this.categories = JSON.parse(JSON.stringify(DEFAULT_CATEGORIES));
    this.questions = JSON.parse(JSON.stringify(DEFAULT_QUESTIONS));
    this.recentIds = [];
    this.save();
  }

  exportJSON() {
    return JSON.stringify({
      version: 1,
      exportedAt: new Date().toISOString(),
      categories: this.categories,
      questions: this.questions
    }, null, 2);
  }

  importJSON(jsonStr) {
    const parsed = JSON.parse(jsonStr);
    if (parsed && Array.isArray(parsed.questions) && parsed.questions.length > 0) {
      // Validasi format soal
      const validQs = parsed.questions.filter(q =>
        q.question && Array.isArray(q.options) && q.options.length === 4 && typeof q.answer === 'number'
      );
      if (validQs.length === 0) {
        throw new Error('Tidak ada format soal yang valid di dalam file.');
      }
      if (Array.isArray(parsed.categories) && parsed.categories.length > 0) {
        this.categories = parsed.categories;
      }
      this.questions = validQs;
      this.save();
      return validQs.length;
    }
    throw new Error('Format JSON tidak dikenali.');
  }
}

window.QuestionManager = new QuestionManagerClass();
