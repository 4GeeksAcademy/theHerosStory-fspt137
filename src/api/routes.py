"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Mentor
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


#User Methods
#CREATE
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


#READ
@api.route('/users', methods=['GET'])
def get_all_users():
    users = User.query.all()
    
    all_users_serialized = [user.serialize() for user in users]
    
    return jsonify(all_users_serialized), 200


#UPDATE
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


#DELETE
@api.route('/users/<int:id>', methods=['DELETE'])
def delete_user(id):
    user = User.query.get(id)
    
    if not user:
        return jsonify({"error": "User not found"}), 404
        
    db.session.delete(user)
    db.session.commit()
    
    return jsonify({"msg": f"User with ID {id} succesfully deleted"}), 200


#Mentor Methods
#CREATE
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


#READ
@api.route('/mentors', methods=['GET'])
def get_all_mentors():
    mentors = Mentor.query.all()
    
    all_mentors_serialized = [mentor.serialize() for mentor in mentors]
    
    return jsonify(all_mentors_serialized), 200


#UPDATE
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


#DELETE
@api.route('/mentors/<int:id>', methods=['DELETE'])
def delete_mentor(id):
    mentor = Mentor.query.get(id)
    
    if not mentor:
        return jsonify({"error": "Mentor not found"}), 404
        
    db.session.delete(mentor)
    db.session.commit()
    
    return jsonify({"msg": f"Mentor with ID {id} succesfully deleted"}), 200























@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200
















