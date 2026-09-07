-- =============================================================================
-- Adiwidia Admin — Supabase seed data
-- =============================================================================
-- Jalankan SETELAH 001_adiwidia_supabase_schema.sql di SQL Editor.
-- Data nama/deskripsi/cerita bersifat faktual ringkas.
-- URL media cultures/museum bersifat dummy; stories memakai URL YouTube embed.
-- Seeder ini TRUNCATE data tabel inti — jangan jalankan di DB yang sudah berisi data produksi.
-- =============================================================================

BEGIN;

TRUNCATE TABLE
  public.expenses,
  public.virtual_museum_items,
  public.stories,
  public.cultures,
  public.provinces,
  public.categories
RESTART IDENTITY CASCADE;

-- ---------------------------------------------------------------------------
-- Categories
-- ---------------------------------------------------------------------------

INSERT INTO public.categories (id, category_name, description, slug, created_at) VALUES
(1,  'Tari Tradisional',        'Tarian daerah yang diwariskan turun-temurun sebagai ekspresi budaya dan ritual.', 'tari-tradisional',        '2025-01-05 08:00:00+00'),
(2,  'Musik Tradisional',       'Alat musik dan genre musik daerah Nusantara.', 'musik-tradisional',       '2025-01-05 08:05:00+00'),
(3,  'Kerajinan',               'Karya tangan tradisional seperti batik, tenun, ukir, dan anyaman.', 'kerajinan',               '2025-01-05 08:10:00+00'),
(4,  'Kuliner',                 'Makanan dan minuman khas daerah yang menjadi identitas rasa lokal.', 'kuliner',                 '2025-01-05 08:15:00+00'),
(5,  'Ritual dan Adat',         'Upacara, tradisi, dan praktik adat masyarakat setempat.', 'ritual-dan-adat',         '2025-01-05 08:20:00+00'),
(6,  'Arsitektur Tradisional',  'Bentuk rumah dan bangunan adat dengan struktur serta simbol lokal.', 'arsitektur-tradisional',  '2025-01-05 08:25:00+00'),
(7,  'Pakaian Adat',            'Busana tradisional untuk upacara, pernikahan, dan identitas daerah.', 'pakaian-adat',            '2025-01-05 08:30:00+00'),
(8,  'Senjata Tradisional',     'Senjata pusaka dan senjata adat yang memiliki nilai sejarah.', 'senjata-tradisional',     '2025-01-05 08:35:00+00'),
(9,  'Pertunjukan',             'Seni panggung seperti wayang, randai, dan teater rakyat.', 'pertunjukan',             '2025-01-05 08:40:00+00'),
(10, 'Bahasa dan Sastra',       'Bahasa daerah, sastra lisan, pantun, dan naskah tradisional.', 'bahasa-dan-sastra',       '2025-01-05 08:45:00+00');

-- ---------------------------------------------------------------------------
-- Provinces (38)
-- ---------------------------------------------------------------------------

