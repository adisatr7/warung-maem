from sqlalchemy import Column, VARCHAR, INTEGER, DateTime, Text
from api.models import Base
from sqlalchemy.orm import relationship


class TransaksiModel(Base):
    # Nama Tabel
    __tablename__ = "transaksi"

    # Primary Key
    id_transaksi = Column(
        INTEGER(), primary_key=True, nullable=False, autoincrement=True
    )

    # Kolom Lainnya
    nama_pembeli = Column(VARCHAR(64))
    waktu_pembelian = Column(DateTime())
    total_bayar = Column(INTEGER())

    pembelian = relationship("PembelianModel", back_populates="transaksi")

    # Konstruktor
    def __init__(self, nama_pembeli: str, waktu_pembelian: DateTime, total_bayar: int) -> None:
        self.nama_pembeli = nama_pembeli
        self.waktu_pembelian = waktu_pembelian
        self.total_bayar = total_bayar

    # Method untuk mengonversi obyek user menjadi dictionary
    def get(self) -> dict:
        return {
            "id_transaksi": self.id_transaksi,
            "nama_pembeli": self.nama_pembeli,
            "waktu_pembelian": self.waktu_pembelian,
            "total_bayar": self.total_bayar,
        }
