from flask import Flask, render_template, request, redirect, url_for, session, jsonify, abort
from flask_mysqldb import MySQLdb, MySQL



app = Flask(__name__)
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'toor'
app.config['MYSQL_DB'] = 'core'
app.secret_key = 'ncrypt💖core'

mysql = MySQL(app)

@app.route('/', methods=['GET', 'POST'])
def index():
    if session.get('loggedin') != True:
        return render_template('login.html')
    return render_template('index.html')

@app.route('/api/email', methods=['POST'])
def check_email():
    email = request.form.get('email')
    print(email)
    cur = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cur.execute('SELECT * FROM users WHERE email = %s', (email,))
    user = cur.fetchone()
    cur.close()
    if user:
        print(user)
        return jsonify({'success': 'Email found!', 'status': 200})
    return abort(400, description='Email not found!')

@app.route('/api/pass', methods=['POST'])
def check_pass():
    password = request.form.get('pass')
    print(password)
    cur = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cur.execute('SELECT * FROM users WHERE password = %s', (password,))
    user = cur.fetchone()
    cur.close()
    if user:
        print(user)
        return jsonify({'success': 'Welcome, ' + user['name'], 'status': 200})
    return abort(400, description='Password incorrect!')

if __name__ == '__main__':
    app.run(debug=True)
