-- =============================================================================
-- Adiwidia — replace stories only (from 002 seeder)
-- =============================================================================
-- Jalankan di Supabase project Adiwidia (llvkwvkslocqvmtapqfa) → SQL Editor.
-- Hanya menimpa public.stories. Tabel lain tidak disentuh.
-- =============================================================================

BEGIN;

DELETE FROM public.stories;

INSERT INTO public.stories (
  id, province_id, title, content_text, content_video_url, slug, created_at
) VALUES
-- SUMATERA
(1, 1, 'Legenda Tapak Tuan',
 '<p>Pada zaman dahulu, di pesisir selatan Aceh hiduplah seorang petapa bertubuh raksasa bernama Tuan Tapa. Ia menetap di sebuah gua dekat laut dan menghabiskan waktunya untuk berdoa serta menjauhkan diri dari urusan dunia. Masyarakat mengenalnya sebagai sosok sakti yang jarang menampakkan diri. Kawasan tersebut kemudian dikenal sebagai Tapak Tuan karena jejak kakinya dipercaya tertinggal pada batu di tepi pantai.</p>

<p>Suatu hari, sepasang naga menemukan seorang bayi perempuan yang terombang-ambing di laut setelah kapal keluarganya diterjang badai. Kedua naga itu menyelamatkan dan merawatnya seperti anak mereka sendiri. Beberapa tahun kemudian, orang tua kandung sang anak datang mencarinya. Mereka mengenali putri mereka dan memohon agar kedua naga mengembalikannya, tetapi permintaan tersebut ditolak karena para naga merasa telah membesarkannya.</p>

<p>Penolakan itu menimbulkan pertengkaran besar. Kedua naga menyerang orang tua sang anak dan membuat laut di sekitar pesisir bergelora. Tuan Tapa yang sedang bertapa mendengar keributan tersebut. Mengetahui ada manusia terancam, ia keluar dari guanya dan mencoba menghentikan para naga. Namun, nasihatnya tidak dihiraukan sehingga pertarungan dahsyat pun tidak dapat dihindari.</p>

<p>Dalam pertempuran itu, Tuan Tapa mengerahkan seluruh kesaktiannya. Ia berdiri kokoh di atas batu karang, meninggalkan jejak kaki raksasa ketika melompat untuk menghadapi kedua naga. Setelah pertarungan sengit, Tuan Tapa berhasil mengalahkan mereka dan menyelamatkan keluarga tersebut. Bekas pertempuran dipercaya menjelma menjadi sejumlah batu dengan bentuk menyerupai bagian tubuh naga yang kini dikaitkan dengan berbagai lokasi di sekitar Tapak Tuan.</p>

<p>Sang anak akhirnya kembali kepada orang tua kandungnya, sedangkan Tuan Tapa melanjutkan pertapaannya hingga akhir hayat. Kisah ini mengajarkan keberanian untuk membela mereka yang terancam serta pentingnya menyelesaikan perselisihan dengan bijaksana. Jejak kaki Tuan Tapa tetap menjadi simbol kuat dalam cerita rakyat Aceh dan diwariskan dari generasi ke generasi.</p>
',
 'https://www.youtube.com/embed/4HetfKadXPc', 'legenda-tapak-tuan', '2025-01-07 10:00:00+00'),
(2, 2, 'Asal Usul Danau Toba',
 '<p>Pada zaman dahulu, di sebuah lembah subur di Sumatera Utara, hiduplah seorang pemuda rajin bernama Toba. Ia bekerja sebagai petani dan mencari ikan di sungai untuk memenuhi kebutuhan sehari-hari. Suatu petang, Toba berhasil menangkap seekor ikan mas berwarna keemasan. Ketika hendak dimasak, ikan itu tiba-tiba berubah menjadi seorang perempuan cantik.</p>

<p>Perempuan tersebut menjelaskan bahwa dirinya adalah makhluk jelmaan yang terbebas dari kutukan setelah ditangkap oleh Toba. Keduanya kemudian saling menyukai dan sepakat menikah. Namun, sang perempuan mengajukan satu syarat: Toba tidak boleh mengungkapkan kepada siapa pun bahwa istrinya pernah menjadi seekor ikan. Toba menyetujui syarat itu, lalu mereka hidup bahagia dan dikaruniai seorang anak bernama Samosir.</p>

<p>Samosir tumbuh menjadi anak yang sehat, tetapi ia memiliki kebiasaan makan berlebihan dan terkadang sulit menjalankan perintah orang tuanya. Pada suatu hari, ibunya meminta Samosir mengantarkan makanan kepada Toba yang sedang bekerja di ladang. Karena merasa lapar di tengah perjalanan, Samosir memakan sebagian besar bekal tersebut. Toba yang lelah dan lapar menjadi sangat marah ketika melihat makanan yang tersisa hanya sedikit.</p>

<p>Dalam kemarahannya, Toba tanpa sadar berteriak dan menyebut Samosir sebagai anak ikan. Ucapan itu melanggar janji yang pernah ia berikan kepada istrinya. Seketika langit menjadi gelap, petir menyambar, dan hujan turun dengan sangat deras. Sang ibu menyuruh Samosir berlari menuju bukit, sementara air terus keluar dari tanah dan menenggelamkan seluruh lembah.</p>

<p>Genangan tersebut semakin luas hingga membentuk sebuah danau besar yang kemudian dikenal sebagai Danau Toba. Bukit tempat Samosir menyelamatkan diri berubah menjadi pulau di tengah danau dan dinamakan Pulau Samosir. Legenda ini mengajarkan pentingnya menjaga janji, mengendalikan amarah, menaati orang tua, serta mempertimbangkan akibat dari setiap ucapan yang disampaikan.</p>
',
 'https://www.youtube.com/embed/CapRqHdluYM', 'asal-usul-danau-toba', '2025-01-07 10:01:00+00'),
(3, 6, 'Legenda Si Pahit Lidah',
 '<p>Pada zaman dahulu, di wilayah Sumatera Selatan, hiduplah seorang pemuda bernama Serunting. Ia dikenal kuat, keras hati, dan mudah tersulut amarah. Serunting memiliki seorang ipar bernama Aria Tebing. Keduanya menggarap ladang yang bersebelahan dan dipisahkan oleh sebatang pohon. Pada sisi Aria Tebing tumbuh jamur yang berubah menjadi emas, sedangkan jamur di sisi Serunting hanya menjadi tumbuhan biasa.</p>

<p>Serunting merasa Aria Tebing telah berbuat curang. Perselisihan kecil itu berkembang menjadi pertengkaran hingga keduanya sepakat bertarung. Aria Tebing mengetahui bahwa kelemahan Serunting berada pada rumput ilalang yang bergetar meskipun tidak tertiup angin. Dalam pertempuran, Aria Tebing menancapkan tombaknya pada ilalang tersebut sehingga Serunting terluka dan terpaksa melarikan diri.</p>

<p>Merasa dipermalukan, Serunting pergi ke Gunung Siguntang untuk menenangkan diri sekaligus memperdalam kesaktiannya. Di sana ia bertapa dalam waktu yang lama. Setelah menyelesaikan pertapaan, Serunting memperoleh kemampuan luar biasa: setiap perkataan buruk yang keluar dari mulutnya dapat berubah menjadi kenyataan. Sejak saat itu, masyarakat menjulukinya Si Pahit Lidah.</p>

<p>Dalam perjalanannya, Serunting menggunakan kesaktiannya tanpa mempertimbangkan akibat. Ketika melihat pepohonan, hewan, atau manusia yang membuatnya kesal, ia mengucapkan sumpah serapah dan mengubah mereka menjadi batu. Jejak kutukannya dipercaya tersebar di berbagai tempat. Puncak persoalan terjadi saat kemarahannya menyebabkan orang-orang tidak bersalah ikut menerima hukuman yang tidak semestinya.</p>

<p>Setelah menyaksikan penderitaan yang ditimbulkan oleh perkataannya, Serunting mulai menyadari bahwa kesaktian tanpa kebijaksanaan hanya membawa malapetaka. Ia menyesali kesombongan dan kebiasaannya melampiaskan amarah melalui ucapan. Kisah Si Pahit Lidah mengingatkan bahwa kata-kata dapat meninggalkan akibat besar. Karena itu, manusia harus mengendalikan emosi, tidak mudah menuduh orang lain, dan menggunakan kemampuan yang dimiliki untuk kebaikan.</p>
',
 'https://www.youtube.com/embed/0EUS0u9Cees', 'legenda-si-pahit-lidah', '2025-01-07 10:02:00+00'),

