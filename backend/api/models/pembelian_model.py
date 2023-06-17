from sqlalchemy import Column, VARCHAR, INTEGER, DateTime, ForeignKey
from api.models import Base


class PembelianModel(Base):

    # Nama Tabel
    __tablename__ = "pembelian"

    # Primary Key
    id_pembelian = Column(INTEGER(), primary_key=True, nullable=False, autoincrement=True)

    # Foreign Keys
    id_transaksi = Column(INTEGER(), ForeignKey("transaksi.id_transaksi", ondelete="CASCADE"), nullable=False)
    id_makanan = Column(VARCHAR(64), ForeignKey("makanan.id_makanan", ondelete="CASCADE"), nullable=False)

    # Kolom lainnya
    kuantitas = Column(DateTime())

    # Konstruktor
    def __init__(self, id_transaksi: int, nama_pembeli: str, waktu_pembelian: DateTime, total_bayar: int) -> None:
        self.id_transaksi = id_transaksi
        self.nama_pembeli = nama_pembeli
        self.waktu_pembelian = waktu_pembelian
        self.total_bayar = total_bayar

    # Method untuk mengonversi obyek user menjadi dictionary
    def get(self) -> dict:
        return {
            "id_transaksi": self.id_transaksi,
            "nama_pembeli": self.nama_pembeli,
            "waktu_pembelian": self.waktu_pembelian,
            "total_bayar": self.total_bayar
        }
