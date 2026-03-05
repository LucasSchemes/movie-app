from app.models.rating import Rating
from app import db

def add_rating(movie_id: int, rating_value: int, movie_data: dict):
    existing = Rating.query.filter_by(movie_id=movie_id).first()

    if existing:
        existing.rating = rating_value
        if movie_data:
            existing.title = movie_data.get("title", existing.title)
            existing.poster_path = movie_data.get("poster_path", existing.poster_path)
    else:
        new_rating = Rating(
            movie_id=movie_id,
            title=movie_data.get("title", ""),
            poster_path=movie_data.get("poster_path"),
            rating=rating_value,
        )
        db.session.add(new_rating)

    db.session.commit()
    return True


def get_rating(movie_id: int):
    rating = Rating.query.filter_by(movie_id=movie_id).first()
    return rating.to_dict() if rating else None


def delete_rating(movie_id: int):
    rating = Rating.query.filter_by(movie_id=movie_id).first()
    if not rating:
        return False

    db.session.delete(rating)
    db.session.commit()
    return True


def get_all_ratings():
    ratings = Rating.query.order_by(Rating.id.desc()).all()
    return [r.to_dict() for r in ratings]