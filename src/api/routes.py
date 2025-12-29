"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from sqlalchemy.exc import SQLAlchemyError

# importaciones nuevas
from flask_bcrypt import Bcrypt 
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import timedelta





api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


# nuevas instancias necesarias
jwt = JWTManager()
bcrypt = Bcrypt()

def validate_required(data, required_fields):
    """Valida campos requeridos en un JSON y retorna lista de faltantes."""
    missing = [field for field in required_fields if not data.get(field)]
    return missing


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route("/user", methods=["POST"])
def add_user():
    data = request.get_json()
    if not data:
        return jsonify({"message": "No hay datos Verifique"}), 400
    required_fields = ["name", "password", "is_active", "email"]
    missing = validate_required(data, required_fields)
    if missing:
        return jsonify({"message": "faltan campos requeridos", "missing_fields": missing}),400   
         
    clean_data = {field: data[field] for field in required_fields if field in data}
    print(clean_data)

    for field in required_fields:
        if not data.get(field):
            return jsonify({"message": f"El campo '{field}' es requerido"}), 400

    try:
        existente = data.get("email")
        pw = data.get("password")
        print(pw)
        print("arriba pasword")
        user = User.query.filter_by(email=existente).first()
        if user:
            return jsonify({"data": user.serialize(), "ok" : False, "message": f"Usuario {existente} ya esta Registrado Verifique...", "details": "none"}),404
        password_hash = bcrypt.generate_password_hash(pw).decode("utf-8")
        print("clean_data", clean_data, "password",password_hash)
        clean_data["password"] = password_hash
        new_user = User(**clean_data)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"data": new_user.serialize(), "ok": True, "message" : "Usuario Creado Sastifactoriamente", "details": "none"}),201
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"message": "Error en la base de datos", "details": str(e), "ok": False, "data": "none"}), 500    
    except Exception as e:
        return jsonify({"message": "Error en el servidor", "details": str(e), "ok": False, "data": "none"}),500
    
@api.route("/user", methods=["GET"])
def all_user():
    data= User.query.all()
    return jsonify({ "data": [user.serialize() for user in data], "message" :"mensage", "ok": True, "details": "none"}), 200   
    