from sqlalchemy import Column, VARCHAR
from api.models import Base


class PenggunaModel(Base):
    # Nama Tabel
    __tablename__ = "pengguna"

    # Primary Key
    id_user = Column(VARCHAR(32), primary_key=True, nullable=False)

    # Kolom Lainnya
    nama_user = Column(VARCHAR(64))
    password_login = Column(VARCHAR(64))
    alamat = Column(VARCHAR(255))
    no_telp = Column(VARCHAR(12))

    # Konstruktor
    def __init__(self, id_user, nama_user, password_login, alamat, no_telp) -> None:
        self.id_user = id_user
        self.nama_user = nama_user
        self.password_login = password_login
        self.alamat = alamat
        self.no_telp = no_telp

    # Method untuk mengonversi obyek user menjadi dictionary
    def get(self) -> dict:
        return {
            "id_user": self.id_user,
            "nama_user": self.nama_user,
            "password_login": self.password_login,
            "alamat": self.alamat,
            "no_telp": self.no_telp,
        }