-- JAWA & BANTEN
(4, 12, 'Asal Usul Telaga Warna',
 '<p>Pada zaman dahulu, berdiri sebuah kerajaan makmur di Jawa Barat yang dipimpin oleh raja dan permaisuri yang bijaksana. Meskipun dicintai rakyat, mereka belum memiliki anak. Setelah bertahun-tahun berdoa, lahirlah seorang putri yang cantik. Kelahirannya disambut penuh kegembiraan dan dirayakan oleh seluruh penduduk kerajaan.</p>

<p>Karena menjadi anak tunggal yang telah lama dinantikan, sang putri selalu dimanjakan. Setiap keinginannya dipenuhi tanpa pernah ditolak. Seiring bertambahnya usia, ia tumbuh menjadi gadis yang mudah marah dan tidak menghargai pemberian orang lain. Raja dan permaisuri merasa sedih, tetapi kasih sayang membuat mereka kesulitan bersikap tegas.</p>

<p>Ketika sang putri berulang tahun, rakyat mengumpulkan emas dan batu permata sebagai tanda kasih. Para pengrajin istana mengolahnya menjadi kalung yang sangat indah. Di hadapan seluruh rakyat, raja menyerahkan kalung tersebut kepada putrinya. Namun, sang putri menolak karena merasa perhiasan itu tidak sesuai dengan keinginannya.</p>

<p>Dalam kemarahannya, sang putri melemparkan kalung itu ke lantai hingga batu-batu permatanya berserakan. Permaisuri dan rakyat menangis menyaksikan sikapnya. Tiba-tiba, air memancar dari tempat jatuhnya kalung. Alirannya semakin deras hingga menenggelamkan istana dan seluruh kawasan kerajaan, lalu membentuk sebuah telaga yang luas.</p>

<p>Ketika terkena cahaya matahari, permukaan telaga memantulkan beragam warna yang dipercaya berasal dari batu-batu permata pada kalung tersebut. Masyarakat kemudian menamainya Telaga Warna. Kisah ini mengajarkan bahwa kasih sayang harus disertai pendidikan yang baik serta bahwa kesombongan dan sikap tidak menghargai pemberian dapat membawa penyesalan.</p>
',
 'https://www.youtube.com/embed/hnWeLPak2_0', 'asal-usul-telaga-warna', '2025-01-07 10:03:00+00'),
(5, 12, 'Asal Usul Indramayu',
 '<p>Pada zaman dahulu, Raden Arya Wiralodra meninggalkan Bagelen setelah memperoleh petunjuk untuk mencari sebuah lembah subur di sekitar Sungai Cimanuk. Ia menempuh perjalanan panjang melewati hutan, sungai, dan berbagai rintangan. Setelah menemukan wilayah yang sesuai dengan petunjuk tersebut, ia mulai membuka hutan dan membangun sebuah permukiman.</p>

<p>Permukiman itu perlahan berkembang karena tanahnya subur dan letaknya strategis. Ketika Arya Wiralodra pergi untuk suatu keperluan, datanglah seorang perempuan sakti bernama Nyi Endang Darma Ayu. Ia membantu mengatur penduduk, mengembangkan pertanian, dan menjaga keamanan sehingga pedukuhan tersebut semakin ramai dan sejahtera.</p>

<p>Sepulangnya ke wilayah itu, Arya Wiralodra mendengar tentang kesaktian dan pengaruh Nyi Endang Darma Ayu. Kesalahpahaman membuat keduanya berselisih dan saling menguji kemampuan. Pertarungan berlangsung sengit karena mereka sama-sama memiliki ilmu tinggi. Akhirnya, Nyi Endang Darma Ayu mengakui keunggulan Arya Wiralodra.</p>

<p>Sebelum meninggalkan tempat tersebut, Nyi Endang Darma Ayu meminta agar namanya dikenang sebagai bagian dari perjalanan berdirinya pedukuhan. Arya Wiralodra menyadari bahwa perempuan itu telah berjasa besar dalam membantu masyarakat. Ia pun menamai kawasan tersebut Darma Ayu sebagai penghormatan atas pengabdian dan kebaikannya.</p>

<p>Seiring perjalanan waktu, penyebutan Darma Ayu mengalami perubahan hingga menjadi Dermayu dan kemudian Indramayu. Permukiman tersebut terus berkembang menjadi wilayah penting di pesisir utara Jawa Barat. Cerita ini mengajarkan bahwa kemajuan sebuah daerah lahir dari keberanian, kerja keras, dan kesediaan menghargai jasa orang lain, bukan semata-mata dari kekuatan.</p>
',
 'https://www.youtube.com/embed/G6QYyr1ysR8', 'asal-usul-indramayu', '2025-01-07 10:04:00+00'),
(6, 12, 'Legenda Lutung Kasarung',
 '<p>Pada masa Kerajaan Pasir Batang, Prabu Tapa Agung memiliki tujuh putri. Menjelang turun takhta, ia memilih putri bungsunya, Purbasari, sebagai penerus karena berhati baik dan bijaksana. Keputusan itu membuat Purbararang, putri sulung, merasa iri karena menganggap dirinya lebih berhak menjadi ratu.</p>

<p>Purbararang meminta bantuan seorang penyihir untuk mencelakai adiknya. Tubuh Purbasari kemudian dipenuhi bercak hitam sehingga ia dianggap terkena penyakit. Dengan alasan keselamatan kerajaan, Purbararang mengusir Purbasari ke hutan dan merebut takhta. Di pengasingan, Purbasari bertemu seekor lutung berbulu hitam bernama Lutung Kasarung yang selalu melindunginya.</p>

<p>Lutung Kasarung sebenarnya adalah pangeran kahyangan bernama Guruminda yang sedang menjalani hukuman. Dengan kesaktiannya, ia menciptakan tempat tinggal dan telaga untuk Purbasari. Setelah mandi di telaga itu, penyakit Purbasari menghilang dan kecantikannya kembali. Kabar tersebut membuat Purbararang semakin khawatir kehilangan kekuasaan.</p>

<p>Purbararang memanggil Purbasari dan mengajukan berbagai tantangan, termasuk membandingkan rambut, kecantikan, dan calon pasangan mereka. Purbasari berhasil melewati setiap ujian, tetapi ia dihina karena hanya ditemani seekor lutung. Pada saat menentukan, Lutung Kasarung berubah menjadi Guruminda, seorang pangeran tampan dan gagah. Purbararang pun tidak dapat lagi menyangkal kekalahannya.</p>

<p>Purbasari mendapatkan kembali haknya sebagai pemimpin kerajaan dan menikah dengan Guruminda. Meskipun telah diperlakukan kejam, ia memilih memaafkan Purbararang. Di bawah kepemimpinannya, kerajaan kembali damai dan sejahtera. Legenda ini mengajarkan bahwa ketulusan dan kesabaran lebih berharga daripada penampilan, sedangkan iri hati serta ambisi dapat mendorong seseorang melakukan ketidakadilan.</p>
',
 'https://www.youtube.com/embed/CeOAeI6A6rE', 'legenda-lutung-kasarung', '2025-01-07 10:05:00+00'),
(7, 12, 'Asal Usul Kota Bandung',
 '<p>Pada zaman dahulu, di sekitar Sungai Citarum hiduplah seorang sakti bernama Empu Wisesa bersama putrinya, Sekar. Ia juga merawat dua anak yatim bernama Wira dan Jaka yang ditemukan setelah desa mereka terkena letusan Gunung Tangkuban Perahu. Keduanya dibesarkan sebagai saudara dan diajari ilmu pengetahuan serta kesaktian.</p>

<p>Wira tumbuh menjadi pemuda rajin dan rendah hati, sedangkan Jaka lebih suka bersantai walaupun pandai mengambil hati orang lain. Ketika dewasa, keduanya mencintai Sekar. Jaka lebih dahulu menyampaikan lamaran kepada Empu Wisesa dan langsung memperoleh persetujuan. Namun, Sekar menolak karena ia sebenarnya mencintai Wira.</p>

<p>Untuk menyelesaikan perselisihan, Empu Wisesa mengadakan sayembara. Siapa pun yang mampu memadamkan aliran lahar dari Gunung Tangkuban Perahu akan dinikahkan dengan Sekar. Jaka menganggap tugas itu mustahil dan tidak berusaha sungguh-sungguh. Wira justru mencari cara dengan mengamati aliran lahar serta Sungai Citarum.</p>

<p>Wira kemudian meruntuhkan bagian bukit untuk membendung aliran sungai. Air meluap dan mengalir menuju lahar panas hingga api berhasil dipadamkan. Bendungan tersebut menciptakan sebuah danau luas. Karena keberanian dan kecerdasannya, Wira memenangkan sayembara dan menikahi Sekar dengan restu Empu Wisesa.</p>

<p>Beberapa tahun kemudian, air danau berangsur surut dan meninggalkan dataran yang subur. Penduduk berdatangan, membuka lahan, dan membangun permukiman di sana. Kawasan yang terbentuk akibat sungai yang dibendung itu kemudian dipercaya menjadi asal nama Bandung. Cerita ini mengajarkan bahwa ketekunan, kecerdikan, dan kemauan bertindak dapat menyelesaikan persoalan yang terlihat mustahil.</p>
',
 'https://www.youtube.com/embed/-7Pyqhloctg', 'asal-usul-kota-bandung', '2025-01-07 10:06:00+00'),
