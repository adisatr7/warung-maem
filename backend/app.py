# Import library yang dibutuhkan
from flask import Flask
from api.controllers.pengguna_controller import pengguna_controller
from api.controllers.makanan_controller import makanan_controller
from api.controllers.pembelian_controller import pembelian_controller
from api.controllers.transaksi_controller import transaksi_controller


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"]: str = "mysql://admin:121995@localhost:3306/warung_maem"

# Memasang blueprint ke instance Flask agar dapat diakses
app.register_blueprint(pengguna_controller)
app.register_blueprint(makanan_controller)
app.register_blueprint(pembelian_controller)
app.register_blueprint(transaksi_controller)


# Jalankan aplikasi Flask
app.run(debug=True)
