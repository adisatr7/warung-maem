from flask import Blueprint, jsonify, request
from flask.wrappers import Response
from database.config import session
from api.models import PembelianModel


# Inisiasi Blueprint
pembelian_controller = Blueprint("pembelian", __name__)

# Buat endpoint untuk menambahkan data
@pembelian_controller.route("/pembelian", methods=["POST"])
def add() -> Response:

    try:
        # Ambil data dari request
        data = request.json

        # Buat objek pembelian baru
        pembelian = PembelianModel(
            data["id_pembelian"],
            data["id_transaksi"],
            data["id_makanan"],
            data["kuantitas"]
        )

        # Tambahkan pembelian baru ke database
        session.add(pembelian)
        session.commit()

        # Ubah data yang sudah diambil menjadi bentuk JSON
        return jsonify({"message": "Data added!", "data": pembelian.get()})

    # Jika terjadi error, tampilkan pesan error
    except Exception as e:
        print(f"Error occurred while adding data: {e}")
        return jsonify({"error": f"An error occurred while adding data: {e}"}), 500


# Buat endpoint untuk mengambil semua data pembelian
@pembelian_controller.route("/pembelian", methods=["GET"])
def get_all() -> Response:

    try:
        session.commit()

        # Jalankan query untuk mengambil data pembelian
        results: list[PembelianModel] = session.query(PembelianModel).all()

        # Ubah hasil query (kumpulan pembelian) menjadi bentuk Python list
        list_pembelian: list[dict] = [result.get() for result in results]

        # Ubah Python list menjadi bentuk JSON
        return jsonify(list_pembelian)

    # Jika terjadi error, tampilkan pesan error-nya
    except Exception as e:
        print(f"Error occurred while retrieving data: {e}")
        return jsonify({"error": f"An error occurred while retrieving data: {e}"}), 500


# Buat endpoint untuk mengambil satu data pembelian berdasarkan ID-nya
@pembelian_controller.route("/pembelian/<string:id_pembelian>", methods=["GET"])
def get_by_id(id_pembelian: str) -> Response:

    try:
        session.commit()

        # Jalankan query untuk mengambil data pembelian
        pembelian = session.query(PembelianModel).filter(PembelianModel.id_pembelian == id_pembelian).first()

        # Jika pembelian tidak ditemukan, tampilkan error 404
        if not pembelian:
            print("Error: Record not found!")
            return jsonify({"error": "pembelian not found!"}), 404

        # Ubah data yang sudah diambil menjadi bentuk JSON
        return jsonify(pembelian.get())

    # Jika terjadi error, tampilkan pesan error-nya
    except Exception as e:
        print(f"Error occurred while retrieving data: {e}")
        return jsonify({"error": f"An error occurred while retrieving data: {e}"}), 500


# Buat endpoint untuk mengubah data pembelian
@pembelian_controller.route("/pembelian/<string:id_pembelian>", methods=["PUT"])
def update(id_pembelian: str) -> Response:

    try:
        # Ambil data dari request
        data = request.json

        # Jalankan query untuk mengambil data pembelian
        pembelian = session.query(PembelianModel).filter(PembelianModel.id_pembelian == id_pembelian).first()

        # Jika pembelian tidak ditemukan, tampilkan error 404
        if not pembelian:
            print("Error: Record not found!")
            return jsonify({"error": "pembelian not found!"}), 404

        # Ubah data pembelian yang sudah diambil sesuai dengan data baru
        pembelian.nama_user = data["nama_user"]
        pembelian.password_login = data["password_login"]
        pembelian.alamat = data["alamat"]
        pembelian.no_telp = data["no_telp"]

        # Commit perubahan data ke database
        session.commit()

        # Ubah data yang sudah diambil menjadi bentuk JSON
        return jsonify({"message": "Data updated!", "data": pembelian.get()})

    # Jika terjadi error, tampilkan pesan error-nya
    except Exception as e:
        print(f"Error occurred while updating data: {e}")
        return jsonify({"error": f"An error occurred while updating data: {e}"}), 500


# Buat endpoint untuk menghapus data pembelian
@pembelian_controller.route("/pembelian/<string:id_pembelian>", methods=["DELETE"])
def delete(id_pembelian: str) -> Response:

    try:
        # Jalankan query untuk mengambil data pembelian
        pembelian = session.query(PembelianModel).filter(PembelianModel.id_pembelian == id_pembelian).first()

        # Jika pembelian tidak ditemukan, tampilkan error 404
        if not pembelian:
            print("Error: Record not found!")
            return jsonify({"error": "pembelian not found!"}), 404

        # Hapus data pembelian dari database
        session.delete(pembelian)
        session.commit()

        # Ubah data yang sudah diambil menjadi bentuk JSON
        return jsonify({"message": "Data deleted!", "data": pembelian.get()})

    # Jika terjadi error, tampilkan pesan error-nya
    except Exception as e:
        print(f"Error occurred while deleting data: {e}")
        return jsonify({"error": f"An error occurred while deleting data: {e}"}), 500