INSERT INTO public.provinces (id, name, description, slug, created_at) VALUES
(1,  'Aceh',                        'Provinsi di ujung barat Sumatera dengan warisan Islam, tari Saman, dan rumah adat Krong Bade.', 'aceh', '2025-01-06 09:00:00+00'),
(2,  'Sumatera Utara',              'Provinsi dengan keragaman Batak, Melayu, Nias, serta Danau Toba sebagai ikon geografis.', 'sumatera-utara', '2025-01-06 09:01:00+00'),
(3,  'Sumatera Barat',              'Tanah Minangkabau dengan adat matrilineal, Rumah Gadang, dan kuliner Padang.', 'sumatera-barat', '2025-01-06 09:02:00+00'),
(4,  'Riau',                        'Wilayah Melayu pesisir dengan tradisi zapin, pantun, dan sejarah perdagangan selat.', 'riau', '2025-01-06 09:03:00+00'),
(5,  'Jambi',                       'Provinsi di Sumatera tengah yang kaya situs Muaro Jambi dan budaya Melayu Jambi.', 'jambi', '2025-01-06 09:04:00+00'),
(6,  'Sumatera Selatan',            'Dikenal dengan Songket Palembang, rumah limas, dan sejarah Kerajaan Sriwijaya.', 'sumatera-selatan', '2025-01-06 09:05:00+00'),
(7,  'Bengkulu',                    'Provinsi pesisir barat Sumatera dengan tradisi Tabot dan kain Besurek.', 'bengkulu', '2025-01-06 09:06:00+00'),
(8,  'Lampung',                     'Gerbang Sumatera–Jawa dengan adat Pepadun dan Saibatin serta kain Tapis.', 'lampung', '2025-01-06 09:07:00+00'),
(9,  'Kepulauan Bangka Belitung',   'Kepulauan penghasil timah dengan budaya Melayu dan kuliner laut khas.', 'kepulauan-bangka-belitung', '2025-01-06 09:08:00+00'),
(10, 'Kepulauan Riau',              'Provinsi kepulauan Melayu dengan sejarah kerajaan dan jalur pelayaran.', 'kepulauan-riau', '2025-01-06 09:09:00+00'),
(11, 'DKI Jakarta',                 'Ibu kota negara dengan lapisan budaya Betawi, Melayu, Cina, Arab, dan modern.', 'dki-jakarta', '2025-01-06 09:10:00+00'),
(12, 'Jawa Barat',                  'Tanah Sunda dengan angklung, pencak silat, dan kesenian wayang golek.', 'jawa-barat', '2025-01-06 09:11:00+00'),
(13, 'Jawa Tengah',                 'Pusat budaya Jawa dengan borobudur–prambanan di sekitarnya serta batik dan gamelan.', 'jawa-tengah', '2025-01-06 09:12:00+00'),
(14, 'DI Yogyakarta',               'Daerah Istimewa dengan kraton, batik, wayang, dan pendidikan seni yang kuat.', 'di-yogyakarta', '2025-01-06 09:13:00+00'),
(15, 'Jawa Timur',                  'Provinsi dengan Reog Ponorogo, Ludruk, dan keragaman budaya pesisir–pedalaman.', 'jawa-timur', '2025-01-06 09:14:00+00'),
(16, 'Banten',                      'Provinsi barat Jawa dengan sejarah Kesultanan Banten dan Debus.', 'banten', '2025-01-06 09:15:00+00'),
(17, 'Bali',                        'Pulau dengan tradisi Hindu–Bali, tari sakral, dan upacara adat yang hidup.', 'bali', '2025-01-06 09:16:00+00'),
(18, 'Nusa Tenggara Barat',         'Lombok dan Sumbawa dengan budaya Sasak, Samawa, dan Mbojo.', 'nusa-tenggara-barat', '2025-01-06 09:17:00+00'),
(19, 'Nusa Tenggara Timur',         'Kepulauan dengan keragaman etnis, tenun ikat, dan tradisi komodo–Flores.', 'nusa-tenggara-timur', '2025-01-06 09:18:00+00'),
(20, 'Kalimantan Barat',            'Provinsi dengan budaya Dayak dan Melayu serta rumah panjang tradisional.', 'kalimantan-barat', '2025-01-06 09:19:00+00'),
(21, 'Kalimantan Tengah',           'Wilayah Dayak Ngaju dengan Sungai Kahayan dan tradisi Huma Betang.', 'kalimantan-tengah', '2025-01-06 09:20:00+00'),
(22, 'Kalimantan Selatan',          'Tanah Banjar dengan rumah bubungan tinggi dan seni pantun Banjar.', 'kalimantan-selatan', '2025-01-06 09:21:00+00'),
(23, 'Kalimantan Timur',            'Provinsi dengan keragaman Dayak Kutai dan sejarah kerajaan pesisir.', 'kalimantan-timur', '2025-01-06 09:22:00+00'),
(24, 'Kalimantan Utara',            'Provinsi termuda di Kalimantan dengan budaya Dayak dan pesisir.', 'kalimantan-utara', '2025-01-06 09:23:00+00'),
(25, 'Sulawesi Utara',              'Wilayah Minahasa, Sangihe, dan Talaud dengan tradisi kabasaran dan kuliner laut.', 'sulawesi-utara', '2025-01-06 09:24:00+00'),
(26, 'Sulawesi Tengah',             'Provinsi dengan budaya Kaili, Toraja Lore, dan situs megalitik.', 'sulawesi-tengah', '2025-01-06 09:25:00+00'),
(27, 'Sulawesi Selatan',            'Tanah Bugis–Makassar–Toraja dengan pinisi, rumah tongkonan, dan adat kuat.', 'sulawesi-selatan', '2025-01-06 09:26:00+00'),
(28, 'Sulawesi Tenggara',           'Wilayah Buton, Muna, dan Tolaki dengan tradisi maritim dan tenun.', 'sulawesi-tenggara', '2025-01-06 09:27:00+00'),
(29, 'Gorontalo',                   'Provinsi di semenanjung utara Sulawesi dengan adat Pohalaa dan kuliner biluhuta.', 'gorontalo', '2025-01-06 09:28:00+00'),
(30, 'Sulawesi Barat',              'Provinsi Mandar dengan budaya pelayaran dan tenun khas.', 'sulawesi-barat', '2025-01-06 09:29:00+00'),
(31, 'Maluku',                      'Kepulauan rempah dengan sejarah perdagangan dunia dan budaya baileo.', 'maluku', '2025-01-06 09:30:00+00'),
(32, 'Maluku Utara',                'Bekas pusat Kesultanan Ternate–Tidore dengan warisan rempah dan bahari.', 'maluku-utara', '2025-01-06 09:31:00+00'),
(33, 'Papua',                       'Provinsi di tanah Papua dengan keragaman suku dan seni noken.', 'papua', '2025-01-06 09:32:00+00'),
(34, 'Papua Barat',                 'Wilayah Kepala Burung Papua dengan budaya pesisir dan hutan.', 'papua-barat', '2025-01-06 09:33:00+00'),
(35, 'Papua Selatan',               'Provinsi baru dengan pusat di Merauke dan budaya Marind serta suku sekitar.', 'papua-selatan', '2025-01-06 09:34:00+00'),
(36, 'Papua Tengah',                'Provinsi pegunungan tengah Papua dengan keragaman suku dan adat setempat.', 'papua-tengah', '2025-01-06 09:35:00+00'),
(37, 'Papua Pegunungan',            'Wilayah pegunungan tinggi Papua dengan tradisi suku Wamena dan sekitarnya.', 'papua-pegunungan', '2025-01-06 09:36:00+00'),
(38, 'Papua Barat Daya',            'Provinsi baru di kawasan Sorong dengan budaya pesisir dan pulau-pulau barat.', 'papua-barat-daya', '2025-01-06 09:37:00+00');