(8, 12, 'Legenda Situ Bagendit',
 '<p>Pada zaman dahulu, di sebuah desa subur di Jawa Barat, hiduplah seorang janda kaya bernama Nyai Endit. Ia memiliki sawah, ternak, dan simpanan harta yang melimpah. Sayangnya, kekayaan membuatnya sombong dan kikir. Ia sering menagih utang dengan kasar serta tidak peduli kepada penduduk yang hidup kekurangan.</p>

<p>Suatu hari, seorang pengemis tua mendatangi rumah Nyai Endit untuk meminta sedikit makanan dan air. Bukannya menolong, Nyai Endit mengusir serta menghinanya di hadapan warga. Pengemis itu memperingatkan agar ia tidak terlalu mencintai harta, tetapi peringatan tersebut justru ditertawakan.</p>

<p>Pengemis tua kemudian menancapkan tongkat ke tanah dan menantang siapa pun untuk mencabutnya. Penduduk mencoba, tetapi tidak seorang pun berhasil. Dengan mudah, pengemis itu mencabut tongkatnya sendiri. Dari lubang bekas tongkat, muncul pancaran air yang semakin lama semakin deras dan mulai menggenangi desa.</p>

<p>Warga segera berlari menuju tempat yang lebih tinggi. Nyai Endit tetap berada di rumah karena sibuk menyelamatkan emas dan barang berharganya. Ketika air semakin tinggi, ia memohon pertolongan, tetapi sudah terlambat. Rumah beserta seluruh hartanya tenggelam, sementara genangan air meluas menjadi sebuah danau.</p>

<p>Danau tersebut kemudian dikenal sebagai Situ Bagendit. Nama itu dikaitkan dengan Nyai Endit, perempuan kaya yang kehilangan segalanya akibat keserakahan. Legenda ini mengingatkan bahwa harta tidak akan berarti tanpa kepedulian terhadap sesama. Manusia sebaiknya suka berbagi, memperlakukan orang lain dengan hormat, dan tidak membiarkan kekayaan menghilangkan rasa kemanusiaan.</p>
',
 'https://www.youtube.com/embed/2e7xT0XxkRQ', 'legenda-situ-bagendit', '2025-01-07 10:07:00+00'),
(9, 13, 'Kisah Si Wuragil: 7 Bersaudara & Sepatu Wasiat',
 '<p>Di sebuah desa dekat hutan jati, hiduplah pasangan miskin bersama tujuh anak laki-laki. Anak bungsu mereka bernama Wuragil. Karena tidak mampu mencukupi kebutuhan keluarga, sang ayah berniat meninggalkan anak-anaknya di hutan. Wuragil mendengar rencana itu dan menjatuhkan batu-batu kecil sepanjang perjalanan sehingga mereka dapat menemukan jalan pulang.</p>

<p>Pada kesempatan berikutnya, ayah mereka kembali membawa ketujuh anak itu ke hutan. Kali ini Wuragil menggunakan butiran jagung sebagai penanda, tetapi semuanya dimakan burung. Ketujuh bersaudara itu tersesat dan menemukan sebuah rumah yang ternyata dihuni pasangan raksasa beserta tujuh anak mereka. Para raksasa berniat memakan Wuragil dan kakak-kakaknya ketika malam tiba.</p>

<p>Wuragil mendengar rencana tersebut. Ia menukar selimut yang dipakai saudara-saudaranya dengan selimut anak-anak raksasa agar mereka tidak dikenali. Tipu dayanya berhasil menyelamatkan ketujuh bersaudara. Sebelum melarikan diri, Wuragil mengambil sepatu wasiat milik raksasa yang dapat membuat pemakainya berlari sangat cepat.</p>

<p>Mereka tiba di sebuah kerajaan yang sedang mengadakan perlombaan lari. Dengan sepatu wasiat itu, Wuragil mengalahkan seluruh peserta. Ia diizinkan tinggal di istana, lalu tumbuh menjadi pemuda cerdas dan dipercaya oleh raja. Wuragil akhirnya menikahi putri raja, diangkat menjadi penerus takhta, dan menjadikan keenam kakaknya sebagai punggawa kerajaan.</p>

<p>Meskipun pernah dibuang, Wuragil tidak melupakan kedua orang tuanya. Ia menjemput mereka dan mengajak mereka tinggal di istana. Keluarga tersebut akhirnya hidup berkecukupan dan kembali bersatu. Kisah ini mengajarkan bahwa kecerdikan, keberanian, serta kepedulian dapat menolong seseorang melewati bahaya. Wuragil juga menunjukkan bahwa keberhasilan tidak harus dibalas dengan dendam, melainkan dapat disertai pengampunan.</p>
',
 'https://www.youtube.com/embed/lgkdn3ZYrWo', 'kisah-si-wuragil', '2025-01-07 10:08:00+00'),
(10, 13, 'Asal Usul Rawa Pening',
 '<p>Pada zaman dahulu, di lereng Gunung Telomoyo, hiduplah seekor naga bernama Baru Klinting. Ia merupakan anak Ki Hajar Salokantara dan Endang Sawitri. Untuk menyempurnakan kesaktiannya, Baru Klinting bertapa dengan melingkarkan tubuhnya mengelilingi gunung. Ketika bertapa, sebagian tubuhnya tidak sengaja ditemukan dan dipotong oleh penduduk desa yang sedang berburu.</p>

<p>Daging tersebut dibawa pulang dan dimasak untuk pesta desa. Baru Klinting kemudian menjelma menjadi seorang anak kecil bertubuh penuh luka. Dalam keadaan lapar, ia mendatangi pesta dan meminta sedikit makanan. Para penduduk justru mengejek serta mengusirnya karena penampilannya. Hanya seorang janda baik hati bernama Nyai Latung yang bersedia memberinya makanan dan tempat beristirahat.</p>

<p>Sebelum pergi, Baru Klinting berpesan agar Nyai Latung menyiapkan lesung sebagai perahu jika terjadi bencana. Ia lalu kembali ke tempat pesta dan menantang warga mencabut sebatang lidi yang ditancapkannya ke tanah. Banyak orang mencoba, tetapi tidak seorang pun mampu menggerakkan lidi tersebut.</p>

<p>Baru Klinting akhirnya mencabut lidi itu sendiri. Seketika, air memancar sangat deras dari lubang di tanah. Air terus meninggi dan menenggelamkan seluruh desa. Penduduk yang pernah mengusirnya tidak sempat menyelamatkan diri, sedangkan Nyai Latung dapat bertahan dengan menaiki lesung sebagaimana pesan Baru Klinting.</p>

<p>Genangan air yang luas itu kemudian dikenal sebagai Rawa Pening, yang berarti rawa berair jernih. Kisah Baru Klinting mengajarkan agar manusia tidak menilai seseorang berdasarkan penampilannya. Keramahan dan kepedulian Nyai Latung menyelamatkan hidupnya, sedangkan kesombongan serta kekejaman penduduk membawa mereka menuju bencana.</p>
',
 'https://www.youtube.com/embed/1fBJx_5k-7A', 'asal-usul-rawa-pening', '2025-01-07 10:09:00+00'),
(11, 13, 'Asal Usul Nusakambangan',
 '<p>Pada zaman dahulu, berkuasalah seorang raja sakti dari Jawa Timur bernama Prabu Aji Pramosa. Ia memiliki watak keras dan tidak senang apabila ada orang yang dianggap mampu menandingi kesaktiannya. Ketika mendengar tentang seorang pertapa bernama Resi Kano atau Kiai Jamur, sang raja merasa kehormatannya terancam.</p>

<p>Prabu Aji Pramosa memerintahkan Resi Kano menghadap dan mengakui kekuasaannya. Resi Kano menolak karena ia tidak mengejar kedudukan ataupun ingin bersaing dengan siapa pun. Penolakan tersebut membuat sang raja murka. Resi Kano kemudian meninggalkan kerajaan dan pergi menuju pantai selatan Jawa untuk melanjutkan pertapaannya.</p>

<p>Prabu Aji Pramosa mengejar Resi Kano hingga ke sebuah pulau terpencil. Pertempuran sengit pun terjadi. Sang raja akhirnya berhasil menyerang Resi Kano, tetapi tubuh pertapa itu mendadak menghilang. Tidak lama kemudian, muncul seekor naga raksasa dari laut yang menyerang Prabu Aji Pramosa dengan kekuatan luar biasa.</p>

<p>Setelah berjuang keras, Prabu Aji Pramosa berhasil mengalahkan naga tersebut menggunakan senjata saktinya. Seorang putri bernama Dewi Wasowati kemudian muncul dan memberikan bunga Wijayakusuma sebagai tanda terima kasih. Bunga pusaka itu dipercaya memiliki kekuatan istimewa dan hanya tumbuh di pulau tempat pertempuran berlangsung.</p>

<p>Pulau tersebut kemudian dikenal sebagai Nusa Kambangan. Nama itu dikaitkan dengan sebuah pulau atau nusa tempat tumbuhnya bunga-bunga keramat. Kisah ini mengingatkan bahwa kesaktian dan kekuasaan dapat menjadi sumber kehancuran apabila disertai kesombongan. Kebijaksanaan sejati tidak ditentukan oleh kemampuan mengalahkan orang lain, melainkan oleh kemampuan mengendalikan diri.</p>
',
 'https://www.youtube.com/embed/lIwlFgVnzxs', 'asal-usul-nusakambangan', '2025-01-07 10:10:00+00'),
