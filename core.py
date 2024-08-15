from flask import Flask, render_template, request, redirect, url_for, session, jsonify, abort
from flask_mysqldb import MySQLdb, MySQL
import datetime
# from google.cloud import speech_v1p1beta1 as speech
# import wave
import json
# from transformers import pipeline
# from gtts import gTTS
import os



app = Flask(__name__)
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'toor'
app.config['MYSQL_DB'] = 'core'
app.secret_key = 'ncrypt💖core'

mysql = MySQL(app)

# vosk_model = Model("D:\Webdev\CORE-24\static\model\stt")
# generator = pipeline('text-generation', model='EleutherAI/gpt-neo-1.3B')

@app.route('/', methods=['GET', 'POST'])
def index():
    if session.get('loggedin') != True:
        return render_template('login.html')
    cur = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cur.execute('SELECT * FROM recordings')
    recordings = cur.fetchall()
    cur.execute("SELECT * FROM messages WHERE `to` = 'arni'")
    recieved = cur.fetchall()
    r = []
    for message in recieved:
        if (datetime.datetime.now() - message['time']).total_seconds() >= 3 * 60 * 60:
            r.append(message)
    cur.execute("SELECT * FROM messages WHERE `to` = 'space station'") 
    sent = cur.fetchall()
    cur.execute('SELECT * FROM users WHERE email = %s', (session['email'],))
    user = cur.fetchone()
    if user['arni'] == 0:
        return render_template("earth.html", recordings=recordings, recieved=r, sent = sent, datetime = datetime, re = recieved)
    return render_template('index.html', recordings=recordings, recieved=r, sent = sent, datetime = datetime, re = recieved)

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

@app.route('/send-message', methods=['POST'])
def send_message():
    message = request.form.get('message')
    print(message)
    cur = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cur.execute('SELECT * FROM users WHERE email = %s', (session['email'],))
    user = cur.fetchone()
    now = datetime.datetime.now()
    now = now.strftime('%Y-%m-%d %H:%M:%S')
    print(now)
    if user['arni'] == 0:
        e = 'arni'
    elif user['arni'] == 1:
        e = 'space station'
    cur.execute("INSERT INTO messages(`from`, `to`, content, time) VALUES(%s, %s, %s, %s)", (user['name'], e, message, now,))
    mysql.connection.commit()
    return jsonify({'success': 'Message sent!', 'status': 200})

if __name__ == '__main__':
    app.run(debug=True)