-- ---------------------------------------------------------------------------
-- Cultures (faktual; URL dummy)
-- ---------------------------------------------------------------------------

INSERT INTO public.cultures (
  id, province_id, category_id, name, content, media_url, location, maps_url, slug, created_at
) VALUES
(1, 17, 1, 'Tari Kecak',
 '<p>Tari Kecak adalah tarian massal Bali yang menampilkan puluhan penari pria membentuk lingkaran sambil menyerukan “cak”. Kisahnya sering mengambil episode Ramayana, khususnya penyelamatan Sita.</p>',
 'https://placehold.co/800x600?text=Tari+Kecak', 'Ubud, Gianyar, Bali',
 'https://maps.example.com/placeholder/kecak', 'tari-kecak', '2025-03-12 10:00:00+00'),

(2, 17, 1, 'Tari Pendet',
 '<p>Tari Pendet awalnya merupakan tarian penyambutan di pura, lalu berkembang menjadi tarian penyambutan tamu yang menampilkan gerakan lembut dengan bokor berisi bunga.</p>',
 'https://placehold.co/800x600?text=Tari+Pendet', 'Denpasar, Bali',
 'https://maps.example.com/placeholder/pendet', 'tari-pendet', '2025-03-18 11:00:00+00'),

(3, 12, 2, 'Angklung',
 '<p>Angklung adalah alat musik multitonal dari bambu yang dimainkan dengan digoyang. Tradisi angklung Sunda diakui UNESCO sebagai Warisan Budaya Takbenda.</p>',
 'https://placehold.co/800x600?text=Angklung', 'Bandung, Jawa Barat',
 'https://maps.example.com/placeholder/angklung', 'angklung', '2025-04-02 09:30:00+00'),

(4, 13, 3, 'Batik Jawa',
 '<p>Batik adalah teknik pewarnaan kain dengan malam (wax-resist). Motif klasik seperti parang, kawung, dan truntum merefleksikan filosofi Jawa.</p>',
 'https://placehold.co/800x600?text=Batik+Jawa', 'Solo dan Pekalongan, Jawa Tengah',
 'https://maps.example.com/placeholder/batik', 'batik-jawa', '2025-04-10 14:00:00+00'),

(5, 14, 9, 'Wayang Kulit',
 '<p>Wayang kulit adalah seni pertunjukan bayangan dari kulit kerbau yang digarap menjadi tokoh pewayangan, diiringi gamelan dan dalang sebagai narator.</p>',
 'https://placehold.co/800x600?text=Wayang+Kulit', 'Yogyakarta',
 'https://maps.example.com/placeholder/wayang', 'wayang-kulit', '2025-04-22 16:00:00+00'),

(6, 3, 6, 'Rumah Gadang',
 '<p>Rumah Gadang adalah rumah adat Minangkabau dengan atap gonjong menyerupai tanduk kerbau. Bangunan ini mencerminkan sistem kekerabatan matrilineal.</p>',
 'https://placehold.co/800x600?text=Rumah+Gadang', 'Solok dan Tanah Datar, Sumatera Barat',
 'https://maps.example.com/placeholder/rumah-gadang', 'rumah-gadang', '2025-05-01 08:00:00+00'),

(7, 1, 1, 'Tari Saman',
 '<p>Tari Saman dari Aceh dimainkan secara duduk berbanjar dengan gerakan tepuk tangan, dada, dan tepukan paha yang cepat serta kompak. UNESCO mengakui Saman sebagai warisan takbenda.</p>',
 'https://placehold.co/800x600?text=Tari+Saman', 'Gayo Lues, Aceh',
 'https://maps.example.com/placeholder/saman', 'tari-saman', '2025-05-08 10:00:00+00'),

(8, 15, 1, 'Reog Ponorogo',
 '<p>Reog Ponorogo menampilkan penari berkepala singa berbulu merak (Dadak Merak) yang sangat berat, disertai jathilan dan tokoh warok dalam cerita rakyat lokal.</p>',
 'https://placehold.co/800x600?text=Reog+Ponorogo', 'Ponorogo, Jawa Timur',
 'https://maps.example.com/placeholder/reog', 'reog-ponorogo', '2025-05-15 12:00:00+00'),

(9, 27, 6, 'Tongkonan Toraja',
 '<p>Tongkonan adalah rumah adat Toraja dengan atap berbentuk perahu terbalik. Bangunan ini menjadi pusat upacara adat, terutama Rambu Solo’ dan Rambu Tuka’.</p>',
 'https://placehold.co/800x600?text=Tongkonan', 'Tana Toraja, Sulawesi Selatan',
 'https://maps.example.com/placeholder/tongkonan', 'tongkonan-toraja', '2025-05-20 09:00:00+00'),

