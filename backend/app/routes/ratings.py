from flask import Blueprint, request, jsonify
from app.services.service_ratings import add_rating, get_rating, delete_rating, get_all_ratings
from app.models.rating import Rating

ratings_bp = Blueprint("ratings", __name__)

@ratings_bp.route("/ratings", methods=["GET"])
def list_ratings():
    ratings = get_all_ratings()
    return jsonify(ratings)

@ratings_bp.route("/ratings/<int:movie_id>", methods=["GET"])
def get_movie_rating(movie_id):
    rating = Rating.query.filter_by(movie_id=movie_id).first()
    if not rating:
        return jsonify({"rating": None}), 200
    return jsonify(rating.to_dict())

@ratings_bp.route("/ratings/<int:movie_id>", methods=["POST"])
def save_rating(movie_id):
    data = request.json
    success = add_rating(movie_id, data.get("rating"), data.get("movie"))
    return jsonify({"message": "Saved"}) if success else (jsonify({"error": "Invalid"}), 400)

@ratings_bp.route("/ratings/<int:movie_id>", methods=["DELETE"])
def remove_rating(movie_id):
    delete_rating(movie_id)
    return jsonify({"message": "Deleted"})