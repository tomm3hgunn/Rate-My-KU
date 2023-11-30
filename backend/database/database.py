"""
Prologue Comments

Name of code artifact: Flask SQLAlchemy Database Initialization and Professor Model
Brief description: This code initializes a Flask application with SQLAlchemy and defines a Professor model for storing professor data.
Programmer's name: Thomas Nguyen
Date the code was created: 10/04/23
Brief description of each revision & author:
    - Initial implementation. (Thomas Nguyen @ 10/04/23)
    - Added last updated field to db (Thomas Nguyen @ 11/19/23)
Pre-conditions: 
    - `flask_sqlalchemy` and `dotenv` modules must be installed.
    - Environment variables for the database must be set.
Post-conditions:
    - Initializes the SQLAlchemy database with the Flask app.
    - Defines the Professor model for the database.
Error and exception condition values: 
    - None. Errors would be raised by SQLAlchemy if database connection fails.
Side effects: 
    - Modifies the Flask app to include SQLAlchemy settings.
    - Creates a new table in the database if it doesn't exist.
Invariants: None
Any known faults: None
"""

from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os
from datetime import datetime

# Initialize SQLAlchemy with no settings
db = SQLAlchemy()


def init_database(app):
    # Load environment variables
    load_dotenv()

    # Get PostgreSQL credentials from environment variables
    render_database_name = os.getenv("RENDER_DATABASE_NAME")
    render_user = os.getenv("RENDER_DATABASE_USER")
    render_password = os.getenv("RENDER_DATABASE_PASSWORD")
    render_host = os.getenv(
        "RENDER_DATABASE_HOST", "dpg-ck7p4k08elhc73c11l00-a.ohio-postgres.render.com"
    )  # Default host
    render_port = os.getenv("RENDER_DATABASE_PORT", 5432)  # Default port

    # Construct the database URL
    database_url = f"postgresql://{render_user}:{render_password}@{render_host}:{render_port}/{render_database_name}"

    # Configure SQLAlchemy
    app.config["SQLALCHEMY_DATABASE_URI"] = database_url
    app.config[
        "SQLALCHEMY_TRACK_MODIFICATIONS"
    ] = False  # Silence the deprecation warning
    app.config["SQLALCHEMY_ECHO"] = True  # Log all SQL commands

    # Initialize SQLAlchemy with app
    db.init_app(app)


def add_professor(data):
    professor = Professors(**data)
    db.session.add(professor)
    db.session.commit()


def update_professor(data):
    professor = Professors(**data)
    # should overwrite existing professor
    db.session.merge(professor)
    db.session.commit()


def get_professor_by_name(name):
    # if there is a comma, split name
    if "," in name:
        name = name.split(",")
        return Professors.query.filter_by(
            firstName=name[1].strip(), lastName=name[0].strip()
        ).first()
    return Professors.query.filter(
        (Professors.firstName.ilike(f"%{name}%"))
        | (Professors.lastName.ilike(f"%{name}%"))
    ).first()


class Professors(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(50), nullable=False)
    lastName = db.Column(db.String(50), nullable=False)
    department = db.Column(db.String(50), nullable=False)
    ratings = db.relationship("Rating", backref="professors", lazy=True)
    classInstances = db.relationship("ClassInstance", backref="professors", lazy=True)

    def __repr__(self):
        return f"<Professor {self.firstName} {self.lastName}>"


class Rating(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    professor_id = db.Column(db.Integer, db.ForeignKey("professors.id"), nullable=False)
    averageRating = db.Column(db.Float, nullable=False)
    averageDifficulty = db.Column(db.Float, nullable=False)
    numberOfRatings = db.Column(db.Integer, nullable=False)
    wouldTakeAgainPercentage = db.Column(db.Float, nullable=False)
    lastUpdated = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<Rating for Professor ID {self.professor_id}>"


class Class(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    classType = db.Column(db.String(50), nullable=False)
    number = db.Column(db.Integer, nullable=False)
    className = db.Column(db.String(100), nullable=False)
    classYear = db.Column(db.Integer, nullable=False)
    classDescription = db.Column(db.Text, nullable=True)

    def __repr__(self):
        return f"<Class {self.classType} {self.number} - {self.className}>"


class ClassInstance(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    classId = db.Column(db.Integer, db.ForeignKey("class.id"), nullable=False)
    professorId = db.Column(db.Integer, db.ForeignKey("professors.id"), nullable=False)
    type = db.Column(db.String(50), nullable=False)
    creditHours = db.Column(db.Integer, nullable=False)
    classNumber = db.Column(db.Integer, nullable=False)
    seatsAvailable = db.Column(db.String(50), nullable=False)
    timeAndRoom = db.Column(db.String(100), nullable=False)

    def __repr__(self):
        return f"<ClassInstance {self.classId} - {self.professorId}>"