(10, 6, 3, 'Songket Palembang',
 '<p>Songket Palembang adalah kain tenun mewah dengan benang emas atau perak. Motifnya dipakai pada upacara adat dan pernikahan Melayu Sumatera Selatan.</p>',
 'https://placehold.co/800x600?text=Songket+Palembang', 'Palembang, Sumatera Selatan',
 'https://maps.example.com/placeholder/songket', 'songket-palembang', '2025-06-01 11:00:00+00'),

(11, 11, 1, 'Tari Yapong',
 '<p>Tari Yapong adalah tarian kreasi Betawi yang terinspirasi kehidupan masyarakat pesisir Jakarta, sering ditampilkan dalam penyambutan dan festival budaya.</p>',
 'https://placehold.co/800x600?text=Tari+Yapong', 'Jakarta',
 'https://maps.example.com/placeholder/yapong', 'tari-yapong', '2025-06-08 13:00:00+00'),

(12, 2, 2, 'Gondang Batak',
 '<p>Gondang adalah ansambel musik tradisional Batak yang mengiringi upacara adat, dengan instrumen seperti taganing, gordang, dan sarune.</p>',
 'https://placehold.co/800x600?text=Gondang+Batak', 'Toba, Sumatera Utara',
 'https://maps.example.com/placeholder/gondang', 'gondang-batak', '2025-06-14 15:00:00+00'),

(13, 8, 3, 'Kain Tapis Lampung',
 '<p>Tapis adalah kain sulam Lampung yang dihias benang emas. Motifnya mengandung makna sosial dan spiritual bagi masyarakat Lampung.</p>',
 'https://placehold.co/800x600?text=Kain+Tapis', 'Bandar Lampung',
 'https://maps.example.com/placeholder/tapis', 'kain-tapis-lampung', '2025-06-20 10:00:00+00'),

(14, 19, 3, 'Tenun Ikat NTT',
 '<p>Tenun ikat Nusa Tenggara Timur dibuat dengan teknik mengikat benang sebelum dicelup, menghasilkan motif geometris khas tiap pulau dan suku.</p>',
 'https://placehold.co/800x600?text=Tenun+Ikat+NTT', 'Sumba dan Flores, NTT',
 'https://maps.example.com/placeholder/tenun-ikat', 'tenun-ikat-ntt', '2025-07-01 09:00:00+00'),

(15, 20, 6, 'Rumah Panjang Dayak',
 '<p>Rumah panjang (betang) adalah hunian komunal masyarakat Dayak yang menampung banyak keluarga dalam satu bangunan memanjang di atas tiang.</p>',
 'https://placehold.co/800x600?text=Rumah+Panjang', 'Kapuas Hulu, Kalimantan Barat',
 'https://maps.example.com/placeholder/rumah-panjang', 'rumah-panjang-dayak', '2025-07-05 11:00:00+00'),

(16, 31, 5, 'Baileo Maluku',
 '<p>Baileo adalah rumah adat sekaligus balai pertemuan masyarakat Maluku untuk musyawarah adat dan upacara penting komunitas.</p>',
 'https://placehold.co/800x600?text=Baileo', 'Ambon dan Lease, Maluku',
 'https://maps.example.com/placeholder/baileo', 'baileo-maluku', '2025-07-12 14:00:00+00'),

(17, 33, 3, 'Noken Papua',
 '<p>Noken adalah tas anyaman tradisional Papua yang dipakai dengan digantung di kepala. UNESCO mengakui noken sebagai warisan budaya takbenda yang perlu dilindungi.</p>',
 'https://placehold.co/800x600?text=Noken+Papua', 'Jayapura dan pegunungan Papua',
 'https://maps.example.com/placeholder/noken', 'noken-papua', '2025-07-18 08:00:00+00'),

(18, 4, 1, 'Tari Zapin',
 '<p>Zapin adalah tarian Melayu yang dipengaruhi budaya Arab, biasa diiringi gambus dan gendang, populer di Riau dan pesisir Melayu lainnya.</p>',
 'https://placehold.co/800x600?text=Tari+Zapin', 'Pekanbaru, Riau',
 'https://maps.example.com/placeholder/zapin', 'tari-zapin', '2025-07-25 16:00:00+00'),

(19, 16, 5, 'Debus Banten',
 '<p>Debus adalah atraksi bela diri spiritual dari Banten yang menampilkan kekebalan tubuh dalam konteks seni pertunjukan dan sejarah tarekat.</p>',
 'https://placehold.co/800x600?text=Debus+Banten', 'Serang, Banten',
 'https://maps.example.com/placeholder/debus', 'debus-banten', '2025-08-01 10:00:00+00'),

(20, 27, 8, 'Badik Bugis',
 '<p>Badik adalah senjata tikam tradisional Bugis–Makassar yang juga berfungsi sebagai simbol kehormatan dan kelengkapan adat pria.</p>',
 'https://placehold.co/800x600?text=Badik+Bugis', 'Makassar, Sulawesi Selatan',
 'https://maps.example.com/placeholder/badik', 'badik-bugis', '2025-08-08 12:00:00+00'),

(21, 13, 8, 'Keris Jawa',
 '<p>Keris adalah senjata tikam bermata indah dengan pamor khas. Di Jawa, keris dipandang sebagai pusaka yang menyimpan nilai spiritual dan status sosial.</p>',
 'https://placehold.co/800x600?text=Keris+Jawa', 'Surakarta, Jawa Tengah',
 'https://maps.example.com/placeholder/keris', 'keris-jawa', '2025-08-15 09:00:00+00'),

