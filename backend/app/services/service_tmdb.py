import requests
import json
import os
from app import db
from app.models.rating import MovieCache

API_KEY = os.getenv("TMDB_API_KEY")
BASE_URL = "https://api.themoviedb.org/3"

def find_movies(query, page=1, year=None):
    cache_key = f"search:q={query}|y={year or ''}|p={page}"
    
    cached_entry = MovieCache.query.filter_by(cache_key=cache_key).first()
    if cached_entry:
        return json.loads(cached_entry.response_json)
    
    params = {
        "api_key": API_KEY,
        "query": query,
        "page": page,
        "language": "en-US",
        "include_adult": "false"
    }
    if year and str(year).strip():
        params["primary_release_year"] = year

    try:
        response = requests.get(f"{BASE_URL}/search/movie", params=params)
        if response.status_code == 200:
            data = response.json()
            
            new_cache = MovieCache(
                cache_key=cache_key,
                response_json=json.dumps(data)
            )
            db.session.add(new_cache)
            db.session.commit()
            return data
    except Exception as e:
        print(f"Erro ao acessar TMDB: {e}")
    
    return {"results": [], "total_pages": 0}

def get_movie_details(movie_id):
    cache_key = f"details:id={movie_id}"
    
    cached_entry = MovieCache.query.filter_by(cache_key=cache_key).first()
    if cached_entry:
        print(f"DATABASE HIT: {cache_key}")
        return json.loads(cached_entry.response_json)

    try:
        response = requests.get(
            f"{BASE_URL}/movie/{movie_id}",
            params={"api_key": API_KEY, "language": "en-US"}
        )
        if response.status_code == 200:
            data = response.json()
            new_cache = MovieCache(cache_key=cache_key, response_json=json.dumps(data))
            db.session.add(new_cache)
            db.session.commit()
            return data
    except Exception as e:
        print(f"Erro ao buscar detalhes: {e}")
        
    return None

def get_movie_credits(movie_id):
    cache_key = f"credits:id={movie_id}"
    
    cached_entry = MovieCache.query.filter_by(cache_key=cache_key).first()
    if cached_entry:
        return json.loads(cached_entry.response_json)

    try:
        response = requests.get(
            f"{BASE_URL}/movie/{movie_id}/credits",
            params={"api_key": API_KEY}
        )
        if response.status_code == 200:
            data = response.json()
            new_cache = MovieCache(cache_key=cache_key, response_json=json.dumps(data))
            db.session.add(new_cache)
            db.session.commit()
            return data
    except Exception as e:
        print(f"Erro ao buscar créditos: {e}")
        
    return {"cast": []}