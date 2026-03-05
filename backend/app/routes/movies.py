from flask import Blueprint, jsonify, request
from app.services.service_tmdb import find_movies, get_movie_details, get_movie_credits



movies_bp = Blueprint("movies", __name__)

@movies_bp.route("/movies/search")
def search():
    query = request.args.get("q") 
    year = request.args.get("year")
    page = request.args.get("page", default=1, type=int)

    if not query:
        return jsonify({"error": "Query is required"}), 400

    data = find_movies(query, page=page, year=year) 
    return jsonify(data)



@movies_bp.route("/movies/<int:movie_id>")
def movie_info(movie_id):
    details = get_movie_details(movie_id)
    if not details:
        return jsonify({"error": "Movie not found"}), 404
        
    credits = get_movie_credits(movie_id)
    
    response = {
        **details, 
        "cast": credits.get("cast", [])[:10] if credits else []
    }
    return jsonify(response)