(22, 3, 4, 'Rendang Minangkabau',
 '<p>Rendang adalah masakan daging berbumbu rempah yang dimasak lama hingga kering. Hidangan ini berasal dari Minangkabau dan dikenal luas di dunia.</p>',
 'https://placehold.co/800x600?text=Rendang', 'Padang, Sumatera Barat',
 'https://maps.example.com/placeholder/rendang', 'rendang-minangkabau', '2025-08-20 11:00:00+00'),

(23, 14, 7, 'Busana Pengantin Yogyakarta',
 '<p>Busana pengantin gaya Yogyakarta menampilkan kebaya, kain batik motif klasik, serta aksesoris paesan yang mencerminkan tata krama kraton.</p>',
 'https://placehold.co/800x600?text=Pengantin+Yogyakarta', 'Kota Yogyakarta',
 'https://maps.example.com/placeholder/busana-yogya', 'busana-pengantin-yogyakarta', '2025-08-28 13:00:00+00'),

(24, 25, 1, 'Tari Kabasaran',
 '<p>Kabasaran adalah tarian perang tradisional Minahasa yang menampilkan kostum merah, senjata tradisional, dan gerakan gagah sebagai simbol keberanian.</p>',
 'https://placehold.co/800x600?text=Tari+Kabasaran', 'Minahasa, Sulawesi Utara',
 'https://maps.example.com/placeholder/kabasaran', 'tari-kabasaran', '2025-09-01 10:00:00+00'),

(25, 18, 5, 'Peresean Sasak',
 '<p>Peresean adalah tradisi adu ketangkasan masyarakat Sasak di Lombok menggunakan rotan dan perisai, kini sering ditampilkan dalam festival budaya.</p>',
 'https://placehold.co/800x600?text=Peresean', 'Lombok, NTB',
 'https://maps.example.com/placeholder/peresean', 'peresean-sasak', '2025-09-05 15:00:00+00'),

(26, 12, 9, 'Wayang Golek',
 '<p>Wayang golek adalah boneka kayu tiga dimensi khas Sunda yang dimainkan dalang, biasanya menyajikan lakon Mahabharata, Ramayana, atau cerita lokal.</p>',
 'https://placehold.co/800x600?text=Wayang+Golek', 'Bandung dan Priangan, Jawa Barat',
 'https://maps.example.com/placeholder/wayang-golek', 'wayang-golek', '2025-09-10 09:00:00+00'),

(27, 5, 10, 'Seloko Adat Jambi',
 '<p>Seloko adalah sastra lisan berupa pantun nasihat dalam adat Melayu Jambi yang dipakai saat upacara dan penyelesaian sengketa secara damai.</p>',
 'https://placehold.co/800x600?text=Seloko+Jambi', 'Jambi',
 'https://maps.example.com/placeholder/seloko', 'seloko-adat-jambi', '2025-09-15 11:00:00+00'),

(28, 22, 4, 'Soto Banjar',
 '<p>Soto Banjar adalah soto khas Kalimantan Selatan dengan kuah kuning rempah, bihun, dan suwiran ayam, sering disajikan pada acara adat dan harian.</p>',
 'https://placehold.co/800x600?text=Soto+Banjar', 'Banjarmasin, Kalimantan Selatan',
 'https://maps.example.com/placeholder/soto-banjar', 'soto-banjar', '2025-09-20 08:00:00+00');

-- ---------------------------------------------------------------------------
-- Stories (cerita rakyat; video YouTube)
-- ---------------------------------------------------------------------------

INSERT INTO public.stories (
  id, province_id, title, content_text, content_video_url, slug, created_at
) VALUES
-- SUMATERA
(1, 1, 'Legenda Tapak Tuan',
 '<p>Cerita rakyat dari Aceh tentang pertarungan seorang petapa raksasa dengan naga.</p>',
 'https://www.youtube.com/embed/4HetfKadXPc', 'legenda-tapak-tuan', '2025-01-07 10:00:00+00'),
(2, 2, 'Asal Usul Danau Toba',
 '<p>Legenda dari Sumatera Utara mengenai seorang pemuda yang menikahi jelmaan ikan mas yang berujung pada terciptanya Danau Toba.</p>',
 'https://www.youtube.com/embed/CapRqHdluYM', 'asal-usul-danau-toba', '2025-01-07 10:01:00+00'),
(3, 6, 'Legenda Si Pahit Lidah',
 '<p>Cerita rakyat dari Sumatera Selatan tentang Serunting Sakti yang sumpah serapahnya selalu menjadi kenyataan.</p>',
 'https://www.youtube.com/embed/0EUS0u9Cees', 'legenda-si-pahit-lidah', '2025-01-07 10:02:00+00'),

-- JAWA & BANTEN
(4, 12, 'Asal Usul Telaga Warna',
 '<p>Kisah putri raja yang manja di Jawa Barat, di mana air matanya menciptakan danau bernama Telaga Warna.</p>',
 'https://www.youtube.com/embed/hnWeLPak2_0', 'asal-usul-telaga-warna', '2025-01-07 10:03:00+00'),
