from flask import Blueprint, jsonify, request
from flask.wrappers import Response
from api.models.makanan_model import MakananModel
from api.models.pembelian_model import PembelianModel
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
            data["nama_pembeli"], data["waktu_pembelian"], data["total_bayar"]
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

        # Jalankan query untuk mengambil data transaksi beserta pembelian dan makanan terkait
        results: list = (
            session.query(
                TransaksiModel.id_transaksi,
                TransaksiModel.nama_pembeli,
                TransaksiModel.waktu_pembelian,
                TransaksiModel.total_bayar,
                MakananModel.id_makanan,
                MakananModel.nama_makanan,
                MakananModel.harga,
                MakananModel.deskripsi,
                MakananModel.url_makanan,
                PembelianModel.kuantitas,
            )
            .join(TransaksiModel.pembelian)
            .join(PembelianModel.makanan)
            .all()
        )

        # Buat dictionary baru untuk menyimpan data transaksi
        transaksi_dict = {}

        # Looping untuk setiap hasil query
        for result in results:
            id_transaksi = result.id_transaksi

            # Jika id_transaksi belum ada di dictionary, maka buat dictionary baru
            if id_transaksi not in transaksi_dict:
                transaksi_dict[id_transaksi] = {
                    "id_transaksi": id_transaksi,
                    "nama_pembeli": result.nama_pembeli,
                    "waktu_pembelian": result.waktu_pembelian,
                    "total_bayar": result.total_bayar,
                    "pembelian": [],
                }

            # Buat dictionary baru untuk menyimpan data makanan
            makanan_data = {
                "id": str(result.id_makanan),
                "namaMakanan": result.nama_makanan,
                "harga": result.harga,
                "deskripsi": result.deskripsi,
                "urlMakanan": result.url_makanan,
                "qty": result.kuantitas,
            }

            # Tambahkan data makanan ke dictionary transaksi
            transaksi_dict[id_transaksi]["pembelian"].append(makanan_data)

        # Ambil list dari dictionary transaksi
        list_transaksi = list(transaksi_dict.values())

        # Convert the list to JSON and return the response
        return jsonify(list_transaksi)

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