(12, 15, 'Asal Usul Banyuwangi',
 '<p>Pada zaman dahulu, di ujung timur Pulau Jawa, hiduplah seorang kesatria bernama Raden Sidopekso bersama istrinya yang cantik dan setia, Sri Tanjung. Raden Sidopekso mengabdi kepada Raja Sulahkromo. Sang raja diam-diam menginginkan Sri Tanjung, tetapi selalu gagal karena perempuan itu teguh menjaga kesetiaannya kepada suaminya.</p>

<p>Raja Sulahkromo kemudian menjalankan tipu muslihat. Ia mengutus Raden Sidopekso pergi melaksanakan tugas yang jauh dan berbahaya. Selama sang kesatria meninggalkan istana, raja kembali membujuk Sri Tanjung. Setelah ditolak, raja memfitnahnya dengan mengatakan bahwa Sri Tanjung telah berusaha menggodanya.</p>

<p>Raden Sidopekso memercayai fitnah tersebut. Dikuasai kemarahan dan kecemburuan, ia membawa Sri Tanjung ke tepi sungai untuk menghukumnya. Sri Tanjung terus menyatakan bahwa dirinya tidak bersalah. Ia bahkan bersumpah bahwa jika dirinya suci, air yang terkena jasadnya kelak akan mengeluarkan aroma harum.</p>

<p>Tanpa menyelidiki kebenaran, Raden Sidopekso membunuh istrinya dan melemparkan tubuhnya ke sungai. Seketika, air sungai memancarkan aroma sangat harum. Raden Sidopekso akhirnya menyadari bahwa Sri Tanjung berkata jujur dan bahwa dirinya telah diperdaya oleh fitnah sang raja. Penyesalan mendalam pun tidak dapat mengembalikan istrinya.</p>

<p>Karena air sungai itu berbau harum, masyarakat menyebut kawasan tersebut Banyuwangi, yang berasal dari kata banyu berarti air dan wangi berarti harum. Legenda ini mengajarkan pentingnya kesetiaan, kejujuran, dan kehati-hatian dalam menerima tuduhan. Kemarahan serta kecemburuan yang tidak disertai pemeriksaan kebenaran dapat menyebabkan keputusan yang tidak dapat diperbaiki.</p>
',
 'https://www.youtube.com/embed/h3IbQMNAtgU', 'asal-usul-banyuwangi', '2025-01-07 10:11:00+00'),
(13, 15, 'Asal Usul Bojonegoro',
 '<p>Pada zaman dahulu, di sebelah utara Gunung Kendeng, berdirilah Kerajaan Malwapati yang dipimpin Prabu Anglingdarma. Ia dikenal sebagai raja sakti, adil, dan mampu memahami bahasa binatang. Dalam perjalanannya, ia bertemu Dewi Setyowati, putri seorang resi sekaligus adik Batikmadrim. Keduanya saling mencintai dan akhirnya menikah.</p>

<p>Kehidupan mereka awalnya berlangsung bahagia. Suatu hari, Prabu Anglingdarma tertawa setelah mendengar percakapan dua ekor hewan. Dewi Setyowati merasa penasaran dan meminta suaminya menjelaskan alasan tawanya sekaligus mengajarkan ilmu memahami bahasa binatang. Namun, ilmu itu terikat sumpah dan tidak boleh diajarkan kepada orang lain.</p>

<p>Dewi Setyowati menganggap penolakan tersebut sebagai tanda bahwa suaminya tidak lagi mencintainya. Ia mendesak Anglingdarma untuk membuktikan kesetiaan. Sang prabu berada dalam pilihan sulit: membocorkan ilmu berarti melanggar sumpah dan kehilangan nyawa, sedangkan mempertahankan sumpah membuat istrinya semakin kecewa.</p>

<p>Merasa cintanya tidak terbalas, Dewi Setyowati memilih menjalani pati obong dengan membakar dirinya. Prabu Anglingdarma sangat berduka, tetapi tetap mempertahankan sumpah yang telah diucapkannya kepada sang guru. Pengorbanan Dewi Setyowati kemudian dikenang sebagai lambang kesetiaan seorang permaisuri kepada raja dan negaranya.</p>

<p>Menurut legenda, penghormatan kepada permaisuri itu melahirkan sebutan Bojonegara, yang kemudian berkembang menjadi Bojonegoro. Kisah ini menggambarkan beratnya menjaga kepercayaan, sumpah, dan kesetiaan. Legenda tersebut juga mengingatkan bahwa cinta memerlukan komunikasi serta kebijaksanaan, sebab prasangka dan tuntutan yang tidak terkendali dapat berakhir dalam penyesalan.</p>
',
 'https://www.youtube.com/embed/wbhuS3Rj1VU', 'asal-usul-bojonegoro', '2025-01-07 10:12:00+00'),
(14, 15, 'Legenda Kalarahu',
 '<p>Pada zaman dahulu, para dewa dan raksasa bekerja sama mengaduk lautan untuk memperoleh Tirta Amerta, air suci yang dapat memberikan kehidupan abadi. Setelah air tersebut ditemukan, para dewa memutuskan membagikannya di kahyangan. Para raksasa tidak diperbolehkan meminumnya karena dikhawatirkan akan menggunakan keabadian untuk menguasai dunia.</p>

<p>Seorang raksasa licik bernama Kalarahu tidak menerima keputusan itu. Ia menyamar sebagai dewa dan menyusup ke dalam antrean pembagian Tirta Amerta. Penampilannya hampir berhasil mengelabui semua penghuni kahyangan. Namun, Dewa Matahari dan Dewa Bulan mengenalinya lalu memberi tahu Batara Wisnu.</p>

<p>Kalarahu sempat meneguk Tirta Amerta sebelum penyamarannya terbongkar. Batara Wisnu segera melepaskan senjata cakra dan memenggal tubuhnya. Air keabadian baru melewati tenggorokan sehingga hanya kepala Kalarahu yang tetap hidup, sedangkan tubuhnya jatuh dan musnah. Kalarahu sangat marah karena rahasianya diungkap oleh Matahari dan Bulan.</p>

<p>Sejak saat itu, kepala Kalarahu terus mengejar keduanya di langit. Ketika berhasil menangkap Bulan, ia berusaha menelannya sebagai pembalasan. Karena tidak lagi memiliki tubuh, Bulan dapat keluar kembali melalui lehernya yang terputus. Peristiwa saat Bulan berada di dalam mulut Kalarahu dipercaya masyarakat sebagai terjadinya gerhana bulan.</p>

<p>Masyarakat dahulu membunyikan kentongan dan berbagai alat untuk menakut-nakuti Kalarahu agar segera melepaskan Bulan. Legenda ini menjadi cara tradisional untuk menjelaskan gerhana sekaligus mengajarkan bahwa kelicikan dan keserakahan membawa akibat buruk. Keinginan memperoleh kekuasaan dengan menipu orang lain pada akhirnya hanya melahirkan kemarahan dan penderitaan berkepanjangan.</p>
',
 'https://www.youtube.com/embed/GxAzKi4Qpbs', 'legenda-kalarahu', '2025-01-07 10:13:00+00'),
(15, 15, 'Asal Usul Tulungagung',
 '<p>Pada zaman dahulu, Kadipaten Betak dipimpin oleh seorang adipati yang dikenal sebagai Adipati Betak. Semakin banyak pendatang menetap di wilayah tersebut sehingga tanah untuk permukiman dan pertanian mulai berkurang. Satu-satunya kawasan yang masih luas adalah Rawa Ngrowo, tetapi rawa itu selalu tergenang karena sumber airnya terus mengalir.</p>

<p>Adipati Betak memerintahkan rakyat mengeringkan rawa tersebut. Berbagai cara telah dilakukan, tetapi air selalu kembali memenuhi kawasan itu. Sang adipati kemudian mengadakan sayembara: siapa pun yang mampu mengeringkan Rawa Ngrowo akan memperoleh penghargaan dan diangkat menjadi patih. Banyak orang sakti mencoba, tetapi semuanya gagal menutup sumber air.</p>

<p>Kabar sayembara sampai kepada Jaka Baru, seorang pemuda dari lereng Gunung Wilis. Atas petunjuk ayahnya, Ki Ageng Manggir, ia membawa ijuk aren dan sebatang lidi menuju Rawa Ngrowo. Meskipun sempat diragukan karena peralatannya terlihat sederhana, Jaka Baru tetap yakin dan memohon pertolongan Tuhan sebelum memulai pekerjaannya.</p>

<p>Jaka Baru menemukan pusat mata air lalu menutupnya menggunakan ijuk dan lidi yang dibawanya. Perlahan-lahan, aliran air berhenti dan rawa mulai mengering. Tanah yang sebelumnya tergenang berubah menjadi kawasan yang dapat dihuni dan ditanami. Menyaksikan keberhasilan tersebut, Adipati Betak berulang kali berseru, “Pitulungan agung!” yang berarti pertolongan besar.</p>

<p>Ucapan pitulungan agung itu kemudian dipercaya berubah menjadi nama Tulungagung. Jaka Baru menerima penghargaan atas keberanian dan kecerdasannya, sedangkan wilayah tersebut berkembang menjadi permukiman yang makmur. Kisah ini mengajarkan bahwa persoalan besar tidak selalu membutuhkan alat yang rumit. Pengetahuan, kerja keras, doa, dan kepatuhan terhadap nasihat orang tua dapat menghadirkan pertolongan yang berarti.</p>
',
 'https://www.youtube.com/embed/bJ4A0eXZPmI', 'asal-usul-tulungagung', '2025-01-07 10:14:00+00'),