(5, 12, 'Asal Usul Indramayu',
 '<p>Cerita rakyat dari Jawa Barat mengenai sejarah dan asal-usul nama wilayah Indramayu.</p>',
 'https://www.youtube.com/embed/G6QYyr1ysR8', 'asal-usul-indramayu', '2025-01-07 10:04:00+00'),
(6, 12, 'Legenda Lutung Kasarung',
 '<p>Kisah Purbasari dan seekor kera sakti (Lutung) yang membantunya mendapatkan kembali haknya di Jawa Barat.</p>',
 'https://www.youtube.com/embed/CeOAeI6A6rE', 'legenda-lutung-kasarung', '2025-01-07 10:05:00+00'),
(7, 12, 'Asal Usul Kota Bandung',
 '<p>Kisah Sangkuriang dan Dayang Sumbi yang menjadi legenda terbentuknya Gunung Tangkuban Perahu dan sekitarnya.</p>',
 'https://www.youtube.com/embed/-7Pyqhloctg', 'asal-usul-kota-bandung', '2025-01-07 10:06:00+00'),
(8, 12, 'Legenda Situ Bagendit',
 '<p>Kisah dari Jawa Barat tentang keserakahan Nyai Endit yang berujung petaka dan menciptakan sebuah danau.</p>',
 'https://www.youtube.com/embed/2e7xT0XxkRQ', 'legenda-situ-bagendit', '2025-01-07 10:07:00+00'),
(9, 13, 'Kisah Si Wuragil: 7 Bersaudara & Sepatu Wasiat',
 '<p>Cerita rakyat Jawa Tengah tentang Si Wuragil yang cerdik bersama saudara-saudaranya.</p>',
 'https://www.youtube.com/embed/lgkdn3ZYrWo', 'kisah-si-wuragil', '2025-01-07 10:08:00+00'),
(10, 13, 'Asal Usul Rawa Pening',
 '<p>Kisah Baru Klinting yang mencabut lidi sakti dan menenggelamkan desa hingga menjadi Rawa Pening di Jawa Tengah.</p>',
 'https://www.youtube.com/embed/1fBJx_5k-7A', 'asal-usul-rawa-pening', '2025-01-07 10:09:00+00'),
(11, 13, 'Asal Usul Nusakambangan',
 '<p>Cerita rakyat Jawa Tengah yang mengisahkan legenda asal mula terbentuknya Pulau Nusakambangan.</p>',
 'https://www.youtube.com/embed/lIwlFgVnzxs', 'asal-usul-nusakambangan', '2025-01-07 10:10:00+00'),
(12, 15, 'Asal Usul Banyuwangi',
 '<p>Kisah kesetiaan seorang istri (Sri Tanjung) yang menjadi legenda asal mula nama daerah Banyuwangi di Jawa Timur.</p>',
 'https://www.youtube.com/embed/h3IbQMNAtgU', 'asal-usul-banyuwangi', '2025-01-07 10:11:00+00'),
(13, 15, 'Asal Usul Bojonegoro',
 '<p>Cerita rakyat dari Jawa Timur yang mengisahkan sejarah penamaan daerah Bojonegoro.</p>',
 'https://www.youtube.com/embed/wbhuS3Rj1VU', 'asal-usul-bojonegoro', '2025-01-07 10:12:00+00'),
(14, 15, 'Legenda Kalarahu',
 '<p>Mitos Gerhana Bulan dari Jawa Timur tentang raksasa Kalarahu yang mencoba menelan bulan.</p>',
 'https://www.youtube.com/embed/GxAzKi4Qpbs', 'legenda-kalarahu', '2025-01-07 10:13:00+00'),
(15, 15, 'Asal Usul Tulungagung',
 '<p>Kisah dari Jawa Timur mengenai asal mula wilayah Tulungagung.</p>',
 'https://www.youtube.com/embed/bJ4A0eXZPmI', 'asal-usul-tulungagung', '2025-01-07 10:14:00+00'),
(16, 16, 'Legenda Tanjung Lesung',
 '<p>Cerita rakyat dari Banten mengenai asal usul wilayah pesisir Tanjung Lesung.</p>',
 'https://www.youtube.com/embed/LWFnGUZxcm4', 'legenda-tanjung-lesung', '2025-01-07 10:15:00+00'),
(17, 16, 'Legenda Batu Kuwung',
 '<p>Kisah dari Banten tentang seseorang yang mengusir pengemis hingga hidupnya hancur.</p>',
 'https://www.youtube.com/embed/_tRAOeaD8qM', 'legenda-batu-kuwung', '2025-01-07 10:16:00+00'),

-- BALI & NUSA TENGGARA
(18, 17, 'Legenda Calon Arang',
 '<p>Kisah dari Bali tentang seorang penyihir sakti penguasa ilmu hitam yang menebar wabah mematikan.</p>',
 'https://www.youtube.com/embed/1uc_t0F4fIY', 'legenda-calon-arang', '2025-01-07 10:17:00+00'),
(19, 17, 'Asal Usul Buleleng Dan Singaraja',
 '<p>Sejarah dan legenda asal mula nama Buleleng dan Singaraja di utara pulau Bali.</p>',
 'https://www.youtube.com/embed/VseWNRqJ-Q8', 'asal-usul-buleleng-singaraja', '2025-01-07 10:18:00+00'),
