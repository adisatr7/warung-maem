from flask import Blueprint, jsonify, request
from flask.wrappers import Response
from database.config import session
from api.models import TransaksiModel
from sqlalchemy.orm import joinedload


# Inisiasi Blueprint
transaksi_controller = Blueprint("transaksi", __name__)


# Buat endpoint untuk menambahkan data
@transaksi_controller.route("/transaksi", methods=["POST"])
def add() -> Response:
    try:
        # Ambil data dari request
        data = request.json

        # Jika data tidak ditemukan, maka kirimkan response error
        if data is None:
            return jsonify({"error": "Data not found!", "code": 404})

        # Buat objek transaksi baru
        transaksi = TransaksiModel(
            data["nama_pembeli"],
            data["waktu_pembelian"],
            data["total_bayar"]
        )

        # Tambahkan transaksi baru ke database
        session.add(transaksi)
        session.commit()

        # Ubah data yang sudah diambil menjadi bentuk JSON
        return jsonify({"message": "Data added!", "data": transaksi.get()})

    # Jika terjadi error, tampilkan pesan error
    except Exception as e:
        print(f"Error occurred while adding data: {e}")
        return jsonify(
            {"error": f"An error occurred while adding data: {e}", "code": 500}
        )


# Buat endpoint untuk mengambil semua data transaksi
@transaksi_controller.route("/transaksi", methods=["GET"])
def get_all() -> Response:
    try:
        session.commit()

        # Jalankan query untuk mengambil data pengguna
        results: list[TransaksiModel] = (
            session.query(TransaksiModel)
            .options(joinedload(TransaksiModel.pembelian))
            .all()
        )

        # Ubah hasil query (kumpulan pengguna) menjadi bentuk Python list
        list_transaksi: list[dict] = [result.get() for result in results]

        # Ubah Python list menjadi bentuk JSON
        return jsonify(list_transaksi)

    # Jika terjadi error, tampilkan pesan error-nya
    except Exception as e:
        print(f"Error occurred while retrieving data: {e}")
        return jsonify(
            {"error": f"An error occurred while retrieving data: {e}", "code": 500}
        )


# Buat endpoint untuk mengambil data transaksi berdasarkan ID
@transaksi_controller.route("/transaksi/<id_transaksi>", methods=["GET"])
def get_by_id(id_transaksi: str) -> Response:
    try:
        session.commit()

        # Jalankan query untuk mengambil data pengguna
        transaksi = (
            session.query(TransaksiModel)
            .filter(TransaksiModel.id_transaksi == id_transaksi)
            .first()
        )

        # Jika pengguna tidak ditemukan, tampilkan error 404
        if not transaksi:
            print("Error: Record not found!")
            return jsonify({"error": "transaksi not found!", "code": 404})

        # Ubah data yang sudah diambil menjadi bentuk JSON
        return jsonify(transaksi.get())

    # Jika terjadi error, tampilkan pesan error-nya
    except Exception as e:
        print(f"Error occurred while retrieving data: {e}")
        return jsonify(
            {"error": f"An error occurred while retrieving data: {e}", "code": 500}
        )


# Buat endpoint untuk mengubah data transaksi berdasarkan ID
@transaksi_controller.route("/transaksi/<id_transaksi>", methods=["PUT"])
def update(id_transaksi: str) -> Response:
    try:
        # Ambil data dari request
        data = request.json

        # Jika data tidak ditemukan, maka kirimkan response error
        if data is None:
            return jsonify({"error": "Data not found!", "code": 404})

        # Jalankan query untuk mengambil data pengguna
        transaksi = (
            session.query(TransaksiModel)
            .filter(TransaksiModel.id_transaksi == id_transaksi)
            .first()
        )

        # Jika pengguna tidak ditemukan, tampilkan error 404
        if not transaksi:
            print("Error: Record not found!")
            return jsonify({"error": "pengguna not found!", "code": 404})

        # Ubah data pengguna yang sudah diambil sesuai dengan data baru
        transaksi.id_transaksi = data["id_transaksi"]
        transaksi.nama_pembeli = data["nama_pembeli"]
        transaksi.waktu_pembelian = data["waktu_pembelian"]
        transaksi.total_bayar = data["total_bayar"]

        # Commit perubahan data ke database
        session.commit()

        # Ubah data yang sudah diambil menjadi bentuk JSON
        return jsonify({"message": "Data updated!", "data": transaksi.get()})

    # Jika terjadi error, tampilkan pesan error-nya
    except Exception as e:
        print(f"Error occurred while updating data: {e}")
        return jsonify(
            {"error": f"An error occurred while updating data: {e}", "code": 500}
        )


# Buat endpoint untuk menghapus data transaksi berdasarkan ID
@transaksi_controller.route("/transaksi/<id_transaksi>", methods=["DELETE"])
def delete(id_transaksi: str) -> Response:
    try:
        # Jalankan query untuk mengambil data pengguna
        transaksi = (
            session.query(TransaksiModel)
            .filter(TransaksiModel.id_transaksi == id_transaksi)
            .first()
        )

        # Jika pengguna tidak ditemukan, tampilkan error 404
        if not transaksi:
            print("Error: Record not found!")
            return jsonify({"error": "pengguna not found!", "code": 404})

        # Hapus data pengguna dari database
        session.delete(transaksi)
        session.commit()

        # Ubah data yang sudah diambil menjadi bentuk JSON
        return jsonify({"message": "Data deleted!", "data": transaksi.get()})

    # Jika terjadi error, tampilkan pesan error-nya
    except Exception as e:
        print(f"Error occurred while deleting data: {e}")
        return jsonify(
            {"error": f"An error occurred while deleting data: {e}", "code": 500}
        )
