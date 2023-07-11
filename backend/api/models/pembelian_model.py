from sqlalchemy import Column, VARCHAR, INTEGER, DateTime, ForeignKey
from api.models import Base
from sqlalchemy.orm import relationship


class PembelianModel(Base):
    # Nama Tabel
    __tablename__ = "pembelian"

    # Primary Key
    id_pembelian = Column(
        INTEGER(), primary_key=True, nullable=False, autoincrement=True
    )

    # Foreign Keys
    id_transaksi = Column(
        INTEGER(),
        ForeignKey("transaksi.id_transaksi", ondelete="CASCADE"),
        nullable=False,
    )
    id_makanan = Column(
        VARCHAR(64),
        ForeignKey("makanan.id_makanan", ondelete="CASCADE"),
        nullable=False,
    )

    # Kolom lainnya
    kuantitas = Column(DateTime())

    transaksi = relationship("TransaksiModel", back_populates="pembelian")

    # Konstruktor
    def __init__(self, id_transaksi: int, id_makanan: str, kuantitas: int) -> None:
        self.id_transaksi = id_transaksi
        self.id_makanan = id_makanan
        self.kuantitas = kuantitas

    # Method untuk mengonversi obyek user menjadi dictionary
    def get(self) -> dict:
        return {
            "id_pembelian": self.id_pembelian,
            "id_transaksi": self.id_transaksi,
            "id_makanan": self.id_makanan,
            "kuantitas": self.kuantitas
        }