(16, 16, 'Legenda Tanjung Lesung',
 '<p>Pada zaman dahulu, hiduplah seorang pemuda pengembara bernama Raden Budog. Suatu malam, ia bermimpi bertemu seorang gadis cantik yang sedang menari mengikuti irama alu dan lesung. Bayangan gadis itu terus memenuhi pikirannya. Raden Budog kemudian meninggalkan kampung halaman dan melakukan perjalanan panjang untuk mencarinya.</p>

<p>Setelah melewati hutan dan pesisir, Raden Budog tiba di sebuah tanjung. Di sana ia mendengar suara ngagondang, yaitu irama yang muncul dari kegiatan menumbuk padi menggunakan alu dan lesung. Di antara para penari, ia melihat Sri Poh Haci, gadis yang sama seperti dalam mimpinya. Keduanya berkenalan, saling mencintai, lalu menikah.</p>

<p>Masyarakat setempat memiliki pantangan untuk tidak melakukan ngagondang pada hari Jumat. Raden Budog telah berjanji menghormati aturan tersebut. Namun, ketika mendengar suara alu dan lesung pada suatu Jumat, ia tidak mampu menahan keinginannya. Ia mendekati tempat permainan dan ikut menabuh lesung meskipun Sri Poh Haci telah berusaha mengingatkannya.</p>

<p>Begitu Raden Budog memukul lesung, tubuhnya tiba-tiba ditumbuhi bulu dan berubah menjadi seekor lutung. Ia sangat menyesal, tetapi kutukan itu tidak dapat dibatalkan. Sri Poh Haci merasa sedih dan malu atas kejadian tersebut. Dalam beberapa versi cerita, ia kemudian meninggalkan tempat itu dan tidak pernah terlihat lagi.</p>

<p>Tanjung tempat berlangsungnya peristiwa tersebut kemudian dikenal sebagai Tanjung Lesung karena bentuk daratannya menyerupai lesung dan kisahnya berkaitan dengan alat penumbuk padi itu. Legenda ini mengajarkan pentingnya menepati janji, menghormati adat masyarakat, dan mengendalikan keinginan. Satu tindakan yang dilakukan tanpa pertimbangan dapat membawa akibat besar bagi diri sendiri maupun orang yang dicintai.</p>
',
 'https://www.youtube.com/embed/LWFnGUZxcm4', 'legenda-tanjung-lesung', '2025-01-07 10:15:00+00'),
(17, 16, 'Legenda Batu Kuwung',
 '<p>Pada masa pemerintahan Sultan Haji di Banten, hiduplah seorang saudagar yang memiliki tanah dan harta berlimpah. Kekayaannya tidak membuatnya murah hati. Ia justru dikenal sombong, kikir, dan kejam kepada rakyat kecil. Para petani dipaksa menyerahkan hasil panen, sedangkan orang miskin yang meminta bantuan selalu diusir.</p>

<p>Suatu hari, seorang pengemis tua mendatangi rumah saudagar itu dan memohon sedikit makanan. Sang saudagar menghina serta mengusirnya dengan kasar. Pengemis tersebut memperingatkan bahwa harta dan kekuasaan tidak akan bertahan selamanya. Namun, saudagar itu tidak menghiraukannya dan merasa tidak ada seorang pun yang mampu menghukumnya.</p>

<p>Tidak lama kemudian, tubuh saudagar itu mendadak lumpuh. Ia telah mendatangi banyak tabib dan menghabiskan sebagian hartanya, tetapi penyakitnya tidak kunjung sembuh. Dalam penderitaan, ia menyadari bahwa pengemis yang pernah diusirnya bukan orang biasa. Saudagar itu mulai menyesali kekejaman dan keserakahannya terhadap masyarakat.</p>

<p>Untuk menebus kesalahan, ia pergi ke kaki Gunung Karang dan bertapa di atas sebuah batu yang cekung. Ia memohon ampun serta berjanji akan mengubah perilakunya. Setelah pertapaannya selesai, muncul mata air panas dari batu tersebut. Ketika membasuh tubuhnya dengan air itu, penyakitnya perlahan menghilang dan ia dapat bergerak kembali.</p>

<p>Batu cekung itu kemudian dikenal sebagai Batu Kuwung, sedangkan mata airnya dipercaya memiliki khasiat penyembuhan. Saudagar tersebut pulang sebagai pribadi yang lebih rendah hati dan mulai menggunakan hartanya untuk membantu sesama. Legenda ini mengajarkan bahwa kekayaan bukan alasan untuk merendahkan orang lain. Penyesalan harus disertai perubahan nyata, kepedulian, dan kemauan memperbaiki kesalahan.</p>
',
 'https://www.youtube.com/embed/_tRAOeaD8qM', 'legenda-batu-kuwung', '2025-01-07 10:16:00+00'),

-- BALI & NUSA TENGGARA
(18, 17, 'Legenda Calon Arang',
 '<p>Pada masa pemerintahan Raja Airlangga di Kerajaan Daha, hiduplah seorang janda sakti bernama Calon Arang di Desa Girah. Ia menguasai ilmu hitam dan memiliki seorang putri cantik bernama Ratna Manggali. Walaupun putrinya berperilaku baik, tidak ada pemuda yang berani melamarnya karena takut kepada kesaktian Calon Arang.</p>

<p>Calon Arang menganggap penduduk telah menghina keluarganya. Dikuasai kemarahan, ia memohon kekuatan kepada Dewi Durga dan melakukan ritual bersama para pengikutnya. Tidak lama kemudian, wabah mematikan melanda desa-desa di wilayah Daha. Banyak penduduk jatuh sakit, lahan pertanian terbengkalai, dan ketakutan menyebar ke seluruh kerajaan.</p>

<p>Raja Airlangga mengirim pasukan untuk menghentikan Calon Arang, tetapi mereka tidak mampu menghadapi ilmu hitamnya. Sang raja lalu meminta bantuan Mpu Bharada, seorang pendeta yang bijaksana dan memiliki kesaktian tinggi. Mpu Bharada mengutus muridnya, Mpu Bahula, untuk mendekati Ratna Manggali dan menikahinya dengan niat tulus.</p>

<p>Melalui Ratna Manggali, Mpu Bahula menemukan kitab yang menjadi sumber ilmu Calon Arang. Kitab tersebut dibawa kepada Mpu Bharada untuk dipelajari. Mpu Bharada kemudian menghadapi Calon Arang dalam pertarungan besar. Setelah mengetahui kelemahan ilmu lawannya, ia berhasil mengalahkan Calon Arang dan menghentikan kekuatan jahat yang menebarkan wabah.</p>

<p>Setelah Calon Arang dikalahkan, wabah berakhir dan kehidupan rakyat kembali tenteram. Ratna Manggali tetap hidup bersama Mpu Bahula tanpa mewarisi dendam ibunya. Legenda ini menggambarkan bahaya kemarahan yang dipelihara hingga berubah menjadi keinginan menyakiti orang lain. Kesaktian tanpa kebijaksanaan dapat membawa kehancuran, sedangkan pengetahuan yang digunakan dengan tanggung jawab mampu memulihkan kedamaian.</p>
',
 'https://www.youtube.com/embed/1uc_t0F4fIY', 'legenda-calon-arang', '2025-01-07 10:17:00+00'),
