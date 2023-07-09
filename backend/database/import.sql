-- Buat database
CREATE DATABASE warung_maem;
USE warung_maem;


-- Buat tabel user
CREATE TABLE pengguna (
  id_user         VARCHAR(32) PRIMARY KEY NOT NULL,
  nama_user       VARCHAR(64),
  password_login  VARCHAR(64),
  alamat          VARCHAR(255),
  no_telp         VARCHAR(12)
);

-- Isi tabel user
INSERT INTO pengguna (id_user, nama_user, password_login, alamat, no_telp) VALUES
('user1', 'Ahmad', 'password123', 'Jl. Merdeka No. 10', '081234567890'),
('user2', 'Budi', 'qwerty789', 'Jl. Sudirman No. 25', '082345678901'),
('user3', 'Citra', 'pass1234', 'Jl. Diponegoro No. 5', '083456789012'),
('user4', 'Dewi', 'abc123xyz', 'Jl. Pahlawan No. 15', '084567890123'),
('user5', 'Eka', 'securepass', 'Jl. A. Yani No. 8', '085678901234'),
('user6', 'Faisal', 'pass321', 'Jl. Gajah Mada No. 12', '086789012345'),
('user7', 'Gita', 'mypassword', 'Jl. Hayam Wuruk No. 20', '087890123456'),
('user8', 'Hadi', 'helloworld', 'Jl. Veteran No. 30', '088901234567'),
('user9', 'Indah', '12345678', 'Jl. Panglima Sudirman No. 35', '089012345678'),
('user10', 'Joko', 'pass9876', 'Jl. Imam Bonjol No. 40', '090123456789');


-- Buat tabel makanan
CREATE TABLE makanan (
  id_makanan    INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  nama_makanan  VARCHAR(64),
  deskripsi     TEXT,
  url_makanan   TEXT,
  harga         INT
);

-- Isi tabel makanan
INSERT INTO makanan (nama_makanan, deskripsi, url_makanan, harga) VALUES
('Nasi Goreng', 'Nasi goreng dengan bumbu rempah pilihan.', 'https://images.aws.nestle.recipes/resized/b51227b42ac8f45a3b9eee1405782f67_AON-Okt-1_944_531.png', 25000),
('Mie Ayam', 'Mie ayam dengan irisan ayam dan kuah kaldu lezat.', 'https://www.masakapahariini.com/wp-content/uploads/2019/08/mie-ayam-kecap.jpg', 20000),
('Sate Ayam', 'Sate ayam dengan bumbu kacang yang menggugah selera.', 'https://kbu-cdn.com/dk/wp-content/uploads/sate-ayam.jpg', 15000),
('Gado-Gado', 'Sayuran segar dengan saus kacang dan kerupuk.', 'https://images.services.kitchenstories.io/sbHadAGuhrTIb3iSj2l-BfVoguc=/3840x0/filters:quality(85)/images.kitchenstories.io/wagtailOriginalImages/R2391-photo-final-1.jpg', 18000),
('Soto Betawi', 'Soto dengan daging sapi dan kuah santan kental.', 'https://asset.kompas.com/crops/NDISGLphbq_8R2IdKDQ2vVhXQR8=/0x0:1000x667/750x500/data/photo/2021/05/20/60a5e21060463.jpg', 22000),
('Nasi Uduk', 'Nasi uduk dengan lauk-pauk lengkap.', 'https://www.piknikdong.com/wp-content/uploads/2023/04/Resep-Nasi-Uduk-Betawi-Spesial-Nikmat-Banget.jpg', 18000),
('Bakso Malang', 'Bakso dengan kuah kaldu dan bakso urat.', 'https://i0.wp.com/www.malang123.com/wp-content/uploads/2016/10/Bakso-di-Malang.jpg?fit=744%2C517&ssl=1', 12000),
('Ayam Goreng', 'Ayam goreng renyah dengan bumbu rahasia.', 'https://www.astronauts.id/blog/wp-content/uploads/2023/04/Resep-Ayam-Goreng-Serundeng-ala-Rumahan-yang-Nggak-Kalah-Enak-dari-Restoran.jpg', 18000),
('Sop Buntut', 'Sop buntut dengan kuah yang gurih dan daging empuk.', 'https://www.unileverfoodsolutions.co.id/dam/global-ufs/mcos/SEA/calcmenu/recipes/ID-recipes/red-meats-&-red-meat-dishes/oxtail-soup/main-header.jpg', 30000),
('Martabak Manis', 'Martabak manis dengan aneka toping.', 'https://kbu-cdn.com/dk/wp-content/uploads/martabak-8-rasa.jpg', 25000);


-- Buat tabel transaksi | Satu transaksi dapat memiliki banyak pembelian -> one (transaksi) to many (pembelian)
CREATE TABLE transaksi (
  id_transaksi      INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  nama_pembeli      VARCHAR(64),
  total_bayar       INT
);

-- Buat tabel pembelian | Satu transaksi dapat memiliki banyak pembelian -> one (transaksi) to many (pembelian)
CREATE TABLE pembelian (
  id_transaksi  INT,        -- Bagian dari transaksi mana
  id_makanan    INT,        -- Makanan mana yang dibeli
  kuantitas     INT,        -- Berapa banyak makanan yang dipesan
  FOREIGN KEY (id_transaksi) REFERENCES transaksi (id_transaksi),
  FOREIGN KEY (id_makanan) REFERENCES makanan (id_makanan)
);
