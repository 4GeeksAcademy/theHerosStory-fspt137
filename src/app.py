"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required
# Importación de Flask-SocketIO
from flask_socketio import SocketIO, emit, join_room

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../dist/')
app = Flask(__name__)

# Setup the flask-JWT-Extended extension
app.config["JWT_SECRET_KEY"] = "super-mega-hyper-secret"  # Change this!
jwt = JWTManager(app)
app.url_map.strict_slashes = False

# Configuración de CORS adaptada también para WebSockets
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Inicialización de SocketIO acoplada a la app de Flask con CORS global permitido
socketio = SocketIO(app, cors_allowed_origins="*")

# database configuration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# =========================================================================
# EVENTOS DE SOCKET.IO PARA CHAT EN TIEMPO REAL
# =========================================================================


@socketio.on('join_chat')
def handle_join_chat(data):
    """Event to join a specific room based on chat id."""
    chat_id = data.get('chat_id')
    if chat_id:
        room = f"chat_{chat_id}"
        join_room(room)
        print(f"[SOCKETIO] User/Mentor connected to room: {room}")


@socketio.on('send_message')
def handle_send_message(message_data):
    """Event to broadcast a new message to everyone in the room."""
    chat_id = message_data.get('chat_id')
    if chat_id:
        room = f"chat_{chat_id}"
        # Se retransmite a la sala correspondiente para que impacte en los dos Reacts
        emit('receive_message', message_data, to=room)
        print(f"[SOCKETIO] Broadcasted message to room: {room}")

# =========================================================================

# Handle/serialize errors like a JSON object


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file


@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response


# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    # SE CAMBIA app.run POR socketio.run PARA MANEJAR CONEXIONES WEBSOCKET
    socketio.run(app, host='0.0.0.0', port=PORT, debug=True)