(19, 17, 'Asal Usul Buleleng Dan Singaraja',
 '<p>Pada zaman dahulu, Raja Sri Bagening memerintah sebuah kerajaan di Bali. Dari pernikahannya dengan Ni Luh Pasek, lahirlah seorang putra bernama I Gede Pasekan. Karena pengaruh I Gede Pasekan semakin besar dan ia sangat disayangi rakyat, sang raja memintanya meninggalkan istana secara halus agar tidak menimbulkan perselisihan dalam kerajaan.</p>

<p>I Gede Pasekan bersama ibunya dan para pengikutnya melakukan perjalanan menuju daerah Den Bukit di Bali Utara. Di tengah perjalanan, ia memperoleh petunjuk dari makhluk gaib bernama Panji Landung agar pergi ke Pantai Penimbangan. Sesampainya di sana, mereka menemukan sebuah kapal milik pedagang yang kandas dan tidak dapat kembali ke laut.</p>

<p>Pemilik kapal meminta bantuan I Gede Pasekan. Dengan memusatkan kekuatan dan menggunakan kesaktiannya, ia berhasil mengangkat kapal tersebut hingga kembali mengapung. Sebagai ungkapan terima kasih, pemilik kapal memberinya sebagian muatan, termasuk emas dan dua gong besar. Sejak saat itu, I Gede Pasekan menjadi semakin disegani dan dikenal sebagai Ki Barak Panji Sakti.</p>

<p>Dengan kekayaan dan dukungan rakyat, Ki Barak Panji Sakti membangun kekuasaan baru di wilayah Den Bukit. Ia memimpin dengan berani dan bijaksana sehingga daerahnya berkembang menjadi kerajaan yang kuat. Wilayah kekuasaannya kemudian dikenal sebagai Buleleng, sedangkan pusat pemerintahan yang dibangunnya dinamakan Singaraja.</p>

<p>Nama Singaraja menggambarkan sosok pemimpin yang gagah seperti singa sekaligus menjadi tempat kedudukan raja. Buleleng dan Singaraja selanjutnya berkembang sebagai kawasan penting di Bali Utara. Kisah ini mengajarkan bahwa seorang pemimpin memperoleh penghormatan melalui keberanian, kepedulian, dan kesediaan menolong, bukan hanya karena garis keturunan atau kekuasaan.</p>
',
 'https://www.youtube.com/embed/VseWNRqJ-Q8', 'asal-usul-buleleng-singaraja', '2025-01-07 10:18:00+00'),
(20, 17, 'Legenda Garuda Wisnu Kencana',
 '<p>Pada zaman dahulu, Resi Kasyapa memiliki dua istri bernama Kadru dan Winata. Kadru melahirkan para naga, sedangkan Winata menjadi ibu Garuda, burung perkasa yang memiliki kekuatan luar biasa. Walaupun suami mereka berlaku adil, Kadru menyimpan rasa iri kepada Winata dan ingin menjadikannya sebagai pelayan.</p>

<p>Kadru mengajak Winata menebak warna ekor kuda putih suci bernama Ucaisrawa. Kadru mengatakan ekornya berwarna hitam, sedangkan Winata yakin seluruh tubuh kuda itu berwarna putih. Demi memenangkan taruhan, Kadru memerintahkan anak-anak naganya melilit ekor kuda hingga tampak hitam. Karena kalah akibat tipu daya itu, Winata harus menjadi budak Kadru.</p>

<p>Garuda tidak tega melihat ibunya menderita. Ia meminta para naga membebaskan Winata, tetapi mereka mengajukan syarat yang sangat berat: Garuda harus membawa Tirta Amerta, air suci pemberi keabadian milik para dewa. Demi baktinya kepada sang ibu, Garuda terbang menuju kahyangan dan menghadapi berbagai rintangan serta penjagaan yang berbahaya.</p>

<p>Keberanian Garuda menarik perhatian Dewa Wisnu. Setelah mengetahui bahwa Garuda tidak menginginkan Tirta Amerta untuk dirinya sendiri, Wisnu bersedia membantunya. Sebagai balasan atas ketulusan dan keberaniannya, Garuda menerima kehormatan menjadi wahana Dewa Wisnu. Ia kemudian membawa Tirta Amerta dan berhasil membebaskan Winata dari perbudakan.</p>

<p>Persekutuan Garuda dan Wisnu menjadi lambang kesetiaan, kekuatan, serta pengabdian. Kisah tersebut kemudian diwujudkan dalam sosok Garuda Wisnu Kencana, yang menggambarkan Dewa Wisnu menunggang Garuda. Legenda ini mengajarkan bahwa keberanian terbesar tidak lahir dari keinginan berkuasa, melainkan dari cinta, ketulusan, dan kesediaan berjuang demi membebaskan orang yang disayangi.</p>
',
 'https://www.youtube.com/embed/8OHA_hPX-ww', 'legenda-garuda-wisnu-kencana', '2025-01-07 10:19:00+00'),
(21, 18, 'Legenda Gunung Rinjani',
 '<p>Pada zaman dahulu, berdirilah sebuah kerajaan di Lombok yang dipimpin Datu Tuan. Ia hidup bersama Permaisuri Dewi Mas, tetapi mereka belum dikaruniai keturunan. Atas persetujuan Dewi Mas, Datu Tuan kemudian menikahi Sunggar Tutul. Tidak lama setelah itu, Dewi Mas justru mengandung, sehingga timbul rasa iri dan kekhawatiran dalam hati Sunggar Tutul.</p>

<p>Sunggar Tutul menyebarkan fitnah agar Dewi Mas disingkirkan dari istana. Datu Tuan memercayai kabar tersebut tanpa menyelidiki kebenarannya. Dewi Mas yang sedang mengandung akhirnya meninggalkan kerajaan dan menjalani kehidupan penuh kesulitan. Dalam pengasingannya, ia melahirkan dua anak bernama Raden Nuna Putra Janjak dan Dewi Anjani.</p>

<p>Kedua anak itu tumbuh menjadi pribadi yang kuat dan berbudi baik. Setelah mengetahui asal-usul mereka, keduanya berusaha mencari kebenaran mengenai perlakuan yang diterima ibunya. Perjalanan mereka akhirnya membawa keluarga tersebut kembali berhadapan dengan Datu Tuan. Fitnah Sunggar Tutul pun terungkap dan sang raja menyadari kesalahannya.</p>

<p>Dewi Mas memilih memaafkan Datu Tuan meskipun telah mengalami penderitaan panjang. Sementara itu, Dewi Anjani menjalani perjalanan rohani menuju Gunung Samalas. Karena kesucian hati dan kesaktiannya, ia dipercaya menjadi pemimpin sekaligus penjaga makhluk gaib yang menghuni gunung tersebut.</p>

<p>Gunung Samalas kemudian dikenal sebagai Gunung Rinjani dan masyarakat meyakini bahwa Dewi Anjani tetap menjaganya. Legenda ini mengajarkan bahaya iri hati dan pentingnya memeriksa kebenaran sebelum menjatuhkan hukuman. Kisah Dewi Mas juga menunjukkan bahwa kesetiaan, ketabahan, dan pengampunan mampu mengakhiri permusuhan serta memulihkan hubungan yang pernah dirusak oleh fitnah.</p>
',
 'https://www.youtube.com/embed/Pa_3u51dqWw', 'legenda-gunung-rinjani', '2025-01-07 10:20:00+00'),
(22, 18, 'Legenda Putri Mandalika',
 '<p>Pada zaman dahulu, Kerajaan Tonjang Beru di Pulau Lombok dipimpin oleh seorang raja yang adil. Sang raja memiliki putri bernama Mandalika, yang terkenal bukan hanya karena kecantikannya, tetapi juga karena tutur katanya lembut dan kepeduliannya kepada rakyat. Kabar mengenai Putri Mandalika menyebar hingga ke berbagai kerajaan.</p>

<p>Banyak pangeran datang untuk melamarnya. Setiap pangeran membawa pasukan dan berharap dipilih menjadi pendamping sang putri. Mandalika menyadari bahwa memilih salah seorang dari mereka dapat memicu peperangan. Para pangeran yang ditolak mungkin akan saling menyerang, sedangkan rakyat Lombok akan menjadi korban dari perebutan tersebut.</p>

<p>Untuk mencari jalan keluar, Putri Mandalika bertapa dan memohon petunjuk. Setelah itu, ia mengundang para pangeran serta seluruh rakyat berkumpul di Pantai Seger sebelum fajar pada tanggal dua puluh bulan kesepuluh menurut penanggalan Sasak. Semua orang datang dengan harapan mendengar siapa yang akan dipilihnya.</p>

<p>Di atas batu karang, Mandalika menyatakan bahwa dirinya tidak dapat menjadi milik satu orang karena ia mencintai seluruh rakyatnya. Demi mencegah peperangan, ia menjatuhkan diri ke laut. Para pangeran dan rakyat berusaha mencarinya, tetapi tubuh sang putri tidak ditemukan. Tidak lama kemudian, muncul banyak cacing laut berwarna-warni yang disebut nyale.</p>

<p>Masyarakat percaya nyale merupakan jelmaan Putri Mandalika yang kembali untuk membawa kemakmuran bagi semua orang. Peristiwa kemunculannya kemudian diperingati melalui tradisi Bau Nyale. Legenda ini menggambarkan seorang pemimpin yang mendahulukan keselamatan rakyat daripada kepentingan pribadi. Pengorbanan Mandalika juga mengajarkan bahwa kedamaian harus dijaga agar ambisi dan persaingan tidak menghancurkan kehidupan bersama.</p>
',
 'https://www.youtube.com/embed/S7qH6gUKgZY', 'legenda-putri-mandalika', '2025-01-07 10:21:00+00'),