(20, 17, 'Legenda Garuda Wisnu Kencana',
 '<p>Kisah mitologi di Bali tentang bakti seekor burung Garuda kepada ibunya.</p>',
 'https://www.youtube.com/embed/8OHA_hPX-ww', 'legenda-garuda-wisnu-kencana', '2025-01-07 10:19:00+00'),
(21, 18, 'Legenda Gunung Rinjani',
 '<p>Kisah legenda tentang Gunung Rinjani yang berasal dari Pulau Lombok, Nusa Tenggara Barat.</p>',
 'https://www.youtube.com/embed/Pa_3u51dqWw', 'legenda-gunung-rinjani', '2025-01-07 10:20:00+00'),
(22, 18, 'Legenda Putri Mandalika',
 '<p>Cerita rakyat Lombok tentang pengorbanan seorang putri cantik yang menceburkan diri ke laut.</p>',
 'https://www.youtube.com/embed/S7qH6gUKgZY', 'legenda-putri-mandalika', '2025-01-07 10:21:00+00'),

-- KALIMANTAN
(23, 20, 'Legenda Batu Menangis',
 '<p>Kisah dari Kalimantan Barat tentang anak gadis durhaka yang dikutuk menjadi batu yang menangis.</p>',
 'https://www.youtube.com/embed/qu00d1Lv1M8', 'legenda-batu-menangis', '2025-01-07 10:22:00+00'),
(24, 22, 'Putri Junjung Buih',
 '<p>Kisah legendaris dari Kalimantan Selatan mengenai putri cantik yang muncul dari buih sungai.</p>',
 'https://www.youtube.com/embed/-dVW4P9qdyo', 'putri-junjung-buih', '2025-01-07 10:23:00+00'),
(25, 23, 'Asal Usul Danau Lipan',
 '<p>Legenda dari Kalimantan Timur tentang seorang putri sakti yang menolak pinangan dan menciptakan Danau Lipan.</p>',
 'https://www.youtube.com/embed/OIRo7H5IgCo', 'asal-usul-danau-lipan', '2025-01-07 10:24:00+00'),
(26, 23, 'Legenda Pesut Mahakam',
 '<p>Cerita rakyat dari Kalimantan Timur mengenai dua anak yang berubah menjadi pesut di Sungai Mahakam.</p>',
 'https://www.youtube.com/embed/9qBcG6dfbPo', 'legenda-pesut-mahakam', '2025-01-07 10:25:00+00'),

-- SULAWESI & INDONESIA UMUM
(27, 27, 'Legenda I Laurang',
 '<p>Cerita rakyat dari Sulawesi Selatan tentang manusia yang terlahir dalam wujud udang.</p>',
 'https://www.youtube.com/embed/tU42XEH3Z_E', 'legenda-i-laurang', '2025-01-07 10:26:00+00'),
(28, 30, 'Legenda Samba Paria',
 '<p>Cerita rakyat dari tanah Mandar (Sulawesi Barat) tentang sayur paria dan sifat kikir manusia.</p>',
 'https://www.youtube.com/embed/wALwBK1z7bQ', 'legenda-samba-paria', '2025-01-07 10:27:00+00'),
(29, 13, 'Kisah Bawang Merah dan Bawang Putih',
 '<p>Cerita rakyat populer nusantara tentang dua saudara dengan sifat berbeda. (Dialokasikan ke Jawa Tengah/umum)</p>',
 'https://www.youtube.com/embed/XYKYCVb1oCU', 'kisah-bawang-merah-dan-bawang-putih', '2025-01-07 10:28:00+00'),

-- PAPUA
(30, 33, 'Biwar Sang Penakluk Naga',
 '<p>Cerita rakyat Papua mengenai seorang pemuda pemberani bernama Biwar yang berjuang menaklukkan naga.</p>',
 'https://www.youtube.com/embed/psNkh6nAW1E', 'biwar-sang-penakluk-naga', '2025-01-07 10:29:00+00');

-- ---------------------------------------------------------------------------
-- Virtual museum items (artefak faktual; media_3d_url dummy)
-- ---------------------------------------------------------------------------

INSERT INTO public.virtual_museum_items (
  id, province_id, category_id, name, description, content, media_3d_url, slug, created_at
) VALUES
(1, 13, 8, 'Keris Pamor Ngulit Semangka',
 'Keris dengan motif pamor menyerupai kulit semangka, sering dikaitkan dengan keanggunan dan status pemiliknya.',
 '<p>Koleksi virtual ini menampilkan bentuk bilah, ganja, dan warangka gaya Jawa. Detail pamor dibuat untuk edukasi pengenalan pusaka.</p>',
 'https://example.com/models/keris-ngulit-semangka.glb', 'keris-pamor-ngulit-semangka', '2025-04-01 10:00:00+00'),

(2, 14, 9, 'Wayang Kulit Arjuna',
 'Figur wayang kulit tokoh Arjuna dari epik Mahabharata, dikenal sebagai ksatria yang anggun dan fokus.',
 '<p>Model menampilkan tatahan kulit, gapit, dan pewarnaan klasik Yogyakarta/Surakarta untuk pengenalan ikonografi pewayangan.</p>',
 'https://example.com/models/wayang-arjuna.glb', 'wayang-kulit-arjuna', '2025-04-12 11:00:00+00'),

