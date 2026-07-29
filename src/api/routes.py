"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Mentor, Quest, Chat, ChatMessage
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


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

    if not body.get('mentorname') or not body.get('email') or not body.get('password'):
        return jsonify({"msg": "mentorname, email and password are required"}), 400

    new_mentor = Mentor(
        mentorname=body['mentorname'],
        email=body['email'],
        password=body['password'],
        is_active=True
    )

    db.session.add(new_mentor)
    db.session.commit()

    return jsonify(new_mentor.serialize()), 201


# READ
@api.route('/mentors', methods=['GET'])
def get_all_mentors():
    mentors = Mentor.query.all()

    all_mentors_serialized = [mentor.serialize() for mentor in mentors]

    return jsonify(all_mentors_serialized), 200

  # READ ID


@api.route('/mentors/<int:mentor_id>', methods=['GET'])
def get_mentor(mentor_id):
    mentor = Mentor.query.get(mentor_id)

    if mentor is None:
        return jsonify({"error": "Mentor not found"}), 404

    return jsonify(mentor.serialize()), 200


# UPDATE
@api.route('/mentors/<int:id>', methods=['PUT'])
def update_mentor(id):
    body = request.get_json()
    mentor = Mentor.query.get(id)

    if not mentor:
        return jsonify({"error": "Mentor not found"}), 404

    mentor.mentorname = body['mentorname']
    mentor.email = body['email']
    mentor.password = body['password']

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

    return jsonify({"msg": f"Mentor with ID {id} succesfully deleted"}), 200

# Quest Methods
# READ


@api.route('/quests', methods=['GET'])
def get_quests():
    quests = Quest.query.all()

    quests_serialized = [quest.serialize() for quest in quests]

    return jsonify(quests_serialized), 200

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
    body = request.get_json()

    if body is None:
        return jsonify({"msg": "Request body is required"}), 400

    if not body.get("title"):
        return jsonify({"msg": "Title is required"}), 400

    if not body.get("description"):
        return jsonify({"msg": "Description is required"}), 400
    
    if not body.get("user_id"):
        return jsonify({"msg": "User ID is required"}), 400
    user = User.query.get(body["user_id"])

    if user is None:
        return jsonify({"msg": "User not found"}), 404
    

    new_quest = Quest(
        title=body["title"],
        description=body["description"],
        status=body.get("status", "pending"),
        user_id=body.get("user_id"),
        habit_id=body.get("habit_id")
    )

    db.session.add(new_quest)
    db.session.commit()

    return jsonify(new_quest.serialize()), 201


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

# DELETE


@api.route('/quests/<int:quest_id>', methods=['DELETE'])
def delete_quest(quest_id):
    quest = Quest.query.get(quest_id)

    if not quest:
        return jsonify({"msg": "Quest not found"}), 404

    db.session.delete(quest)
    db.session.commit()

    return jsonify({"msg": f"Quest with ID {quest_id} succesfully deleted"}), 200



#CHAT METHODS 
#READ ALL
@api.route('/chats', methods=['GET'])
def get_all_chats():
    chats = Chat.query.all()
    return jsonify([chat.serialize() for chat in chats]), 200


#CREATE 
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

    existing_chat = Chat.query.filter_by(user_id=user_id, mentor_id=mentor_id).first()
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


#POST MESSAGE
@api.route('/chats/message', methods=['POST'])
def send_message():
    body = request.get_json()

    if body is None:
        return jsonify({"msg": "Request body is required"}), 400

    chat_id = body.get("chat_id")
    sender = body.get("sender")     #"user" OR "mentor"
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


#GET MESSAGES
@api.route('/chats/<int:chat_id>/messages', methods=['GET'])
def get_chat_messages(chat_id):
    chat = Chat.query.get(chat_id)

    if chat is None:
        return jsonify({"msg": "Chat not found"}), 404

    messages = ChatMessage.query.filter_by(chat_id=chat_id).order_by(ChatMessage.created_at.asc()).all()
    messages_serialized = [msg.serialize() for msg in messages]

    return jsonify({
        "chat_id": chat.id,
        "user_id": chat.user_id,
        "mentor_id": chat.mentor_id,
        "messages": messages_serialized
    }), 200



























































































































@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200
