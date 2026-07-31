"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from datetime import datetime
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Mentor, Quest, Chat, ChatMessage, Habit, QuestTracking
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

#Habit Methods
#READ
@api.route('/habits', methods=['GET'])
def get_habits():
    habits = Habit.query.all()

    habits_serialized = [habit.serialize() for habit in habits]

    return jsonify(habits_serialized), 200


#READ ID
@api.route('/habits/<int:habit_id>', methods=['GET'])
def get_habit(habit_id):
    habit = Habit.query.get(habit_id)

    if habit is None:
        return jsonify({"msg": "Habit not found"}), 404

    return jsonify(habit.serialize()), 200


#CREATE
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
    user = User.query.get(body["user_id"])

    if user is None:
        return jsonify({"msg": "User not found"}), 404
    

    new_habit = Habit(
        title=body["title"],
        description=body["description"],
        status=body.get("status", "pending"),
        user_id=body.get("user_id"),
    )

    db.session.add(new_habit)
    db.session.commit()

    return jsonify(new_habit.serialize()), 201


#UPDATE
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


#DELETE
@api.route('/habits/<int:habit_id>', methods=['DELETE'])
def delete_habit(habit_id):
    habit = Habit.query.get(habit_id)

    if not habit:
        return jsonify({"msg": "Habit not found"}), 404

    db.session.delete(habit)
    db.session.commit()

    return jsonify({"msg": f"Habit with ID {habit_id} succesfully deleted"}), 200



#CHAT METHODS 
#READ ALL
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
