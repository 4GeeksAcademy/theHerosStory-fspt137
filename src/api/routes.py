"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Mentor, Quest
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

# Mentor Methods
# CREATE


@api.route('/mentors', methods=['POST'])
def create_mentor():
    body = request.get_json()

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


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200
