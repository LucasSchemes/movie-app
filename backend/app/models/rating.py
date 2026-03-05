from app import db
from datetime import datetime

class Rating(db.Model):
    __tablename__ = 'ratings'
    id = db.Column(db.Integer, primary_key=True)
    movie_id = db.Column(db.Integer, unique=True, nullable=False)
    title = db.Column(db.String(255), nullable=False)
    poster_path = db.Column(db.String(255))
    rating = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "movie_id": self.movie_id,
            "title": self.title,
            "poster_path": self.poster_path,
            "rating": self.rating
        }

class MovieCache(db.Model):
    __tablename__ = 'movie_cache'
    cache_key = db.Column(db.String(255), primary_key=True)
    response_json = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)