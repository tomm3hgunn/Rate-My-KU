"""
Prologue Comments

Name of code artifact: Flask API Server for RateMyKU
Brief description: This code sets up a Flask API server to serve professor data scraped from RateMyProfessor.
Programmer's name: Thomas Nguyen
Date the code was created: 09/22/23
Brief description of each revision & author:
    - Added doc-strings and comments. (Thomas Nguyen @ 09/26/23)
    - Initialize database (Thomas Nguyen @ 10/04/23)
Pre-conditions: 
    - Flask and flask_cors must be installed.
    - The scraper module must be available.
Post-conditions:
    - Returns JSON data based on the API endpoint accessed.
Error and exception condition values: 
    - 400 for invalid endpoint
    - 500 for internal server errors
Side effects: None
Invariants: None
Any known faults: None
"""

# Import required modules
import os
import sys

# Update the system path to include the parent directory
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from flask import Flask, jsonify, request
from flask_cors import CORS
from scraper.ratemyscraper import RateMyProfessorScraper
from database.database import db, init_database, add_professor, get_professor_by_name

# Initialize Flask app
app = Flask(__name__)

# Initialize scraper with school ID
school_id = 1117  # School ID for KU
scraper = RateMyProfessorScraper(id=school_id)

CORS(app)

# Initialize the database
init_database(app)

# Create all database tables
with app.app_context():
    db.create_all()

# Define the index route
@app.route("/", methods=["GET"])
def index():
    """
    Returns an error message for the root endpoint.
    """
    return (
        jsonify(
            {
                "status": "error",
                "message": "Invalid endpoint. Please refer to the API documentation for valid endpoints.",
            }
        ),
        400,
    )


# Define the hello_world route
@app.route("/hello_world", methods=["GET"])
def hello_world():
    """
    Returns a Hello World message, optionally appending a query parameter.
    """
    message = "Hello, World!"
    args = request.args.get("query")
    if args:
        message += f" {args}"
    return jsonify(message)


# Define the get_professor_data route
@app.route("/get_professor_data", methods=["GET"])
def get_professor_data():
    """
    Returns professor data based on the 'name' query parameter.
    """
    name = request.args.get("name")

    # Check if the professor exists in the database
    professor = get_professor_by_name(name)

    if professor:
        # If exists, fetch from database
        print("Data fetched from database.")
        data = {
            "status": "success",
            "message": "Professor data retrieved successfully",
            "total_results": 1,
            "data": {
                "id": professor.id,
                "firstName": professor.firstName,
                "lastName": professor.lastName,
                "averageRating": professor.averageRating,
                "averageDifficulty": professor.averageDifficulty,
                "numberOfRatings": professor.numberOfRatings,
                "wouldTakeAgainPercentage": professor.wouldTakeAgainPercentage,
                "department": professor.department,
                "url": professor.url,
            },
        }
    else:
        # If not exists, scrape and add to database
        print("Data scraped and added to database.")
        data = scraper.get_professor_data(name)
        add_professor(data["data"])

    return jsonify(data)


# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True)
