from flask import Flask, render_template, request
from api.controllers.user import user_controller
from api.controllers.penjualan import penjualan_controller


# nama direktori static dapat diubah ke nama lain dengan cara menyediakan nilai untuk parameter static_url_path ketika pembuatan objek dari kelas Flask
# contoh: Flask(__name__, static_url_path = '/staticfiles')
application = Flask(__name__, static_url_path= '/static')


@application.route('/')
def index():
    return render_template('index.html')

@application.route('/')
def register():
    return render_template('register.html')

@application.route('/form', methods=['GET', 'POST'])
def form():
    if request.method == 'POST':
        nama = request.form['nama']
        telp = request.form['telp']
        password = request.form['password']
        return render_template('response.html',
                               nama=nama, telp=telp, password=password)
    return render_template('form.html')

application.register_blueprint(user_controller)
application.register_blueprint(penjualan_controller)

if __name__ == '__main__':
    application.run(debug=True)
