"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import cloudinary.uploader

from datetime import datetime
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Mentor, Quest, Chat, ChatMessage, Habit, QuestTracking, Administrator, Service
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from functools import wraps
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required, get_jwt
from flask_jwt_extended import JWTManager
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, JWTManager
from math import radians, sin, cos, sqrt, atan2


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route("/hello", methods=["GET"])
def handle_hello():
    return jsonify({
        "message": "Hello from the backend"
    }), 200

# definir admin_required


def admin_required(fn):
    @wraps(fn)
    @jwt_required()
    def wrapper(*args, **kwargs):
        claims = get_jwt()
        if claims.get("role") != "administrator":
            return jsonify({"msg": "Acceso denegado: Se requiere rol de administrador"}), 403
        return fn(*args, **kwargs)
    return wrapper

# User Methods
# CREATE


@api.route('/users', methods=['POST'])
def create_user():
    body = request.get_json()

    new_user = User(
        username=body['username'],
        email=body['email'],
        password=body['password'],
        is_active=True
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify(new_user.serialize()), 201


# READ
@api.route('/users', methods=['GET'])
def get_all_users():
    users = User.query.all()

    all_users_serialized = [user.serialize() for user in users]

    return jsonify(all_users_serialized), 200

# READ ID


@api.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get(user_id)

    if user is None:
        return jsonify({"msg": "User not found"}), 404

    return jsonify(user.serialize()), 200

    if mentor is None:
        return jsonify({"error": "Mentor not found"}), 404

    return jsonify(mentor.serialize()), 200

# UPDATE


@api.route('/users/<int:id>', methods=['PUT'])
def update_user(id):
    body = request.get_json()
    user = User.query.get(id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    user.username = body['username']
    user.email = body['email']
    user.password = body['password']

    db.session.commit()

    return jsonify(user.serialize()), 200

@api.route('/users/<int:id>/avatar', methods=['PUT'])
def update_user_avatar(id):
    user = User.query.get(id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    try:
        upload_result = cloudinary.uploader.upload(file)
        avatar_url = upload_result.get('secure_url')

        user.avatar_url = avatar_url
        db.session.commit()

        return jsonify({
            "message": "Avatar updated successfully",
            "user": user.serialize()
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# DELETE
@api.route('/users/<int:id>', methods=['DELETE'])
def delete_user(id):
    user = User.query.get(id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    db.session.delete(user)
    db.session.commit()

    return jsonify({"msg": f"User with ID {id} succesfully deleted"}), 200


# Mentor Methods
# CREATE
@api.route('/mentors', methods=['POST'])
def create_mentor():
    body = request.get_json(silent=True) or {}

    mentorname = body.get("mentorname")
    email = body.get("email")
    password = body.get("password")
    category = body.get("category") 
    tag = body.get("tag")           

    if not mentorname or not email or not password:
        return jsonify({"msg": "mentorname, email and password are required"}), 400

    existing_email = Mentor.query.filter_by(email=email).first()
    if existing_email is not None:
        return jsonify({"msg": "Email already exists"}), 409

    new_mentor = Mentor(
        mentorname=mentorname,
        email=email,
        password=password,
        category=category, 
        tag=tag,            
        is_active=True
    )

    db.session.add(new_mentor)
    db.session.commit()

    return jsonify(new_mentor.serialize()), 201


# READ ALL
@api.route('/mentors', methods=['GET'])
def get_all_mentors():
    mentors = Mentor.query.all()
    all_mentors_serialized = [mentor.serialize() for mentor in mentors]
    return jsonify(all_mentors_serialized), 200


# READ BY ID
@api.route('/mentors/<int:mentor_id>', methods=['GET'])
def get_mentor(mentor_id):
    mentor = Mentor.query.get(mentor_id)
    if mentor is None:
        return jsonify({"error": "Mentor not found"}), 404
    return jsonify(mentor.serialize()), 200


# UPDATE
@api.route('/mentors/<int:id>', methods=['PUT'])
def update_mentor(id):
    body = request.get_json(silent=True) or {}
    mentor = Mentor.query.get(id)

    if not mentor:
        return jsonify({"error": "Mentor not found"}), 404

    mentor.mentorname = body.get('mentorname', mentor.mentorname)
    mentor.email = body.get('email', mentor.email)
    mentor.password = body.get('password', mentor.password)
    mentor.category = body.get('category', mentor.category)  
    mentor.tag = body.get('tag', mentor.tag)     

    db.session.commit()
    return jsonify(mentor.serialize()), 200


# DELETE
@api.route('/mentors/<int:id>', methods=['DELETE'])
def delete_mentor(id):
    mentor = Mentor.query.get(id)
    if not mentor:
        return jsonify({"error": "Mentor not found"}), 404

    db.session.delete(mentor)
    db.session.commit()
    return jsonify({"msg": f"Mentor with ID {id} successfully deleted"}), 200


# Quest Methods
# READ


@api.route('/quests', methods=['GET'])
def get_quests():
    quests = Quest.query.all()

    quests_serialized = [quest.serialize() for quest in quests]

    return jsonify(quests_serialized), 200


# FILTERED BY USER ID
@api.route("/api/quests/user/<int:user_id>", methods=["GET"])
def get_quests_by_user(user_id):
    try:
        quests = Quest.query.filter_by(user_id=user_id).all()

        if not quests:
            return jsonify([]), 200

        quests_serialized = [quest.serialize() for quest in quests]

        return jsonify(quests_serialized), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"message": "Server error fetching quests"}), 500

# READ ID


@api.route('/quests/<int:quest_id>', methods=['GET'])
def get_quest(quest_id):
    quest = Quest.query.get(quest_id)

    if quest is None:
        return jsonify({"msg": "Quest not found"}), 404

    return jsonify(quest.serialize()), 200

# CREATE


@api.route('/quests', methods=['POST'])
def create_quest():
    body = request.get_json(silent=True) or {}

    if not body:
        return jsonify({"msg": "Request body is required"}), 400

    body.pop("habit_id", None)

    if not body.get("title"):
        return jsonify({"msg": "Title is required"}), 400

    if not body.get("description"):
        return jsonify({"msg": "Description is required"}), 400

    if not body.get("user_id"):
        return jsonify({"msg": "User ID is required"}), 400

    user = db.session.get(User, body["user_id"])

    if user is None:
        return jsonify({"msg": "User not found"}), 404

    try:
        new_quest = Quest(
            title=body["title"],
            description=body["description"],
            status=body.get("status", "pending"),
            user_id=body.get("user_id"),
        )

        db.session.add(new_quest)
        db.session.commit()

        return jsonify(new_quest.serialize()), 201

    except Exception as e:
        db.session.rollback()
        print("ERROR EN EL SERVIDOR AL CREAR QUEST:", str(e))
        return jsonify({"msg": "Internal database error", "error": str(e)}), 500


# UPDATE
@api.route('/quests/<int:quest_id>', methods=['PUT'])
def update_quest(quest_id):
    body = request.get_json()

    if body is None:
        return jsonify({"msg": "Request body is required"}), 400

    quest = Quest.query.get(quest_id)

    if not quest:
        return jsonify({"msg": "Quest not found"}), 404

    quest.title = body['title']
    quest.description = body['description']
    quest.status = body['status']

    db.session.commit()

    return jsonify(quest.serialize()), 200

@api.route('/quests/<int:quest_id>/image', methods=['PUT'])
def upload_quest_image(quest_id):
    quest = Quest.query.get_or_404(quest_id)
    
    if 'file' not in request.files:
        return jsonify({"error": "No se ha enviado ningún archivo"}), 400
        
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({"error": "El archivo no tiene nombre"}), 400

    # Subimos la imagen a Cloudinary
    upload_result = cloudinary.uploader.upload(file)
    
    # Guardamos la URL en la base de datos
    quest.image_url = upload_result.get('secure_url')
    db.session.commit()
    
    return jsonify({
        "message": "Imagen de quest actualizada con éxito",
        "quest": quest.serialize()
    }), 200

# DELETE


@api.route('/quests/<int:quest_id>', methods=['DELETE'])
def delete_quest(quest_id):
    quest = Quest.query.get(quest_id)

    if not quest:
        return jsonify({"msg": "Quest not found"}), 404

    db.session.delete(quest)
    db.session.commit()

    return jsonify({"msg": f"Quest with ID {quest_id} succesfully deleted"}), 200

# Habit Methods
# READ


@api.route('/habits', methods=['GET'])
def get_habits():
    habits = Habit.query.all()

    habits_serialized = [habit.serialize() for habit in habits]

    return jsonify(habits_serialized), 200

# FILTERED BY USER ID


@api.route("/api/habits/user/<int:user_id>", methods=["GET"])
def get_habits_by_user(user_id):
    try:
        habits = Habit.query.filter_by(user_id=user_id).all()

        if not habits:
            return jsonify([]), 200

        habits_serialized = [habit.serialize() for habit in habits]

        return jsonify(habits_serialized), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"message": "Server error fetching habits"}), 500

#  READ ID


@api.route('/habits/<int:habit_id>', methods=['GET'])
def get_habit(habit_id):
    habit = Habit.query.get(habit_id)

    if habit is None:
        return jsonify({"msg": "Habit not found"}), 404

    return jsonify(habit.serialize()), 200


#  CREATE
@api.route('/habits', methods=['POST'])
def create_habit():
    body = request.get_json()

    if body is None:
        return jsonify({"msg": "Request body is required"}), 400

    if not body.get("title"):
        return jsonify({"msg": "Title is required"}), 400

    if not body.get("description"):
        return jsonify({"msg": "Description is required"}), 400

    if not body.get("user_id"):
        return jsonify({"msg": "User ID is required"}), 400

    # CAMBIO: db.session.get evita errores de compatibilidad si usas SQLAlchemy moderno
    user = db.session.get(User, body["user_id"])

    if user is None:
        return jsonify({"msg": "User not found"}), 404

    try:
        new_habit = Habit(
            title=body["title"],
            description=body["description"],
            status=body.get("status", "pending"),
            # Asegúrate de mapear la columna exacta de tu modelo
            user_id=body["user_id"]
        )

        db.session.add(new_habit)
        db.session.commit()

        return jsonify(new_habit.serialize()), 201

    except Exception as e:
        db.session.rollback()  # Limpia la transacción fallida para evitar bloqueos
        print("🔥 ERROR CRÍTICO EN BASE DE DATOS AL CREAR HÁBITO:", str(e))
        return jsonify({"msg": "Internal server database error", "error": str(e)}), 500

#  UPDATE


@api.route('/habits/<int:habit_id>', methods=['PUT'])
def update_habit(habit_id):
    body = request.get_json()

    if body is None:
        return jsonify({"msg": "Request body is required"}), 400

    habit = Habit.query.get(habit_id)

    if not habit:
        return jsonify({"msg": "Habit not found"}), 404

    habit.title = body['title']
    habit.description = body['description']
    habit.status = body['status']

    db.session.commit()

    return jsonify(habit.serialize()), 200

@api.route('/habits/<int:habit_id>/image', methods=['PUT'])
def upload_habit_image(habit_id):
    habit = Habit.query.get_or_404(habit_id)
    
    if 'file' not in request.files:
        return jsonify({"error": "No se ha enviado ningún archivo"}), 400
        
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({"error": "El archivo no tiene nombre"}), 400

    # Subimos la imagen a Cloudinary
    upload_result = cloudinary.uploader.upload(file)
    
    # Guardamos la URL en la base de datos
    habit.image_url = upload_result.get('secure_url')
    db.session.commit()
    
    return jsonify({
        "message": "Imagen de hábito actualizada con éxito",
        "habit": habit.serialize()
    }), 200


#  DELETE
@api.route('/habits/<int:habit_id>', methods=['DELETE'])
def delete_habit(habit_id):
    habit = Habit.query.get(habit_id)

    if not habit:
        return jsonify({"msg": "Habit not found"}), 404

    db.session.delete(habit)
    db.session.commit()

    return jsonify({"msg": f"Habit with ID {habit_id} succesfully deleted"}), 200


# CHAT METHODS
# READ ALL
@api.route('/chats', methods=['GET'])
def get_all_chats():
    chats = Chat.query.all()
    return jsonify([chat.serialize() for chat in chats]), 200


# CREATE
@api.route('/chats', methods=['POST'])
def create_chat():
    body = request.get_json()

    if body is None:
        return jsonify({"msg": "Request body is required"}), 400

    user_id = body.get("user_id")
    mentor_id = body.get("mentor_id")

    if not user_id or not mentor_id:
        return jsonify({"msg": "User and mentor ID are required"}), 400

    user_exists = User.query.get(user_id)
    mentor_exists = Mentor.query.get(mentor_id)
    if not user_exists or not mentor_exists:
        return jsonify({"msg": "User or Mentor does not exist"}), 400

    existing_chat = Chat.query.filter_by(
        user_id=user_id, mentor_id=mentor_id).first()
    if existing_chat:
        return jsonify({
            "msg": "Chat already exists between this user and mentor",
            "chat": existing_chat.serialize()
        }), 200

    new_chat = Chat(user_id=user_id, mentor_id=mentor_id)
    db.session.add(new_chat)
    db.session.commit()

    return jsonify({
        "msg": "Chat created successfully",
        "chat": new_chat.serialize()
    }), 201


# POST MESSAGE
@api.route('/chats/message', methods=['POST'])
def send_message():
    body = request.get_json()

    if body is None:
        return jsonify({"msg": "Request body is required"}), 400

    chat_id = body.get("chat_id")
    sender = body.get("sender")  # "user" OR "mentor"
    content = body.get("content")

    if not all([chat_id, sender, content]):
        return jsonify({"msg": "chat_id, sender and content are required"}), 400

    if sender not in ["user", "mentor"]:
        return jsonify({"msg": "Sender must be either 'user' or 'mentor'"}), 400

    chat = Chat.query.get(chat_id)
    if chat is None:
        return jsonify({"msg": "Chat conversation not found. Create the chat first."}), 404

    new_message = ChatMessage(
        chat_id=chat_id,
        sender=sender,
        content=content
    )

    db.session.add(new_message)
    db.session.commit()

    return jsonify({
        "msg": "Message sent successfully",
        "message": new_message.serialize()
    }), 201


# GET MESSAGES
@api.route('/chats/<int:chat_id>/messages', methods=['GET'])
def get_chat_messages(chat_id):
    chat = Chat.query.get(chat_id)

    if chat is None:
        return jsonify({"msg": "Chat not found"}), 404

    messages = ChatMessage.query.filter_by(
        chat_id=chat_id).order_by(ChatMessage.created_at.asc()).all()
    messages_serialized = [msg.serialize() for msg in messages]

    return jsonify({
        "chat_id": chat.id,
        "user_id": chat.user_id,
        "mentor_id": chat.mentor_id,
        "messages": messages_serialized
    }), 200

# QuestTracking Methods
# READ


@api.route('/quest-trackings', methods=['GET'])
def getall_quest_tracking():
    trackings = QuestTracking.query.all()

    return jsonify([
        tracking.serialize()
        for tracking in trackings
    ]), 200

# READ ID


@api.route('/quest-trackings/<int:tracking_id>', methods=['GET'])
def get_quest_tracking(tracking_id):
    tracking = db.session.get(QuestTracking, tracking_id)

    if tracking is None:
        return jsonify({
            "msg": "Quest tracking not found"
        }), 404

    return jsonify(tracking.serialize()), 200

# CREATE


@api.route('/quest-trackings', methods=['POST'])
def create_quest_tracking():
    body = request.get_json()

    if body is None:
        return jsonify({"msg": "Request body is required"}), 400

    quest_id = body.get("quest_id")
    date_string = body.get("date")
    comment = body.get("comment")
    status = body.get("status")

    if not quest_id or not date_string or not comment or not status:
        return jsonify({"msg": "quest_id, date, comment, status are required"}), 400

    quest = db.session.get(Quest, quest_id)

    if quest is None:
        return jsonify({"msg": "Quest not found"}), 404

    try:
        tracking_date = datetime.strptime(
            date_string,
            "%Y-%m-%d"
        ).date()
    except ValueError:
        return jsonify({
            "msg": "Date must use YYYY-MM-DD format"
        }), 400

    new_tracking = QuestTracking(
        quest_id=quest_id,
        date=tracking_date,
        comment=comment,
        status=status,

    )

    db.session.add(new_tracking)
    db.session.commit()

    return jsonify(new_tracking.serialize()), 201

# UPDATE


@api.route('/quest-trackings/<int:tracking_id>', methods=['PUT'])
def update_quest_tracking(tracking_id):
    body = request.get_json()

    if body is None:
        return jsonify({"msg": "Request body is required"}), 400

    tracking = db.session.get(QuestTracking, tracking_id)

    if tracking is None:
        return jsonify({
            "msg": "Quest tracking not found"
        }), 404

    quest_id = body.get("quest_id")
    date_string = body.get("date")
    comment = body.get("comment")
    status = body.get("status")

    if quest_id is not None:
        quest = db.session.get(Quest, quest_id)

        if quest is None:
            return jsonify({
                "msg": "Quest not found"
            }), 404

        tracking.quest_id = quest_id

    if date_string is not None:
        try:
            tracking.date = datetime.strptime(
                date_string,
                "%Y-%m-%d"
            ).date()
        except ValueError:
            return jsonify({
                "msg": "Date must use YYYY-MM-DD format"
            }), 400

    if comment is not None:
        tracking.comment = comment

    if status is not None:
        tracking.status = status

    db.session.commit()

    return jsonify(tracking.serialize()), 200

# DELETE


@api.route('/quest-trackings/<int:tracking_id>', methods=['DELETE'])
def delete_quest_tracking(tracking_id):
    tracking = db.session.get(QuestTracking, tracking_id)

    if tracking is None:
        return jsonify({"msg": "Quest tracking not found"}), 404

    db.session.delete(tracking)
    db.session.commit()

    return jsonify({"msg": "Quest tracking deleted succesfully "}), 200

# Administrator Methods
# READ


@admin_required
@api.route('/administrators', methods=['GET'])
def ge_tall_administrator():
    admin = Administrator.query.all()

    return jsonify([
        admin.serialize()
        for admin in admin
    ]), 200

# READ ID


@admin_required
@api.route('/administrators/<int:admin_id>', methods=['GET'])
def get_administrator(admin_id):
    admin = db.session.get(Administrator, admin_id)

    if admin is None:
        return jsonify({
            "msg": "Administrator not found"
        }), 404

    return jsonify(admin.serialize()), 200

# POST


@admin_required
@api.route('/administrators', methods=['POST'])
def create_administrators():
    body = request.get_json()

    if body is None:
        return jsonify({"msg": "Request body is required"}), 400

    name = body.get("name")
    email = body.get("email")
    password = body.get("password")

    if not name or not email or not password:
        return jsonify({"msg": "name, email and password required"}), 400

    existing_administrator = Administrator.query.filter_by(email=email).first()

    if existing_administrator is not None:
        return jsonify({"msg": "Email already exists"}), 409

    new_administrator = Administrator(
        name=name,
        email=email,
        password=generate_password_hash(password)
    )

    db.session.add(new_administrator)
    db.session.commit()

    return jsonify(new_administrator.serialize()), 201

# UPDATE


@admin_required
@api.route('/administrators/<int:admin_id>', methods=['PUT'])
def update_administrator(admin_id):
    body = request.get_json()

    if body is None:
        return jsonify({"msg": "Request body is required"}), 400

    admin = db.session.get(Administrator, admin_id)

    if admin is None:
        return jsonify({"msg": "Administrator not found"}), 404

    name = body.get("name")
    email = body.get("email")
    password = body.get("password")

    if name is not None:
        admin.name = name

    if email is not None:
        existing_admin = Administrator.query.filter(
            Administrator.email == email,
            Administrator.id != admin_id
        ).first()

        if existing_admin is not None:
            return jsonify({
                "msg": "Email already exists"
            }), 409

        admin.email = email
    if password is not None:
        admin.password = generate_password_hash(password)

    db.session.commit()

    return jsonify(admin.serialize()), 200

# DELETE


@admin_required
@api.route('/administrators/<int:admin_id>', methods=['DELETE'])
def delete_admin(admin_id):
    admin = db.session.get(Administrator, admin_id)

    if not admin:
        return jsonify({"msg": "Administrator not found"}), 404

    db.session.delete(admin)
    db.session.commit()

    return jsonify({"msg": f"Administrator with ID {admin_id} successfully deleted"}), 200

# Login-Admin Methods
# POST


@api.route('/admin/login', methods=['POST'])
def admin_login():
    body = request.get_json()

    if body is None:
        return jsonify({"msg": "Request body is required"}), 400

    email = body.get("email")
    password = body.get("password")

    if not email or not password:
        return jsonify({"msg": "email and password required"}), 400

    administrator = Administrator.query.filter_by(email=email).first()

    if administrator is None:
        return jsonify({"msg": "Invalid email or password"}), 401

    if not check_password_hash(
       administrator.password, password
       ):
        return jsonify({"msg": "Invalid email or password"}), 401

    access_token = create_access_token(
        identity=str(administrator.id),
        additional_claims={
            "role": "administrator"
        }
    )

    return jsonify({
        "msg": "Administrator login successful",
        "token": access_token,
        "administrator": administrator.serialize()
    }), 200

# Mentor Login


@api.route("/mentors/login", methods=["POST"])
def mentor_login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    mentor = Mentor.query.filter_by(email=email).first()

    if mentor is None:
        return jsonify({"msg": "Bad username or password"}), 401

    if password != mentor.password:
        return jsonify({"msg": "Bad username or password"}), 401

    access_mentor_token = create_access_token(identity=email)

    return jsonify({
        "access_mentor_token": access_mentor_token,
        "mentor_id": mentor.id
    }), 200


# Mentor Private Dashboard
@api.route("/mentors/dashboard/<int:mentor_id>", methods=["GET"])
@jwt_required()
def get_mentor_dashboard(mentor_id):
    current_mentor_email = get_jwt_identity()

    token_owner = Mentor.query.filter_by(email=current_mentor_email).first()

    if not token_owner:
        return jsonify({"msg": "Invalid session"}), 401

    if token_owner.id != mentor_id:
        return jsonify({"msg": "Access denied: Not allowed to see this dashboard"}), 403

    return jsonify({
        "msg": "Access allowed",
        "mentor": {
            "id": token_owner.id,
            "email": token_owner.email
        }
    }), 200


# Service Methods
# READ
@api.route('/services', methods=['GET'])
def get_services():
    services = Service.query.all()
    services_serialized = [service.serialize() for service in services]
    return jsonify(services_serialized), 200


# READ ID
@api.route('/services/<int:service_id>', methods=['GET'])
def get_service(service_id):
    service = Service.query.get(service_id)
    if service is None:
        return jsonify({"msg": "Service not found"}), 404
    return jsonify(service.serialize()), 200


# CREATE
@api.route('/services', methods=['POST'])
def create_service():
    body = request.get_json()

    if body is None:
        return jsonify({"msg": "Request body is required"}), 400

    if not body.get("title"):
        return jsonify({"msg": "Title is required"}), 400

    if not body.get("description"):
        return jsonify({"msg": "Description is required"}), 400

    if not body.get("mentor_id"):
        return jsonify({"msg": "Mentor ID is required"}), 400

    if body.get("price") is None:
        return jsonify({"msg": "Price is required"}), 400

    mentor = Mentor.query.get(body["mentor_id"])
    if mentor is None:
        return jsonify({"msg": "Mentor not found"}), 404

    new_service = Service(
        title=body["title"],
        description=body["description"],
        price=int(body["price"]),
        mentor_id=body["mentor_id"]
    )

    db.session.add(new_service)
    db.session.commit()

    return jsonify(new_service.serialize()), 201


# UPDATE
@api.route('/services/<int:service_id>', methods=['PUT'])
def update_service(service_id):
    body = request.get_json()

    if body is None:
        return jsonify({"msg": "Request body is required"}), 400

    service = Service.query.get(service_id)
    if not service:
        return jsonify({"msg": "Service not found"}), 404

    service.title = body.get('title', service.title)
    service.description = body.get('description', service.description)

    if body.get('price') is not None:
        service.price = int(body['price'])

    if body.get('mentor_id') is not None:
        service.mentor_id = body['mentor_id']

    db.session.commit()
    return jsonify(service.serialize()), 200

@api.route('/services/<int:service_id>/image', methods=['PUT'])
def upload_service_image(service_id):
    service = Service.query.get_or_404(service_id)
    
    if 'file' not in request.files:
        return jsonify({"error": "No se ha enviado ningún archivo"}), 400
        
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({"error": "El archivo no tiene nombre"}), 400

    # Subimos la imagen a Cloudinary
    upload_result = cloudinary.uploader.upload(file)
    
    # Guardamos la URL en la base de datos
    service.image_url = upload_result.get('secure_url')
    db.session.commit()
    
    return jsonify({
        "message": "Imagen de servicio actualizada con éxito",
        "service": service.serialize()
    }), 200

# DELETE
@api.route('/services/<int:service_id>', methods=['DELETE'])
def delete_service(service_id):
    service = Service.query.get(service_id)

    if not service:
        return jsonify({"msg": "Service not found"}), 404

    db.session.delete(service)
    db.session.commit()

    return jsonify({"msg": f"Service with ID {service_id} successfully deleted"}), 200

# Service/Mentor Methods


def get_logged_mentor():
    mentor_email = get_jwt_identity()
    return Mentor.query.filter_by(email=mentor_email).first()

# READ


@api.route("/mentors/services", methods=["GET"])
@jwt_required()
def get_logged_mentor_service():
    mentor = get_logged_mentor()

    if mentor is None:
        return jsonify({"msg": "Invalid mentor session"}), 401

    services = Service.query.filter_by(
        mentor_id=mentor.id
    ).all()

    return jsonify([
        service.serialize() for service in services
    ]), 200

# READ ID


@api.route("/mentors/services/<int:service_id>", methods=["GET"])
@jwt_required()
def get_logged_mentor_service_id(service_id):
    mentor = get_logged_mentor()

    if mentor is None:
        return jsonify({"msg": "Invalid mentor session"}), 401

    service = Service.query.filter_by(
        id=service_id,
        mentor_id=mentor.id
    ).first()

    if service is None:
        return jsonify({"msg": "Service not found"}), 404

    return jsonify(service.serialize()), 200


# CREATE
@api.route('/services/<int:service_id>/reserve', methods=['PUT'])
def reserve_service(service_id):
    service = Service.query.get(service_id)
    if service is None:
        return jsonify({"msg": "Service not found"}), 404

    service.is_reserved = True
    db.session.commit()

    return jsonify(service.serialize()), 200


@api.route('/mentors/services', methods=['POST'])
@jwt_required()
def create_logged_mentor_service():
    mentor = get_logged_mentor()

    if mentor is None:
        return jsonify({"msg": "Invalid mentor session"}), 401

    body = request.get_json(silent=True) or {}

    title = body.get("title")
    description = body.get("description")
    price = body.get("price")

    if not title:
        return jsonify({"msg": "Title is required"}), 400

    if not description:
        return jsonify({"msg": "description is required"}), 400

    if not price:
        return jsonify({"msg": "price is required"}), 400

    try:
        price = int(price)
    except (TypeError, ValueError):
        return jsonify({"msg": "Price must be a number"}), 400

    new_service = Service(
        title=title,
        description=description,
        price=price,
        is_reserved=False,
        mentor_id=mentor.id
    )

    db.session.add(new_service)
    db.session.commit()

    return jsonify(new_service.serialize()), 201

# UPDATE


@api.route('/mentors/services/<int:service_id>', methods=['PUT'])
@jwt_required()
def update_logged_mentor_service(service_id):
    mentor = get_logged_mentor()

    if mentor is None:
        return jsonify({"msg": "Invalid mentor session"}), 401

    body = request.get_json(silent=True) or {}

    service = Service.query.filter_by(
        id=service_id,
        mentor_id=mentor.id
    ).first()

    if service is None:
        return jsonify({"msg": "Service not found"}), 404

    if body.get("title") is not None:
        service.title = body["title"]

    if body.get("description") is not None:
        service.description = body["description"]

    if body.get("price") is not None:
        try:
            service.price = int(body["price"])
        except (TypeError, ValueError):
            return jsonify({"msg": "Price must be a number"}), 400

        db.session.commit()

        return jsonify(service.serialize()), 200

# DELETE


@api.route('/mentors/services/<int:service_id>', methods=['DELETE'])
@jwt_required()
def delete_logged_mentor_service(service_id):
    mentor = get_logged_mentor()

    if mentor is None:
        return jsonify({"msg": "Invalid mentor session"}), 401

    body = request.get_json(silent=True) or {}

    service = Service.query.filter_by(
        id=service_id,
        mentor_id=mentor.id
    ).first()

    if service is None:
        return jsonify({"msg": "Service not found"}), 404

    db.session.delete(service)
    db.session.commit()

    return jsonify({
        "msg": f"Service with ID {service_id} successfully deleted"
    })

# Mentors-users methods
# READ


@api.route('/mentors/users', methods=['GET'])
@jwt_required()
def get_mentor_users():
    mentor_email = get_jwt_identity()

    mentor = Mentor.query.filter_by(email=mentor_email).first()

    if mentor is None:
        return jsonify({"msg": "Invalid mentor session"}), 401

    chats = Chat.query.filter_by(
        mentor_id=mentor.id
    ).all()

    users = []

    for chat in chats:
        users.append({
            "id": chat.user.id,
            "email": chat.user.email,
            "chat_id": chat.id

        })

    return jsonify(users), 200

# GET MESSAGES MENTOR/USERS


@api.route('/mentors/chats/<int:chat_id>/messages', methods=['GET'])
@jwt_required()
def get_mentor_chat_messagess(chat_id):
    mentor_email = get_jwt_identity()

    mentor = Mentor.query.filter_by(email=mentor_email).first()

    if mentor is None:
        return jsonify({"msg": "Invalid mentor session"}), 401

    chat = Chat.query.filter_by(
        id=chat_id,
        mentor_id=mentor.id
    ).first()

    if chat is None:
        return jsonify({"msg": "Chat not found"}), 404

    messages = ChatMessage.query.filter_by(
        chat_id=chat_id).order_by(ChatMessage.created_at.asc()).all()

    return jsonify({
        "chat_id": chat.id,
        "user_id": chat.user_id,
        "mentor_id": chat.mentor_id,
        "messages": [
            message.serialize() for message in messages
        ]
    }), 200

# POST MESSAGE MENTOR/USERS


@api.route('/mentors/chats/<int:chat_id>/messages', methods=['POST'])
@jwt_required()
def send_mentor_chat_message(chat_id):
    mentor_email = get_jwt_identity()

    mentor = Mentor.query.filter_by(email=mentor_email).first()

    if mentor is None:
        return jsonify({"msg": "Invalid mentor session"}), 401

    chat = Chat.query.filter_by(
        id=chat_id,
        mentor_id=mentor.id
    ).first()

    if chat is None:
        return jsonify({
            "msg": "Chat not found"
        }), 404

    body = request.get_json(silent=True) or {}
    content = body.get("content")

    if not content or not content.strip():
        return jsonify({"msg": "Message content is required"}), 400

    new_message = ChatMessage(
        chat_id=chat.id,
        sender="mentor",
        content=content.strip()
    )

    db.session.add(new_message)
    db.session.commit()

    return jsonify({
        "msg": "Message sent successfully",
        "message": new_message.serialize()
    }), 201


@api.route('/login', methods=['POST'])
def login_user():
    body = request.get_json()

    email = body.get('email')
    password = body.get('password')

    user = User.query.filter_by(email=email).first()

    if not user or user.password != password:
        return jsonify({"msg": "Correo o contraseña incorrectos"}), 401
    access_token = create_access_token(identity=str(user.id))
    return jsonify({
        "access_token": access_token,
        "user": user.serialize()
    }), 200

# MENTOR PROFILE METHODS
# READ


@api.route("/mentor/profile", methods=["GET"])
@jwt_required()
def get_mentor_profile():
    mentor_email = get_jwt_identity()

    mentor = Mentor.query.filter_by(email=mentor_email).first()

    if mentor is None:
        return jsonify({"msg": "Mentor not found"}), 404

    return jsonify(mentor.serialize()), 200

# UPDATE


@api.route('/mentor/profile', methods=['PUT'])
@jwt_required()
def update_mentor_profile():
    mentor_email = get_jwt_identity()

    mentor = Mentor.query.filter_by(email=mentor_email).first()

    if not mentor:
        return jsonify({"error": "Mentor not found"}), 404

    data = request.get_json()

    mentor.mentorname = data.get("mentorname", mentor.mentorname)
    mentor.email = data.get("email", mentor.email)
    mentor.address = data.get("address", mentor.address)
    mentor.latitude = data.get("latitude", mentor.latitude)
    mentor.longitude = data.get("longitude", mentor.longitude)

    db.session.commit()

    return jsonify(mentor.serialize()), 200

# USER PROFILE METHODS
# READ


@api.route("/user/profile", methods=["GET"])
@jwt_required()
def get_user_profile():
    current_user_id = int(get_jwt_identity())

    user = User.query.get(current_user_id)

    if user is None:
        return jsonify({"msg": "User not found"}), 404

    return jsonify(user.serialize()), 200

# UPDATE


@api.route('/user/profile', methods=['PUT'])
@jwt_required()
def update_user_profile():
    current_user_id = int(get_jwt_identity())

    user = User.query.get(current_user_id)

    if user is None:
        return jsonify({"msg": "User not found"}), 404

    data = request.get_json()

    user.username = data.get("username", user.username)
    user.email = data.get("email", user.email)
    user.address = data.get("address", user.address)
    user.latitude = data.get("latitude", user.latitude)
    user.longitude = data.get("longitude", user.longitude)

    db.session.commit()

    return jsonify({
        "msg": "User profile updated",
        "user": user.serialize()
    }), 200

# MENTOR SEARCH METHODS
# funcion para calcular distancia


def calculate_distance(lat1, lon1, lat2, lon2):
    earth_radius = 6371

    lat1 = radians(float(lat1))
    lon1 = radians(float(lon1))
    lat2 = radians(float(lat2))
    lon2 = radians(float(lon2))

    difference_lat = lat2 - lat1
    difference_lon = lon2 - lon1

    a = (
        sin(difference_lat / 2) ** 2
        + cos(lat1) * cos(lat2) * sin(difference_lon / 2) ** 2
    )

    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    return earth_radius * c


# READ


@api.route("/mentors/nearby", methods=["GET"])
@jwt_required()
def get_nearby_mentors():
    current_user_id = int(get_jwt_identity())

    user = User.query.get(current_user_id)

    if user is None:
        return jsonify({"msg": "User not found"}), 404

    if user.latitude is None or user.longitude is None:
        return jsonify({"msg": "User location not found"}), 400

    mentors = Mentor.query.filter(
        Mentor.latitude.isnot(None),
        Mentor.longitude.isnot(None)
    ).all()

    nearby_mentors = []

    for mentor in mentors:
        distance = calculate_distance(
            user.latitude,
            user.longitude,
            mentor.latitude,
            mentor.longitude
        )
        mentor_data = mentor.serialize()
        mentor_data["distance"] = round(distance, 2)

        nearby_mentors.append(mentor_data)

        nearby_mentors.sort(key=lambda mentor: mentor["distance"])

    return jsonify(nearby_mentors), 200
