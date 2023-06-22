# Import fungsi untuk membuat base
from sqlalchemy.ext.declarative import declarative_base


# Deklarasikan base untuk diwariskan oleh model data
Base = declarative_base()

# Import model data agar bisa di-export ke luar
from api.models.makanan_model import MakananModel
from api.models.pembelian_model import PembelianModel
from api.models.transaksi_model import TransaksiModel
from api.models.pengguna_model import PenggunaModel
