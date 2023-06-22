from flask import Flask, render_template, request

application = Flask(__name__)


@application.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        firstName = request.form['firstName']
        lastName = request.form['lastName']
        email = request.form['email']
        password = request.form['password']
    return render_template('tables.html', firstName = firstName, lastName = lastName, email = email, password = password)
    

if __name__ == '__main__':
    application.run(debug=True)