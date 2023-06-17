from sqlalchemy import Column, VARCHAR, INTEGER, Text
from api.models import Base


class MakananModel(Base):

    # Nama Tabel
    __tablename__ = "makanan"

    # Primary Key
    id_makanan = Column(INTEGER(), primary_key=True, nullable=False, autoincrement=True)

    # Kolom Lainnya
    nama_makanan = Column(VARCHAR(64))
    deskripsi = Column(Text())
    url_makanan = Column(Text())
    harga = Column(INTEGER())

    # Konstruktor
    def __init__(self, id_makanan: int, nama_makanan: str, deskripsi: str, url_makanan: str, harga: int) -> None:
        self.id_makanan = id_makanan
        self.nama_makanan = nama_makanan
        self.deskripsi = deskripsi
        self.url_makanan = url_makanan
        self.harga = harga

    # Method untuk mengonversi obyek user menjadi dictionary
    def get(self) -> dict:
        return {
            "id_makanan": self.id_makanan,
            "nama_makanan": self.nama_makanan,
            "deskripsi": self.deskripsi,
            "url_makanan": self.url_makanan,
            "harga": self.harga
        }