-- KALIMANTAN
(23, 20, 'Legenda Batu Menangis',
 '<p>Pada zaman dahulu, di sebuah desa terpencil di Kalimantan Barat, hiduplah seorang janda miskin bersama anak gadisnya yang bernama Darmi. Sang ibu bekerja keras setiap hari untuk memenuhi kebutuhan mereka. Darmi tumbuh menjadi gadis yang sangat cantik, tetapi ia malas, manja, dan lebih mementingkan penampilan daripada membantu ibunya.</p>

<p>Suatu hari, Darmi meminta ibunya membelikan pakaian dan perhiasan baru di pasar. Meskipun tidak memiliki banyak uang, sang ibu menyanggupi permintaan itu. Mereka kemudian berjalan menuju pasar. Darmi mengenakan pakaian terbaiknya dan berjalan jauh di depan, sedangkan ibunya mengikuti dari belakang sambil membawa keranjang belanja.</p>

<p>Di sepanjang perjalanan, banyak pemuda terpukau melihat kecantikan Darmi. Ketika mereka bertanya siapa perempuan tua yang berjalan di belakangnya, Darmi merasa malu mengakui ibunya. Ia berkata bahwa perempuan tersebut hanyalah seorang pembantu. Sang ibu menahan kesedihan, berharap putrinya menyadari kesalahan dan mengatakan yang sebenarnya.</p>

<p>Namun, Darmi terus mengulangi pengakuan tersebut dengan kasar. Hati sang ibu akhirnya hancur. Ia berhenti di tepi jalan dan berdoa agar Tuhan menghukum putrinya yang durhaka. Seketika, kaki Darmi berubah menjadi batu. Perubahan itu merambat ke seluruh tubuhnya meskipun ia menangis dan memohon maaf.</p>

<p>Permintaan maaf Darmi terlambat. Seluruh tubuhnya menjadi batu, tetapi air mata tetap mengalir dari wajahnya. Batu itu kemudian dikenal sebagai Batu Menangis. Legenda ini mengajarkan bahwa seorang anak harus menghormati orang tua dan tidak merasa malu terhadap keadaan keluarganya. Penampilan serta pujian orang lain tidak lebih berharga daripada kasih sayang seorang ibu.</p>
',
 'https://www.youtube.com/embed/qu00d1Lv1M8', 'legenda-batu-menangis', '2025-01-07 10:22:00+00'),
(24, 22, 'Putri Junjung Buih',
 '<p>Pada zaman dahulu, Kerajaan Amuntai di Kalimantan Selatan dipimpin oleh dua bersaudara, Raja Patmaraga dan Raja Sukmaraga. Mereka memerintah dengan adil sehingga rakyat hidup tenteram. Namun, keduanya belum memiliki keturunan yang dapat melanjutkan pemerintahan kerajaan. Raja Patmaraga kemudian berdoa memohon petunjuk.</p>

<p>Dalam tidurnya, Raja Patmaraga memperoleh petunjuk agar bertapa di Candi Agung. Ia segera pergi bersama para pengawal dan Datuk Pujung. Setelah beberapa waktu menjalani pertapaan, terdengar suara dari arah sungai. Ketika mendekat, mereka melihat segumpal buih besar yang memancarkan cahaya dan membawa seorang bayi perempuan cantik.</p>

<p>Bayi itu kemudian tumbuh secara ajaib menjadi seorang gadis. Ia menyampaikan beberapa syarat sebelum bersedia keluar dari buih, di antaranya pakaian indah yang harus dibuat oleh para gadis pilihan serta sebuah tempat tinggal yang dibangun dengan penuh ketulusan. Raja Patmaraga segera meminta rakyat memenuhi permintaan tersebut.</p>

<p>Setelah seluruh persyaratan selesai, sang putri keluar dari buih dan disambut dengan upacara kerajaan. Karena ditemukan menjulang di atas buih sungai, ia diberi nama Putri Junjung Buih. Kecantikan, kebijaksanaan, dan kemunculannya yang ajaib membuat rakyat percaya bahwa ia ditakdirkan menjadi tokoh penting bagi Kerajaan Amuntai.</p>

<p>Putri Junjung Buih kemudian dibesarkan di lingkungan kerajaan dan dihormati sebagai lambang harapan serta keberlangsungan pemerintahan. Kehadirannya membawa kebahagiaan bagi raja dan rakyat. Legenda ini mengajarkan bahwa doa harus disertai kesabaran dan usaha. Anugerah yang diperoleh juga perlu dijaga dengan tanggung jawab, rasa syukur, dan kepedulian terhadap seluruh masyarakat.</p>
',
 'https://www.youtube.com/embed/-dVW4P9qdyo', 'putri-junjung-buih', '2025-01-07 10:23:00+00'),
(25, 23, 'Asal Usul Danau Lipan',
 '<p>Pada zaman dahulu, di wilayah Muara Kaman, Kalimantan Timur, berdirilah sebuah kerajaan yang dipimpin Putri Aji Bedarah Putih. Ia dikenal cantik, bijaksana, dan gemar menyirih. Kabar mengenai kecantikannya terdengar hingga ke negeri Tiongkok dan membuat seorang raja dari sana datang bersama armada besar untuk melamarnya.</p>

<p>Putri Aji Bedarah Putih menyambut rombongan tersebut sebagai tamu kerajaan. Dalam jamuan makan, ia melihat raja itu makan langsung dari wadah tanpa tata krama yang dianggap pantas. Sang putri merasa perilaku tersebut tidak mencerminkan calon pemimpin yang bijaksana. Ia kemudian menolak pinangan sang raja secara baik-baik.</p>

<p>Penolakan itu membuat raja dari Tiongkok merasa dipermalukan. Ia memerintahkan pasukannya menyerang kerajaan. Jumlah armada musuh jauh lebih besar sehingga pertahanan Putri Aji Bedarah Putih mulai terdesak. Demi melindungi rakyatnya, sang putri mengambil sirih, mengunyahnya, lalu mengucapkan mantra sebelum menyemburkan air sirih ke medan pertempuran.</p>

<p>Semburan itu berubah menjadi ribuan lipan raksasa yang menyerang pasukan dan kapal-kapal musuh. Para penyerang panik dan berusaha melarikan diri, tetapi armada mereka tenggelam. Bangkai kapal, pasukan, dan lipan memenuhi kawasan tersebut hingga mengubah bentuk wilayah di sekitar pertempuran.</p>

<p>Tempat itu kemudian dikenal sebagai Danau Lipan untuk mengenang pasukan lipan yang menyelamatkan kerajaan. Legenda ini mengajarkan bahwa seseorang harus menghormati keputusan orang lain dan tidak menggunakan kekerasan ketika keinginannya ditolak. Kisah tersebut juga menunjukkan keberanian seorang pemimpin yang menggunakan kemampuan untuk melindungi rakyat dan mempertahankan negerinya.</p>
',
 'https://www.youtube.com/embed/OIRo7H5IgCo', 'asal-usul-danau-lipan', '2025-01-07 10:24:00+00'),
(26, 23, 'Legenda Pesut Mahakam',
 '<p>Pada zaman dahulu, di Desa Muara Montai, Kalimantan Timur, hiduplah dua kakak beradik bersama kedua orang tua mereka. Kehidupan keluarga itu awalnya bahagia. Namun, setelah ibu mereka meninggal, sang ayah menikah lagi. Ibu tiri kedua anak tersebut memiliki sifat kejam dan tidak menyukai keberadaan mereka.</p>

<p>Setiap hari, kedua anak dipaksa mencari kayu bakar dan mengambil air tanpa diberi makanan yang cukup. Suatu hari, ibu tiri menyuruh mereka memenuhi keranjang besar dengan kayu. Ketika mereka akhirnya kembali dalam keadaan lelah, rumah telah kosong. Ayah dan ibu tiri mereka diam-diam pindah serta meninggalkan keduanya sendirian.</p>

<p>Kakak beradik itu memasuki hutan untuk mencari ayah mereka. Setelah berjalan jauh dan menahan lapar, mereka menemukan sebuah gubuk. Di dalamnya tersedia sepanci bubur ketan hitam yang masih sangat panas. Karena kelaparan, keduanya langsung memakan bubur tersebut tanpa menunggu pemilik rumah ataupun membiarkannya dingin.</p>

<p>Tubuh mereka mendadak terasa sangat panas dan kulit mereka berubah gelap. Tidak mampu menahan rasa terbakar, keduanya berlari menuju Sungai Mahakam lalu melompat ke dalam air. Seketika, tubuh mereka berubah menjadi dua ekor hewan air. Mereka berenang sambil mengeluarkan suara seperti tangisan manusia yang memanggil ayahnya.</p>

<p>Masyarakat kemudian menyebut hewan tersebut pesut Mahakam. Kedua anak itu dipercaya terus hidup di sungai sebagai pesut pertama. Legenda ini mengingatkan orang tua agar menjaga dan melindungi anak-anaknya. Kisah tersebut juga mengajarkan pentingnya kesabaran serta kehati-hatian, terutama ketika menghadapi rasa lapar, ketakutan, dan keadaan sulit.</p>
',
 'https://www.youtube.com/embed/9qBcG6dfbPo', 'legenda-pesut-mahakam', '2025-01-07 10:25:00+00'),