(3, 12, 2, 'Angklung Udjo Unit',
 'Satu unit angklung bambu nada tertentu yang menjadi bagian dari orkestra angklung.',
 '<p>Objek 3D ini memperlihatkan tabung bambu bernada dan rangka pengikat khas angklung Sunda.</p>',
 'https://example.com/models/angklung-unit.glb', 'angklung-udjo-unit', '2025-05-03 09:00:00+00'),

(4, 17, 7, 'Udeng Bali',
 'Penutup kepala tradisional pria Bali yang dipakai dalam upacara dan aktivitas adat sehari-hari.',
 '<p>Model virtual menampilkan lipatan kain udeng serta variasi warna yang umum di Bali.</p>',
 'https://example.com/models/udeng-bali.glb', 'udeng-bali', '2025-05-18 14:00:00+00'),

(5, 3, 6, 'Miniatur Rumah Gadang',
 'Replika edukatif Rumah Gadang Minangkabau untuk mengenalkan struktur atap gonjong dan ruang adat.',
 '<p>Model memperlihatkan tiang, dinding, dan atap bergonjong khas Sumatera Barat.</p>',
 'https://example.com/models/miniatur-rumah-gadang.glb', 'miniatur-rumah-gadang', '2025-06-02 10:00:00+00'),

(6, 6, 3, 'Selendang Songket Palembang',
 'Kain songket dengan motif lepus atau bunga yang umum pada busana adat Sumatera Selatan.',
 '<p>Detail tenunan benang metalik divisualisasikan untuk menunjukkan kerumitan teknik songket.</p>',
 'https://example.com/models/songket-palembang.glb', 'selendang-songket-palembang', '2025-06-21 12:00:00+00'),

(7, 27, 6, 'Miniatur Tongkonan',
 'Replika rumah Tongkonan Toraja dengan atap melengkung khas dan ukiran simbolik.',
 '<p>Model edukasi ini menekankan bentuk atap dan ukiran pada dinding depan tongkonan.</p>',
 'https://example.com/models/miniatur-tongkonan.glb', 'miniatur-tongkonan', '2025-07-07 08:00:00+00'),

(8, 15, 1, 'Topeng Dadak Merak Reog',
 'Kepala topeng Reog dengan ornamen bulu merak yang menjadi ikon Ponorogo.',
 '<p>Visual 3D menampilkan struktur rangka dan lapisan ornamen untuk memahami beban serta estetika Dadak Merak.</p>',
 'https://example.com/models/dadak-merak.glb', 'topeng-dadak-merak-reog', '2025-07-22 15:00:00+00'),

(9, 33, 3, 'Noken Anyaman',
 'Tas anyaman Papua yang multifungsi untuk membawa hasil kebun, kayu bakar, hingga bayi.',
 '<p>Model memperlihatkan pola anyaman dan tali gantung khas noken.</p>',
 'https://example.com/models/noken-anyaman.glb', 'noken-anyaman', '2025-08-05 11:00:00+00'),

(10, 1, 7, 'Rencong Aceh',
 'Senjata tikam tradisional Aceh yang juga menjadi simbol identitas budaya.',
 '<p>Objek virtual menampilkan lengkung bilah rencong dan hulu khas untuk pengenalan pusaka Aceh.</p>',
 'https://example.com/models/rencong-aceh.glb', 'rencong-aceh', '2025-08-19 09:00:00+00'),

(11, 19, 3, 'Kain Tenun Ikat Sumba',
 'Kain tenun ikat Sumba dengan motif hewan dan geometris yang sarat makna adat.',
 '<p>Model edukasi menampilkan tekstur kain dan ragam motif yang sering muncul pada tenun Sumba.</p>',
 'https://example.com/models/tenun-ikat-sumba.glb', 'kain-tenun-ikat-sumba', '2025-09-03 13:00:00+00'),

(12, 11, 7, 'Baju Sadariah Betawi',
 'Busana pria Betawi berupa baju koko panjang dilengkapi peci, sering dipakai pada acara adat.',
 '<p>Visualisasi 3D memperkenalkan potongan baju Sadariah sebagai bagian identitas Betawi.</p>',
 'https://example.com/models/baju-sadariah.glb', 'baju-sadariah-betawi', '2025-09-18 10:00:00+00');

-- ---------------------------------------------------------------------------
-- Reset sequences
-- ---------------------------------------------------------------------------

SELECT setval(pg_get_serial_sequence('public.categories', 'id'), (SELECT MAX(id) FROM public.categories));
SELECT setval(pg_get_serial_sequence('public.provinces', 'id'), (SELECT MAX(id) FROM public.provinces));
SELECT setval(pg_get_serial_sequence('public.cultures', 'id'), (SELECT MAX(id) FROM public.cultures));
SELECT setval(pg_get_serial_sequence('public.stories', 'id'), (SELECT MAX(id) FROM public.stories));
SELECT setval(pg_get_serial_sequence('public.virtual_museum_items', 'id'), (SELECT MAX(id) FROM public.virtual_museum_items));

COMMIT;
