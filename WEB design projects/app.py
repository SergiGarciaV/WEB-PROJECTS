from flask import Flask, render_template, request, redirect, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate



app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://sergis1:root@localhost/CyberSecWeb'

db = SQLAlchemy(app)
migrate = Migrate(app, db, render_as_batch=True)



class Mensaje(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), nullable=False)
    correo = db.Column(db.String(50), nullable=False)
    mensaje = db.Column(db.Text, nullable=False)



class Usuario(db.Model):
    __tablename__ = 'usuario'
    id = db.Column(db.Integer, primary_key=True)
    nombreRegistro = db.Column(db.String(50), nullable=False)
    apellidos = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), nullable=False, unique=True, index=True)
    usuarioRegistro = db.Column(db.String(50), nullable=False, unique=True, index=True)
    contrasena = db.Column(db.String(50), nullable=False)



@app.route('/')
def index():
    return render_template('index.html')

@app.route('/contacto.html')
def contacto():
    return render_template('contacto.html')

@app.route('/team.html')
def team():
    return render_template('team.html')

@app.route('/servicios.html')
def servicios():
    return render_template('servicios.html')

@app.route('/index.html')
def index1():
    return render_template('index.html')

from flask import jsonify

@app.route('/enviar_mensaje', methods=['POST', 'GET'])
def enviar_mensaje():
    if request.method == 'POST':
        data = request.json
        nombre = data.get('nombre')
        correo = data.get('correo')
        mensaje = data.get('mensaje')

        if nombre is None or correo is None or mensaje is None:
            return jsonify({'status': 'error', 'message': 'Datos inválidos'})

        nuevo_mensaje = Mensaje(nombre=nombre, correo=correo, mensaje=mensaje)
        db.session.add(nuevo_mensaje)
        try:
            db.session.commit()
            return jsonify({'status': 'success'})
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)})

    return render_template('contacto.html')


@app.route('/registrar_usuario', methods=['POST'])
def registrar_usuario():
    if request.method == 'POST':
        data = request.json
        nombreRegistro = data.get('nombreRegistro')
        apellidos = data.get('apellidos')
        email = data.get('email')
        usuarioRegistro = data.get('usuarioRegistro')
        contrasena = data.get('contrasena')

        if nombreRegistro is None or apellidos is None or email is None or usuarioRegistro is None or contrasena is None:
            return jsonify({'status': 'error', 'message': 'Datos inválidos'})

        # Verificamos si ya existe un usuario con el mismo nombre de usuario o email
        existing_user = Usuario.query.filter(
            (Usuario.usuarioRegistro == usuarioRegistro) | (Usuario.email == email)).first()
        if existing_user:
            # Modificación aquí: Enviar un mensaje de error al navegador
            return jsonify({'status': 'error', 'message': 'El nombre de usuario o correo ya está en uso'})

        nuevo_usuario = Usuario(nombreRegistro=nombreRegistro, apellidos=apellidos, email=email,
                                usuarioRegistro=usuarioRegistro, contrasena=contrasena)

        try:
            db.session.add(nuevo_usuario)
            db.session.commit()
            return jsonify({'status': 'success'})
        except Exception as e:
            db.session.rollback()

            return jsonify({'status': 'error', 'message': 'Error al registrar usuario'})


    return render_template('registro.html')


if __name__ == '__main__':
    app.run(debug=True)