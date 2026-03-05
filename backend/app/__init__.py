from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS 

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    CORS(app, origins=["http://localhost:5173"])

    app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://root:root@db:3306/movie_app"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)

    from app.models.rating import Rating, MovieCache 

    with app.app_context():
        db.create_all()

    from app.routes.movies import movies_bp
    from app.routes.ratings import ratings_bp
    app.register_blueprint(movies_bp)
    app.register_blueprint(ratings_bp)

    return app