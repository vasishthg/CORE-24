from flask import Flask, render_template, request, redirect, url_for, session, jsonify, abort
from flask_mysqldb import MySQLdb, MySQL
import datetime



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
    cur = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cur.execute('SELECT * FROM recordings')
    recordings = cur.fetchall()
    
    return render_template('index.html', recordings=recordings)

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
        session['loggedin'] = True
        session['email'] = user['email']
        return jsonify({'success': 'Welcome, ' + user['name'], 'status': 200})
    return abort(400, description='Password incorrect!')

@app.route('/upload/vid', methods=['POST'])
def upload_vid():
    if 'video' not in request.files:
        return abort(400, description='No file part!')
    
    video = request.files['video']
    if video.filename == '':
        return abort(400, description='No selected file!')
    now = datetime.datetime.now()
    filename = f"recording_at_{now.strftime('%Y-%m-%d_%H-%M-%S')}"
    path = f"static/recordings/{filename}.mp4"
    video.save(path)
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('INSERT INTO recordings (name, path, uploaded_at) VALUES (%s, %s, %s)', (filename,path,now,))
    mysql.connection.commit()
    cursor.close()
    return jsonify({'success': 'Video uploaded!', 'status': 200})

if __name__ == '__main__':
    app.run(debug=True)
