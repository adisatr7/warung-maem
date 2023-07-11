# Import library yang dibutuhkan
from flask import Flask
from flask_cors import CORS
from api.controllers.pengguna_controller import pengguna_controller
from api.controllers.makanan_controller import makanan_controller
from api.controllers.pembelian_controller import pembelian_controller
from api.controllers.transaksi_controller import transaksi_controller
from backend.env import DATABASE_URL, DATABASE_USER


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = f"mysql://{DATABASE_USER}@{DATABASE_URL}"

CORS(app)

# Memasang blueprint ke instance Flask agar dapat diakses
app.register_blueprint(pengguna_controller)
app.register_blueprint(makanan_controller)
app.register_blueprint(pembelian_controller)
app.register_blueprint(transaksi_controller)


# Jalankan aplikasi Flask
if __name__ == "__main__":
    app.run(debug=True)