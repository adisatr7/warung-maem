from flask import Blueprint, jsonify, request
from flask.wrappers import Response
from database.config import session
from api.models import MakananModel


# Inisiasi Blueprint
makanan_controller = Blueprint("makanan", __name__)


# Buat endpoint untuk menambahkan data
@makanan_controller.route("/makanan", methods=["POST"])
def add() -> Response:
    try:
        # Ambil data dari request
        data = request.json

        # Jika data tidak ditemukan, maka kirimkan response error
        if data is None:
            return jsonify({"error": "Data not found!", "code": 404})

        # Buat objek makanan baru
        makanan = MakananModel(
            data["id_makanan"],
            data["nama_makanan"],
            data["deskripsi"],
            data["url_makanan"],
            data["harga"],
        )

        # Tambahkan makanan baru ke database
        session.add(makanan)
        session.commit()

        # Ubah data yang sudah diambil menjadi bentuk JSON
        return jsonify({"message": "Data added!", "data": makanan.get()})

    # Jika terjadi error, tampilkan pesan error
    except Exception as e:
        print(f"Error occurred while adding data: {e}")
        return jsonify(
            {"error": f"An error occurred while adding data: {e}", "code": 500}
        )


# Buat endpoint untuk mengambil semua data makanan
@makanan_controller.route("/makanan", methods=["GET"])
def get_all() -> Response:
    try:
        session.commit()

        # Jalankan query untuk mengambil data makanan
        results: list[MakananModel] = session.query(MakananModel).all()

        # Ubah hasil query (kumpulan makanan) menjadi bentuk Python list
        list_makanan: list[dict] = [result.get() for result in results]

        # Ubah Python list menjadi bentuk JSON
        return jsonify(list_makanan)

    # Jika terjadi error, tampilkan pesan error-nya
    except Exception as e:
        print(f"Error occurred while retrieving data: {e}")
        return jsonify(
            {"error": f"An error occurred while retrieving data: {e}", "code": 500}
        )


# Buat endpoint untuk mengambil data makanan berdasarkan ID
@makanan_controller.route("/makanan/<id_makanan>", methods=["GET"])
def get_by_id(id_makanan: str) -> Response:
    try:
        session.commit()

        # Jalankan query untuk mengambil data makanan
        result: MakananModel = (
            session.query(MakananModel).filter_by(id_makanan=id_makanan).first()
        )

        # Ubah hasil query (makanan) menjadi bentuk Python dict
        makanan: dict = result.get()

        # Ubah Python dict menjadi bentuk JSON
        return jsonify(makanan)

    # Jika terjadi error, tampilkan pesan error-nya
    except Exception as e:
        print(f"Error occurred while retrieving data: {e}")
        return jsonify(
            {"error": f"An error occurred while retrieving data: {e}", "code": 500}
        )


# Buat endpoint untuk mengubah data makanan berdasarkan ID
@makanan_controller.route("/makanan/<id_makanan>", methods=["PUT"])
def update(id_makanan: str) -> Response:
    try:
        # Ambil data dari request
        data = request.json

        # Jika data tidak ditemukan, maka kirimkan response error
        if data is None:
            return jsonify({"error": "Data not found!", "code": 404})

        # Jalankan query untuk mengambil data makanan
        makanan: MakananModel = (
            session.query(MakananModel).filter_by(id_makanan=id_makanan).first()
        )

        # Jika makanan tidak ditemukan, tampilkan pesan error
        if not makanan:
            return jsonify({"error": "Makanan not found!", "code": 404})

        # Ubah data makanan
        makanan.nama_makanan = data["nama_makanan"]
        makanan.harga = data["harga"]
        makanan.stok = data["stok"]
        makanan.id_kategori = data["id_kategori"]

        # Commit perubahan data ke database
        session.commit()

        # Ubah data yang sudah diambil menjadi bentuk JSON
        return jsonify({"message": "Data updated!", "data": makanan.get()})

    # Jika terjadi error, tampilkan pesan error-nya
    except Exception as e:
        print(f"Error occurred while updating data: {e}")
        return jsonify({"error": f"An error occurred while updating data: {e}", "code": 500})


# Buat endpoint untuk menghapus data makanan berdasarkan ID
@makanan_controller.route("/makanan/<id_makanan>", methods=["DELETE"])
def delete(id_makanan: str) -> Response:
    try:
        # Jalankan query untuk mengambil data makanan
        makanan: MakananModel = (
            session.query(MakananModel).filter_by(id_makanan=id_makanan).first()
        )

        # Jika makanan tidak ditemukan, tampilkan pesan error
        if not makanan:
            return jsonify({"error": "Makanan not found!", "code": 404})

        # Hapus data makanan
        session.delete(makanan)
        session.commit()

        # Ubah data yang sudah diambil menjadi bentuk JSON
        return jsonify({"message": "Data deleted!", "data": makanan.get()})

    # Jika terjadi error, tampilkan pesan error-nya
    except Exception as e:
        print(f"Error occurred while deleting data: {e}")
        return jsonify({"error": f"An error occurred while deleting data: {e}", "code": 500})