-- SULAWESI & INDONESIA UMUM
(27, 27, 'Legenda I Laurang',
 '<p>Pada zaman dahulu, di Sulawesi Selatan, hiduplah pasangan suami istri yang lama tidak memiliki anak. Mereka terus berdoa dan berjanji akan menerima anak dalam bentuk apa pun, sekalipun menyerupai udang. Doa mereka terkabul ketika lahir seorang anak berkulit seperti udang yang kemudian diberi nama I Laurang.</p>

<p>Setelah dewasa, I Laurang ingin menikahi salah satu dari tujuh putri raja. Enam putri menolak lamarannya karena hanya menilai penampilannya. Putri bungsu justru menerima dengan tulus. Kabar tersebut membuat I Laurang sangat bahagia hingga ia keluar dari kulit udangnya dan berubah menjadi seorang pemuda tampan. Mereka kemudian menikah dengan restu raja.</p>

<p>Keenam kakak sang putri merasa iri dan menyesal telah menolak I Laurang. Ketika I Laurang pergi berdagang, mereka mengajak putri bungsu bermain ayunan di tepi laut lalu mengayunkannya hingga terlempar ke air. Berkat pinang dan telur pemberian suaminya, sang putri selamat, berlindung di laut, lalu menjelma menjadi seekor ayam di atas pohon pinang.</p>

<p>Saat kapal I Laurang melintas, ayam itu berkokok memanggil namanya. I Laurang mengenali istrinya dan mengembalikannya ke wujud manusia. Mereka pulang dengan menyembunyikan sang putri di dalam sebuah peti. Di istana, kejahatan keenam kakaknya dibongkar ketika putri bungsu keluar dari peti dalam keadaan hidup.</p>

<p>Raja menghukum keenam putrinya dan memilih putri bungsu sebagai penerus kerajaan. I Laurang dan istrinya kembali hidup bahagia. Legenda ini mengajarkan bahwa kemuliaan seseorang tidak ditentukan oleh penampilan. Ketulusan akan memperoleh kebahagiaan, sedangkan iri hati dan keinginan merebut milik orang lain akhirnya membawa rasa malu serta hukuman.</p>
',
 'https://www.youtube.com/embed/tU42XEH3Z_E', 'legenda-i-laurang', '2025-01-07 10:26:00+00'),
(28, 30, 'Legenda Samba Paria',
 '<p>Pada zaman dahulu, Bumi Mandar di Sulawesi Barat dipimpin oleh seorang raja yang kejam dan serakah. Ia memungut pajak tinggi sehingga rakyat tetap hidup miskin meskipun tanah mereka subur. Di tengah hutan yang dipenuhi tanaman paria, hiduplah seorang gadis bernama Samba Paria bersama adiknya. Mereka menjalani kehidupan sederhana dan saling menyayangi.</p>

<p>Ketika berburu, sang raja melihat Samba Paria dan terpikat oleh kecantikannya. Ia memaksa Samba menjadi permaisuri dan membawanya ke istana. Samba menerima demi melindungi adiknya, tetapi ia dilarang pulang ataupun bertemu keluarganya. Sang adik menanam pohon kelor di dekat istana sebagai penanda: jika layu berarti ia sakit, sedangkan jika mati berarti ia telah tiada.</p>

<p>Setiap hari Samba mengamati pohon tersebut dari jendela. Ketika melihat daunnya mulai layu, ia menyadari adiknya sedang sakit. Saat raja pergi berburu, Samba mengelabui para dayang dengan menjatuhkan cincin ke sungai. Ketika mereka sibuk mencarinya, Samba melarikan diri dan kembali ke rumah untuk merawat adiknya.</p>

<p>Raja mengetahui pelarian itu dan mengejar Samba. Untuk melindungi diri, Samba meracik cabai, merica, daun kelor, abu, dan air. Ketika raja mendobrak pintu, ia menyiramkan racikan tersebut ke matanya. Raja kehilangan penglihatan, terjatuh dari tangga, lalu tewas setelah membentur batu.</p>

<p>Rakyat bersyukur karena terbebas dari kekejaman dan meminta Samba menjadi pemimpin. Namun, ia menolak takhta dan memilih hidup tenteram bersama adiknya. Legenda Samba Paria mengajarkan bahwa keberanian dan kecerdikan dapat mengalahkan penindasan. Kasih sayang kepada keluarga serta keberanian menentang ketidakadilan lebih berharga daripada kemewahan dan kekuasaan.</p>
',
 'https://www.youtube.com/embed/wALwBK1z7bQ', 'legenda-samba-paria', '2025-01-07 10:27:00+00'),
(29, 13, 'Kisah Bawang Merah dan Bawang Putih',
 '<p>Pada zaman dahulu, hiduplah seorang gadis baik hati bernama Bawang Putih bersama ayahnya. Setelah ibunya meninggal, sang ayah menikahi seorang janda yang memiliki anak bernama Bawang Merah. Pada awalnya mereka bersikap ramah, tetapi setelah ayah Bawang Putih meninggal, ibu tiri dan Bawang Merah mulai memperlakukannya seperti pembantu.</p>

<p>Bawang Putih harus memasak, membersihkan rumah, mencuci pakaian, dan mengerjakan berbagai pekerjaan seorang diri. Meskipun sering dimarahi, ia tetap sabar. Suatu hari, pakaian kesayangan ibu tirinya hanyut ketika dicuci di sungai. Bawang Putih menyusuri aliran sungai untuk mencarinya hingga tiba di rumah seorang nenek.</p>

<p>Nenek itu telah menemukan pakaian tersebut dan bersedia mengembalikannya jika Bawang Putih mau membantu pekerjaan rumah. Bawang Putih bekerja dengan rajin tanpa mengeluh. Sebagai hadiah, nenek mempersilahkannya memilih salah satu labu. Bawang Putih mengambil labu paling kecil karena tidak ingin bersikap serakah.</p>

<p>Sesampainya di rumah, labu itu dibelah dan ternyata berisi emas serta batu permata. Ibu tiri dan Bawang Merah ingin mendapatkan hadiah lebih banyak. Bawang Merah sengaja menghanyutkan pakaian lalu mendatangi rumah nenek. Ia membantu dengan malas dan memilih labu terbesar, berharap memperoleh harta yang melimpah.</p>

<p>Ketika labu besar dibuka, keluar berbagai binatang berbisa yang membuat mereka ketakutan. Ibu tiri dan Bawang Merah akhirnya menyadari akibat keserakahannya, sedangkan Bawang Putih memperoleh kehidupan yang lebih baik. Kisah ini mengajarkan bahwa kebaikan, kesabaran, dan ketulusan akan menghasilkan kebahagiaan. Sebaliknya, iri hati dan keserakahan hanya membawa kesulitan bagi pelakunya.</p>
',
 'https://www.youtube.com/embed/XYKYCVb1oCU', 'kisah-bawang-merah-dan-bawang-putih', '2025-01-07 10:28:00+00'),

-- PAPUA
(30, 33, 'Biwar Sang Penakluk Naga',
 '<p>Pada zaman dahulu, di sebuah perkampungan di pedalaman Papua, masyarakat hidup dengan berburu, menangkap ikan, dan mengolah sagu. Suatu hari, sejumlah penduduk pergi mencari sagu di sekitar sungai. Tanpa mereka ketahui, seekor naga raksasa menghuni kawasan tersebut. Naga itu menyerang dan membunuh rombongan, termasuk ayah Biwar.</p>

<p>Ibu Biwar berhasil menyelamatkan diri dan bersembunyi dari serangan naga. Ketika itu, Biwar masih berada dalam kandungannya. Setelah melahirkan, ia membesarkan Biwar seorang diri tanpa menceritakan tragedi yang menimpa ayahnya. Biwar tumbuh menjadi pemuda kuat, terampil menggunakan senjata, dan selalu ingin mengetahui alasan mereka hidup jauh dari warga lain.</p>

<p>Setelah cukup dewasa, Biwar mendesak ibunya menceritakan masa lalu. Ia sangat sedih dan marah ketika mengetahui ayah serta penduduk desanya dibunuh naga. Biwar bertekad menghadapi makhluk itu. Ia berlatih, menyiapkan senjata, dan mempelajari tempat persembunyian naga sebelum berangkat menuju sungai.</p>

<p>Biwar memancing naga keluar dari sarangnya lalu menghindari setiap serangannya. Pertempuran berlangsung sengit karena tubuh naga sangat besar dan kuat. Dengan keberanian serta kecerdikannya, Biwar menemukan bagian tubuh naga yang lemah. Ia menyerang tepat pada sasaran hingga naga tersebut akhirnya roboh dan tidak lagi mengancam masyarakat.</p>

<p>Kematian naga membebaskan wilayah itu dari ketakutan. Biwar kembali kepada ibunya dan disambut sebagai pahlawan yang telah membalas kematian ayahnya sekaligus menyelamatkan desa. Kisah Biwar mengajarkan bahwa keberanian harus disertai persiapan dan kecerdikan. Kekuatan sejati bukan hanya kemampuan mengalahkan musuh, tetapi juga kesediaan melindungi keluarga serta masyarakat dari bahaya.</p>
',
 'https://www.youtube.com/embed/psNkh6nAW1E', 'biwar-sang-penakluk-naga', '2025-01-07 10:29:00+00');

SELECT setval(pg_get_serial_sequence('public.stories', 'id'), (SELECT MAX(id) FROM public.stories));

COMMIT;
