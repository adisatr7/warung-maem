from flask import Blueprint, jsonify, request
from flask.wrappers import Response
from database.config import session
from api.models import PenggunaModel


# Inisiasi Blueprint
pengguna_controller = Blueprint("pengguna", __name__)


# Buat endpoint untuk menambahkan data
@pengguna_controller.route("/user", methods=["POST"])
def add() -> Response:
    try:
        # Ambil data dari request
        data = request.json

        # Jika data tidak ditemukan, maka kirimkan response error
        if data is None:
            return jsonify({"error": "Data not found!", "code": 404})

        # Buat objek pengguna baru
        pengguna = PenggunaModel(
            data["id_user"],
            data["nama_user"],
            data["password_login"],
            data["alamat"],
            data["no_telp"],
        )

        # Tambahkan pengguna baru ke database
        session.add(pengguna)
        session.commit()

        # Ubah data yang sudah diambil menjadi bentuk JSON
        return jsonify({"message": "Data added!", "data": pengguna.get()})

    # Jika terjadi error, tampilkan pesan error
    except Exception as e:
        print(f"Error occurred while adding data: {e}")
        return jsonify(
            {"error": f"An error occurred while adding data: {e}", "code": 500}
        )


# Buat endpoint untuk mengambil semua data pengguna
@pengguna_controller.route("/user", methods=["GET"])
def get_all() -> Response:
    try:
        session.commit()

        # Jalankan query untuk mengambil data pengguna
        results: list[PenggunaModel] = session.query(PenggunaModel).all()

        # Ubah hasil query (kumpulan pengguna) menjadi bentuk Python list
        list_pengguna: list[dict] = [result.get() for result in results]

        # Ubah Python list menjadi bentuk JSON
        return jsonify(list_pengguna)

    # Jika terjadi error, tampilkan pesan error-nya
    except Exception as e:
        print(f"Error occurred while retrieving data: {e}")
        return jsonify(
            {"error": f"An error occurred while retrieving data: {e}", "code": 500}
        )


# Buat endpoint untuk mengambil satu data pengguna berdasarkan ID-nya
@pengguna_controller.route("/user/<string:id_user>", methods=["GET"])
def get_by_id(id_user: str) -> Response:
    try:
        session.commit()

        # Jalankan query untuk mengambil data pengguna
        pengguna = (
            session.query(PenggunaModel)
            .filter(PenggunaModel.id_user == id_user)
            .first()
        )

        # Jika pengguna tidak ditemukan, tampilkan error 404
        if not pengguna:
            print("Error: Record not found!")
            return jsonify({"error": "pengguna not found!", "code": 404})

        # Ubah data yang sudah diambil menjadi bentuk JSON
        return jsonify(pengguna.get())

    # Jika terjadi error, tampilkan pesan error-nya
    except Exception as e:
        print(f"Error occurred while retrieving data: {e}")
        return jsonify(
            {"error": f"An error occurred while retrieving data: {e}", "code": 500}
        )


# Buat endpoint untuk mengubah data pengguna
@pengguna_controller.route("/user/<string:id_user>", methods=["PUT"])
def update(id_user: str) -> Response:
    try:
        # Ambil data dari request
        data = request.json

        # Jika data tidak ditemukan, maka kirimkan response error
        if data is None:
            return jsonify({"error": "Data not found!", "code": 404})

        # Jalankan query untuk mengambil data pengguna
        pengguna = (
            session.query(PenggunaModel)
            .filter(PenggunaModel.id_user == id_user)
            .first()
        )

        # Jika pengguna tidak ditemukan, tampilkan error 404
        if not pengguna:
            print("Error: Record not found!")
            return jsonify({"error": "pengguna not found!", "code": 404})

        # Ubah data pengguna yang sudah diambil sesuai dengan data baru
        pengguna.nama_user = data["nama_user"]
        pengguna.password_login = data["password_login"]
        pengguna.alamat = data["alamat"]
        pengguna.no_telp = data["no_telp"]

        # Commit perubahan data ke database
        session.commit()

        # Ubah data yang sudah diambil menjadi bentuk JSON
        return jsonify({"message": "Data updated!", "data": pengguna.get()})

    # Jika terjadi error, tampilkan pesan error-nya
    except Exception as e:
        print(f"Error occurred while updating data: {e}")
        return jsonify(
            {"error": f"An error occurred while updating data: {e}", "code": 500}
        )


# Buat endpoint untuk menghapus data pengguna
@pengguna_controller.route("/user/<string:id_user>", methods=["DELETE"])
def delete(id_user: str) -> Response:
    try:
        # Jalankan query untuk mengambil data pengguna
        pengguna = (
            session.query(PenggunaModel)
            .filter(PenggunaModel.id_user == id_user)
            .first()
        )

        # Jika pengguna tidak ditemukan, tampilkan error 404
        if not pengguna:
            print("Error: Record not found!")
            return jsonify({"error": "pengguna not found!"}, 404)

        # Hapus data pengguna dari database
        session.delete(pengguna)
        session.commit()

        # Ubah data yang sudah diambil menjadi bentuk JSON
        return jsonify({"message": "Data deleted!", "data": pengguna.get()})

    # Jika terjadi error, tampilkan pesan error-nya
    except Exception as e:
        print(f"Error occurred while deleting data: {e}")
        return jsonify(
            {"error": f"An error occurred while deleting data: {e}", "code": 500}
        )
